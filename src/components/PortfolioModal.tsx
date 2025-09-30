import { motion, AnimatePresence } from "motion/react";
import { X, TrendingUp, Target, Star, Award, Clock, Zap, BarChart3, Users, Globe, MessageSquare, Image, Monitor, Smartphone, Palette, Lightbulb, CheckCircle, Heart, Sparkles, Users2, Leaf, Shield, Zap as ZapIcon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect } from "react";

// A+ 콘텐츠 (정상 작동 확인됨)
import oiadDesktop from "figma:asset/7d130e5f32a3e00f66d31c7ff11c688401435f6b.png";
import oiadMobile from "figma:asset/96365de2bb53119efaa703026856d8402c7f5c99.png";
import duoairDesktop from "figma:asset/61f70d108c4495396727eef297b08712bcfdf9d6.png";
import duoairMobile from "figma:asset/287e20b1467b0b87a450c1ce013d141522b0a9e3.png";
import operationsReportImage from "figma:asset/f3e08d9a7bd39d0ca3b59d3c3ea6ac53fed54d26.png";

interface PortfolioItem {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  image: string;
  metrics: Array<{
    icon: React.ReactNode;
    value: string;
    label: string;
  }>;
  cta: string;
  accentColor: string;
}

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioItem: PortfolioItem;
}

