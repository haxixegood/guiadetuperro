import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Scissors, Droplets, Navigation, Volume2, Dog } from 'lucide-react';

interface MultipleChoiceProps {
  question?: string;
  subtitle?: string;
  options: { label: string; value: string; icon?: string }[];
  onAnswer: (values: string[]) => void;
  category?: string;
  skipText?: string;
}

export default function MultipleChoice({ question, subtitle, options, onAnswer, category, skipText }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string[]>([]);

  if (!question) return null;

  const toggle = (val: string) => {
    setSelected(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  const getIcon = (iconStr?: string) => {
    if (iconStr?.startsWith('3d-')) {
      const assetPath = `/assets/${iconStr}.png`;
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={assetPath}
            alt=""
            className="w-full h-full object-contain z-10"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {renderFallbackIcon(iconStr)}
          </div>
        </div>
      );
    }
    return <span className="text-2xl">🐾</span>;
  };

  const renderFallbackIcon = (iconStr: string) => {
    const iconMap: Record<string, any> = {
      '3d-behavior-bite': { icon: Scissors, color: 'text-orange-500' },
      '3d-behavior-pee': { icon: Droplets, color: 'text-blue-400' },
      '3d-behavior-leash': { icon: Navigation, color: 'text-green-500' },
      '3d-behavior-bark': { icon: Volume2, color: 'text-yellow-500' },
    };

    const Config = iconMap[iconStr] || { icon: Dog, color: 'text-gray-300' };
    const IconComponent = Config.icon;

    return <IconComponent className={`w-8 h-8 ${Config.color} opacity-80`} />;
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white font-sans relative px-[20px]">

      {/* Header Section */}
      <div className="pt-[40px] sm:pt-[80px] w-full flex flex-col items-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-['Montserrat'] font-black text-[24px] md:text-[28px] text-[#1A1A1A] leading-tight text-center uppercase"
        >
          {question}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-['Roboto'] font-medium text-[16px] text-[#666666] leading-relaxed text-center max-w-sm"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Options Stack */}
      <div className="w-full flex flex-col gap-[12px] mb-8">
        {options.map((option, idx) => {
          const isSelected = selected.includes(option.value);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileTap={{ scale: 1.05 }}
              onClick={() => toggle(option.value)}
              className={`
                relative w-full rounded-[15px] p-[16px] cursor-pointer transition-all duration-300
                flex items-center gap-[16px] text-left border shadow-sm
                ${isSelected
                  ? 'bg-[#E6F4EA] border-[#28a745] border-[2px] shadow-[0_0_15px_rgba(40,167,69,0.3)]'
                  : 'bg-white border-[#E0E0E0] hover:border-gray-300'
                }
              `}
            >
              <div className="w-[60px] h-[60px] rounded-xl bg-gray-50 flex-shrink-0 flex items-center justify-center p-2">
                {getIcon(option.icon)}
              </div>

              <div className="flex-1">
                <h3 className={`font-['Montserrat'] font-black text-[16px] uppercase ${isSelected ? 'text-[#1A1A1A]' : 'text-[#666666]'}`}>
                  {option.label}
                </h3>
              </div>

              <div className={`
                w-[22px] h-[22px] rounded-full border-[2px] flex items-center justify-center transition-all
                ${isSelected ? 'bg-[#28a745] border-[#28a745]' : 'border-[#DDDDDD]'}
              `}>
                {isSelected && <Check className="w-3 h-3 text-white stroke-[4]" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex-1" />

      {/* Conditional CTA Button */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full pb-12"
        >
          <Button
            onClick={() => onAnswer(selected)}
            className="w-full h-16 rounded-[50px] bg-[#28a745] hover:bg-[#218838] text-white font-['Montserrat'] font-bold text-[18px] uppercase shadow-lg transition-all"
          >
            GENERAR MI DIAGNÓSTICO FINAL →
          </Button>
        </motion.div>
      )}

      {skipText && selected.length === 0 && (
        <div className="pb-12 text-center">
          <button
            onClick={() => onAnswer(['skip'])}
            className="text-[14px] font-['Roboto'] font-bold text-[#999999] underline uppercase tracking-widest"
          >
            {skipText}
          </button>
        </div>
      )}
    </div>
  );
}
