import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { CheckCircle2, Smartphone, Zap, Sparkles, Star, ShieldCheck, PlayCircle, Heart, Activity, Clock, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SalesPage() {
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
    window.open('https://pay.hotmart.com/YOUR_PRODUCT_ID', '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#FFD700]/30 pb-32">

      {/* SCARCITY HEADER */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#1A1A1A] text-white py-2 px-4 shadow-sm flex justify-center">
        <div className="w-full max-w-4xl flex justify-between items-center font-bold text-[10px] md:text-xs uppercase tracking-wide">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Oferta Limitada México
          </span>
          <span className="font-mono text-[#FFD700]">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <main className="pt-20 px-4 max-w-xl mx-auto space-y-24">

        {/* HERO SECTION */}
        <section className="text-center space-y-8 pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 border border-[#FFD700]/30 rounded-full">
            <Zap className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#B8860B]">Método de 15 Min/Día</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter text-[#1A1A1A] uppercase">
            El Método que <br />
            <span className="text-[#DAA520]">Reprograma</span> <br />
            a tu Perro
          </h1>

          <div className="relative w-full max-w-[280px] mx-auto">
            <div className="absolute inset-0 bg-yellow-200/20 rounded-full blur-[60px]" />
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              src="/assets/dog-hero.png"
              alt="Happy Dog"
              className="relative z-10 w-full drop-shadow-2xl"
            />
          </div>

          <p className="text-lg font-medium text-gray-500 leading-relaxed max-w-sm mx-auto">
            Convierte tu celular en el manual de instrucciones que tu perro no trajo. <strong className="text-[#1A1A1A]">Resultados desde la primera sesión.</strong>
          </p>
        </section>

        {/* FEATURES SECTION */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tight">Filosofía Sync</h2>
            <p className="text-sm text-gray-400">Diseñado para el ritmo de vida moderno</p>
          </div>

          <div className="grid gap-6">
            {[
              { title: 'Praticidad', desc: 'Solo 15 minutos al día. Sin alterar tu rutina.', icon: <Clock className="w-6 h-6" /> },
              { title: 'Rapidez', desc: 'Técnicas de "Hard Reset" para cambios inmediatos.', icon: <Zap className="w-6 h-6" /> },
              { title: 'Seguridad', desc: '100% libre de castigos, gritos y maltrato.', icon: <ShieldCheck className="w-6 h-6" /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-start gap-5"
              >
                <div className="w-12 h-12 bg-[#F9F9F9] rounded-2xl flex items-center justify-center text-[#1A1A1A] flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1A1A1A] mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SOCIAL PROOF - NOTIFICATIONS */}
        <section className="space-y-8 relative">
          <div className="text-center">
            <h2 className="text-2xl font-black uppercase tracking-tight">Dueños Felices</h2>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Sofia M.', time: 'hace 2m', text: '¡Increíble! Max dejó de ladrar en 2 días.' },
              { name: 'Carlos R.', time: 'hace 15m', text: 'El manual es oro puro. Súper fácil de seguir.' },
              { name: 'Ana P.', time: 'hace 1h', text: 'Por fin puedo pasear tranquila. Gracias!' }
            ].map((notif, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-200 to-orange-100 rounded-full flex items-center justify-center text-xs font-black text-orange-600">
                  {notif.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-sm font-bold text-[#1A1A1A]">{notif.name}</span>
                    <span className="text-[10px] text-gray-400">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">"{notif.text}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* OFFER SECTION */}
        <section id="checkout" className="pt-8">
          <div className="relative bg-[#1A1A1A] text-white rounded-[32px] p-8 md:p-10 overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <div className="relative z-10 space-y-8 text-center">
              <div>
                <h2 className="text-3xl font-black uppercase text-white mb-2">Tu Arsenal Premium</h2>
                <p className="text-white/60 text-sm">Todo lo necesario para la transformación</p>
              </div>

              <div className="space-y-4 text-left bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                {[
                  'Manual de Reprogramación (PDF)',
                  'Videos Paso a Paso (Vitalicio)',
                  'BONO: Adiós Ansiedad',
                  'BONO: Higiene Total',
                  'BONO: Audio de Calma',
                  'Soporte Élite WhatsApp'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00E055] flex-shrink-0" />
                    <span className="text-sm font-bold text-gray-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-gray-400 text-sm line-through decoration-red-500 decoration-2 font-bold">$1,497 MXN</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-6xl font-black text-[#FFD700] tracking-tighter">$39</span>
                    <span className="text-xs font-bold text-gray-400 uppercase text-left leading-none">MXN<br />Pago Único</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#FFD700] hover:bg-[#F0C000] text-[#1A1A1A] h-16 rounded-full text-xl font-black shadow-[0_0_30px_rgba(255,215,0,0.3)] shimmer leading-none"
                >
                  ¡OBTENER ACCESO AHORA!
                </Button>

                <div className="flex justify-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Pago Seguro</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" /> Garantía 7 días</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center pb-8 pt-4">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
            Diseñado por Expertos • México 2025
          </p>
        </footer>

      </main>
    </div>
  );
}
