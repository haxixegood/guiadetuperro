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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-full flex flex-col items-center font-sans relative"
    >
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-3 text-center px-4 w-full">
          {category && (
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
              {category}
            </span>
          )}
          <h2 className="text-3xl font-black leading-none text-[#1A1A1A] tracking-tight">
            {question}
          </h2>
          {subtitle && <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-xs mx-auto">{subtitle}</p>}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-3 w-full px-4">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => toggle(option.value)}
              className={`
                flex items-center justify-between p-5 text-left transition-all duration-300 rounded-[20px] w-full group
                ${selected.includes(option.value)
                  ? 'bg-[#FFD700] shadow-lg scale-[1.01] z-10'
                  : 'bg-gray-50 hover:bg-gray-100 active:scale-[0.99]'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all
                    ${selected.includes(option.value) ? 'bg-white/90' : 'bg-white shadow-sm'}
                  `}>
                  {option.icon || '📍'}
                </div>
                <span className={`text-base font-bold ${selected.includes(option.value) ? 'text-black' : 'text-gray-900'}`}>
                  {option.label}
                </span>
              </div>

              <div className={`
                  w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                  ${selected.includes(option.value)
                  ? 'bg-black border-black'
                  : 'border-gray-300 bg-transparent'
                }
                `}>
                {selected.includes(option.value) && <Check className="w-3.5 h-3.5 text-[#FFD700] stroke-[3]" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Area */}
      <div className="flex-1" />
      <div className="w-full max-w-md mx-auto pt-8 space-y-6 pb-8">
        <Button
          onClick={() => onAnswer(selected)}
          disabled={selected.length === 0}
          className={`
            w-full h-16 rounded-full text-xl font-black tracking-widest uppercase shadow-lg
            transition-all duration-300
            bg-[#FFD700] text-black hover:bg-[#F0C000] hover:scale-[1.02] shadow-yellow-400/20
            disabled:opacity-40 disabled:grayscale-[0.5] disabled:cursor-not-allowed disabled:hover:scale-100
          `}
        >
          CONTINUAR
        </Button>

        {skipText && (
          <button
            onClick={() => onAnswer(['skip'])}
            className="w-full text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-500 py-2"
          >
            {skipText}
          </button>
        )}
      </div>
    </motion.div>
  );
}
