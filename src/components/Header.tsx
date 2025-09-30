import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import logoImage from 'figma:asset/fae95a5ea84a9e5039e23ea4a0968d141c0af75e.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }; 

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-2xl border-b border-gray-200/50 shadow-lg shadow-gray-500/10' 
          : 'bg-white/10 backdrop-blur-xl border-b border-white/20'
      }`}
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center cursor-pointer focus:outline-none rounded-lg p-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label="아마존캐리 홈으로 이동"
          >
            <img src={logoImage} alt="아마존캐리" className="h-12 w-auto" />
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['services', 'portfolio', 'pricing', 'blog'].map((section, index) => (
              <motion.button
                key={section}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                onClick={() => scrollToSection(section)}
                className={`relative group transition-all duration-200 font-semibold ${
                  scrolled 
                    ? 'text-main hover:text-primary' 
                    : 'text-main hover:text-primary'
                }`}
              >
                {section === 'services' && '서비스'}
                {section === 'portfolio' && '포트폴리오'}
                {section === 'pricing' && '요금제'}
                {section === 'blog' && '블로그'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-200"></span>
              </motion.button>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                onClick={() => scrollToSection('contact')}
                className="btn-primary hover:bg-[#E5A500] subtle-shadow hover:shadow-xl transform hover:scale-105 transition-all duration-200 btn-radius font-semibold"
              >
                무료 상담받기
              </Button>
            </motion.div>
          </nav>

          {/* Mobile menu button */}
          <motion.div 
            className="md:hidden"
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl transition-all duration-200 ${
                scrolled 
                  ? 'text-main hover:text-primary hover:bg-primary/10' 
                  : 'text-main hover:text-primary hover:bg-gray-50'
              }`}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
              </motion.div>
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-2xl card-radius mx-4 mb-4 border border-gray-200/50 subtle-shadow"
        >
          {isMenuOpen && (
            <div className="p-6 space-y-4">
              {['services', 'portfolio', 'pricing', 'blog'].map((section, index) => (
                <motion.button
                  key={section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left text-main hover:text-primary transition-colors duration-200 py-3 px-4 btn-radius hover:bg-primary/10 font-semibold"
                >
                  {section === 'services' && '서비스'}
                  {section === 'portfolio' && '포트폴리오'}
                  {section === 'pricing' && '요금제'}
                  {section === 'blog' && '블로그'}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full btn-primary hover:bg-[#E5A500] subtle-shadow btn-radius font-semibold"
                >
                  무료 상담받기
                </Button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
}