import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { QuizOption } from '@/types/quiz';
import { Check, Activity, Zap } from 'lucide-react';
import { useState } from 'react';

interface MultipleChoiceProps {
  question: string;
  subtitle?: string;
  options: QuizOption[];
  category?: string;
  onAnswer: (values: string[]) => void;
  skipText?: string;
}

export default function MultipleChoice({
  question,
  subtitle,
  options,
  category,
  onAnswer,
  skipText,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleContinue = () => {
    onAnswer(selected);
  };

  return (
    <div className="w-full space-y-8 md:space-y-12 pb-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full space-y-8"
      >
        {/* HUD HEADER */}
        <div className="text-center space-y-4">
          {category && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center"
            >
              <div className="hud-badge flex items-center gap-2">
                <Activity className="w-3 h-3 text-neon-purple" />
                {category.toUpperCase()}
              </div>
            </motion.div>
          )}

          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl md:text-5xl font-black text-white glow-text uppercase tracking-tighter"
            >
              {question}
            </motion.h2>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-400 font-bold text-sm md:text-lg"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>

        {/* MULTIPLE HUD OPTIONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-3 md:gap-4"
        >
          {options.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => toggleOption(option.value)}
              className={`
                w-full p-6 md:p-8 rounded-sm border transition-all duration-300
                flex items-center gap-4 text-left relative overflow-hidden group
                ${selected.includes(option.value)
                  ? 'border-neon-cyan bg-neon-cyan/10 shadow-[0_0_20px_rgba(0,242,255,0.1)]'
                  : 'border-white/5 bg-white/5 hover:border-white/20'
                }
              `}
            >
              <div className="scanner-line hidden group-hover:block opacity-10" />

              {/* Icon */}
              {option.icon && (
                <div className={`
                  flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-sm flex items-center justify-center text-2xl md:text-3xl transition-all
                  ${selected.includes(option.value) ? 'bg-neon-cyan/20 scale-110' : 'bg-white/5'}
                `}>
                  {option.icon}
                </div>
              )}

              {/* Label */}
              <span className={`flex-1 text-base md:text-2xl font-black uppercase tracking-tight transition-all ${selected.includes(option.value) ? 'text-neon-cyan' : 'text-slate-400'}`}>
                {option.label}
              </span>

              {/* CYBER CHECKBOX */}
              <div
                className={`
                  flex-shrink-0 w-8 h-8 rounded-sm border-2 flex items-center justify-center
                  transition-all duration-300
                  ${selected.includes(option.value)
                    ? 'border-neon-cyan bg-neon-cyan shadow-[0_0_15px_var(--neon-cyan)]'
                    : 'border-white/10 bg-transparent'
                  }
                `}
              >
                {selected.includes(option.value) && (
                  <Check className="w-5 h-5 text-black stroke-[4]" />
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* HUD ACTIONS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-6 bg-cyber-onyx/90 backdrop-blur-xl border-t border-white/5"
        >
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-6">
            <div className="hidden md:flex flex-col opacity-30">
              <span className="text-[8px] font-mono text-white">SYSTEM_ID: MULTI_DRIVE</span>
              <span className="text-[8px] font-mono text-white">STATUS: WAITING_INPUT</span>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4 items-center justify-end">
              {skipText && (
                <Button
                  variant="ghost"
                  onClick={() => onAnswer([])}
                  className="text-white/20 font-black hover:text-white transition-colors"
                >
                  {skipText.toUpperCase()}
                </Button>
              )}

              <Button
                onClick={handleContinue}
                disabled={selected.length === 0}
                className="action-btn w-full md:w-auto px-12 py-8 text-xl font-black flex items-center gap-3 disabled:opacity-20 disabled:grayscale"
              >
                <Zap className="w-5 h-5" /> CONTINUAR SYNC
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
