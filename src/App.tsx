import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AmazonEntrySection } from "./components/AmazonEntrySection";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { PricingSection } from "./components/PricingSection";
import { BlogSection } from "./components/BlogSection";
import { ContactSection } from "./components/ContactSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useEffect, useState, useCallback } from "react";
import { MessageCircle, ClipboardCheck } from "lucide-react";
import eulaContent from "../EULA.md?raw";
import privacyContent from "../Privacy_Policy.md?raw";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedFab, setExpandedFab] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const path = typeof window !== "undefined" ? window.location.pathname : "/";

  // Simplified scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    const maxScroll = scrollHeight - clientHeight;
    const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    
    setScrollProgress(Math.max(0, Math.min(100, progress)));
  }, []);

  // Simplified resize handler
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    // Initial setup
    setIsMobile(window.innerWidth <= 768);

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  // Simplified FAB handlers
  const handleFabInteraction = useCallback((fabId: string, action: () => void) => {
    if (isMobile) {
      if (expandedFab === fabId) {
        action();
        setExpandedFab(null);
      } else {
        setExpandedFab(fabId);
        setTimeout(() => setExpandedFab(null), 3000);
      }
    } else {
      action();
    }
  }, [isMobile, expandedFab]);

  const handleFabHover = useCallback((fabId: string, isHovering: boolean) => {
    if (!isMobile) {
      setExpandedFab(isHovering ? fabId : null);
    }
  }, [isMobile]);

  if (path.startsWith("/legal/eula")) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-white">
          <Header />
          <main className="max-w-3xl mx-auto px-4 py-16">
            <h1 className="text-2xl font-semibold mb-6">EULA</h1>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">{eulaContent}</pre>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    );
  }

  if (path.startsWith("/legal/privacy")) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-white">
          <Header />
          <main className="max-w-3xl mx-auto px-4 py-16">
            <h1 className="text-2xl font-semibold mb-6">Privacy Policy</h1>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">{privacyContent}</pre>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white relative">
      {/* Scroll progress indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FFB800] z-50"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: 'left'
        }}
      />

      {/* Main content */}
      <div>
        <Header />
        
        <main>
          <HeroSection />
          <AmazonEntrySection />
          <ServicesSection />
          <PortfolioSection />
          <PricingSection />
          <FAQSection />
          <BlogSection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>

      {/* Simplified floating action buttons */}
      <div
        className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col gap-3 z-50 transition-all duration-300 ${
          scrollProgress > 10 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* 무료 타당성 조사 버튼 */}
        <div className="flex justify-end">
          <button
            className={`bg-[#FFB800] hover:bg-[#E5A600] text-[#1C3D5A] shadow-lg hover:shadow-xl flex items-center rounded-lg transition-all duration-200 ease-out flex-shrink-0 h-14 ${
              expandedFab === 'feasibility' ? 'w-48 px-4 justify-between' : 'w-14 justify-center'
            }`}
            onMouseEnter={() => handleFabHover('feasibility', true)}
            onMouseLeave={() => handleFabHover('feasibility', false)}
            onClick={() => {
              handleFabInteraction('feasibility', () => {
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSdeLewllbICJgW-77OIcaZ7r7uIsGyKopRFEXl1whHQZq7umg/viewform?usp=header', '_blank');
              });
            }}
            aria-label="AI 무료 시장 조사"
          >
            {expandedFab === 'feasibility' && (
              <span className="text-sm font-medium whitespace-nowrap">
                AI 무료 시장 조사
              </span>
            )}
            <ClipboardCheck className="w-6 h-6 flex-shrink-0" />
          </button>
        </div>

        {/* 카카오톡 채널 버튼 */}
        <div className="flex justify-end">
          <button
            className={`bg-[#FEE500] hover:bg-[#FFEB3B] text-[#1C3D5A] shadow-lg hover:shadow-xl flex items-center rounded-lg transition-all duration-200 ease-out flex-shrink-0 h-14 ${
              expandedFab === 'kakao' ? 'w-44 px-4 justify-between' : 'w-14 justify-center'
            }`}
            onMouseEnter={() => handleFabHover('kakao', true)}
            onMouseLeave={() => handleFabHover('kakao', false)}
            onClick={() => {
              handleFabInteraction('kakao', () => {
                window.open('http://pf.kakao.com/_xakHNn/chat', '_blank');
              });
            }}
            aria-label="카카오톡 상담"
          >
            {expandedFab === 'kakao' && (
              <span className="text-sm font-medium whitespace-nowrap">
                카카오톡 상담
              </span>
            )}
            <MessageCircle className="w-6 h-6 flex-shrink-0" />
          </button>
        </div>

        {/* 맨 위로 스크롤 버튼 */}
        <div className="flex justify-end">
          <button
            className={`bg-[#1C3D5A] hover:bg-[#15324A] text-white shadow-lg hover:shadow-xl flex items-center rounded-lg transition-all duration-200 ease-out flex-shrink-0 h-14 ${
              expandedFab === 'scrollTop' ? 'w-32 px-4 justify-between' : 'w-14 justify-center'
            }`}
            onMouseEnter={() => handleFabHover('scrollTop', true)}
            onMouseLeave={() => handleFabHover('scrollTop', false)}
            onClick={() => {
              handleFabInteraction('scrollTop', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              });
            }}
            aria-label="맨 위로"
          >
            {expandedFab === 'scrollTop' && (
              <span className="text-sm font-medium whitespace-nowrap">
                맨 위로
              </span>
            )}
            <svg
              className="w-6 h-6 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
}