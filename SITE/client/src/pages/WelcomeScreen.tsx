import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { useEffect } from 'react';
import { trackWelcomeView } from '@/lib/tracking';

export default function WelcomeScreen() {
  const { goToNextStep } = useQuiz();

  // Track welcome screen view
  useEffect(() => {
    trackWelcomeView();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-[100dvh] bg-[#FDFCF9] relative overflow-hidden font-sans text-[#1A1A1A] px-[20px] py-10">

      {/* Top: Centralized Dog Image (Contact Visual) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-[32vh] flex items-center justify-center relative z-10"
      >
        <img
          src="/assets/dog-hero-happy-golden-retriever.png"
          alt="Happy Golden Retriever Puppy"
          loading="eager"
          className="h-full w-auto object-contain"
          onError={(e) => {
            // Fallback during quota reset if the user hasn't uploaded the image yet
            (e.target as HTMLImageElement).src = '/assets/dog-hero-new.png';
          }}
        />
      </motion.div>

      {/* Content Area */}
      <div className="mt-6 w-full max-w-sm text-center flex flex-col items-center flex-1">

        {/* Headline: Montserrat Bold, Dark, Max 3 lines */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-['Montserrat'] font-[900] text-[30px] md:text-[34px] leading-[1.1] text-[#1A1A1A] mb-4"
        >
          ¿Tu perro te ignora o realmente no te entiende?
        </motion.h1>

        {/* Prova Social Imediata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#28a745]/10 border border-[#28a745]/20 px-6 py-2 rounded-full mb-8 shadow-sm"
        >
          <p className="text-[13px] font-bold text-[#28a745] uppercase tracking-wider">
            Más de 3.000.000 de tutores ayudados
          </p>
        </motion.div>

        {/* Subheadline (Optional but helpful for context) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-['Roboto'] font-medium text-[16px] text-[#666666] leading-relaxed mb-6 px-4"
        >
          Descubre el lenguaje secreto de tu perro y transforma su comportamiento en solo 15 minutos al día.
        </motion.p>
      </div>

      {/* CTA Button: Above the fold optimization */}
      <div className="w-full flex flex-col items-center pb-8">
        <Button
          onClick={goToNextStep}
          className="w-full h-16 rounded-[60px] bg-[#28a745] hover:bg-[#218838] text-white font-['Montserrat'] font-black text-[18px] uppercase shadow-[0px_15px_30px_rgba(40,167,69,0.3)] transition-all hover:scale-[1.05] active:scale-[0.98]"
        >
          EMPEZAR ANÁLISIS GRATUITO
        </Button>
      </div>

    </div>
  );
}
