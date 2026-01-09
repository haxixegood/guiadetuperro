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
    <div className="fixed top-0 left-0 right-0 h-[6px] z-[50] bg-[#F0F0F0]">
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: `${progress}%`,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full bg-[#FFCC00]"
      />
    </div>
  );
}
