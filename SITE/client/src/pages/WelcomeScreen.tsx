import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { motion } from 'framer-motion';

export default function WelcomeScreen() {
  const { goToNextStep } = useQuiz();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center space-y-8"
      >
        {/* Badge de prova social */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="inline-block bg-card rounded-full px-6 py-3 shadow-lg"
        >
          <p className="text-sm font-medium text-muted-foreground">
            Ya hemos ayudado a más de{' '}
            <span className="text-primary font-bold">3 millones</span> de tutores
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            a comprender mejor el comportamiento de sus perros
          </p>
        </motion.div>

        {/* Título principal */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            ¿Por qué tantos perros parecen no entender a sus tutores?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground"
          >
            Descubre si pequeños errores del día a día están afectando la relación
            con tu perro
          </motion.p>
        </div>

        {/* Imagem ilustrativa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop"
            alt="Perro confundido ladeando la cabeza"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-4"
        >
          <Button
            onClick={goToNextStep}
            size="lg"
            className="quiz-button text-xl px-12 py-6 h-auto"
          >
            Descubrir ahora
          </Button>
        </motion.div>

        {/* Texto legal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-xs text-muted-foreground max-w-md mx-auto"
        >
          Al hacer clic en “Descubrir ahora”, confirmo que he leído y acepto la{' '}
          <a href="#" className="text-primary hover:underline">
            Política de Privacidad
          </a>{' '}
          y los{' '}
          <a href="#" className="text-primary hover:underline">
            Términos y Condiciones
          </a>
          .
        </motion.p>
      </motion.div>
    </div>
  );
}
