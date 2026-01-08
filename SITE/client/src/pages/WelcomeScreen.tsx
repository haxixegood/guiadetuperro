import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { Smartphone, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export default function WelcomeScreen() {
  const { goToNextStep } = useQuiz();

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 py-6 px-4">
      {/* ELITE BADGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
      >
        <ShieldCheck className="w-3 h-3 text-primary" />
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">Método de Reprogramación Canina 2.0</span>
      </motion.div>

      {/* HERO SECTION - MOBILE OPTIMIZED */}
      <div className="relative w-full py-6">
        {/* Dog Image - BETTER POSITIONED FOR MOBILE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: "spring" }}
          className="w-32 md:w-48 mx-auto mb-4 md:absolute md:top-0 md:right-0 md:mb-0"
        >
          <img
            src="/assets/dog-hero.png"
            alt="Perrhijo"
            className="w-full drop-shadow-2xl"
          />
        </motion.div>

        <div className="relative z-10 space-y-4 text-center">
          <h1 className="text-3xl md:text-6xl font-black leading-[0.9] glow-text-yellow tracking-tighter">
            REPRO<span className="text-primary italic">GRAMA</span> <br />
            SU MENTE
          </h1>

          <div className="max-w-md mx-auto">
            <p className="text-sm md:text-xl font-bold text-white/60 leading-tight">
              El manual de instrucciones que <span className="text-white italic">tu perro</span> no trajo. <span className="text-white">15 minutos al día</span>, sin gritos, desde <span className="text-white underline decoration-primary underline-offset-2">tu celular</span>.
            </p>
          </div>
        </div>
      </div>

      {/* ACTION HUB */}
      <div className="w-full max-w-md space-y-6 relative z-30">
        <Button
          onClick={goToNextStep}
          className="yellow-cta w-full py-6 text-base md:text-lg font-black shimmer animate-pulse-glow flex items-center justify-center"
        >
          ¡COMENZAR EVALUACIÓN!
        </Button>

        <div className="flex justify-center gap-6 opacity-40">
          <div className="flex flex-col items-center gap-1">
            <Smartphone className="w-4 h-4" />
            <span className="text-[7px] font-black uppercase tracking-wider text-white/60">Mobile</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Zap className="w-4 h-4" />
            <span className="text-[7px] font-black uppercase tracking-wider text-white/60">15 Min</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-[7px] font-black uppercase tracking-wider text-white/60">Sin Castigos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
