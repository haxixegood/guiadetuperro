import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { ShieldCheck, TrendingUp, Sparkles, Zap, Smartphone, CheckCircle2, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ResultScreen() {
  const { quizData } = useQuiz();
  const [showLateBonus, setShowLateBonus] = useState(false);
  const [hasSeenBonus, setHasSeenBonus] = useState(false);

  // Monitor scroll for the surprise gift (Surprise Edition)
  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (bottom && !showLateBonus && !hasSeenBonus) {
        setShowLateBonus(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showLateBonus, hasSeenBonus]);

  const handleCloseBonus = () => {
    setShowLateBonus(false);
    setHasSeenBonus(true);
  };

  const getUrgencyLevel = () => {
    return quizData.motivation === 'no-punish' ? 'PRIORIDAD ALPHA' : 'CRÍTICO';
  };

  return (
    <div className="min-h-screen bg-background text-white p-4 pt-16 pb-40 flex flex-col items-center overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full space-y-12"
      >
        {/* CERTIFIED HUD HEADER */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/40 shadow-[0_0_30px_rgba(255,234,0,0.2)]"
          >
            <ShieldCheck className="w-12 h-12 text-primary" />
          </motion.div>
          <div className="space-y-2">
            <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">Diagnóstico Finalizado_2025</span>
            <h1 className="text-4xl md:text-7xl font-black leading-none glow-text-yellow">
              ANÁLISIS DE <span className="italic italic text-primary">SYNC</span> LISTO
            </h1>
          </div>
        </div>

        {/* DATA CLUSTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CORE STATS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="organic-card p-8 flex flex-col justify-between group"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl">🐕</div>
                <div>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Sujeto: {quizData.name || 'Perrhijo'}</p>
                  <p className="text-lg font-bold">Nivel: {getUrgencyLevel()}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm font-bold opacity-60">
                <p className="flex justify-between">Conexión Neural <span>88%</span></p>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className="h-full bg-primary" />
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-white/5 pt-6 flex items-center gap-2 text-primary">
              <Zap className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Protocolo de 15 Min Habilitado</span>
            </div>
          </motion.div>

          {/* URGENCY ALERT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="organic-card p-8 bg-primary/[0.03] border-primary/20 flex flex-col gap-4 relative overflow-hidden"
          >
            <TrendingUp className="w-10 h-10 text-primary" />
            <h3 className="text-2xl font-black uppercase text-primary leading-none italic">Alerta de Berrinchudo</h3>
            <p className="text-sm font-bold text-white/60 leading-relaxed">
              Detectamos una fase de <span className="text-white">fijación conductual</span>. Si no se aplica el "Hard Reset" hoy, el comportamiento rebelde será permanente.
            </p>
            <div className="absolute -bottom-6 -right-6 opacity-5 rotate-12">
              <Smartphone className="w-32 h-32" />
            </div>
          </motion.div>
        </div>

        {/* HOW IT WORKS APP STYLE */}
        <div className="space-y-8 pt-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-black uppercase glow-text-yellow">Tu Manual de Instrucciones</h3>
            <p className="text-sm font-bold text-white/40 mt-2 italic">Entrenamiento de bolsillo por especialistas:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '📱', label: 'Video Guía', desc: 'Abre el video' },
              { icon: '⚡', label: 'Sync 15 Min', desc: 'Practica 15 min' },
              { icon: '💎', label: 'Total Control', desc: 'Resultados permanentes' }
            ].map((step, i) => (
              <div key={i} className="organic-card p-6 text-center border-white/5 hover:border-primary/20 transition-all">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h4 className="font-black text-sm uppercase mb-1">{step.label}</h4>
                <p className="text-[10px] font-bold text-white/40 uppercase">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL YELLOW CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-6 z-50 bg-background/80 backdrop-blur-xl border-t border-white/5">
          <div className="max-w-xl mx-auto">
            <Button
              onClick={() => window.location.href = '/sales'}
              className="yellow-cta w-full h-18 text-xl font-black shimmer animate-pulse-glow"
            >
              ¡REPROGRAMAR MI PERRIHO AHORA! →
            </Button>
          </div>
        </div>

        {/* LATE POPUP BUG FIXED */}
        <AnimatePresence>
          {showLateBonus && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="organic-card p-10 max-w-md w-full text-center border-primary shadow-[0_0_100px_rgba(255,234,0,0.2)] relative"
              >
                <div className="text-6xl mb-6">🎁</div>
                <h3 className="text-3xl font-black uppercase glow-text-yellow">Regalo Sorpresa</h3>
                <p className="text-sm font-bold text-white/60 mt-4 leading-relaxed">
                  Por tu compromiso liberamos <span className="text-primary italic">Acceso Premium</span> a la Guía de Ansiedad y Checklist de Higiene.
                </p>

                <div className="mt-8 space-y-3">
                  {['Guía: Adiós Ansiedad', 'Checklist: Higiene Total'].map(gift => (
                    <div key={gift} className="bg-white/5 p-3 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-primary" /> {gift}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleCloseBonus}
                  className="yellow-cta w-full mt-10 py-6 text-lg font-black"
                >
                  ¡ACEPTO MI REGALO! →
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
