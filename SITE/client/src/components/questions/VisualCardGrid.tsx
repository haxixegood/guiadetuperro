import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import VisualCard from './VisualCard';

interface BehaviorOption {
    id: string;
    label: string;
    emoji: string;
    image?: string;
}

interface VisualCardGridProps {
    question: string;
    subtitle?: string;
    category?: string;
    behaviors: BehaviorOption[];
    onAnswer: (selectedIds: string[]) => void;
    minSelection?: number;
}

export default function VisualCardGrid({
    question,
    subtitle,
    category,
    behaviors,
    onAnswer,
    minSelection = 1
}: VisualCardGridProps) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelection = (id: string) => {
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const handleContinue = () => {
        if (selected.length >= minSelection) {
            onAnswer(selected);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 w-full max-w-lg mx-auto"
        >
            {/* Top Progress Bar - Hardcoded 50% for this view logic, ideally dynamic */}
            <div className="w-full mb-2 space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <span>Progreso</span>
                    <span>60%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "50%" }}
                        animate={{ width: "60%" }}
                        className="h-full bg-[#FFD700] rounded-full"
                    />
                </div>
            </div>

            {/* Header */}
            <div className="space-y-3 text-center">
                {category && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block bg-black/5 text-[#1A1A1A] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-1"
                    >
                        {category}
                    </motion.div>
                )}

                <h2 className="text-2xl md:text-3xl font-black leading-tight text-[#1A1A1A] px-4">
                    {question}
                </h2>

                {subtitle && (
                    <p className="text-sm font-bold text-gray-400 px-6 leading-snug">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Visual Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
                {behaviors.map((behavior, index) => (
                    <VisualCard
                        key={behavior.id}
                        id={behavior.id}
                        label={behavior.label}
                        emoji={behavior.emoji}
                        image={behavior.image}
                        selected={selected.includes(behavior.id)}
                        onClick={() => toggleSelection(behavior.id)}
                        index={index}
                    />
                ))}
            </div>

            {/* Continue Button */}
            <div className="pt-6">
                <motion.div
                    animate={selected.length >= minSelection ? { scale: [1, 1.02, 1], transition: { repeat: Infinity, duration: 2 } } : {}}
                >
                    <Button
                        onClick={handleContinue}
                        disabled={selected.length < minSelection}
                        className={`
                            w-full py-7 rounded-full text-lg font-black tracking-wide uppercase shadow-lg transition-all duration-300
                            ${selected.length >= minSelection
                                ? 'bg-[#FFD700] text-black hover:bg-[#F0C000] hover:shadow-xl cursor-pointer'
                                : 'bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed'
                            }
                        `}
                    >
                        {selected.length >= minSelection ? 'CONTINUAR' : 'SELECCIONA 1 OPCIÓN'}
                    </Button>
                </motion.div>

                {selected.length > 0 && (
                    <p className="text-center text-xs font-bold text-gray-400 mt-3 uppercase tracking-wider animate-in fade-in slide-in-from-bottom-2">
                        {selected.length} comportamiento{selected.length > 1 ? 's' : ''} seleccionado{selected.length > 1 ? 's' : ''}
                    </p>
                )}
            </div>

        </motion.div>
    );
}
