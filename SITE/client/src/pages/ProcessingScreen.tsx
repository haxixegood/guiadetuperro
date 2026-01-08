import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ShieldCheck, Zap, Activity, Smartphone, BrainCircuit, Search, Database } from 'lucide-react';
import { useQuiz } from '@/contexts/QuizContext';

export default function ProcessingScreen() {
  const { goToNextStep, quizData } = useQuiz();
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const stages = [
    { label: 'Analizando Perfil de "Perrhijo"', icon: <Smartphone className="w-4 h-4" /> },
    { label: 'Detectando Patrones de Berrinches', icon: <BrainCircuit className="w-4 h-4" /> },
    { label: 'Cruzando Base de Datos Genética', icon: <Database className="w-4 h-4" /> },
    { label: 'Calibrando Protocolo 15 Min/Día', icon: <Zap className="w-4 h-4" /> },
    { label: 'Generando Manual de Instrucciones', icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // INCREASED DELAY - Wait 2 seconds after 100% before proceeding
          setTimeout(goToNextStep, 2000);
          return 100;
        }
        return prev + 0.8; // SLOWER progression
      });
    }, 60); // SLOWER interval

    const stageTimer = setInterval(() => {
      setStage(prev => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 2000); // SLOWER stage transitions

    return () => {
      clearInterval(timer);
      clearInterval(stageTimer);
    };
  }, [goToNextStep, stages.length]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-12 py-10">
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center"
        >
          <Search className="w-8 h-8 text-primary" />
        </motion.div>

        <div className="space-y-2">
          <span className="text-[10px] font-black tracking-[0.4em] text-primary">{progress < 100 ? 'ANALIZANDO_DATOS...' : 'SYNC_COMPLETO'}</span>
          <h2 className="text-4xl md:text-6xl font-black glow-text-yellow uppercase">Procesando <br /> Diagnóstico</h2>
        </div>
      </div>

      <div className="space-y-8">
        {/* MEGA PROGRESS BAR */}
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase text-white/40 tracking-widest px-2">
            <span>Puntaje de Rebelión</span>
            <span className="text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(255,234,0,0.4)]"
            />
          </div>
        </div>

        {/* STAGES HUD */}
        <div className="grid grid-cols-1 gap-4">
          {stages.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: i <= stage ? 1 : 0.2,
                x: 0,
                scale: i === stage ? 1.02 : 1
              }}
              className={`organic-card p-5 flex items-center justify-between border-white/5 ${i === stage ? 'border-primary/20 bg-white/10' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === stage ? 'bg-primary text-black' : 'bg-white/5 text-white/40'}`}>
                  {s.icon}
                </div>
                <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${i === stage ? 'text-white' : 'text-white/30'}`}>
                  {s.label}
                </span>
              </div>

              {i < stage && <ShieldCheck className="w-4 h-4 text-primary" />}
              {i === stage && <Activity className="w-4 h-4 text-primary animate-pulse" />}
            </motion.div>
          ))}
        </div>
      </div>

      {/* FOOTER TERMINAL */}
      <div className="text-center">
        <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em]">Hardware: {quizData.name || 'Perrhijo'} // Software: ADIÓS BERRINCHES v2.1</p>
      </div>
    </div>
  );
}
