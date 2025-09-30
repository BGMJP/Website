import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Star, Crown, Zap, Shield, Target, Users, TrendingUp, ArrowRight, Sparkles, DollarSign } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";

export function PricingSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedFab, setExpandedFab] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const plans = [
    {
      name: "플러스",
      price: "500만 원",
      period: "1회",
      description: "아마존 입점을 위한/기본 세팅 서비스",
      recommendedFor: "신규 셀러",
      icon: <Zap className="h-6 w-6" />,
      color: "from-[#1C3D5A] to-[#15324A]",
      bgColor: "from-[#1C3D5A]/10 to-[#1C3D5A]/5",
      shadowColor: "shadow-[#1C3D5A]/25",
      ringColor: "ring-[#1C3D5A]/30",
      badge: "입점 전용",
      services: [
        "계정 생성 & 가상계좌 발급",
        "브랜드 레지스트리",
        "카테고리 승인",
        "리스팅 기획 및 제작",
        "FBA 입고",
        "브랜드 페이지 제작"
      ]
    },
    {
      name: "멤버스",
      price: "150만 원",
      period: "월",
      description: "아마존 운영 전문 관리 서비스",
      recommendedFor: "운영 안정화 셀러",
      icon: <Crown className="h-6 w-6" />,
      color: "from-[#FFB800] to-[#E5A600]",
      bgColor: "from-[#FFB800]/10 to-[#FFB800]/5",
      shadowColor: "shadow-[#FFB800]/25",
      ringColor: "ring-[#FFB800]/30",
      badge: "운영 전용",
      services: [
        "광고 운영",
        "재고 & CS 관리",
        "종합 리포트"
      ]
    },
    {
      name: "시즌패스",
      price: "855만 원",
      period: "입점 세팅 + 3개월 운영",
      description: "입점과 운영을 한 번에,/안정적인 성장 패키지",
      recommendedFor: "입점 + 운영 동시 필요",
      icon: <Star className="h-6 w-6" />,
      color: "from-[#7E3FF2] to-[#FFA528]",
      bgColor: "from-[#7E3FF2]/10 to-[#FFA528]/10",
      shadowColor: "shadow-[#7E3FF2]/30",
      ringColor: "ring-[#7E3FF2]/40",
      discount: "10% 할인",
      services: [
        "플러스 플랜 전체",
        "멤버스 플랜 전체"
      ]
    },
    {
      name: "파트너스",
      price: "월 매출 5%",
      period: "월 매출 $20,000 ↑",
      description: "전담 매니저 배정,/맞춤형 심화 관리",
      recommendedFor: "월 $20,000 이상 브랜드",
      icon: <Users className="h-6 w-6" />,
      color: "from-[#1C3D5A] to-[#868E96]",
      bgColor: "from-[#1C3D5A]/10 to-[#868E96]/10",
      shadowColor: "shadow-[#1C3D5A]/25",
      ringColor: "ring-[#1C3D5A]/30",
      badge: "심화 관리",
      services: [
        "전담 매니저 배정하여 관리"
      ]
    }
  ];



  const handleScrollToContact = useCallback((e: React.MouseEvent, planType?: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Button clicked - scrolling to contact with plan:', planType);
    
    // URL에 선택된 플랜 정보 추가
    const params = new URLSearchParams();
    if (planType) {
      params.set('plan', planType);
    }
    
    window.location.hash = '#contact' + (params.toString() ? '?' + params.toString() : '');
    
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
      }
    }, 100);
  }, []);

  const PricingCard = ({ plan, index }: { plan: any; index: number }) => {
    const isRecommended = plan.name === '시즌패스';
    
    return (
      <div className="group relative h-full">
        {/* 추천 배지 - 시즌패스만 */}
        {isRecommended && (
          <div className="absolute -top-3 -right-3 z-20">
            <div className="bg-[#FFC107] text-[#1E3A5F] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              가장 인기
            </div>
          </div>
        )}

        <Card 
          className={`relative h-full bg-[#FFFFFF] transition-all duration-300 overflow-hidden flex flex-col ${
            isRecommended 
              ? 'border-2 border-[#FFC107] shadow-2xl' 
              : 'border border-[#E9ECEF] shadow-lg hover:shadow-xl'
          }`}
          style={{ borderRadius: '12px', padding: '32px' }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* 아이콘 */}
          <div className="flex justify-start mb-3">
            <div className="w-16 h-16 bg-[#1E3A5F] rounded-lg flex items-center justify-center text-white shadow-lg">
              {plan.icon}
            </div>
          </div>

          {/* Level 2 - 플랜 이름 */}
          <h3 className="text-[26px] font-bold text-[#343A40] mb-2 text-center">
            {plan.name}
          </h3>

          {/* Level 1 - 가격 (가장 중요) - 고정 높이 */}
          <div className="mb-2 h-28">
            {/* 가격 표시 */}
            <div className="mb-4 relative text-center">
              <div className={`font-black text-[#FFC107] leading-none mb-2 break-words ${
                plan.name === '파트너스' 
                  ? 'text-[44px] whitespace-nowrap' 
                  : 'text-[44px]'
              }`}>
                {plan.price}
                {/* 시즌패스의 할인 배지를 가격 오른쪽 위에 배치 */}
                {plan.discount && plan.name === '시즌패스' && (
                  <span className="absolute -top-11 -right-7">
                    <div className="inline-flex items-center bg-[#FFC107] text-[#1E3A5F] px-2 py-1 rounded-full text-xs font-bold shadow-md">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {plan.discount}
                    </div>
                  </span>
                )}
              </div>
              <div className="text-lg text-[#343A40] font-medium">
                {plan.period}
              </div>
            </div>
            
            {/* 기존 할인 배지는 시즌패스가 아닌 경우만 표시 */}
            {plan.discount && plan.name !== '시즌패스' && (
              <div className="inline-flex items-center bg-[#FFC107] text-[#1E3A5F] px-3 py-1 rounded-full text-sm font-bold">
                <Sparkles className="w-4 h-4 mr-1" />
                {plan.discount}
              </div>
            )}
          </div>

          {/* Level 4 - 설명 - 고정 높이 */}
          <div className="mb-4 h-16 flex items-start justify-center">
            <p className="text-base font-normal text-[#343A40] leading-relaxed text-center">
              {plan.description.split('/').map((line, lineIndex) => (
                <span key={lineIndex}>
                  {line}
                  {lineIndex < plan.description.split('/').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* 추천 대상 - 고정 높이 */}
          <div className="mb-6 h-8 flex items-center justify-center">
            <div className="inline-flex items-center bg-[rgba(30,58,95,0.1)] text-[#1E3A5F] px-4 py-2 rounded-full text-sm font-semibold">
              {plan.recommendedFor}
            </div>
          </div>

          {/* Level 4 - 서비스 내용 - 고정 높이 */}
          <div className="flex-1 mb-8 min-h-[120px]">
            <div className="space-y-4">
              {plan.services.map((service: string, serviceIndex: number) => (
                <div key={serviceIndex} className="flex items-start space-x-3 text-left">
                  <div className="w-5 h-5 bg-[#FFC107] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-[#1E3A5F]" />
                  </div>
                  <span className="text-base font-normal text-[#343A40] leading-relaxed">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Level 3 - CTA 버튼 */}
          <div className="flex-shrink-0">
            <button 
              className="w-full py-4 px-6 bg-[#1E3A5F] hover:bg-[#15324A] text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              onClick={(e) => {
                const planTypeMap: { [key: string]: string } = {
                  '플러스': 'plus',
                  '멤버스': 'members',
                  '시즌패스': 'season',
                  '파트너스': 'partners'
                };
                const planType = planTypeMap[plan.name];
                handleScrollToContact(e, planType);
              }}
            >
              문의하기 →
            </button>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <section id="pricing" className="py-20 sm:py-24 relative overflow-hidden">
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
        {/* 헤더 섹션 - 애니메이션 제거 */}
        <div className="text-center mb-20">
          {/* 배지 */}
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-[#1C3D5A] font-semibold text-sm mb-8 border border-[#1C3D5A]/10 shadow-sm">
            <DollarSign className="w-4 h-4 mr-2" />
            투명한 요금제
          </div>

          {/* 메인 제목 */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1C3D5A] mb-8 leading-tight">
            <span className="text-[#FFB800]">투명하고 합리적인</span>
            <br />
            <span>서비스 플랜</span>
          </h2>
          
          {/* 서브타이틀 */}
          <p className="text-lg sm:text-xl text-[#868E96] max-w-4xl mx-auto leading-relaxed">
            브랜드의 성장 단계와 목표에 맞춰 선택할 수 있는<br />
            <span className="font-semibold text-[#1C3D5A]">맞춤형 서비스 옵션입니다</span>
          </p>

          {/* 장식 요소 */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#FFB800] rounded-full"
              />
            ))}
          </div>
        </div>

        {/* 가격 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {plans.map((plan, index) => (
            <PricingCard key={`pricing-card-${index}`} plan={plan} index={index} />
          ))}
        </div>

        {/* 하단 안내 */}
        <div className="text-center">
          <div className="relative bg-white rounded-3xl px-10 py-8 border-2 border-gray-200/50 shadow-2xl overflow-hidden">
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-accent/5" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary mr-3" />
                <p className="text-sub text-body leading-relaxed font-medium">
                  <span className="font-semibold text-primary">
                    상세 견적은 상담 시 브랜드 상황에 맞춰 맞춤으로 안내드립니다
                  </span>
                </p>
                <Sparkles className="w-8 h-8 text-accent ml-3" />
              </div>
              
              <button
                onClick={(e) => handleScrollToContact(e)}
                className="btn-primary hover:bg-[#E5A500] text-primary hover:shadow-2xl px-10 py-4 font-semibold text-lg relative overflow-hidden group border-0 btn-radius cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center">
                  무료 상담 받기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}