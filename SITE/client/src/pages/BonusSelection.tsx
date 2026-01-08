import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Gift, Zap, BookOpen, Clock, ShieldCheck } from 'lucide-react';

interface BonusSelectionProps {
    onBonusSelected: (bonusId: string) => void;
}

const BONUS_LIST = [
    {
        id: 'bonus-1',
        title: 'Guía: Adiós Ansiedad',
        value: '$29.00',
        description: 'Técnicas probadas para calmar el estrés',
        icon: <Sparkles className="w-8 h-8 text-[#FFD700]" />, // Star/Sparkles
        color: 'bg-yellow-50'
    },
    {
        id: 'bonus-2',
        title: 'Audio Calma Instantánea',
        value: '$19.00',
        description: 'Frecuencias relajantes para perros',
        icon: <Zap className="w-8 h-8 text-[#FFD700]" />, // Energy/Zap
        color: 'bg-yellow-50'
    },
    {
        id: 'bonus-3',
        title: 'Checklist Casa Limpia',
        value: '$15.00',
        description: 'Adiós a los accidentes en casa',
        icon: <ShieldCheck className="w-8 h-8 text-[#FFD700]" />, // Shield
        color: 'bg-yellow-50'
    }
];

export default function BonusSelection({ onBonusSelected }: BonusSelectionProps) {

    const handleContinue = () => {
        // Pass a dummy value or the first one, as we are just unlocking them all
        onBonusSelected('all-bonuses-unlocked');
    };

    return (
        <div className="w-full max-w-md mx-auto min-h-screen flex flex-col items-center py-6 px-4 font-sans bg-white relative overflow-hidden">

            {/* Celebration Confetti (Simplified CSS/Divs could be added here, or keep pure clean) */}

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-2 mb-8 mt-4 relative z-10"
            >
                {/* Icon Wrapper */}
                <div className="w-20 h-20 mx-auto bg-yellow-50 rounded-full flex items-center justify-center mb-6 animate-bounce-slow border-4 border-[#FFD700]">
                    <Sparkles className="w-10 h-10 text-[#FFD700] fill-[#FFD700]" />
                </div>

                <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">
                    ¡FELICIDADES!
                </h1>
                <p className="text-lg font-bold text-gray-400">
                    Has desbloqueado <span className="text-[#DAA520]">3 regalos exclusivos</span>
                </p>
            </motion.div>

            {/* Vertical Card List */}
            <div className="w-full space-y-4 mb-8 relative z-10 flex-1">
                {BONUS_LIST.map((bonus, index) => (
                    <motion.div
                        key={bonus.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="relative bg-white rounded-[24px] p-4 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100"
                    >
                        {/* Icon Box */}
                        <div className="w-16 h-16 rounded-2xl bg-[#FFFDF5] flex items-center justify-center flex-shrink-0 border border-[#FFD700]/20">
                            {bonus.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-base font-extrabold text-[#1A1A1A] leading-tight pr-2">
                                    {bonus.title}
                                </h3>
                                {/* FREE Badge */}
                                <span className="bg-[#FFD700] text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                                    GRATIS
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 font-medium">
                                {bonus.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="w-full relative z-20 pb-6">
                <Button
                    onClick={handleContinue}
                    className="w-full h-16 rounded-full bg-[#FFD700] hover:bg-[#F0C000] text-[#1A1A1A] text-lg font-black shadow-[0_10px_30px_rgba(255,215,0,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] leading-none flex flex-col items-center justify-center gap-1"
                >
                    <span>VER MI PLAN PERSONALIZADO</span>
                    <span className="text-[10px] font-bold opacity-60 tracking-wider">OFERTA LIMITADA</span>
                </Button>
            </div>

        </div>
    );
}
