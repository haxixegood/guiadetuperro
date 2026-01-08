import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface DiscountRevealProps {
    onContinue: () => void;
}

export default function DiscountReveal({ onContinue }: DiscountRevealProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress from 0 to 80
        const duration = 1500;
        const target = 80;
        const stepTime = duration / target;

        let current = 0;
        const timer = setInterval(() => {
            current += 1;
            setProgress(current);
            if (current >= target) clearInterval(timer);
        }, stepTime);

        return () => clearInterval(timer);
    }, []);

    // Circular Progress Params
    const radius = 80;
    const stroke = 16;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="w-full max-w-md mx-auto min-h-screen flex flex-col items-center justify-between pt-20 pb-12 px-6 font-sans bg-white relative overflow-hidden text-[#1A1A1A]">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2 mt-4 relative z-10"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-16 h-16 mx-auto bg-[#F9F9F9] rounded-full flex items-center justify-center mb-6"
                >
                    <CheckCircle2 className="w-8 h-8 text-[#FFD700]" />
                </motion.div>

                <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight leading-none">
                    Análisis Finalizado
                </h1>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Perfil completado con éxito
                </p>
            </motion.div>

            {/* Main Content Card: Gauge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-[#F0F0F0] flex flex-col items-center justify-center space-y-6 relative z-10"
            >
                {/* Context */}
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                    Nivel de compatibilidad con el<br />Protocolo Sync
                </span>

                {/* Circular Gauge */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                    {/* SVG Circle */}
                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90"
                    >
                        {/* Background Circle */}
                        <circle
                            stroke="#F5F5F5"
                            strokeWidth={stroke}
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        {/* Progress Circle */}
                        <circle
                            stroke="#FFD700"
                            strokeWidth={stroke}
                            strokeDasharray={circumference + ' ' + circumference}
                            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.1s linear' }}
                            strokeLinecap="round"
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black text-[#1A1A1A] tracking-tighter">
                            {progress}%
                        </span>
                        <span className="text-xs font-bold text-[#FFD700] uppercase tracking-widest mt-1">
                            Alta Compatibilidad
                        </span>
                    </div>

                    {/* Decorative Element */}
                    <div className="absolute top-0 right-10">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-6 h-6 text-[#FFD700]"
                        >
                            ⚡
                        </motion.div>
                    </div>
                </div>

                <div className="text-center px-4">
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        Según las respuestas, tu perro es el candidato ideal para el método sin castigos.
                    </p>
                </div>

            </motion.div>

            {/* CTA Button */}
            <div className="w-full relative z-20">
                <Button
                    onClick={onContinue}
                    className="w-full h-16 rounded-full bg-[#FFD700] hover:bg-[#F0C000] text-[#1A1A1A] text-lg font-black shadow-[0_10px_30px_rgba(255,215,0,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    VER MI PLAN PERSONALIZADO
                </Button>
                <p className="text-center text-[10px] text-gray-300 font-bold mt-4 uppercase tracking-widest">
                    Plan generado por IA basado en etología canina
                </p>
            </div>

        </div>
    );
}
