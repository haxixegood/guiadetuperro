import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';

interface SocialProofScreenProps {
  breed?: string;
}

export default function SocialProofScreen({ breed = 'cachorro' }: SocialProofScreenProps) {
  const { goToNextStep } = useQuiz();
  
  // Formatar nome da raça
  const breedName = breed === 'skip' ? 'cachorro' : breed;
  const count = Math.floor(Math.random() * 50 + 150); // 150-200k
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full space-y-8 text-center"
      >
        {/* Main image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mx-auto w-full max-w-md h-64 rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&h=400&fit=crop"
            alt={breedName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
        
        {/* Surrounding images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          {[
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=150&h=150&fit=crop',
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="w-20 h-20 rounded-full overflow-hidden border-4 border-background shadow-lg"
            >
              <img src={src} alt="Cachorro feliz" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Text */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  className="space-y-4"
>
  <h2 className="text-3xl md:text-4xl font-bold">
    Más de <span className="text-primary">{count} mil personas</span> ya han mejorado la relación con su perrito
  </h2>

  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
    Personas como tú, que en algún momento tuvieron dudas, frustraciones o preguntas… y decidieron buscar una mejor forma de entender a su perrito.
  </p>
</motion.div>

        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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
