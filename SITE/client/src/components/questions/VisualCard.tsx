import { motion } from 'framer-motion';
import { Check, Droplets, Bone, Volume2, ArrowUpCircle, AlertCircle, Footprints, Info } from 'lucide-react';

interface VisualCardProps {
    id: string;
    label: string;
    emoji: string;
    image?: string;
    selected: boolean;
    onClick: () => void;
    index: number;
}

export default function VisualCard({ id, label, emoji, image, selected, onClick, index }: VisualCardProps) {

    // Icon Mapping based on 'emoji' prop string (mapped from quiz.ts icon)
    const getIcon = () => {
        const iconProps = { className: `w-12 h-12 md:w-16 md:h-16 transition-colors duration-300 ${selected ? 'text-black' : 'text-gray-400'}`, strokeWidth: 1.5 };

        switch (emoji) {
            case 'behavior-leash': return <Footprints {...iconProps} />;
            case 'behavior-pee': return <Droplets {...iconProps} />;
            case 'behavior-biting': return <Bone {...iconProps} className={`${iconProps.className} rotate-45`} />;
            case 'behavior-barking': return <Volume2 {...iconProps} />;
            case 'behavior-jumping': return <ArrowUpCircle {...iconProps} />;
            case 'behavior-alone': return <AlertCircle {...iconProps} />;
            default: return <Info {...iconProps} />; // Fallback
        }
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
                relative overflow-hidden rounded-[24px] p-6 min-h-[160px] w-full
                flex flex-col items-center justify-center gap-4
                transition-all duration-300 group
                ${selected
                    ? 'bg-[#FFD700] shadow-lg scale-[1.02] z-10'
                    : 'bg-gray-50 hover:bg-gray-100 hover:shadow-md hover:-translate-y-1'
                }
            `}
        >
            {/* Selection Checkmark Badge */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={selected ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                className="absolute top-3 right-3 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center shadow-sm z-20"
            >
                <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
            </motion.div>

            {/* Icon */}
            <div className="flex items-center justify-center p-2 rounded-full bg-transparent">
                {getIcon()}
            </div>

            {/* Label */}
            <p className={`
                text-sm md:text-base font-bold text-center leading-tight
                ${selected ? 'text-black' : 'text-gray-500'}
                transition-colors duration-300
            `}>
                {label}
            </p>
        </motion.button>
    );
}
