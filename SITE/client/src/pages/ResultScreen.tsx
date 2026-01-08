import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { CheckCircle2, Smartphone, Zap, Sparkles, Star, ShieldCheck, PlayCircle, Heart, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function ResultScreen() {
  const { quizData } = useQuiz();
  const [, setLocation] = useLocation();
  const [showLateBonus, setShowLateBonus] = useState(false);
  const [hasSeenBonus, setHasSeenBonus] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSeenBonus) {
        setShowLateBonus(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasSeenBonus]);

  const closeBonusPopup = () => {
    setShowLateBonus(false);
    setHasSeenBonus(true);
  };

  return (
    <div className="min-h-screen bg-background text-white pb-32 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
        {/* HEADER */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary"
          >
            <ShieldCheck className="w-10 h-10 text-primary" />
          </motion.div>

          <div className="space-y-3">
            <span className="text-[10px] font-black tracking-[0.4em] text-primary">ANÁLISIS COMPLETO // SYNC LISTO</span>
            <h1 className="text-3xl md:text-5xl font-black glow-text-yellow uppercase leading-tight">
              Diagnóstico de <br />
              <span className="text-primary italic">{quizData.name || 'Tu Perrhijo'}</span>
            </h1>
          </div>
        </div>

        {/* RESULTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="organic-card p-8 space-y-4"
          >
            <Zap className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-black uppercase">Nivel de Energía</h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`h-2 flex-1 rounded-full ${i <= 4 ? 'bg-primary' : 'bg-white/10'}`} />
              ))}
            </div>
            <p className="text-xs text-white/60 font-bold">Alto - Requiere ejercicio diario estructurado</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="organic-card p-8 space-y-4"
          >
            <Sparkles className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-black uppercase">Potencial de Cambio</h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`h-2 flex-1 rounded-full ${i <= 5 ? 'bg-primary' : 'bg-white/10'}`} />
              ))}
            </div>
            <p className="text-xs text-white/60 font-bold">Excelente - Responderá rápido al método</p>
          </motion.div>
        </div>

        {/* URGENCY ALERT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="organic-card p-8 bg-primary/[0.03] border-primary/20 flex flex-col gap-4 relative overflow-hidden"
        >
          <Activity className="w-10 h-10 text-primary" />
          <h3 className="text-2xl font-black uppercase text-primary leading-none italic">Alerta de Berrinchudo</h3>
          <p className="text-sm font-bold text-white/60 leading-relaxed">
            Detectamos una fase de <span className="text-white">fijación conductual</span>. Si no se aplica el "Hard Reset" hoy, el comportamiento rebelde será permanente.
          </p>
        </motion.div>

        {/* ELITE TEAM */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-4xl font-black uppercase text-center">
            Únete al <span className="text-primary italic">Equipo Élite</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <CheckCircle2 />, label: 'Guías PDF' },
              { icon: <Zap />, label: 'Videos Paso a Paso' },
              { icon: <Smartphone />, label: 'Audios Calmantes' },
              { icon: <ShieldCheck />, label: 'Soporte VIP' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="organic-card p-6 text-center space-y-3"
              >
                <div className="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase block">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FINAL YELLOW CTA - FIXED PROPORTIONS */}
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 md:p-6 z-50 bg-background/95 backdrop-blur-xl border-t border-white/5">
          <div className="max-w-xl mx-auto">
            <Button
              onClick={() => setLocation('/sales')}
              className="yellow-cta w-full py-6 md:py-8 text-base md:text-xl font-black shimmer animate-pulse-glow leading-tight"
            >
              ¡REPROGRAMAR MI PERRHIJO AHORA!
            </Button>
          </div>
        </div>

        {/* LATE POPUP BUG FIXED */}
        <AnimatePresence>
          {showLateBonus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={closeBonusPopup}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="organic-card p-10 max-w-md text-center space-y-6 border-primary/30"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-black uppercase text-primary">¡Regalo Sorpresa!</h3>
                <p className="text-white/80 font-bold">
                  Por completar el diagnóstico, desbloqueaste <span className="text-primary">3 bonos exclusivos</span> que te ayudarán a acelerar los resultados.
                </p>
                <Button onClick={closeBonusPopup} className="yellow-cta w-full py-6 text-lg font-black">
                  ¡RECLAMAR AHORA!
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
