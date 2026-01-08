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
        <div className="w-full max-w-md mx-auto flex flex-col items-center pt-8 px-4 font-sans relative overflow-hidden">

            {/* Header - Optimized */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-3 mb-8 relative z-10"
            >
                {/* Icon Wrapper */}
                <div className="w-16 h-16 mx-auto bg-yellow-50 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                    <Gift className="w-8 h-8 text-[#FFD700]" />
                </div>

                <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight leading-none">
                    ¡FELICIDADES!
                </h1>
                <p className="text-sm font-medium text-gray-500 max-w-[250px] mx-auto leading-relaxed">
                    Has desbloqueado <span className="text-[#DAA520] font-bold">3 regalos exclusivos</span>
                </p>
            </motion.div>

            {/* Vertical Card List */}
            <div className="w-full space-y-3 mb-8 relative z-10 flex-1">
                {BONUS_LIST.map((bonus, index) => (
                    <motion.div
                        key={bonus.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="relative bg-white rounded-[20px] p-4 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        {/* Icon Box */}
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                            {bonus.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="text-sm font-bold text-[#1A1A1A] truncate pr-2">
                                    {bonus.title}
                                </h3>
                                {/* FREE Badge - Better Alignment */}
                                <span className="bg-black text-[#FFD700] text-[8px] font-black px-2 py-0.5 rounded-full tracking-wide flex-shrink-0">
                                    GRATIS
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 font-medium truncate">
                                {bonus.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="w-full relative z-20 pb-4">
                <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <Button
                        onClick={handleContinue}
                        className="w-full h-16 rounded-full bg-[#FFD700] hover:bg-[#F0C000] text-black text-lg font-black tracking-widest uppercase shadow-lg shadow-yellow-400/20 transition-all flex items-center justify-center gap-2"
                    >
                        VER MI PLAN <span className="hidden sm:inline">PERSONALIZADO</span>
                    </Button>
                </motion.div>
                <p className="text-center text-[10px] text-gray-400 font-bold mt-3 uppercase tracking-widest">
                    Oferta por tiempo limitado
                </p>
            </div>

        </div>
    );
}
