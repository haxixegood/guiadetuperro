import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { Smartphone, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export default function WelcomeScreen() {
  const { goToNextStep } = useQuiz();

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-12 py-10 px-4">
      {/* ELITE BADGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full"
      >
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Método de Reprogramación Canina 2.0</span>
      </motion.div>

      {/* HERO SECTION */}
      <div className="relative w-full py-12 md:py-20">
        {/* Floating Dog PNG - REAL TRANSPARENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: "spring" }}
          className="absolute -top-16 right-0 md:-right-12 w-32 md:w-64 z-20 pointer-events-none"
        >
          <img
            src="/assets/dog-hero.png"
            alt="Perrhijo"
            className="w-full drop-shadow-2xl"
          />
        </motion.div>

        <div className="relative z-10 space-y-6 text-left md:text-center">
          <h1 className="text-5xl md:text-8xl font-black leading-[0.9] glow-text-yellow tracking-tighter">
            REPRO<span className="text-primary italic">GRAMA</span> <br />
            SU MENTE
          </h1>

          <div className="max-w-xl md:mx-auto">
            <p className="text-lg md:text-2xl font-bold text-white/60 leading-tight">
              El manual de instrucciones que <span className="text-white italic">tu perro</span> no trajo. <span className="text-white">15 minutos al día</span>, sin gritos, desde <span className="text-white underline decoration-primary underline-offset-4">tu celular</span>.
            </p>
          </div>
        </div>
      </div>

      {/* ACTION HUB */}
      <div className="w-full max-w-md space-y-8 relative z-30">
        <Button
          onClick={goToNextStep}
          className="yellow-cta w-full py-8 text-lg md:text-xl font-black shimmer animate-pulse-glow flex items-center justify-center"
        >
          ¡COMENZAR EVALUACIÓN!
        </Button>

        <div className="flex justify-center gap-8 md:gap-12 opacity-40">
          <div className="flex flex-col items-center gap-2">
            <Smartphone className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Mobile First</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Resultados Flash</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Sin Castigos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
