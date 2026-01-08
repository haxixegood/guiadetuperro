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
  category,
  placeholder,
  skipText,
  onAnswer,
}: EmailInputProps) {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Extrair a parte antes do @ e sugerir domínios
  const { localPart, suggestions } = useMemo(() => {
    const parts = value.split('@');
    const local = parts[0];

    if (!local || parts.length > 1) {
      return { localPart: local, suggestions: [] };
    }

    // Mostrar sugestões de domínio
    return {
      localPart: local,
      suggestions: EMAIL_DOMAINS.map(domain => `${local}@${domain}`),
    };
  }, [value]);

  const handleSelectSuggestion = (email: string) => {
    setValue(email);
    setShowSuggestions(false);
  };

  const handleContinue = () => {
    // Validar email básico
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
    <div className="w-full h-full flex flex-col items-center px-6 pt-12 pb-12 font-sans relative z-10">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center w-full max-w-sm space-y-6"
      >
        {/* Header */}
        <div className="space-y-3 text-center w-full">
          {category && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
            >
              {category}
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black leading-none text-[#1A1A1A] tracking-tight uppercase"
          >
            {question}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm font-medium text-gray-500 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Email Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative w-full"
        >
          <div className="relative group">
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#FFD700] transition-colors" />
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
              className="text-lg h-16 pl-14 pr-6 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/10 transition-all shadow-sm"
              autoFocus
            />
          </div>

          {/* Email suggestions */}
          {showSuggestions && suggestions.length > 0 && !value.includes('@') && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20"
            >
              {suggestions.slice(0, 5).map((email) => (
                <button
                  key={email}
                  onClick={() => handleSelectSuggestion(email)}
                  className="w-full px-6 py-3 text-left hover:bg-yellow-50 transition-colors border-b border-gray-50 last:border-b-0 flex items-center gap-3"
                >
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-bold text-gray-700 text-sm">{email}</span>
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Helper text - Cleaned up */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest"
        >
          🔒 Tus datos están 100% seguros
        </motion.p>
      </motion.div>

      {/* Spacer to push button down precisely */}
      <div className="flex-1" />

      {/* Bottom Section: Action Button */}
      <div className="w-full max-w-sm pb-8 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={handleContinue}
            className={`
                w-full h-16 rounded-full text-xl font-black tracking-widest uppercase shadow-lg transition-all duration-300
                bg-[#FFD700] text-black hover:bg-[#F0C000] hover:scale-[1.02] shadow-yellow-400/20 shadow-xl
                disabled:opacity-40 disabled:grayscale-[0.5] disabled:cursor-not-allowed disabled:hover:scale-100
              `}
            disabled={!value.trim() || !value.includes('@')}
          >
            VER RESULTADOS
          </Button>

          {skipText && (
            <button
              onClick={() => onAnswer('skip')}
              className="w-full text-center mt-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-500 py-2"
            >
              {skipText}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
