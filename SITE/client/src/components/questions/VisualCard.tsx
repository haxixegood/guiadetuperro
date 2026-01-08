import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

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
        transition-all duration-300
        ${selected
                    ? 'bg-[#FFF9C4]/20 border-[3px] border-[#FFD700] shadow-[0_8px_25px_rgba(255,215,0,0.15)]'
                    : 'bg-white border-2 border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-gray-100'
                }
      `}
        >
            {/* Selection Checkmark Badge */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={selected ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                className="absolute top-3 right-3 w-7 h-7 bg-[#FFD700] rounded-full flex items-center justify-center shadow-sm z-20"
            >
                <Check className="w-4 h-4 text-[#1A1A1A] stroke-[3]" />
            </motion.div>

            {/* Emoji/Icon */}
            <div className="text-5xl md:text-6xl filter drop-shadow-sm">
                {emoji}
            </div>

            {/* Label */}
            <p className={`
                text-base font-bold text-center leading-tight
                ${selected ? 'text-[#1A1A1A]' : 'text-gray-500'}
                transition-colors duration-300
            `}>
                {label}
            </p>
        </motion.button>
    );
}
