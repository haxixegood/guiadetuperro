
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { CheckCircle2, Zap, Sparkles, AlertTriangle, ShieldCheck, User, PlayCircle, FileText, Headphones } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function ResultScreen() {
    const { quizData } = useQuiz();
    const [, setLocation] = useLocation();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(88), 300); // 88% Match
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full max-w-md mx-auto flex flex-col pt-4 px-4 font-sans relative pb-24">

            {/* HEADER - Clean & Tight */}
            <div className="text-center mb-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-12 h-12 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-3 text-green-500"
                >
                    <CheckCircle2 className="w-6 h-6" />
                </motion.div>

                <h1 className="text-2xl font-black text-[#1A1A1A] leading-tight mb-1 uppercase">
                    ANÁLISIS COMPLETADO
                </h1>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    PERFIL DE {quizData.name || 'TU PERRITO'}
                </h2>
            </div>

            <div className="space-y-4 relative z-10 w-full">

                {/* 1. HERO CARD - COMPATIBILITY */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4"
                >
                    <div className="space-y-1">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Compatibilidad Detectada
                        </h3>
                        <div className="flex items-center justify-center gap-2 text-yellow-500">
                            <Zap className="w-3 h-3 fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-wide">Protocolo Sync</span>
                        </div>
                    </div>

                    {/* Circular Chart - Fixed Layout */}
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="#F3F4F6" strokeWidth="8" fill="transparent" />
                            <motion.circle
                                cx="80" cy="80" r="70"
                                stroke="#FFD700" strokeWidth="8" strokeLinecap="round" fill="transparent"
                                strokeDasharray={440}
                                strokeDashoffset={440 - (440 * progress) / 100}
                                initial={{ strokeDashoffset: 440 }}
                                animate={{ strokeDashoffset: 440 - (440 * 88) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                            <span className="text-5xl font-black text-[#1A1A1A] tracking-tighter">{progress}%</span>
                            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest bg-yellow-50 px-2 py-1 rounded-full mt-1">
                                ALTA
                            </span>
                        </div>
                    </div>

                    <p className="text-xs font-medium text-gray-500 leading-relaxed max-w-xs">
                        Según las respuestas, <span className="font-bold text-black">{quizData.name || 'tu perro'}</span> es el candidato ideal para el método sin castigos.
                    </p>
                </motion.div>

                {/* 2. STATS GRID */}
                <div className="grid grid-cols-2 gap-3">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-[#FFD700]" />
                            <span className="text-[10px] font-black uppercase text-gray-900">Potencial</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-[#FFD700] w-[95%]" />
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium">Capacidad de aprendizaje: <span className="font-bold text-black">Excelente</span></p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-orange-400" />
                            <span className="text-[10px] font-black uppercase text-gray-900">Urgencia</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-orange-400 w-[85%]" />
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium">Corrección necesaria: <span className="font-bold text-black">Inmediata</span></p>
                    </motion.div>
                </div>

                {/* 3. WHAT YOU GET */}
                <div className="bg-gray-50 rounded-[24px] p-6 border border-gray-100">
                    <h3 className="text-center text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                        TU PLAN INCLUYE
                    </h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                        {[
                            { label: 'Garantía 7 Días', sub: 'Riesgo Cero' },
                            { label: 'Soporte VIP', sub: 'Expertos' },
                            { label: 'Acceso Vitalicio', sub: 'Para Siempre' },
                            { label: 'Método Sync', sub: 'Paso a Paso' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-[#FFD700] rounded-full" />
                                <div>
                                    <p className="text-[10px] font-black uppercase text-[#1A1A1A]">{item.label}</p>
                                    <p className="text-[9px] text-gray-400 font-medium">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* CTA SECTION - Clean, No Sticky to avoid banner issues */}
            <div className="w-full mt-6 pb-8">
                <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <Button
                        onClick={() => setLocation('/sales')}
                        className="w-full h-16 rounded-full bg-[#FFD700] hover:bg-[#F0C000] text-[#1A1A1A] shadow-xl shadow-yellow-400/20 text-lg font-black tracking-widest uppercase flex flex-col items-center justify-center gap-0 leading-none"
                    >
                        <span className="mb-0.5">VER PLAN PERSONALIZADO</span>
                        <span className="text-[9px] font-bold text-black/60 tracking-[0.2em] ml-1">OFERTA LIMITADA</span>
                    </Button>
                </motion.div>
                <div className="flex items-center justify-center gap-2 mt-4 opacity-70">
                    <ShieldCheck className="w-3 h-3 text-green-600" />
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">
                        Garantía de Satisfacción 100%
                    </p>
                </div>
            </div>

        </div>
    );
}
