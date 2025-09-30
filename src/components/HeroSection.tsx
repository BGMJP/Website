import { ArrowRight, Globe, Users, TrendingUp } from "lucide-react";
import brandLogo from 'figma:asset/fae95a5ea84a9e5039e23ea4a0968d141c0af75e.png';
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 스크롤 및 다운로드 함수
  const handleScrollToContact = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('🔥 Contact button clicked! Event:', e);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      console.log('✅ Scroll initiated successfully');
    } else {
      console.error('❌ Contact element not found');
    }
  };

  const handleScrollToServices = () => {
    console.log('Scrolling to services section');
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      console.log('Scroll to services initiated successfully');
    } else {
      console.error('Services element not found');
    }
  };

  const handleDownload = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('🔥 Download button clicked! Event:', e);
    const url = 'https://drive.google.com/uc?export=download&id=1se4H29yNK7gsAwSo41k3V-m0Edu_XuWC';
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('✅ Download link created and clicked');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-24 pb-16">
      {/* Minimal background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(28, 61, 90, 0.3) 2px, transparent 0)`,
               backgroundSize: '80px 80px'
             }}>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Brand Logo */}
          <div className="mb-8 sm:mb-12">
            <img
              src={brandLogo}
              alt="아마존캐리 로고"
              className="h-28 sm:h-32 md:h-36 lg:h-40 w-auto mx-auto transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Powerful headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight text-[#1C3D5A]">
            <span className="text-[#1C3D5A]">
              아마존캐리
            </span>
            <br />
            <span className="text-[#FFB800]">
              세계 1위 시장
            </span>
            <span className="text-[#1C3D5A]">에</span>
            <br />
            <span className="text-[#1C3D5A]">고객을 연결합니다</span>
          </h1>

          {/* Professional subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#868E96] mb-16 max-w-3xl mx-auto leading-relaxed font-normal">
            입점부터 판매까지<br />
            <span className="text-[#212529] font-semibold">아마존캐리가 해드립니다</span>
          </p>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-24 relative z-20">
            <div 
              onClick={handleScrollToContact}
              onMouseDown={(e) => console.log('🔥 Contact mousedown')}
              onMouseUp={(e) => console.log('🔥 Contact mouseup')}
              className="inline-flex items-center justify-center bg-[#FFB800] hover:bg-[#E5A600] text-[#1C3D5A] px-8 py-4 text-lg font-semibold rounded-lg border-0 transition-all duration-300 w-full sm:w-auto cursor-pointer select-none shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 relative z-30 pointer-events-auto"
            >
              <span>무료 상담받기</span>
              <ArrowRight className="ml-3 h-5 w-5" strokeWidth={2} />
            </div>

            <div 
              onClick={handleDownload}
              onMouseDown={(e) => console.log('🔥 Download mousedown')}
              onMouseUp={(e) => console.log('🔥 Download mouseup')}
              className="inline-flex items-center justify-center bg-white hover:bg-[#F8F9FA] text-[#1C3D5A] border-2 border-[#1C3D5A] px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 w-full sm:w-auto cursor-pointer select-none shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 relative z-30 pointer-events-auto"
            >
              <span>서비스 소개서</span>
              <ArrowRight className="ml-3 h-5 w-5" strokeWidth={2} />
            </div>
          </div>

          {/* Minimal Stats with Icons */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            {[
              { 
                icon: <Users strokeWidth={2} className="w-5 h-5" />, 
                number: "3억 명", 
                label: "아마존 글로벌 스토어 고객"
              },
              { 
                icon: <TrendingUp strokeWidth={2} className="w-5 h-5" />, 
                number: "8.7배", 
                label: "국내 대비 시장 규모"
              },
              { 
                icon: <Globe strokeWidth={2} className="w-5 h-5" />, 
                number: "887조 원", 
                label: "2024년 아마존 매출액"
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`flex items-center justify-center gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-[#F8F9FA] flex items-center justify-center text-[#1C3D5A] flex-shrink-0 border border-[#1C3D5A]/10">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-2xl md:text-3xl font-bold text-[#FFB800]">
                    {stat.number}
                  </div>
                  <div className="text-[#868E96] font-normal text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Supporting paragraph and brand mission */}
          <div 
            className={`max-w-4xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '0.9s' }}
          >
            <div className="bg-[#F8F9FA] rounded-xl p-10 lg:p-14 mb-8 border border-[#1C3D5A]/10 shadow-sm">
              <p className="text-lg sm:text-xl md:text-2xl text-[#212529] leading-relaxed font-normal" style={{ fontSize: 'clamp(19px, 4vw, 25px)' }}>
                <span className="text-[#1C3D5A] font-bold">놀라운 규모의 시장</span>에선<br />
                <span style={{ color: '#212529' }} className="font-bold">실력 있는 대행사의 선택이 매출을 좌우합니다.</span><br />
                <br />
                아마존에 진출하여 모든 것을 직접 하고 있는<br />
                <span style={{ color: '#1C3D5A' }} className="font-black">아마존캐리의 캐리어들</span>은<br />
                고객님을 이끌어드릴 준비가 되어 있습니다.
              </p>
            </div>
            
            <div 
              className="bg-[#1C3D5A] rounded-xl p-10 text-white text-center hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed" style={{ color: '#FFFFFF' }}>
                <span className="text-[#FFB800] text-2xl sm:text-3xl md:text-4xl">"</span>
                가치를 효과적으로 전달하여<br />
                고객을 성공으로 이끈다
                <span className="text-[#FFB800] text-2xl sm:text-3xl md:text-4xl">"</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤 버튼 제거 */}
      {/* 기존 스크롤 인디케이터 삭제됨 */}
    </section>
  );
}