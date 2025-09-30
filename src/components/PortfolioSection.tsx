import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, X, ExternalLink, TrendingUp, Target, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "./ui/dialog";

// 포트폴리오 데이터 타입 정의
interface PortfolioCase {
  id: string;
  title: string;
  category: string;
  service: string;
  summary: string;
  image: string;
  modal: {
    title: string;
    description: string[];
    achievements: {
      label: string;
      value: string;
      icon: any;
    }[];
    images: {
      title: string;
      url?: string;
      placeholder?: string;
    }[];
  };
}

// 포트폴리오 사례 데이터
const portfolioCases: PortfolioCase[] = [
  {
    id: "optatum",
    title: "OPTATUM 페이퍼 인센스",
    category: "홈 데코 / 향 제품",
    service: "운영 서비스",
    summary: "낯선 카테고리도 콘텐츠와 광고 전략으로 성공적 안착.",
    image: "https://live.staticflickr.com/65535/54764607269_987dc0a3d5_b.jpg",
    modal: {
      title: "OPTATUM 페이퍼 인센스 레퍼런스",
      description: [
        "국내에서 익숙한 '페이퍼 인센스'는 미국 소비자에게는 낯선 제품입니다.",
        "아마존캐리는 리스팅 콘텐츠와 광고 전략으로 USP를 효과적으로 전달했습니다.",
        "제품의 독특함을 강점으로 활용하여 차별화된 포지셔닝을 구축했습니다."
      ],
      achievements: [
        {
          label: "연 매출",
          value: "$170,000",
          icon: TrendingUp
        },
        {
          label: "ROAS",
          value: "600%",
          icon: Target
        },
        {
          label: "카테고리 순위",
          value: "Top 100 진입",
          icon: Award
        }
      ],
      images: [
        {
          title: "리스팅 화면 캡처",
          url: "https://live.staticflickr.com/65535/54763525702_1e7769f2db_b.jpg"
        },
        {
          title: "브랜드 스토어 캡처",
          url: "https://live.staticflickr.com/65535/54764374266_9ae7d2b5e7_b.jpg"
        }
      ]
    }
  },
  {
    id: "duoair",
    title: "DUOAIR 속눈썹 접착제",
    category: "뷰티 (속눈썹 접착제)",
    service: "시즌패스 (입점+운영 통합)",
    summary: "패키지 리디자인 + 콘텐츠 제작으로 현지 MZ 감성에 맞춘 진입.",
    image: "https://live.staticflickr.com/65535/54763584912_8a349295a2_b.jpg",
    modal: {
      title: "DUOAIR 속눈썹 접착제 레퍼런스",
      description: [
        "기존 B2B·도매 패키지를 미국 MZ 감성에 맞게 완전히 리디자인했습니다.",
        "리스팅 콘텐츠와 톤을 일관되게 제작하여 브랜드 통일성을 확보했습니다.",
        "아마존캐리는 단순 번역 대행이 아니라, 패키지부터 리스팅까지 아우르는 통합 진입 기획을 수행했습니다."
      ],
      achievements: [
        {
          label: "패키지 리디자인",
          value: "MZ 감성 완료",
          icon: Award
        },
        {
          label: "브랜드 통일성",
          value: "100% 달성",
          icon: Target
        },
        {
          label: "현지화 전략",
          value: "통합 기획",
          icon: TrendingUp
        }
      ],
      images: [
        {
          title: "패키지 리뉴얼",
          url: "https://live.staticflickr.com/65535/54764672688_2a6291f989_b.jpg"
        },
        {
          title: "리스팅 콘텐츠 제작",
          url: "https://live.staticflickr.com/65535/54764672708_439660e4e7_b.jpg"
        }
      ]
    }
  },
  {
    id: "lio",
    title: "LIO FLEX Safety Work Gloves",
    category: "작업용 장갑",
    service: "운영 서비스",
    summary: "비효율적 광고 운영을 수익성 중심 구조로 전환.",
    image: "https://live.staticflickr.com/65535/54764669774_a438cb223a_c.jpg",
    modal: {
      title: "LIO FLEX Safety Work Gloves 레퍼런스",
      description: [
        "초기 광고비 과다 지출로 수익이 거의 없던 상황을 완전히 개선했습니다.",
        "틈새 키워드 전략과 전략적 가격 설정을 통해 수익성 구조를 구축했습니다.",
        "데이터 기반의 체계적인 광고 운영으로 지속가능한 성장 모델을 완성했습니다."
      ],
      achievements: [
        {
          label: "월 판매량",
          value: "2,000개 이상",
          icon: TrendingUp
        },
        {
          label: "ROAS",
          value: "1000%",
          icon: Target
        },
        {
          label: "카테고리 순위",
          value: "Top 100 진입",
          icon: Award
        }
      ],
      images: [
        {
          title: "리스팅 페이지",
          url: "https://live.staticflickr.com/65535/54764666569_cb65af97e9_b.jpg"
        },
        {
          title: "Top 100 진입",
          url: "https://live.staticflickr.com/65535/54764778615_54c917b80d_s.jpg"
        }
      ]
    }
  }
];

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  case: PortfolioCase | null;
}

