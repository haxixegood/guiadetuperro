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
    <div className="min-h-screen flex items-center justify-center p-4 pt-16 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full space-y-8"
      >
        {/* Category badge */}
        {category && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              {category}
            </span>
          </motion.div>
        )}
        
        {/* Question */}
        <div className="space-y-3 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold"
          >
            {question}
          </motion.h2>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground"
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
          className="bg-card rounded-3xl p-8 shadow-lg relative"
        >
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder || 'seu@email.com'}
              className="text-lg h-14 pl-12 pr-6 rounded-xl border-2 focus:border-primary"
              autoFocus
            />
          </div>
          
          {/* Email suggestions */}
          {showSuggestions && suggestions.length > 0 && !value.includes('@') && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-8 right-8 top-full mt-2 bg-background rounded-2xl shadow-xl border-2 border-border overflow-hidden z-10"
            >
              {suggestions.slice(0, 5).map((email, index) => (
                <button
                  key={email}
                  onClick={() => handleSelectSuggestion(email)}
                  className="w-full px-6 py-3 text-left hover:bg-primary/10 transition-colors border-b border-border last:border-b-0 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{email}</span>
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
        
        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground"
        >
          Ingresa tu correo para recibir tu plan personalizado
        </motion.p>
        
        {/* Fixed bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4"
        >
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-center justify-between">
            {skipText && (
              <Button
                variant="ghost"
                onClick={() => onAnswer('skip')}
                className="text-accent hover:text-accent/80"
              >
                {skipText}
              </Button>
            )}
            
            <Button
              onClick={handleContinue}
              size="lg"
              className="quiz-button w-full sm:w-auto"
              disabled={!value.trim() || !value.includes('@')}
            >
              Continuar
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
