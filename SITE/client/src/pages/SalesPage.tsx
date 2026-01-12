import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import {
  CheckCircle2, Zap, Sparkles, Star, ShieldCheck,
  Clock, Lock, ChevronDown, ChevronUp, User, Gift
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function SalesPage() {
  const { quizData } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('offerTimer');
    return saved ? parseInt(saved) : 900;
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const checkoutRef = useRef<HTMLElement>(null);
  const [showStickyButton, setShowStickyButton] = useState(false);

  useEffect(() => {
    // RESET NAVIGATION: Load from Top (0,0)
    window.scrollTo(0, 0);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev > 0 ? prev - 1 : 0;
        localStorage.setItem('offerTimer', newTime.toString());
        return newTime;
      });
    }, 1000);

    const handleScroll = () => {
      if (checkoutRef.current) {
        const rect = checkoutRef.current.getBoundingClientRect();
        setShowStickyButton(rect.top > window.innerHeight || rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCheckout = () => {
    window.location.href = 'https://pay.hotmart.com/N103636478Y?checkoutMode=10';
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#28a745]/30 pb-40">

      {/* SCARCITY HEADER */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1A1A1A] text-white py-2.5 px-4 shadow-lg transition-all">
        <div className="w-full max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#28a745] rounded-full animate-pulse" />
            <span>Oferta Activa: <span className="text-[#28a745]">México</span></span>
          </div>

          <div className="flex items-center gap-3 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <span className="font-mono text-[13px] font-black text-[#FFD700] tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      <main className="pt-24 px-5 max-w-xl mx-auto space-y-20">

        {/* HEADER DE DIAGNÓSTICO (Dobra Superior) */}
        <section className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 border border-green-100 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#28a745]" />
            <span className="text-[11px] font-black uppercase tracking-widest text-[#28a745]">Diagnóstico Listado</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-[32px] md:text-[42px] font-[900] leading-[1.1] tracking-tighter text-[#1A1A1A] uppercase">
              ¡Todo listo! <br />
              El plan personalizado para <span className="text-[#28a745]">{quizData.name || 'tu perro'}</span> está aquí
            </h1>
          </motion.div>

          {/* Ebook Mockup Image - Principal Visual Element */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative flex justify-center py-6"
          >
            <div className="relative z-10">
              <img
                src="/assets/3d-ebook-mockup.png"
                alt="Ebook Entrenamiento en Casa"
                className="w-64 h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/dog-hero-new.png'; // Fallback
                }}
              />
              {/* 3D Reflection Effect */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/5 blur-xl rounded-full" />
            </div>
          </motion.div>

          <p className="text-[18px] font-medium text-gray-500 leading-snug max-w-sm mx-auto">
            Descubre el camino de 15 min al día para transformar su comportamiento por solo <span className="text-[#1A1A1A] font-black">149 MXN</span>.
          </p>
        </section>

        {/* SECTION: 3D BENEFIT CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {[
            { img: '/assets/3d-urgency-clock.png', text: 'Solo 15 minutos al día' },
            { img: '/assets/3d-urgency-alert.png', text: 'Método 100% Seguro' },
            { img: '/assets/3d-revelation-dog.png', text: 'Entrenamiento en casa' }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-[#FDFCF9] p-6 rounded-[24px] border border-gray-100 flex flex-col items-center text-center shadow-sm space-y-4"
            >
              <img src={benefit.img} alt="" className="w-16 h-16 object-contain" />
              <p className="text-[14px] font-black uppercase leading-tight tracking-tight">
                {benefit.text}
              </p>
            </motion.div>
          ))}
        </section>

        {/* SECTION: OFERTA IRRESISTIBLE (Bonos Desbloqueados) */}
        <section className="space-y-8 bg-gray-50 -mx-5 px-5 py-12 rounded-[40px]">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tight">Oferta Irresistible</h2>
            <p className="text-sm text-gray-500 font-medium">Al inscribirte hoy por <span className="text-black font-bold">149 MXN</span>, te llevas estos 3 bonos valorados en $61 totalmente <span className="text-[#28a745] font-black underline">GRATIS</span></p>
          </div>

          <div className="grid gap-4">
            {[
              { title: 'Bono 1: Guía Adiós Ansiedad', desc: 'Control total del estrés por soledad.', icon: <Sparkles className="text-blue-500" /> },
              { title: 'Bono 2: Audio Calma Instantánea', desc: 'Frecuencias sonoras para relajación profunda.', icon: <Zap className="text-yellow-500" /> },
              { title: 'Bono 3: Checklist Casa Limpia', desc: 'Protocolo de higiene infalible.', icon: <Gift className="text-pink-500" /> }
            ].map((bonus, i) => (
              <div key={i} className="bg-white p-5 rounded-[24px] border border-gray-100 flex items-center gap-5 shadow-sm">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl">
                  {bonus.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[15px] uppercase">{bonus.title}</h4>
                  <p className="text-[13px] text-gray-400 font-medium">{bonus.desc}</p>
                </div>
                <div className="font-black text-[10px] text-[#28a745] bg-green-50 px-2 py-1 rounded">GRATIS</div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING & CTA */}
        <section ref={checkoutRef} className="space-y-8">
          <div className="bg-[#1A1A1A] text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl border-b-[8px] border-[#28a745]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#28a745] rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="relative z-10 text-center space-y-10">
              {/* Modern 3D Countdown Timer */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">La oferta expira en:</span>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-inner">
                  <Clock className="w-4 h-4 text-[#28a745] animate-pulse" />
                  <span className="font-mono text-[24px] font-black text-[#FFD700] tabular-nums tracking-tighter">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-gray-400 text-xl line-through decoration-red-500 decoration-[3px] font-black opacity-50">De $499 MXN</span>
                <div className="flex flex-col items-center">
                  <span className="text-8xl font-black text-white tracking-tighter leading-none">$149<span className="text-3xl text-[#28a745]">.00</span></span>
                  <span className="text-[10px] font-black text-[#28a745] uppercase tracking-[0.4em] mt-3">MÉXICO • PAGO ÚNICO</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleCheckout}
                  className="w-full h-22 rounded-full bg-[#28a745] hover:bg-[#218838] text-white text-[22px] font-[900] uppercase shadow-[0_15px_60px_rgba(40,167,69,0.6)] relative overflow-hidden group py-10 animate-bounce transition-all duration-300 active:scale-95"
                  style={{ animationDuration: '3s' }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:200%_100%] animate-[shine_3s_infinite]" />
                  ¡Quiero Mi Guía Ahora!
                </Button>

                {/* GARANTÍA SELL 3D */}
                <div className="flex flex-col items-center gap-2 pt-6">
                  <div className="bg-white/5 px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-white/10 backdrop-blur-sm">
                    <ShieldCheck className="w-5 h-5 text-[#28a745]" />
                    <span className="text-[12px] font-black uppercase tracking-wider text-gray-200">Garantía Total de 7 Días</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="space-y-8">
          <h2 className="text-2xl font-black text-center uppercase tracking-tight">Resultados Reales</h2>
          <div className="space-y-4">
            {[
              { name: 'Sofia Martínez', text: '¡Increíble! Max dejó de ladrar en 2 días. Mi esposo no lo cree.', avatar: 'bg-green-100' },
              { name: 'Carlos Ruiz', text: 'El manual es oro puro. Super fácil de seguir para gente ocupada.', avatar: 'bg-blue-100' }
            ].map((msg, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-3">
                <div className={`w-10 h-10 ${msg.avatar} rounded-full flex items-center justify-center`}><User className="w-6 h-6 text-gray-400" /></div>
                <div className="flex-1 space-y-1">
                  <span className="text-sm font-bold text-[#1A1A1A]">{msg.name}</span>
                  <div className="bg-[#DCF8C6] p-3 rounded-2xl text-sm text-gray-800 leading-snug">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ - UPDATED WITH PRICE QUESTION */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-center uppercase tracking-tight">Preguntas Frecuentes</h2>
          <div className="space-y-3">
            {[
              { q: "¿El precio de 149 MXN incluye todo?", a: "Sí, es un pago único que incluye el entrenamiento completo y los 3 bonos." },
              { q: "¿Sirve para cachorros?", a: "Sí, es ideal para iniciar positivamente desde los 2 meses." },
              { q: "¿Cuándo veré resultados?", a: "La mayoría nota cambios drásticos en la primera semana de aplicación." },
              { q: "¿Tiene garantía?", a: "Sí, tienes 7 días de acceso total. Si no te gusta, te devolvemos el 100%." }
            ].map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-4 bg-white text-left font-bold text-sm"
                >
                  {faq.q}
                  {expandedFaq === i ? <ChevronUp className="w-4 h-4 text-[#28a745]" /> : <ChevronDown className="w-4 h-4 text-gray-300" />}
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      className="bg-gray-50 px-4 pb-4 text-xs text-gray-600 font-medium"
                    >
                      <div className="pt-2 border-t border-gray-100/50">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center pt-8 border-t border-gray-100 opacity-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Diseñado por Expertos • México 2026</p>
        </footer>

      </main>

      {/* STICKY CTA */}
      <AnimatePresence>
        {showStickyButton && (
          <motion.div
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-gray-100 z-50 shadow-2xl"
          >
            <Button
              onClick={handleCheckout}
              className="w-full h-16 bg-[#28a745] hover:bg-[#218838] text-white rounded-full font-black uppercase text-[15px] shadow-lg"
            >
              QUIERO MI PLAN POR 149 MXN
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

