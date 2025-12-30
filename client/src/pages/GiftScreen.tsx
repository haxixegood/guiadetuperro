import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { useState } from 'react';
import { Gift, Sparkles, Star } from 'lucide-react';

const gifts = [
  { id: 'star', name: 'Star Edition', icon: Star, color: 'from-blue-500 to-cyan-500' },
  { id: 'golden', name: 'Golden Gift', icon: Gift, color: 'from-amber-500 to-orange-500' },
  { id: 'mystery', name: 'Mystery Box', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
];

export default function GiftScreen() {
  const { goToNextStep, updateQuizData } = useQuiz();
  const [selectedGift, setSelectedGift] = useState(1); // Golden Gift al centro
  const [claimed, setClaimed] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setSelectedGift((prev) => (prev + 1) % gifts.length);
    } else {
      setSelectedGift((prev) => (prev - 1 + gifts.length) % gifts.length);
    }
  };

  const handleClaim = () => {
    setClaimed(true);
    updateQuizData({ selectedGift: gifts[selectedGift].id });

    // Mostrar descuento después de la animación
    setTimeout(() => {
      setShowDiscount(true);
    }, 800);
  };

  const handleClaimDiscount = () => {
    updateQuizData({ discountClaimed: true });
    goToNextStep();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-16 bg-gradient-to-br from-background via-accent/5 to-primary/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full space-y-8 text-center"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Elige tu regalo de bienvenida
          </h2>
          <p className="text-lg text-muted-foreground">
            Desliza y elige tu regalo como bono de bienvenida para tu plan de entrenamiento
          </p>
        </motion.div>

        {/* Gift carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative h-96 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {!showDiscount ? (
              <motion.div key="gifts" className="relative w-full max-w-sm">
                {/* Navigation buttons */}
                <button
                  onClick={() => handleSwipe('right')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  ‹
                </button>

                <button
                  onClick={() => handleSwipe('left')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  ›
                </button>

                {/* Gift cards */}
                <div className="relative h-80">
                  {gifts.map((gift, index) => {
                    const offset = index - selectedGift;
                    const Icon = gift.icon;

                    return (
                      <motion.div
                        key={gift.id}
                        animate={{
                          x: offset * 100 + '%',
                          scale: offset === 0 ? 1 : 0.8,
                          opacity: Math.abs(offset) > 1 ? 0 : 1,
                          zIndex: offset === 0 ? 10 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div
                          className={`w-64 h-80 rounded-3xl bg-gradient-to-br ${gift.color} p-8 shadow-2xl flex flex-col items-center justify-center text-white`}
                        >
                          <Icon className="w-20 h-20 mb-4" />
                          <h3 className="text-2xl font-bold">{gift.name}</h3>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {gifts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedGift(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === selectedGift ? 'bg-primary w-8' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              // Discount reveal animation
              <motion.div
                key="discount"
                initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative"
              >
                <div className="w-80 h-96 rounded-3xl bg-gradient-to-br from-accent to-primary p-8 shadow-2xl flex flex-col items-center justify-center text-white relative overflow-hidden">
                  {/* Gift box opening animation */}
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: -100, opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-green-600 to-green-500 rounded-t-3xl"
                  />

                  {/* Discount text */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    className="text-center"
                  >
                    <p className="text-8xl font-black mb-2">53%</p>
                    <p className="text-4xl font-bold">OFF</p>
                  </motion.div>

                  {/* Confetti effect */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0, opacity: 1 }}
                      animate={{
                        y: [0, -200, -400],
                        x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                        opacity: [1, 1, 0],
                        rotate: [0, 360],
                      }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 1.5 }}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        background: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'][i % 4],
                        left: `${50 + (Math.random() - 0.5) * 20}%`,
                        top: '50%',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {!claimed ? (
            <Button onClick={handleClaim} size="lg" className="quiz-button text-xl px-12">
              Reclamar este regalo
            </Button>
          ) : showDiscount ? (
            <Button
              onClick={handleClaimDiscount}
              size="lg"
              className="quiz-button text-xl px-12 bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90"
            >
              Reclamar 53% de descuento
            </Button>
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}
