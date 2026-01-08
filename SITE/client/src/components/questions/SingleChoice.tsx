import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { QuizOption } from '@/types/quiz';
import { Power, Activity } from 'lucide-react';
import { useState } from 'react';

interface SingleChoiceProps {
  question: string;
  options: QuizOption[];
  category?: string;
  onAnswer: (value: string) => void;
  skipText?: string;
}

export default function SingleChoice({
  question,
  options,
  category,
  onAnswer,
  skipText,
}: SingleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setTimeout(() => {
      onAnswer(value);
    }, 400);
  };

  return (
    <div className="w-full space-y-8 md:space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        {category && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className="hud-badge flex items-center gap-2">
              <Activity className="w-3 h-3" />
              {category.toUpperCase()}
            </div>
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-5xl font-black text-white leading-[1] tracking-tighter glow-text uppercase"
        >
          {question}
        </motion.h2>
      </div>

      {/* Options Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 gap-3 md:gap-4"
      >
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, scale: 0.9, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05, ease: "easeOut" }}
            onClick={() => handleSelect(option.value)}
            className={`
              w-full p-6 md:p-8 rounded-sm transition-all duration-300
              flex items-center gap-4 md:gap-6 text-left relative overflow-hidden group
              ${selected === option.value
                ? 'border-neon-cyan bg-neon-cyan/10 shadow-[0_0_30px_rgba(0,242,255,0.2)]'
                : 'border-white/5 bg-white/5 hover:border-neon-cyan/40 hover:bg-white/[0.08]'
              }
              border
            `}
          >
            {/* Scanner Line on Hover */}
            <div className="scanner-line hidden group-hover:block opacity-20" />

            {/* Icon Container */}
            {option.icon && (
              <div className={`
                flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-sm flex items-center justify-center text-3xl md:text-4xl transition-all
                ${selected === option.value ? 'bg-neon-cyan/20 scale-110' : 'bg-white/5'}
              `}>
                {option.icon}
              </div>
            )}

            {/* Label */}
            <div className="flex-1">
              <span className={`text-base md:text-2xl uppercase tracking-tighter transition-all ${selected === option.value ? 'font-black text-neon-cyan' : 'font-bold text-slate-300'}`}>
                {option.label}
              </span>
              {selected === option.value && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  className="h-0.5 bg-neon-cyan mt-1 shadow-[0_0_10px_var(--neon-cyan)]"
                />
              )}
            </div>

            {/* Terminal Status */}
            <div className="hidden md:flex flex-col items-end opacity-20 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] font-mono text-primary">SELECT_ID_{index}</span>
              <span className="text-[8px] font-mono text-primary">READY_FOR_SYNC</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Skip action */}
      {skipText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-4"
        >
          <Button
            variant="ghost"
            onClick={() => onAnswer('skip')}
            className="text-white/20 font-black hover:text-primary transition-colors hover:bg-transparent text-[10px] uppercase tracking-widest"
          >
            {skipText}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
