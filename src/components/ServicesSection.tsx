import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import React from "react";
import { createPortal } from "react-dom";
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Shield, 
  PenTool, 
  Truck, 
  Target, 
  BarChart3,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from "lucide-react";

interface ServiceStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ElementType;
  modalContent: {
    title: string;
    description: string;
    details: string[];
    images: string[];
  };
}

const serviceSteps: ServiceStep[] = [
  {
    id: "step-1",
    stepNumber: "01.",
    title: "계정 & 브랜드 등록",
    description: "셀러 계정, 가상계좌, 상표권 등록까지. 첫 장벽을 안전하게 넘길 수 있도록 지원합니다.",
    icon: Users,
    modalContent: {
      title: "계정 & 브랜드 등록",
      description: "아마존의 첫 관문, 복잡한 절차에 대한 걱정은 덜고 성공의 확신만 가져가세요.",
      details: [
        "안전한 아마존 계정 생성",
        "셀러 유형 분석 및 최적의 계정 설계",
        "100% 승인을 위한 완벽한 서류 준비 및 가이드",
        "판매 대금 수취용 가상계좌 발급, 연동 및 설정",
        "계정 생성 실패/거절 사례 분석 및 선제적 대응",
        "견고한 브랜드 권리 확보",
        "판매 국가별 상표권 출원 및 등록",
        "아마존 브랜드 레지스트리(Brand Registry) 등록 및 승인",
        "프리미엄 A+ 콘텐츠, 브랜드 광고 도구 등 아마존 브랜드 기능 활성화",
        "브랜드 권한 침해 및 하이재킹 모니터링 및 대응"
      ],
      images: [
        "https://live.staticflickr.com/65535/54797404699_6c80e6bf0e_b.jpg",
        "https://live.staticflickr.com/65535/54797505995_ea1105569a_b.jpg"
      ]
    }
  },
  {
    id: "step-2",
    stepNumber: "02.",
    title: "규제 & 승인 대응",
    description: "FDA, 카테고리 승인 등 수출 규제를 안정적으로 통과합니다.",
    icon: Shield,
    modalContent: {
      title: "규제 & 승인 대응",
      description: "보이지 않는 장벽, 아마존의 까다로운 규제.\n예측 불가능한 리스크까지 완벽하게 대응합니다.",
      details: [
        "국가별 필수 인증 및 규제 통과",
        "판매 국가별 필수 인증(FDA, CE, FCC 등) 사전 검토",
        "식품, 화장품, 의료기기 등 민감 카테고리 승인 컨설팅",
        "인증 및 승인 절차에 필요한 모든 서류 준비 대행",
        "통관 과정에서 발생 가능한 문제에 대한 선제적 방어",
        "아마존 내부 정책 완벽 준수",
        "아마존 내부 규제 정책 분석 및 최신 동향 반영",
        "승인 거절/오류 데이터 기반의 사전 리스크 방지",
        "최신 규제 변경사항 실시간 모니터링 및 즉각 대응"
      ],
      images: [
        "https://live.staticflickr.com/65535/54797471183_ff8c215ec2_b.jpg"
      ]
    }
  },
  {
    id: "step-3",
    stepNumber: "03.",
    title: "리스팅 기획 & 콘텐츠 제작",
    description: "현지 소비자 중심 기획과 SEO 기반 상세페이지.",
    icon: PenTool,
    modalContent: {
      title: "리스팅 기획 & 콘텐츠 제작",
      description: "단순한 제품 소개를 넘어, 고객의 마음을 움직이는.\n'구매 전환율'을 높이는 강력한 아마존 리스팅을 만듭니다.",
      details: [
        "현지 소비자 중심의 리스팅 기획",
        "타겟 시장 트렌드 및 감성 반영 브랜딩/리브랜딩",
        "SEO 기반 키워드 분석 및 최적화된 리스팅 설계",
        "제품 USP(Unique Selling Proposition) 도출 및 강조 전략",
        "아마존 정책 준수 및 안정적인 리스팅 운영",
        "구매 전환율을 높이는 비주얼 콘텐츠",
        "매력적인 제품 리스팅 이미지 기획 및 제작",
        "USP를 담은 직관적인 서브 이미지 디자인",
        "프리미엄 A+ 콘텐츠 및 EBC(Enhanced Brand Content) 제작",
        "최신 트렌드를 반영한 콘텐츠 기획 및 업데이트"
      ],
      images: [
        "https://live.staticflickr.com/65535/54772831421_2806772a70_b.jpg",
        "https://live.staticflickr.com/65535/54771985847_ff873585bc_b.jpg",
        "https://live.staticflickr.com/65535/54773071168_51edef694f_b.jpg"
      ]
    }
  },
  {
    id: "step-4",
    stepNumber: "04.",
    title: "물류 & FBA 입고",
    description: "효율적인 비용 설계와 안전한 FBA 입고.",
    icon: Truck,
    modalContent: {
      title: "물류 & FBA 입고",
      description: "비용과 시간, 더 이상 고민하지 마세요.\n가장 빠르고 경제적인 FBA 입고 플랜을 설계합니다.",
      details: [
        "최적의 글로벌 운송 시스템",
        "항공/해상 운송 상황을 고려한 최적의 배송 루트 선택",
        "글로벌 운송 스케줄 조율 및 실시간 추적 관리",
        "예상치 못한 이슈(통관 지연, 배송 오류)에 대한 비상 대응 계획",
        "물류 비용 최적화 및 투명한 견적 제공",
        "정확하고 안전한 FBA 입고",
        "아마존 FBA 입고 규정에 맞춘 사전 준비 및 서류 작업",
        "FBA 입고를 위한 재고 선적 준비 및 최종 검수",
        "입고 지연 및 재고 손실 리스크 관리 및 모니터링",
        "재고 관리 시스템 구축 및 효율적인 재고 보충 계획"
      ],
      images: [
        "https://live.staticflickr.com/65535/54764326371_edc4419829_b.jpg"
        // 추후 여러 이미지로 업데이트 예정
      ]
    }
  },
  {
    id: "step-5",
    stepNumber: "05.",
    title: "광고 & 마케팅",
    description: "데이터 기반 광고 운영과 인플루언서 협업.",
    icon: Target,
    modalContent: {
      title: "광고 & 마케팅",
      description: "느낌이 아닌 데이터로, 비용을 태우는 광고가 아닌\n매출을 만드는 진짜 마케팅을 실행합니다.",
      details: [
        "데이터 기반 광고 효율 최적화",
        "AI 기반 광고 인사이트 분석 및 자동화 운영",
        "Amazon PPC 캠페인 목적별 설계 및 A/B 테스트",
        "키워드, 예산, 게재위치 실시간 최적화로 광고 효율 극대화",
        "성과 분석 리포트 제공 및 지속적인 개선 전략 수립",
        "브랜드 성장 가속화",
        "실시간 트렌드 모니터링 및 시장 선점 전략 반영",
        "현지 인플루언서 협업 및 UGC(고객 생성 콘텐츠) 확보",
        "구매 전환율을 높이는 긍정 리뷰 관리 및 최적화",
        "장기적인 브랜드 인지도 향상을 위한 통합 마케팅 플랜"
      ],
      images: [
        "https://live.staticflickr.com/65535/54773076783_f84a4ef62f_b.jpg",
        "https://live.staticflickr.com/65535/54773173585_08a57bea1d_b.jpg",
        "https://live.staticflickr.com/65535/54773076798_28b77313dd_b.jpg"
      ]
    }
  },
  {
    id: "step-6",
    stepNumber: "06.",
    title: "운영 & 리포트",
    description: "CS 관리와 종합 리포트로 장기적 성장 전략.",
    icon: BarChart3,
    modalContent: {
      title: "운영 & 리포트",
      description: "오늘의 문제를 해결하는 것을 넘어,\n데이터 속에서 내일의 성장 기회를 아냅니다.",
      details: [
        "안정적인 계정 운영 및 고객 관리",
        "실시간 고객 메시지(CS) 및 리뷰 관리 시스템 운영",
        "NCX(고객 경험) 지표 모니터링 및 계정 건강 최적화",
        "반품 데이터 분석 및 근본적인 원인 개선",
        "부정적 피드백 및 반품률 리스크에 대한 선제적 대응 전략",
        "데이터 기반의 장기 성장 전략",
        "비즈니스 현황을 한눈에 파악하는 맞춤형 리포트 제공",
        "경쟁사 및 시장 분석을 통한 경영 인사이트 도출",
        "제품 개선 및 신제품 기획을 위한 데이터 기반 제안",
        "지속 가능한 성장을 위한 분기/연간 로드맵 수립"
      ],
      images: [
        "https://live.staticflickr.com/65535/54797217448_48d5af1cc5_b.jpg",
        "https://live.staticflickr.com/65535/54772840111_9b0a092c84_b.jpg"
      ]
    }
  }
];

