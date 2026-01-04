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
    }, 300);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full space-y-8"
      >
        {/* Category badge */}
        {category && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              {category}
            </span>
          </motion.div>
        )}
        
        {/* Question */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          {question}
        </motion.h2>
        
        {/* Options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {options.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full p-5 rounded-2xl border-2 transition-all duration-200
                flex items-center gap-4 text-left
                ${
                  selected === option.value
                    ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }
              `}
            >
              {/* Icon */}
              {option.icon && (
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                  {option.icon}
                </div>
              )}
              
              {/* Label */}
              <span className="flex-1 font-medium text-lg">
                {option.label}
              </span>
              
              {/* Check mark */}
              {selected === option.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Skip button */}
        {skipText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Button
              variant="ghost"
              onClick={() => onAnswer('skip')}
              className="text-accent hover:text-accent/80"
            >
              {skipText}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
