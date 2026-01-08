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
            className="w-full h-full flex flex-col items-center font-sans relative"
        >
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg mx-auto space-y-8">

                {/* Header */}
                <div className="space-y-2 text-center px-4 w-full">
                    {category && (
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            {category}
                        </div>
                    )}

                    <h2 className="text-3xl font-black leading-none text-[#1A1A1A] tracking-tight">
                        {question}
                    </h2>

                    {subtitle && (
                        <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-xs mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Visual Cards Grid */}
                <div className="grid grid-cols-2 gap-4 w-full px-4">
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
            </div>

            {/* Bottom Area - Continue Button */}
            <div className="w-full max-w-lg mx-auto pt-8 mt-auto">
                <motion.div
                    animate={selected.length >= minSelection ? { scale: [1, 1.02, 1], transition: { repeat: Infinity, duration: 2 } } : {}}
                >
                    <Button
                        onClick={handleContinue}
                        disabled={selected.length < minSelection}
                        className={`
                            w-full h-16 rounded-full text-lg font-black tracking-wide uppercase shadow-lg transition-all duration-300
                            ${selected.length >= minSelection
                                ? 'bg-[#FFD700] text-black hover:bg-[#F0C000] hover:shadow-xl cursor-pointer'
                                : 'bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed shadow-none'
                            }
                        `}
                    >
                        {selected.length >= minSelection ? 'CONTINUAR' : 'SELECCIONA 1 OPCIÓN'}
                    </Button>
                </motion.div>

                {selected.length > 0 && (
                    <p className="text-center text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 py-2">
                        {selected.length} comportamiento{selected.length > 1 ? 's' : ''} seleccionado{selected.length > 1 ? 's' : ''}
                    </p>
                )}
            </div>
        </motion.div>
    );
}
