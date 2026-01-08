import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { motion } from 'framer-motion';
import { Footprints, Sparkles, ShieldCheck, Heart, Star, CheckCircle, TrendingUp } from 'lucide-react';

export default function WelcomeScreen() {
  const { goToNextStep, setInitialPain } = useQuiz();

  const handleStart = (pain: string) => {
    setInitialPain(pain);
    goToNextStep();
    // Tracking Pixel Custom Event
    if (window.fbq) window.fbq('trackCustom', 'InitialClick', { pain });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white overflow-x-hidden relative paw-pattern bg-animate">

      {/* Cyber Grid & Particles Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center space-y-12 md:space-y-20 relative z-10 py-10"
      >
        {/* HUD STATUS BADGE */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-4 bg-cyber-onyx/50 backdrop-blur-xl border border-primary/30 px-6 py-2 rounded-sm"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
            ESTADO: <span className="text-white">CONEXIÓN DESVINCULADA</span>
          </p>
        </motion.div>

        {/* HEADLINE - IMPACTO DOPAMINA */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter glow-text">
            EL ALGORITMO DE SU <span className="text-primary italic block md:inline neon-pulse">MENTE</span>
          </h1>
          <p className="text-lg md:text-3xl text-slate-400 font-bold max-w-2xl mx-auto leading-tight">
            Tu <span className="text-white italic">"Perrhijo"</span> no es rebelde, solo está desconectado. Reconfigura su comportamiento hoy.
          </p>
        </div>

        {/* SELECTION HUD - GLASS CARDS */}
        <div className="space-y-10 relative max-w-2xl mx-auto">
          <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.5em]">Identifica el error crítico:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-20">
            {[
              { id: 'berrinches', label: 'Berrinches', icon: '🚨' },
              { id: 'destruccion', label: 'Destrucción', icon: '⚡' },
              { id: 'descontrol', label: 'Descontrol', icon: '🔋' },
              { id: 'caos', label: 'Caos Total', icon: '⚠️' },
            ].map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleStart(item.id)}
                className="cyber-card group relative flex flex-col items-center justify-center gap-4 p-8 h-auto border-primary/20 hover:border-primary transition-all duration-500 overflow-hidden"
              >
                <div className="scanner-line hidden group-hover:block opacity-30" />
                <span className="text-4xl group-hover:scale-125 transition-transform duration-500">{item.icon}</span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* ACTION ZONE - LAVA BUTTON */}
        <div className="relative pt-12 flex flex-col items-center">
          {/* THE DOG HUD VIEW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="absolute -top-40 md:-top-72 left-1/2 -translate-x-1/2 w-[350px] md:w-[600px] pointer-events-none z-0 opacity-20"
          >
            <div className="relative">
              <div className="scanner-line" />
              <img
                src="/assets/dog-hero-new.png"
                alt="Neural Scanner"
                className="w-full mix-blend-screen grayscale brightness-150"
              />
            </div>
          </motion.div>

          <Button
            onClick={() => handleStart('geral')}
            className="action-btn w-full md:w-auto px-16 md:px-24 py-12 text-2xl md:text-4xl font-black rounded-sm relative z-10"
          >
            ¡DESBLOQUEAR CÓDIGO!
          </Button>

          <div className="mt-10 flex flex-col items-center gap-4 relative z-10">
            <div className="neural-progress w-64 md:w-80">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "35%" }}
                className="neural-fill"
              />
            </div>
            <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Nivel de Sincronización Inicial: 35%
            </p>
          </div>
        </div>

        {/* FOOTER HUD SIGNALS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 pt-20 border-t border-white/5 opacity-40">
          <div className="flex flex-col items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Protocolo Asegurado</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <TrendingUp className="w-6 h-6 text-neon-purple" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Optimización IA</span>
          </div>
          <div className="hidden md:flex flex-col items-center gap-3">
            <Footprints className="w-6 h-6 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Acceso Neural</span>
          </div>
        </div>
      </motion.div>

      {/* FIXED HUD CORNERS */}
      <div className="fixed top-10 left-10 border-l-2 border-t-2 border-primary/30 w-12 h-12 pointer-events-none opacity-50" />
      <div className="fixed top-10 right-10 border-r-2 border-t-2 border-primary/30 w-12 h-12 pointer-events-none opacity-50" />
      <div className="fixed bottom-10 left-10 border-l-2 border-b-2 border-primary/30 w-12 h-12 pointer-events-none opacity-50" />
      <div className="fixed bottom-10 right-10 border-r-2 border-b-2 border-primary/30 w-12 h-12 pointer-events-none opacity-50" />
    </div>
  );
}
