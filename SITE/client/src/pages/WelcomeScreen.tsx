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
    <div className="min-h-screen flex items-center justify-center p-6 bg-white overflow-x-hidden relative paw-pattern">
      {/* Soft Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center space-y-12 relative z-10 py-12"
      >
        {/* Minimalist Badge */}
        <motion.div
          whileHover={{ y: -2 }}
          className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-full px-5 py-2 shadow-sm"
        >
          <Sparkles className="w-3 h-3 text-primary animate-pulse" />
          <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">
            Metodología Validada por Expertos
          </p>
        </motion.div>

        {/* Lighter Headline */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
            ¿Por qué <span className="text-primary italic">nada</span> parece funcionar con tu perro?
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            Descubre en 2 minutos el error invisible que bloquea el aprendizaje de tu mejor amigo.
          </p>
        </div>

        {/* ORGANIC CHOICE AREA */}
        <div className="space-y-4">
          <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">Elige el mayor desafío hoy:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: 'latidos', label: 'Ladridos' },
              { id: 'morder', label: 'Morder cosas' },
              { id: 'pipi', label: 'Xixi/Popó' },
              { id: 'obediencia', label: 'No viene' },
            ].map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleStart(item.id)}
                className="rounded-2xl border border-slate-200 px-6 py-6 h-auto text-slate-600 font-bold hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all active:scale-95"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* PREMIUM MAIN CTA */}
        <div className="pt-8 px-4">
          <Button
            onClick={() => handleStart('geral')}
            size="lg"
            className="w-full md:w-auto px-20 py-10 text-2xl font-black rounded-[2.5rem] shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 text-white border-none shimmer-button scale-105"
          >
            Comenzar Diagnóstico
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <ShieldCheck className="w-4 h-4 text-green-500" /> API SESC Validado
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <Footprints className="w-4 h-4 text-primary" /> +3M de Huellas
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <p className="text-[10px] text-slate-300 max-w-md mx-auto pt-4">
          Al hacer clic en “Comenzar Diagnóstico”, confirmo que he leído e acepto la Política de Privacidad y los Términos y Condiciones.
        </p>
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 right-[10%] opacity-20 hidden md:block"
      >
        <Footprints className="w-12 h-12 text-primary" />
      </motion.div>
    </div>
  );
}
