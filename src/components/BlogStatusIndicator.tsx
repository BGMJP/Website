import { motion } from "motion/react";
import { ExternalLink, Wifi, WifiOff, AlertCircle } from "lucide-react";

interface BlogStatusIndicatorProps {
  apiStatus: 'loading' | 'success' | 'fallback';
  loading: boolean;
}

export function BlogStatusIndicator({ apiStatus, loading }: BlogStatusIndicatorProps) {
  if (loading && apiStatus === 'loading') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700">
          <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          최신 블로그 글을 불러오는 중...
        </div>
      </motion.div>
    );
  }

  if (apiStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-full text-sm text-green-700">
          <Wifi className="w-3 h-3" />
          네이버 블로그 최신 글 로드 완료
        </div>
      </motion.div>
    );
  }

  if (apiStatus === 'fallback') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm text-amber-700">
          <AlertCircle className="w-3 h-3" />
          전문 콘텐츠로 대체 표시 중
        </div>
      </motion.div>
    );
  }

  return null;
}