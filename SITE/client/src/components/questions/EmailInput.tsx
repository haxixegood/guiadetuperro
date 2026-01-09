import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { Mail } from 'lucide-react';

interface EmailInputProps {
  question: string;
  subtitle?: string;
  category?: string;
  placeholder?: string;
  skipText?: string;
  onAnswer: (value: string) => void;
}

const EMAIL_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com',
  'icloud.com',
  'mail.com',
  'protonmail.com',
  'aol.com',
  'live.com',
  'msn.com',
];

export default function EmailInput({
  question,
  subtitle,
  placeholder,
  skipText,
  onAnswer,
}: EmailInputProps) {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Suggested domains logic
  const { suggestions } = useMemo(() => {
    const parts = value.split('@');
    const local = parts[0];

    if (!local || parts.length > 1) {
      return { suggestions: [] };
    }

    return {
      suggestions: EMAIL_DOMAINS.map(domain => `${local}@${domain}`),
    };
  }, [value]);

  const handleSelectSuggestion = (email: string) => {
    setValue(email);
    setShowSuggestions(false);
  };

  const handleContinue = () => {
    if (value.trim() && value.includes('@') && value.includes('.')) {
      onAnswer(value.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim() && value.includes('@')) {
      handleContinue();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white font-sans relative">

      {/* 120px top offset */}
      <div className="pt-[120px] w-full px-6 flex flex-col items-center">

        {/* Header: Montserrat Bold 24px */}
        <div className="w-full text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Montserrat'] font-bold text-[24px] text-[#1A1A1A] leading-tight uppercase"
          >
            {question}
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

        {/* Email Input Container */}
        <div className="mt-[32px] w-full max-w-sm relative">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="email"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder || 'tu@email.com'}
              className="text-[16px] font-['Montserrat'] h-[56px] pl-12 pr-6 rounded-[12px] border border-[#E0E0E0] focus:border-[#FFCC00] focus:ring-0 bg-white transition-all"
              autoFocus
            />
          </div>

          {/* Email suggestions */}
          {showSuggestions && suggestions.length > 0 && !value.includes('@') && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-[12px] shadow-xl border border-[#E0E0E0] overflow-hidden z-20"
            >
              {suggestions.slice(0, 5).map((email) => (
                <button
                  key={email}
                  onClick={() => handleSelectSuggestion(email)}
                  className="w-full px-4 py-3 text-left hover:bg-[#FFF9E6] transition-colors border-b border-gray-50 last:border-b-0 flex items-center gap-3"
                >
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-['Montserrat'] font-bold text-gray-700 text-sm">{email}</span>
                </button>
              ))}
            </motion.div>
          )}

          <p className="mt-4 text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">
            🔒 Tus datos están 100% seguros
          </p>
        </div>
      </div>

      <div className="flex-1" />

      {/* Bottom Section: Action Button */}
      <div className="w-full max-w-sm px-6 pb-8 pt-6">
        <Button
          onClick={handleContinue}
          disabled={!value.trim() || !value.includes('@')}
          className={`
            w-full h-[56px] rounded-full text-[18px] font-['Montserrat'] font-bold uppercase
            bg-[#FFCC00] text-[#000000] hover:bg-[#F0C000]
            shadow-[0px_4px_10px_rgba(0,0,0,0.1)]
            disabled:opacity-40 disabled:grayscale-[0.5] disabled:cursor-not-allowed
          `}
        >
          VER RESULTADOS
        </Button>

        {skipText && (
          <button
            onClick={() => onAnswer('skip')}
            className="w-full text-center mt-6 text-[14px] font-['Roboto'] font-medium text-[#999999] underline hover:text-[#1A1A1A] py-2 transition-colors uppercase"
          >
            {skipText}
          </button>
        )}
      </div>
    </div>
  );
}
