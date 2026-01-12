import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { trackRevelation } from '@/lib/tracking';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Gift, Zap, Sparkles, TrendingUp, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RevelationScreen() {
    const { handleAnswer, quizData } = useQuiz();
    const [giftOpened, setGiftOpened] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const dogName = quizData.name || 'tu perro';

    const handleOpenGift = () => {
        // Confetti explosion
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#2ecc71', '#FFD700', '#ffffff', '#3498db']
        });

        setGiftOpened(true);

        // Show content after animation
        setTimeout(() => {
            setShowContent(true);
            // Track revelation view
            trackRevelation(dogName, 88);
        }, 800);
    };

    const bonuses = [
        { title: 'Guía Adiós Ansiedad', desc: 'Control total del estrés', value: '$199 MXN' },
        { title: 'Audio Calma Instantánea', desc: 'Relajación profunda', value: '$149 MXN' },
        { title: 'Checklist Casa Limpia', desc: 'Higiene infalible', value: '$99 MXN' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-green-50/30 to-white font-sans text-[#1A1A1A] overflow-x-hidden">

            <AnimatePresence mode="wait">
                {!giftOpened ? (
                    /* FASE 1: GIFT BOX - GAMIFICACIÓN */
                    <motion.section
                        key="gift"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="space-y-8"
                        >
                            <h2 className="text-[28px] md:text-[36px] font-black uppercase leading-tight">
                                ¡Análisis Completado!<br />
                                <span className="text-[#2ecc71]">Toca para descubrir</span>
                            </h2>

                            {/* 3D Gift Box - Interactive */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleOpenGift}
                                className="cursor-pointer relative"
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <img
                                        src="/assets/3d-revelation-gift.png"
                                        alt="Gift"
                                        className="w-64 h-64 mx-auto object-contain drop-shadow-2xl"
                                        style={{ mixBlendMode: 'multiply' }}
                                    />
                                </motion.div>

                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#2ecc71]/20 via-[#FFD700]/20 to-[#2ecc71]/20 blur-3xl -z-10 animate-pulse" />
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-[16px] text-gray-600 font-medium max-w-sm mx-auto"
                            >
                                Hemos preparado algo especial para <span className="font-black text-[#2ecc71]">{dogName}</span>
                            </motion.p>

                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-[14px] font-bold text-gray-400 uppercase tracking-widest"
                            >
                                👆 Toca para abrir
                            </motion.div>
                        </motion.div>
                    </motion.section>
                ) : (
                    /* FASE 2: INFOGRAPHIC REVEAL - RESULTADO + BONUSES */
                    <motion.section
                        key="reveal"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="min-h-screen px-6 py-16 space-y-12"
                    >
                        {showContent && (
                            <>
                                {/* INFOGRAPHIC HEADER */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center space-y-4"
                                >
                                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-50 border-2 border-[#2ecc71] rounded-full">
                                        <CheckCircle2 className="w-5 h-5 text-[#2ecc71]" />
                                        <span className="text-[12px] font-black uppercase tracking-widest text-[#2ecc71]">Diagnóstico Completo</span>
                                    </div>

                                    <h1 className="text-[32px] md:text-[40px] font-black leading-tight uppercase">
                                        ¡Increíble! <span className="text-[#2ecc71]">{dogName}</span><br />
                                        es candidato ideal
                                    </h1>
                                </motion.div>

                                {/* MODERN INFOGRAPHIC - 88% RESULT */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="max-w-md mx-auto"
                                >
                                    <div className="bg-gradient-to-br from-[#2ecc71]/10 to-[#27ae60]/10 p-8 rounded-3xl border-2 border-[#2ecc71]/30 shadow-xl relative overflow-hidden">
                                        {/* Background pattern */}
                                        <div className="absolute inset-0 opacity-5">
                                            <div className="absolute inset-0" style={{
                                                backgroundImage: 'radial-gradient(circle, #2ecc71 1px, transparent 1px)',
                                                backgroundSize: '20px 20px'
                                            }} />
                                        </div>

                                        <div className="relative z-10 space-y-6">
                                            {/* Main Score */}
                                            <div className="text-center">
                                                <div className="inline-flex items-baseline gap-2">
                                                    <TrendingUp className="w-12 h-12 text-[#2ecc71]" />
                                                    <span className="text-[80px] font-black text-[#2ecc71] leading-none">88</span>
                                                    <span className="text-[40px] font-black text-[#2ecc71]">%</span>
                                                </div>
                                                <p className="text-[14px] font-bold text-gray-600 uppercase tracking-widest mt-2">
                                                    Compatibilidad con el Método
                                                </p>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: '88%' }}
                                                        transition={{ duration: 1.5, delay: 0.5 }}
                                                        className="h-full bg-gradient-to-r from-[#2ecc71] to-[#27ae60] rounded-full"
                                                    />
                                                </div>
                                                <div className="flex justify-between text-[11px] font-bold text-gray-500">
                                                    <span>Bajo</span>
                                                    <span>Medio</span>
                                                    <span className="text-[#2ecc71]">Alto ✓</span>
                                                </div>
                                            </div>

                                            {/* Key Metrics */}
                                            <div className="grid grid-cols-3 gap-3 pt-4">
                                                {[
                                                    { label: 'Edad', value: 'Ideal', icon: '🐕' },
                                                    { label: 'Energía', value: 'Óptima', icon: '⚡' },
                                                    { label: 'Urgencia', value: 'Alta', icon: '🎯' }
                                                ].map((metric, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.7 + i * 0.1 }}
                                                        className="bg-white/60 backdrop-blur-sm p-3 rounded-xl text-center"
                                                    >
                                                        <div className="text-2xl mb-1">{metric.icon}</div>
                                                        <div className="text-[10px] font-bold text-gray-500 uppercase">{metric.label}</div>
                                                        <div className="text-[13px] font-black text-[#2ecc71]">{metric.value}</div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* BONUSES SECTION */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="max-w-md mx-auto space-y-6"
                                >
                                    <div className="text-center">
                                        <div className="inline-flex items-center gap-2 mb-4">
                                            <Award className="w-6 h-6 text-[#FFD700]" />
                                            <h3 className="text-[24px] font-black uppercase">Bonos Desbloqueados</h3>
                                        </div>
                                        <p className="text-[14px] text-gray-600 font-medium">
                                            Valorados en <span className="line-through">$447 MXN</span>, hoy <span className="text-[#2ecc71] font-black">GRATIS</span>
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {bonuses.map((bonus, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.7 + i * 0.1 }}
                                                className="bg-white p-4 rounded-2xl border-2 border-green-100 shadow-sm flex items-center gap-4"
                                            >
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#2ecc71] to-[#27ae60] rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <Sparkles className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-black text-[14px] uppercase">{bonus.title}</h4>
                                                    <p className="text-[12px] text-gray-500 font-medium">{bonus.desc}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] text-gray-400 line-through">{bonus.value}</div>
                                                    <div className="text-[12px] font-black text-[#2ecc71]">GRATIS</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* CTA BUTTON */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                    className="max-w-md mx-auto"
                                >
                                    <Button
                                        onClick={() => handleAnswer('continue')}
                                        className="w-full h-20 rounded-full bg-gradient-to-r from-[#2ecc71] to-[#27ae60] hover:from-[#27ae60] hover:to-[#2ecc71] text-white text-[20px] font-black uppercase shadow-[0_20px_60px_rgba(46,204,113,0.4)] relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                                        <span className="relative z-10">Ver Mi Plan Personalizado →</span>
                                    </Button>

                                    <p className="text-center text-[12px] text-gray-500 font-bold mt-4">
                                        🔒 Acceso inmediato • Sin compromisos
                                    </p>
                                </motion.div>
                            </>
                        )}
                    </motion.section>
                )}
            </AnimatePresence>

        </div>
    );
}
