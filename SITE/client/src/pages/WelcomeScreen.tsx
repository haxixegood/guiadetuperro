```javascript
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { motion } from 'framer-motion';
import { Footprints, Sparkles, ShieldCheck, Heart, Star } from 'lucide-react';

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
      
      {/* Background Glows & Vector Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[-5%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] opacity-40" />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-30" />
        
        {/* Floating Vector-like Shadows */}
        <div className="absolute top-[40%] right-[15%] w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-[35%] left-[20%] w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center space-y-6 md:space-y-10 relative z-10 py-4 md:py-12"
      >
        {/* Quality Badge */}
        <motion.div
           whileHover={{ scale: 1.05 }}
           className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 rounded-full px-5 py-2 shadow-sm mb-2"
        >
          <Star className="w-3 h-3 text-primary fill-primary animate-spin-slow" />
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
            Metodología 5 Estrellas
          </p>
        </motion.div>

        {/* Headline Section */}
        <div className="space-y-4 px-2">
          <h1 className="text-3xl md:text-7xl font-black text-slate-900 leading-[1] tracking-tighter">
            ¿Por qué <span className="text-primary italic">nada</span> parece funcionar con tu perro?
          </h1>
          <p className="text-sm md:text-xl text-slate-500 font-bold max-w-sm mx-auto leading-tight">
            Descubre el error invisible que bloquea el aprendizaje de tu mejor amigo.
          </p>
        </div>

        {/* SELECTION AREA */}
        <div className="space-y-3 relative">
          <p className="text-[9px] font-black text-primary/60 uppercase tracking-[0.3em] mb-4">Elige el mayor desafío hoy:</p>
          <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-center relative z-20">
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
                className="rounded-2xl border-2 border-slate-100 bg-white/80 backdrop-blur-md px-4 py-5 h-auto text-slate-700 font-black text-xs hover:bg-primary hover:border-primary hover:text-white transition-all active:scale-95 shadow-sm"
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Decorative Vector Dog (Small Version for spacing) */}
          <div className="absolute -right-8 -top-12 opacity-10 pointer-events-none">
            <Footprints className="w-32 h-32 text-primary rotate-12" />
          </div>
        </div>

        {/* ACTION ZONE */}
        <div className="pt-4 md:pt-8 px-2 relative min-h-[160px] flex flex-col items-center">
          <Button
            onClick={() => handleStart('geral')}
            size="lg"
            className="w-full md:w-auto px-10 md:px-16 py-8 text-xl md:text-2xl font-black rounded-[2rem] shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90 text-white border-none shimmer-button relative z-30 whitespace-nowrap"
          >
            Comenzar Diagnóstico →
          </Button>

          {/* THE CUTE DOG (Fixed loading and positioning) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute -bottom-4 md:-bottom-12 right-0 md:-right-16 h-40 md:h-64 pointer-events-none z-10"
          >
            <img 
              src="/assets/dog-hero.png" 
              alt="Cachorro fofo" 
              className="h-full w-auto object-contain drop-shadow-[0_20px_20px_rgba(245,158,11,0.3)] floating-element"
              onError={(e) => {
                // Fallback icon if image fails
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </motion.div>
          
          {/* Support Vector Elements */}
          <div className="absolute -left-10 bottom-0 opacity-20 pointer-events-none hidden md:block">
            <Heart className="w-16 h-16 text-primary animate-pulse" />
          </div>
        </div>

        {/* SOCIAL PROOF VECTORS */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <ShieldCheck className="w-4 h-4 text-green-500" />
            </motion.div>
            API SESC Validado
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
            <Footprints className="w-4 h-4 text-primary" />
            +3M de Huellas
          </div>
        </div>

        <p className="text-[9px] text-slate-400 max-w-[280px] mx-auto pt-6 leading-relaxed font-bold border-t border-slate-50 mt-4">
          Garantía de privacidad 100% segura. <br/>
          Al hacer clic, aceptas nuestros <span className="underline cursor-pointer">Términos</span>.
        </p>
      </motion.div>

      {/* OVERALL DECORATIVE VECTORS (Filling Empty Spaces) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <Footprints className="absolute top-[10%] left-[5%] w-32 h-32 -rotate-12" />
        <Footprints className="absolute bottom-[15%] right-[5%] w-48 h-48 rotate-45" />
        <Footprints className="absolute top-[60%] left-[-5%] w-24 h-24 rotate-180" />
      </div>
    </div>
  );
}
```
