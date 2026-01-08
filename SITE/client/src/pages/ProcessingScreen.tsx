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
    { label: 'Identificando problemas de comportamiento para corregir', progress: 0 },
    { label: 'Evaluando la comprensión actual de comandos', progress: 0 },
    { label: `Adaptando lecciones para un perro ${quizData.breed || 'especial'}`, progress: 0 },
    { label: 'Construyendo su plan de entrenamiento personalizado', progress: 0 },
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
            // Incremetos menores e mais lentos para realismo (2% a 5% por tick)
            const increment = Math.floor(Math.random() * 3) + 2;
            newTasks[index].progress = Math.min(newTasks[index].progress + increment, 100);
          }
          return newTasks;
        });
      }, 150 + index * 120);

      intervals.push(interval);
    });

    // Avanzar automaticamente ao final de 13 segundos (análisis profundo)
    const autoAdvance = setTimeout(() => {
      goToNextStep();
    }, 13000);

    return () => {
      intervals.forEach(clearInterval);
      clearTimeout(autoAdvance);
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
        className="max-w-xl w-full space-y-8"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-3"
        >
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
            Analizando comportamiento de <span className="text-primary">{quizData.name || 'tu perro'}</span>...
          </h2>
          <p className="text-sm text-slate-500 font-bold max-w-xs mx-auto">
            Nuestra IA está procesando 248 puntos de datos para generar su plan individual.
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
            Mientras tanto, mira lo que dicen nuestros clientes:
          </p>

          <div className="relative h-32 overflow-hidden">
            <motion.div
              animate={{
                y: [0, -400, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="space-y-4"
            >
              {[
                {
                  name: "@maria_silva",
                  text: "¡Fantástico! Acabo de terminar el programa de obediencia con mi perro, ¡me encanta! 👏",
                  img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                },
                {
                  name: "@juan_perez92",
                  text: "Increíble cómo cambió Gunther en solo 2 semanas. Muy recomendable.",
                  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                },
                {
                  name: "@ana_dogs_mx",
                  text: "Probé muchos cursos pero este es el único que funcionó para mi departamento.",
                  img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                },
                {
                  name: "@roberto_guia",
                  text: "Lo mejor fue aprender sin gritos. Mi perro ahora confía más en mí.",
                  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-card rounded-2xl p-4 shadow-sm border border-primary/10 flex items-start gap-3">
                  <img
                    src={testimonial.img}
                    alt="Cliente"
                    className="w-10 h-10 rounded-full object-cover border border-primary/20"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-xs">{testimonial.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
