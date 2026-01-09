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
        <div className="w-full h-full flex flex-col items-center bg-white font-sans relative">

            {/* 120px top offset to clear progress bar */}
            <div className="pt-[120px] w-full px-6 flex flex-col items-center">

                {/* Header: Montserrat Bold 24px */}
                <div className="w-full text-center flex flex-col items-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-['Montserrat'] font-bold text-[24px] text-[#1A1A1A] leading-tight uppercase"
                    >
                        {question}
                    </motion.h2>

                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="mt-[12px] font-['Roboto'] font-normal text-[16px] text-[#666666] leading-snug max-w-xs"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </div>

                {/* Visual Cards Grid: 2 Columns */}
                <div className="mt-[32px] grid grid-cols-2 gap-[12px] w-full max-w-md">
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
            <div className="flex-1" />
            <div className="w-full max-w-sm px-6 pb-8 pt-6">
                <Button
                    onClick={handleContinue}
                    disabled={selected.length < minSelection}
                    className={`
                        w-full h-[56px] rounded-full text-[18px] font-['Montserrat'] font-bold uppercase
                        bg-[#FFCC00] text-[#000000] hover:bg-[#F0C000]
                        shadow-[0px_4px_10px_rgba(0,0,0,0.1)]
                        disabled:opacity-40 disabled:grayscale-[0.5] disabled:cursor-not-allowed
                    `}
                >
                    {selected.length >= minSelection ? 'CONTINUAR' : 'SELECCIONA 1 OPCIÓN'}
                </Button>
            </div>
        </div>
    );
}