function PortfolioModal({ isOpen, onClose, case: portfolioCase }: PortfolioModalProps) {
  const [enlargedImage, setEnlargedImage] = useState<{ url: string; title: string } | null>(null);

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
        if (enlargedImage) {
          setEnlargedImage(null);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose, enlargedImage]);

  const handleImageClick = (image: { url?: string; title: string }) => {
    if (image.url) {
      setEnlargedImage({ url: image.url, title: image.title });
    }
  };

  const handleCloseEnlargedImage = () => {
    setEnlargedImage(null);
  };

  if (!portfolioCase) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="portfolio-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Background overlay */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Modal content */}
            <motion.div
              className="relative bg-white card-radius subtle-shadow max-w-6xl w-full max-h-[90vh] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 btn-radius">
                      {portfolioCase.category}
                    </Badge>
                    <Badge variant="outline" className="border-accent/30 text-accent btn-radius">
                      {portfolioCase.service}
                    </Badge>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="w-10 h-10 bg-section hover:bg-gray-200 btn-radius flex items-center justify-center transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-sub" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-hide">
                <div className="p-8 pt-6 lg:px-12 lg:pt-8">
                  {/* Title */}
                  <motion.div
                    className="mb-8 lg:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h1 className="text-h2 font-bold text-main mb-4 leading-tight lg:px-4">
                      {portfolioCase.modal.title}
                    </h1>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    className="mb-12 lg:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="space-y-4 lg:px-4">
                      {portfolioCase.modal.description.map((paragraph, index) => (
                        <p key={index} className="text-main text-body leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>

                  {/* Achievements */}
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-semibold text-main mb-8 text-center">주요 성과</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {portfolioCase.modal.achievements.map((achievement, index) => {
                        const IconComponent = achievement.icon;
                        return (
                          <motion.div
                            key={index}
                            className="bg-accent/5 card-radius p-6 text-center border border-accent/10 subtle-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                              <IconComponent className="w-8 h-8 text-primary" strokeWidth={2} />
                            </div>
                            <h4 className="font-semibold text-sub mb-2">{achievement.label}</h4>
                            <p className="text-2xl font-semibold text-main">{achievement.value}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Images Placeholders */}
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-semibold text-main mb-8 text-center">실제 작업 결과</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {portfolioCase.modal.images.map((image, index) => (
                        <motion.div
                          key={index}
                          className="bg-section card-radius overflow-hidden border border-gray-200 subtle-shadow"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          {image.url ? (
                            <div 
                              className="relative cursor-pointer group"
                              onClick={() => handleImageClick(image)}
                            >
                              <img
                                src={image.url}
                                alt={image.title}
                                className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                  </svg>
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                <h4 className="font-semibold text-white text-lg">{image.title}</h4>
                              </div>
                            </div>
                          ) : (
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                              <div className="text-center">
                                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <ExternalLink className="w-8 h-8 text-gray-500" />
                                </div>
                                <h4 className="font-semibold text-gray-700 mb-2">{image.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{image.placeholder}</p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Enlargement Modal */}
      <AnimatePresence mode="wait">
        {enlargedImage && (
          <motion.div
            key="image-modal"
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background overlay */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseEnlargedImage}
            />

            {/* Enlarged image content */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-5xl max-h-[90vh] overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <button
                onClick={handleCloseEnlargedImage}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <div className="relative">
                <img
                  src={enlargedImage.url}
                  alt={enlargedImage.title}
                  className="max-w-full max-h-[80vh] object-contain"
                />
                
                {/* Image title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h4 className="font-semibold text-white text-xl">{enlargedImage.title}</h4>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(1); // 시작을 1로 설정 (첫 번째 실제 슬라이드)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCase, setSelectedCase] = useState<PortfolioCase | null>(null);

  // 무한 루프를 위한 확장된 배열 생성
  const extendedCases = [
    portfolioCases[portfolioCases.length - 1], // 마지막 슬라이드를 맨 앞에
    ...portfolioCases, // 원본 슬라이드들
    portfolioCases[0] // 첫 번째 슬라이드를 맨 뒤에
  ];

  const handleOpenModal = (portfolioCase: PortfolioCase) => {
    setSelectedCase(portfolioCase);
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
  };

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // 현재 인덱스에서 다음으로 이동
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    
    // 마지막 복사본에 도달했을 때 (첫 번째 실제 슬라이드의 복사본)
    if (newIndex === extendedCases.length - 1) {
      setTimeout(() => {
        // transition을 제거하고 즉시 점프
        setIsTransitioning(false);
        // 다음 프레임에서 인덱스 변경 (transition 없이)
        requestAnimationFrame(() => {
          setCurrentIndex(1); // 첫 번째 실제 슬라이드로 즉시 점프
        });
      }, 700); // transition 완료 후 점프
    } else {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }
  }, [currentIndex, isTransitioning, extendedCases.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // 현재 인덱스에서 이전으로 이동
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    
    // 첫 번째 복사본에 도달했을 때 (마지막 실제 슬라이드의 복사본)
    if (newIndex === 0) {
      setTimeout(() => {
        // transition을 제거하고 즉시 점프
        setIsTransitioning(false);
        // 다음 프레임에서 인덱스 변경 (transition 없이)
        requestAnimationFrame(() => {
          setCurrentIndex(portfolioCases.length); // 마지막 실제 슬라이드로 즉시 점프
        });
      }, 700);
    } else {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }
  }, [currentIndex, isTransitioning, portfolioCases.length]);

  // 자동 슬라이드 (5초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        // 현재 인덱스가 실제 슬라이드 범위 내에 있을 때만 자동 슬라이딩
        if (currentIndex >= 1 && currentIndex <= portfolioCases.length) {
          setIsTransitioning(true);
          const newIndex = currentIndex + 1;
          setCurrentIndex(newIndex);
          
          // 마지막 복사본에 도달했을 때 첫 번째 실제 슬라이드로 점프
          if (newIndex === extendedCases.length - 1) {
            setTimeout(() => {
              // transition을 제거하고 즉시 점프
              setIsTransitioning(false);
              // 다음 프레임에서 인덱스 변경 (transition 없이)
              requestAnimationFrame(() => {
                setCurrentIndex(1);
              });
            }, 700);
          } else {
            setTimeout(() => {
              setIsTransitioning(false);
            }, 700);
          }
        }
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isTransitioning, portfolioCases.length, extendedCases.length]);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setCurrentIndex(index + 1); // 실제 인덱스는 +1 (복사본 때문에)
  };

  return (
    <>
      <section id="portfolio" className="py-20 sm:py-24 relative overflow-hidden">
        {/* 깔끔한 배경 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#F8F9FA]" />
          
          {/* 미니멀한 배경 요소들 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-80 h-80 bg-[#FFB800]/2 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1C3D5A]/2 rounded-full blur-3xl" />
          </div>

          {/* 도트 패턴 */}
          <div 
            className="absolute inset-0 opacity-[0.008]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #1C3D5A 1px, transparent 0)`,
              backgroundSize: '56px 56px'
            }}
          />
        </div>
        
        {/* 섹션 구분선 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-[#1C3D5A]/20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 헤더 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#FFB800]/10 text-[#FFB800] px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <Award className="w-4 h-4" />
              성공 사례
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1C3D5A] mb-4 sm:mb-6">
              <span className="text-[#FFB800]">
                검증된 성과
              </span><br />
              포트폴리오
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-[#868E96] max-w-4xl mx-auto leading-relaxed">
              다양한 업종에서 쌓아온<br />
              <span className="font-semibold text-[#1C3D5A]">실제 성공 사례를 확인하세요</span>
            </p>
          </motion.div>

          {/* 카드 캐루셀 컨테이너 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* 슬라이드들 */}
            <div className="relative overflow-hidden rounded-2xl">
              <motion.div
                className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : 'transition-none'}`}
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`
                }}
              >
                {extendedCases.map((portfolioCase, index) => (
                  <div key={`${portfolioCase.id}-${index}`} className="w-full flex-shrink-0 px-2">
                    <Card className="h-[500px] rounded-2xl border-none shadow-lg overflow-hidden group cursor-pointer">
                      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] h-full">
                        {/* 좌측: 이미지 섹션 */}
                        <div className="relative overflow-hidden lg:h-full h-64">
                          <motion.img
                            src={portfolioCase.image}
                            alt={portfolioCase.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            whileHover={{ scale: 1.05 }}
                          />
                          {/* 그라데이션 오버레이 */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          
                          {/* 상단 좌측: 카테고리 뱃지 */}
                          <div className="absolute top-6 left-6">
                            <Badge className="bg-white/90 text-[#222222] hover:bg-white">
                              {portfolioCase.category}
                            </Badge>
                          </div>
                          
                          {/* 상단 우측: 서비스 뱃지 */}
                          <div className="absolute top-6 right-6">
                            <Badge className="bg-[#FFB800] text-[#1C3D5A]">
                              {portfolioCase.service}
                            </Badge>
                          </div>
                        </div>

                        {/* 우측: 콘텐츠 섹션 */}
                        <CardContent className="flex flex-col justify-center p-0 lg:pl-8">
                          <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="p-8 lg:pl-40 lg:pr-8 lg:py-12 lg:ml-8"
                          >
                            {/* 레퍼런스 사례 라벨 */}
                            <div className="text-sm text-[#FFB800] font-semibold mb-3 uppercase tracking-wider">
                              레퍼런스 사례
                            </div>
                            
                            {/* 제목 */}
                            <h3 className="text-2xl lg:text-3xl font-bold text-[#1C3D5A] mb-6 leading-tight">
                              {portfolioCase.title}
                            </h3>
                            
                            {/* 요약 설명 */}
                            <p className="text-[#868E96] text-lg leading-relaxed mb-8">
                              {portfolioCase.summary}
                            </p>
                            
                            {/* "자세히 보기" 버튼 */}
                            <Button
                              onClick={() => handleOpenModal(portfolioCase)}
                              className="bg-[#1C3D5A] hover:bg-[#15324A] text-white hover:shadow-lg px-8 py-3 font-semibold group"
                            >
                              자세히 보기
                              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                            </Button>
                          </motion.div>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* 네비게이션 화살표 */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            >
              <ArrowRight className="w-6 h-6 text-[#1C3D5A] rotate-180" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            >
              <ArrowRight className="w-6 h-6 text-[#1C3D5A]" />
            </button>

            {/* 도트 인디케이터 */}
            <div className="flex justify-center mt-8 space-x-3">
              {portfolioCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-200 ${
                    index === ((currentIndex - 1 + portfolioCases.length) % portfolioCases.length)
                      ? 'bg-[#FFB800] w-8'
                      : 'bg-[#868E96]/30 hover:bg-[#868E96]/50 w-3'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Modal */}
      <PortfolioModal
        isOpen={selectedCase !== null}
        onClose={handleCloseModal}
        case={selectedCase}
      />
    </>
  );
}