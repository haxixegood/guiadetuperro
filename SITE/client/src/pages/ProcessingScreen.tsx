import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ShieldCheck, Zap, Smartphone, CheckCircle2, Gift } from 'lucide-react';
import { useQuiz } from '@/contexts/QuizContext';

export default function ProcessingScreen() {
  const { goToNextStep, quizData } = useQuiz();
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showGift, setShowGift] = useState(false);

  const stages = [
    { label: 'Analizando perfil conductual...', icon: <Smartphone className="w-5 h-5" /> },
    { label: 'Optimizando ruta de aprendizaje...', icon: <Zap className="w-5 h-5" /> },
    { label: 'Finalizando protocolo personalizado...', icon: <ShieldCheck className="w-5 h-5" /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;
        if (next > 40 && !showGift) setShowGift(true); // Show gift at 40%
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(goToNextStep, 2000);
          return 100;
        }
        return next;
      });
    }, 50);

    const stageTimer = setInterval(() => {
      setStage(prev => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(stageTimer);
    };
  }, [goToNextStep, stages.length, showGift]);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col py-12 px-6 font-sans bg-white relative overflow-hidden text-[#1A1A1A]">

      {/* Header */}
      <div className="text-center space-y-4 mb-10 relative z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 mx-auto bg-yellow-50 rounded-full flex items-center justify-center border-2 border-[#FFD700] border-dashed"
        >
          <span className="text-2xl">🔍</span>
        </motion.div>

        <div className="space-y-1">
          <p className="text-xs font-bold text-[#FFD700] uppercase tracking-widest">
            Analizando datos...
          </p>
          <h2 className="text-3xl font-black text-[#1A1A1A] leading-tight">
            PROCESANDO<br />DIAGNÓSTICO
          </h2>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 mb-10 relative z-10">
        <div className="flex justify-between items-end px-1">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Progreso</span>
          <span className="text-lg font-black text-[#FFD700]">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#FFD700] rounded-full shadow-sm"
          />
        </div>
      </div>

      {/* Status Checklist */}
      <div className="space-y-4 relative z-10">
        {stages.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: i <= stage ? 1 : 0.3,
              x: 0,
              scale: i === stage ? 1.02 : 1
            }}
            className={`
                            relative bg-white rounded-2xl p-4 flex items-center justify-between border transition-all duration-300
                            ${i === stage ? 'border-[#FFD700] shadow-md' : 'border-gray-100 shadow-sm'}
                        `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center
                                ${i <= stage ? 'bg-yellow-50 text-[#FFD700]' : 'bg-gray-50 text-gray-300'}
                            `}>
                {s.icon}
              </div>
              <span className={`text-sm font-bold ${i <= stage ? 'text-[#1A1A1A]' : 'text-gray-300'}`}>
                {s.label}
              </span>
            </div>
            {i < stage && <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />}
            {i === stage && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-4 h-4 border-2 border-gray-200 border-t-[#FFD700] rounded-full" />}
          </motion.div>
        ))}
      </div>

      {/* Surprise Gift Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showGift ? 1 : 0, y: showGift ? 0 : 50 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="mt-8 relative w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-50 blur-xl opacity-50 rounded-3xl" />
        <div className="relative bg-white border border-[#FFD700]/30 rounded-[24px] p-5 flex items-center gap-4 shadow-[0_10px_30px_rgba(255,215,0,0.15)] overflow-hidden">
          {/* "Ribbon" decoration */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFD700]/10 rounded-bl-[100px]" />

          <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center flex-shrink-0 animate-bounce-slow">
            <Gift className="w-7 h-7 text-[#FFD700]" />
          </div>
          <div>
            <p className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest">
              ¡DESBLOQUEADO!
            </p>
            <h3 className="text-lg font-black text-[#1A1A1A]">
              REGALO SORPRESA
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Se ha añadido un bono extra a tu plan
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
