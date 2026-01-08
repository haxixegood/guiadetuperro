import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Wifi, Battery } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* HUD Elements (Background) */}
      <div className="absolute top-4 left-4 opacity-20 pointer-events-none text-[8px] font-black uppercase tracking-[0.3em]">
        <div className="flex items-center gap-1"><Wifi className="w-3 h-3" /> SYSTEM_ONLINE</div>
      </div>
      <div className="absolute top-4 right-4 opacity-20 pointer-events-none text-[8px] font-black uppercase tracking-[0.3em]">
        <div className="flex items-center gap-1">BAT_OPTIMIZED <Battery className="w-3 h-3" /></div>
      </div>

      {/* Background Watermark (Dog Paw) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] pointer-events-none opacity-[0.03] z-0">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.22-7.52-3.22V17.5zm7.5-6.78l-7.51 3.22 7.51 3.22V10.72z" />
          {/* Simple Paw representation or abstract shape */}
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10 space-y-10"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h2 className="text-3xl md:text-5xl font-black text-black uppercase leading-[0.9] drop-shadow-[2px_2px_0px_#FFD700]">
            {question}
          </motion.h2>
          {subtitle && <p className="text-sm font-bold text-gray-400">{subtitle}</p>}
        </div>

        {/* Input Area */}
        <div className="relative">
          {/* Dog Peek Animation */}
          <motion.div
            animate={isFocused ? { y: -15, rotate: 5 } : { y: 0, rotate: 0 }}
            className="absolute -top-24 right-0 w-24 md:w-32 z-0 pointer-events-none"
          >
            <img src="/assets/dog-hero.png" alt="Dog Peek" className="w-full drop-shadow-xl" />
          </motion.div>

          <div className="relative z-10">
            <Input
              type={type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder || 'Escribe aquí su nombre...'}
              className={`
                        text-center text-xl font-bold h-16 rounded-full border-2 
                        transition-all duration-300 bg-white placeholder:text-gray-300
                        ${isFocused
                  ? 'border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.3)] scale-105'
                  : 'border-gray-200'
                }
                    `}
              autoFocus
            />
          </div>
        </div>

        {/* Skip Option */}
        {skipText && (
          <div className="text-center">
            <button
              onClick={handleSkip}
              className="text-xs font-bold text-gray-400 border-b border-gray-300 pb-0.5 hover:text-black hover:border-black transition-colors"
            >
              {skipText}
            </button>
          </div>
        )}

        {/* Primary Action */}
        <div className="pt-4">
          <Button
            onClick={handleContinue}
            disabled={!value.trim()}
            className="yellow-cta w-full py-8 text-xl tracking-wide shadow-xl animate-pulse-glow"
          >
            SIGUIENTE
          </Button>
        </div>

      </motion.div>

      {/* Floating HUD Corner Elements */}
      <div className="fixed top-20 right-6 w-2 h-2 bg-primary rounded-full animate-pulse" />
      <div className="fixed bottom-32 left-6 w-2 h-2 bg-black/10 rounded-full" />
    </div>
  );
}
