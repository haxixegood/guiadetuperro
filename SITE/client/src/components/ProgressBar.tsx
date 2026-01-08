import { useQuiz } from '@/contexts/QuizContext';
import { motion } from 'framer-motion';
import { Power } from 'lucide-react';

export default function ProgressBar() {
  const { progress } = useQuiz();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] p-4 md:px-8 bg-cyber-onyx/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <Power className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em]">SYNC_HUD</span>
        </div>

        <div className="flex-1 neural-progress">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "circOut" }}
            className="neural-fill"
          />
        </div>

        <div className="min-w-[80px] text-right">
          <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest tabular-nums">
            {Math.round(progress)}% <span className="text-primary italic">SYNC</span>
          </span>
        </div>
      </div>
    </div>
  );
}
