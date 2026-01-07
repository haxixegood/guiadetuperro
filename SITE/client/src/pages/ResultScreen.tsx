import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { Award, TrendingUp, Heart, Star } from 'lucide-react';

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
    if (quizData.motivation === 'no-punish') return 'Comprometido';
    return 'En aprendizaje';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-16 pb-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full space-y-8"
      >
        {/* Success badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl"
        >
          <Award className="w-10 h-10 text-white" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            ¡Tu plan personalizado para{' '}
            {quizData.name || 'tu perrito'} está listo!
          </h2>
          <p className="text-lg text-muted-foreground">
            Creamos un programa de entrenamiento especialmente para ti
          </p>
        </motion.div>

        {/* Result card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-3xl p-8 shadow-2xl border-2 border-primary/20"
        >
          {/* Dog image (GENÉRICA) */}
          <div className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop"
              alt="Perrito feliz"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-background rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Talla</p>
              <p className="font-bold text-lg">
                {sizeLabel}
              </p>
            </div>

            <div className="bg-background rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Edad</p>
              <p className="font-bold text-lg">
                {quizData.age === '0-6' ? 'Cachorro' : quizData.age === '1-7' ? 'Adulto' : 'Senior'}
              </p>
            </div>

            <div className="bg-background rounded-xl p-4 text-center col-span-2">
              <p className="text-sm text-muted-foreground mb-1">
                Retos identificados
              </p>
              <p className="font-bold text-lg text-accent">
                {issuesCount} comportamientos detectados
              </p>
            </div>
          </div>

          {/* Level badge */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-4 text-center text-white">
            <p className="text-sm opacity-90 mb-1">Nivel actual</p>
            <p className="font-bold text-2xl flex items-center justify-center gap-2">
              <Star className="w-6 h-6" />
              {getLevel()}
            </p>
          </div>
        </motion.div>

        {/* URGENCY DIAGNOSIS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-700 mb-2">Diagnóstico de Alerta ⚠️</h3>
              <p className="text-slate-700 leading-relaxed">
                El perfil de <strong>{quizData.name || 'tu perro'}</strong> indica una tendencia a desarrollar
                comportamientos ansiosos y destructivos si no se corrigen en las próximas semanas.
                <br /><br />
                Es crucial iniciar un protocolo de <strong>calma y límites positivos</strong> inmediatamente para evitar que estos hábitos se vuelvan permanentes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trainer section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                Aprovecha la experiencia de entrenadores profesionales
              </h3>
              <p className="text-sm text-muted-foreground">
                Entrenadores certificados con amplia experiencia
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {[
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Entrenador"
                className="w-16 h-16 rounded-full object-cover border-2 border-background shadow-md"
              />
            ))}
          </div>
        </motion.div>

        {/* Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 text-center"
        >
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="text-lg">
            <span className="font-bold">Previsión:</span>{' '}
            {quizData.name || 'Tu perrito'} aprenderá{' '}
            <span className="font-bold text-primary">9+ comandos</span> y
            corregirá comportamientos no deseados en{' '}
            <span className="font-bold text-accent">4 semanas</span>.
          </p>
        </motion.div>

        {/* Fixed bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4"
        >
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={goToNextStep}
              size="lg"
              className="quiz-button w-full"
            >
              Continuar al plan
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div >
  );
}
