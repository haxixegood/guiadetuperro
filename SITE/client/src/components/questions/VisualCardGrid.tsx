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
            className="space-y-8"
        >
            {/* Header */}
            <div className="space-y-4 text-center md:text-left">
                {category && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block"
                    >
                        {category} // Análisis Visual
                    </motion.span>
                )}

                <h2 className="text-2xl md:text-4xl font-black leading-tight text-white glow-text-yellow">
                    {question}
                </h2>

                {subtitle && (
                    <p className="text-base md:text-lg font-bold text-white/60">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Visual Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

            {/* Selection Counter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
            >
                <p className="text-sm font-bold text-white/40">
                    {selected.length === 0
                        ? 'Selecciona al menos uno'
                        : `${selected.length} comportamiento${selected.length > 1 ? 's' : ''} seleccionado${selected.length > 1 ? 's' : ''}`
                    }
                </p>
            </motion.div>

            {/* Continue Button */}
            <div className="pt-4">
                <Button
                    onClick={handleContinue}
                    disabled={selected.length < minSelection}
                    className="yellow-cta w-full py-6 md:py-8 text-sm md:text-lg font-black disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {selected.length >= minSelection ? (
                        <>
                            ¡CONTINUAR!
                            <span className="hidden md:inline text-xs opacity-70">({selected.length} marcados)</span>
                        </>
                    ) : (
                        <span className="text-xs md:text-base">Selecciona al menos uno</span>
                    )}
                </Button>
            </div>

            {/* Reinforcement Banner */}
            <div className="text-center pt-4">
                <p className="text-xs font-black text-white/30 uppercase tracking-widest">
                    📱 Cada problema tiene solución en 15 minutos
                </p>
            </div>
        </motion.div>
    );
}
