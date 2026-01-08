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
    <div className="w-full h-full flex flex-col items-center px-6 pt-12 pb-12 font-sans relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center w-full max-w-sm space-y-6"
      >
        {/* Header */}
        <div className="space-y-3 text-center w-full">
          {category && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
            >
              {category}
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black leading-none text-[#1A1A1A] tracking-tight uppercase"
          >
            {question}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium text-gray-500 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Illustration */}
        {illustration && illustrations[illustration] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-full aspect-video rounded-[24px] overflow-hidden shadow-sm"
          >
            <img
              src={illustrations[illustration]}
              alt="Ilustração"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-8 pt-4 w-full"
        >
          <div className="px-2">
            <Slider
              value={value}
              onValueChange={setValue}
              min={min}
              max={max}
              step={1}
              className="w-full cursor-pointer py-4"
            />
          </div>

          <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wide px-2">
            <span>{minLabel}</span>
            <span className="text-3xl font-black text-[#FFD700]">{value[0]}%</span>
            <span>{maxLabel}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Spacer to push button down */}
      <div className="flex-1" />

      {/* Bottom Section: Continue Button */}
      <div className="w-full max-w-sm pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <Button
            onClick={handleContinue}
            className="w-full h-16 rounded-full text-xl font-black tracking-widest uppercase bg-[#FFD700] text-black hover:bg-[#F0C000] shadow-xl shadow-yellow-400/20 transition-all hover:scale-[1.02]"
          >
            CONTINUAR
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
