import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { Award, TrendingUp, Heart, Star, ShieldCheck, CheckCircle2, Footprints, Users, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ResultScreen() {
  const { goToNextStep, quizData } = useQuiz();
  const [showLateBonus, setShowLateBonus] = useState(false);

  // Monitorar scroll para ativar bônus no final
  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (bottom && !showLateBonus) {
        setShowLateBonus(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showLateBonus]);

  const issuesCount = quizData['daily-habits']?.length || 0;
  const sizeLabel = {
    chico: 'Pequeño',
    mediano: 'Mediano',
    grande: 'Grande'
  }[quizData.size as string] || 'No especificada';

  const getLevel = () => {
    if (quizData.motivation === 'no-punish') return 'Máximo Potencial';
    return 'Comprometido';
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-16 pb-32 bg-white relative paw-pattern overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full space-y-12 relative z-10"
      >
        {/* Success badge & Certified Seal */}
        <div className="relative mx-auto w-24 h-24 md:w-32 md:h-32">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-full h-full rounded-full bg-primary flex items-center justify-center shadow-2xl relative z-10"
          >
            <ShieldCheck className="w-10 h-10 md:w-16 md:h-16 text-white" />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-10px] border-2 border-dashed border-primary/30 rounded-full"
          />
        </div>

        {/* Title */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            Análisis de Comportamiento Finalizado
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-tight">
            Diagnóstico listo para{' '}
            <span className="text-primary italic">{quizData.name || 'tu perrito'}</span>
          </h2>
        </div>

        {/* Result grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-[2rem] p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner text-xl md:text-2xl">
                  {quizData.size === 'chico' ? '🐶' : quizData.size === 'mediano' ? '🐕' : '🐘'}
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Perfil del Perro</p>
                  <p className="font-bold text-base md:text-lg text-slate-800">{sizeLabel} • {quizData.age === '0-6' ? 'Cachorro' : 'Adulto'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="font-bold text-slate-600">Nivel de Conexión</span>
                  <span className="text-primary font-black">{getLevel()}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '88%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-dashed border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold text-primary leading-snug">
                  Entrenamiento de 15 min compatible para corregir {issuesCount} puntos críticos.
                </p>
              </div>
            </div>
          </motion.div>

          {/* URGENCY ALERT CARD */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-amber-50/50 border-2 border-amber-100 rounded-[2rem] p-6 md:p-8 shadow-xl flex flex-col gap-4 relative overflow-hidden"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-amber-900 leading-tight">Acción Requerida ⚠️</h3>
            <p className="text-xs md:text-sm text-amber-900/70 leading-relaxed font-bold">
              Detectamos que los {issuesCount} retos de <strong>{quizData.name || 'tu perro'}</strong> están en fase de "fijación neuronal".
              <br /><br />
              Si no se inicia el protocolo ADIÓS LADRIDOS pronto, estas conductas podrían volverse permanentes.
            </p>
            <div className="absolute -right-8 -bottom-8 opacity-5">
              <Footprints className="w-32 h-32 text-amber-600" />
            </div>
          </motion.div>
        </div>

        {/* ELITE TEAM SECTION - REDESIGNED WITH VECTORS */}
        <div className="space-y-6 pt-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center justify-center gap-3">
              <Users className="w-6 h-6 text-primary" /> Equipo de Élite
            </h3>
            <p className="text-sm text-slate-400 font-bold mt-1">Especialistas asignados a tu caso:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Dr. Alejandro', role: 'Etólogo Canino', icon: '🩺', color: 'bg-blue-50 text-blue-600' },
              { name: 'Prof. Carla', role: 'Educadora Positiva', icon: '🎓', color: 'bg-rose-50 text-rose-600' },
              { name: 'Sergio', role: 'Experto en Ansiedad', icon: '🧩', color: 'bg-indigo-50 text-indigo-600' }
            ].map((pro, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg text-center group hover:border-primary/30 transition-all"
              >
                <div className={`w-16 h-16 ${pro.color} rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {pro.icon}
                </div>
                <h4 className="font-black text-slate-900">{pro.name}</h4>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{pro.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA SPACER */}
        <div className="h-12" />

        {/* Floating bottom bar (Premium) */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-0 left-0 right-0 p-6 z-50 bg-white/80 backdrop-blur-md border-t border-slate-50"
        >
          <div className="max-w-xl mx-auto">
            <Button
              onClick={goToNextStep}
              size="lg"
              className="w-full h-16 md:h-20 text-xl md:text-2xl font-black rounded-3xl shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90 text-white border-none shimmer-button relative overflow-hidden active:scale-95 transition-all"
            >
              <span className="relative z-10">Ver mi Plan Paso a Paso →</span>
            </Button>
          </div>
        </motion.div>

        {/* LATE GAMIFICATION POPUP (Scroll triggered - SURPRISE EDITION) */}
        <AnimatePresence>
          {showLateBonus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 100 }}
                animate={{
                  opacity: 1,
                  scale: [0.5, 1.1, 1],
                  y: 0,
                  rotate: [0, -2, 2, 0]
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                  duration: 0.8
                }}
                className="bg-white rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center shadow-[0_40px_80px_-15px_rgba(245,158,11,0.6)] border-4 border-primary relative overflow-hidden"
              >
                {/* Sprinkles / Confetti-like background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <Star className="absolute top-10 left-10 w-6 h-6 text-primary animate-pulse" />
                  <Sparkles className="absolute bottom-20 right-10 w-8 h-8 text-primary animate-bounce" />
                  <Heart className="absolute top-20 right-20 w-5 h-5 text-primary animate-ping" />
                </div>

                <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-6xl mb-8 animate-bounce">
                  🎁
                </div>

                <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                  ¡Regalo Sorpresa Desbloqueado! 🎊
                </h3>

                <p className="text-base md:text-xl text-slate-500 font-bold mt-6 leading-relaxed">
                  Por tu compromiso excepcional con <strong>{quizData.name || 'tu perro'}</strong>, hemos liberado <span className="text-primary font-black">acceso exclusivo</span> a estos 3 complementos vitales:
                </p>

                <div className="mt-8 space-y-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border-2 border-slate-100 group hover:border-primary/20 transition-all"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-xl">📘</div>
                    <span className="text-sm font-black text-slate-700">Guía: Adiós Ansiedad (Incluida)</span>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border-2 border-slate-100 group hover:border-primary/20 transition-all"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-xl">🏠</div>
                    <span className="text-sm font-black text-slate-700">Checklist: Higiene Total (Incluida)</span>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border-2 border-slate-100 group hover:border-primary/20 transition-all"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-xl">🎵</div>
                    <span className="text-sm font-black text-slate-700">Áudio: Calma Instantánea (Incluida)</span>
                  </motion.div>
                </div>

                <Button
                  onClick={() => setShowLateBonus(false)}
                  className="mt-10 w-full py-8 rounded-[2rem] font-black text-xl bg-slate-900 text-white hover:bg-slate-800 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all shimmer-button"
                >
                  ¡Acepto mi Regalo! →
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div >
  );
}
