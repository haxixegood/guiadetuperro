import { motion } from 'framer-motion';
import { useQuiz } from '@/contexts/QuizContext';
import { useEffect, useState } from 'react';
import { Activity, ShieldCheck, Zap, Cpu, Scan } from 'lucide-react';

interface ProcessingTask {
  label: string;
  progress: number;
}

export default function ProcessingScreen() {
  const { goToNextStep, quizData } = useQuiz();
  const [tasks, setTasks] = useState<ProcessingTask[]>([
    { label: 'CALIBRANDO ALGORITMO CONDUCTUAL', progress: 0 },
    { label: 'ESCANEANDO PATRONES DE "BERRINCHE"', progress: 0 },
    { label: `ADAPTANDO RED NEURAL PARA ${quizData.breed?.toUpperCase() || 'TU PERRIHO'}`, progress: 0 },
    { label: 'COMPILANDO CÓDIGO DE OBEDIENCIA', progress: 0 },
  ]);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    tasks.forEach((_, index) => {
      const interval = setInterval(() => {
        setTasks(prev => {
          const newTasks = [...prev];
          if (newTasks[index].progress < 100) {
            const increment = Math.floor(Math.random() * 5) + 3;
            newTasks[index].progress = Math.min(newTasks[index].progress + increment, 100);
          }
          return newTasks;
        });
      }, 200 + index * 150);
      intervals.push(interval);
    });

    const autoAdvance = setTimeout(() => {
      goToNextStep();
    }, 11000);

    return () => {
      intervals.forEach(clearInterval);
      clearTimeout(autoAdvance);
    };
  }, []);

  const testimonials = [
    { name: "SANTIAGO_DF", text: "SYNC_COMPLETE: Mi perro ya no es un berrinchudo total.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    { name: "VALERIA_MTY", text: "CORE_UPDATE: Adiós destrucción de muebles. 10/10.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    { name: "CARLOS_GUA", text: "PROTOCOL_ALPHA: Increíble el cambio en solo 2 semanas.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
    { name: "MA_FERNANDA", text: "NEURAL_LINK: El mejor software de conexión que he probado.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-12">
      {/* HUD HEADER */}
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-block relative"
        >
          <div className="w-20 h-20 rounded-sm border-2 border-primary/30 flex items-center justify-center p-2 relative">
            <div className="scanner-line" />
            <Scan className="w-10 h-10 text-primary animate-pulse" />
          </div>
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-5xl font-black text-white glow-text uppercase tracking-tighter">
            Diagnósticos <span className="text-primary italic">IA_CORE</span>
          </h2>
          <div className="flex justify-center gap-4">
            <span className="text-[9px] font-mono text-white/40 flex items-center gap-1">
              <Activity className="w-3 h-3 text-neon-purple" /> SCANNING_248_POINTS
            </span>
            <span className="text-[9px] font-mono text-white/40 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-primary" /> PROCESSING_DATA
            </span>
          </div>
        </div>
      </div>

      {/* NEURAL TASKS HUD */}
      <div className="space-y-6">
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-end">
              <span className="text-[10px] md:text-xs font-black text-white/80 uppercase tracking-widest flex items-center gap-2">
                {task.progress === 100 ? <ShieldCheck className="w-3 h-3 text-primary" /> : <Zap className="w-3 h-3 text-neon-purple animate-pulse" />}
                {task.label}
              </span>
              <span className="text-[10px] md:text-xs font-mono text-primary tabular-nums">
                [{task.progress}%]
              </span>
            </div>
            <div className="neural-progress">
              <motion.div
                animate={{ width: `${task.progress}%` }}
                className="neural-fill"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* HOLOGRAPHIC FEEDBACK GRID */}
      <div className="space-y-4 pt-10 border-t border-white/5 relative">
        <p className="text-center text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">
          Hologramas de Resultados_2025
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.2 }}
              className="cyber-card p-4 flex items-center gap-4 border-neon-purple/20 bg-neon-purple/[0.03]"
            >
              <img src={t.img} alt="" className="w-10 h-10 rounded-sm border border-neon-purple/30 brightness-110 contrast-125" />
              <div className="flex-1">
                <p className="text-[9px] font-black text-neon-purple uppercase">{t.name}</p>
                <p className="text-[10px] text-white/60 font-bold leading-tight">{t.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
