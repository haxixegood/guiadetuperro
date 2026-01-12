import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuiz } from '@/contexts/QuizContext';
import { CheckCircle2, AlertCircle, Mail } from 'lucide-react';

export default function EmailStep() {
    const { quizData, handleAnswer } = useQuiz();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const domains = ['gmail.com', 'hotmail.com', 'outlook.com', 'icloud.com'];

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    useEffect(() => {
        if (email.includes('@')) {
            const [prefix, domainPart] = email.split('@');
            if (domainPart.length > 0) {
                const filtered = domains
                    .filter(d => d.startsWith(domainPart))
                    .map(d => `${prefix}@${d}`);
                setSuggestions(filtered);
            } else {
                setSuggestions(domains.map(d => `${prefix}@${d}`));
            }
        } else {
            setSuggestions([]);
        }
    }, [email]);

    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            setError('Por favor, introduce un email válido');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Google Sheets Integration
            const scriptURL = 'https://script.google.com/macros/s/AKfycby-your-script-id/exec'; // User needs to provide this after deployment

            // For now, we simulate the submission
            console.log('Submitting to Google Sheets...', {
                email,
                dogName: quizData.name || 'tu perro',
                result: '88%'
            });

            // We still notify the context to move forward
            handleAnswer(email);
        } catch (err) {
            console.error('Submission error:', err);
            setError('Ocurrió un error. Por favor intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isValid = validateEmail(email);

    return (
        <div className="flex flex-col items-center min-h-screen px-6 pt-16 pb-32 font-sans bg-white">
            {/* 3D Envelope Asset */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <img
                    src="/assets/3d-email-envelope.png"
                    alt="Email"
                    className="w-32 h-32 object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                />
            </motion.div>

            <div className="w-full max-w-sm text-center">
                <h2 className="text-[26px] font-[900] uppercase leading-tight mb-2">
                    ¡Diagnóstico casi listo!
                </h2>
                <p className="text-gray-500 font-medium mb-8">
                    ¿A qué email enviamos el plan de entrenamiento para <span className="text-[#28a745] font-bold">{quizData.name || 'tu perro'}</span>?
                </p>

                <div className="relative space-y-4">
                    <div className="relative">
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Introduce tu email principal"
                            className={`h-16 rounded-2xl border-2 px-6 text-lg font-medium transition-all duration-300 ${isValid ? 'border-[#28a745] bg-[#F4FAF6]' : 'border-gray-100 focus:border-[#28a745]'
                                }`}
                        />
                        {isValid && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#28a745]"
                            >
                                <CheckCircle2 size={24} />
                            </motion.div>
                        )}
                    </div>

                    {/* Domain Autocomplete */}
                    <AnimatePresence>
                        {suggestions.length > 0 && !isValid && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute z-50 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden mt-1"
                            >
                                {suggestions.slice(0, 3).map((suggestion, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setEmail(suggestion)}
                                        className="px-6 py-4 text-left hover:bg-gray-50 cursor-pointer text-gray-600 font-medium border-b border-gray-50 last:border-none"
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <div className="flex items-center gap-2 text-red-500 text-sm font-bold mt-2 px-2">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handleSubmit}
                        disabled={!isValid || isSubmitting}
                        className={`w-full h-16 rounded-full font-bold text-lg uppercase shadow-lg transition-all duration-300 mt-6 ${isValid && !isSubmitting
                            ? 'bg-[#28a745] text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {isSubmitting ? 'Enviando...' : 'CONTINUAR'}
                    </Button>

                    <div className="flex items-center justify-center gap-2 mt-8 text-gray-400">
                        <Mail size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                            Privacidad 100% garantizada
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
