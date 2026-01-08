import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Gift, Zap, BookOpen, Clock, ShieldCheck, Book, Headphones, CheckSquare, CheckCircle } from 'lucide-react';
import { useQuiz } from '@/contexts/QuizContext';

interface BonusSelectionProps {
    onBonusSelected: (bonusId: string) => void;
}

const BONUS_LIST = [
    {
        id: 'bonus-1',
        title: 'Guía: Adiós Ansiedad',
        value: '$29.00',
        description: 'Técnicas probadas para calmar el estrés',
        icon: <Book className="w-8 h-8 text-[#FFD700]" />,
        color: 'bg-yellow-50'
    },
    {
        id: 'bonus-2',
        title: 'Audio Calma Instantánea',
        value: '$19.00',
        description: 'Frecuencias relajantes para perros',
        icon: <Headphones className="w-8 h-8 text-[#FFD700]" />,
        color: 'bg-yellow-50'
    },
    {
        id: 'bonus-3',
        title: 'Checklist Casa Limpia',
        value: '$15.00',
        description: 'Adiós a los accidentes en casa',
        icon: <CheckSquare className="w-8 h-8 text-[#FFD700]" />,
        color: 'bg-yellow-50'
    }
];

export default function BonusSelection({ onBonusSelected }: BonusSelectionProps) {
    const { quizData } = useQuiz();

    const handleContinue = () => {
        onBonusSelected('all-bonuses-unlocked');
    };

    return (
        <div className="w-full max-w-md mx-auto min-h-screen flex flex-col items-center pt-2 px-5 font-sans bg-white relative overflow-hidden">

            {/* Top Status Bar - Success Dopamine */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full bg-green-50 border border-green-100 rounded-full py-2 px-4 flex items-center justify-center gap-2 mb-6"
            >
                <div className="bg-green-500 rounded-full p-0.5">
                    <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-bold text-green-700 uppercase tracking-wide">
                    Análisis de {quizData.name || 'tu perrito'} Finalizado
                </span>
            </motion.div>

            {/* Header - Moved Up */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-2 mb-8 relative z-10"
            >
                {/* Icon Wrapper */}
                <div className="w-16 h-16 mx-auto bg-yellow-50 rounded-full flex items-center justify-center mb-4 border-[3px] border-[#FFD700] shadow-sm">
                    <Gift className="w-8 h-8 text-[#FFD700] fill-[#FFD700]" />
                </div>

                <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight leading-none">
                    ¡FELICIDADES!
                </h1>
                <p className="text-base font-bold text-gray-500 max-w-[250px] mx-auto leading-tight">
                    Has desbloqueado <span className="text-[#DAA520] underline decoration-2 underline-offset-2">3 regalos exclusivos</span>
                </p>
            </motion.div>

            {/* Vertical Card List */}
            <div className="w-full space-y-4 mb-6 relative z-10 flex-1">
                {BONUS_LIST.map((bonus, index) => (
                    <motion.div
                        key={bonus.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ scale: 1.02 }}
                        className="relative bg-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 border-l-[6px] border-l-[#FFD700]"
                    >
                        {/* Icon Box - Tangible Look */}
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center flex-shrink-0 border border-yellow-100 shadow-inner">
                            {bonus.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-sm font-extrabold text-[#1A1A1A] leading-tight pr-1">
                                    {bonus.title}
                                </h3>
                                {/* FREE Badge - High Contrast */}
                                <span className="bg-black text-[#FFD700] text-[9px] font-black px-2 py-0.5 rounded-sm shadow-sm tracking-wide">
                                    GRATIS
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 font-medium leading-snug">
                                {bonus.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="w-full relative z-20 pb-8">
                <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <Button
                        onClick={handleContinue}
                        className="w-full h-auto py-4 rounded-xl bg-[#FFD700] hover:bg-[#F0C000] text-[#1A1A1A] shadow-[0_10px_40px_rgba(255,215,0,0.4)] transition-all flex flex-col items-center justify-center gap-1 border-b-4 border-[#E5C100] active:border-b-0 active:translate-y-1"
                    >
                        <span className="text-xl font-black tracking-tight">VER MI PLAN PERSONALIZADO</span>
                        <span className="text-xs font-bold text-black/60 tracking-[0.1em] uppercase">Oferta Limitada • Expira em 10:00</span>
                    </Button>
                </motion.div>
            </div>

        </div>
    );
}
