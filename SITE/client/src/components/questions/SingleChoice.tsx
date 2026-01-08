import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { QuizOption } from '@/types/quiz';
import { Check } from 'lucide-react';
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
    // Pequeno delay para mostrar a seleção antes de avançar
    setTimeout(() => {
      onAnswer(value);
    }, 400);
  };

  return (
    <div className="w-full space-y-6 md:space-y-10">
      {/* Header Section */}
      <div className="text-center space-y-3 md:space-y-4">
        {category && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] text-primary uppercase bg-primary/10 px-4 py-1 rounded-full border border-primary/20">
              {category}
            </span>
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight px-2"
        >
          {question}
        </motion.h2>
      </div>

      {/* Options Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 gap-2 md:gap-4"
      >
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            onClick={() => handleSelect(option.value)}
            className={`
              w-full p-4 md:p-6 rounded-2xl md:rounded-[2rem] border-2 transition-all duration-300
              flex items-center gap-3 md:gap-5 text-left relative overflow-hidden group
              ${selected === option.value
                ? 'border-primary bg-primary/5 shadow-xl scale-[1.02] z-10'
                : 'border-slate-100 bg-white hover:border-primary/30 hover:shadow-lg hover:bg-slate-50'
              }
            `}
          >
            {/* Icon Container */}
            {option.icon && (
              <div className={`
                flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl transition-colors
                ${selected === option.value ? 'bg-primary/20' : 'bg-slate-50'}
              `}>
                {option.icon}
              </div>
            )}

            {/* Label */}
            <div className="flex-1">
              <span className={`text-sm md:text-lg transition-all ${selected === option.value ? 'font-black text-primary' : 'font-bold text-slate-700'}`}>
                {option.label}
              </span>
              {selected === option.value && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[8px] md:text-[10px] font-black text-primary/60 uppercase tracking-widest mt-0.5"
                >
                  Seleccionado ✓
                </motion.p>
              )}
            </div>

            {/* Organic highlight */}
            {selected === option.value && (
              <motion.div
                layoutId="active-bg"
                className="absolute inset-0 bg-primary/5 -z-10"
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Skip action */}
      {skipText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-2 md:pt-4"
        >
          <Button
            variant="ghost"
            onClick={() => onAnswer('skip')}
            className="text-slate-400 font-bold hover:text-primary transition-colors hover:bg-transparent text-xs"
          >
            {skipText}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
