import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { motion } from 'framer-motion';
import { Footprints, Sparkles, ShieldCheck } from 'lucide-react';

export default function WelcomeScreen() {
  const { goToNextStep, setInitialPain } = useQuiz();

  const handleStart = (pain: string) => {
    setInitialPain(pain);
    goToNextStep();
    // Tracking Pixel Custom Event
    if (window.fbq) window.fbq('trackCustom', 'InitialClick', { pain });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white overflow-x-hidden relative paw-pattern bg-animate">

      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center space-y-8 md:space-y-12 relative z-10 py-8 md:py-12"
      >
        {/* Verified Badge */}
        <motion.div
          whileHover={{ y: -2 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 shadow-sm mb-2"
        >
          <Sparkles className="w-3 h-3 text-primary animate-pulse" />
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">
            Metodología Validada por Expertos
          </p>
        </motion.div>

        {/* Dynamic Typography */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-7xl font-black text-slate-900 leading-[1] tracking-tighter">
            ¿Por qué <span className="text-primary italic">nada</span> parece funcionar con tu perro?
          </h1>
          <p className="text-sm md:text-xl text-slate-500 font-bold max-w-sm mx-auto leading-tight">
            Descubre el error invisible que bloquea el aprendizaje de tu mejor amigo.
          </p>
        </div>

        {/* CUSTOM CHOICES (MOBILE-FRIENDLY) */}
        <div className="space-y-3">
          <p className="text-[9px] font-black text-primary/60 uppercase tracking-[0.2em] mb-4">Elige el mayor desafío hoy:</p>
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center">
            {[
              { id: 'latidos', label: 'Ladridos' },
              { id: 'morder', label: 'Morder' },
              { id: 'pipi', label: 'Xixi/Popó' },
              { id: 'obediencia', label: 'No viene' },
            ].map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleStart(item.id)}
                className="rounded-2xl border-2 border-slate-100 bg-white/50 backdrop-blur-sm px-4 py-4 h-auto text-slate-700 font-black text-xs hover:bg-primary hover:border-primary hover:text-white transition-all active:scale-95 shadow-sm"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* MAIN CTA */}
        <div className="pt-4 md:pt-8 px-2 relative">
          <Button
            onClick={() => handleStart('geral')}
            size="lg"
            className="w-full px-12 py-8 text-xl font-black rounded-[2rem] shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 text-white border-none shimmer-button relative z-20"
          >
            Comenzar Diagnóstico →
          </Button>

          {/* CUTE DOG PLACEMENT */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-16 -right-12 md:-right-24 h-48 md:h-72 pointer-events-none z-10"
          >
            <img
              src="C:/Users/pedro/.gemini/antigravity/brain/95a42650-4a96-46e0-8378-aa7f97aafdbc/puppy_sitting_transparent_feel_1767832926399.png"
              alt="Cachorro fofo"
              className="h-full w-auto object-contain drop-shadow-2xl floating-element"
            />
          </motion.div>
        </div>

        {/* TRUST ELEMENTS */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-16 pt-8 border-t border-slate-50">
          <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 opacity-60">
            <ShieldCheck className="w-3 h-3 text-green-500" /> API SESC Validado
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 opacity-60">
            <Footprints className="w-3 h-3 text-primary" /> +3M de Huellas
          </div>
        </div>

        <p className="text-[9px] text-slate-300 max-w-xs mx-auto pt-4 leading-relaxed font-bold">
          Al hacer clic, aceptas nuestra <span className="underline">política de privacidad</span>.
        </p>
      </motion.div>

      {/* BACKGROUND DECORATIONS */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 left-[5%] text-primary pointer-events-none"
      >
        <Footprints className="w-24 h-24" />
      </motion.div>
    </div>
  );
}
