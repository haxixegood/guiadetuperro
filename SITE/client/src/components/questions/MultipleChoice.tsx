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
      className="space-y-8"
    >
      <div className="space-y-4 text-center md:text-left">
        {category && (
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            Análisis de Comportamiento // {category}
          </span>
        )}
        <h2 className="text-2xl md:text-4xl font-black leading-tight text-white glow-text-yellow">
          {question}
        </h2>
        {subtitle && <p className="text-sm font-bold text-white/40 italic">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => toggle(option.value)}
            className={`organic-card flex items-center justify-between p-5 text-left transition-all ${selected.includes(option.value)
              ? 'border-primary/40 bg-white/10'
              : 'border-white/5'
              }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                {option.icon || '📍'}
              </div>
              <span className="text-base font-bold text-white/80">{option.label}</span>
            </div>

            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${selected.includes(option.value)
              ? 'bg-primary border-primary'
              : 'border-white/10'
              }`}>
              {selected.includes(option.value) && <Check className="w-4 h-4 text-black" />}
            </div>
          </button>
        ))}
      </div>

      <div className="pt-6 space-y-6">
        <Button
          onClick={() => onAnswer(selected)}
          disabled={selected.length === 0}
          className="yellow-cta w-full py-10 text-xl font-black disabled:opacity-30"
        >
          ¡CONTINUAR PROTOCOLO!
        </Button>

        {skipText && (
          <button
            onClick={() => onAnswer(['skip'])}
            className="w-full text-center text-[10px] font-black text-white/30 uppercase tracking-widest hover:text-white/60"
          >
            {skipText}
          </button>
        )}
      </div>
    </motion.div>
  );
}
