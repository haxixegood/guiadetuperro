import { motion } from 'framer-motion';
import { useQuiz } from '@/contexts/QuizContext';
import { useState } from 'react';
import {
  Building2,
  Home,
  Mountain,
  Siren,
  AlertTriangle,
  Calendar,
  Heart,
  Timer,
  HeartHandshake,
  Dog
} from 'lucide-react';

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

  const getIcon = (iconStr?: string, isSelected: boolean = false) => {
    if (!iconStr) return <Dog className="w-8 h-8 text-[#333333]" strokeWidth={2} />;

    // Dog Silhouette Scaling Logic (Premium 4px Style - using same asset)
    const silhouetteUrl = '/assets/icon-silhouette-puppy.png'; // Reusing the best silhouette asset

    if (iconStr.startsWith('age-') || iconStr.startsWith('dog-')) {
      let scale = 1.1; // Base internal scale for 72x72 container

      // Adjusting scales to feel more natural and centered
      if (iconStr === 'dog-sm') scale = 0.7;
      if (iconStr === 'dog-md') scale = 1.0;
      if (iconStr === 'dog-lg') scale = 1.3;

      if (iconStr === 'age-puppy') scale = 0.8;
      if (iconStr === 'age-adult') scale = 1.1;
      if (iconStr === 'age-senior') scale = 1.1;

      return (
        <div className="w-full h-full flex items-center justify-center p-1">
          <img
            src={silhouetteUrl}
            className="max-w-full max-h-full object-contain transform transition-transform duration-300"
            style={{ transform: `scale(${scale})` }}
            alt="perro"
          />
        </div>
      );
    }

    // Restore Lucide Icons for other categories
    const iconProps = {
      className: `w-8 h-8 transition-all duration-300 ${isSelected ? 'text-black' : 'text-[#333333]'}`,
      strokeWidth: 2
    };

    // Environment
    if (iconStr === 'env-apt' || iconStr === 'building') return <Building2 {...iconProps} />;
    if (iconStr === 'env-house' || iconStr === 'home') return <Home {...iconProps} />;
    if (iconStr === 'env-land' || iconStr === 'tree') return <Mountain {...iconProps} />;

    // Urgency
    if (iconStr === 'urgency-critical') return <Siren {...iconProps} />;
    if (iconStr === 'urgency-high') return <AlertTriangle {...iconProps} />;
    if (iconStr === 'urgency-moderate') return <Calendar {...iconProps} />;

    // Goals
    if (iconStr === 'goal-love') return <Heart {...iconProps} />;
    if (iconStr === 'goal-speed') return <Timer {...iconProps} />;
    if (iconStr === 'goal-bond') return <HeartHandshake {...iconProps} />;

    return <Dog {...iconProps} />;
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

        {/* Options Stack: Gap 12px fixo, Horizontal Padding 20px via container */}
        <div className="mt-[32px] w-full flex flex-col gap-[12px]">
          {options.map((option, idx) => {
            const [title, sub] = option.label.includes(' - ')
              ? option.label.split(' - ')
              : [option.label, null];

            const isSelected = selected === option.value;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleSelect(option.value)}
                className={`
                  relative w-full rounded-[16px] px-[16px] py-[12px] cursor-pointer transition-all duration-300
                  flex items-center gap-[20px] text-left overflow-hidden border
                  ${isSelected
                    ? 'bg-[#FFF9E6] border-[#FFCC00] border-[2px]'
                    : 'bg-white border-[#E0E0E0] hover:border-gray-300'
                  }
                `}
              >
                {/* Icon Container: 72x72 Circle, #F5F5F5 */}
                <div className="w-[72px] h-[72px] rounded-full bg-[#F5F5F5] flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                  {getIcon(option.icon, isSelected)}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-['Montserrat'] font-bold text-[18px] text-[#1A1A1A] leading-tight uppercase">
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
