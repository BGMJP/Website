// 강화된 RSS 이미지 추출 함수
export function extractImageFromRSS(htmlContent: string): string | null {
  try {
    console.log('=== Enhanced RSS Image Extraction ===');
    console.log(`RSS content length: ${htmlContent.length} characters`);
    console.log(`Content preview: ${htmlContent.substring(0, 500)}...`);
    
    // 1. 직접 이미지 URL 패턴 검색 (가장 확실한 방법)
    const naverImagePatterns = [
      // postfiles.pstatic.net (사용자가 확인한 실제 패턴)
      /https?:\/\/postfiles\.pstatic\.net\/[^\s'"<>]+\.(?:PNG|png|JPG|jpg|JPEG|jpeg|GIF|gif|WEBP|webp)(?:\?[^\s'"<>]*)?/g,
      // blogfiles.naver.net
      /https?:\/\/blogfiles\.naver\.net\/[^\s'"<>]+\.(?:PNG|png|JPG|jpg|JPEG|jpeg|GIF|gif|WEBP|webp)(?:\?[^\s'"<>]*)?/g,
      // storep-phinf.pstatic.net  
      /https?:\/\/storep-phinf\.pstatic\.net\/[^\s'"<>]+\.(?:PNG|png|JPG|jpg|JPEG|jpeg|GIF|gif|WEBP|webp)(?:\?[^\s'"<>]*)?/g,
    ];
    
    for (const [index, pattern] of naverImagePatterns.entries()) {
      const matches = Array.from(htmlContent.matchAll(pattern));
      if (matches.length > 0) {
        const imageUrl = matches[0][0];
        console.log(`✅ Direct pattern ${index + 1} found image: ${imageUrl}`);
        return imageUrl;
      }
    }
    
    // 2. IMG 태그 내에서 네이버 이미지 검색
    const imgTagRegexes = [
      /<img[^>]*src=['"]([^'"]*postfiles\.pstatic\.net[^'"]*\.(?:png|jpg|jpeg|gif|webp)[^'"]*)['"]/gi,
      /<img[^>]*src=['"]([^'"]*blogfiles\.naver\.net[^'"]*\.(?:png|jpg|jpeg|gif|webp)[^'"]*)['"]/gi,
      /<img[^>]*src=['"]([^'"]*storep-phinf\.pstatic\.net[^'"]*\.(?:png|jpg|jpeg|gif|webp)[^'"]*)['"]/gi,
    ];
    
    for (const [index, regex] of imgTagRegexes.entries()) {
      const match = htmlContent.match(regex);
      if (match && match[1]) {
        const imageUrl = match[1];
        console.log(`✅ IMG tag pattern ${index + 1} found: ${imageUrl}`);
        return imageUrl;
      }
    }
    
    // 3. 모든 img 태그를 검사해서 네이버 이미지 찾기
    const allImgMatches = Array.from(htmlContent.matchAll(/<img[^>]*src=['"]([^'"]+)['"]/gi));
    console.log(`Found ${allImgMatches.length} img tags in RSS`);
    
    for (const [index, match] of allImgMatches.entries()) {
      const imageUrl = match[1];
      console.log(`IMG ${index + 1}: ${imageUrl}`);
      
      // 네이버 도메인 체크
      if (imageUrl.includes('postfiles.pstatic.net') || 
          imageUrl.includes('blogfiles.naver.net') || 
          imageUrl.includes('storep-phinf.pstatic.net')) {
        console.log(`✅ Found Naver image in img tag: ${imageUrl}`);
        return imageUrl;
      }
    }
    
    console.log('❌ No Naver images found in RSS description');
    return null;
    
  } catch (error) {
    console.error('❌ Error in RSS image extraction:', error);
    return null;
  }
}