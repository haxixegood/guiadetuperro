import { useQuiz } from '@/contexts/QuizContext';
import { motion } from 'framer-motion';

export default function ProgressBar() {
  const { progress } = useQuiz();

  // Dynamic color: interpolate from white (#FFFFFF) to Cyber Yellow (#FFEA00)
  const getDynamicColor = () => {
    if (progress < 40) return '#FFFFFF';
    if (progress < 80) return '#FFF570';
    return '#FFEA00';
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[200] bg-white/5">
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: `${progress}%`,
          backgroundColor: getDynamicColor(),
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full shadow-[0_0_15px_rgba(255,234,0,0.3)]"
      />
      <div className="absolute top-4 right-6 text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">
        {Math.round(progress)}% <span className="text-primary">Sync</span>
      </div>
    </div>
  );
}