export function PortfolioModal({ isOpen, onClose, portfolioItem }: PortfolioModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // 운영 & 리포트 전용 콘텐츠
  const renderOperationsContent = () => {
    // 운영 & 리포트 이미지들
    const listingImages = [
      { 
        src: "https://live.staticflickr.com/65535/54797217448_48d5af1cc5_b.jpg", 
        alt: "AMZCARRY Weekly Report - 운영 리포트 대시보드"
      },
      { 
        src: "https://live.staticflickr.com/65535/54797217458_5c0a5c0a5c_b.jpg", 
        alt: "운영 & 리포트 01 PERSIMMON BERRY 컬러"
      },
      { 
        src: "https://live.staticflickr.com/65535/54797217468_6c0a5c0a5c_b.jpg", 
        alt: "운영 & 리포트 제품 특징 설명"
      },
      { 
        src: "https://live.staticflickr.com/65535/54797217478_7c0a5c0a5c_b.jpg", 
        alt: "Primer-Infused Blurring Formula"
      },
      { 
        src: "https://live.staticflickr.com/65535/54797217488_8c0a5c0a5c_b.jpg", 
        alt: "Featherlight Mousse Texture"
      },
      { 
        src: "https://live.staticflickr.com/65535/54797217498_9c0a5c0a5c_b.jpg", 
        alt: "Blurs Seamlessly, Fixes All Day"
      },
      { 
        src: "https://live.staticflickr.com/65535/54797217508_ac0a5c0a5c_b.jpg", 
        alt: "자기 발견의 순간 브랜드 메시지"
      },
      { 
        src: "https://live.staticflickr.com/65535/54797217518_b0a5c0a5c_b.jpg", 
        alt: "Holographic Heart 브랜드 아이덴티티"
      }
    ];

    return (
      <div className="space-y-12">
        {/* Intro Text */}
        <div className="text-center">
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            운영 & 리포트 전용 콘텐츠를 기획·제작했습니다.<br />
            브랜드의 신뢰성과 제품 특성을 효과적으로 어필하는 콘텐츠로 완성했습니다.
          </p>
        </div>

        {/* 작업 범위 */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl px-8 py-4">
            <div className="text-center">
              <div className="text-sm font-medium text-blue-600 mb-1">리스팅 이미지</div>
              <div className="text-xs text-gray-500">완성 (8장) ✅</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-blue-600 mb-1">A+ Desktop</div>
              <div className="text-xs text-gray-500">기획·제작 완료 ✅</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-blue-600 mb-1">A+ Mobile</div>
              <div className="text-xs text-gray-500">최적화 완료 ✅</div>
            </div>
          </div>
        </div>

        {/* 리스팅 이미지 갤러리 */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            리스팅 이미지 갤러리 ✨
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listingImages.map((image, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* A+ 콘텐츠 Desktop */}
        <div>
          <motion.h3 
            className="text-2xl font-bold text-gray-900 mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            A+ 콘텐츠 (Desktop) ✅
          </motion.h3>
          <motion.div 
            className="bg-gray-50 rounded-2xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="w-full max-w-4xl mx-auto">
              <ImageWithFallback
                src={oiadDesktop}
                alt="Oiad SILVERPULSE A+ Desktop Content"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* A+ 콘텐츠 Mobile */}
        <div>
          <motion.h3 
            className="text-2xl font-bold text-gray-900 mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            A+ 콘텐츠 (Mobile) ✅
          </motion.h3>
          <motion.div 
            className="bg-gray-50 rounded-2xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
          >
            <div className="w-full max-w-2xl mx-auto">
              <ImageWithFallback
                src={oiadMobile}
                alt="Oiad SILVERPULSE A+ Mobile Content"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* 작업 포인트 */}
        <motion.div 
          className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h4 className="text-xl font-bold text-gray-900 mb-4">제작 포인트</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">럭셔리 브랜딩</h5>
              <p className="text-sm text-gray-600">홀로그래픽 하트 용기와 프리미엄 실버 톤으로 고급스러운 브랜드 이미지 구축</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-pink-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">감성적 어필</h5>
              <p className="text-sm text-gray-600">"자기 발견의 순간"이라는 브랜드 철학을 담은 감성적 메시지 전달</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users2 className="w-6 h-6 text-pink-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">다양성 표현</h5>
              <p className="text-sm text-gray-600">다양한 피부톤에서의 발색을 보여주어 포용적인 브랜드 이미지 강조</p>
            </div>
          </div>
        </motion.div>

        {/* 제작 성과 요약 */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <h3 className="text-2xl font-bold mb-4">완성된 콘텐츠</h3>
          <p className="text-xl opacity-90 mb-6 leading-relaxed">
            운영 & 리포트 전용 콘텐츠를 완성했습니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-xl px-4 py-3">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Image className="w-4 h-4" />
                <span className="font-semibold text-sm">리스팅 이미지</span>
              </div>
              <div className="text-2xl font-bold">8장 완성 ✅</div>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-3">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Monitor className="w-4 h-4" />
                <span className="font-semibold text-sm">A+ Desktop</span>
              </div>
              <div className="text-2xl font-bold">완성 ✅</div>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-3">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Smartphone className="w-4 h-4" />
                <span className="font-semibold text-sm">A+ Mobile</span>
              </div>
              <div className="text-2xl font-bold">완성 ✅</div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // 기존 포트폴리오 아이템들을 위한 일반 콘텐츠
  const renderDefaultContent = () => (
    <div className="space-y-8">
      {/* Hero section */}
      <div className="relative">
        <div className="relative h-80 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src={portfolioItem.image}
            alt={portfolioItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className={`${portfolioItem.categoryColor} text-white px-4 py-2 rounded-full text-sm font-bold mb-3 inline-block`}>
              {portfolioItem.category}
            </span>
            <h2 className="text-3xl font-bold text-white mb-2">{portfolioItem.title}</h2>
            <p className="text-white/90 text-lg">{portfolioItem.description}</p>
          </div>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioItem.metrics.map((metric, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex justify-center mb-4 text-gray-600">
              <div className="p-3 bg-gray-100 rounded-full">
                {metric.icon}
              </div>
            </div>
            <div className={`text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${portfolioItem.accentColor}`}>
              {metric.value}
            </div>
            <div className="text-gray-600 font-medium">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Challenge and solution */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          className="bg-red-50 rounded-2xl p-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-red-900 mb-4">도전 과제</h3>
          <p className="text-red-700 leading-relaxed">
            경쟁이 치열한 아마존 마켓플레이스에서 브랜드 인지도와 매출을 동시에 증대시키는 것이 주요 과제였습니다.
          </p>
        </motion.div>

        <motion.div
          className="bg-green-50 rounded-2xl p-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-green-900 mb-4">솔루션</h3>
          <p className="text-green-700 leading-relaxed">
            데이터 기반 키워드 최적화와 크리에이티브한 광고 전략을 통해 목표를 성공적으로 달성했습니다.
          </p>
        </motion.div>
      </div>

      {/* Results showcase */}
      <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-8 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">최종 성과</h3>
          <p className="text-xl opacity-90 mb-6 leading-relaxed">
            체계적인 전략과 지속적인 최적화를 통해<br />
            클라이언트의 기대를 뛰어넘는 성과를 달성했습니다.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-3">
            <Award className="w-5 h-5" />
            <span className="font-semibold">검증된 성공 사례</span>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 group"
            >
              <X className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="p-8 pt-16">
                {/* Title */}
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                    {portfolioItem.title}
                  </h1>
                  <div className="inline-flex items-center gap-2">
                    <span className={`${portfolioItem.categoryColor} text-white px-4 py-2 rounded-full text-sm font-bold`}>
                      {portfolioItem.category}
                    </span>
                  </div>
                </motion.div>

                {/* Content based on portfolio item */}
                {portfolioItem.id === 1 && renderOiadContent()}
                {portfolioItem.id === 2 && renderDuoairContent()}
                {portfolioItem.id === 3 && renderBenefillContent()}
                {portfolioItem.id !== 1 && portfolioItem.id !== 2 && portfolioItem.id !== 3 && renderDefaultContent()}

                {/* CTA Button */}
                <motion.div
                  className="text-center mt-12 pt-8 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-gray-600 mb-6">
                    이런 성과를 원하신다면 지금 바로 상담받아보세요!
                  </p>
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // 카카오톡 채널로 이동
                      window.open('https://pf.kakao.com/_xakHNn', '_blank');
                    }}
                  >
                    무료 상담 신청하기
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}