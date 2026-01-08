import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { Award, TrendingUp, Heart, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ResultScreen() {
  const { goToNextStep, quizData } = useQuiz();

  const issuesCount = quizData['daily-habits']?.length || 0;
  const sizeLabel = {
    chico: 'Pequeño',
    mediano: 'Mediano',
    grande: 'Grande'
  }[quizData.size as string] || 'No especificada';

  // Determinar nivel según el compromiso (simulado para el diagnóstico)
  const getLevel = () => {
    if (quizData.motivation === 'no-punish') return 'Máximo Potencial';
    return 'Comprometido';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-16 pb-32 bg-white relative paw-pattern">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full space-y-12 relative z-10"
      >
        {/* Success badge & Certified Seal */}
        <div className="relative mx-auto w-32 h-32">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-full h-full rounded-full bg-primary flex items-center justify-center shadow-2xl relative z-10"
          >
            <ShieldCheck className="w-16 h-16 text-white" />
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
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Diagnóstico listo para{' '}
            <span className="text-primary italic">{quizData.name || 'tu perrito'}</span>
          </h2>
        </div>

        {/* Result grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 shadow-2xl border border-slate-100 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner text-2xl">
                  {quizData.size === 'chico' ? '🐶' : quizData.size === 'mediano' ? '🐕' : '🐘'}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Perfil del Perro</p>
                  <p className="font-bold text-lg text-slate-800">{sizeLabel} • {quizData.age === '0-6' ? 'Cachorro' : 'Adulto'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-600">Nivel de Conexión</span>
                  <span className="text-primary font-black">{getLevel()}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '88%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-primary leading-snug">
                  Sincronización de comunicación compatible con el método ADIÓS LADRIDOS.
                </p>
              </div>
            </div>
          </motion.div>

          {/* URGENCY ALERT CARD */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 border-2 border-red-100 rounded-[2rem] p-8 shadow-xl flex flex-col gap-4"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-black text-red-700 leading-tight">Alerta de Comportamiento Permanente ⚠️</h3>
            <p className="text-sm text-red-900/70 leading-relaxed font-medium">
              El perfil de <strong>{quizData.name || 'tu perro'}</strong> indica una "Ventana de Corrección" crítica.
              <br /><br />
              Detectamos <span className="bg-red-100 px-1 rounded">{issuesCount} retos clave</span> que si no se tratan en los próximos 14 días, pueden cristalizarse como hábitos de por vida.
            </p>
            <div className="pt-2">
              <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-black animate-pulse uppercase tracking-wider">
                Diagnóstico Urgente
              </div>
            </div>
          </motion.div>
        </div>

        {/* Prediction & Trainers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-center gap-4">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Pronóstico</p>
            <p className="text-xl font-medium leading-snug italic">
              "{quizData.name || 'Tu perrito'} aprenderá más de <span className="text-primary font-black">9 comandos</span> y resolverá sus frustraciones en menos de 28 días siguiendo nuestro protocolo."
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl flex items-center gap-6">
            <div className="flex -space-x-4">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" className="w-14 h-14 rounded-full border-4 border-white shadow-lg" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" className="w-14 h-14 rounded-full border-4 border-white shadow-lg" />
            </div>
            <div>
              <p className="font-black text-slate-800 text-lg">Equipo de Élite</p>
              <p className="text-xs font-medium text-slate-500">Expertos listos para guiarte en cada paso.</p>
            </div>
          </div>
        </div>

        {/* CTA SPACER */}
        <div className="h-24" />

        {/* Floating bottom bar (Premium) */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-0 left-0 right-0 p-6 z-50"
        >
          <div className="max-w-xl mx-auto">
            <Button
              onClick={goToNextStep}
              size="lg"
              className="w-full h-20 text-2xl font-black rounded-3xl shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90 text-white border-none shimmer-button relative overflow-hidden"
            >
              <span className="relative z-10">Acceder a mi Plan →</span>
            </Button>
            <p className="text-center text-[10px] mt-4 font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <ShieldCheck className="w-3 h-3 text-green-500" /> Transacción Segura & Encriptada
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div >
  );
}
