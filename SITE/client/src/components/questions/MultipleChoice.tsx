import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface MultipleChoiceProps {
  question: string;
  subtitle?: string;
  options: { label: string; value: string; icon?: string }[];
  onAnswer: (values: string[]) => void;
  category?: string;
  skipText?: string;
}

export default function MultipleChoice({ question, subtitle, options, onAnswer, category, skipText }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (val: string) => {
    setSelected(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
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

        {/* Options Grid */}
        <div className="mt-[32px] grid grid-cols-1 gap-3 w-full max-w-md px-4">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => toggle(option.value)}
              className={`
                flex items-center justify-between p-5 text-left transition-all duration-300 rounded-[20px] w-full group overflow-hidden border
                ${selected.includes(option.value)
                  ? 'bg-[#FFF9E6] border-[#FFCC00] border-[2px]'
                  : 'bg-white border-[#E0E0E0] hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center text-xl">
                  {option.icon || '🐾'}
                </div>
                <span className={`text-[16px] font-['Montserrat'] font-bold uppercase ${selected.includes(option.value) ? 'text-black' : 'text-[#1A1A1A]'}`}>
                  {option.label}
                </span>
              </div>

              <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                  ${selected.includes(option.value)
                  ? 'bg-black border-black'
                  : 'border-[#DDDDDD] bg-transparent'
                }
                `}>
                {selected.includes(option.value) && <Check className="w-3.5 h-3.5 text-[#FFCC00] stroke-[3]" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Area */}
      <div className="flex-1" />
      <div className="w-full max-w-sm px-6 pb-8 pt-6">
        <Button
          onClick={() => onAnswer(selected)}
          disabled={selected.length === 0}
          className={`
            w-full h-[56px] rounded-full text-[18px] font-['Montserrat'] font-bold uppercase
            bg-[#FFCC00] text-[#000000] hover:bg-[#F0C000]
            shadow-[0px_4px_10px_rgba(0,0,0,0.1)]
            disabled:opacity-40 disabled:grayscale-[0.5] disabled:cursor-not-allowed
          `}
        >
          CONTINUAR
        </Button>

        {skipText && (
          <button
            onClick={() => onAnswer(['skip'])}
            className="w-full text-center mt-6 text-[14px] font-['Roboto'] font-medium text-[#999999] underline hover:text-[#1A1A1A] py-2 transition-colors uppercase"
          >
            {skipText}
          </button>
        )}
      </div>
    </div>
  );
}
