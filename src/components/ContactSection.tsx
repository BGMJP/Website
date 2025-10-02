import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MessageCircle, Phone, Mail, MapPin, Clock, ClipboardCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldHighlight, setShouldHighlight] = useState(false);

  // URL 파라미터에서 선택된 플랜 확인
  useEffect(() => {
    const checkUrlParams = () => {
      const hash = window.location.hash;
      if (hash.includes('#contact?')) {
        const params = new URLSearchParams(hash.split('?')[1]);
        const selectedPlan = params.get('plan');
        
        if (selectedPlan && selectedPlan !== formData.service) {
          // 플랜 자동 선택
          setFormData(prev => ({ ...prev, service: selectedPlan }));
          
          // 하이라이트 효과 트리거
          setShouldHighlight(true);
          setTimeout(() => setShouldHighlight(false), 2000);
          
          // URL 정리 (파라미터 제거)
          setTimeout(() => {
            window.history.replaceState(null, '', '#contact');
          }, 100);
        }
      }
    };

    // 초기 체크
    checkUrlParams();
    
    // hash 변경 감지
    const handleHashChange = () => checkUrlParams();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [formData.service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Web3Forms를 사용한 이메일 전송
      const formDataToSend = new FormData();
      
      // Web3Forms 설정
      formDataToSend.append('access_key', '81ffc93b-b352-4ccd-b28e-97aec4ffe850');
      formDataToSend.append('subject', `[아마존캐리] ${formData.name}님의 상담 요청`);
      formDataToSend.append('from_name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', `
이름: ${formData.name}
이메일: ${formData.email}
연락처: ${formData.phone || '미입력'}
회사명: ${formData.company || '미입력'}
필요한 서비스: ${formData.service}

상세 문의사항:
${formData.message || '상세 문의사항 없음'}

---
아마존캐리 웹사이트에서 전송된 상담 요청입니다.
      `);

      // 받는 사람 이메일 설정
      formDataToSend.append('to', 'amz@adcarry.co.kr');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        alert('상담 요청이 성공적으로 접수되었습니다. 24시간 내에 연락드리겠습니다.');
        
        // 폼 초기화
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error(result.message || '전송 실패');
      }
    } catch (error) {
      console.error('이메일 전송 오류:', error);
      
      // 간단한 백업 방법: Formspree 무료 서비스 사용
      try {
        const backupFormData = new FormData();
        backupFormData.append('name', formData.name);
        backupFormData.append('email', formData.email);
        backupFormData.append('phone', formData.phone || '미입력');
        backupFormData.append('company', formData.company || '미입력');
        backupFormData.append('service', formData.service);
        backupFormData.append('message', formData.message || '상세 문의사항 없음');
        backupFormData.append('_subject', `[아마존캐리] ${formData.name}님의 상담 요청`);
        backupFormData.append('_replyto', formData.email);

        const backupResponse = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
          method: 'POST',
          body: backupFormData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (backupResponse.ok) {
          alert('상담 요청이 성공적으로 접수되었습니다. 24시간 내에 연락드리겠습니다.');
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            message: ''
          });
        } else {
          throw new Error('백업 전송도 실패');
        }
      } catch (backupError) {
        console.error('백업 전송 오류:', backupError);
        
        // 최종 백업: 간단한 alert와 함께 카카오톡으로 안내
        alert(`전송 중 오류가 발생했습니다.\\n\\n아래 정보를 카카오톡으로 보내주세요:\\n\\n이름: ${formData.name}\\n이메일: ${formData.email}\\n연락처: ${formData.phone || '미입력'}\\n회사: ${formData.company || '미입력'}\\n서비스: ${formData.service}\\n문의사항: ${formData.message || '없음'}`);
        
        // 카카오톡 채널로 이동
        window.open('http://pf.kakao.com/_xakHNn/chat', '_blank');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#F8F9FA]">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="consultation" className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C3D5A] mb-4 sm:mb-6">
            <span className="text-[#FFB800]">무료 상담</span> 신청
          </h2>
          <p className="text-lg sm:text-xl text-[#868E96] max-w-3xl mx-auto leading-relaxed">
            아마존 진출에 대한 모든 궁금한 점을 전문가와 상담해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-stretch">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-lg h-full bg-white">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl sm:text-2xl font-black text-[#1C3D5A]">
                  상담 요청서
                </CardTitle>
                <CardDescription className="text-[#868E96] leading-relaxed">
                  정확한 상담을 위해 아래 정보를 입력해주세요
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex flex-col h-full">
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">이름 *</Label>
                      <Input 
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="홍길동"
                        required
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">이메일 *</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="example@company.com"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">연락처</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="010-0000-0000"
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company">회사명</Label>
                      <Input 
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="회사명을 입력하세요"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <motion.div
                    animate={shouldHighlight ? {
                      scale: [1, 1.01, 1],
                      filter: [
                        "drop-shadow(0 0 0px rgba(28, 61, 90, 0))",
                        "drop-shadow(0 0 20px rgba(28, 61, 90, 0.6)) drop-shadow(0 0 40px rgba(255, 184, 0, 0.4))",
                        "drop-shadow(0 0 0px rgba(28, 61, 90, 0))"
                      ]
                    } : {
                      scale: 1,
                      filter: "drop-shadow(0 0 0px rgba(28, 61, 90, 0))"
                    }}
                    transition={{ 
                      duration: 3, 
                      ease: [0.4, 0, 0.2, 1],
                      times: [0, 0.5, 1]
                    }}
                    className="rounded-lg relative"
                  >
                    <Label htmlFor="service" className={`transition-colors duration-700 ${shouldHighlight ? "text-[#1C3D5A]" : "text-[#1C3D5A]"}`}>
                      필요한 서비스 *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('service', value)} required value={formData.service}>
                      <SelectTrigger 
                        className={`mt-2 transition-all duration-700 relative overflow-hidden ${
                          shouldHighlight 
                            ? 'border-[#1C3D5A] ring-1 ring-[#1C3D5A]/30 bg-[#FFB800]/8 shadow-lg' 
                            : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm ring-0'
                        }`}
                      >
                        {shouldHighlight && (
                          <motion.div
                            className="absolute inset-0 bg-[#FFB800]/10 rounded-md"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: [0, 0.8, 0],
                              scale: [0.8, 1.05, 1]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                              duration: 2.5,
                              ease: "easeOut",
                              times: [0, 0.6, 1]
                            }}
                          />
                        )}
                        {shouldHighlight && (
                          <motion.div
                            className="absolute inset-0 border border-[#1C3D5A]/40 rounded-md"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: [0, 1, 0.7, 0],
                              boxShadow: [
                                "0 0 0px rgba(28, 61, 90, 0)",
                                "0 0 15px rgba(28, 61, 90, 0.4), 0 0 30px rgba(255, 184, 0, 0.2)",
                                "0 0 10px rgba(28, 61, 90, 0.3)",
                                "0 0 0px rgba(28, 61, 90, 0)"
                              ]
                            }}
                            exit={{ opacity: 0, boxShadow: "0 0 0px rgba(28, 61, 90, 0)" }}
                            transition={{ 
                              duration: 3,
                              ease: "easeInOut",
                              times: [0, 0.3, 0.7, 1]
                            }}
                          />
                        )}
                        <SelectValue placeholder="서비스를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plus">플러스 플랜</SelectItem>
                        <SelectItem value="season">시즌패스 플랜</SelectItem>
                        <SelectItem value="members">멤버스 플랜</SelectItem>
                        <SelectItem value="partners">파트너스 플랜</SelectItem>
                        <SelectItem value="consultation">일반 상담 문의</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <div className="flex-1">
                    <Label htmlFor="message">상세 문의사항</Label>
                    <Textarea 
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="궁금한 점이나 현재 상황에 대해 자세히 알려주세요"
                      rows={6}
                      className="mt-2 min-h-[140px]"
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[#1C3D5A] hover:bg-[#15324A] text-white mt-auto disabled:opacity-50 font-bold py-4 text-lg"
                  >
                    {isSubmitting ? '전송 중...' : '무료 상담 요청하기'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            {/* Quick Contact */}
            <Card className="border-none shadow-lg flex-1 bg-white">
              <CardHeader className="pb-0.5">
                <CardTitle className="text-lg sm:text-xl font-black text-[#1C3D5A]">
                  빠른 상담
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 h-full flex flex-col">
                <Button 
                  className="w-full bg-[#FEE500] hover:bg-[#FFEB3B] text-black font-bold py-3"
                  onClick={() => window.open('http://pf.kakao.com/_xakHNn/chat', '_blank')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  카카오톡 상담
                </Button>
                
                <Button 
                  className="w-full bg-[#FFB800] hover:bg-[#E5A600] text-[#1C3D5A] font-bold py-3"
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdeLewllbICJgW-77OIcaZ7r7uIsGyKopRFEXl1whHQZq7umg/viewform?usp=header', '_blank')}
                >
                  <ClipboardCheck className="mr-2 h-5 w-5" />
                  AI 무료 시장 조사
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full border-2 border-[#1C3D5A]/20 text-[#1C3D5A] hover:bg-[#F8F9FA] font-semibold py-3"
                  onClick={() => window.location.href = 'tel:010-9594-2488'}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  전화 상담
                </Button>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card className="border-none shadow-lg flex-1 bg-white">
              <CardHeader className="pb-0.5">
                <CardTitle className="text-lg sm:text-xl font-black text-[#1C3D5A]">
                  연락처 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-[#1C3D5A] mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1C3D5A]">전화번호</p>
                      <p className="text-[#868E96]">02-6925-0147</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-[#1C3D5A] mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1C3D5A]">이메일</p>
                      <p className="text-[#868E96]">amz@adcarry.co.kr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-[#1C3D5A] mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1C3D5A]">주소</p>
                      <p className="text-[#868E96] leading-relaxed">서울특별시 금천구 가산디지털1로 204, 904호</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-[#1C3D5A] mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1C3D5A]">운영시간</p>
                      <p className="text-[#868E96]">평일 09:00 - 18:00</p>
                      <p className="text-[#868E96] text-sm">(토·일·공휴일 휴무)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="border-none shadow-lg bg-white overflow-hidden">
            <CardHeader className="pb-6 flex items-center justify-center">
              <CardTitle className="text-3xl font-black text-[#1C3D5A] text-center">
                찾아오시는 길
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="relative w-full" style={{ paddingBottom: '40%' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.0357682495696!2d126.88106019999998!3d37.48348229999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c993ede138279%3A0xfa933faeb33788a3!2z7KO87Iud7ZqM7IKsIOyVoOuTnOy6kOumrA!5e0!3m2!1sko!2skr!4v1756972113047!5m2!1sko!2skr"
                  className="absolute top-0 left-0 w-full h-full border-0 rounded-b-lg"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="아마존캐리 위치"
                />
              </div>
              
              {/* Additional location info */}
              <div className="p-6 bg-[#F8F9FA]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-[#1C3D5A] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1C3D5A] mb-1">상세 주소</p>
                      <p className="text-[#868E96] text-sm leading-relaxed">
                        서울특별시 금천구 가산디지털1로 204, 904호<br />
                        주식회사 애드캐리
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-[#1C3D5A] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1C3D5A] mb-1">대중교통</p>
                      <p className="text-[#868E96] text-sm leading-relaxed">
                        지하철 1호선, 7호선 가산디지털단지역<br />
                        9번 출구에서 도보 5분
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}