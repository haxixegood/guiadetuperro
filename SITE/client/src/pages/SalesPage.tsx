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

  const handleCheckout = () => {
    // TODO: Integrate with Hotmart checkout
    window.open('https://pay.hotmart.com/YOUR_PRODUCT_ID', '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 pb-32">
      {/* SCARCITY HEADER */}
      {/* SCARCITY HEADER - RED ALERT */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white py-2 px-4 shadow-lg flex justify-center">
        <div className="w-full max-w-4xl flex justify-between items-center font-black text-[10px] md:text-sm uppercase tracking-wide">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
            <span className="hidden md:inline">OFERTA POR TIEMPO LIMITADO PARA MÉXICO</span>
            <span className="md:hidden">OFERTA LIMITADA MX</span>
          </div>
          <div className="flex items-center gap-2 bg-black/20 px-2 py-0.5 rounded">
            <span className="hidden md:inline">EL PRECIO SUBE EN:</span>
            <span className="text-sm md:text-lg font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <main className="pt-24 px-4 max-w-5xl mx-auto space-y-20">
        {/* HERO SECTION */}
        <section className="relative py-8 md:py-12">
          {/* Floating Dog - Adjusted Position */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-32 md:w-80 mx-auto md:absolute md:-top-10 md:-right-20 md:z-50 mb-6 md:mb-0 relative z-10"
          >
            <img
              src="/assets/dog-hero.png"
              alt="Happy Dog"
              className="w-full drop-shadow-2xl"
            />
          </motion.div>

          <div className="space-y-6 md:space-y-10 relative z-20">
            <div className="space-y-2 md:space-y-4">
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-primary italic flex items-center gap-2 w-fit">
                <Zap className="w-3 h-3" /> Entrenamiento de Bolsillo 15 Min/Día
              </span>
              <h1 className="text-4xl md:text-8xl font-black leading-[0.9] tracking-tighter glow-text-yellow uppercase">
                EL MÉTODO QUE <br />
                <span className="text-primary italic">REPROGRAMA</span> <br />
                A TU PERRO
              </h1>
            </div>

            <p className="text-base md:text-3xl font-bold text-white/60 leading-snug max-w-2xl">
              Convierte tu celular en el <span className="text-white italic">manual de instrucciones</span> que <span className="text-white underline decoration-primary underline-offset-4">tu perro no trajo</span>. Resultados permanentes desde la primera sesión.
            </p>

            <div className="pt-4 md:pt-6">
              <Button onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })} className="yellow-cta w-full md:w-auto px-8 md:px-10 py-6 md:py-8 text-base md:text-xl font-black shimmer animate-pulse-glow h-auto whitespace-normal leading-tight">
                ¡QUIERO UN PERRO EQUILIBRADO AHORA!
              </Button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-6xl font-black glow-text-yellow uppercase italic">Praticidad Extrema</h2>
            <p className="text-white/40 font-bold">Tres pasos simples para el dueño moderno:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <PlayCircle className="w-12 h-12 text-primary" />, title: '1. Abre el Contenido', desc: 'Videos cortos y directos que puedes ver en cualquier momento.' },
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

        {/* PROOF SECTION - WITH DOG SPIRIT */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-6xl font-black glow-text-yellow uppercase italic tracking-tighter">Resultados de Dueños 💎</h2>
            <div className="flex justify-center">
              <img src="/assets/dog-hero.png" alt="Happy Dog" className="w-24 md:w-32 opacity-20" />
            </div>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-10 scrollbar-hide px-4">
            {[
              { name: 'MariaCanina', text: 'Mi berrinchudo Max ahora es otro. 15 min al día en serio funcionan!', rating: 5 },
              { name: 'Rafa_Gdl', text: 'El manual que no trajo por fin llegó. Mi celular es mi mejor entrenador.', rating: 5 },
              { name: 'Holi_Pet', text: 'Sin gritos, todo positivo. Resultados desde el día 3. Recomendado 100%', rating: 5 }
            ].map((st, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[320px] organic-card p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                    🐕
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary uppercase">@{st.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(st.rating)].map((_, s) => (
                        <Star key={s} className="w-3 h-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm font-bold text-white/80 leading-relaxed italic">"{st.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* ARSENAL PREMIUM (PRODUCT) - WITH DOG IMAGE */}
        <section id="checkout" className="organic-card p-8 md:p-16 relative overflow-hidden border-primary/30 bg-primary/[0.02]">
          {/* Background Dog Watermark */}
          <div className="absolute bottom-0 right-0 w-64 md:w-96 opacity-5 pointer-events-none">
            <img src="/assets/dog-hero.png" alt="Dog" className="w-full" />
          </div>

          <div className="relative z-10 space-y-12">
            <div className="text-center space-y-4">
              <h3 className="text-4xl md:text-7xl font-black leading-none uppercase glow-text-yellow italic">EL ARSENAL <br /> PREMIUM</h3>
              <p className="text-white/60 font-bold">Todo lo que necesitas para transformar a tu perrhijo:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* LEFT: WHAT'S INCLUDED */}
              <div className="space-y-6">
                <h4 className="text-xl font-black uppercase text-primary">Incluye:</h4>
                <div className="space-y-4">
                  {[
                    'Manual de Reprogramación (PDF Completo)',
                    'Videos Paso a Paso (Acceso Vitalicio)',
                    'Guía: Adiós Ansiedad (BONO)',
                    'Checklist: Higiene Total (BONO)',
                    'Audio de Calma Instantánea (BONO)',
                    'Soporte Élite vía WhatsApp'
                  ].map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm md:text-base font-bold text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: PRICING & CTA */}
              <div className="space-y-8 flex flex-col justify-center">
                <div className="organic-card p-8 bg-white/5 border-primary/20 space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white/40 line-through">VALOR TOTAL: $1,497 MXN</p>
                    <div className="flex items-baseline gap-4">
                      <span className="text-6xl md:text-7xl font-black text-primary">$39</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-white/60 uppercase">MXN</span>
                        <span className="text-xs font-black text-white/40 uppercase">Pago Único</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="yellow-cta w-full py-6 md:py-8 text-base md:text-xl font-black shimmer animate-pulse-glow flex items-center justify-center gap-2 h-auto whitespace-normal leading-tight"
                  >
                    <span>¡OBTENER MI ACCESO AHORA!</span>
                  </Button>

                  <div className="flex justify-between items-center opacity-40 text-[10px] font-black uppercase">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Pago Seguro
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" /> Acceso de por Vida
                    </div>
                  </div>
                </div>
              </div>
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
