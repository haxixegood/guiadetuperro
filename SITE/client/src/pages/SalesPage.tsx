import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Star,
  Activity,
  Zap,
  ShieldCheck,
  MessageCircle,
  MoreVertical,
  Phone,
  Video,
  Cpu,
  Scan,
  Sparkles,
  Lock
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SalesPage() {
  const { quizData } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(899); // 14:59

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBuy = () => {
    window.location.href = 'https://pay.hotmart.com/YOUR_ID?checkoutMode=10';
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden selection:bg-neon-cyan/30">

      {/* CYBER SCARCITY BAR */}
      <div className="bg-cyber-onyx/90 backdrop-blur-xl py-3 px-4 text-center sticky top-0 z-[100] border-b border-primary/20">
        <div className="container mx-auto flex items-center justify-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-2 opacity-40">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-[8px] font-mono uppercase tracking-widest">SERVER_STATUS: ONLINE</span>
          </div>
          <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="text-primary animate-pulse">CÓDIGO DE DESCUENTO ACTIVO:</span>
            <span className="text-white bg-primary/20 px-3 py-1 rounded-sm tabular-nums font-mono border border-primary/30">-{formatTime(timeLeft)}s</span>
          </p>
          <div className="hidden md:flex items-center gap-2 opacity-40">
            <Lock className="w-4 h-4 text-neon-purple" />
            <span className="text-[8px] font-mono uppercase tracking-widest">SECURE_SYNC: ENABLED</span>
          </div>
        </div>
      </div>

      {/* NEON HERO - DIRECT RESPONSE 3.0 */}
      <section className="relative pt-20 md:pt-40 pb-24 px-6 overflow-hidden">
        {/* Deep Cyber Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[120px] -z-10 -translate-x-1/2" />

        <div className="container max-w-6xl mx-auto flex flex-col items-center text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hud-badge !text-xs !px-8 !py-3 flex items-center gap-3"
          >
            <Activity className="w-4 h-4 animate-pulse" />
            VÍNCULO NEURAL: DETECTADO EN {quizData.name?.toUpperCase() || 'TU PERRIHO'}
          </motion.div>

          <h1 className="text-6xl md:text-[12rem] font-black leading-[0.8] tracking-tighter glow-text">
            SINCRO_ <span className="text-primary italic neon-pulse">MENTAL</span>
          </h1>

          <div className="space-y-6 max-w-3xl border-l-4 border-primary/30 pl-8 text-left md:text-center md:border-l-0 md:pl-0">
            <p className="text-xl md:text-4xl text-slate-400 font-bold leading-tight">
              Tu <span className="text-white italic">"Perrhijo"</span> no es rebelde. Su hardware es perfecto, pero su <span className="text-white underline decoration-primary decoration-4 underline-offset-8">sistema operativo</span> está obsoleto.
            </p>
            <p className="text-primary font-black uppercase tracking-[0.4em] text-xs md:text-sm">
              Reconfigura su obediência en solo 21 días_
            </p>
          </div>

          {/* ACTION HUB */}
          <div className="relative w-full max-w-2xl mx-auto pt-16 flex flex-col items-center">
            {/* Night-Vision Dog Projection */}
            <motion.div
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="absolute -top-40 md:-top-80 left-1/2 -translate-x-1/2 w-full max-w-lg pointer-events-none z-0 opacity-20"
            >
              <div className="relative">
                <div className="scanner-line" />
                <img src="/assets/dog-hero-new.png" alt="" className="w-full mix-blend-screen grayscale brightness-150 contrast-125" />
              </div>
            </motion.div>

            <Button
              onClick={handleBuy}
              className="action-btn w-full md:w-auto px-16 md:px-24 py-14 text-2xl md:text-5xl font-black rounded-sm relative z-10 shadow-[0_0_60px_rgba(255,77,0,0.5)]"
            >
              ¡DESBLOQUEAR CÓDIGO!
            </Button>

            {/* Micro-Details */}
            <p className="mt-8 text-[9px] font-mono text-white/40 uppercase tracking-[0.5em] flex items-center gap-3">
              <Scan className="w-3 h-3 text-primary" /> ENCRYPTED_CHECKOUT_V3
            </p>
          </div>
        </div>
      </section>

      {/* THE "BERRINCHUDO" PROBLEM AREA */}
      <section className="py-32 px-6 border-y border-white/5 bg-white/[0.02] relative">
        <div className="container max-w-4xl mx-auto space-y-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black glow-text leading-none uppercase">El Sistema <span className="text-primary italic">Obsoleto</span></h2>
              <div className="space-y-4 text-slate-400 font-bold text-lg leading-relaxed">
                <p>¿Cansado del <span className="text-white">caos doméstico</span>? Los berrinches caninos y muebles destruidos no son tu culpa.</p>
                <p>Estás usando un método de entrenamiento analógico en una era digital. Es hora de hacer un <span className="text-white">Hard Reset</span>.</p>
              </div>
              <div className="flex gap-4">
                <div className="cyber-card p-4 flex-1 border-red-500/20">
                  <span className="text-[8px] font-black text-red-500 block mb-1 uppercase">Estado Actual</span>
                  <span className="text-sm font-black whitespace-nowrap">CAOS & BERRINCHES</span>
                </div>
                <div className="cyber-card p-4 flex-1 border-primary/20">
                  <span className="text-[8px] font-black text-primary block mb-1 uppercase">Post-Sync</span>
                  <span className="text-sm font-black whitespace-nowrap">PAZ & CONTROL</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="cyber-card p-2 rounded-sm border-primary/30 rotate-3 transition-transform hover:rotate-0">
                <div className="scanner-line" />
                <img src="/assets/dog-side.png" className="w-full grayscale brightness-75" alt="" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEURAL ARSENAL - CARD OVERHAUL */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="container max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-9xl font-black tracking-tighter glow-text leading-none uppercase">
              EL ARSENAL <span className="text-primary italic">NEURAL</span>
            </h2>
            <p className="text-primary font-black uppercase text-xs tracking-[0.5em]">PROTOCOLOS_CARGANDO_99%</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "PASO A PASO_FIX",
                desc: "4 Semanas Intensivas de re-programación. El código fuente para una obediencia absoluta.",
                icon: <Cpu className="w-12 h-12" />,
                tag: "CORE_SYSTEM"
              },
              {
                title: "15_SEC_DASH",
                desc: "Micro-lecciones de alto impacto. Sincronización instantánea para tutores sin tiempo.",
                icon: <Zap className="w-12 h-12" />,
                tag: "FAST_SYNC"
              },
              {
                title: "MIND_REVERSE",
                desc: "Entiende el algoritmo de su mente. Sé el líder que tu perro realmente reconoce.",
                icon: <Activity className="w-12 h-12" />,
                tag: "PSY_LINK"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                className="cyber-card p-10 flex flex-col gap-8 relative group"
              >
                <div className="absolute top-0 right-0 hud-badge m-6">{item.tag}</div>
                <div className="p-6 bg-primary/10 self-start text-primary rounded-sm border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                  {item.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{item.title}</h3>
                  <p className="text-sm font-bold text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOLOGRAPHIC SOCIAL PROOF */}
      <section className="py-32 px-6 bg-white/[0.01]">
        <div className="container max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 border border-neon-purple/30 text-neon-purple px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest">
              <MessageCircle className="w-4 h-4" /> TESTIMONIOS_SINCRO_V2
            </div>
            <h2 className="text-4xl md:text-8xl font-black glow-text leading-none">PRUEBAS <span className="text-primary italic">REALES</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              { name: "MARIA_MTY", text: "SYNC_COMPLETE: Mi Golden ya no tira de la correa. Es como si le hubieran actualizado el software.", status: "ONLINE", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
              { name: "JUAN_CDMX", text: "PROTOCOL_FIXED: Dejó de ladrar a visitas en 3 días. Increíble técnica de obediência.", status: "ONLINE", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
            ].map((t, i) => (
              <motion.div
                key={i}
                className="cyber-card p-8 border-neon-purple/20 bg-neon-purple/[0.02] flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={t.img} className="w-14 h-14 rounded-sm grayscale brightness-125 border border-neon-purple/40" />
                    <div>
                      <p className="font-black text-sm text-neon-purple uppercase">{t.name}</p>
                      <p className="text-[8px] font-mono text-white/40">{t.status}_READY</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-primary fill-primary" />)}
                  </div>
                </div>
                <p className="text-lg font-bold text-slate-300 italic">"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CYBER CTA */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[180px] -z-10" />

        <div className="container max-w-5xl mx-auto space-y-16">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <img src="/assets/dog-bond.png" className="w-64 md:w-[500px] mx-auto mix-blend-screen opacity-40 brightness-150 mb-8" alt="" />
          </motion.div>

          <h2 className="text-6xl md:text-[10rem] font-black leading-none tracking-tighter uppercase glow-text">
            SINCRO_ <span className="text-primary italic">TOTAL</span>
          </h2>

          <p className="text-xl md:text-4xl text-slate-400 font-bold max-w-3xl mx-auto leading-tight">
            No esperes a que el sistema colapse. Reconfigura a {quizData.name || 'tu perriho'} hoy mismo.
          </p>

          <div className="pt-8">
            <Button
              onClick={handleBuy}
              className="action-btn w-full md:w-auto px-20 py-16 text-2xl md:text-5xl font-black rounded-sm shadow-[0_0_80px_rgba(255,77,0,0.6)]"
            >
              ¡ACCEDER AL PROTOCOLO!
            </Button>
          </div>

          <div className="pt-16 flex flex-col items-center gap-8">
            <div className="flex items-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-opacity">
              <ShieldCheck className="w-10 h-10" />
              <Lock className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/40">ACCESO_ENVIADO_IP_READY_2025</p>
          </div>
        </div>
      </section>

      {/* FLOATING HUD BUTTON */}
      <a
        href="https://wa.me/YOUR_NUMBER"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 cyber-card !p-4 border-primary/40 bg-primary/10 z-[100] hover:scale-110 transition-all flex items-center gap-4 group rounded-sm"
      >
        <div className="relative">
          <MessageCircle className="w-8 h-8 text-primary fill-primary/20" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        </div>
        <div className="flex flex-col items-start leading-none pr-4">
          <span className="text-[10px] font-black text-white/60 mb-1 tracking-widest uppercase">Support_Link</span>
          <span className="text-xs font-black text-primary uppercase">SYNC_CHAT</span>
        </div>
      </a>

    </div>
  );
}
