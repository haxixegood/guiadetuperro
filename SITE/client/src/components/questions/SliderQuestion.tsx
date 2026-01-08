import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

interface SliderQuestionProps {
  question: string;
  subtitle?: string;
  category?: string;
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  illustration?: string;
  onAnswer: (value: number) => void;
}

const illustrations: Record<string, string> = {
  'dog-playing': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
  'dog-table': 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop',
  'dog-happy': 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop',
};

export default function SliderQuestion({
  question,
  subtitle,
  category,
  min = 0,
  max = 100,
  minLabel = 'De jeito nenhum',
  maxLabel = 'Totalmente',
  illustration,
  onAnswer,
}: SliderQuestionProps) {
  const [value, setValue] = useState([50]);

  const handleContinue = () => {
    onAnswer(value[0]);
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

        {/* Illustration */}
        {illustration && illustrations[illustration] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-64 h-48 rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={illustrations[illustration]}
              alt="Ilustração"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Question */}
        <div className="space-y-3 text-center">
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground uppercase tracking-wide"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl font-bold"
          >
            {question}
          </motion.h2>
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-3xl p-8 shadow-lg space-y-8"
        >
          <Slider
            value={value}
            onValueChange={setValue}
            min={min}
            max={max}
            step={1}
            className="w-full"
          />

          {/* Labels */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{minLabel}</span>
            <span className="text-2xl font-bold text-primary">{value[0]}%</span>
            <span className="text-muted-foreground">{maxLabel}</span>
          </div>
        </motion.div>

        {/* Fixed bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4"
        >
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={handleContinue}
              size="lg"
              className="quiz-button w-full"
            >
              Continuar
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
