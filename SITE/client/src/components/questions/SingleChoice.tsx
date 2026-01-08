import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '@/contexts/QuizContext';
import { Check, Dog, Home, Building2, Trees, Siren, AlertTriangle, Calendar, Heart, Timer, HeartHandshake, Baby, Glasses, ShieldCheck, Mountain } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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
    // Auto-advance with slight delay for visual feedback
    setTimeout(() => {
      onAnswer(value);
    }, 450);
  };

  const getIcon = (iconStr?: string, isSelected: boolean = false) => {
    const colorClass = isSelected ? "text-[#FFD700]" : "text-[#1A1A1A]";

    if (!iconStr) return <span className={`text-2xl ${isSelected ? 'grayscale-0' : 'grayscale'}`}>🐾</span>;
    // Age Icons
    if (iconStr === 'age-puppy') return <Baby className={`w-8 h-8 ${colorClass}`} />;
    if (iconStr === 'age-adult') return <Dog className={`w-9 h-9 ${colorClass}`} />;
    if (iconStr === 'age-senior') return <Glasses className={`w-8 h-8 ${colorClass}`} />;

    // Size Icons - VISUAL HIERARCHY
    if (iconStr === 'dog-sm') return <Dog className={`w-5 h-5 ${colorClass}`} />;
    if (iconStr === 'dog-md') return <Dog className={`w-8 h-8 ${colorClass}`} />;
    if (iconStr === 'dog-lg') return <Dog className={`w-11 h-11 ${colorClass}`} />;

    // Environment Icons
    if (iconStr === 'env-apt' || iconStr === 'building') return <Building2 className={`w-8 h-8 ${colorClass}`} />;
    if (iconStr === 'env-house' || iconStr === 'home') return <Home className={`w-8 h-8 ${colorClass}`} />;
    if (iconStr === 'env-land' || iconStr === 'tree') return <Mountain className={`w-8 h-8 ${colorClass}`} />;

    // Urgency Icons
    if (iconStr === 'urgency-critical') return <Siren className={`w-8 h-8 ${colorClass}`} />;
    if (iconStr === 'urgency-high') return <AlertTriangle className={`w-8 h-8 ${colorClass}`} />;
    if (iconStr === 'urgency-moderate') return <Calendar className={`w-8 h-8 ${colorClass}`} />;

    // Goal Icons - Unified Brand Colors
    if (iconStr === 'goal-love') return <Heart className={`w-8 h-8 ${colorClass}`} />;
    if (iconStr === 'goal-speed') return <Timer className={`w-8 h-8 ${colorClass}`} />;
    if (iconStr === 'goal-bond') return <HeartHandshake className={`w-8 h-8 ${colorClass}`} />;

    return iconStr;
  };

  return (
    <div className="w-full h-full flex flex-col items-center font-sans relative">

      {/* Main Content Area - Pushed down from top HUD */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">

        {/* Header Section - Clean & Harmonious */}
        <div className="text-center space-y-3 mb-10 w-full px-4">
          {category && (
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              {category}
            </div>
          )}
          <h2 className="text-3xl font-black text-[#1A1A1A] leading-none tracking-tight">
            {question.replace('{name}', quizData.name || 'tu perro')}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Options Stack - Minimalist */}
        <div className="w-full flex flex-col gap-3 px-4">
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
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleSelect(option.value)}
                className={`
                  relative w-full rounded-[20px] p-5 cursor-pointer transition-all duration-300
                  flex items-center gap-5 text-left group overflow-hidden
                  ${isSelected
                    ? 'bg-[#FFD700] shadow-lg scale-[1.01] z-10'
                    : 'bg-gray-50 hover:bg-gray-100 active:scale-[0.99]'
                  }
                `}
              >
                {/* Icon Container - Simplified */}
                <div className={`
                  w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300
                  ${isSelected ? 'bg-white/90' : 'bg-white shadow-sm'}
                `}>
                  {getIcon(option.icon, isSelected)}
                </div>

                {/* Text Content - Easier on eyes */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-base font-bold leading-tight ${isSelected ? 'text-black' : 'text-gray-900'}`}>
                      {title}
                    </h3>
                  </div>
                  {sub && (
                    <p className={`text-xs font-medium mt-0.5 ${isSelected ? 'text-black/70' : 'text-gray-500'}`}>
                      {sub}
                    </p>
                  )}
                </div>

                {/* Selection Check Circle - Less aggressive */}
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0
                  ${isSelected
                    ? 'border-black bg-black'
                    : 'border-gray-300 bg-transparent'
                  }
                `}>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FFD700] stroke-[3]" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Area - Skip Option */}
      <div className="w-full mt-auto pt-6">
        {skipText && (
          <button
            onClick={() => onAnswer('skip')}
            className="block mx-auto text-[10px] font-bold text-gray-300 hover:text-gray-500 uppercase tracking-widest py-4"
          >
            {skipText}
          </button>
        )}
      </div>
    </div>
  );
}
