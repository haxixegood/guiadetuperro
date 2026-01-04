import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { QuizOption } from '@/types/quiz';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface MultipleChoiceProps {
  question: string;
  subtitle?: string;
  options: QuizOption[];
  category?: string;
  onAnswer: (values: string[]) => void;
  skipText?: string;
}

export default function MultipleChoice({
  question,
  subtitle,
  options,
  category,
  onAnswer,
  skipText,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string[]>([]);
  
  const toggleOption = (value: string) => {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };
  
  const handleContinue = () => {
    onAnswer(selected);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-16 pb-32">
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
        <div className="space-y-2 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold"
          >
            {question}
          </motion.h2>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        
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
              transition={{ delay: 0.3 + index * 0.08 }}
              onClick={() => toggleOption(option.value)}
              className={`
                w-full p-5 rounded-2xl border-2 transition-all duration-200
                flex items-center gap-4 text-left
                ${
                  selected.includes(option.value)
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
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
              
              {/* Checkbox */}
              <div
                className={`
                  flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center
                  transition-all duration-200
                  ${
                    selected.includes(option.value)
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }
                `}
              >
                {selected.includes(option.value) && (
                  <Check className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Fixed bottom bar with actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4"
        >
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-center justify-between">
            {skipText && (
              <Button
                variant="ghost"
                onClick={() => onAnswer([])}
                className="text-accent hover:text-accent/80"
              >
                {skipText}
              </Button>
            )}
            
            <Button
              onClick={handleContinue}
              size="lg"
              className="quiz-button w-full sm:w-auto"
              disabled={selected.length === 0}
            >
              Continuar
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
