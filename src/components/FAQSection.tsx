import { HelpCircle, Sparkles, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqData = [
  {
    question: "무료 시장 조사를 받으면 꼭 아마존캐리와 계약을 해야 하나요?",
    answer: "전혀 그렇지 않습니다. 'AI 무료 시장 조사'는 아마존 진출을 망설이는 고객님들께서 경험하실 수 있도록 제공하는 무료 서비스입니다. 계약 여부와 관계없이 편하게 신청해 주세요."
  },
  {
    question: "다른 아마존 대행사와 '아마존캐리'만의 가장 큰 차이점은 무엇인가요?",
    answer: "저희 '캐리어'들은 단순 컨설턴트가 아닌, 현재도 아마존에서 직접 판매를 하고 있는 현역 셀러입니다. 이론이 아닌 다년간의 직접 경험과 운영 대행 노하우를 바탕으로 고객이 겪을 수 있는 시행착오를 미리 방지합니다."
  },
  {
    question: "'아마존캐리'는 미국 아마존 시장만 전문으로 하나요? 아니면 유럽, 일본 등 다른 국가도 가능한가요?",
    answer: "'아마존캐리'는 세계 1위 시장인 미국(US) 아마존을 핵심 전문 분야로 하고 있으며, 이에 더해 유럽의 핵심 거점인 독일(DE)과 아시아의 주요 시장인 일본(JP) 아마존 진출 및 운영 서비스까지 전문적으로 제공하고 있습니다."
  },
  {
    question: "레퍼런스를 보니 뷰티, 산업용품 등 다양한데, 식품, 전자기기도 경험이 있으신가요?",
    answer: "레퍼런스에 소개된 사례는 대표적인 예시입니다. 아마존캐리의 핵심 역량은 카테고리에 관계없이 적용 가능한 데이터 기반의 '성공 로드맵'입니다. 특히 웹사이트에서 언급된 'FDA 규제 대응' 경험은 식품, 뷰티, 건강기능식품 카테고리에서, '콘텐츠 및 광고 전략'은 전자기기 등 경쟁이 치열한 카테고리에서 성공적으로 적용된 바 있습니다."
  },
  {
    question: "각 서비스 플랜(플러스, 멤버스, 시즌패스)의 차이점을 알기 쉽게 설명해 주세요.",
    answer: "플러스: 아마존 입점에 필요한 모든 초기 세팅을 1회성으로 제공합니다. (계정 생성, 리스팅, FBA 입고, 브랜드 페이지 등)\n멤버스 (월): 이미 입점은 되어 있으나 전문적인 월간 운영이 필요한 셀러를 위한 서비스입니다. (광고, 재고, CS, 리포트)\n시즌패스 (통합): '플러스(입점)'와 '멤버스(운영 3개월)'를 결합하여 10% 할인된 비용으로 제공하는 가장 인기 있는 패키지입니다. 입점부터 초기 안정화까지 한 번에 해결할 수 있습니다."
  },
  {
    question: "'시즌패스(Season Pass)' 플랜이 가장 인기 있는 이유가 무엇이며, 3개월 후에는 어떻게 되나요?",
    answer: "'시즌패스'가 가장 인기 있는 이유는 아마존 비즈니스의 핵심인 '성공적인 입점'과 '초기 3개월 운영 안정화'를 모두 다루기 때문입니다. 입점만 하고 운영을 방치하면 성과가 나지 않습니다. 이 플랜은 초기 광고 효율을 잡고 재고 관리를 안정화시키는 '골든 타임'을 책임집니다. 3개월 운영 기간이 종료된 후에는 고객사의 선택에 따라 '멤버스' 플랜으로 연장하여 지속적인 관리를 받으실 수 있습니다."
  }
];

export function FAQSection() {
  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#FFB800]" strokeWidth={2} />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C3D5A]">
              자주 묻는 질문
            </h2>
          </div>
        </div>

        {/* FAQ Items with FAQPage Schema and Accordion */}
        <div 
          className="max-w-4xl mx-auto mb-12"
          itemScope 
          itemType="https://schema.org/FAQPage"
        >
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#F8F9FA] rounded-xl border border-[#1C3D5A]/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <AccordionTrigger 
                  className="px-6 sm:px-8 py-6 text-left hover:no-underline [&[data-state=open]>span>svg]:text-[#FFB800] [&>svg]:text-[#FFB800]"
                  itemProp="name"
                >
                  <span className="text-lg sm:text-xl font-bold text-[#1C3D5A] flex items-start gap-3">
                    <span className="text-[#FFB800] flex-shrink-0">Q.</span>
                    <span className="flex-1">{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent 
                  className="px-6 sm:px-8 pb-6"
                  itemScope 
                  itemProp="acceptedAnswer" 
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text" className="pl-8 sm:pl-11">
                    <p className="text-base sm:text-lg text-[#212529] leading-relaxed whitespace-pre-line">
                      <span className="text-[#FFB800] font-bold">A.</span>{" "}
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-white rounded-3xl px-10 py-8 border-2 border-gray-200/50 shadow-2xl overflow-hidden">
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-[#FFB800]/5" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-[#1C3D5A] mr-3" />
                <p className="text-[#868E96] text-lg leading-relaxed font-medium">
                  <span className="font-semibold text-[#1C3D5A]">
                    더 궁금하신 점이 있으신가요?
                  </span>
                </p>
                <Sparkles className="w-8 h-8 text-[#FFB800] ml-3" />
              </div>
              
              <button
                onClick={handleScrollToContact}
                className="bg-[#FFB800] hover:bg-[#E5A600] text-[#1C3D5A] hover:shadow-2xl px-10 py-4 font-semibold text-lg relative overflow-hidden group border-0 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"
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
