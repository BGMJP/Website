import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12'
import * as kv from './kv_store.tsx'
import { extractImageFromRSS } from './rss-image-extractor.tsx'

const app = new Hono()

// CORS 설정
app.use('/*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}))

app.use('*', logger(console.log))

// Supabase 클라이언트 설정
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// RSS 파싱을 위한 인터페이스
interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category: string;
  thumbnail: string;
  content?: string;
}

// HTML에서 첫 번째 이미지 추출 함수 (RSS description용 - 기존 유지)
function extractFirstImageFromRSS(htmlContent: string): string | null {
  try {
    // img 태그 정규식으로 찾기
    const imgRegex = /<img[^>]+src=['"](https?:\/\/[^'"]+)['"]/i;
    const match = htmlContent.match(imgRegex);
    
    if (match && match[1]) {
      const imageUrl = match[1];
      
      // 네이버 블로그 이미지 URL인지 확인하고 유효한 이미지인지 체크
      if (imageUrl.includes('blogfiles.naver.net') || 
          imageUrl.includes('postfiles.naver.net') ||
          imageUrl.includes('storep-phinf.pstatic.net') ||
          imageUrl.match(/\.(jpg|jpeg|png|gif|webp)(\?|$)/i)) {
        return imageUrl;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting first image from RSS:', error);
    return null;
  }
}

// 개선된 Cheerio를 사용한 첫 번째 이미지 추출 함수
function extractFirstImageWithCheerio(htmlContent: string): string | null {
  try {
    console.log('=== Extracting first image using Cheerio ===');
    console.log(`HTML content length: ${htmlContent.length} characters`);
    
    // Cheerio로 HTML 로드
    const $ = cheerio.load(htmlContent);
    
    // 여러 방법으로 이미지 검색
    let imageUrl: string | null = null;
    
    // 1. 일반적인 img 태그에서 검색
    const imgElements = $('img');
    console.log(`Found ${imgElements.length} img elements`);
    
    imgElements.each((index, element) => {
      const src = $(element).attr('src');
      const dataSrc = $(element).attr('data-src');
      const dataSrcset = $(element).attr('data-srcset');
      
      console.log(`Image ${index + 1}:`);
      console.log(`  - src: ${src}`);
      console.log(`  - data-src: ${dataSrc}`);
      console.log(`  - data-srcset: ${dataSrcset}`);
      
      // src, data-src, data-srcset 순으로 확인
      const possibleUrl = src || dataSrc || dataSrcset;
      
      if (possibleUrl && isValidNaverImageUrl(possibleUrl)) {
        imageUrl = possibleUrl;
        console.log(`✅ Valid Naver image found: ${imageUrl}`);
        return false; // break out of loop
      }
    });
    
    // 2. img 태그에서 찾지 못했다면 HTML에서 직접 정규식으로 검색
    if (!imageUrl) {
      console.log('No valid image in img tags, trying regex search...');
      
      const imageRegexPatterns = [
        // postfiles.pstatic.net 패턴
        /https?:\/\/postfiles\.pstatic\.net\/[^"'\s]+\.(png|jpg|jpeg|gif|webp)/gi,
        // blogfiles.naver.net 패턴
        /https?:\/\/blogfiles\.naver\.net\/[^"'\s]+\.(png|jpg|jpeg|gif|webp)/gi,
        // storep-phinf.pstatic.net 패턴
        /https?:\/\/storep-phinf\.pstatic\.net\/[^"'\s]+\.(png|jpg|jpeg|gif|webp)/gi,
      ];
      
      for (const pattern of imageRegexPatterns) {
        const matches = htmlContent.match(pattern);
        if (matches && matches.length > 0) {
          imageUrl = matches[0];
          console.log(`✅ Found image via regex: ${imageUrl}`);
          break;
        }
      }
    }
    
    if (!imageUrl) {
      console.log('❌ No valid Naver image found in content');
      return null;
    }
    
    // URL 정제
    let cleanImageUrl = imageUrl;
    
    // 상대 URL을 절대 URL로 변환
    if (cleanImageUrl.startsWith('//')) {
      cleanImageUrl = 'https:' + cleanImageUrl;
    } else if (cleanImageUrl.startsWith('/')) {
      cleanImageUrl = 'https://blog.naver.com' + cleanImageUrl;
    }
    
    // 네이버 이미지 URL의 type 파라미터는 유지 (고품질 이미지 확보)
    // type=w3840 등은 고품질 이미지를 나타내므로 제거하지 않음
    console.log(`✅ Final cleaned image URL: ${cleanImageUrl}`);
    
    return cleanImageUrl;
    
  } catch (error) {
    console.error('❌ Error extracting first image with Cheerio:', error);
    return null;
  }
}

// 네이버 이미지 URL 유효성 검사 함수
function isValidNaverImageUrl(url: string): boolean {
  if (!url) return false;
  
  const validPatterns = [
    'postfiles.pstatic.net',
    'blogfiles.naver.net', 
    'storep-phinf.pstatic.net'
  ];
  
  const hasValidDomain = validPatterns.some(pattern => url.includes(pattern));
  const hasImageExtension = /\.(png|jpg|jpeg|gif|webp)(\?|$)/i.test(url);
  
  // 네이버 도메인이면 무조건 유효 (확장자 없어도)
  const isValid = hasValidDomain || hasImageExtension;
  console.log(`URL validation for ${url.substring(0, 80)}...: ${isValid ? 'VALID' : 'INVALID'}`);
  console.log(`  - Has valid domain: ${hasValidDomain}`);
  console.log(`  - Has image extension: ${hasImageExtension}`);
  
  return isValid;
}

// 카테고리별 기본 썸네일 (폴백용)
const getDefaultThumbnail = (category: string): string => {
  const thumbnails: Record<string, string> = {
    '아마존 가이드': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop&crop=center',
    '아마존 광고': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&crop=center',
    '콘텐츠 마케팅': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop&crop=center',
    '브랜드 등록': 'https://images.unsplash.com/photo-1553484771-ac6936fe8da9?w=800&h=450&fit=crop&crop=center',
    '성공 사례': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop&crop=center',
    '아마존 인사이트': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&crop=center',
    '셀러 팁': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop&crop=center',
    '마케팅 전략': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=450&fit=crop&crop=center'
  };
  return thumbnails[category] || thumbnails['아마존 인사이트'];
};

// HTML 내용 정리 함수 (원본 보존하되 기본 정리만)
function cleanHtmlContent(htmlContent: string): string {
  try {
    // 기본적인 정리만 수행 - 구조는 보존
    let cleaned = htmlContent
      // 불필요한 script, style 태그 제거
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      // 네이버 블로그 특정 클래스들 제거
      .replace(/class="[^"]*se-[^"]*"/gi, '')
      .replace(/class="[^"]*__[^"]*"/gi, '')
      // data 속성들 제거
      .replace(/data-[^=]*="[^"]*"/gi, '')
      // style 속성 정리 (필요한 것들만 유지)
      .replace(/style="[^"]*"/gi, (match) => {
        const styleContent = match.match(/style="([^"]*)"/)?.[1] || '';
        // 기본적인 스타일만 유지
        const allowedStyles = styleContent
          .split(';')
          .filter(style => {
            const prop = style.trim().split(':')[0]?.trim().toLowerCase();
            return ['width', 'height', 'max-width', 'margin', 'padding', 'text-align'].includes(prop);
          })
          .join(';');
        return allowedStyles ? `style="${allowedStyles}"` : '';
      })
      // 연속된 공백과 줄바꿈 정리
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();

    return cleaned;
  } catch (error) {
    console.error('Error cleaning HTML content:', error);
    return htmlContent; // 오류 시 원본 반환
  }
}

// 기본 블로그 포스트 생성 함수 (RSS 실패 시 폴백용)
function createFallbackPosts(): RSSItem[] {
  return [
    {
      title: "아마존 진출을 위한 완벽 가이드",
      link: "https://blog.naver.com/amazoncarry",
      description: "아마존 글로벌 진출을 위한 핵심 전략과 실전 팁을 소개합니다. 성공적인 아마존 셀러가 되기 위한 필수 정보들을 확인해보세요.",
      pubDate: new Date().toISOString(),
      category: "아마존 가이드",
      thumbnail: getDefaultThumbnail("아마존 가이드")
    },
    {
      title: "아마존 광고 최적화 전략",
      link: "https://blog.naver.com/amazoncarry",
      description: "효과적인 아마존 PPC 광고 운영 방법과 키워드 최적화 전략을 통해 매출을 극대화하는 방법을 알아보세요.",
      pubDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      category: "아마존 광고",
      thumbnail: getDefaultThumbnail("아마존 광고")
    },
    {
      title: "성공적인 브랜드 등록 가이드",
      link: "https://blog.naver.com/amazoncarry",
      description: "아마존 브랜드 레지스트리 등록부터 A+ 콘텐츠 작성까지, 브랜드 보호와 성장을 위한 필수 과정을 상세히 안내합니다.",
      pubDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      category: "브랜드 등록",
      thumbnail: getDefaultThumbnail("브랜드 등록")
    }
  ];
}

// RSS 파싱 함수 (개선된 버전)
async function parseRSS(xmlContent: string): Promise<RSSItem[]> {
  try {
    console.log('Starting RSS parsing...');
    console.log(`XML content length: ${xmlContent.length} characters`);
    
    const items: RSSItem[] = [];
    
    // 더 유연한 item 태그 추출 (다양한 형태 고려)
    let itemMatches = xmlContent.match(/<item\s*>(.*?)<\/item\s*>/gs);
    
    // 첫 번째 시도 실패 시 다른 패턴들 시도
    if (!itemMatches || itemMatches.length === 0) {
      console.log('First item regex failed, trying alternative patterns...');
      
      // 공백 없는 패턴
      itemMatches = xmlContent.match(/<item>(.*?)<\/item>/gs);
      
      // 그래도 없으면 더 관대한 패턴
      if (!itemMatches || itemMatches.length === 0) {
        itemMatches = xmlContent.match(/<item[^>]*>(.*?)<\/item>/gs);
      }
    }
    
    if (!itemMatches || itemMatches.length === 0) {
      console.log('No RSS items found with any pattern');
      console.log('XML sample:', xmlContent.substring(0, 1000));
      console.log('XML contains <item>:', xmlContent.includes('<item>'));
      console.log('XML contains </item>:', xmlContent.includes('</item>'));
      console.log('Returning fallback posts due to no RSS items found');
      return createFallbackPosts();
    }

    console.log(`Found ${itemMatches.length} RSS items`);

    for (const [index, itemMatch] of itemMatches.slice(0, 3).entries()) { // 최신 3개만
      try {
        console.log(`Processing RSS item ${index + 1}`);
        
        // 제목 추출 (CDATA 유무 모두 고려)
        let title = 'No Title';
        const titleMatch1 = itemMatch.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/s);
        const titleMatch2 = itemMatch.match(/<title>(.*?)<\/title>/s);
        if (titleMatch1) {
          title = titleMatch1[1].trim();
        } else if (titleMatch2) {
          title = titleMatch2[1].trim();
        }

        // 링크 추출 (CDATA 유무 모두 고려)
        let link = '';
        const linkMatch1 = itemMatch.match(/<link><!\[CDATA\[(.*?)\]\]><\/link>/s);
        const linkMatch2 = itemMatch.match(/<link>(.*?)<\/link>/s);
        if (linkMatch1) {
          link = linkMatch1[1].trim();
        } else if (linkMatch2) {
          link = linkMatch2[1].trim();
        }

        // 설명 추출 (CDATA 유무 모두 고려)
        let description = '';
        const descMatch1 = itemMatch.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/s);
        const descMatch2 = itemMatch.match(/<description>(.*?)<\/description>/s);
        if (descMatch1) {
          description = descMatch1[1].trim();
        } else if (descMatch2) {
          description = descMatch2[1].trim();
        }

        // 발행일 추출
        const pubDateMatch = itemMatch.match(/<pubDate>(.*?)<\/pubDate>/s);
        const pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();

        // 카테고리 추출 (CDATA 유무 모두 고려)
        let category = '아마존 인사이트';
        const categoryMatch1 = itemMatch.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/s);
        const categoryMatch2 = itemMatch.match(/<category>(.*?)<\/category>/s);
        if (categoryMatch1) {
          category = categoryMatch1[1].trim();
        } else if (categoryMatch2) {
          category = categoryMatch2[1].trim();
        }

        // 기본 검증 - title과 link가 있어야 유효한 아이템으로 간주
        if (!title || title === 'No Title' || !link) {
          console.log(`Skipping invalid RSS item ${index + 1}: missing title or link`);
          continue;
        }

        // RSS description에서 이미지 추출 (강화된 버전)
        const rssImage = extractImageFromRSS(description);
        const thumbnail = rssImage || getDefaultThumbnail(category);

        console.log(`✅ Successfully parsed RSS item: ${title}`);
        console.log(`   Link: ${link}`);
        console.log(`   Category: ${category}`);
        console.log(`   RSS thumbnail: ${rssImage ? 'Yes' : 'No (using fallback)'}`);

        items.push({
          title,
          link,
          description,
          pubDate,
          category,
          thumbnail
        });
      } catch (error) {
        console.error(`Error parsing individual RSS item ${index + 1}:`, error);
        // 개별 아이템 파싱 실패는 무시하고 계속 진행
      }
    }

    if (items.length === 0) {
      console.log('No valid RSS items could be parsed, returning fallback posts');
      return createFallbackPosts();
    }

    console.log(`Successfully parsed ${items.length} valid RSS items`);
    return items;
  } catch (error) {
    console.error('Error parsing RSS:', error);
    console.log('Returning fallback posts due to RSS parsing failure');
    return createFallbackPosts();
  }
}

