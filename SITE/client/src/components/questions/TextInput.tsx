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
    <div className="min-h-screen bg-[#FDFDF8] flex flex-col relative overflow-hidden font-sans">

      {/* Top Status Bar Placeholder (Clean Space) */}
      <div className="w-full h-12" />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center px-8 pt-10 z-10 max-w-md mx-auto w-full">

        {/* Back Arrow Placeholder (if needed, or just clean space) */}
        <div className="w-full flex justify-start mb-8 text-gray-300">
          {/* Insert Back Icon here if navigation exists, otherwise empty */}
        </div>

        {/* Question Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center space-y-6 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-[1.4] tracking-tight">
            Para empezar este análisis personalizado,<br />
            ¿cómo se llama tu perrito?
          </h2>
        </motion.div>

        {/* Input Field */}
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
                    w-full h-16 px-6 rounded-full text-lg font-medium text-center
                    bg-white border-2 outline-none transition-all duration-300
                    placeholder:text-gray-300 text-gray-800
                    ${isFocused
                ? 'border-[#FFD700] shadow-[0_4px_20px_rgba(255,215,0,0.15)] ring-0'
                : 'border-gray-100 shadow-sm'
              }
                `}
            autoFocus
          />
        </motion.div>

        {/* Skip Link */}
        {skipText && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={handleSkip}
            className="mt-6 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors border-b border-transparent hover:border-gray-300"
          >
            Prefiero no decir el nombre
          </motion.button>
        )}

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full mt-12"
        >
          <Button
            onClick={handleContinue}
            disabled={!value.trim()}
            className={`
                w-full h-16 rounded-full text-lg font-bold tracking-wide uppercase
                transition-all duration-300 shadow-lg
                ${value.trim()
                ? 'bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFC400] hover:scale-[1.02] hover:shadow-xl'
                : 'bg-[#FFD700]/50 text-[#1A1A1A]/50 cursor-not-allowed'
              }
              `}
          >
            SIGUIENTE
          </Button>
        </motion.div>

      </div>

      {/* Floating Dog Image - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        className="absolute bottom-0 right-[-20px] w-48 md:w-64 z-20 pointer-events-none"
      >
        {/* Using the Golden Retriever happy side image or similar high quality one */}
        <img
          src="/assets/dog-hero.png"
          alt="Golden Retriever"
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Subtle Background Elements (Optional Clean texture) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-[0.02]">
        <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-400 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-[120px]" />
      </div>

    </div>
  );
}
