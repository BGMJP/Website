import { Mail, MapPin, Phone } from "lucide-react";
import logoImage from 'figma:asset/fae95a5ea84a9e5039e23ea4a0968d141c0af75e.png';

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="text-white" style={{ backgroundColor: '#101828' }}>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img src={logoImage} alt="아마존캐리" className="h-12 w-auto" />
            </div>
            <p className="text-body text-gray-300 mb-6 leading-relaxed">
              아마존캐리는 한국 브랜드의 미국 아마존 진출을 전문적으로 지원하는 풀서비스 대행사입니다. 
              계정 설정부터 운영까지, 성공적인 글로벌 확장을 함께 만들어갑니다.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-accent" strokeWidth={2} />
                <span className="text-gray-300">amz@adcarry.co.kr</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 text-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
                <span className="text-gray-300 leading-relaxed">서울특별시 금천구 가산디지털1로 204, 904호</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-accent" strokeWidth={2} />
                <span className="text-gray-300">02-6925-0147</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-h3 font-bold mb-6">빠른 링크</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  서비스 소개
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  포트폴리오
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  요금제
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('blog')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  블로그
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  상담 신청
                </button>
              </li>
            </ul>
          </div>


        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sub text-xs sm:text-sm text-center md:text-left">
              <p className="leading-relaxed">주식회사 애드캐리 | CEO: 장동훈 | 사업자등록번호: 582-88-01950</p>
              <p className="mt-1">© 2025 아마존캐리. All rights reserved.</p>
            </div>
            
            <div className="text-sub text-xs sm:text-sm">
              <span>Powered by ADCARRY Corp.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}