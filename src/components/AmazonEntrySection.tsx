import { motion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function AmazonEntrySection() {
  const handleFormClick = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSdeLewllbICJgW-77OIcaZ7r7uIsGyKopRFEXl1whHQZq7umg/viewform', '_blank');
  };

  return (
    <section className="py-20 sm:py-24 bg-[#F8F9FA] relative">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-40 h-40 bg-[#FFB800]/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Section divider line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#1C3D5A]/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#1C3D5A] font-semibold text-sm mb-6 border border-[#1C3D5A]/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Zap className="w-4 h-4" />
            <span>무료 타당성 조사</span>
            <div className="w-2 h-2 bg-[#FFB800] rounded-full" />
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1C3D5A] mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            아마존 진출, 해볼까 말까 고민되시나요?
          </motion.h2>

          {/* Sub Headline */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-[#868E96] mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            AI 시장 데이터와 전문가의 인사이트로 무료 타당성 조사를 받아보세요.
          </motion.p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-[#1C3D5A] rounded-2xl p-6 sm:p-8 lg:p-12 xl:p-16 text-white relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8">
                지금 바로 무료 타당성 조사를 신청해보세요!
              </h3>

              {/* 버튼 2개를 나란히 배치 */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-4xl mx-auto">
                {/* 무료 타당성 조사 신청 버튼 */}
                <motion.button
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 bg-[#FFB800] hover:bg-[#E5A600] text-[#1C3D5A] font-bold rounded-full text-lg sm:text-xl group relative overflow-hidden transition-all duration-300"
                  onClick={handleFormClick}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">무료 타당성 조사 신청하기</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </motion.button>

                {/* 타당성 조사 샘플 확인 버튼 */}
                <Dialog>
                  <DialogTrigger asChild>
                    <motion.button
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 bg-white hover:bg-[#F8F9FA] text-[#1C3D5A] border-2 border-[#FFB800] font-bold rounded-full text-lg sm:text-xl group relative overflow-hidden transition-all duration-300"
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">타당성 조사 샘플 확인하기</span>
                      <motion.div
                        className="relative z-10"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.div>
                    </motion.button>
                  </DialogTrigger>
                  
                  <DialogContent className="!max-w-none !w-[95vw] !h-[90vh] !max-h-none overflow-hidden p-0 bg-white border-0 shadow-2xl">
                    {/* Modal Header */}
                    <div className="relative bg-white border-b border-gray-100 p-6">
                      <DialogHeader className="relative z-10">
                        <div className="text-center">
                          <DialogTitle className="text-3xl font-black text-[#1C3D5A] mb-2">
                            타당성 조사 샘플 리포트
                          </DialogTitle>
                          <DialogDescription className="text-[#868E96] text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                            실제 아마존 입점 타당성 조사 리포트 샘플을 확인해보세요.
                          </DialogDescription>
                          
                          {/* 무료 타당성 조사 신청 버튼 */}
                          <motion.button
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFB800] hover:bg-[#E5A600] text-[#1C3D5A] font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                            onClick={handleFormClick}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            무료 타당성 조사 신청하기
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </DialogHeader>
                    </div>
                    
                    {/* Modal Content - iframe */}
                    <div className="h-[calc(90vh-140px)] relative">
                      <iframe 
                        src="https://hs3056.github.io/samplereport1/"
                        className="w-full h-full border-0"
                        title="타당성 조사 샘플 리포트"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Section divider line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#1C3D5A]/20 to-transparent"></div>
    </section>
  );
}