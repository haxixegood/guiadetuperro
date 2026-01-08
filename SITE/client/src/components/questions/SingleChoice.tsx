import { motion } from 'framer-motion';
import { useQuiz } from '@/contexts/QuizContext';

interface SingleChoiceProps {
  question: string;
  options: { label: string; value: string; icon?: string }[];
  onAnswer: (value: string) => void;
  category?: string;
  skipText?: string;
}

export default function SingleChoice({ question, options, onAnswer, category, skipText }: SingleChoiceProps) {
  const { quizData } = useQuiz();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-10"
    >
      <div className="space-y-4 text-center md:text-left">
        {category && (
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            {category} // Sync Protocol
          </span>
        )}
        <h2 className="text-2xl md:text-4xl font-black leading-tight text-black glow-text-yellow">
          {question}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onAnswer(option.value)}
            className="organic-card group flex items-center justify-between p-5 text-left hover:border-primary/40 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform text-black drop-shadow-sm filter brightness-100">
                {option.icon || '🐾'}
              </div>
              <span className="text-lg font-bold text-gray-600 group-hover:text-black transition-colors">
                {option.label}
              </span>
            </div>

            <div className="w-6 h-6 rounded-full border-2 border-black/10 flex items-center justify-center group-hover:border-primary transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.button>
        ))}
      </div>

      {skipText && (
        <button
          onClick={() => onAnswer('skip')}
          className="w-full text-center text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
        >
          {skipText}
        </button>
      )}
    </motion.div>
  );
}
