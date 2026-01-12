import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';

export default function WelcomeScreen() {
  const { goToNextStep } = useQuiz();

  return (
    <div className="flex flex-col items-center min-h-[100dvh] bg-white relative overflow-hidden font-sans text-[#1A1A1A] px-[20px] py-8">

      {/* Top: Centralized Dog Image (Contact Visual) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-[35vh] flex items-center justify-center relative z-10"
      >
        <img
          src="/assets/dog-hero-new.png"
          alt="Perro mirando fijamente a cámara para contacto visual"
          loading="eager"
          className="h-full w-auto object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Content Area */}
      <div className="mt-8 w-full max-w-sm text-center flex flex-col items-center flex-1">

        {/* Headline: Montserrat Bold, Dark, Max 3 lines */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-['Montserrat'] font-[900] text-[32px] md:text-[36px] leading-[1.1] text-[#1A1A1A] mb-4"
        >
          ¿Tu perro te ignora o realmente no te entiende?
        </motion.h1>

        {/* Prova Social Imediata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 px-4 py-1.5 rounded-full mb-6"
        >
          <p className="text-[12px] font-bold text-gray-600 uppercase tracking-wider">
            Más de 3.000.000 de tutores ayudados
          </p>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-['Roboto'] font-medium text-[16px] text-[#666666] leading-relaxed mb-8"
        >
          Descubre por qué los métodos tradicionales fallan y recibe un plan paso a paso para corregir comportamientos sin gritos ni castigos.
        </motion.p>
      </div>

      {/* CTA Button: Above the fold optimization */}
      <div className="w-full flex flex-col items-center pb-4">
        <Button
          onClick={goToNextStep}
          className="w-full h-16 rounded-[50px] bg-[#28a745] hover:bg-[#218838] text-white font-['Montserrat'] font-bold text-[18px] uppercase shadow-[0px_10px_20px_rgba(40,167,69,0.3)] transition-all hover:scale-[1.05] active:scale-[0.98] animate-pulse"
        >
          EMPEZAR ANÁLISIS GRATUITO
        </Button>
      </div>

    </div>
  );
}
