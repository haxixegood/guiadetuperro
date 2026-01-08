import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DiscountRevealProps {
    onContinue: () => void;
}

export default function DiscountReveal({ onContinue }: DiscountRevealProps) {
    const [discount, setDiscount] = useState(0);
    const [showFinalMessage, setShowFinalMessage] = useState(false);

    useEffect(() => {
        // Animate discount from 0 to 53
        const duration = 2000; // 2 seconds
        const steps = 53;
        const stepDuration = duration / steps;

        let current = 0;
        const interval = setInterval(() => {
            current++;
            setDiscount(current);

            if (current >= 80) {
                clearInterval(interval);
                setTimeout(() => setShowFinalMessage(true), 500);
            }
        }, stepDuration);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto space-y-12 py-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity }
                    }}
                    className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center border-4 border-primary"
                >
                    <Sparkles className="w-10 h-10 text-primary" />
                </motion.div>

                <h1 className="text-3xl md:text-4xl font-black glow-text-yellow uppercase leading-tight">
                    ¡RECOMPENSA DESBLOQUEADA!
                </h1>
                <p className="text-base text-white/70">
                    Por completar el análisis completo de tu perrhijo...
                </p>
            </motion.div>

            {/* Discount Display */}
            <div className="organic-card p-8 md:p-10 text-center space-y-6 bg-primary/5 border-primary/30">
                <div className="space-y-2">
                    <TrendingDown className="w-10 h-10 mx-auto text-primary" />
                    <p className="text-xs font-black text-white/60 uppercase tracking-widest">
                        Descuento Exclusivo Activado
                    </p>
                </div>

                {/* Animated Discount Number */}
                <motion.div
                    animate={{
                        scale: discount >= 80 ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.5 }}
                    className="space-y-1"
                >
                    <div className="flex items-center justify-center gap-2">
                        <motion.span
                            key={discount}
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-7xl md:text-8xl font-black text-primary"
                        >
                            {discount}%
                        </motion.span>
                    </div>
                    <p className="text-xl font-black text-white uppercase">
                        DE DESCUENTO
                    </p>
                </motion.div>

                {/* Final Message */}
                {showFinalMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 pt-4 border-t border-white/10"
                    >
                        <p className="text-base font-bold text-white/80">
                            Este descuento es <span className="text-primary">válido solo hoy</span>
                        </p>
                        <div className="flex items-center justify-center gap-3 text-white/60">
                            <span className="line-through text-lg">$197 MXN</span>
                            <span className="text-3xl font-black text-primary animate-pulse">$39 MXN</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Continue Button */}
            {showFinalMessage && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pb-20"
                >
                    <Button
                        onClick={onContinue}
                        className="yellow-cta w-full py-8 text-xl font-black shimmer animate-pulse-glow"
                    >
                        ¡VER MI OFERTA ESPECIAL!
                    </Button>
                </motion.div>
            )}

            {/* Footer Note */}
            <div className="text-center">
                <p className="text-xs font-bold text-white/40">
                    🔒 Precio protegido por las próximas 24 horas
                </p>
            </div>
        </div>
    );
}
