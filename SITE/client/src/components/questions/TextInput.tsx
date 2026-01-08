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
    <div className="w-full h-full flex flex-col items-center px-6 pt-12 pb-12 font-sans relative z-10">

      {/* Top/Middle Section: Header + Input */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm pt-12">

        {/* Header - Optimized Typography */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center space-y-4 mb-10"
        >
          <div className="inline-block bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
            Paso 1: Personalización
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-[0.95] tracking-tight uppercase">
            ¿Cómo se llama<br />tu perrito?
          </h2>
        </motion.div>

        {/* Input Field - High Visibility & Contrast */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full relative group"
        >
          <Input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder || 'Nombre de tu mejor amigo'}
            className={`
                w-full h-16 px-6 rounded-2xl text-xl font-bold text-center
                bg-gray-50 border-2 transition-all duration-300
                text-gray-900 placeholder:text-gray-300
                ${isFocused
                ? 'border-[#FFD700] bg-white ring-4 ring-[#FFD700]/10'
                : 'border-transparent hover:bg-gray-100'
              }
            `}
            autoFocus
          />
        </motion.div>
      </div>

      {/* Spacer to push button down precisely */}
      <div className="flex-1" />

      {/* Bottom Section: Action Button + Skip Link */}
      <div className="w-full max-w-sm space-y-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <Button
            onClick={handleContinue}
            disabled={!value.trim()}
            className={`
                w-full h-16 rounded-full text-xl font-black tracking-widest uppercase
                transition-all duration-300 flex items-center justify-center gap-2
                bg-[#FFD700] text-black hover:bg-[#F0C000] hover:scale-[1.02] shadow-xl shadow-yellow-400/20 cursor-pointer
                disabled:opacity-40 disabled:grayscale-[0.5] disabled:cursor-not-allowed disabled:hover:scale-100
              `}
          >
            CONTINUAR
          </Button>
        </motion.div>

        {/* Skip Link - Better Spacing */}
        {skipText && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleSkip}
            className="w-full text-center text-[10px] font-bold text-gray-300 hover:text-gray-500 transition-colors uppercase tracking-widest py-2"
          >
            Prefiero no decirlo por ahora
          </motion.button>
        )}
      </div>
    </div>
  );
}
