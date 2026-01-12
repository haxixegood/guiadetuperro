import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Gift, Zap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RevelationScreen() {
    const { handleAnswer } = useQuiz();
    const [phase, setPhase] = useState<'diagnosis' | 'revelation'>('diagnosis');
    const [showBonuses, setShowBonuses] = useState(false);

    useEffect(() => {
        // Phase transition: 3s for diagnosis, then move to revelation
        const timer = setTimeout(() => {
            setPhase('revelation');
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    const handleReveal = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#28a745', '#FFD700', '#ffffff']
        });
        setShowBonuses(true);
    };

    const bonuses = [
        { title: 'Guía Adiós Ansiedad', desc: 'Elimina el estrés por soledad.', icon: '3d-bonus-anxiety' },
        { title: 'Audio Calma Instantánea', desc: 'Sonidos de alta frecuencia para relajar.', icon: '3d-bonus-audio' },
        { title: 'Checklist Casa Limpia', desc: 'Protocolo para accidentes de higiene.', icon: '3d-bonus-clean' }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-[#1A1A1A] overflow-x-hidden">

            {/* Fase 1: El Diagnóstico (Above the Fold) */}
            <section className="min-h-screen flex flex-col items-center justify-center px-[20px] text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative mb-8"
                >
                    {/* Circular Graph: 88% Match */}
                    <div className="w-[180px] h-[180px] rounded-full border-[10px] border-gray-100 flex items-center justify-center relative">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                                cx="90" cy="90" r="80"
                                fill="transparent"
                                stroke="#28a745"
                                strokeWidth="10"
                                strokeDasharray="502.6"
                                strokeDashoffset="60" // ~88%
                                strokeLinecap="round"
                                className="transition-all duration-[2000ms] ease-out"
                            />
                        </svg>
                        <div className="flex flex-col items-center">
                            <span className="text-[42px] font-[900] text-[#28a745]">88%</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Compatibilidad</span>
                        </div>
                    </div>

                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-2 -right-2 bg-[#28a745] text-white p-2 rounded-full shadow-lg"
                    >
                        <CheckCircle2 size={24} />
                    </motion.div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[28px] font-black leading-tight uppercase mb-4"
                >
                    ¡Análisis Completado! <br />
                    <span className="text-[#28a745]">Tu perro</span> es el candidato ideal
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-gray-500 font-medium max-w-xs"
                >
                    El perfil analizado muestra una respuesta del 98.2% al Método Moderno Sin Castigos.
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-12 text-gray-300"
                >
                    <Zap size={32} fill="currentColor" />
                </motion.div>
            </section>

            {/* Fase 2: El Regalo Sorpresa */}
            <section className="min-h-screen flex flex-col items-center justify-center px-[20px] bg-gray-50 relative py-20">
                <div className="text-center mb-12">
                    <h2 className="text-[24px] font-[900] uppercase tracking-tighter">
                        REGALO SORPRESA <br />
                        <span className="text-[#DAA520]">DESBLOQUEADO</span>
                    </h2>
                </div>

                <motion.div
                    whileHover={{ scale: 1.1 }}
                    animate={!showBonuses ? {
                        scale: [1, 1.05, 1],
                        rotate: [0, -2, 2, 0]
                    } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    onClick={handleReveal}
                    className="relative cursor-pointer mb-12"
                >
                    <div className="w-[180px] h-[180px] bg-white rounded-3xl shadow-2xl flex items-center justify-center border-4 border-[#FFD700] relative overflow-hidden">
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/20 to-transparent"
                        />
                        <Gift size={80} className="text-[#DAA520] relative z-10" />
                    </div>
                    {!showBonuses && (
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1A1A1A] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-bounce">
                            Toca para abrir
                        </div>
                    )}
                </motion.div>

                {/* Fase 3: Los Bonus (Conditional) */}
                <div className="w-full max-w-sm space-y-4">
                    {showBonuses && bonuses.map((bonus, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.3 }}
                            className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-gray-100 shadow-sm"
                        >
                            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-[#DAA520]">
                                <Sparkles size={24} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-[14px] uppercase">{bonus.title}</h4>
                                <p className="text-[12px] text-gray-400">{bonus.desc}</p>
                            </div>
                            <div className="bg-[#1A1A1A] text-white text-[10px] font-black px-2 py-0.5 rounded">
                                GRATIS
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Fase 4: Premium CTA */}
                {showBonuses && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-16 w-full max-w-sm flex flex-col items-center"
                    >
                        <Button
                            onClick={() => handleAnswer('next')}
                            className="w-full h-16 rounded-[50px] bg-[#FFD700] hover:bg-[#F0C000] text-[#1A1A1A] font-black text-[18px] uppercase shadow-[0px_10px_30px_rgba(255,215,0,0.3)] relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 -skew-x-[45deg] translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                            VER MI PLAN
                        </Button>
                        <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Oferta limitada para nuevos tutores
                        </p>
                    </motion.div>
                )}
            </section>
        </div>
    );
}
