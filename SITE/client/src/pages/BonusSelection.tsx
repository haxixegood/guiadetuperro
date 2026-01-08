import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Gift, Zap } from 'lucide-react';

interface BonusOption {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface BonusSelectionProps {
    onBonusSelected: (bonusId: string) => void;
}

const BONUS_OPTIONS: BonusOption[] = [
    {
        id: 'anxiety-guide',
        title: 'Guía: Adiós Ansiedad',
        description: 'Técnicas probadas para calmar a tu perro en situaciones de estrés',
        icon: <Sparkles className="w-6 h-6" />
    },
    {
        id: 'calming-audio',
        title: 'Audio de Calma Instantánea',
        description: 'Frecuencias especiales que relajan a tu perro en minutos',
        icon: <Zap className="w-6 h-6" />
    },
    {
        id: 'hygiene-checklist',
        title: 'Checklist: Casa Limpia',
        description: 'Sistema paso a paso para eliminar accidentes en casa',
        icon: <Gift className="w-6 h-6" />
    }
];

export default function BonusSelection({ onBonusSelected }: BonusSelectionProps) {
    const [selectedBonus, setSelectedBonus] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Trigger confetti on mount
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleSelect = (bonusId: string) => {
        setSelectedBonus(bonusId);
    };

    const handleClaim = () => {
        if (selectedBonus) {
            onBonusSelected(selectedBonus);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-10 py-10">
            {/* Confetti Effect */}
            <AnimatePresence>
                {showConfetti && (
                    <div className="fixed inset-0 pointer-events-none z-50">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    y: -20,
                                    x: Math.random() * window.innerWidth,
                                    opacity: 1,
                                    rotate: 0
                                }}
                                animate={{
                                    y: window.innerHeight + 100,
                                    rotate: 360,
                                    opacity: 0
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    delay: Math.random() * 0.5
                                }}
                                className="absolute w-3 h-3 bg-primary rounded-full"
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center border-4 border-primary"
                >
                    <Sparkles className="w-12 h-12 text-primary" />
                </motion.div>

                <div className="space-y-3">
                    <h1 className="text-4xl md:text-6xl font-black glow-text-yellow uppercase leading-tight">
                        ¡FELICIDADES!
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-white/80">
                        Desbloqueaste <span className="text-primary">3 bonos exclusivos</span>
                    </p>
                    <p className="text-base text-white/60 max-w-xl mx-auto">
                        Elige cuál quieres recibir <span className="text-white italic">PRIMERO</span> para acelerar los resultados con tu perrhijo
                    </p>
                </div>
            </motion.div>

            {/* Bonus Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BONUS_OPTIONS.map((bonus, index) => (
                    <motion.button
                        key={bonus.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSelect(bonus.id)}
                        className={`
              organic-card p-6 text-left space-y-4 transition-all duration-300
              ${selectedBonus === bonus.id
                                ? 'border-primary/40 bg-primary/10 shadow-[0_0_30px_rgba(255,234,0,0.3)]'
                                : 'border-white/10 hover:border-primary/20'
                            }
            `}
                    >
                        <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${selectedBonus === bonus.id ? 'bg-primary text-black' : 'bg-white/10 text-primary'}
              transition-colors duration-300
            `}>
                            {bonus.icon}
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-black uppercase text-white">
                                {bonus.title}
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed">
                                {bonus.description}
                            </p>
                        </div>

                        {selectedBonus === bonus.id && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2 text-primary text-sm font-black"
                            >
                                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-black text-xs">✓</span>
                                </div>
                                SELECCIONADO
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Claim Button */}
            <div className="pt-6">
                <Button
                    onClick={handleClaim}
                    disabled={!selectedBonus}
                    className="yellow-cta w-full py-8 text-base md:text-xl font-black shimmer animate-pulse-glow disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    {selectedBonus ? '¡RECLAMAR AHORA!' : 'Selecciona un bono'}
                </Button>
            </div>

            {/* Footer Note */}
            <div className="text-center">
                <p className="text-xs font-bold text-white/40 italic">
                    *Los otros 2 bonos también están incluidos en tu paquete completo
                </p>
            </div>
        </div>
    );
}
