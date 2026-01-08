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
    <div className="w-full flex flex-col items-center font-sans relative">

      {/* Top Progress Bar - High Visibility */}
      <div className="w-full max-w-md mb-8 space-y-2">
        <div className="flex justify-between items-end px-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Tu protocolo personalizado
          </span>
          <span className="text-xs font-black text-[#FFD700]">90%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: "75%" }}
            animate={{ width: "90%" }}
            className="h-full bg-[#FFD700] rounded-full shadow-[0_0_10px_#FFD700]"
          />
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center space-y-4 mb-8 w-full max-w-sm mx-auto">
        {category && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block bg-yellow-100 text-yellow-800 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-yellow-200 mb-1"
          >
            {category}
          </motion.div>
        )}
        <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] leading-tight tracking-tight px-2">
          {question.replace('{name}', quizData.name || 'tu perro')}
        </h2>
        {subtitle && (
          <p className="text-sm font-bold text-gray-400 leading-snug px-6">
            {subtitle}
          </p>
        )}
      </div>

      {/* Options Stack */}
      <div className="w-full max-w-md flex flex-col gap-5 mb-8">
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
                relative w-full rounded-3xl p-6 cursor-pointer transition-all duration-300
                flex items-center gap-6 text-left group
                ${isSelected
                  ? 'bg-white border-[3px] border-[#FFD700] shadow-[0_12px_40px_rgba(255,215,0,0.15)] scale-[1.02] z-10'
                  : 'bg-white border-2 border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-gray-100 hover:shadow-lg hover:-translate-y-1'
                }
              `}
            >
              {/* Icon Container */}
              <div className={`
                w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300
                ${isSelected ? 'bg-yellow-100/50 rotate-3' : 'bg-gray-50 group-hover:bg-gray-100 group-hover:scale-110'}
              `}>
                {getIcon(option.icon, isSelected)}
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className={`text-lg font-black transition-colors ${isSelected ? 'text-black' : 'text-[#1A1A1A]'}`}>
                    {title}
                  </h3>
                  {isSelected && <ShieldCheck className="w-4 h-4 text-[#FFD700] fill-white" />}
                </div>
                {sub && (
                  <p className="text-xs font-semibold text-gray-400">
                    {sub}
                  </p>
                )}
              </div>

              {/* Selection Check Circle */}
              <div className={`
                w-7 h-7 rounded-full border-[3px] flex items-center justify-center transition-all duration-300
                ${isSelected
                  ? 'border-[#FFD700] bg-[#FFD700] scale-110'
                  : 'border-gray-200 bg-transparent group-hover:border-gray-300'
                }
              `}>
                {isSelected && <Check className="w-4 h-4 text-white stroke-[4]" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Skip Option */}
      {skipText && (
        <button
          onClick={() => onAnswer('skip')}
          className="block mx-auto text-[10px] font-bold text-gray-300 hover:text-gray-500 uppercase tracking-widest border-b border-transparent hover:border-gray-300 transition-all pb-0.5"
        >
          {skipText}
        </button>
      )}

    </div>
  );
}