function ServiceModalInternal({ 
  service, 
  setEnlargedImage 
}: { 
  service: ServiceStep;
  setEnlargedImage: (image: { url: string; title: string; isIframe?: boolean } | null) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === service.modalContent.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? service.modalContent.images.length - 1 : prev - 1
    );
  };

  const handleImageClick = (imageUrl: string) => {
    // "운영 & 리포트"의 첫 번째 이미지인 경우 iframe으로 열기
    if (service.modalContent.title === "운영 & 리포트" && currentImageIndex === 0) {
      setEnlargedImage({ 
        url: "https://hs3056.github.io/weeklyreportsample/", 
        title: "리포트 데이터 분석",
        isIframe: true
      });
    } else {
      // 다른 모든 이미지는 일반 이미지 확대로 처리
      setEnlargedImage({ 
        url: imageUrl, 
        title: `${service.modalContent.title} - 이미지 ${currentImageIndex + 1}`,
        isIframe: false
      });
    }
  };



  return (
    <DialogContent 
      className="!max-w-none !w-[95vw] !h-[85vh] !max-h-none overflow-hidden p-0 bg-white border-0 shadow-2xl"
      style={{
        width: '95vw',
        height: '85vh',
        maxWidth: 'none',
        maxHeight: 'none'
      }}
    >
      {/* Minimal Modal Background Effects */}
      <div className="absolute inset-0 bg-[#F8F9FA]" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFB800]" />
      
      {/* Modal Header with Clean Design */}
      <div className="relative bg-white border-b border-gray-100 p-6 backdrop-blur-sm">
        <DialogHeader className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            {/* Premium icon in header */}
            <div className="relative">
              <div className="w-14 h-14 bg-[#1C3D5A] rounded-xl flex items-center justify-center text-white shadow-lg">
                {React.createElement(serviceSteps.find(s => s.modalContent.title === service.modalContent.title)?.icon || Users, {
                  className: "w-7 h-7"
                })}
              </div>
            </div>
            
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-[#1C3D5A] mb-1">
                {service.modalContent.title}
              </DialogTitle>
              <DialogDescription className="text-[#868E96] text-base leading-relaxed">
                {service.modalContent.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
      </div>
      
      {/* Content optimized for no scroll - 스크롤 없이 최적화된 콘텐츠 */}
      <div className="h-[calc(85vh-140px)] relative">
        <div className="p-6 h-full">
          {/* "계정 & 브랜드 등록" 모달만 슬라이드 레이아웃 */}
          {service.modalContent.title === "계정 & 브랜드 등록" ? (
            <>
              {/* 슬라이드 네비게이션 버튼들 */}
              {service.modalContent.images.length > 1 && (
                <>
                  {/* 이전 버튼 */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#1C3D5A] hover:bg-[#15324A] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-10"
                    aria-label="이전 페이지"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {/* 다음 버튼 */}
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1C3D5A] hover:bg-[#15324A] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-10"
                    aria-label="다음 페이지"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  {/* 인디케이터 */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-md z-10">
                    {service.modalContent.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-[#FFB800] scale-125' 
                            : 'bg-gray-400 hover:bg-gray-500'
                        }`}
                        aria-label={`페이지 ${index + 1}로 이동`}
                      />
                    ))}
                  </div>
                  
                  {/* 페이지 카운터 */}
                  <div className="absolute top-3 right-3 bg-[#1C3D5A]/90 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm z-10">
                    {currentImageIndex + 1} / {service.modalContent.images.length}
                  </div>
                </>
              )}

              {/* 첫 번째 슬라이드 - 아마존 셀러 계정, 가상계좌 생성 */}
              {currentImageIndex === 0 && (
                <div className="w-full h-full relative">
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src="https://hs3056.github.io/servicesection1/1-1.png"
                      alt="계정 & 브랜드 등록 - 고해상도 이미지"
                      className="w-full h-full object-contain rounded-lg"
                      decoding="async"
                      loading="eager"
                    />
                  </div>
                </div>
              )}

              {/* 두 번째 슬라이드 - 상표권 확보, 브랜드 권한의 시작 */}
              {currentImageIndex === 1 && (
                <div className="w-full h-full relative">
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src="https://hs3056.github.io/servicesection1/1-2.png"
                      alt="계정 & 브랜드 등록 - 고해상도 이미지 (슬라이드 2)"
                      className="w-full h-full object-contain rounded-lg"
                      decoding="async"
                      loading="eager"
                    />
                  </div>
                </div>
              )}
            </>
          ) : service.modalContent.title === "규제 & 승인 대응" ? (
            // "규제 & 승인 대응" 모달은 별도의 레이아웃
            <div className="w-full h-full relative">
              <div className="w-full h-full flex">
                {/* 왼쪽 영역 - 옅은 회색 사각형 */}
                <div className="w-1/2 h-full bg-[#F8F9FA] flex flex-col justify-center px-16 py-12">
                  <div className="space-y-6">
                    <h2 className="text-[36px] font-bold leading-tight tracking-[-0.01em] text-[#212529]">
                      규제 장벽, 수출의 또 다른 벽
                    </h2>
                    
                    <p className="text-[16px] leading-[160%] text-[#868E96]">
                      현지 법규와 아마존 규제 모두 대응이 필수
                    </p>
                    
                    {/* 강조선 - 32px 길이, 2px 굵기, Accent 컬러 */}
                    <div className="w-8 h-0.5 bg-[#FFB800]"></div>
                    
                    {/* 체크리스트 - 5가지 항목 */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] leading-[160%] text-[#212529]">
                          판매 국가별 필수 인증(FDA, CE, FCC 등) 사전 검토
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] leading-[160%] text-[#212529]">
                          식품, 화장품, 의료기기 등 민감 카테고리 승인 컨설팅
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] leading-[160%] text-[#212529]">
                          통관 과정에서 발생 가능한 문제에 대한 선제적 방어
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] leading-[160%] text-[#212529]">
                          아마존 내부 규제 정책 분석 및 최신 동향 반영
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] leading-[160%] text-[#212529]">
                          최신 규제 변경사항 실시간 모니터링 및 즉각 대응
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 오른쪽 영역 - 이미지 사각형 */}
                <div className="w-1/2 h-full pb-[60px] p-4 flex items-center justify-center">
                  <div className="w-full h-full">
                    <img 
                      src="https://live.staticflickr.com/65535/54797471183_ff8c215ec2_b.jpg"
                      alt="규제 및 승인 관련 화면"
                      className="w-full h-full object-contain object-center rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : service.modalContent.title === "물류 & FBA 입고" ? (
            // "물류 & FBA 입고" 모달은 별도의 레이아웃
            <div className="w-full h-full relative">
              <div className="w-full h-full flex">
                {/* 왼쪽 영역 - 옅은 회색 사각형 */}
                <div className="w-1/2 h-full bg-[#F8F9FA] flex flex-col justify-center px-16 py-12">
                  <div className="space-y-6">
                    <h2 className="text-[36px] font-bold leading-tight tracking-[-0.01em] text-[#212529]">
                      아마존 FBA 입고 종합 컨설팅
                    </h2>
                    
                    <p className="text-[16px] leading-[160%] text-[#868E96]">
                      정책 준수 · 비용 절감 · 맞춤형 물류 전략
                    </p>
                    
                    {/* 강조선 - 32px 길이, 2px 굵기, Accent 컬러 */}
                    <div className="w-8 h-0.5 bg-[#FFB800]"></div>
                    
                    {/* 체크리스트 - 5가지 항목 */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] leading-[160%] text-[#212529]">
                          항공/해상 운송 상황을 고려한 최적의 배송 루트 선택
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] leading-[160%] text-[#212529]">
                          물류 비용 최적화 및 투명한 견적 제공
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] leading-[160%] text-[#212529]">
                          아마존 FBA 입고 규정에 맞춘 사전 준비 및 서류 작업
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] leading-[160%] text-[#212529]">
                          입고 지연 및 재고 손실 리스크 관리 및 모니터링
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] leading-[160%] text-[#212529]">
                          재고 관리 시스템 구축 및 효율적인 재고 보충 계획
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 오른쪽 영역 - 이미지 사각형 */}
                <div className="w-1/2 h-full pb-[60px] p-4 flex items-center justify-center">
                  <div className="w-full h-full">
                    <img 
                      src="https://live.staticflickr.com/65535/54796384222_dbbc232af3_b.jpg"
                      alt="아마존 FBA 입고 관련 화면"
                      className="w-full h-full object-contain object-center rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : service.modalContent.title === "리스팅 기획 & 콘텐츠 제작" ? (
            // "리스팅 기획 & 콘텐츠 제작" 모달은 슬라이드 레이아웃
            <>
              {/* 슬라이드 네비게이션 버튼들 */}
              {service.modalContent.images.length > 1 && (
                <>
                  {/* 이전 버튼 */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#1C3D5A] hover:bg-[#15324A] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-10"
                    aria-label="이전 페이지"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {/* 다음 버튼 */}
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1C3D5A] hover:bg-[#15324A] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-10"
                    aria-label="다음 페이지"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  {/* 인디케이터 */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-md z-10">
                    {service.modalContent.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-[#FFB800] scale-125' 
                            : 'bg-gray-400 hover:bg-gray-500'
                        }`}
                        aria-label={`페이지 ${index + 1}로 이동`}
                      />
                    ))}
                  </div>
                  
                  {/* 페이지 카운터 */}
                  <div className="absolute top-3 right-3 bg-[#1C3D5A]/90 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm z-10">
                    {currentImageIndex + 1} / {service.modalContent.images.length}
                  </div>
                </>
              )}

              {/* 첫 번째 슬라이드 - 리스팅 기획 & SEO 전략 */}
              {currentImageIndex === 0 && (
                <div className="w-full h-full relative">
                  <div className="w-full h-full flex">
                    {/* 왼쪽 영역 - 옅은 회색 사각형 */}
                    <div className="w-1/2 h-full bg-[#F8F9FA] flex flex-col justify-center px-16 py-12">
                      <div className="space-y-6">
                        <h2 className="text-[36px] font-bold leading-tight tracking-[-0.01em] text-[#212529]">
                          리스팅 기획 & SEO 전략
                        </h2>
                        
                        <p className="text-[16px] leading-[160%] text-[#868E96]">
                          빠른 실행 · 현지화 · SEO 성과 · 규정 준수
                        </p>
                        
                        {/* 강조선 - 32px 길이, 2px 굵기, Accent 컬러 */}
                        <div className="w-8 h-0.5 bg-[#FFB800]"></div>
                        
                        {/* 체크리스트 - 4가지 항목 */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              타겟 시장 트렌드 및 감성 반영 브랜딩/리브랜딩
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              SEO 기반 키워드 분석 및 최적화된 리스팅 설계
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              제품 USP(Unique Selling Proposition) 도출 및 강조 전략
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              아마존 정책 준수 및 안정적인 리스팅 운영
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 오른쪽 영역 - 이미지 사각형 */}
                    <div className="w-1/2 h-full pb-[60px] p-4 flex items-center justify-center">
                      <div className="w-full h-full">
                        <img 
                          src="https://live.staticflickr.com/65535/54797622309_91b642db87_b.jpg"
                          alt="리스팅 기획 & SEO 전략 화면"
                          className="w-full h-full object-contain object-center rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 두 번째 슬라이드 - 리스팅 이미지 & A+ 콘텐츠 제작 */}
              {currentImageIndex === 1 && (
                <div className="w-full h-full relative">
                  <div className="w-full h-full flex">
                    {/* 왼쪽 영역 - 옅은 회색 사각형 */}
                    <div className="w-1/2 h-full bg-[#F8F9FA] flex flex-col justify-center px-16 py-12">
                      <div className="space-y-6">
                        <h2 className="text-[36px] font-bold leading-tight tracking-[-0.01em] text-[#212529]">
                          리스팅 이미지 & A+ 콘텐츠 제작
                        </h2>
                        
                        <p className="text-[16px] leading-[160%] text-[#868E96]">
                          보여지는 것이 곧 구매 전환의 열쇠
                        </p>
                        
                        {/* 강조선 - 32px 길이, 2px 굵기, Accent 컬러 */}
                        <div className="w-8 h-0.5 bg-[#FFB800]"></div>
                        
                        {/* 체크리스트 - 4가지 항목 */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              매력적인 제품 리스팅 이미지 기획 및 제작
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              USP를 담은 직관적인 서브 이미지 디자인
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              프리미엄 A+ 콘텐츠 및 EBC(Enhanced Brand Content) 제작
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              최신 트렌드를 반영한 콘텐츠 기획 및 업데이트
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 오른쪽 영역 - 이미지 사각형 */}
                    <div className="w-1/2 h-full pb-[60px] p-4 flex items-center justify-center">
                      <div className="w-full h-full">
                        <img 
                          src="https://live.staticflickr.com/65535/54796442462_c9064a0206_b.jpg"
                          alt="리스팅 이미지 및 A+ 콘텐츠 화면"
                          className="w-full h-full object-contain object-center rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : service.modalContent.title === "운영 & 리포트" ? (
            // "운영 & 리포트" 모달은 슬라이드 레이아웃
            <>
              {/* 슬라이드 네비게이션 버튼들 */}
              {service.modalContent.images.length > 1 && (
                <>
                  {/* 이전 버튼 */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#1C3D5A] hover:bg-[#15324A] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-10"
                    aria-label="이전 페이지"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {/* 다음 버튼 */}
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1C3D5A] hover:bg-[#15324A] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-10"
                    aria-label="다음 페이지"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  {/* 인디케이터 */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-md z-10">
                    {service.modalContent.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-[#FFB800] scale-125' 
                            : 'bg-gray-400 hover:bg-gray-500'
                        }`}
                        aria-label={`페이지 ${index + 1}로 이동`}
                      />
                    ))}
                  </div>
                  
                  {/* 페이지 카운터 */}
                  <div className="absolute top-3 right-3 bg-[#1C3D5A]/90 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm z-10">
                    {currentImageIndex + 1} / {service.modalContent.images.length}
                  </div>
                </>
              )}

              {/* 첫 번째 슬라이드 - 고객 서비스 & CS 대응 */}
              {currentImageIndex === 0 && (
                <div className="w-full h-full relative">
                  <div className="w-full h-full flex">
                    {/* 왼쪽 영역 - 옅은 회색 사각형 */}
                    <div className="w-1/2 h-full bg-[#F8F9FA] flex flex-col justify-center px-16 py-12">
                      <div className="space-y-6">
                        <h2 className="text-[36px] font-bold leading-tight tracking-[-0.01em] text-[#212529]">
                          고객 서비스 & CS 대응
                        </h2>
                        
                        <p className="text-[16px] leading-[160%] text-[#868E96]">
                          계정 관리 · A-to-Z 대응 · 리뷰 관리
                        </p>
                        
                        {/* 강조선 - 32px 길이, 2px 굵기, Accent 컬러 */}
                        <div className="w-8 h-0.5 bg-[#FFB800]"></div>
                        
                        {/* 체크리스트 - 4가지 항목 */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              실시간 고객 메시지(CS) 및 리뷰 관리 시스템 운영
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              NCX(고객 경험) 지표 모니터링 및 계정 건강 최적화
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              반품 데이터 분석 및 근본적인 원인 개선
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              부정적 피드백 및 반품률 리스크에 대한 선제적 대응 전략
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 오른쪽 영역 - 이미지 사각형 */}
                    <div className="w-1/2 h-full pb-[60px] p-4 flex items-center justify-center">
                      <div className="w-full h-full">
                        <img 
                          src="https://live.staticflickr.com/65535/54797519768_5d2e7f11d5_b.jpg"
                          alt="고객 서비스 및 CS 대응 화면"
                          className="w-full h-full object-contain object-center rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 두 번째 슬라이드 - 월간 성과 리포트 */}
              {currentImageIndex === 1 && (
                <div className="w-full h-full relative">
                  <div className="w-full h-full flex">
                    {/* 왼쪽 영역 - 옅은 회색 사각형 */}
                    <div className="w-1/2 h-full bg-[#F8F9FA] flex flex-col justify-center px-16 py-12">
                      <div className="space-y-6">
                        <h2 className="text-[36px] font-bold leading-tight tracking-[-0.01em] text-[#212529]">
                          월간 성과 리포트
                        </h2>
                        
                        <p className="text-[16px] leading-[160%] text-[#868E96]">
                          데이터를 읽고, 미래 전략을 설계합니다.
                        </p>
                        
                        {/* 강조선 - 32px 길이, 2px 굵기, Accent 컬러 */}
                        <div className="w-8 h-0.5 bg-[#FFB800]"></div>
                        
                        {/* 체크리스트 - 4가지 항목 */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              비즈니스 현황을 한눈에 파악하는 맞춤형 리포트 제공
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              경쟁사 및 시장 분석을 통한 경영 인사이트 도출
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              제품 개선 및 신제품 기획을 위한 데이터 기반 제안
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              지속 가능한 성장을 위한 분기/연간 로드맵 수립
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 오른쪽 영역 - 이미지 사각형 */}
                    <div className="w-1/2 h-full pb-[60px] p-4 flex items-center justify-center">
                      <div className="w-full h-full">
                        <img 
                          src="https://live.staticflickr.com/65535/54796412982_8e1924cd5a_b.jpg"
                          alt="월간 성과 리포트 화면"
                          className="w-full h-full object-contain object-center rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : service.modalContent.title === "광고 & 마케팅" ? (
            // "광고 & 마케팅" 모달은 슬라이드 레이아웃
            <>
              {/* 슬라이드 네비게이션 버튼들 */}
              {service.modalContent.images.length > 1 && (
                <>
                  {/* 이전 버튼 */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#1C3D5A] hover:bg-[#15324A] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-10"
                    aria-label="이전 페이지"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {/* 다음 버튼 */}
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1C3D5A] hover:bg-[#15324A] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-10"
                    aria-label="다음 페이지"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  {/* 인디케이터 */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-md z-10">
                    {service.modalContent.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-[#FFB800] scale-125' 
                            : 'bg-gray-400 hover:bg-gray-500'
                        }`}
                        aria-label={`페이지 ${index + 1}로 이동`}
                      />
                    ))}
                  </div>
                  
                  {/* 페이지 카운터 */}
                  <div className="absolute top-3 right-3 bg-[#1C3D5A]/90 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm z-10">
                    {currentImageIndex + 1} / {service.modalContent.images.length}
                  </div>
                </>
              )}

              {/* 첫 번째 슬라이드 - 광고 캠페인 운영 & 전략 제안 */}
              {currentImageIndex === 0 && (
                <div className="w-full h-full relative">
                  <div className="w-full h-full flex">
                    {/* 왼쪽 영역 - 옅은 회색 사각형 */}
                    <div className="w-1/2 h-full bg-[#F8F9FA] flex flex-col justify-center px-16 py-12">
                      <div className="space-y-6">
                        <h2 className="text-[36px] font-bold leading-tight tracking-[-0.01em] text-[#212529]">
                          광고 캠페인 운영 & 전략 제안
                        </h2>
                        
                        <p className="text-[16px] leading-[160%] text-[#868E96]">
                          소비자에게 접근하는 가장 쉬운 방법
                        </p>
                        
                        {/* 강조선 - 32px 길이, 2px 굵기, Accent 컬러 */}
                        <div className="w-8 h-0.5 bg-[#FFB800]"></div>
                        
                        {/* 체크리스트 - 4가지 항목 */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              AI 기반 광고 인사이트 분석 및 자동화 운영
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              Amazon PPC 캠페인 목적별 설계 및 A/B 테스트
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              키워드, 예산, 게재위치 실시간 최적화로 광고 효율 극대화
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              성과 분석 리포트 제공 및 지속적인 개선 전략 수립
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 오른쪽 영역 - 이미지 사각형 */}
                    <div className="w-1/2 h-full pb-[60px] p-4 flex items-center justify-center">
                      <div className="w-full h-full">
                        <img 
                          src="https://live.staticflickr.com/65535/54796516372_ac5c207697_b.jpg"
                          alt="광고 캠페인 관리 화면"
                          className="w-full h-full object-contain object-center rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 두 번째 슬라이드 - 브랜드 성장 가속화 */}
              {currentImageIndex === 1 && (
                <div className="w-full h-full relative">
                  <div className="w-full h-full flex">
                    {/* 왼쪽 영역 - 옅은 회색 사각형 */}
                    <div className="w-1/2 h-full bg-[#F8F9FA] flex flex-col justify-center px-16 py-12">
                      <div className="space-y-6">
                        <h2 className="text-[36px] font-bold leading-tight tracking-[-0.01em] text-[#212529]">
                          브랜드 성장 가속화
                        </h2>
                        
                        <p className="text-[16px] leading-[160%] text-[#868E96]">
                          브랜드 존재감과 신뢰도 확보
                        </p>
                        
                        {/* 강조선 - 32px 길이, 2px 굵기, Accent 컬러 */}
                        <div className="w-8 h-0.5 bg-[#FFB800]"></div>
                        
                        {/* 체크리스트 - 4가지 항목 */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              실시간 트렌드 모니터링 및 시장 선점 전략 반영
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              현지 인플루언서 협업 및 UGC(고객 생성 콘텐츠) 확보
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              구매 전환율을 높이는 긍정 리뷰 관리 및 최적화
                            </p>
                          </div>
                          
                          <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] leading-[160%] text-[#212529]">
                              장기적인 브랜드 인지도 향상을 위한 통합 마케팅 플랜
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 오른쪽 영역 - 이미지 사각형 */}
                    <div className="w-1/2 h-full pb-[60px] p-4 flex items-center justify-center">
                      <div className="w-full h-full">
                        <img 
                          src="https://live.staticflickr.com/65535/54797600843_c0c7ac7eaa_b.jpg"
                          alt="브랜드 성장 가속화 화면"
                          className="w-full h-full object-contain object-center rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            // 다른 모든 모달들은 기존 레이아웃 유지
            <>
              {/* 메인 콘텐츠 - 높이 최적화 */}
              <div className="grid lg:grid-cols-2 gap-6 h-full">
                {/* 좌측: 이미지 슬라이드 - 슬라이드 기능 개선 */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-[#1C3D5A]">서비스 예시</h3>
                  </div>
                  
                  <div className="relative w-full flex-1 rounded-xl overflow-hidden bg-gray-50 shadow-lg group flex items-center justify-center">
                    {/* 메인 이미지 */}
                    <motion.img 
                      key={currentImageIndex}
                      src={service.modalContent.images[currentImageIndex]}
                      alt={`${service.modalContent.title} - ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105 relative z-10"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleImageClick(service.modalContent.images[currentImageIndex])}
                      style={{ pointerEvents: 'auto' }}
                    />
                    
                    {/* 호버 오버레이 - 수정된 버전 */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center z-20 pointer-events-none">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 rounded-full p-3 flex flex-col items-center gap-2 shadow-lg">
                        <ZoomIn className="w-6 h-6 text-[#1C3D5A]" />
                        {/* "운영 & 리포트"의 첫 번째 이미지인 경우 "자세히 보기" 텍스트 표시 */}
                        {service.modalContent.title === "운영 & 리포트" && currentImageIndex === 0 && (
                          <span className="text-xs font-medium text-[#1C3D5A] whitespace-nowrap">자세히 보기</span>
                        )}
                      </div>
                    </div>
                    
                    {/* 슬라이드 버튼들 (이미지가 2개 이상일 때만 표시) */}
                    {service.modalContent.images.length > 1 && (
                      <>
                        {/* 이전 버튼 */}
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#1C3D5A] hover:bg-[#15324A] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-10"
                          aria-label="이전 이미지"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        
                        {/* 다음 버튼 */}
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1C3D5A] hover:bg-[#15324A] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 z-10"
                          aria-label="다음 이미지"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        
                        {/* 인디케이터 */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
                          {service.modalContent.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentImageIndex 
                                  ? 'bg-[#FFB800] scale-125' 
                                  : 'bg-gray-400 hover:bg-gray-500'
                              }`}
                              aria-label={`이미지 ${index + 1}로 이동`}
                            />
                          ))}
                        </div>
                        
                        {/* 이미지 카운터 */}
                        <div className="absolute top-3 right-3 bg-[#1C3D5A]/90 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                          {currentImageIndex + 1} / {service.modalContent.images.length}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 우측: 서비스 섹션들 - 텍스트 크기 개선 */}
                <div className="flex flex-col h-full overflow-y-auto pr-2">
                  <div className="space-y-4">
                    {/* 두 번째 섹션: 규제 & 승인 대응 */}
                    {service.modalContent.title === "규제 & 승인 대응" && (
                      <div className="w-full h-full relative">
                        <div className="w-full h-full flex">
                          {/* 왼쪽 영역 - 옅은 회색 사각형 */}
                          <div className="w-1/2 h-full bg-[#F8F9FA] flex flex-col justify-center px-16 py-12">
                            <div className="space-y-6">
                              <h2 className="text-[36px] font-bold leading-tight tracking-[-0.01em] text-[#212529]">
                                규제 장벽, 수출의 또 다른 벽
                              </h2>
                              
                              <p className="text-[16px] leading-[160%] text-[#868E96]">
                                현지 법규와 아마존 규제 모두 대응이 필수
                              </p>
                              
                              {/* 강조선 - 32px 길이, 2px 굵기, Accent 컬러 */}
                              <div className="w-8 h-0.5 bg-[#FFB800]"></div>
                              
                              {/* 체크리스트 - 5가지 항목 */}
                              <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                                  <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                                  <p className="text-[14px] leading-[160%] text-[#212529]">
                                    판매 국가별 필수 인증(FDA, CE, FCC 등) 사전 검토
                                  </p>
                                </div>
                                
                                <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                                  <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                                  <p className="text-[14px] leading-[160%] text-[#212529]">
                                    식품, 화장품, 의료기기 등 민감 카테고리 승인 컨설팅
                                  </p>
                                </div>
                                
                                <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                                  <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                                  <p className="text-[14px] leading-[160%] text-[#212529]">
                                    통관 과정에서 발생 가능한 문제에 대한 선제적 방어
                                  </p>
                                </div>
                                
                                <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                                  <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                                  <p className="text-[14px] leading-[160%] text-[#212529]">
                                    아마존 내부 규제 정책 분석 및 최신 동향 반영
                                  </p>
                                </div>
                                
                                <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-white/20 shadow-sm">
                                  <CheckCircle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                                  <p className="text-[14px] leading-[160%] text-[#212529]">
                                    최신 규제 변경사항 실시간 모니터링 및 즉각 대응
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 오른쪽 영역 - 이미지 사각형 */}
                          <div className="w-1/2 h-full pb-[60px] p-4 flex items-center justify-center">
                            <div className="w-full h-full">
                              <img 
                                src="https://live.staticflickr.com/65535/54797471183_ff8c215ec2_b.jpg"
                                alt="규제 및 승인 관련 화면"
                                className="w-full h-full object-contain object-center rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 세 번째 섹션: 리스팅 기획 & 콘텐츠 제작 */}
                    {service.modalContent.title === "리스팅 기획 & 콘텐츠 제작" && (
                      <>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-[#1C3D5A]">현지 소비자 중심의 리스팅 기획</h3>
                          </div>
                          
                          <div className="space-y-2">
                            {/* 첫 번째 카테고리 항목들 */}
                            {[
                              "타겟 시장 트렌드 및 감성 반영 브랜딩/리브랜딩",
                              "SEO 기반 키워드 분석 및 최적화된 리스팅 설계", 
                              "제품 USP(Unique Selling Proposition) 도출 및 강조 전략",
                              "아마존 정책 준수 및 안정적인 리스팅 운영"
                            ].map((detail, index) => (
                              <motion.div 
                                key={index} 
                                className="group p-3 rounded-lg bg-white border border-[#1C3D5A]/10 hover:border-[#FFB800]/40 hover:shadow-sm transition-all duration-300"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="relative flex-shrink-0 mt-0.5">
                                    <div className="w-4 h-4 bg-[#FFB800] rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-2.5 h-2.5 text-[#1C3D5A]" />
                                    </div>
                                  </div>
                                  <span className="text-[#212529] leading-relaxed font-medium text-sm group-hover:text-[#1C3D5A] transition-colors duration-300">{detail}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-[#1C3D5A]">구매 전환율을 높이는 비주얼 콘텐츠</h3>
                          </div>
                          
                          <div className="space-y-2">
                            {[
                              "매력적인 제품 리스팅 이미지 기획 및 제작",
                              "USP를 담은 직관적인 서브 이미지 디자인", 
                              "프리미엄 A+ 콘텐츠 및 EBC(Enhanced Brand Content) 제작",
                              "최신 트렌드를 반영한 콘텐츠 기획 및 업데이트"
                            ].map((detail, index) => (
                              <motion.div 
                                key={index} 
                                className="group p-3 rounded-lg bg-white border border-[#1C3D5A]/10 hover:border-[#FFB800]/40 hover:shadow-sm transition-all duration-300"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="relative flex-shrink-0 mt-0.5">
                                    <div className="w-4 h-4 bg-[#FFB800] rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-2.5 h-2.5 text-[#1C3D5A]" />
                                    </div>
                                  </div>
                                  <span className="text-[#212529] leading-relaxed font-medium text-sm group-hover:text-[#1C3D5A] transition-colors duration-300">{detail}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* 네 번째 섹션: 물류 & FBA 입고 */}
                    {service.modalContent.title === "물류 & FBA 입고" && (
                      <>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-[#1C3D5A]">최적의 글로벌 운송 시스템</h3>
                          </div>
                          
                          <div className="space-y-2">
                            {/* 첫 번째 카테고리 항목들 */}
                            {[
                              "항공/해상 운송 상황을 고려한 최적의 배송 루트 선택",
                              "글로벌 운송 스케줄 조율 및 실시간 추적 관리", 
                              "예상치 못한 이슈(통관 지연, 배송 오류)에 대한 비상 대응 계획",
                              "물류 비용 최적화 및 투명한 견적 제공"
                            ].map((detail, index) => (
                              <motion.div 
                                key={index} 
                                className="group p-3 rounded-lg bg-white border border-[#1C3D5A]/10 hover:border-[#FFB800]/40 hover:shadow-sm transition-all duration-300"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="relative flex-shrink-0 mt-0.5">
                                    <div className="w-4 h-4 bg-[#FFB800] rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-2.5 h-2.5 text-[#1C3D5A]" />
                                    </div>
                                  </div>
                                  <span className="text-[#212529] leading-relaxed font-medium text-sm group-hover:text-[#1C3D5A] transition-colors duration-300">{detail}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-[#1C3D5A]">정확하고 안전한 FBA 입고</h3>
                          </div>
                          
                          <div className="space-y-2">
                            {[
                              "아마존 FBA 입고 규정에 맞춘 사전 준비 및 서류 작업",
                              "FBA 입고를 위한 재고 선적 준비 및 최종 검수", 
                              "입고 지연 및 재고 손실 리스크 관리 및 모니터링",
                              "재고 관리 시스템 구축 및 효율적인 재고 보충 계획"
                            ].map((detail, index) => (
                              <motion.div 
                                key={index} 
                                className="group p-3 rounded-lg bg-white border border-[#1C3D5A]/10 hover:border-[#FFB800]/40 hover:shadow-sm transition-all duration-300"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="relative flex-shrink-0 mt-0.5">
                                    <div className="w-4 h-4 bg-[#FFB800] rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-2.5 h-2.5 text-[#1C3D5A]" />
                                    </div>
                                  </div>
                                  <span className="text-[#212529] leading-relaxed font-medium text-sm group-hover:text-[#1C3D5A] transition-colors duration-300">{detail}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* 다섯 번째 섹션: 광고 & 마케팅 */}
                    {service.modalContent.title === "광고 & 마케팅" && (
                      <>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-[#1C3D5A]">데이터 기반 광고 효율 최적화</h3>
                          </div>
                          
                          <div className="space-y-2">
                            {/* 첫 번째 카테고리 항목들 */}
                            {[
                              "AI 기반 광고 인사이트 분석 및 자동화 운영",
                              "Amazon PPC 캠페인 목적별 설계 및 A/B 테스트", 
                              "키워드, 예산, 게재위치 실시간 최적화로 광고 효율 극대화",
                              "성과 분석 리포트 제공 및 지속적인 개선 전략 수립"
                            ].map((detail, index) => (
                              <motion.div 
                                key={index} 
                                className="group p-3 rounded-lg bg-white border border-[#1C3D5A]/10 hover:border-[#FFB800]/40 hover:shadow-sm transition-all duration-300"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <div className="flex items-start gap-2">
                                  <div className="relative flex-shrink-0 mt-0.5">
                                    <div className="w-4 h-4 bg-[#FFB800] rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-2.5 h-2.5 text-[#1C3D5A]" />
                                    </div>
                                  </div>
                                  <span className="text-[#212529] leading-relaxed font-medium text-xs group-hover:text-[#1C3D5A] transition-colors duration-300">{detail}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-[#1C3D5A]">브랜드 성장 가속화</h3>
                          </div>
                          
                          <div className="space-y-2">
                            {[
                              "실시간 트렌드 모니터링 및 장 선점 전략 반영",
                              "현지 인플루언서 협업 및 UGC(고객 생성 콘텐츠) 확보", 
                              "구매 전환율을 높이는 긍정 리뷰 관리 및 최적화",
                              "장기적인 브랜드 인지도 향상을 위한 통합 마케팅 플랜"
                            ].map((detail, index) => (
                              <motion.div 
                                key={index} 
                                className="group p-3 rounded-lg bg-white border border-[#1C3D5A]/10 hover:border-[#FFB800]/40 hover:shadow-sm transition-all duration-300"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="relative flex-shrink-0 mt-0.5">
                                    <div className="w-4 h-4 bg-[#FFB800] rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-2.5 h-2.5 text-[#1C3D5A]" />
                                    </div>
                                  </div>
                                  <span className="text-[#212529] leading-relaxed font-medium text-sm group-hover:text-[#1C3D5A] transition-colors duration-300">{detail}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* 여섯 번째 섹션: 운영 & 리포트 */}
                    {service.modalContent.title === "운영 & 리포트" && (
                      <>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-[#1C3D5A]">안정적인 계정 운영 및 고객 관리</h3>
                          </div>
                          
                          <div className="space-y-2">
                            {/* 첫 번째 카테고리 항목들 */}
                            {[
                              "실시간 고객 메시지(CS) 및 리뷰 관리 시스템 운영",
                              "NCX(고객 경험) 지표 모니터링 및 계정 건강 최적화", 
                              "반품 데이터 분석 및 근본적인 원인 개선",
                              "부정적 피드백 및 반품률 리스크에 대한 선제적 대응 전략"
                            ].map((detail, index) => (
                              <motion.div 
                                key={index} 
                                className="group p-3 rounded-lg bg-white border border-[#1C3D5A]/10 hover:border-[#FFB800]/40 hover:shadow-sm transition-all duration-300"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="relative flex-shrink-0 mt-0.5">
                                    <div className="w-4 h-4 bg-[#FFB800] rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-2.5 h-2.5 text-[#1C3D5A]" />
                                    </div>
                                  </div>
                                  <span className="text-[#212529] leading-relaxed font-medium text-sm group-hover:text-[#1C3D5A] transition-colors duration-300">{detail}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-[#1C3D5A]">데이터 기반의 장기 성장 전략</h3>
                          </div>
                          
                          <div className="space-y-2">
                            {[
                              "비즈니스 현황을 한눈에 파악하는 맞춤형 리포트 제공",
                              "경쟁사 및 시장 분석을 통한 경영 인사이트 도출", 
                              "제품 개선 및 신제품 기획을 위한 데이터 기반 제안",
                              "지속 가능한 성장을 위한 분기/연간 로드맵 수립"
                            ].map((detail, index) => (
                              <motion.div 
                                key={index} 
                                className="group p-3 rounded-lg bg-white border border-[#1C3D5A]/10 hover:border-[#FFB800]/40 hover:shadow-sm transition-all duration-300"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="relative flex-shrink-0 mt-0.5">
                                    <div className="w-4 h-4 bg-[#FFB800] rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-2.5 h-2.5 text-[#1C3D5A]" />
                                    </div>
                                  </div>
                                  <span className="text-[#212529] leading-relaxed font-medium text-sm group-hover:text-[#1C3D5A] transition-colors duration-300">{detail}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* 다른 서비스들을 위한 기본 레이아웃 (현재는 없음) */}
                    {service.modalContent.title !== "규제 & 승인 대응" && 
                     service.modalContent.title !== "리스팅 기획 & 콘텐츠 제작" && 
                     service.modalContent.title !== "물류 & FBA 입고" && 
                     service.modalContent.title !== "광고 & 마케팅" && 
                     service.modalContent.title !== "운영 & 리포트" && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-[#1C3D5A]">주요 서비스 내용</h3>
                        </div>
                        
                        <div className="space-y-3">
                          {service.modalContent.details.map((detail, index) => (
                            <motion.div 
                              key={index} 
                              className="group p-3 rounded-lg bg-white border border-[#1C3D5A]/10 hover:border-[#FFB800]/40 hover:shadow-sm transition-all duration-300"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <div className="flex items-start gap-3">
                                <div className="relative flex-shrink-0 mt-0.5">
                                  <div className="w-5 h-5 bg-[#FFB800] rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-[#1C3D5A]" />
                                  </div>
                                </div>
                                <span className="text-[#212529] leading-relaxed font-medium text-sm group-hover:text-[#1C3D5A] transition-colors duration-300">{detail}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DialogContent>
  );
}

// 이미지 확대 상태를 관리하는 컴포넌트
function ServiceModalWithImageZoom({ service, isOpen, onOpenChange }: { 
  service: ServiceStep; 
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [enlargedImage, setEnlargedImage] = useState<{ url: string; title: string; isIframe?: boolean } | null>(null);

  const handleCloseEnlargedImage = (e?: React.MouseEvent) => {
    // 이벤트가 있으면 전파 차단
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEnlargedImage(null);
  };

  // Dialog의 onOpenChange를 제어 - 이미지 확대 중일 때는 Dialog가 닫히지 않도록
  const handleDialogOpenChange = (open: boolean) => {
    if (!open && enlargedImage) {
      // 이미지 확대 중이면 Dialog를 닫지 않고 이미지만 닫기
      setEnlargedImage(null);
      return;
    }
    onOpenChange(open);
  };

  // 키보드 벤트 처리 (ESC로 확대 이미지 닫기)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && enlargedImage) {
        e.preventDefault();
        e.stopPropagation();
        setEnlargedImage(null);
      }
    };

    if (enlargedImage) {
      document.addEventListener('keydown', handleEscape, { capture: true });
      return () => document.removeEventListener('keydown', handleEscape, { capture: true });
    }
  }, [enlargedImage]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
        {/* 서비스 모달 콘텐츠 */}
        <ServiceModalInternal service={service} setEnlargedImage={setEnlargedImage} />
      </Dialog>
      
      {/* 이미지 확대 오버레이를 Portal로 document.body에 직접 렌더링 */}
      {enlargedImage && typeof document !== 'undefined' && createPortal(
        <AnimatePresence mode="wait">
          <motion.div
            key="image-overlay-portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 100000,
              pointerEvents: 'auto'
            }}
            onClick={handleCloseEnlargedImage}
          >
            {/* 확대된 이미지 */}
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={handleCloseEnlargedImage}
                className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
              >
                <X className="w-5 h-5 text-[#1C3D5A]" />
              </button>

              {/* 이미지 컨테이너 */}
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                {enlargedImage.isIframe ? (
                  <iframe
                    src={enlargedImage.url}
                    title={enlargedImage.title}
                    className="w-[90vw] h-[80vh]"
                    frameBorder="0"
                    style={{ 
                      minWidth: '1200px',
                      minHeight: '800px'
                    }}
                  />
                ) : (
                  <img
                    src={enlargedImage.url}
                    alt={enlargedImage.title}
                    className="max-w-full max-h-[80vh] object-contain block"
                  />
                )}
                
                {/* 이미지 제목 */}
                <div className="px-6 py-4 bg-white border-t border-gray-100">
                  <h4 className="font-semibold text-[#1C3D5A] text-lg">{enlargedImage.title}</h4>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export function ServicesSection() {
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});

  const handleDialogOpenChange = (serviceId: string, open: boolean) => {
    setOpenDialogs(prev => ({
      ...prev,
      [serviceId]: open
    }));
  };

  return (
    <section id="services" className="py-20 sm:py-24 bg-white relative">
      {/* Section divider line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gray-200"></div>

      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-[#F8F9FA] rounded-full text-[#1C3D5A] font-semibold text-sm mb-6 border border-[#1C3D5A]/10"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            전문 서비스 프로세스
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C3D5A] mb-6 leading-tight">
            아마존 입점부터 운영까지,<br />
            <span className="text-[#FFB800]">
              전 과정을 책임집니다
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#868E96] max-w-4xl mx-auto leading-relaxed">
            셀러 계정 생성부터 브랜드 보호, 물류, 광고 운영까지.<br />
            <span className="font-semibold text-[#212529]">아마존 진출의 모든 단계를 로드맵 기반으로 지원합니다.</span>
          </p>
        </motion.div>

        {/* Premium Gantt-style Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          {/* Roadmap Header */}
          <div className="text-center mb-12">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-[#1C3D5A] mb-4"
            >
              아마존캐리 로드맵
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-base lg:text-lg text-[#868E96] font-medium leading-relaxed">
                1주차-8주차 아마존 입점 완료<br />
                이후 매달 운영 관리
              </p>
            </motion.div>
          </div>

          {/* Desktop Premium Gantt Timeline */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white border border-[#1C3D5A]/10 rounded-xl p-8 shadow-lg relative overflow-hidden"
            >
              {/* Minimal Background Effects */}
              <div className="absolute top-0 left-0 w-full h-px bg-[#FFB800]"></div>
              
              <div className="relative z-10">
                {/* Timeline Header */}
                <div className="grid grid-cols-12 gap-3 mb-6">
                  <div className="col-span-3 pl-4">
                    <h4 className="text-base font-bold text-[#1C3D5A] tracking-tight">프로젝트 단계</h4>
                  </div>
                  <div className="col-span-9">
                    <div className="grid grid-cols-9 gap-3">
                      {Array.from({ length: 9 }, (_, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: -10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 + (i * 0.05) }}
                          viewport={{ once: true }}
                          className="text-center"
                        >
                          <div className="text-sm font-bold text-[#868E96] mb-2">
                            {i < 6 ? `${i + 1}주차` : i < 8 ? `${i + 1}주차` : "운영&관리"}
                          </div>
                          <div className="w-full h-1 bg-gray-100 rounded-full" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Rows */}
                <div className="space-y-3">
                  {[
                    { step: 1, title: "계정 생성 & 가상계좌", phase: "입점", weeks: [1] },
                    { step: 2, title: "카테고리 승인", phase: "입점", weeks: [2, 3] },
                    { step: 3, title: "리스팅 기획", phase: "입점", weeks: [3, 4] },
                    { step: 4, title: "물류 준비", phase: "입점", weeks: [5, 6, 7] },
                    { step: 5, title: "이미지 & A+ 제작", phase: "입점", weeks: [5, 6, 7] },
                    { step: 6, title: "브랜드 페이지", phase: "입점", weeks: [8] },
                    { step: 7, title: "광고 운영", phase: "입점", weeks: [9] },
                    { step: 8, title: "재고 & CS", phase: "입점", weeks: [9] },
                    { step: 9, title: "종합 리포트", phase: "입점", weeks: [9] }
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                      viewport={{ once: true }}
                      className="grid grid-cols-12 gap-3 items-center py-2 px-2 rounded-xl hover:bg-gray-50/50 transition-all duration-300 group"
                    >
                      {/* Step Info */}
                      <div className="col-span-3 flex items-center gap-4 pl-4">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-lg bg-[#1C3D5A] shadow-[#1C3D5A]/30"
                        >
                          {item.step}
                        </motion.div>
                        <span className="font-semibold text-[#1C3D5A] text-sm group-hover:text-[#FFB800] transition-colors duration-300">
                          {item.title}
                        </span>
                      </div>

                      {/* Premium Timeline Bars */}
                      <div className="col-span-9">
                        <div className="grid grid-cols-9 gap-3">
                          {Array.from({ length: 9 }, (_, i) => (
                            <div key={i} className="h-6 relative rounded-lg overflow-hidden">
                              {item.weeks.includes(i + 1) ? (
                                <motion.div
                                  initial={{ scaleX: 0, opacity: 0 }}
                                  whileInView={{ scaleX: 1, opacity: 1 }}
                                  transition={{ 
                                    duration: 0.8, 
                                    delay: 1.0 + (index * 0.1) + (i * 0.05),
                                    ease: "easeOut"
                                  }}
                                  viewport={{ once: true }}
                                  className="h-full rounded-lg origin-left bg-[#FFB800]"
                                >
                                </motion.div>
                              ) : (
                                <div className="h-full bg-[#F8F9FA] rounded-lg" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Premium Layout */}
          <div className="lg:hidden space-y-4">
            {[
              { step: 1, title: "계정 생성 & 가상계좌", phase: "입점" },
              { step: 2, title: "카테고리 승인", phase: "입점" },
              { step: 3, title: "리스팅 기획", phase: "입점" },
              { step: 4, title: "물류 준비", phase: "입점" },
              { step: 5, title: "이미지 & A+ 제작", phase: "입점" },
              { step: 6, title: "브랜드 페이지", phase: "입점" },
              { step: 7, title: "광고 운영", phase: "입점" },
              { step: 8, title: "재고 & CS", phase: "입점" },
              { step: 9, title: "종합 리포트", phase: "입점" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 rounded-xl border shadow-lg relative overflow-hidden bg-white border-[#FFB800]/20 shadow-[#FFB800]/10"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-10 bg-[#FFB800]" />
                
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0 shadow-lg relative z-10 bg-[#1C3D5A] shadow-[#1C3D5A]/30"
                >
                  <span className="text-sm">{item.step}</span>
                </motion.div>
                <span className="font-semibold text-[#1C3D5A] relative z-10">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Service Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {serviceSteps.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-full">
                  <Card 
                    className="h-full cursor-pointer group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 border border-[#1C3D5A]/10 shadow-lg"
                    onClick={() => handleDialogOpenChange(service.id, true)}
                  >
                    {/* Minimal Background Effects */}
                    <div className="absolute inset-0 bg-[#F8F9FA]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFB800] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    
                    <CardContent className="p-6 lg:p-8 relative z-10 h-full flex flex-col">
                      {/* Step number and icon container */}
                      <div className="flex items-center justify-between mb-6 lg:mb-8">
                        {/* Step number */}
                        <div className="relative">
                          <span className="text-[#FFB800] text-xl lg:text-2xl font-bold tracking-wide">
                            {service.stepNumber}
                          </span>
                        </div>
                        
                        {/* Icon container */}
                        <div className="relative">
                          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#1C3D5A] rounded-xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <IconComponent className="w-6 h-6 lg:w-8 lg:h-8" />
                          </div>
                        </div>
                      </div>

                      {/* Content - 이 부분이 flex-1으로 확장되어 카드들의 높이를 균등하게 만듦 */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-xl lg:text-2xl font-bold text-[#1C3D5A] mb-3 lg:mb-4 leading-tight group-hover:text-[#FFB800] transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-[#868E96] leading-relaxed mb-6 lg:mb-8 text-base lg:text-lg flex-1">
                          {service.description}
                        </p>
                      </div>

                      {/* Premium CTA section - 항상 하단에 고정 */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#FFB800] rounded-full"></div>
                          <div className="w-2 h-2 bg-[#FFB800] rounded-full opacity-60"></div>
                          <div className="w-2 h-2 bg-[#FFB800] rounded-full opacity-30"></div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-[#1C3D5A] font-semibold group-hover:gap-4 transition-all duration-300">
                          <span className="text-sm">자세히 보기</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>

                      {/* Floating geometric elements */}
                      <div className="absolute top-4 right-4 w-20 h-20 bg-[#FFB800]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </CardContent>
                  </Card>
                </div>
                
                {/* Dialog를 별도로 렌더링 */}
                <ServiceModalWithImageZoom 
                  service={service}
                  isOpen={openDialogs[service.id] || false}
                  onOpenChange={(open) => handleDialogOpenChange(service.id, open)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-white rounded-xl p-10 sm:p-16 shadow-2xl border border-[#1C3D5A]/10 overflow-hidden">
            {/* Minimal Background Effects */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFB800]"></div>
            
            <div className="relative z-10">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C3D5A] mb-6 leading-tight"
              >
                아마존 진출, 이제 전문가와 함께<br />
                <span className="text-[#FFB800]">
                  체계적인 성공 전략을 구축하세요
                </span>
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-[#868E96] text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed font-medium"
              >
                아마존캐리가 귀사의 성공적인 아마존 진출을 위해<br />
                처음부터 끝까지 함께하는 파트너가 되어 드립니다.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Button 
                  size="lg"
                  className="bg-[#FFB800] hover:bg-[#E5A600] text-[#1C3D5A] px-10 py-5 text-xl font-semibold rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group"
                  onClick={() => window.open('http://pf.kakao.com/_xakHNn/chat', '_blank')}
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  <span className="relative z-10 flex items-center">
                    전문가와 상담하기 -&gt;
                  </span>
                </Button>
              </motion.div>


            </div>
          </div>
        </motion.div>
      </div>

      {/* Section divider line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gray-200"></div>
    </section>
  );
}