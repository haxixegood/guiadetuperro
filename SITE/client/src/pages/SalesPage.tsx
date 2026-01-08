import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Clock, CheckCircle, AlertTriangle, Gift, TrendingUp, X, Sparkles, Footprints, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuiz } from "@/contexts/QuizContext";

export default function SalesPage() {
  const { quizData } = useQuiz();
  const CHECKOUT_URL = "https://pay.hotmart.com/N103636478Y";

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

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

  const handleCheckout = () => {
    // Rastreamento de conversão
    if (typeof window.fbq === 'function') {
      window.fbq("track", "InitiateCheckout");
      window.fbq("trackCustom", "BuyButtonClick");
    }
    window.location.href = CHECKOUT_URL;
  };

  return (
    <div className="min-h-screen bg-[#fafafc] selection:bg-primary/30">

      {/* SURREAL HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden bg-white">
        {/* Brain-Lock Background Animations */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

          {/* Floating Pure Elements (Trava Cérebro) */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[10%] opacity-20"
          >
            <Sparkles className="w-24 h-24 text-primary" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[25%] left-[15%] opacity-10"
          >
            <Footprints className="w-32 h-32 text-primary" />
          </motion.div>

          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>

        <div className="container max-w-5xl relative z-10 text-center space-y-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl"
          >
            <TrendingUp className="w-3 h-3 text-primary" />
            Método Validado por +3,240 Tutores
          </motion.div>

          <h1 className="text-5xl md:text-9xl font-black text-slate-900 leading-[0.85] tracking-tighter">
            DOMINA LO <span className="text-primary block md:inline italic">IMPOSIBLE</span>
          </h1>

          <p className="text-lg md:text-3xl text-slate-600 font-bold max-w-3xl mx-auto leading-tight md:leading-snug">
            Transforma la rebeldía de <span className="text-slate-900 underline decoration-primary/40 underline-offset-4">{quizData.name || 'tu perro'}</span> en obediencia ciega.
            <span className="block mt-2 text-primary">Sin gritos, sin estrés y en tiempo récord.</span>
          </p>

          <div className="pt-8 flex flex-col items-center gap-8">
            <Button
              onClick={handleCheckout}
              className="w-full md:w-auto px-12 md:px-24 py-12 md:py-14 text-2xl md:text-5xl font-black rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(245,158,11,0.6)] bg-primary hover:bg-primary/90 text-white border-none shimmer-button hover:scale-105 active:scale-95 transition-all relative z-20 overflow-visible"
            >
              ¡SÍ, QUIERO EL PLAN DE {quizData.name?.toUpperCase() || 'MI PERRO'}! →
              <div className="absolute -top-4 -right-4 bg-red-600 text-white text-[12px] px-4 py-1.5 rounded-full animate-bounce font-black shadow-xl border-2 border-white">
                84% OFF HOY
              </div>
            </Button>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-6 md:gap-12">
                <div className="flex flex-col items-center gap-1">
                  <Shield className="w-6 h-6 text-green-500" />
                  <span className="text-[10px] font-black uppercase text-slate-400">Pago Seguro</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Clock className="w-6 h-6 text-blue-500" />
                  <span className="text-[10px] font-black uppercase text-slate-400">Acceso Vitalicio</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span className="text-[10px] font-black uppercase text-slate-400">Garantía 7 Días</span>
                </div>
              </div>

              <p className="text-[11px] font-bold text-slate-400 max-w-xs leading-tight">
                Únete a la comunidad de élite. Material 100% digital, acceso instantáneo tras el pago.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM BENEFITS - REDESIGNED FOR MAX VALUE */}
      <section className="py-32 px-4 bg-[#fafafc] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />

        <div className="container max-w-6xl space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
              El Arsenal <span className="text-primary italic">Inalcanzable</span>
            </h2>
            <p className="text-slate-400 font-extrabold max-w-xl mx-auto uppercase text-[11px] tracking-[0.4em]">
              Material de Alto Calibre • Entrega Instantánea
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Protocolo 'Paso a Paso'",
                desc: "4 Semanas Intensivas de re-programación de conducta. El mapa exacto del éxito.",
                icon: "📘",
                badge: "EL CORAZÓN",
                accent: "bg-blue-500"
              },
              {
                title: "Rutina 15 Segundos",
                desc: "Micro-lecciones de alto impacto para gente ocupada. Resultados sin excusas.",
                icon: "⚡",
                badge: "VELOCIDAD",
                accent: "bg-amber-500"
              },
              {
                title: "Psicología Canina Pro",
                desc: "Entiende qué piensa antes de que actúe. Sé el líder que tu perro respeta.",
                icon: "🧠",
                badge: "MAESTRÍA",
                accent: "bg-purple-500"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15, scale: 1.02 }}
                className="bg-white rounded-[3.5rem] p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col gap-8 relative group overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-2 h-full ${item.accent} opacity-20`} />

                <div className="bg-slate-50 self-start px-5 py-1.5 rounded-full text-[9px] font-black text-slate-500 tracking-[0.2em]">{item.badge}</div>

                <div className="text-7xl group-hover:scale-110 transition-transform duration-500">{item.icon}</div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">{item.title}</h3>
                  <p className="text-base text-slate-500 leading-relaxed font-bold opacity-80">{item.desc}</p>
                </div>

                <div className="pt-6 border-t border-slate-50 flex items-center gap-2 text-primary font-black text-[10px] tracking-widest">
                  MATERIAL HD • PDF INTERACTIVO
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIVO - REMOVED PRICES FOR HIGHER PERCEPTION */}
      <section className="py-24 px-4 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-primary opacity-[0.05] pointer-events-none" />
        <div className="container max-w-5xl space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">¿Por qué este es el <span className="text-primary italic">único</span> camino?</h2>
            <p className="text-primary/60 font-black uppercase tracking-widest text-[11px]">Inversión Inteligente vs. Gasto Inútil</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Adiestrador Presencial */}
            <div className="bg-white/5 backdrop-blur-sm rounded-[3rem] p-10 border border-white/10 flex flex-col gap-8 opacity-40 hover:opacity-100 transition-opacity">
              <h3 className="text-2xl font-black text-red-400 uppercase tracking-tighter">Adiestrador Presencial</h3>
              <ul className="space-y-8 flex-1">
                <li className="flex items-start gap-4">
                  <X className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <span className="text-base font-bold opacity-70 leading-relaxed">Costos exorbitantes por cada hora que rara vez rinden frutos reales fuera de la clase.</span>
                </li>
                <li className="flex items-start gap-4">
                  <X className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <span className="text-base font-bold opacity-70 leading-relaxed">Pérdida de libertad: Tu agenda depende de la disponibilidad del instructor.</span>
                </li>
              </ul>
              <div className="pt-8 border-t border-white/10 text-center">
                <p className="text-[11px] font-black uppercase tracking-widest opacity-40">Veredicto Económico:</p>
                <p className="text-3xl font-black text-red-400/60">Gasto Sin Retorno</p>
              </div>
            </div>

            {/* Nuestra Guía */}
            <div className="bg-white text-slate-900 rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(245,158,11,0.3)] relative overflow-hidden flex flex-col gap-8 scale-105 border-4 border-primary">
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-8 py-3 rounded-bl-[2rem] tracking-[0.2em] uppercase">
                ÉXITO GARANTIZADO
              </div>
              <h3 className="text-3xl font-black text-primary leading-tight">Tu Nueva Realidad <br /> en Casa</h3>
              <ul className="space-y-8 flex-1">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <span className="text-base font-black leading-tight text-slate-800">Tú te conviertes en el líder. Forjas un vínculo irrompible que dura para siempre.</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <span className="text-base font-black leading-tight text-slate-800">Progreso Relámpago: Aplicas el método en tu entorno real, donde ocurre el caos.</span>
                </li>
              </ul>
              <div className="pt-8 border-t border-slate-100 text-center">
                <p className="text-[11px] font-black uppercase tracking-widest text-primary">Acceso de por vida hoy:</p>
                <p className="text-6xl font-black text-slate-900">$149 <span className="text-2xl text-slate-400">MXN</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BONOS - SURPRISE & HIGH VALUE LAYOUT */}
      <section className="py-32 px-4 bg-white relative overflow-hidden">
        <div className="container max-w-5xl space-y-16">
          <div className="text-center space-y-4">
            <span className="bg-primary/10 text-primary px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.3em]">Regalos para Ganadores</span>
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
              Bonus de <span className="text-primary italic">Asalto</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              {
                title: "Adiós Pipí en Casa",
                desc: "Dominarás el lugar exacto para que {name} haga sus necesidades. Sin manchas, sin olores, sin estrés.",
                icon: "🧼",
                badge: "ESTRATÉGICO",
                color: "bg-blue-50"
              },
              {
                title: "Sesión de Áudios Relax",
                desc: "Frecuencias diseñadas para reducir la ansiedad. Paz mental pura para tu perro y para ti.",
                icon: "🎵",
                badge: "COMPLEMENTO",
                color: "bg-indigo-50"
              }
            ].map((bonus, i) => (
              <div key={i} className={`p-12 rounded-[4rem] border-2 border-slate-50 ${bonus.color} group hover:shadow-3xl transition-all duration-500 flex flex-col gap-8 text-center relative overflow-hidden`}>
                <div className="bg-white w-24 h-24 rounded-[2rem] mx-auto flex items-center justify-center text-5xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {bonus.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="font-black text-3xl text-slate-900 tracking-tight">{bonus.title}</h3>
                  <p className="text-base text-slate-500 font-bold leading-relaxed opacity-90">{bonus.desc.replace('{name}', quizData.name || 'tu perro')}</p>
                </div>
                <div className="bg-slate-900 text-white px-8 py-3 rounded-full text-[11px] font-black w-fit mx-auto tracking-[0.2em] shadow-xl group-hover:bg-primary transition-colors">
                  REGALO INCLUIDO
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL SURREAL */}
      <section className="py-32 px-4 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-[150px] animate-pulse-slow" />

        <div className="container max-w-2xl text-center space-y-12 relative z-10">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              ¿Vas a permitir que un <span className="text-primary">ladrido</span> controle tu vida?
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-bold max-w-lg mx-auto leading-relaxed">
              La oferta termina pronto. Descarga tu plan y transforma tu hogar hoy mismo.
            </p>
          </div>

          <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-[0_50px_100px_-20px_rgba(245,158,11,0.5)] space-y-10">
            <div className="space-y-4">
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Inversión Final</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-7xl md:text-9xl font-black text-slate-900">$149</p>
                <div className="text-left">
                  <p className="text-xl md:text-2xl font-black text-slate-900">MXN</p>
                  <p className="text-[9px] font-black text-primary line-through">$947</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <Button
                onClick={handleCheckout}
                className="w-full py-12 text-3xl md:text-4xl font-black rounded-[2.5rem] shadow-2xl bg-primary hover:bg-primary/90 text-white border-none shimmer-button hover:scale-105 active:scale-95 transition-all"
              >
                👉 ¡DESCARGAR AHORA!
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-6 opacity-60">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-widest">
                  <Shield className="w-4 h-4 text-green-600" /> Compra 100% Segura
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-widest">
                  <Star className="w-4 h-4 text-primary" /> Garantía de Satisfacción
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER PREMIUM */}
      <footer className="py-12 px-4 bg-white text-center border-t border-slate-100">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Copyright © 2026 Guía Perro Online • Todos los derechos reservados
        </p>
      </footer>

    </div>
  );
}
