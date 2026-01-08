import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ShieldCheck, Zap, Smartphone, CheckCircle2, Gift } from 'lucide-react';
import { useQuiz } from '@/contexts/QuizContext';

export default function ProcessingScreen() {
  const { goToNextStep, quizData } = useQuiz();
  const [stage, setStage] = useState(0); // 0, 1, 2, 3(Done)
  const [progress, setProgress] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [statusText, setStatusText] = useState('Analizando datos...');

  const stages = [
    { label: 'Analizando perfil conductual...', icon: <Smartphone className="w-5 h-5" /> },
    { label: 'Optimizando ruta de aprendizaje...', icon: <Zap className="w-5 h-5" /> },
    { label: 'Finalizando protocolo personalizado...', icon: <ShieldCheck className="w-5 h-5" /> }
  ];

  useEffect(() => {
    // Total Loading Time: 6 seconds for 100%
    const duration = 6000;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => Math.min(prev + increment, 100));
    }, interval);

    // STAGE TIMELINE
    // T=0s: Stage 0 (Scanning)

    // T=2s: Stage 1 (Optimizing)
    const t1 = setTimeout(() => {
      setStage(1);
      setStatusText(`Detectando patrones de ${quizData.name || 'tu perro'}...`);
    }, 2000);

    // T=4s: Stage 2 (Finalizing)
    const t2 = setTimeout(() => {
      setStage(2);
      setStatusText("Generando plan de acción...");
    }, 4000);

    // T=6s: Stage 3 (Done)
    const t3 = setTimeout(() => {
      setStage(3);
      setStatusText("¡Análisis Completado!");
    }, 6000);

    // T=6.5s: SHOW GIFT (Dopamine hit)
    const tGift = setTimeout(() => {
      setShowGift(true);
    }, 6500);

    // T=11s: NAVIGATE (Increased delay to allow reading)
    const tExit = setTimeout(() => {
      goToNextStep();
    }, 11000);

    return () => {
      clearInterval(timer);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(tGift); clearTimeout(tExit);
    };
  }, [goToNextStep, quizData.name]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col pt-6 px-6 font-sans relative overflow-hidden text-[#1A1A1A]">

      {/* Header - Compact Layout */}
      <div className="text-center space-y-3 mb-8 relative z-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-14 h-14 mx-auto bg-gray-50 rounded-full flex items-center justify-center"
        >
          <span className="text-xl">🔍</span>
        </motion.div>

        <div className="space-y-1">
          <motion.p
            key={statusText}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold text-[#FFD700] uppercase tracking-widest h-4"
          >
            {statusText}
          </motion.p>
          <h2 className="text-2xl font-black text-[#1A1A1A] leading-none">
            PROCESANDO<br />DIAGNÓSTICO
          </h2>
        </div>
      </div>

      {/* Progress Bar - Clean */}
      <div className="space-y-2 mb-8 relative z-10 w-full">
        <div className="flex justify-between items-end px-1">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Progreso</span>
          <span className="text-lg font-black text-[#FFD700]">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }} // Smooth steps
            className="h-full bg-[#FFD700] rounded-full shadow-sm"
          />
        </div>
      </div>

      {/* Status Checklist - Infinite Style */}
      <div className="space-y-3 relative z-10 w-full">
        {stages.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: i <= stage ? 1 : 0.4, // Dim future steps
              x: 0,
              scale: i === stage && stage < 3 ? 1.02 : 1, // Pulse active step
            }}
            className={`
                relative bg-white rounded-xl p-4 flex items-center justify-between transition-all duration-300
                ${i === stage && stage < 3 ? 'bg-white shadow-lg z-10' : 'bg-transparent'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
                  ${i < stage ? 'bg-green-100 text-green-600' : (i === stage ? 'bg-[#FFD700] text-black' : 'bg-gray-50 text-gray-300')}
              `}>
                {i < stage ? <CheckCircle2 className="w-5 h-5" /> : s.icon}
              </div>
              <span className={`text-xs md:text-sm font-bold leading-tight ${i <= stage ? 'text-[#1A1A1A]' : 'text-gray-300'}`}>
                {s.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Surprise Gift Card - Clean & Infinite */}
      {showGift && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="mt-8 relative w-full z-20 pb-8"
        >
          <div className="relative bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-xl shadow-yellow-400/10 overflow-hidden">
            <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center flex-shrink-0 animate-bounce text-[#FFD700]">
              <Gift className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[9px] font-black text-[#FFD700] uppercase tracking-widest mb-1">
                ¡DESBLOQUEADO!
              </p>
              <h3 className="text-lg font-black text-[#1A1A1A] leading-none mb-1">
                REGALO SORPRESA
              </h3>
              <p className="text-[10px] text-gray-400 font-bold">
                Se ha añadido un bono extra a tu plan
              </p>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
