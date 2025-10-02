// 이 파일은 임시로 생성된 파일입니다. 삭제해도 됩니다.
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
        "Pingpong 등 가상계좌 발급 연동 및 설정 지원",
        "계정 생성 실패/거절 사례 분석 및 선제적 대응",
        "견고한 브랜드 권리 확보",
        "판매 국가별 상표권 출원 및 등록",
        "아마존 브랜드 레지스트리(Brand Registry) 등록 및 승인",
        "프리미엄 A+ 콘텐츠, 브랜드 광고 도구 등 아마존 브랜드 기능 활성화",
        "브랜드 권한 침해 및 하이재킹 모니터링 및 대응"
      ],
      images: [
        "https://live.staticflickr.com/65535/54772814901_cdc7a9c1fc_b.jpg",
        "https://live.staticflickr.com/65535/54773151030_1754fcc1cc_b.jpg",
        "https://live.staticflickr.com/65535/54772814911_407dfdced5_b.jpg"
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
        "https://live.staticflickr.com/65535/54773061488_b68f10a660_b.jpg",
        "https://live.staticflickr.com/65535/54771976252_462987c3b9_b.jpg",
        "https://live.staticflickr.com/65535/54773061483_af74076c49_b.jpg"
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
      description: "오늘의 문제를 해결하는 것을 넘어,\n데이터 속에서 내일의 성장 기회를 찾아냅니다.",
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
        "https://live.staticflickr.com/65535/54771994497_80bc886898_b.jpg",
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
  setEnlargedImage: (image: { url: string; title: string } | null) => void;
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
    setEnlargedImage({ 
      url: imageUrl, 
      title: `${service.modalContent.title} - 이미지 ${currentImageIndex + 1}` 
    });
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
      
      {/* Content optimized - 스크롤 없이 최적화된 콘텐츠 */}
      <div className="h-[calc(85vh-140px)] relative">
        <div className="p-6 h-full flex flex-col">
          {/* 메인 콘텐츠 - 높이 최적화 */}
          <div className="grid lg:grid-cols-2 gap-8 flex-1 min-h-0">
            {/* 좌측: 이미지 슬라이드 */}
            <div className="space-y-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#1C3D5A]">서비스 예시</h3>
              </div>
              
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-50 shadow-lg flex-shrink-0 group">
                {/* 메인 이미지 */}
                <motion.img 
                  key={currentImageIndex}
                  src={service.modalContent.images[currentImageIndex]}
                  alt={`${service.modalContent.title} - ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-105 relative z-10"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleImageClick(service.modalContent.images[currentImageIndex])}
                  style={{ pointerEvents: 'auto' }}
                />
                
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-[#1C3D5A]" />
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
            <div className="flex flex-col min-h-0 h-full overflow-y-auto">
              <div className="space-y-6">
                {/* 계정 & 브랜드 등록 */}
                {service.modalContent.title === "계정 & 브랜드 등록" && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">안전한 아마존 계정 생성</h3>
                      </div>
                      
                      <div className="space-y-2">
                        {service.modalContent.details.slice(1, 5).map((detail, index) => (
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

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">견고한 브랜드 권리 확보</h3>
                      </div>
                      
                      <div className="space-y-2">
                        {service.modalContent.details.slice(6).map((detail, index) => (
                          <motion.div 
                            key={index + 5} 
                            className="group p-3 rounded-lg bg-white border border-[#1C3D5A]/10 hover:border-[#FFB800]/40 hover:shadow-sm transition-all duration-300"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: (index + 5) * 0.05 }}
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
                  </>
                )}

                {/* 규제 & 승인 대응 */}
                {service.modalContent.title === "규제 & 승인 대응" && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">국가별 필수 인증 및 규제 통과</h3>
                      </div>
                      
                      <div className="space-y-2">
                        {[
                          "판매 국가별 필수 인증(FDA, CE, FCC 등) 사전 검토",
                          "식품, 화장품, 의료기기 등 민감 카테고리 승인 컨설팅", 
                          "인증 및 승인 절차에 필요한 모든 서류 준비 대행",
                          "통관 과정에서 발생 가능한 문제에 대한 선제적 방어"
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

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">아마존 내부 정책 완벽 준수</h3>
                      </div>
                      
                      <div className="space-y-2">
                        {[
                          "아마존 내부 규제 정책 분석 및 최신 동향 반영",
                          "승인 거절/오류 데이터 기반의 사전 리스크 방지", 
                          "최신 규제 변경사항 실시간 모니터링 및 즉각 대응"
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
                  </>
                )}

                {/* 리스팅 기획 & 콘텐츠 제작 */}
                {service.modalContent.title === "리스팅 기획 & 콘텐츠 제작" && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">현지 소비자 중심의 리스팅 기획</h3>
                      </div>
                      
                      <div className="space-y-2">
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

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">구매 전환율을 높이는 비주얼 콘텐츠</h3>
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
                  </>
                )}

                {/* 물류 & FBA 입고 */}
                {service.modalContent.title === "물류 & FBA 입고" && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">최적의 글로벌 운송 시스템</h3>
                      </div>
                      
                      <div className="space-y-2">
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

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">정확하고 안전한 FBA 입고</h3>
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
                  </>
                )}

                {/* 광고 & 마케팅 */}
                {service.modalContent.title === "광고 & 마케팅" && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">데이터 기반 광고 효율 최적화</h3>
                      </div>
                      
                      <div className="space-y-2">
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

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">브랜드 성장 가속화</h3>
                      </div>
                      
                      <div className="space-y-2">
                        {[
                          "실시간 트렌드 모니터링 및 시장 선점 전략 반영",
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
                  </>
                )}

                {/* 운영 & 리포트 */}
                {service.modalContent.title === "운영 & 리포트" && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">안정적인 계정 운영 및 고객 관리</h3>
                      </div>
                      
                      <div className="space-y-2">
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

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 bg-[#1C3D5A] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1C3D5A]">데이터 기반의 장기 성장 전략</h3>
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
                  </>
                )}
              </div>
            </div>
          </div>

          {/* CTA 섹션 - 적절한 위치에 고정 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-[#1C3D5A] to-[#15324A] rounded-xl p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800]/10 to-transparent opacity-30"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3">
                  이 단계에 대해 더 자세히 알고 싶으신가요?
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  아마존캐리 전문가와 1:1 무료 상담으로 맞춤형 솔루션을 받아보세요
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-[#FFB800] hover:bg-[#E5A600] text-[#1C3D5A] font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    onClick={() => {
                      window.open('https://docs.google.com/forms/d/e/1FAIpQLSdeLewllbICJgW-77OIcaZ7r7uIsGyKopRFEXl1whHQZq7umg/viewform?usp=header', '_blank');
                    }}
                  >
                    무료 타당성 조사 신청
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#1C3D5A] font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                    onClick={() => {
                      window.open('http://pf.kakao.com/_xakHNn/chat', '_blank');
                    }}
                  >
                    카카오톡 상담
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

function ServiceModal({ 
  service, 
  children 
}: { 
  service: ServiceStep;
  children: React.ReactNode;
}) {
  const [enlargedImage, setEnlargedImage] = useState<{ url: string; title: string } | null>(null);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <ServiceModalInternal service={service} setEnlargedImage={setEnlargedImage} />
      </Dialog>

      {/* 이미지 확대 모달 */}
      <AnimatePresence>
        {enlargedImage && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            onClick={() => setEnlargedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={enlargedImage.url}
                  alt={enlargedImage.title}
                  className="w-full h-full object-contain max-h-[80vh]"
                />
                
                <button
                  onClick={() => setEnlargedImage(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
                  aria-label="이미지 닫기"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-4 bg-white border-t">
                <h3 className="text-lg font-semibold text-[#1C3D5A]">{enlargedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-[#F8F9FA] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800]/5 to-transparent opacity-30"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#FFB800]/10 text-[#1C3D5A] px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Target className="w-4 h-4" />
            6단계 풀서비스
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#1C3D5A] mb-6"
          >
            처음부터 끝까지, <br />
            <span className="text-[#FFB800]">모든 것을 대신합니다</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-[#868E96] leading-relaxed max-w-3xl mx-auto"
          >
            복잡한 아마존 진출 과정을 체계적인 6단계로 나누어, <br />
            각 단계마다 전문가가 직접 관리하여 안전하고 확실한 성공을 보장합니다.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <ServiceModal service={step}>
                <div className="group cursor-pointer h-full bg-white border border-gray-100 hover:border-[#FFB800]/30 hover:shadow-xl transition-all duration-500 rounded-xl overflow-hidden p-8 flex flex-col">
                  {/* Step header with icon and number */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-[#1C3D5A] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:bg-[#FFB800] transition-colors duration-300">
                        {React.createElement(step.icon, { className: "w-8 h-8" })}
                      </div>
                      <div className="absolute -top-2 -right-2 bg-[#FFB800] text-[#1C3D5A] text-sm font-bold px-2 py-1 rounded-full shadow-md">
                        {step.stepNumber}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1C3D5A] mb-2 group-hover:text-[#FFB800] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-[#868E96] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* CTA Arrow - Always visible at bottom */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm text-[#868E96] group-hover:text-[#1C3D5A] transition-colors duration-300">
                      자세히 보기
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#FFB800] group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </ServiceModal>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[#1C3D5A] to-[#15324A] rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800]/10 to-transparent opacity-30"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                지금 바로 시작하세요
              </h3>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                무료 타당성 조사로 당신의 제품이 아마존에서 성공할 수 있는지 확인해보세요
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-[#FFB800] hover:bg-[#E5A600] text-[#1C3D5A] font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  onClick={() => {
                    window.open('https://docs.google.com/forms/d/e/1FAIpQLSdeLewllbICJgW-77OIcaZ7r7uIsGyKopRFEXl1whHQZq7umg/viewform?usp=header', '_blank');
                  }}
                >
                  무료 타당성 조사 신청
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1C3D5A] font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    window.open('http://pf.kakao.com/_xakHNn/chat', '_blank');
                  }}
                >
                  카카오톡 상담하기
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}