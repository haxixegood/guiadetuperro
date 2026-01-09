import { motion } from 'framer-motion';
import {
    Check,
    Droplets,
    Bone,
    Volume2,
    ArrowUpCircle,
    AlertCircle,
    Footprints,
    Siren
} from 'lucide-react';

interface VisualCardProps {
    id: string;
    label: string;
    emoji: string;
    image?: string;
    selected: boolean;
    onClick: () => void;
    index: number;
}

export default function VisualCard({ id, label, emoji, selected, onClick }: VisualCardProps) {

    // Mapping behavior IDs to colors as per premium design brief
    const getColorConfig = () => {
        // Red (#FF4D4D): Critical/Aggressive
        if (id === 'biting' || id === 'pulling') return { color: '#FF4D4D', shadow: 'rgba(255, 77, 77, 0.2)' };
        // Blue (#4DA6FF): Hygiene
        if (id === 'peeing') return { color: '#4DA6FF', shadow: 'rgba(77, 166, 255, 0.2)' };
        // Orange (#FFA500): Anxiety/Barking
        if (id === 'barking' || id === 'alone' || id === 'jumping') return { color: '#FFA500', shadow: 'rgba(255, 165, 0, 0.2)' };

        return { color: '#4DFF88', shadow: 'rgba(77, 255, 136, 0.2)' }; // Green for others
    };

    const { color, shadow } = getColorConfig();

    const getIcon = () => {
        const iconProps = {
            className: "w-10 h-10",
            style: { color: color },
            strokeWidth: 2
        };

        switch (emoji) {
            case 'behavior-leash': return <Footprints {...iconProps} />;
            case 'behavior-pee': return <Droplets {...iconProps} />;
            case 'behavior-biting': return <Bone {...iconProps} className="rotate-45" />;
            case 'behavior-barking': return <Volume2 {...iconProps} />;
            case 'behavior-jumping': return <ArrowUpCircle {...iconProps} />;
            case 'behavior-alone': return <AlertCircle {...iconProps} />;
            default: return <Siren {...iconProps} />;
        }
    };

    return (
        <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onClick}
            className={`
                relative overflow-hidden rounded-[20px] p-4 min-h-[160px] w-full
                flex flex-col items-center justify-between border transition-all duration-300
                ${selected
                    ? 'bg-[#FFF9E6] border-[#FFCC00] border-[2px]'
                    : 'bg-white border-[#E0E0E0] hover:border-gray-300 shadow-sm'
                }
            `}
            style={selected ? { boxShadow: `0px 8px 20px ${shadow}` } : {}}
        >
            {/* Selection indicator */}
            <div className={`
                absolute top-3 right-3 w-[20px] h-[20px] rounded-full border-[2px] flex items-center justify-center transition-all duration-300
                ${selected ? 'border-[#FFCC00] bg-[#FFCC00]' : 'border-[#DDDDDD] bg-transparent'}
            `}>
                {selected && <Check className="w-3 h-3 text-black stroke-[4]" />}
            </div>

            {/* Icon Container: 80x80px Circle, #F5F5F5 */}
            <div className="w-[80px] h-[80px] rounded-full bg-[#F5F5F5] flex items-center justify-center overflow-hidden">
                {getIcon()}
            </div>

            {/* Label: Montserrat Bold 15px */}
            <p className={`
                text-[15px] font-['Montserrat'] font-bold leading-tight text-center uppercase
                ${selected ? 'text-black' : 'text-[#1A1A1A]'}
            `}>
                {label}
            </p>
        </motion.button>
    );
}
