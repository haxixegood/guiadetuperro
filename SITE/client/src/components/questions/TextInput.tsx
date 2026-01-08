import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface TextInputProps {
  question: string;
  subtitle?: string;
  category?: string;
  placeholder?: string;
  skipText?: string;
  type?: 'text' | 'email';
  onAnswer: (value: string) => void;
}

export default function TextInput({
  question,
  subtitle,
  category,
  placeholder,
  skipText,
  type = 'text',
  onAnswer,
}: TextInputProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleContinue = () => {
    if (value.trim()) {
      onAnswer(value.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      handleContinue();
    }
  };

  const handleSkip = () => {
    onAnswer('skip');
  };

  return (
    <div className="w-full relative font-sans flex flex-col items-center">

      {/* Dog Image - Peeking from Top Right (Non-intrusive) */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute -top-12 -right-6 w-24 md:w-32 z-0 opacity-90 pointer-events-none transform rotate-12"
      >
        <img
          src="/assets/dog-hero.png"
          alt="Happy Dog"
          className="w-full h-auto drop-shadow-lg"
        />
      </motion.div>

      {/* Discrete Progress Bar */}
      <div className="w-full max-w-md mb-8 space-y-1">
        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          <span>Progreso</span>
          <span>10%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "10%" }}
            className="h-full bg-[#FFD700] rounded-full"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center w-full max-w-sm z-10 relative">

        {/* Header - Optimized Typography */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center space-y-3 mb-8"
        >
          <div className="inline-block bg-yellow-50 text-[#B8860B] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#FFD700]/20 mb-2">
            Paso 1: Personalización
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight tracking-tight">
            Para empezar,<br />
            ¿cómo se llama tu perrito?
          </h2>
        </motion.div>

        {/* Input Field - High Visibility & Contrast */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full relative group mb-2"
        >
          <Input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder || 'Escribe su nombre aquí...'}
            className={`
                w-full h-16 px-6 rounded-2xl text-lg font-bold text-center
                bg-white border transition-all duration-300
                text-gray-900 placeholder:text-gray-400
                ${isFocused
                ? 'border-[#FFD700] shadow-[0_8px_30px_rgba(255,215,0,0.2)] ring-2 ring-[#FFD700]/20'
                : 'border-gray-300 shadow-sm hover:border-gray-400'
              }
            `}
            autoFocus
          />
        </motion.div>

        {/* Action Button - High Contrast */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-8"
        >
          <Button
            onClick={handleContinue}
            disabled={!value.trim()}
            className={`
                w-full h-16 rounded-full text-xl font-black tracking-wide uppercase
                transition-all duration-300 shadow-lg flex items-center justify-center gap-2
                ${value.trim()
                ? 'bg-[#FFD700] text-black hover:bg-[#F0C000] hover:scale-[1.02] hover:shadow-xl cursor-pointer'
                : 'bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed'
              }
              `}
          >
            {value.trim() ? '¡VAMOS!' : 'ESCRIBE SU NOMBRE'}
          </Button>
        </motion.div>

        {/* Skip Link - Better Spacing */}
        {skipText && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleSkip}
            className="mt-8 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-wider py-2"
          >
            Prefiero no decirlo por ahora
          </motion.button>
        )}

      </div>
    </div>
  );
}
