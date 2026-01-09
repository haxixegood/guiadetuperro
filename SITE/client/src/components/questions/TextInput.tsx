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
    <div className="w-full h-full flex flex-col items-center bg-white font-sans relative">

      {/* 120px from top to Headline */}
      <div className="pt-[120px] w-full px-6 flex flex-col items-center">

        {/* Headline: Montserrat Bold, 28px, #1A1A1A */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center font-['Montserrat'] font-bold text-[28px] text-[#1A1A1A] leading-tight uppercase"
        >
          {question}
        </motion.h2>

        {/* Espaçamento entre Headline e Input: 32px */}
        <div className="mt-[32px] w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full"
          >
            <Input
              type={type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder || 'Nombre de tu perrito...'}
              className={`
                w-full h-[56px] px-[18px] rounded-[12px] text-[16px] font-['Montserrat'] font-medium
                bg-[#FFFFFF] border transition-all duration-300
                text-[#1A1A1A] placeholder:text-[#888888]
                ${isFocused
                  ? 'border-[#FFCC00] ring-1 ring-[#FFCC00]'
                  : 'border-[#DDDDDD]'
                }
              `}
              autoFocus
            />
          </motion.div>
        </div>

        {/* Espaçamento entre Input e Botão: 16px */}
        <div className="mt-[16px] w-full max-w-sm">
          <Button
            onClick={handleContinue}
            disabled={!value.trim()}
            className={`
              w-full h-[56px] rounded-full text-[18px] font-['Montserrat'] font-bold uppercase
              bg-[#FFCC00] text-[#000000] hover:bg-[#F0C000]
              shadow-[0px_4px_10px_rgba(0,0,0,0.1)]
              disabled:opacity-40 disabled:grayscale-[0.5] disabled:cursor-not-allowed
            `}
          >
            CONTINUAR
          </Button>
        </div>

        {/* Opção de Pular: 24px abaixo do botão, 14px, #999999, sublinhado */}
        {skipText && (
          <button
            onClick={handleSkip}
            className="mt-[24px] text-[14px] font-medium text-[#999999] hover:text-[#1A1A1A] underline transition-colors"
          >
            {skipText}
          </button>
        )}
      </div>

    </div>
  );
}
