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
    <div className="w-full h-full flex flex-col items-center bg-white font-sans relative">

      {/* 120px top offset */}
      <div className="pt-[120px] w-full px-6 flex flex-col items-center">

        {/* Header: Montserrat Bold 24px */}
        <div className="w-full text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Montserrat'] font-bold text-[24px] text-[#1A1A1A] leading-tight uppercase"
          >
            {question}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-[12px] font-['Roboto'] font-normal text-[16px] text-[#666666] leading-snug max-w-xs"
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
            className="mt-8 mx-auto w-full max-w-sm aspect-video rounded-[24px] overflow-hidden shadow-sm border border-gray-100"
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
          className="mt-12 space-y-8 w-full max-w-sm px-4"
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

          <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">
            <span>{minLabel}</span>
            <span className="text-4xl font-black text-[#FFCC00] font-['Montserrat']">{value[0]}%</span>
            <span>{maxLabel}</span>
          </div>
        </motion.div>
      </div>

      <div className="flex-1" />

      {/* Bottom Section: Continue Button */}
      <div className="w-full max-w-sm px-6 pb-8 pt-6">
        <Button
          onClick={handleContinue}
          className={`
            w-full h-[56px] rounded-full text-[18px] font-['Montserrat'] font-bold uppercase
            bg-[#FFCC00] text-[#000000] hover:bg-[#F0C000]
            shadow-[0px_4px_10px_rgba(0,0,0,0.1)]
          `}
        >
          CONTINUAR
        </Button>
      </div>
    </div>
  );
}
