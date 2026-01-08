import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { Zap, ShieldCheck, Smartphone } from 'lucide-react';

export default function WelcomeScreen() {
  const { goToNextStep } = useQuiz();

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] bg-white relative overflow-hidden font-sans text-gray-900 pb-8 pt-0">

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-50 to-transparent z-0 pointer-events-none" />

      {/* Top Section: Imagery */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center w-full min-h-0 -mt-10"
      >
        <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
          <div className="absolute inset-0 bg-yellow-100/50 rounded-full blur-3xl opacity-60 scale-90" />
          <img
            src="/assets/dog-hero.png"
            alt="Golden Retriever Portrait"
            className="relative w-full h-full object-contain drop-shadow-2xl z-10"
          />
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="relative z-20 w-full max-w-sm text-center space-y-4 mb-4 px-6">

        {/* Animated Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="text-4xl md:text-5xl font-black text-black leading-[0.9] tracking-tight"
        >
          <motion.span variants={letterVariants}>REPRO</motion.span>
          <motion.span variants={letterVariants} className="text-[#FFD700]">GRAMA</motion.span>
          <br />
          <motion.span variants={letterVariants}>SU MENTE</motion.span>
        </motion.h1>

        {/* Value Proposition - Fixed Visibility */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm font-bold text-gray-500 uppercase tracking-widest"
        >
          Método práctico: 15 min al día
        </motion.p>

      </div>

      {/* Call to Action */}
      <div className="relative z-20 w-full max-w-sm space-y-6 px-6">
        <Button
          onClick={goToNextStep}
          className="w-full h-16 rounded-full bg-[#FFD700] hover:bg-[#F0C000] text-black text-base font-black tracking-widest shadow-xl shadow-yellow-400/20 transition-all hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow"
        >
          ¡COMENZAR EVALUACIÓN!
        </Button>

        {/* Footer Info - High Contrast & No Borders */}
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Zap className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" />
          <span>Resultados desde el primer día</span>
        </div>
      </div>

    </div>
  );
}
