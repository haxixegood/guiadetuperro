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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`
        relative overflow-hidden rounded-3xl p-6 min-h-[180px]
        flex flex-col items-center justify-center gap-3
        transition-all duration-300
        ${selected
                    ? 'border-[3px] border-primary bg-primary/10 shadow-[0_0_30px_rgba(255,234,0,0.4)]'
                    : 'border-2 border-white/10 bg-white/5 hover:border-primary/30'
                }
      `}
        >
            {/* Background Gradient & Image */}
            <div className="absolute inset-0">
                {image ? (
                    <>
                        <img
                            src={image}
                            alt={label}
                            className={`
                                w-full h-full object-cover transition-transform duration-700
                                ${selected ? 'scale-110' : 'scale-100'}
                            `}
                        />
                        <div className={`
                            absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent
                            ${selected ? 'opacity-80' : 'opacity-90'}
                            transition-opacity duration-300
                        `} />
                    </>
                ) : (
                    <div className={`
                        absolute inset-0 bg-gradient-to-br from-white/5 to-transparent
                        ${selected ? 'opacity-100' : 'opacity-50'}
                        transition-opacity duration-300
                    `} />
                )}
            </div>

            {/* Glitch Effect on Selection */}
            {selected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-primary/20"
                />
            )}

            {/* Emoji/Icon (Overlay or Fallback) */}
            <motion.div
                animate={selected ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                } : {}}
                transition={{ duration: 0.3 }}
                className={`text-6xl relative z-10 ${image ? 'opacity-0' : 'opacity-100'}`}
            >
                {emoji}
            </motion.div>

            {/* Label */}
            <p className={`
        text-sm font-bold text-center relative z-10
        ${selected ? 'text-white' : 'text-white/70'}
        transition-colors duration-300
      `}>
                {label}
            </p>

            {/* Checkmark */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={selected ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-20"
            >
                <Check className="w-5 h-5 text-black" />
            </motion.div>

            {/* Pulse Glow Effect */}
            {selected && (
                <motion.div
                    animate={{
                        opacity: [0.5, 0.8, 0.5],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 border-2 border-primary rounded-3xl"
                />
            )}
        </motion.button>
    );
}
