import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface TextInputProps {
  question: string;
  subtitle?: string;
  category?: string;
  placeholder?: string;
  skipText?: string;
  type?: 'text' | 'email';
  onAnswer: (value: string) => void;
}

export default function TextInput({
  question,
  subtitle,
  category,
  placeholder,
  skipText,
  type = 'text',
  onAnswer,
}: TextInputProps) {
  const [value, setValue] = useState('');
  
  const handleContinue = () => {
    if (value.trim()) {
      onAnswer(value.trim());
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      handleContinue();
    }
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
        <div className="space-y-3 text-center">
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
              className="text-lg text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        
        {/* Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl p-8 shadow-lg"
        >
          <Input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="text-lg h-14 px-6 rounded-xl border-2 focus:border-primary"
            autoFocus
          />
        </motion.div>
        
        {/* Fixed bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4"
        >
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-center justify-between">
            {skipText && (
              <Button
                variant="ghost"
                onClick={() => onAnswer('skip')}
                className="text-accent hover:text-accent/80"
              >
                {skipText}
              </Button>
            )}
            
            <Button
              onClick={handleContinue}
              size="lg"
              className="quiz-button w-full sm:w-auto"
              disabled={!value.trim()}
            >
              Continuar
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
