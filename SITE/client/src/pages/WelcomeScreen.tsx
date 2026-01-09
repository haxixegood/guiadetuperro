import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { Star } from 'lucide-react';

export default function WelcomeScreen() {
  const { goToNextStep } = useQuiz();

  return (
    <div className="flex flex-col items-center min-h-[100dvh] bg-white relative overflow-hidden font-sans text-[#1A1A1A] px-6 py-8">

      {/* Top: Hero image of a dog (35% height) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-[35vh] flex items-center justify-center relative z-10"
      >
        <img
          src="/assets/dog-hero-golden.png"
          alt="Friendly Golden Retriever"
          className="h-full w-auto object-contain drop-shadow-xl"
        />
      </motion.div>

      {/* Spacing between Image and Text: 32px */}
      <div className="mt-[32px] w-full max-w-sm text-center flex flex-col items-center space-y-[20px]">

        {/* Main Headline: Montserrat Extra Bold, 36px, Line-height 1.1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-['Montserrat'] font-[900] text-[36px] leading-[1.1] text-black uppercase tracking-tight"
        >
          REPROGRAMA <br />
          <span className="text-[#FFCC00]">SU MENTE</span>
        </motion.h1>

        {/* Sub-headline: Roboto Medium, 16px, Letter-spacing 1.5px, Color #666666 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-['Roboto'] font-medium text-[16px] tracking-[1.5px] text-[#666666] uppercase"
        >
          MÉTODO PRÁCTICO: 15 MIN AL DÍA
        </motion.p>
      </div>

      <div className="flex-1" />

      {/* Spacing Text to Button: 40px */}
      <div className="mt-[40px] w-full flex flex-col items-center mb-8">
        <Button
          onClick={goToNextStep}
          className="w-[90%] h-16 rounded-[50px] bg-[#FFCC00] hover:bg-[#F0C000] text-black font-['Montserrat'] font-bold text-[18px] uppercase shadow-[0px_10px_20px_rgba(255,204,0,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          ¡COMENZAR EVALUACIÓN!
        </Button>

        {/* Prova Social: 10px below CTA */}
        <div className="flex flex-col items-center gap-1.5 mt-[10px]">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-3.5 h-3.5 text-[#FFCC00] fill-[#FFCC00]" />
            ))}
          </div>
          <p className="text-[12px] font-medium text-[#999999] text-center">
            Más de 5,000 dueños ya transformaron a sus perros
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pb-4 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
        <span>Resultados desde el primer día</span>
      </div>

    </div>
  );
}
