import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function WelcomeScreen() {
  const { goToNextStep } = useQuiz();
  const [interactions, setInteractions] = useState(0);

  const handleInteraction = () => {
    setInteractions(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-white overflow-x-hidden relative">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center space-y-10 relative z-10 py-12"
      >
        {/* Social Proof Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-white border border-slate-100 rounded-full px-6 py-2 shadow-xl shadow-slate-200/50"
        >
          <p className="text-[11px] md:text-sm font-black text-slate-500 uppercase tracking-widest">
            Ya hemos ayudado a <span className="text-primary">+3 millones</span> de tutores
          </p>
        </motion.div>

        {/* Dynamic Headline */}
        <div className="space-y-4 px-2">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            ¿Por qué tantos perros <span className="text-primary italic">ignoran</span> a sus tutores?
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium">
            Descubre si pequeños errores están afectando la relación con tu perro
          </p>
        </div>

        {/* INTERACTIVE COMPulsion grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {[
            { q: "¿Tu perro te IGNORA al llamarlo?", color: "purple" },
            { q: "¿Ladra mucho o destruye cosas?", color: "orange" },
            { q: "¿Tira de la correa obsesivamente?", color: "green" },
            { q: "¿Hace sus necesidades en interiores?", color: "blue" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-50 space-y-4"
            >
              <p className="font-bold text-slate-800 leading-tight h-10 flex items-center">{item.q}</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={handleInteraction}
                  className="rounded-2xl font-black border-2 border-primary/20 text-primary hover:bg-primary/10 transition-all hover:scale-105"
                >
                  ¡SÍ!
                </Button>
                <Button
                  variant="outline"
                  onClick={handleInteraction}
                  className="rounded-2xl font-black border-2 border-slate-200 text-slate-400 hover:bg-slate-50 transition-all hover:scale-105"
                >
                  NO...
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MAIN CALL TO ACTION */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="pt-6 px-4"
        >
          <Button
            onClick={goToNextStep}
            size="lg"
            className="w-full md:w-auto px-16 py-8 text-2xl font-black rounded-3xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all bg-primary hover:bg-primary/90 border-none text-white overflow-hidden relative group"
          >
            <span className="relative z-10">Descubrir ahora</span>
            <motion.div
              animate={{ x: ['110%', '-110%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-white/20 skew-x-12"
            />
          </Button>
          <p className="text-[10px] text-slate-400 mt-6 uppercase font-bold tracking-widest">
            ⚡ RESULTADO EN MENOS DE 2 MINUTOS
          </p>
        </motion.div>

        {/* Texto legal */}
        <p className="text-[10px] text-slate-300 max-w-md mx-auto">
          Al hacer clic en “Descubrir ahora”, confirmo que he leído y acepto la Política de Privacidad y los Términos y Condiciones.
        </p>
      </motion.div>
    </div>
  );
}
