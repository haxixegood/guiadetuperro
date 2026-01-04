import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { Heart } from 'lucide-react';

export default function EmpathyScreen() {
  const { goToNextStep } = useQuiz();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full space-y-8 text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl"
        >
          <Heart className="w-10 h-10 text-white fill-white" />
        </motion.div>
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Te entendemos perfectamente 💙
        </motion.h2>
        
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
       >
  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
    La mayoría de las personas que viven con un perrito pasan por momentos de duda,
    frustración o cansancio en algún punto.
  </p>

  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
    No estás solo en este proceso. Con el enfoque correcto, es posible mejorar la
    convivencia y fortalecer la relación con tu perrito, paso a paso.
  </p>
</motion.div>
        
        {/* Images grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {[
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg"
            >
              <img src={src} alt="Pessoa feliz" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={goToNextStep}
            size="lg"
            className="quiz-button"
          >
            Continuar
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
