import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { Smartphone, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export default function WelcomeScreen() {
  const { goToNextStep } = useQuiz();

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-12 py-10">
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
      <div className="relative w-full py-20 md:py-32">
        {/* Floating Dog PNG - FIXED with Screen Blend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: "spring" }}
          className="absolute -top-10 -right-10 md:-right-24 w-48 md:w-[500px] z-20 pointer-events-none mix-blend-screen"
        >
          <img
            src="/assets/dog-hero-new.png"
            alt="Perrhijo"
            className="dog-float w-full brightness-110 contrast-125"
          />
        </motion.div>

        {/* HUD Visual Decor elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-0 w-20 h-0.5 bg-primary" />
          <div className="absolute top-1/4 left-0 w-0.5 h-10 bg-primary" />
          <div className="absolute bottom-1/4 right-0 w-20 h-0.5 bg-primary" />
          <div className="absolute bottom-1/4 right-0 w-0.5 h-10 bg-primary" />
        </div>

        <div className="relative z-10 space-y-8 text-left md:text-center">
          <h1 className="text-6xl md:text-[10rem] font-black leading-[0.85] glow-text-yellow tracking-tighter">
            REPRO<span className="text-primary italic">GRAMA</span> <br />
            SU MENTE
          </h1>

          <div className="max-w-xl md:mx-auto relative">
            <p className="text-xl md:text-3xl font-bold text-white/50 leading-tight">
              El manual de instrucciones que <span className="text-white italic">tu perro</span> no trajo. 15 minutos al día, sin gritos, desde <span className="text-white underline decoration-primary underline-offset-8">tu celular</span>.
            </p>
            <div className="absolute -left-10 top-0 text-[10px] font-mono text-primary rotate-90 hidden md:block">OPTIMIZING_SYNC</div>
          </div>
        </div>
      </div>

      {/* ACTION HUB */}
      <div className="w-full max-w-md space-y-8 relative z-30">
        <Button
          onClick={goToNextStep}
          className="yellow-cta w-full py-12 md:py-14 text-xl md:text-2xl font-black shimmer animate-pulse-glow"
        >
          ¡COMENZAR EVALUACIÓN!
        </Button>

        <div className="flex justify-center gap-8 md:gap-12 opacity-40">
          <div className="flex flex-col items-center gap-2">
            <Smartphone className="w-6 h-6" />
            <span className="text-[8px] font-black uppercase tracking-widest text-white/60">App Mobile</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-6 h-6" />
            <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Resultados Flash</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-6 h-6" />
            <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Sin Castigos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
