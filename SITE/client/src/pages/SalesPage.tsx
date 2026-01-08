import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { CheckCircle2, Smartphone, Zap, Sparkles, Star, ShieldCheck, PlayCircle, Heart, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SalesPage() {
  const { quizData } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(900); // 15:00 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 pb-32">
      {/* SCARCITY HEADER */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-primary/90 text-black py-2 px-4 shadow-[0_0_50px_rgba(255,234,0,0.5)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center font-black text-[10px] md:text-sm uppercase tracking-tighter">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 animate-bounce" />
            OFERTA POR TIEMPO LIMITADO PARA MÉXICO
          </div>
          <div className="flex items-center gap-2">
            EL PRECIO SUBE EN: <span className="text-sm md:text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <main className="pt-20 px-4 max-w-5xl mx-auto space-y-24">
        {/* HERO SECTION */}
        <section className="relative py-12">
          {/* Floating Dog Overlay (PNG on top) - FIXED with Screen Blend */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-10 -right-10 md:-right-32 w-48 md:w-[600px] z-50 pointer-events-none mix-blend-screen"
          >
            <img src="/assets/dog-hero-new.png" alt="Happy Dog" className="dog-float w-full brightness-110 contrast-125" />
          </motion.div>

          <div className="space-y-10 relative z-10">
            <div className="space-y-4">
              <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary italic flex items-center gap-2 w-fit">
                <Zap className="w-3 h-3" /> Entrenamiento de Bolsillo 15 Min/Día
              </span>
              <h1 className="text-5xl md:text-[10rem] font-black leading-[0.85] tracking-tighter glow-text-yellow uppercase">
                EL APP QUE <br />
                <span className="text-primary italic">REPROGRAMA</span> <br />
                A TU PERRO
              </h1>
            </div>

            <p className="text-xl md:text-4xl font-bold text-white/50 leading-tight max-w-2xl">
              Convierte tu celular en el <span className="text-white italic">manual de instrucciones</span> que <span className="text-white underline decoration-primary underline-offset-8">tu perro no trajo</span>. Resultados permanentes desde la primera sesión.
            </p>

            <div className="pt-6">
              <Button onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })} className="yellow-cta px-12 py-10 text-xl font-black md:text-2xl shimmer animate-pulse-glow">
                ¡QUIERO UN PERRO EQUILIBRADO AHORA!
              </Button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION (APP STYLE) */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-6xl font-black glow-text-yellow uppercase italic">Praticidad Extrema</h2>
            <p className="text-white/40 font-bold">Tres pasos simples para el dueño moderno:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <PlayCircle className="w-12 h-12 text-primary" />, title: '1. Abre el Video', desc: 'Lecciones cortas y directas que puedes ver en cualquier momento.' },
              { icon: <Zap className="w-12 h-12 text-primary" />, title: '2. Practica 15 Min', desc: 'Sin gritos ni castigos. Solo técnica pura de conexión neural.' },
              { icon: <ShieldCheck className="w-12 h-12 text-primary" />, title: '3. Resultados', desc: 'Observa como los berrinches desaparecen y la obediencia sube.' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="organic-card p-10 text-center space-y-4 border-white/5">
                <div className="flex justify-center">{item.icon}</div>
                <h4 className="text-2xl font-black uppercase tracking-tighter italic">{item.title}</h4>
                <p className="text-sm font-bold text-white/40 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROOF SECTION (INSTAGRAM STORIES STYLE) */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-6xl font-black glow-text-yellow uppercase italic tracking-tighter">Resultados de Dueños 💎</h2>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-10 scrollbar-hide px-4">
            {[
              { name: '@MariaCanina', text: 'Mi berrinchudo Max ahora es otro. 15 min al día en serio funcionan!', img: '/assets/st-1.jpg' },
              { name: '@Rafa_Gdl', text: 'El manual que no trajo por fin llegó. Mi celular es mi mejor entrenador.', img: '/assets/st-2.jpg' },
              { name: '@Holi_Pet', text: 'Sin gritos, todo positivo. Resultados desde el día 3. Recomendado 100%', img: '/assets/st-3.jpg' }
            ].map((st, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[320px] aspect-[9/16] organic-card p-4 relative overflow-hidden border-primary/20 bg-black group">
                {/* Neon Smartphone Frame Simulation */}
                <div className="absolute inset-0 border-[6px] border-black rounded-[32px] z-10" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20" />

                <div className="relative h-full w-full bg-slate-800 rounded-[28px] overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-transparent to-black/80 z-20" />
                  <img src={st.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Result" />

                  <div className="absolute bottom-6 left-6 right-6 z-30 space-y-2">
                    <p className="text-xs font-black text-primary uppercase">@{st.name}</p>
                    <p className="text-[10px] font-bold text-white leading-tight">{st.text}</p>
                    <div className="flex gap-1 text-[8px] text-primary">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-2 h-2 fill-current" />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARSENAL PREMIUM (PRODUCT) */}
        <section id="checkout" className="organic-card p-12 md:p-20 relative overflow-hidden border-primary/30 bg-primary/[0.02]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-8">
              <h3 className="text-4xl md:text-7xl font-black leading-none uppercase glow-text-yellow italic">EL ARSENAL <br /> PREMIUM</h3>

              <div className="space-y-4">
                {[
                  'Manual de Reprogramación (App Acceso)',
                  'Guía: Adiós Ansiedad (BONO)',
                  'Checklist: Higiene Total (BONO)',
                  'Audio de Calma Instantánea (BONO)',
                  'Soporte Élite vía WhatsApp'
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm md:text-base font-bold text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-2">
                <p className="text-sm font-bold text-white/40 line-through">VALOR TOTAL: $1,497 MXN</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-6xl md:text-8xl font-black text-primary">$39MXN</span>
                  <span className="text-xs font-black text-white/40 uppercase tracking-widest">Pago Único</span>
                </div>
              </div>

              <Button className="yellow-cta w-full py-12 text-2xl font-black shimmer animate-pulse-glow">
                ¡OBTENER MI ACCESO AHORA!
              </Button>

              <div className="flex justify-between items-center opacity-30 px-2 mt-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase">
                  <ShieldCheck className="w-4 h-4" /> Pago Seguro
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-right">
                  <Smartphone className="w-4 h-4" /> Acceso de por Vida
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-[400px] h-[400px] border border-primary/10 rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="relative z-20 w-80 md:w-full"
              >
                <img src="/assets/product-mockup.png" alt="Product Mockup" className="dog-float w-full" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FINAL TRUST FOOTER */}
        <section className="text-center py-20 border-t border-white/5 space-y-10">
          <div className="flex justify-center gap-6 opacity-30">
            <PlayCircle className="w-12 h-12" />
            <Heart className="w-12 h-12" />
            <Activity className="w-12 h-12" />
          </div>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.6em]">
            Diseñado por Expertos en Etología Canina // México 2025
          </p>
        </section>
      </main>

      {/* FLOATING CONTACT HUB */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-[#25D366] p-4 rounded-full shadow-2xl relative group"
        >
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-black animate-pulse">1</div>
          <Zap className="w-6 h-6 text-white" />
        </motion.button>
      </div>
    </div>
  );
}
