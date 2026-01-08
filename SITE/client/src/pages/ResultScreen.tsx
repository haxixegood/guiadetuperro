
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
        <div className="min-h-screen bg-white text-[#1A1A1A] font-sans flex flex-col pt-4 pb-32 relative overflow-hidden">

            {/* HEADER */}
            <div className="w-full max-w-md mx-auto px-6 text-center mb-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 mb-2"
                >
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-[10px] font-black tracking-[0.2em] text-[#B8860B] uppercase">
                        LISTO
                    </span>
                </motion.div>

                <h1 className="text-3xl font-black text-[#1A1A1A] leading-none mb-1">
                    DIAGNÓSTICO DE
                </h1>
                <h2 className="text-3xl font-black text-[#FFD700] leading-none italic uppercase">
                    {quizData.name || 'TU PERRITO'}
                </h2>
            </div>

            <div className="w-full max-w-md mx-auto px-5 space-y-4 relative z-10">

                {/* 1. COMPATIBILITY CHART CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center gap-4"
                >
                    <div className="relative w-20 h-20 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="40" cy="40" r="36" stroke="#F3F4F6" strokeWidth="6" fill="transparent" />
                            <motion.circle
                                cx="40" cy="40" r="36"
                                stroke="#FFD700" strokeWidth="6" strokeLinecap="round" fill="transparent"
                                strokeDasharray={226}
                                strokeDashoffset={226 - (226 * progress) / 100}
                                initial={{ strokeDashoffset: 226 }}
                                animate={{ strokeDashoffset: 226 - (226 * 88) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-black">{progress}%</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Compatibilidad</h3>
                        <p className="text-xs font-medium text-gray-500 leading-snug">
                            El perfil de <span className="font-bold text-black">{quizData.name || 'tu perro'}</span> encaja perfectamente.
                        </p>
                    </div>
                </motion.div>

                {/* 2. ENERGY LEVEL */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
                        <h3 className="text-base font-black uppercase">NIVEL DE ENERGÍA</h3>
                    </div>
                    <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`h - 2 flex - 1 rounded - full ${i <= 4 ? 'bg-[#FFD700]' : 'bg-gray-100'} `} />
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 font-medium bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <span className="font-bold text-black">Alta Intensidad:</span> {quizData.name || 'Tu perro'} necesita canalizar esta energía para evitar destrucción.
                    </p>
                </motion.div>

                {/* 3. POTENTIAL */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <Sparkles className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
                        <h3 className="text-base font-black uppercase">POTENCIAL DE CAMBIO</h3>
                    </div>
                    <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`h - 2 flex - 1 rounded - full ${i <= 5 ? 'bg-[#FFD700]' : 'bg-gray-100'} `} />
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 font-medium bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <span className="font-bold text-black">Excelente:</span> Su edad y raza indican una neuroplasticidad ideal para aprender hoy.
                    </p>
                </motion.div>

                {/* 4. ALERT */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-yellow-50 rounded-[24px] p-6 border border-[#FFD700]/30"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-[#B8860B]" />
                        <h3 className="text-base font-black uppercase text-[#B8860B]">ALERTA DE BERRINCHUDO</h3>
                    </div>
                    <p className="text-xs text-[#856404] font-medium leading-relaxed">
                        Detectamos una fase de <span className="font-black">fijación conductual</span>. Si no actuamos en 7 días, corregir esto será 3x más difícil.
                    </p>
                </motion.div>

                {/* 5. AUTHORITY / TEAM */}
                <div className="pt-6 pb-4">
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-black text-[#1A1A1A] uppercase tracking-tight mb-4">
                            ESTO ES LO QUE OBTENDRÁS
                        </h3>
                        {/* Trainers Avatar Group */}
                        <div className="flex justify-center -space-x-4 mb-4">
                            <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                                <User className="w-8 h-8 text-gray-400 mt-2" />
                            </div>
                            <div className="w-12 h-12 rounded-full border-2 border-white bg-[#FFD700] shadow-sm flex items-center justify-center text-[10px] font-black">
                                EQUIPO
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: <ShieldCheck className="w-5 h-5 text-[#FFD700]" />, label: 'Garantía 7 Días', sub: 'Riesgo Cero' },
                            { icon: <User className="w-5 h-5 text-[#FFD700]" />, label: 'Soporte VIP', sub: 'Expertos Reales' },
                            { icon: <PlayCircle className="w-5 h-5 text-[#FFD700]" />, label: 'Acceso Vitalicio', sub: 'Nunca Expira' },
                            { icon: <FileText className="w-5 h-5 text-[#FFD700]" />, label: 'Método Sync', sub: 'Paso a Paso' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase text-[#1A1A1A]">{item.label}</p>
                                    <p className="text-[9px] text-gray-400">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* CTA SECTION - STICKY SAFE */}
            <div className="fixed bottom-0 left-0 right-0 p-5 pb-8 bg-white/95 backdrop-blur-md border-t border-gray-100 z-50">
                <div className="max-w-md mx-auto">
                    <Button
                        onClick={() => setLocation('/sales')}
                        className="w-full h-auto py-5 rounded-xl bg-[#FFD700] hover:bg-[#F0C000] text-[#1A1A1A] shadow-[0_8px_25px_rgba(255,215,0,0.3)] transition-all hover:scale-[1.01] active:scale-[0.99] border-b-4 border-[#E5C100] active:border-b-0 active:translate-y-1 flex flex-col gap-0.5"
                    >
                        <span className="text-xl font-black tracking-tight uppercase">VER MI PLAN PERSONALIZADO</span>
                        <span className="text-[10px] font-bold text-black/60 tracking-wider">OFERTA LIMITADA • EXPIRA PRONTO</span>
                    </Button>

                    <div className="flex items-center justify-center gap-2 mt-3 opacity-80">
                        <ShieldCheck className="w-3 h-3 text-green-600" />
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">
                            Prueba por 7 días sin riesgo
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
```
