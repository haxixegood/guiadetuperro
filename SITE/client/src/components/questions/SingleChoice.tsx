import { motion } from 'framer-motion';
import { useQuiz } from '@/contexts/QuizContext';
import { useState } from 'react';
import {
  Dog, Bone, Shield, Moon, Sun, Zap, Megaphone, Cloud, HelpCircle,
  Siren, AlertTriangle, Clock, Heart, Timer, Users, Gift
} from 'lucide-react';

interface SingleChoiceProps {
  question?: string;
  subtitle?: string;
  options: { label: string; value: string; icon?: string }[];
  onAnswer: (value: string) => void;
  category?: string;
  skipText?: string;
}

export default function SingleChoice({ question, subtitle, options, onAnswer, category, skipText }: SingleChoiceProps) {
  const { quizData } = useQuiz();
  const [selected, setSelected] = useState<string | null>(null);

  if (!question) return null;

  const handleSelect = (value: string) => {
    setSelected(value);
    // Auto-advance with 400ms delay for visual feedback
    setTimeout(() => {
      onAnswer(value);
    }, 400);
  };

  const getIcon = (iconStr?: string) => {
    // 3D Asset Loading
    if (iconStr?.startsWith('3d-')) {
      const assetPath = `/assets/${iconStr}.png`;
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={assetPath}
            alt=""
            className="w-20 h-20 object-contain z-10 rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              // The fallback Lucide icon behind it will show up
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {renderFallbackIcon(iconStr)}
          </div>
        </div>
      );
    }

    return <Dog className="w-8 h-8 text-gray-300" />;
  };

  const renderFallbackIcon = (iconStr: string) => {
    const iconMap: Record<string, any> = {
      '3d-age-puppy': { icon: Bone, color: 'text-orange-500' },
      '3d-age-adult': { icon: Dog, color: 'text-emerald-500' },
      '3d-age-senior': { icon: Shield, color: 'text-slate-500' },
      '3d-energy-tranquilo': { icon: Moon, color: 'text-blue-400' },
      '3d-energy-activo': { icon: Sun, color: 'text-orange-400' },
      '3d-energy-hiperactivo': { icon: Zap, color: 'text-red-500' },
      '3d-reaction-megaphone': { icon: Megaphone, color: 'text-red-500' },
      '3d-reaction-cloud': { icon: Cloud, color: 'text-blue-400' },
      '3d-reaction-question': { icon: HelpCircle, color: 'text-yellow-500' },
      '3d-urgency-siren': { icon: Siren, color: 'text-red-600' },
      '3d-urgency-alert': { icon: AlertTriangle, color: 'text-orange-500' },
      '3d-urgency-clock': { icon: Clock, color: 'text-green-500' },
      '3d-goal-heart': { icon: Heart, color: 'text-pink-500' },
      '3d-goal-speed': { icon: Timer, color: 'text-yellow-500' },
      '3d-goal-bond': { icon: Users, color: 'text-purple-500' },
      '3d-revelation-gift': { icon: Gift, color: 'text-yellow-600' }
    };

    const Config = iconMap[iconStr] || { icon: Dog, color: 'text-gray-300' };
    const IconComponent = Config.icon;

    return <IconComponent className={`w-8 h-8 ${Config.color} opacity-80`} />;
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white font-sans relative px-[20px]">

      {/* Header Section: 80px top offset for better hierarchy */}
      <div className="pt-[40px] sm:pt-[80px] w-full flex flex-col items-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-['Montserrat'] font-[900] text-[28px] text-[#1A1A1A] leading-tight text-center uppercase"
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

      {/* Options Stack: Vertical Cards with 12px gap */}
      <div className="w-full flex flex-col gap-[12px] mb-12">
        {options.map((option, idx) => {
          const isSelected = selected === option.value;
          const isCritico = option.value === 'critical';

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileTap={{ scale: 1.05 }}
              onClick={() => handleSelect(option.value)}
              className={`
                relative w-full rounded-[15px] p-[16px] cursor-pointer transition-all duration-300
                flex items-center gap-[16px] text-left border shadow-sm
                ${isSelected
                  ? 'bg-[#E6F4EA] border-[#28a745] border-[2px] shadow-md scale-[1.02]'
                  : 'bg-[#FDFCF9] border-[#E0E0E0] hover:border-gray-300'
                }
                ${isCritico && !isSelected ? 'animate-pulse ring-2 ring-red-500/20' : ''}
              `}
            >
              {/* Pulse Glow for 'Crítico' */}
              {isCritico && !isSelected && (
                <div className="absolute inset-0 rounded-[15px] bg-red-500/5 animate-ping -z-1" />
              )}

              {/* Icon Container: 60x60, subtle bg */}
              <div className="w-[60px] h-[60px] rounded-xl bg-gray-50 flex-shrink-0 flex items-center justify-center p-2">
                {getIcon(option.icon)}
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h3 className="font-['Montserrat'] font-[900] text-[16px] text-[#1A1A1A] leading-none uppercase">
                  {option.label}
                </h3>
              </div>

              {/* Selection Indicator */}
              <div className={`
                w-[22px] h-[22px] rounded-full border-[2px] flex items-center justify-center transition-all
                ${isSelected ? 'bg-[#28a745] border-[#28a745]' : 'border-[#DDDDDD]'}
              `}>
                {isSelected && (
                  <div className="w-[8px] h-[8px] rounded-full bg-white" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Spacer/Skip */}
      <div className="flex-1" />
      {skipText && (
        <div className="pb-12">
          <button
            onClick={() => onAnswer('skip')}
            className="text-[14px] font-['Roboto'] font-bold text-[#999999] underline uppercase tracking-widest"
          >
            {skipText}
          </button>
        </div>
      )}
    </div>
  );
}
