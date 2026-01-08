import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';

export default function WelcomeScreen() {
  const { goToNextStep } = useQuiz();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white px-6 py-10 relative overflow-hidden font-sans text-gray-900">

      {/* Background Ambience (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-50 to-transparent z-0 pointer-events-none" />

      {/* Top Section: Imagery */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full flex-1 flex flex-col items-center justify-center mt-4"
      >
        {/* Main Dog Portrait */}
        <div className="relative w-64 md:w-80 aspect-square rounded-full flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-yellow-50 rounded-full blur-3xl opacity-60 scale-110" />
          <img
            src="/assets/dog-hero.png"
            alt="Golden Retriever Portrait"
            className="relative w-full h-full object-contain drop-shadow-2xl z-10"
          />
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="relative z-20 w-full max-w-sm text-center space-y-2 mb-12">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-black text-black leading-none tracking-tight"
        >
          REPRO<span className="text-[#FFD700]">GRAMA</span><br />
          SU MENTE
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "40px" }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="h-1 bg-[#FFD700] mx-auto rounded-full my-4"
        />

        {/* Value Proposition */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm md:text-base font-medium text-gray-400 uppercase tracking-widest"
        >
          Método práctico: 15 min al día en tu celular
        </motion.p>

      </div>

      {/* Call to Action */}
      <div className="relative z-20 w-full max-w-sm mb-4 space-y-6">
        <Button
          onClick={goToNextStep}
          className="w-full h-16 rounded-full bg-[#FFD700] hover:bg-[#FFC400] text-black text-lg font-bold shadow-xl shadow-yellow-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          ¡COMENZAR EVALUACIÓN!
        </Button>

        {/* Trust Indicators (Minimal) */}
        <div className="flex justify-center gap-8 opacity-30 grayscale items-center">
          {/* Simple geometric icons representing trust/speed */}
          <div className="w-4 h-6 border-2 border-black rounded-sm" />
          <div className="w-4 h-6 border-black relative"><span className="absolute inset-0 flex items-center justify-center font-bold text-xs">⚡</span></div>
          <div className="w-5 h-5 border-2 border-black rounded-full grid place-items-center text-[10px]">✨</div>
        </div>
      </div>

    </div>
  );
}
