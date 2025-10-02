import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, ArrowRight, X, ExternalLink, Clock, Image, BookOpen, TrendingUp, Megaphone, Newspaper } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { BlogStatusIndicator } from "./BlogStatusIndicator";

interface BlogPost {
  id: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnail: string;
  htmlContent: string;
  link?: string;
  contentSource?: string;
  thumbnailSource?: 'actual' | 'fallback'; // 썸네일 소스 타입 추가
}

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
}

function BlogModal({ isOpen, onClose, post }: BlogModalProps) {
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
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
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
            className="relative bg-white card-radius subtle-shadow max-w-5xl w-full max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-primary/10 text-primary px-3 py-1.5 btn-radius text-sm font-semibold">
                    {post.category}
                  </span>
                  <span className="text-sm text-sub">블로그 미리보기</span>
                  {post.thumbnailSource === 'actual' && (
                    <span className="bg-accent/20 text-primary px-2 py-1 btn-radius text-xs font-medium flex items-center gap-1">
                      <Image className="w-3 h-3" strokeWidth={2} />
                      실제 이미지
                    </span>
                  )}
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
              <div className="p-8 pt-6">
                {/* Title and meta */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h1 className="text-h2 font-bold text-main mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  {/* Meta information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-sub mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" strokeWidth={2} />
                      {post.date}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" strokeWidth={2} />
                      {post.readTime}
                    </div>
                    {post.link && (
                      <>
                        <span>•</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(post.link, '_blank');
                          }}
                          className="flex items-center gap-1 text-primary hover:text-primary/80 font-semibold transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" strokeWidth={2} />
                          원문 보기
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* 블로그 미리보기 알림 */}
                <motion.div
                  className="mb-8 bg-accent/10 border border-accent/30 card-radius p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/20 btn-radius flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-h3 font-semibold text-main mb-1">블로그 미리보기</h3>
                      <p className="text-caption text-sub">
                        아래는 네이버 블로그 원문의 일부입니다. 전체 내용과 최신 정보는 "원문 보기"를 클릭해주세요.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Blog content preview - 원본 HTML 그대�� 표시 */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div 
                    className="blog-preview-content"
                    dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                  />
                </motion.div>

                {/* 원문 보기 CTA */}
                <motion.div
                  className="mb-8 bg-primary card-radius p-8 text-white text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h3 className="text-h3 font-semibold mb-4">전체 내용이 궁금하신가요?</h3>
                  <p className="text-body text-white/80 mb-6 leading-relaxed">
                    네이버 블로그에서 전체 글과 최신 업데이트 내용을<br />
                    확인하실 수 있습니다.
                  </p>
                  
                  <Button
                    className="bg-white text-primary hover:bg-section px-8 py-3 text-lg font-semibold subtle-shadow hover:shadow-xl transition-all duration-300 btn-radius"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(post.link, '_blank');
                    }}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" strokeWidth={2} />
                    네이버 블로그에서 전체 글 읽기
                  </Button>
                </motion.div>

                {/* 상담 CTA 섹션 */}
                <motion.div
                  className="pt-8 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-accent/10 card-radius p-8 text-center">
                    <h3 className="text-2xl font-semibold text-main mb-4">
                      더 자세한 아마존 진출 상담이 필요하신가요?
                    </h3>
                    <p className="text-sub mb-6 leading-relaxed">
                      아마존캐리의 전문가가 귀하의 브랜드에 맞는<br />
                      맞춤형 진출 전략을 제안해드립니다.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:shadow-lg px-6 py-3 text-lg font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open('https://pf.kakao.com/_xakHNn', '_blank');
                        }}
                      >
                        무료 상담 신청하기
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-6 py-3 text-lg font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open('https://blog.naver.com/amazoncarry', '_blank');
                        }}
                      >
                        더 많은 글 보기
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'fallback'>('loading');

  // 카테고리별 이미지 인덱스 계산
  const getCategoryImageIndex = (posts: BlogPost[], currentIndex: number): number => {
    const currentPost = posts[currentIndex];
    const currentCategory = currentPost.category;
    
    // 현재 포스트까지 같은 카테고리가 몇 번 나왔는지 계산
    let categoryCount = 0;
    for (let i = 0; i <= currentIndex; i++) {
      if (posts[i].category === currentCategory) {
        categoryCount++;
      }
    }
    
    // 인덱스는 0부터 시작하므로 1을 빼줌
    return categoryCount - 1;
  };

  // 카테고리별 아이콘 매핑
  const getCategoryIcon = (category: string) => {
    if (category.includes('가이드') || category.includes('입점')) {
      return <BookOpen className="w-3 h-3" />;
    } else if (category.includes('전략') || category.includes('판매')) {
      return <TrendingUp className="w-3 h-3" />;
    } else if (category.includes('광고') || category.includes('마케팅')) {
      return <Megaphone className="w-3 h-3" />;
    } else if (category.includes('뉴스')) {
      return <Newspaper className="w-3 h-3" />;
    }
    return <BookOpen className="w-3 h-3" />; // 기본 아이콘
  };

  // 카테고리별 스톡 이미지 매핑 (각 카테고리당 3개 이미지)
  const getCategoryThumbnail = (category: string, imageIndex: number = 0): string => {
    const categoryImageMap: { [key: string]: string[] } = {
      '아마존 입점 가이드 AtoZ': [
        'https://images.unsplash.com/photo-1657819547860-ea03df0eafa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjB3YXJlaG91c2UlMjBidXNpbmVzcyUyMGd1aWRlfGVufDF8fHx8MTc1NzQwNDA4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1694153015244-c3f4da130d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjBsb2dpc3RpY3MlMjBzaGlwcGluZyUyMHdhcmVob3VzZXxlbnwxfHx8fDE3NTc0MDQ0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1644984875410-e11486d2b94f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMGd1aWRlfGVufDF8fHx8MTc1NzQwNDQzOXww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      '아마존 가이드': [
        'https://images.unsplash.com/photo-1657819547860-ea03df0eafa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjB3YXJlaG91c2UlMjBidXNpbmVzcyUyMGd1aWRlfGVufDF8fHx8MTc1NzQwNDA4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1694153015244-c3f4da130d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjBsb2dpc3RpY3MlMjBzaGlwcGluZyUyMHdhcmVob3VzZXxlbnwxfHx8fDE3NTc0MDQ0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1644984875410-e11486d2b94f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMGd1aWRlfGVufDF8fHx8MTc1NzQwNDQzOXww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      '아마존 판매 전략': [
        'https://images.unsplash.com/photo-1542744094-24638eff58bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwcGxhbm5pbmclMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU3NDA0MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGdyb3d0aCUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTc0MDQ0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1739303987853-20ec8b1d60c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhdGVneSUyMHBsYW5uaW5nJTIwbWVldGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NzQwNDQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      '판매 전략': [
        'https://images.unsplash.com/photo-1542744094-24638eff58bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwcGxhbm5pbmclMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU3NDA0MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGdyb3d0aCUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTc0MDQ0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1739303987853-20ec8b1d60c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhdGVneSUyMHBsYW5uaW5nJTIwbWVldGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NzQwNDQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      '아마존 광고 운영': [
        'https://images.unsplash.com/photo-1680986070892-1b64bfe03338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYWR2ZXJ0aXNpbmclMjBjYW1wYWlnbnxlbnwxfHx8fDE3NTc0MDQwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1656164631610-f104326810c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhZHZlcnRpc2luZyUyMGNhbXBhaWduJTIwZGlnaXRhbHxlbnwxfHx8fDE3NTc0MDQ0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1698319298199-b81a54ced28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBhZHZlcnRpc2luZyUyMHBwYyUyMGNhbXBhaWdufGVufDF8fHx8MTc1NzQwNDQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      '아마존 광고': [
        'https://images.unsplash.com/photo-1680986070892-1b64bfe03338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYWR2ZXJ0aXNpbmclMjBjYW1wYWlnbnxlbnwxfHx8fDE3NTc0MDQwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1656164631610-f104326810c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhZHZlcnRpc2luZyUyMGNhbXBhaWduJTIwZGlnaXRhbHxlbnwxfHx8fDE3NTc0MDQ0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1698319298199-b81a54ced28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBhZHZlcnRpc2luZyUyMHBwYyUyMGNhbXBhaWdufGVufDF8fHx8MTc1NzQwNDQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      '광고 운영': [
        'https://images.unsplash.com/photo-1680986070892-1b64bfe03338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYWR2ZXJ0aXNpbmclMjBjYW1wYWlnbnxlbnwxfHx8fDE3NTc0MDQwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1656164631610-f104326810c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhZHZlcnRpc2luZyUyMGNhbXBhaWduJTIwZGlnaXRhbHxlbnwxfHx8fDE3NTc0MDQ0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1698319298199-b81a54ced28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBhZHZlcnRpc2luZyUyMHBwYyUyMGNhbXBhaWdufGVufDF8fHx8MTc1NzQwNDQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      '아마존 뉴스': [
        'https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ld3MlMjBmaW5hbmNpYWwlMjByZXBvcnRzfGVufDF8fHx8MTc1NzQwNDA4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1643962579745-bcaa05ffc573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBtYXJrZXQlMjBhbmFseXNpcyUyMHRyYWRpbmd8ZW58MXx8fHwxNzU3NDA0NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ld3NwYXBlciUyMGZpbmFuY2UlMjBuZXdzfGVufDF8fHx8MTc1NzQwNDQ0OXww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      '뉴스': [
        'https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ld3MlMjBmaW5hbmNpYWwlMjByZXBvcnRzfGVufDF8fHx8MTc1NzQwNDA4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1643962579745-bcaa05ffc573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBtYXJrZXQlMjBhbmFseXNpcyUyMHRyYWRpbmd8ZW58MXx8fHwxNzU3NDA0NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ld3NwYXBlciUyMGZpbmFuY2UlMjBuZXdzfGVufDF8fHx8MTc1NzQwNDQ0OXww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      '브랜드 전략': [
        'https://images.unsplash.com/photo-1542744094-24638eff58bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwcGxhbm5pbmclMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU3NDA0MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGdyb3d0aCUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTc0MDQ0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1739303987853-20ec8b1d60c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhdGVneSUyMHBsYW5uaW5nJTIwbWVldGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NzQwNDQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080'
      ]
    };

    // 카테고리에 해당하는 이미지 배열 찾기 (부분 매칭 포함)
    for (const [key, imageArray] of Object.entries(categoryImageMap)) {
      if (category.includes(key) || key.includes(category)) {
        // 인덱스를 배열 길이로 나눈 나머지를 사용하여 순환
        const safeIndex = imageIndex % imageArray.length;
        return imageArray[safeIndex];
      }
    }

    // 기본 이미지 배열 (매칭되지 않는 경우)
    const defaultImages = [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1542744094-24638eff58bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwcGxhbm5pbmclMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU3NDA0MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ld3MlMjBmaW5hbmNpYWwlMjByZXBvcnRzfGVufDF8fHx8MTc1NzQwNDA4N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ];
    return defaultImages[imageIndex % defaultImages.length];
  };

  // 기본 블로그 포스트 생성 (폴백용)
  const createDefaultPosts = (): BlogPost[] => [
    {
      id: 'default-1',
      category: '아마존 가이드',
      readTime: '5분 읽기',
      title: '아마존 진출을 위한 완벽 가이드 2024',
      excerpt: '2024년 최신 아마존 글로벌 진출 전략과 핵심 포인트를 정리했습니다. 성공적인 아마존 셀러가 되기 위한 필수 정보와 실전 노하우를 확인해보세요.',
      date: '2024년 12월 5일',
      thumbnail: getCategoryThumbnail('아마존 가이드', 0),
      htmlContent: `
        <div class="default-content">
          <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #222222;">아마존 진출의 핵심 단계</h3>
          <p style="margin-bottom: 12px;">2024년 아마존 진출을 위한 완벽한 가이드를 제공합니다. 변화하는 시장 환경에 맞는 최신 전략을 소개합니다.</p>
          
          <h4 style="font-size: 16px; font-weight: bold; margin: 20px 0 12px 0; color: #5A4FCF;">1단계: 시장 분석 및 제품 선정</h4>
          <p style="margin-bottom: 12px;">• 경쟁사 분석 및 니치 마켓 발굴<br/>• 제품 수요 예측 및 수익성 검토</p>
          
          <h4 style="font-size: 16px; font-weight: bold; margin: 20px 0 12px 0; color: #5A4FCF;">2단계: 계정 설정 및 브랜드 등록</h4>
          <p style="margin-bottom: 12px;">• 셀러 센트럴 계정 생성<br/>• 브랜드 레지스트리 등록</p>
          
          <p style="margin-top: 20px; padding: 16px; background: #f8f9ff; border-left: 4px solid #5A4FCF; border-radius: 4px;">
            <strong>💡 전문가 팁:</strong> 아마존캐리와 함께하면 복잡한 진출 과정을 체계적으로 관리할 수 있습니다.
          </p>
          
          <p style="margin-top: 16px;">
            <em>최신 아마존 인사이트와 상세한 가이드는 
              <a href="https://blog.naver.com/amazoncarry" target="_blank" style="color: #8B5CF6; text-decoration: underline;">
                네이버 블로그
              </a>에서 확인하세요.
            </em>
          </p>
        </div>
      `,
      link: 'https://blog.naver.com/amazoncarry',
      contentSource: 'default',
      thumbnailSource: 'fallback'
    },
    {
      id: 'default-2',
      category: '아마존 광고',
      readTime: '4분 읽기',
      title: '아마존 PPC 광고 완전 정복 가이드',
      excerpt: '효과적인 아마존 PPC 광고 운영 방법과 키워드 최적화 전략을 통해 매출을 극대화하는 실전 노하우를 공개합니다.',
      date: '2024년 12월 4일',
      thumbnail: getCategoryThumbnail('아마존 광고', 1),
      htmlContent: `
        <div class="default-content">
          <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #222222;">아마존 PPC 광고 마스터하기</h3>
          <p style="margin-bottom: 16px;">아마존에서 성공하려면 PPC 광고는 필수입니다. 효과적인 광고 운영 전략을 단계별로 설명합니다.</p>
          
          <h4 style="font-size: 16px; font-weight: bold; margin: 20px 0 12px 0; color: #FF6A3D;">스폰서드 프로덕트 광고</h4>
          <p style="margin-bottom: 12px;">• 자동 타겟팅과 수동 타겟팅의 차이점<br/>• 키워드 매치 타입별 활용 전략<br/>• 네가티브 키워드 설정 방법</p>
          
          <h4 style="font-size: 16px; font-weight: bold; margin: 20px 0 12px 0; color: #FF6A3D;">ACOS 최적화 전략</h4>
          <p style="margin-bottom: 12px;">• 목표 ACOS 설정 방법<br/>• 비드 조정 전략<br/>• 성과 분석 및 개선 방안</p>
          
          <div style="background: #fff8f0; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #FF6A3D;">
            <h5 style="color: #FF6A3D; font-weight: bold; margin-bottom: 8px;">📊 실제 성과 예시</h5>
            <p style="margin: 0;">ROAS 400% 달성한 브랜드 사례: 키워드 최적화로 광고비 50% 절감하면서 매출 2배 증가</p>
          </div>
          
          <p style="margin-top: 16px;">
            <em>더 자세한 PPC 광고 전략과 실제 운영 사례는 
              <a href="https://blog.naver.com/amazoncarry" target="_blank" style="color: #8B5CF6; text-decoration: underline;">
                네이버 블로그
              </a>에서 확인하세요.
            </em>
          </p>
        </div>
      `,
      link: 'https://blog.naver.com/amazoncarry',
      contentSource: 'default',
      thumbnailSource: 'fallback'
    },
    {
      id: 'default-3',
      category: '브랜드 전략',
      readTime: '6분 읽기',
      title: '아마존 브랜드 레지스트리 완��� 활용법',
      excerpt: '아마존 브랜드 레지스트리 등록부터 A+ 콘텐츠, 브랜드 스토어 구축까지 브랜드 보호와 성장을 위한 모든 과정을 상세 가이드합니다.',
      date: '2024년 12월 3일',
      thumbnail: getCategoryThumbnail('브랜드 전략', 2),
      htmlContent: `
        <div class="default-content">
          <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #222222;">브랜드 레지스트리로 경쟁 우위 확보하기</h3>
          <p style="margin-bottom: 16px;">아마존에서 브랜드를 보호하고 성장시키는 핵심 도구인 브랜드 레지스트리의 모든 것을 알아보세요.</p>
          
          <h4 style="font-size: 16px; font-weight: bold; margin: 20px 0 12px 0; color: #5A4FCF;">브랜드 레지스트리 등록 프로세스</h4>
          <p style="margin-bottom: 12px;">✅ 상표권 출원 및 등록<br/>✅ 아마존 브랜드 레지스트리 신청<br/>✅ 승인 후 브랜드 보호 기능 활성화</p>
          
          <h4 style="font-size: 16px; font-weight: bold; margin: 20px 0 12px 0; color: #5A4FCF;">A+ 콘텐츠 제작 가이드</h4>
          <p style="margin-bottom: 12px;">• 시각적 스토리텔링으로 전환율 향상<br/>• 모바일 최적화 디자인 원칙<br/>• 검색 키워드 반영 전략</p>
          
          <h4 style="font-size: 16px; font-weight: bold; margin: 20px 0 12px 0; color: #5A4FCF;">브랜드 스토어 구축</h4>
          <p style="margin-bottom: 12px;">• 브랜드 정체성이 드러나는 디자인<br/>• 제품 카테고리별 구성<br/>• 고객 여정 최적화</p>
          
          <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #5A4FCF;">
            <h5 style="color: #5A4FCF; font-weight: bold; margin-bottom: 8px;">🎯 성공 사례</h5>
            <p style="margin: 0;">브랜드 레지스트리 등록 후 매출 150% 증가, 가짜 상품 신고를 통한 브랜드 보호 효과 확인</p>
          </div>
          
          <p style="margin-top: 16px;">
            <em>브랜드 보호와 성장 전략에 대한 더 많은 정보는 
              <a href="https://blog.naver.com/amazoncarry" target="_blank" style="color: #8B5CF6; text-decoration: underline;">
                네이버 블로그
              </a>에서 만나보세요.
            </em>
          </p>
        </div>
      `,
      link: 'https://blog.naver.com/amazoncarry',
      contentSource: 'default',
      thumbnailSource: 'fallback'
    }
  ];

  // 블로그 데이터 가져오기 (강화된 에러 핸들링)
  const fetchBlogPosts = async (retryCount = 0) => {
    const maxRetries = 1; // 네트워크 에러는 재시도 제한
    
    try {
      setLoading(true);

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-89cc3cd0/blog-posts`;
      console.log(`📡 Fetching blog posts from: ${url} (attempt ${retryCount + 1})`);
      
      // 타임아웃을 조정 (네트워크 에러 시 빠른 폴백)
      const timeout = retryCount === 0 ? 15000 : 25000;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(timeout),
        mode: 'cors', // CORS 명시적 설정
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ API Response received:', data);

      if (data.success && data.posts && data.posts.length > 0) {
        // 각 포스트의 썸네일 정보 자세히 로깅
        console.log('📸 Thumbnail analysis:');
        data.posts.forEach((post, index) => {
          console.log(`  Post ${index + 1}: "${post.title.substring(0, 30)}..."`);
          console.log(`    - Thumbnail URL: ${post.thumbnail}`);
          console.log(`    - Thumbnail source: ${post.thumbnailSource}`);
          console.log(`    - Is actual image: ${post.thumbnailSource === 'actual'}`);
        });
        
        setBlogPosts(data.posts);
        setApiStatus('success');
        console.log('✅ Blog posts loaded successfully:', data.posts.length);
        
        // 통계 로그
        if (data.stats) {
          console.log('📊 Blog Statistics:');
          console.log(`   - Total posts: ${data.stats.total}`);
          console.log(`   - Actual thumbnails: ${data.stats.actualThumbnails || 0}`);
          console.log(`   - Fallback thumbnails: ${data.stats.fallbackThumbnails || 0}`);
          console.log(`   - Content source: ${data.source}`);
        }
      } else if (data.success === false) {
        console.log('⚠️ API returned error, using default posts:', data.error);
        setBlogPosts(createDefaultPosts());
        setApiStatus('fallback');
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error(`❌ Error fetching blog posts (attempt ${retryCount + 1}):`, error);
      
      // 에러 타입 분류
      let shouldRetry = false;
      let errorType = 'unknown';
      
      if (error instanceof Error) {
        if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
          errorType = 'timeout';
          shouldRetry = retryCount < maxRetries;
        } else if (error.message.includes('Failed to fetch') || error.message.includes('fetch')) {
          errorType = 'network';
          shouldRetry = false; // 네트워크 에러는 재시도하지 않음
          console.log('🌐 Network error detected - likely CORS or connectivity issue');
        } else if (error.message.includes('HTTP')) {
          errorType = 'http';
          shouldRetry = false; // HTTP 에러도 재시도하지 않음
        }
        
        console.log(`🔍 Error type: ${errorType}, Should retry: ${shouldRetry}`);
        console.log(`📝 Error details: ${error.message}`);
      }
      
      // 재시도 로직 (타임아웃 에러만)
      if (shouldRetry) {
        console.log(`🔄 Retrying in 2 seconds... (${retryCount + 1}/${maxRetries})`);
        
        setTimeout(() => {
          fetchBlogPosts(retryCount + 1);
        }, 2000);
        return; // finally 블록 실행 방지
      }
      
      // 폴백 처리
      console.log('🔄 Using default blog posts due to API error');
      setBlogPosts(createDefaultPosts());
      setApiStatus('fallback');
      
    } finally {
      // 재시도가 아닌 경우에만 로딩 완료
      if (retryCount === 0 || retryCount >= maxRetries) {
        setLoading(false);
      }
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기 (안전한 실행)
  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      // 약간의 지연을 두어 초기 렌더링과 분리
      const timer = setTimeout(() => {
        fetchBlogPosts();
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      // 서버 사이드에서는 기본 포스트 사용
      setBlogPosts(createDefaultPosts());
      setApiStatus('fallback');
      setLoading(false);
    }
  }, []);

  const handleOpenModal = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <>
      {/* CSS styles moved to a separate style tag without jsx attributes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .blog-preview-content {
            line-height: 1.7;
            color: #374151;
            font-size: 16px;
          }
          
          /* 블로그 원본 HTML 스타일링 */
          .blog-preview-content img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin: 24px auto;
            display: block;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .blog-preview-content p {
            margin: 16px 0;
            line-height: 1.7;
          }
          
          .blog-preview-content div {
            margin: 12px 0;
          }
          
          .blog-preview-content h1,
          .blog-preview-content h2,
          .blog-preview-content h3,
          .blog-preview-content h4 {
            color: #111827;
            font-weight: 700;
            margin: 24px 0 12px 0;
            line-height: 1.4;
          }
          
          .blog-preview-content ul,
          .blog-preview-content ol {
            margin: 16px 0;
            padding-left: 24px;
          }
          
          .blog-preview-content li {
            margin: 8px 0;
            line-height: 1.6;
          }
          
          .blog-preview-content blockquote {
            border-left: 4px solid #8B5CF6;
            margin: 24px 0;
            padding: 16px 24px;
            background: #F9FAFB;
            border-radius: 8px;
            font-style: italic;
          }
          
          .blog-preview-content a {
            color: #8B5CF6;
            text-decoration: underline;
          }
          
          .blog-preview-content a:hover {
            color: #7C3AED;
          }
          
          .blog-preview-content strong,
          .blog-preview-content b {
            font-weight: 600;
            color: #111827;
          }
          
          .blog-preview-content em,
          .blog-preview-content i {
            font-style: italic;
          }
          
          /* 네이버 블로그 특정 요소들 스타일링 */
          .blog-preview-content [class*="se-"] {
            margin: 8px 0;
          }
          
          .blog-preview-content span {
            line-height: inherit;
          }
          
          /* 표 스타일링 */
          .blog-preview-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 24px 0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .blog-preview-content th,
          .blog-preview-content td {
            border: 1px solid #E5E7EB;
            padding: 12px;
            text-align: left;
          }
          
          .blog-preview-content th {
            background: #F9FAFB;
            font-weight: 600;
            color: #374151;
          }
          
          /* 코드 스타일링 */
          .blog-preview-content code {
            background: #F3F4F6;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 14px;
          }
          
          .blog-preview-content pre {
            background: #1F2937;
            color: #F9FAFB;
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 24px 0;
          }
          
          .blog-preview-content pre code {
            background: none;
            padding: 0;
            color: inherit;
          }
        `
      }} />

      <section id="blog" className="py-32 sm:py-40 bg-gradient-to-br from-section via-white to-section/30 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-32 left-20 w-32 h-32 bg-accent/8 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        


        <div className="container-max px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-section btn-radius text-primary font-semibold text-sm mb-6 border border-gray-200"
            >
              <ArrowRight className="w-4 h-4 mr-2" strokeWidth={2} />
              전문가 인사이트
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-main mb-4 sm:mb-6">
              <span className="text-primary">
                아마존 성공
              </span><br />
              인사이트
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-sub max-w-4xl mx-auto leading-relaxed">
              아마존캐리 네이버 블로그에서<br />
              <span className="font-semibold text-main">최신 아마존 비즈니스 인사이트를 확인하세요</span>
            </p>
          </motion.div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {loading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <motion.div
                  key={`loading-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="animate-pulse"
                >
                  <Card className="overflow-hidden border border-gray-200 h-full rounded-2xl bg-white">
                    <div className="w-full aspect-video bg-gray-100"></div>
                    <CardContent className="p-4 sm:p-6">
                      <div className="h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-16 bg-gray-200 rounded mb-6"></div>
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                >
                  <Card 
                    className="overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white h-full rounded-2xl group cursor-pointer"
                    onClick={() => {
                      handleOpenModal(post);
                      // 카드 클릭 시 새 탭도 열기
                      window.open(post.link, '_blank');
                    }}
                  >
                    {/* Thumbnail Image - Cheerio로 추출한 실제 이미지 */}
                    <div className="relative w-full aspect-video overflow-hidden">
                      <img
                        src={post.thumbnailSource === 'actual' ? post.thumbnail : getCategoryThumbnail(post.category, getCategoryImageIndex(blogPosts, index))}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          // 이미지 로드 실패 시 카테고리별 폴백 이미지
                          const target = e.target as HTMLImageElement;
                          target.src = getCategoryThumbnail(post.category, getCategoryImageIndex(blogPosts, index));
                        }}
                      />
                      
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white px-3 py-1.5 btn-radius text-sm font-semibold shadow-lg flex items-center gap-1.5">
                          {getCategoryIcon(post.category)}
                          {post.category}
                        </span>
                      </div>

                      {/* Thumbnail type indicator */}
                      <div className="absolute top-4 right-4">
                        {post.thumbnailSource === 'actual' ? (
                          <span className="bg-accent text-primary px-2 py-1 btn-radius text-xs font-medium flex items-center gap-1 shadow-lg">
                            <Image className="w-3 h-3" />
                            실��� 이미지
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                      {/* Content area that expands */}
                      <div className="flex-1 flex flex-col">
                        {/* Title - Fixed height container */}
                        <div className="h-16 sm:h-18 mb-3 flex items-start">
                          <h3 className="text-lg sm:text-xl font-semibold text-main leading-tight line-clamp-3">
                            {post.title}
                          </h3>
                        </div>

                        {/* Excerpt - takes remaining space */}
                        <p className="text-sub text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Fixed bottom section */}
                      <div className="mt-auto">
                        {/* Footer */}
                        <div className="flex items-center mb-3 sm:mb-4">
                          <div className="flex items-center text-sub">
                            <Calendar className="w-4 h-4 mr-2" strokeWidth={2} />
                            <span className="text-xs sm:text-sm">{post.date}</span>
                          </div>
                        </div>

                        {/* Read button */}
                        <motion.button
                          className="w-full flex items-center justify-center gap-2 text-primary hover:text-accent font-semibold text-sm transition-colors duration-200 py-2"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation(); // 이벤트 버블링 방지
                            window.open(post.link, '_blank');
                          }}
                        >
                          원문 보기
                          <ArrowRight className="w-4 h-4" strokeWidth={2} />
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Newsletter Signup */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-primary card-radius p-6 sm:p-8 md:p-12 text-white text-center mb-12 sm:mb-16 relative overflow-hidden"
          >
            <div className="relative">
              <motion.h3 
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                아마존캐리 뉴스레터
              </motion.h3>
              <motion.p 
                className="text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                아마존 비즈니스를 위한 최신 소식과 핵심 인사이트,<br />
                아마존캐리 뉴스레터에서 만나보세요
              </motion.p>
              
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button 
                  className="bg-white text-primary hover:bg-section px-6 sm:px-8 py-3 sm:py-4 font-semibold btn-radius text-base sm:text-lg transition-all duration-300"
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSckuEedYOZvd71GOV1zAiWqxeZyVX2FXHSW30dxmrrON4td-Q/viewform', '_blank')}
                >
                  구독하기
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* All Articles CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-secondary hover:bg-primary hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300"
              onClick={() => window.open('https://amzcarrynewsletter.netlify.app/', '_blank')}
            >
              모든 아티클 보기
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </motion.div>
        </div>
        

      </section>
    </>
  );
}