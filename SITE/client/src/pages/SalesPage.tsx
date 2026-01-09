import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import {
  CheckCircle2, Smartphone, Zap, Sparkles, Star, ShieldCheck,
  PlayCircle, Heart, Activity, Clock, Lock, MessageCircle,
  ChevronDown, ChevronUp, User
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function SalesPage() {
  const { quizData } = useQuiz();
  // Timer Persistence
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('offerTimer');
    return saved ? parseInt(saved) : 900; // 15 mins default
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const checkoutRef = useRef<HTMLElement>(null);
  const [showStickyButton, setShowStickyButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev > 0 ? prev - 1 : 0;
        localStorage.setItem('offerTimer', newTime.toString());
        return newTime;
      });
    }, 1000);

    // Scroll Observer for Sticky Button
    const handleScroll = () => {
      if (checkoutRef.current) {
        const rect = checkoutRef.current.getBoundingClientRect();
        // Show sticky button if checkout section is NOT visible
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
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#FFD700]/30 pb-40">

      {/* SCARCITY HEADER - HIGH CONVERSION DESIGN */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white py-2.5 px-4 shadow-[0_4px_20px_rgba(220,38,38,0.4)] transition-all">
        <div className="w-full max-w-4xl mx-auto flex justify-between items-center">
          <motion.div
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-2 font-black text-[10px] md:text-xs uppercase tracking-widest"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>Oferta Limitada: <span className="text-white underline decoration-white/30 decoration-2">México</span></span>
          </motion.div>

          <div className="flex items-center gap-3 bg-black/10 px-3 py-1 rounded-full border border-white/10">
            <span className="text-[9px] font-black uppercase text-white/80 tracking-widest hidden xs:inline">Expira en:</span>
            <span className="font-mono text-[13px] font-black text-yellow-300 tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      <main className="pt-24 px-5 max-w-xl mx-auto space-y-20">

        {/* HERO SECTION */}
        <section className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-50 border border-[#FFD700]/30 rounded-full">
            <Zap className="w-3.5 h-3.5 text-[#FFD700] fill-[#FFD700]" />
            <span className="text-[11px] font-black uppercase tracking-widest text-[#B8860B]">Método de 15 Min/Día</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black leading-[0.95] tracking-tighter text-[#1A1A1A] uppercase">
            El Método Sync para <br />
            <span className="text-[#DAA520]">Reprogramar</span> a <br />
            <span className="underline decoration-[#FFD700]/50 decoration-4 underline-offset-4">{quizData.name || 'tu perro'}</span>
          </h1>

          {/* PERSONALIZED DIAGNOSIS CARD - IMPACTFUL REPLACEMENT FOR VIDEO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-center text-center space-y-6"
          >
            {/* Holographic line effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center text-3xl">
              📄
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-black text-[#DAA520] uppercase tracking-widest">Protocolo Autorizado</h3>
              <p className="text-xl font-black text-[#1A1A1A] uppercase tracking-tight">Análisis: {quizData.name || 'Tu Perro'}</p>
            </div>

            <div className="w-full bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-50 flex items-center justify-between text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Estado Mental</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs font-black text-green-600 uppercase">Recuperable</span>
                </div>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Probabilidad Éxito</span>
                <span className="block text-xs font-black text-[#1A1A1A]">98.2%</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-black text-gray-400 italic">Válido exclusivamente para el perfil analizado</span>
            </div>
          </motion.div>

          <p className="text-lg font-medium text-gray-500 leading-relaxed max-w-sm mx-auto">
            Convierte tu hogar en un santuario de paz. <br />
            <strong className="text-[#1A1A1A]">Resultados visibles desde la primera sesión.</strong>
          </p>
        </section>

        {/* FEATURES SECTION (Filosofía Sync) */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tight">Filosofía Sync</h2>
            <p className="text-sm text-gray-400 font-medium">Diseñado para el ritmo de vida moderno</p>
          </div>

          <div className="grid gap-5">
            {[
              { title: 'Praticidad Extrema', desc: 'Solo 15 minutos al día. Sin alterar tu rutina.', icon: <Clock className="w-6 h-6" /> },
              { title: 'Hard Reset Mental', desc: 'Funciona incluso si ya intentaste todo y tu perro es terco.', icon: <Zap className="w-6 h-6" /> },
              { title: 'Cero Violencia', desc: '100% libre de castigos, gritos y maltrato.', icon: <ShieldCheck className="w-6 h-6" /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex items-start gap-5"
              >
                <div className="w-12 h-12 bg-[#F9F9F9] rounded-2xl flex items-center justify-center text-[#1A1A1A] flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1A1A1A] mb-1.5">{item.title}</h3>
                  <p className="text-[15px] text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SOCIAL PROOF - WHATSAPP STYLE */}
        <section className="space-y-8 relative">
          <div className="text-center">
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />)}
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Resultados Reales</h2>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Sofia Martínez', time: '10:42', text: '¡Increíble! Max dejó de ladrar en 2 días. Mi esposo no lo cree.', avatar: 'bg-green-100' },
              { name: 'Carlos Ruiz', time: 'Yesterday', text: 'El manual es oro puro. Super fácil de seguir para gente ocupada.', avatar: 'bg-blue-100' },
              { name: 'Ana Paola', time: 'Tuesday', text: 'Ya puedo pasear sin que me jale el brazo. Gracias EQUIPO!', avatar: 'bg-pink-100' }
            ].map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-3"
              >
                <div className={`w-10 h-10 ${msg.avatar} rounded-full flex items-center justify-center`}>
                  <User className="w-6 h-6 text-gray-500 opacity-50" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#1A1A1A]">{msg.name}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-2.5 h-2.5 text-[#FFD700] fill-[#FFD700]" />)}
                    </div>
                  </div>
                  <div className="bg-[#DCF8C6] p-3 rounded-tr-none rounded-2xl inline-block max-w-[90%] text-sm text-gray-800 leading-snug relative">
                    {msg.text}
                    <span className="absolute bottom-1 right-2 text-[9px] text-gray-400">{msg.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TRAINER / AUTHORITY - CONSISTENT EMOJI */}
        <section className="bg-gray-50/50 -mx-5 px-5 py-12 text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center text-5xl shadow-lg shadow-gray-200 border-4 border-white">
            👨‍🏫
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#1A1A1A] uppercase">Tu Instructor Experto</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Certificado en Etología Canina Aplicada. Ha ayudado a más de 12,000 dueños a reconectar con sus mascotas.
            </p>
          </div>
        </section>

        {/* OFFER SECTION (ARSENAL) */}
        <section ref={checkoutRef} id="checkout" className="pt-4">
          <div className="relative bg-[#1A1A1A] text-white rounded-[32px] p-6 md:p-10 overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <div className="relative z-10 space-y-8 text-center">
              <div>
                <h2 className="text-3xl font-black uppercase text-white mb-2">Tu Arsenal Premium</h2>
                <p className="text-white/60 text-sm">Todo lo necesario para la transformación</p>
              </div>

              <div className="space-y-4 text-left bg-white/5 rounded-2xl p-5 backdrop-blur-sm border border-white/10">
                {[
                  { name: 'Manual de Reprogramación', price: '$47' },
                  { name: 'Videos Paso a Paso', price: '$97' },
                  { name: 'BONO: Adiós Ansiedad', price: '$27' },
                  { name: 'BONO: Higiene Total', price: '$27' },
                  { name: 'BONO: Audio de Calma', price: '$17' },
                  { name: 'Soporte VIP WhatsApp', price: '$97', highlight: true }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#00E055]" />
                      <span className={`text-sm font-bold ${item.highlight ? 'text-[#FFD700]' : 'text-gray-300'}`}>{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-gray-500 line-through">Valor {item.price}</span>
                      <span className="text-[10px] font-black text-[#00E055] bg-[#00E055]/10 px-1.5 py-0.5 rounded">GRATIS</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-gray-400 text-sm line-through decoration-red-500 decoration-2 font-bold">$1,497 MXN</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-6xl font-black text-[#FFD700] tracking-tighter">$149</span>
                    <span className="text-xs font-bold text-gray-400 uppercase text-left leading-none">MXN<br />Pago Único</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#FFD700] hover:bg-[#F0C000] text-[#1A1A1A] h-16 rounded-full text-xl font-black shadow-[0_0_30px_rgba(255,215,0,0.3)] shimmer leading-none"
                >
                  ¡OBTENER ACCESO AHORA!
                </Button>

                {/* 7 DAY GUARANTEE */}
                <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4 text-left border border-white/10">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center text-[#1A1A1A] flex-shrink-0">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-sm">Garantía de 7 Días</h4>
                    <p className="text-[11px] text-gray-400 leading-tight">
                      Si tu perro no mejora, te devolvemos el 100% de tu dinero. Sin preguntas.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Pago Seguro</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" /> Acceso Inmediato</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-center uppercase tracking-tight">Preguntas Frecuentes</h2>
          <div className="space-y-3">
            {[
              { q: "¿Sirve para cachorros?", a: "Sí, es ideal para iniciar con el pie derecho desde los 2 meses." },
              { q: "¿Tengo que regañar a mi perro?", a: "No. El método Sync es 100% positivo y libre de violencia." },
              { q: "¿Cuándo veré resultados?", a: "La mayoría nota cambios drásticos en la primera semana de aplicación." },
              { q: "¿Y si no funciona?", a: "Tienes 7 días de garantia total. El riesgo es todo nuestro." }
            ].map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-4 bg-white text-left font-bold text-sm"
                >
                  {faq.q}
                  {expandedFaq === i ? <ChevronUp className="w-4 h-4 text-[#FFD700]" /> : <ChevronDown className="w-4 h-4 text-gray-300" />}
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="bg-gray-50 px-4 pb-4 text-xs text-gray-600 font-medium"
                    >
                      <div className="pt-2 border-t border-gray-100/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CALL SECTION - NEW ADDITION AFTER FAQ */}
        <section className="text-center space-y-10 pb-10">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
              Última Oportunidad
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight">¿Estás listo para el cambio?</h2>
            <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto">
              No dejes que los problemas de conducta de <span className="text-black font-bold">{quizData.name || 'tu perro'}</span> sigan arruinando tu tranquilidad.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "⚡", label: "Instantáneo" },
              { icon: "🛡️", label: "Protegido" },
              { icon: "📱", label: "Móvil" }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="text-2xl">{item.icon}</div>
                <span className="text-[10px] font-black uppercase text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={handleCheckout}
            className="w-full bg-[#1A1A1A] hover:bg-black text-white h-16 rounded-2xl text-lg font-black uppercase tracking-tight flex flex-col items-center justify-center gap-0.5"
          >
            <span>SÍ, QUIERO ACCESO TOTAL</span>
            <span className="text-[10px] text-[#FFD700] tracking-widest">PAGO ÚNICO • ACCESO VITALICIO</span>
          </Button>

          <div className="flex flex-col items-center gap-4 opacity-50">
            <div className="flex gap-4 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
            </div>
            <p className="text-[9px] font-bold text-gray-400 uppercase">Procesamiento de pago 100% seguro por Hotmart</p>
          </div>
        </section>

        <footer className="text-center pt-8 border-t border-gray-100">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
            Diseñado por Expertos • México 2025
          </p>
        </footer>

      </main>

      {/* STICKY CTA BUTTON */}
      <AnimatePresence>
        {showStickyButton && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-gray-100 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]"
          >
            <div className="max-w-xl mx-auto flex items-center gap-4">
              <div className="hidden md:block">
                <p className="text-xs font-black text-gray-400 uppercase line-through">$1,497</p>
                <p className="text-2xl font-black text-[#1A1A1A]">$149</p>
              </div>
              <Button
                onClick={handleCheckout}
                className="flex-1 bg-[#FFD700] hover:bg-[#F0C000] text-[#1A1A1A] rounded-full font-black shadow-lg"
              >
                QUIERO REPROGRAMAR A {quizData.name ? quizData.name.toUpperCase() : 'MI PERRO'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

