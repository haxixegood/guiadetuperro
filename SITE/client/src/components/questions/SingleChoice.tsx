import { motion } from 'framer-motion';
import { useQuiz } from '@/contexts/QuizContext';
import { Check, Dog, Home, Building2, Trees, Siren, AlertTriangle, Calendar, Heart, Timer, HeartHandshake } from 'lucide-react';

interface SingleChoiceProps {
  question: string;
  subtitle?: string;
  options: { label: string; value: string; icon?: string }[];
  onAnswer: (value: string) => void;
  category?: string;
  skipText?: string;
}

export default function SingleChoice({ question, subtitle, options, onAnswer, category, skipText }: SingleChoiceProps) {
  const { quizData } = useQuiz();

  const getIcon = (iconStr?: string) => {
    if (!iconStr) return '🐾';
    if (iconStr === 'dog-sm') return <Dog className="w-5 h-5 text-[#1A1A1A]" />;
    if (iconStr === 'dog-md') return <Dog className="w-7 h-7 text-[#1A1A1A]" />;
    if (iconStr === 'dog-lg') return <Dog className="w-9 h-9 text-[#1A1A1A]" />;

    // Environment Icons
    if (iconStr === 'building') return <Building2 className="w-7 h-7 text-[#1A1A1A]" />;
    if (iconStr === 'home') return <Home className="w-7 h-7 text-[#1A1A1A]" />;
    if (iconStr === 'tree') return <Trees className="w-7 h-7 text-[#1A1A1A]" />;

    // Urgency Icons (Semantic Colors)
    if (iconStr === 'urgency-critical') return <Siren className="w-7 h-7 text-red-500/80" />;
    if (iconStr === 'urgency-high') return <AlertTriangle className="w-7 h-7 text-orange-500/80" />;
    if (iconStr === 'urgency-moderate') return <Calendar className="w-7 h-7 text-blue-500/80" />;

    // Goal Icons (Emotional Colors)
    if (iconStr === 'goal-love') return <Heart className="w-7 h-7 text-rose-500/80 fill-rose-500/20" />;
    if (iconStr === 'goal-speed') return <Timer className="w-7 h-7 text-amber-500/80" />;
    if (iconStr === 'goal-bond') return <HeartHandshake className="w-7 h-7 text-violet-500/80" />;

    return iconStr;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full flex flex-col font-sans"
    >
      {/* Header Section */}
      <div className="text-center space-y-2 mb-8 md:mb-12">
        {category && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FFD700] mb-2"
          >
            {category} // Sync Protocol
          </motion.div>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight">
          {question}
        </h2>
        {subtitle && (
          <p className="text-sm font-medium text-gray-400 max-w-xs mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Options Stack */}
      <div className="flex-1 flex flex-col gap-4 md:gap-5 w-full max-w-md mx-auto">
        {options.map((option, idx) => {
          // Parse Label for Title - Subtitle structure
          const [title, sub] = option.label.includes(' - ')
            ? option.label.split(' - ')
            : [option.label, null];

          const isSelected = false; // Single choice usually strictly transitions, but if we had state...
          // For single choice, we click and it goes. But if we wanted to show 'selected' state briefly:
          // We can't easily capture 'selected' state here because logic is immediate in parent.
          // However, we can simulate the visual style for hover/active.

          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onAnswer(option.value)}
              className="group relative w-full bg-white rounded-[20px] p-5 text-left shadow-[0_2px_15px_rgba(0,0,0,0.03)] border-2 border-transparent hover:border-[#FFD700]/50 hover:shadow-[0_4px_20px_rgba(255,215,0,0.1)] transition-all duration-300 flex items-center gap-5"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 flex-shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {getIcon(option.icon)}
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-black transition-colors">
                  {title}
                </h3>
                {sub && (
                  <p className="text-sm font-medium text-gray-400 mt-1">
                    {sub}
                  </p>
                )}
              </div>

              {/* Selection Indicator (Empty Circle -> Checkmark on Hover/Active) */}
              <div className="w-6 h-6 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:border-[#FFD700] transition-colors">
                <div className="w-2.5 h-2.5 bg-[#FFD700] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Skip Option */}
      {skipText && (
        <div className="mt-8 text-center">
          <button
            onClick={() => onAnswer('skip')}
            className="text-xs font-semibold text-gray-300 uppercase tracking-widest hover:text-gray-500 transition-colors"
          >
            {skipText}
          </button>
        </div>
      )}
    </motion.div>
  );
}