// 날짜 포맷팅 함수
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  }
}

// 웹 스크래핑 및 이미지 추출 함수 (개선된 버전)
async function scrapeContentAndExtractThumbnail(url: string, fallbackDescription: string = '', category: string = '아마존 인사이트'): Promise<{content: string, thumbnail: string}> {
  try {
    console.log(`=== Scraping and extracting thumbnail from: ${url} ===`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    console.log(`Fetched HTML length: ${html.length} characters`);
    
    // 네이버 블로그 콘텐츠 추출 시도
    const contentSelectors = [
      // 최신 네이버 블로그 구조
      /<div[^>]*se-main-container[^>]*>(.*?)<\/div>/s,
      /<div[^>]*class="[^"]*se-main-container[^"]*"[^>]*>(.*?)<\/div>/s,
      // 대안 선택자들
      /<div[^>]*class="[^"]*se-component[^"]*"[^>]*>(.*?)<\/div>/s,
      /<div[^>]*id="[^"]*post[^"]*"[^>]*>(.*?)<\/div>/s,
      /<div[^>]*class="[^"]*post[^"]*"[^>]*>(.*?)<\/div>/s,
      // 더 광범위한 선택자
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/div>/s
    ];
    
    let content = '';
    let extractionMethod = 'unknown';
    
    // 여러 선택자를 순서대로 시도
    for (const [index, regex] of contentSelectors.entries()) {
      const match = html.match(regex);
      if (match && match[1] && match[1].length > 100) { // 의미있는 콘텐츠 길이 확인
        content = match[1];
        extractionMethod = `selector-${index + 1}`;
        console.log(`Successfully extracted blog content using ${extractionMethod}`);
        break;
      }
    }
    
    // Cheerio를 사용해서 이미지 추출 (콘텐츠와 전체 HTML 모두에서 시도)
    let actualThumbnail: string | null = null;
    
    // 1. 추출된 콘텐츠에서 이미지 검색
    if (content) {
      console.log('=== Extracting thumbnail from extracted content ===');
      actualThumbnail = extractFirstImageWithCheerio(content);
    }
    
    // 2. 콘텐츠에서 이미지를 찾지 못했다면 전체 HTML에서 검색
    if (!actualThumbnail && html) {
      console.log('=== Extracting thumbnail from full HTML ===');
      actualThumbnail = extractFirstImageWithCheerio(html);
    }
    
    // 콘텐츠가 없는 경우 폴백 처리
    if (!content) {
      console.log('All content selectors failed, using fallback description');
      if (fallbackDescription && fallbackDescription.length > 50) {
        const cleanFallback = fallbackDescription.replace(/<[^>]*>/g, '');
        content = `<p>${cleanFallback.substring(0, 500)}...</p>
                  <p><em>전체 내용을 보려면 원문 링크를 클릭해주세요.</em></p>`;
      } else {
        content = `<p>블로그 내용을 불러올 수 없습니다.</p>
                  <p><em>네이버 블로그에서 전체 내용을 확인해주세요.</em></p>`;
      }
      extractionMethod = 'fallback';
    }
    
    // 원본 HTML 구조 보존하며 기본 정리만 수행
    const cleanedContent = cleanHtmlContent(content);
    
    // 썸네일 결정: 실제 추출된 이미지 > 카테고리별 기본 이미지
    const finalThumbnail = actualThumbnail || getDefaultThumbnail(category);
    
    console.log(`=== Content extraction completed ===`);
    console.log(`- Method: ${extractionMethod}`);
    console.log(`- Content length: ${cleanedContent.length} characters`);
    console.log(`- Actual thumbnail found: ${actualThumbnail ? 'YES' : 'NO'}`);
    console.log(`- Actual thumbnail URL: ${actualThumbnail || 'NONE'}`);
    console.log(`- Final thumbnail URL: ${finalThumbnail}`);
    console.log(`- Is final thumbnail from Unsplash: ${finalThumbnail.includes('unsplash.com')}`);
    console.log(`- Thumbnail decision: ${actualThumbnail ? 'Using actual image' : 'Using fallback image'}`);
    console.log(`=========================================`);
    
    return {
      content: cleanedContent,
      thumbnail: finalThumbnail
    };
    
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    
    // 에러 발생 시 안전한 폴백
    const safeDescription = fallbackDescription ? 
      fallbackDescription.replace(/<[^>]*>/g, '').substring(0, 300) : 
      '블로그 내용을 불러올 수 없습니다.';
      
    const fallbackContent = `<div class="error-fallback">
              <p>${safeDescription}</p>
              <p style="margin-top: 16px;">
                <em>전체 내용을 보려면 
                  <a href="${url}" target="_blank" style="color: #8B5CF6; text-decoration: underline;">
                    원문 보기
                  </a>를 클릭해주세요.
                </em>
              </p>
            </div>`;
    
    return {
      content: fallbackContent,
      thumbnail: getDefaultThumbnail(category)
    };
  }
}

// 블로그 포스트 API (개선된 에러 핸들링)
// 캐시 무효화 API (디버깅용)
app.get('/make-server-89cc3cd0/clear-blog-cache', async (c) => {
  try {
    await kv.del('blog_posts_cache_v3');
    await kv.del('blog_posts_fallback_cache');
    console.log('✅ Blog cache cleared successfully');
    return c.json({ success: true, message: 'Cache cleared' });
  } catch (error) {
    console.error('❌ Error clearing cache:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// 직접 이미지 추출 테스트 API
app.get('/make-server-89cc3cd0/test-image-extraction', async (c) => {
  try {
    const testUrls = [
      'https://blog.naver.com/amazoncarry/223670823488',
      'https://blog.naver.com/amazoncarry/223670158849', 
      'https://blog.naver.com/amazoncarry/223669861032'
    ];
    
    const results = [];
    
    for (const [index, url] of testUrls.entries()) {
      console.log(`\n=== Testing image extraction for URL ${index + 1}: ${url} ===`);
      
      try {
        const { content, thumbnail } = await scrapeContentAndExtractThumbnail(url, '', '아마존 인사이트');
        
        results.push({
          url,
          success: true,
          thumbnail,
          isActualImage: !thumbnail.includes('unsplash.com'),
          contentLength: content.length
        });
        
        console.log(`✅ Test ${index + 1} completed successfully`);
        console.log(`   - Thumbnail: ${thumbnail}`);
        console.log(`   - Is actual image: ${!thumbnail.includes('unsplash.com')}`);
        
      } catch (error) {
        console.error(`❌ Test ${index + 1} failed:`, error);
        results.push({
          url,
          success: false,
          error: error.message,
          thumbnail: null,
          isActualImage: false
        });
      }
    }
    
    return c.json({
      success: true,
      testResults: results,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error in image extraction test:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.get('/make-server-89cc3cd0/blog-posts', async (c) => {
  try {
    console.log('=== Blog Posts API Called ===');
    
    const cacheKey = 'blog_posts_cache_v4'; // RSS 이미지 추출 대폭 개선
    const CACHE_DURATION = 60 * 60 * 1000; // 1시간으로 연장 (RSS 안정성 향상)
    const FALLBACK_CACHE_KEY = 'blog_posts_fallback_cache';
    const EMERGENCY_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24시간
    
    // 캐시 확인
    const cachedData = await kv.get(cacheKey);
    const now = Date.now();
    
    if (cachedData && cachedData.timestamp && (now - cachedData.timestamp < CACHE_DURATION)) {
      console.log('Returning cached blog posts');
      return c.json({
        success: true,
        posts: cachedData.posts,
        source: 'cache',
        cached_at: new Date(cachedData.timestamp).toISOString()
      });
    }

    console.log('Fetching fresh blog posts from RSS...');
    
    let rssItems: RSSItem[] = [];
    
    try {
      // RSS 피드 가져오기 (여러 시도)
      const rssUrls = [
        'https://rss.blog.naver.com/amazoncarry.xml',
        'http://rss.blog.naver.com/amazoncarry.xml' // HTTP 폴백
      ];
      
      let rssResponse = null;
      let lastError = null;
      
      for (const rssUrl of rssUrls) {
        try {
          console.log(`Fetching RSS from: ${rssUrl}`);
          
          rssResponse = await fetch(rssUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; BlogReader/1.0)',
              'Accept': 'application/rss+xml, application/xml, text/xml'
            },
            signal: AbortSignal.timeout(10000) // 10초 타임아웃
          });

          if (rssResponse.ok) {
            console.log(`Successfully fetched RSS from: ${rssUrl}`);
            break; // 성공했으므로 루프 종료
          } else {
            lastError = new Error(`RSS fetch failed: ${rssResponse.status} ${rssResponse.statusText}`);
            console.log(`Failed to fetch from ${rssUrl}: ${lastError.message}`);
          }
        } catch (fetchError) {
          lastError = fetchError;
          console.log(`Error fetching from ${rssUrl}:`, fetchError);
        }
      }

      if (!rssResponse || !rssResponse.ok) {
        throw lastError || new Error('All RSS URLs failed');
      }

      const rssContent = await rssResponse.text();
      console.log(`RSS content length: ${rssContent.length} characters`);
      
      if (rssContent.length < 100) {
        throw new Error('RSS content too short, likely invalid');
      }
      
      // RSS 형식 기본 검증
      if (!rssContent.includes('<rss') && !rssContent.includes('<feed')) {
        console.log('Invalid RSS format detected');
        console.log('Content preview:', rssContent.substring(0, 200));
        console.log('Using fallback posts due to invalid RSS format');
        rssItems = createFallbackPosts();
      } else {
        // RSS 파싱
        rssItems = await parseRSS(rssContent);
        console.log(`Successfully parsed ${rssItems.length} RSS items`);
      }

      
    } catch (rssError) {
      console.error('RSS fetch/parse error:', rssError);
      
      // 이전 성공한 캐시가 있는지 확인 (오래된 캐시라도 사용)
      const emergencyCache = await kv.get(FALLBACK_CACHE_KEY);
      if (emergencyCache && emergencyCache.posts && emergencyCache.posts.length > 0) {
        console.log('Using emergency cache data from previous successful fetch');
        return c.json({
          success: true,
          posts: emergencyCache.posts,
          source: 'emergency-cache',
          cached_at: new Date(emergencyCache.timestamp).toISOString(),
          note: 'Using emergency cache due to RSS fetch failure'
        });
      }
      
      console.log('No emergency cache available, using fallback posts');
      rssItems = createFallbackPosts();
    }

    // RSS 항목이 여전히 없으면 폴백 사용
    if (rssItems.length === 0) {
      console.log('No RSS items found, using fallback posts');
      rssItems = createFallbackPosts();
    }

    // 블로그 포스트 데이터 생성 (개선된 버전)
    const blogPosts = [];
    for (const [index, item] of rssItems.entries()) {
      try {
        console.log(`\n=== Processing item ${index + 1}: ${item.title} ===`);
        
        let fullContent = '';
        let actualThumbnail = item.thumbnail;
        let contentSource = 'rss';
        let thumbnailSource = item.thumbnail.includes('unsplash.com') ? 'fallback' : 'actual';
        
        // 실제 네이버 블로그 링크인 경우에만 스크래핑 시도
        if (item.link && item.link.includes('blog.naver.com') && !item.link.includes('rss.blog.naver.com')) {
          try {
            const {content: scrapedContent, thumbnail: scrapedThumbnail} = await scrapeContentAndExtractThumbnail(
              item.link, 
              item.description, 
              item.category
            );
            fullContent = scrapedContent;
            actualThumbnail = scrapedThumbnail;
            contentSource = 'scraped';
            thumbnailSource = scrapedThumbnail.includes('unsplash.com') ? 'fallback' : 'actual';
          } catch (scrapeError) {
            console.log(`Scraping failed for ${item.link}, using RSS content:`, scrapeError);
            fullContent = `<div class="rss-content">
              <p>${item.description.replace(/<[^>]*>/g, '')}</p>
              <p style="margin-top: 16px;">
                <em>전체 내용을 보려면 
                  <a href="${item.link}" target="_blank" style="color: #8B5CF6; text-decoration: underline;">
                    원문 보기
                  </a>를 클릭해주세요.
                </em>
              </p>
            </div>`;
            contentSource = 'rss-fallback';
          }
        } else {
          // RSS만 사용하는 경우
          fullContent = `<div class="rss-content">
            <p>${item.description.replace(/<[^>]*>/g, '')}</p>
            <p style="margin-top: 16px;">
              <em>전체 내용을 보려면 
                <a href="${item.link || 'https://blog.naver.com/amz_carry'}" target="_blank" style="color: #8B5CF6; text-decoration: underline;">
                  원문 보기
                </a>를 클릭해주세요.
              </em>
            </p>
          </div>`;
        }
        
        const post = {
          id: `post-${Date.now()}-${index}`,
          category: item.category,
          readTime: '3분 읽기',
          title: item.title,
          excerpt: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          date: formatDate(item.pubDate),
          thumbnail: actualThumbnail,
          htmlContent: fullContent,
          link: item.link || 'https://blog.naver.com/amz_carry',
          contentSource,
          thumbnailSource
        };
        
        blogPosts.push(post);
        console.log(`✅ Successfully processed: ${post.title}`);
        console.log(`📷 Thumbnail type: ${post.thumbnailSource}`);
        console.log(`📝 Content source: ${post.contentSource}`);
        
      } catch (error) {
        console.error(`❌ Error processing item ${index + 1}:`, error);
        
        // 개별 아이템 처리 실패 시에도 기본 정보는 포함
        try {
          const fallbackPost = {
            id: `post-${Date.now()}-${index}-fallback`,
            category: item.category || '아마존 인사이트',
            readTime: '3분 읽기',
            title: item.title || '아마존 성공 인사이트',
            excerpt: item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '아마존캐리의 전문 인사이트를 확인해보세요.',
            date: formatDate(item.pubDate || new Date().toISOString()),
            thumbnail: getDefaultThumbnail(item.category || '아마존 인사이트'),
            htmlContent: `<div class="fallback-content">
              <p>이 글의 내용을 불러올 수 없습니다.</p>
              <p style="margin-top: 16px;">
                <em>네이버 블로그에서 전체 내용을 확인해주세요: 
                  <a href="${item.link || 'https://blog.naver.com/amz_carry'}" target="_blank" style="color: #8B5CF6; text-decoration: underline;">
                    원문 보기
                  </a>
                </em>
              </p>
            </div>`,
            link: item.link || 'https://blog.naver.com/amazoncarry',
            contentSource: 'fallback',
            thumbnailSource: 'fallback'
          };
          blogPosts.push(fallbackPost);
          console.log(`⚠️ Added fallback post: ${fallbackPost.title}`);
        } catch (fallbackError) {
          console.error(`❌ Failed to create fallback post for item ${index + 1}:`, fallbackError);
        }
      }
    }

    // 최소 하나의 포스트는 보장
    if (blogPosts.length === 0) {
      console.log('No posts generated, creating default posts');
      const defaultPosts = createFallbackPosts().map((item, index) => ({
        id: `default-post-${index}`,
        category: item.category,
        readTime: '3분 읽기',
        title: item.title,
        excerpt: item.description.substring(0, 150) + '...',
        date: formatDate(item.pubDate),
        thumbnail: item.thumbnail,
        htmlContent: `<div class="default-content">
          <p>${item.description}</p>
          <p style="margin-top: 16px;">
            <em>최신 아마존 인사이트를 확인하려면 
              <a href="https://blog.naver.com/amz_carry" target="_blank" style="color: #8B5CF6; text-decoration: underline;">
                네이버 블로그
              </a>를 방문해주세요.
            </em>
          </p>
        </div>`,
        link: item.link,
        contentSource: 'default',
        thumbnailSource: 'fallback'
      }));
      blogPosts.push(...defaultPosts);
    }

    // 일반 캐시 저장
    await kv.set(cacheKey, {
      posts: blogPosts,
      timestamp: now
    });

    // 성공한 데이터는 비상용 캐시로도 저장 (더 긴 기간)
    if (blogPosts.length > 0 && blogPosts.some(p => p.contentSource !== 'emergency')) {
      await kv.set(FALLBACK_CACHE_KEY, {
        posts: blogPosts,
        timestamp: now
      });
      console.log('Also saved to emergency cache for future fallback');
    }

    console.log(`\n🎉 Successfully cached ${blogPosts.length} blog posts`);
    console.log(`📊 Stats:`);
    const actualCount = blogPosts.filter(p => p.thumbnailSource === 'actual').length;
    const fallbackCount = blogPosts.filter(p => p.thumbnailSource === 'fallback').length;
    const scrapedCount = blogPosts.filter(p => p.contentSource === 'scraped').length;
    const rssCount = blogPosts.filter(p => p.contentSource.includes('rss')).length;
    console.log(`   - Actual thumbnails: ${actualCount}`);
    console.log(`   - Fallback thumbnails: ${fallbackCount}`);
    console.log(`   - Scraped content: ${scrapedCount}`);
    console.log(`   - RSS content: ${rssCount}`);

    return c.json({
      success: true,
      posts: blogPosts,
      source: 'fresh',
      cached_at: new Date(now).toISOString(),
      stats: {
        total: blogPosts.length,
        actualThumbnails: actualCount,
        fallbackThumbnails: fallbackCount,
        scrapedContent: scrapedCount,
        rssContent: rssCount
      }
    });

  } catch (error) {
    console.error('Blog posts API error:', error);
    
    // 최종 폴백: 기본 포스트들 반환
    console.log('Returning default posts due to complete API failure');
    const defaultPosts = createFallbackPosts().map((item, index) => ({
      id: `emergency-post-${index}`,
      category: item.category,
      readTime: '3분 읽기',
      title: item.title,
      excerpt: item.description.substring(0, 150) + '...',
      date: formatDate(item.pubDate),
      thumbnail: item.thumbnail,
      htmlContent: `<div class="emergency-content">
        <p>${item.description}</p>
        <p style="margin-top: 16px;">
          <em>최신 아마존 인사이트를 확인하려면 
            <a href="https://blog.naver.com/amz_carry" target="_blank" style="color: #8B5CF6; text-decoration: underline;">
              네이버 블로그
            </a>를 방문해주세요.
          </em>
        </p>
      </div>`,
      link: item.link,
      contentSource: 'emergency',
      thumbnailSource: 'fallback'
    }));
    
    return c.json({
      success: true,
      posts: defaultPosts,
      source: 'emergency',
      error: `API error: ${error.message}`,
      cached_at: new Date().toISOString()
    });
  }
});

// 헬스체크
app.get('/make-server-89cc3cd0/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 캐시 워밍 엔드포인트 (선택적)
app.get('/make-server-89cc3cd0/warm-cache', async (c) => {
  try {
    console.log('Cache warming triggered');
    
    // 캐시를 무시하고 강제로 새 데이터 가져오기
    const cacheKey = 'blog_posts_cache_v2';
    await kv.del(cacheKey); // 기존 캐시 삭제
    
    // blog-posts 엔드포인트 호출하여 새 캐시 생성
    const result = await fetch(`${c.req.url.replace('/warm-cache', '/blog-posts')}`);
    const data = await result.json();
    
    return c.json({
      success: true,
      message: 'Cache warmed successfully',
      postsCount: data.posts?.length || 0,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cache warming failed:', error);
    return c.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, 500);
  }
});

// 기본 라우트
app.get('/', (c) => {
  return c.text('Amazon Carry Blog Server is running!');
});

export default {
  fetch: app.fetch,
};

Deno.serve(app.fetch);