import React, { useState, useEffect } from 'react'

// 기본 에러 이미지 (SVG)
const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

// 네이버 블로그 이미지용 플레이스홀더 (카테고리별)
const getCategoryPlaceholder = (category?: string): string => {
  const placeholders = {
    '아마존 가이드': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop&crop=center',
    '아마존 광고': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&crop=center',
    '콘텐츠 마케팅': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop&crop=center',
    '브랜드 등록': 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=450&fit=crop&crop=center',
    '아마존 인사이트': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&crop=center',
    '셀러 가이드': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop&crop=center',
    '마케팅 전략': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop&crop=center'
  };
  
  return placeholders[category as keyof typeof placeholders] || placeholders['아마존 인사이트'];
};

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
  enableLog?: boolean;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  fallbackCategory, 
  enableLog = false,
  ...props 
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [didError, setDidError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 2;

  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src);
      setDidError(false);
      setIsLoading(true);
      setRetryCount(0);
    }
  }, [src, currentSrc]);

  const handleError = () => {
    if (enableLog) {
      console.error('Image failed to load:', currentSrc);
    }

    if (retryCount < maxRetries && currentSrc && !currentSrc.includes('unsplash.com')) {
      // 네이버 이미지인 경우 몇 가지 URL 변형을 시도
      const originalSrc = currentSrc;
      let newSrc = '';

      if (retryCount === 0) {
        // 첫 번째 재시도: https로 변경
        if (originalSrc.startsWith('http://')) {
          newSrc = originalSrc.replace('http://', 'https://');
        }
        // 또는 네이버 CDN URL로 변경 시도
        else if (originalSrc.includes('blog.naver.com')) {
          const pathMatch = originalSrc.match(/\/([^\/]+)$/);
          if (pathMatch) {
            newSrc = `https://blogfiles.naver.net/MjAyMzEyMTFfMjAz/${pathMatch[1]}`;
          }
        }
      }

      if (newSrc && newSrc !== originalSrc) {
        if (enableLog) {
          console.log(`Retrying with URL (attempt ${retryCount + 1}):`, newSrc);
        }
        setCurrentSrc(newSrc);
        setRetryCount(prev => prev + 1);
        return;
      }
    }

    // 재시도가 끝났거나 실패한 경우 카테고리별 fallback 사용
    const fallbackSrc = getCategoryPlaceholder(fallbackCategory);
    if (enableLog) {
      console.log('Using category fallback:', fallbackSrc);
    }
    setCurrentSrc(fallbackSrc);
    setDidError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setDidError(false);
    if (enableLog) {
      console.log('Image loaded successfully:', currentSrc);
    }
  };

  // 이미지 URL이 유효하지 않은 경우 즉시 fallback 사용
  if (!currentSrc || currentSrc.trim() === '') {
    const fallbackSrc = getCategoryPlaceholder(fallbackCategory);
    return (
      <img
        src={fallbackSrc}
        alt={alt || '아마존 관련 이미지'}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* 로딩 상태 */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* 실제 이미지 */}
      <img
        src={currentSrc}
        alt={alt || '아마존 관련 이미지'}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
        {...props}
      />
    </div>
  );
}