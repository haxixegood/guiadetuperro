import { motion } from 'framer-motion';
import { useQuiz } from '@/contexts/QuizContext';
import { useState } from 'react';

interface SingleChoiceProps {
  question: string;
  subtitle?: string;
  options: { label: string; value: string; icon?: string }[];
  onAnswer: (value: string) => void;
  category?: string;
  skipText?: string;
}

export default function SingleChoice({ question, subtitle, options, onAnswer, category, skipText }: SingleChoiceProps) {
  const { quizData } = useQuiz();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    // Auto-advance with 300ms delay for visual feedback
    setTimeout(() => {
      onAnswer(value);
    }, 300);
  };

  const getIconUrl = (iconStr?: string) => {
    if (!iconStr) return null;

    // Mapping icon keys to generated assets
    if (iconStr === 'age-puppy') return '/assets/icon-bowl.png';
    if (iconStr === 'age-adult') return '/assets/icon-collar.png';
    if (iconStr === 'age-senior') return '/assets/icon-bed.png';

    // Size Icons (use same silhouettes for all size steps for now as they represent the scale)
    if (iconStr === 'dog-sm' || iconStr === 'dog-md' || iconStr === 'dog-lg') {
      return '/assets/icon-sizes.png';
    }

    // Default or other assets can be added here
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white font-sans relative">

      {/* 120px top offset for headline */}
      <div className="pt-[120px] w-full px-[20px] flex flex-col items-center">

        {/* Header Section */}
        <div className="w-full text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Montserrat'] font-bold text-[28px] text-[#1A1A1A] leading-tight uppercase"
          >
            {question.replace('{name}', quizData.name || 'tu perro')}
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

        {/* Options Stack: Gap 12px fixo, Horizontal Padding 20px (handled by container) */}
        <div className="mt-[32px] w-full flex flex-col gap-[12px]">
          {options.map((option, idx) => {
            const [title, sub] = option.label.includes(' - ')
              ? option.label.split(' - ')
              : [option.label, null];

            const isSelected = selected === option.value;
            const iconUrl = getIconUrl(option.icon);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleSelect(option.value)}
                className={`
                  relative w-full min-h-[80px] rounded-[16px] p-[20px] cursor-pointer transition-all duration-300
                  flex items-center gap-[16px] text-left overflow-hidden border
                  ${isSelected
                    ? 'bg-[#FFF9E6] border-[#FFCC00] ring-1 ring-[#FFCC00]'
                    : 'bg-white border-[#E0E0E0] hover:border-gray-300'
                  }
                `}
              >
                {/* Icon Container with soft gray circle background */}
                <div className="w-[48px] h-[48px] rounded-full bg-[#F5F5F5] flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt={title}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-200 rounded-full" />
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-['Montserrat'] font-bold text-[16px] text-[#1A1A1A] leading-tight flex items-center gap-1.5 uppercase">
                    {title}
                  </h3>
                  {sub && (
                    <p className="font-['Roboto'] font-normal text-[14px] text-[#888888] mt-0.5">
                      {sub}
                    </p>
                  )}
                </div>

                {/* Radio Circle */}
                <div className={`
                  w-[24px] h-[24px] rounded-full border-[2px] flex items-center justify-center transition-all duration-300 flex-shrink-0
                  ${isSelected
                    ? 'border-[#FFCC00]'
                    : 'border-[#DDDDDD]'
                  }
                `}>
                  {isSelected && (
                    <div className="w-[12px] h-[12px] rounded-full bg-[#FFCC00]" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex-1" />

      {/* Skip Link */}
      {skipText && (
        <div className="pb-8">
          <button
            onClick={() => onAnswer('skip')}
            className="text-[14px] font-['Roboto'] font-medium text-[#999999] underline hover:text-[#1A1A1A] transition-colors"
          >
            {skipText}
          </button>
        </div>
      )}
    </div>
  );
}
