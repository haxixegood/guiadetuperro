import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { motion } from 'framer-motion';
import { Footprints, Sparkles, ShieldCheck, Heart, Star, CheckCircle } from 'lucide-react';

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

      {/* Background Subtle Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full text-center space-y-12 md:space-y-16 relative z-10 py-10 md:py-20"
      >
        {/* Quality Badge - More Elegant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 bg-white border border-slate-100 rounded-full px-6 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Metodología <span className="text-primary italic">5 Estrellas</span>
          </p>
        </motion.div>

        {/* Headline Section - Behance Bold Typography */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
            ¿Por qué <span className="text-primary italic block md:inline">nada</span> parece funcionar?
          </h1>
          <p className="text-base md:text-2xl text-slate-400 font-bold max-w-lg mx-auto leading-tight">
            Descubre el error invisible que bloquea el aprendizaje de <span className="text-slate-900 decoration-primary/30 underline underline-offset-4">tu mejor amigo</span>.
          </p>
        </div>

        {/* SELECTION AREA - CLEANER CARDS */}
        <div className="space-y-8 relative max-w-xl mx-auto">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Elige el mayor desafío hoy:</p>
          <div className="grid grid-cols-2 gap-4 relative z-20">
            {[
              { id: 'latidos', label: 'Ladridos', icon: '🗣️' },
              { id: 'morder', label: 'Morder', icon: '🦴' },
              { id: 'pipi', label: 'Xixi/Popó', icon: '⛲' },
              { id: 'obediencia', label: 'No viene', icon: '🏃' },
            ].map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleStart(item.id)}
                className="group relative flex flex-col items-center justify-center gap-3 rounded-[2.5rem] border border-slate-100 bg-white p-8 h-auto text-slate-900 font-black text-sm hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 active:scale-95"
              >
                <span className="text-3xl group-hover:scale-125 transition-transform duration-500">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* ACTION ZONE - BALANCED HERO BUTTON & CUTOUT */}
        <div className="relative pt-10 md:pt-20 flex flex-col items-center group">
          {/* THE DOG HERO - PROFESSIONAL CUTOUT STYLE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.2, ease: "circOut" }}
            className="absolute -bottom-10 md:-bottom-24 left-1/2 -translate-x-1/2 w-[320px] md:w-[500px] pointer-events-none z-0"
          >
            <div className="relative">
              {/* Background Glow behind the dog */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] scale-75 opacity-50" />
              <img
                src="/assets/dog-hero-new.png"
                alt="Cachorro Hero"
                className="relative w-full h-auto object-contain drop-shadow-[0_30px_50px_rgba(245,158,11,0.2)] mix-blend-multiply"
              />
            </div>
          </motion.div>

          <Button
            onClick={() => handleStart('geral')}
            className="w-full md:w-auto px-16 md:px-24 py-11 text-xl md:text-3xl font-black rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(245,158,11,0.5)] bg-primary hover:bg-primary/90 text-white border-none shimmer-button relative z-10 hover:scale-105 active:scale-95 transition-all"
          >
            Comenzar Diagnóstico →
          </Button>

          <p className="mt-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" /> +3,240 Alumnos Satisfechos
          </p>
        </div>

        {/* TRUST SIGNALS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-20 border-t border-slate-50">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-slate-300" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">100% Seguro</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Footprints className="w-6 h-6 text-slate-300" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Método Científico</span>
          </div>
          <div className="hidden md:flex flex-col items-center gap-2">
            <Star className="w-6 h-6 text-slate-300" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Acceso Instantáneo</span>
          </div>
        </div>
      </motion.div>

      {/* FIXED DECORATIVE ELEMENTS */}
      <div className="fixed top-[20%] left-[5%] opacity-[0.05] pointer-events-none">
        <Footprints className="w-40 h-40 -rotate-12" />
      </div>
      <div className="fixed bottom-[10%] right-[5%] opacity-[0.05] pointer-events-none">
        <Footprints className="w-56 h-56 rotate-45" />
      </div>
    </div>
  );
}
