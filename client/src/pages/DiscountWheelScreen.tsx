import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { useState, useEffect } from 'react';
import { Gift, RotateCw } from 'lucide-react';

const DISCOUNT_PRIZES = [
  { discount: 35, color: 'from-blue-500 to-blue-600' },
  { discount: 45, color: 'from-purple-500 to-purple-600' },
  { discount: 55, color: 'from-pink-500 to-pink-600' },
  { discount: 40, color: 'from-green-500 to-green-600' },
  { discount: 50, color: 'from-orange-500 to-orange-600' },
  { discount: 60, color: 'from-red-500 to-red-600' },
  { discount: 35, color: 'from-cyan-500 to-cyan-600' },
  { discount: 48, color: 'from-indigo-500 to-indigo-600' },
];

export default function DiscountWheelScreen() {
  const { updateQuizData, goToNextStep } = useQuiz();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const selectedPrize = DISCOUNT_PRIZES[selectedIndex];
  
  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    
    // Simular spin da roleta
    const spins = Math.floor(Math.random() * 5) + 5; // 5-9 voltas
    const randomIndex = Math.floor(Math.random() * DISCOUNT_PRIZES.length);
    
    let currentRotation = 0;
    const rotationPerItem = 360 / DISCOUNT_PRIZES.length;
    const finalRotation = spins * 360 + (randomIndex * rotationPerItem);
    
    const interval = setInterval(() => {
      currentRotation += 20;
      if (currentRotation >= finalRotation) {
        clearInterval(interval);
        setSelectedIndex(randomIndex);
        setIsSpinning(false);
        setShowResult(true);
      }
    }, 30);
  };
  
  const claimDiscount = () => {
    updateQuizData({ 
      discountClaimed: true,
      selectedGift: `${selectedPrize.discount}% OFF`
    });
    goToNextStep();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full space-y-8 text-center"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Gift className="w-16 h-16 mx-auto text-accent animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-bold">
            Espera! Você ganhou um prêmio! 🎁
          </h1>
          <p className="text-lg text-muted-foreground">
            Gire a roleta e descubra seu desconto extra
          </p>
        </motion.div>
        
        {/* Wheel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full max-w-sm mx-auto aspect-square"
        >
          {/* Wheel container */}
          <motion.div
            animate={{ rotate: isSpinning ? 360 : selectedIndex * (360 / DISCOUNT_PRIZES.length) }}
            transition={{ duration: isSpinning ? 3 : 0.3 }}
            className="w-full h-full relative"
          >
            {/* Wheel segments */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-2xl"
            >
              {DISCOUNT_PRIZES.map((prize, index) => {
                const angle = (360 / DISCOUNT_PRIZES.length) * index;
                const startAngle = (angle * Math.PI) / 180;
                const endAngle = ((angle + 360 / DISCOUNT_PRIZES.length) * Math.PI) / 180;
                
                const x1 = 200 + 180 * Math.cos(startAngle);
                const y1 = 200 + 180 * Math.sin(startAngle);
                const x2 = 200 + 180 * Math.cos(endAngle);
                const y2 = 200 + 180 * Math.sin(endAngle);
                
                const largeArc = 360 / DISCOUNT_PRIZES.length > 180 ? 1 : 0;
                
                return (
                  <g key={index}>
                    <path
                      d={`M 200 200 L ${x1} ${y1} A 180 180 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={`url(#gradient-${index})`}
                      stroke="white"
                      strokeWidth="3"
                    />
                    <defs>
                      <linearGradient
                        id={`gradient-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={prize.color.split(' ')[1]} />
                        <stop offset="100%" stopColor={prize.color.split(' ')[3]} />
                      </linearGradient>
                    </defs>
                    
                    {/* Text */}
                    <text
                      x={200 + 120 * Math.cos((startAngle + endAngle) / 2)}
                      y={200 + 120 * Math.sin((startAngle + endAngle) / 2)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="24"
                      fontWeight="bold"
                      className="pointer-events-none"
                    >
                      {prize.discount}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>
          
          {/* Center pointer */}
          <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-accent mt-4" />
          </div>
          
          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-lg">
              <Gift className="w-10 h-10 text-accent" />
            </div>
          </div>
        </motion.div>
        
        {/* Result */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-accent to-primary text-white rounded-3xl p-8 shadow-2xl">
              <p className="text-lg mb-2">Você ganhou</p>
              <p className="text-6xl font-black">{selectedPrize.discount}% OFF</p>
              <p className="text-sm mt-2">Desconto adicional para sua compra!</p>
            </div>
            
            <Button
              onClick={claimDiscount}
              size="lg"
              className="w-full quiz-button text-xl py-6"
            >
              Usar Meu Desconto
            </Button>
          </motion.div>
        )}
        
        {/* Spin button */}
        {!showResult && (
          <motion.button
            onClick={spinWheel}
            disabled={isSpinning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto flex items-center gap-3 bg-gradient-to-r from-accent to-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'Girando...' : 'Girar Roleta'}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
