import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface ProcessingTask {
  label: string;
  progress: number;
}

export default function ProcessingScreen() {
  const { goToNextStep, quizData } = useQuiz();
  const [tasks, setTasks] = useState<ProcessingTask[]>([
    { label: 'Identificando problemas comportamentais para corrigir', progress: 0 },
    { label: 'Avaliando compreensão atual de comandos', progress: 0 },
    { label: `Adaptando lições para um cachorro ${quizData.breed || 'especial'}`, progress: 0 },
    { label: 'Construindo seu plano de treinamento personalizado', progress: 0 },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    // Animar progresso das tarefas
    const intervals: NodeJS.Timeout[] = [];
    
    tasks.forEach((_, index) => {
      const interval = setInterval(() => {
        setTasks(prev => {
          const newTasks = [...prev];
          if (newTasks[index].progress < 100) {
            newTasks[index].progress = Math.min(newTasks[index].progress + 10, 100);
          }
          return newTasks;
        });
      }, 200 + index * 100);
      
      intervals.push(interval);
    });
    
    // Mostrar modal após 2 segundos
    const modalTimeout = setTimeout(() => {
      setShowModal(true);
    }, 2000);
    
    return () => {
      intervals.forEach(clearInterval);
      clearTimeout(modalTimeout);
    };
  }, []);
  
  const handleModalAnswer = (answer: string) => {
    updateQuizData({ enjoyTime: answer });
    goToNextStep();
  };
  
  const { updateQuizData } = useQuiz();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-16 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full space-y-8"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-2"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Preparando Seu Plano de Treinamento...
          </h2>
          <p className="text-muted-foreground">
            Estamos criando um plano personalizado para {quizData.name || 'seu cachorro'}
          </p>
        </motion.div>
        
        {/* Progress tasks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl p-8 shadow-lg space-y-6"
        >
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">{task.label}</span>
                <span className="text-primary font-bold">{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Reviews carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <p className="text-center text-sm text-muted-foreground">
            Enquanto isso, veja o que nossos clientes dizem:
          </p>
          
          <div className="bg-card rounded-2xl p-6 shadow-md">
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                alt="Cliente"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">@maria_silva</p>
                <p className="text-sm text-muted-foreground mt-1">
                  "Fantástico! Acabei de terminar o programa de obediência com meu cachorro, eu amo! 👏"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Modal overlay */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {}}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              Você gosta de passar tempo com seu cachorro?
            </h3>
            
            <div className="space-y-3">
              {[
                { value: 'love-it', label: 'Sim, eu amo!', icon: '😊' },
                { value: 'sometimes', label: 'Às vezes, quando estamos no clima', icon: '😐' },
                { value: 'not-much', label: 'Não tanto quanto gostaria', icon: '😕' },
                { value: 'challenge', label: 'Honestamente, pode ser um desafio', icon: '😰' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleModalAnswer(option.value)}
                  className="w-full p-4 rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all duration-200 flex items-center gap-3 text-left"
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
