import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import {
  CheckCircle2, Clock, ShieldCheck, Star, AlertTriangle,
  Heart, Home, Zap, ChevronDown, ChevronUp
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

  const dogName = quizData.name || 'tu perro';

  useEffect(() => {
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
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#2ecc71]/30 scroll-smooth">

      {/* URGENCY BAR - Top Fixed */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-[#e74c3c] to-[#c0392b] text-white py-3 px-4 shadow-2xl">
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-bold text-[11px] md:text-[13px] uppercase tracking-wide">
            <AlertTriangle size={18} className="animate-pulse" />
            <span>⚠️ Oferta especial válida por los próximos <span className="font-black">{formatTime(timeLeft)}</span> minutos</span>
          </div>
        </div>
      </div>

      <main className="pt-20 px-5 max-w-2xl mx-auto space-y-16 pb-32">

        {/* MAGNETIC HEADLINE with 88% + Dog Name */}
        <section className="text-center space-y-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-green-50 border-2 border-[#2ecc71] rounded-full"
          >
            <CheckCircle2 className="w-5 h-5 text-[#2ecc71]" />
            <span className="text-[12px] font-black uppercase tracking-widest text-[#2ecc71]">Análisis Completado: 88% de Compatibilidad</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[32px] md:text-[42px] font-black leading-[1.1] tracking-tight uppercase"
          >
            ¡Increíble! <span className="text-[#2ecc71]">{dogName}</span> es candidato ideal para el método de 15 minutos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[17px] text-gray-600 font-medium leading-relaxed max-w-xl mx-auto"
          >
            Basado en su perfil único, hemos diseñado un plan personalizado que transformará su comportamiento sin gritos ni castigos.
          </motion.p>
        </section>

        {/* EBOOK MOCKUP + ABOVE THE FOLD CTA */}
        <section className="space-y-8">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative flex justify-center"
          >
            <img
              src="/assets/3d-ebook-mockup.png"
              alt="Guía de Entrenamiento"
              className="w-80 md:w-96 h-auto drop-shadow-[0_30px_70px_rgba(46,204,113,0.25)] mx-auto"
              style={{ mixBlendMode: 'multiply' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/dog-hero-new.png';
              }}
            />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-[#2ecc71]/10 blur-3xl rounded-full" />
          </motion.div>

          {/* PRIMARY CTA - Above the Fold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            ref={checkoutRef}
          >
            <Button
              onClick={handleCheckout}
              className="w-full h-20 rounded-full bg-[#2ecc71] hover:bg-[#27ae60] text-white text-[20px] md:text-[24px] font-black uppercase shadow-[0_20px_60px_rgba(46,204,113,0.4)] relative overflow-hidden group animate-pulse"
              style={{ animationDuration: '2s' }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] bg-[length:200%_100%] animate-[shine_2s_infinite]" />
              <span className="relative z-10">¡Quiero Mi Guía Ahora!</span>
            </Button>
            <p className="text-center text-[13px] text-gray-500 font-bold mt-3">
              De <span className="line-through">$599 MXN</span> por solo <span className="text-[#2ecc71] text-[18px] font-black">$149 MXN</span> (Pago Único)
            </p>
          </motion.div>
        </section>

        {/* PARA QUIÉN ES - 3 Columns */}
        <section className="space-y-6">
          <h2 className="text-[26px] font-black text-center uppercase">Este método es perfecto para:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Clock className="w-8 h-8 text-[#2ecc71]" />, text: 'Dueños sin tiempo que necesitan resultados rápidos' },
              { icon: <Heart className="w-8 h-8 text-[#2ecc71]" />, text: 'Perros rebeldes que ignoran comandos básicos' },
              { icon: <Home className="w-8 h-8 text-[#2ecc71]" />, text: 'Cachorros que necesitan educación desde cero' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="bg-green-50 p-6 rounded-2xl border-2 border-[#2ecc71]/30 text-center space-y-3"
              >
                <div className="flex justify-center">{item.icon}</div>
                <p className="text-[14px] font-bold leading-tight">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHATSAPP-STYLE SOCIAL PROOF */}
        <section className="space-y-6">
          <h2 className="text-[26px] font-black text-center uppercase">Lo que dicen nuestros clientes</h2>
          <div className="space-y-4">
            {[
              { name: 'María González', time: 'Hace 2 horas', text: '¡Increíble! En 3 días Luna dejó de morder los muebles. El método realmente funciona 🐕✨', stars: 5 },
              { name: 'Carlos Ramírez', time: 'Hace 5 horas', text: 'Pensé que era imposible, pero Max ahora obedece al primer comando. Valió cada peso 💯', stars: 5 },
              { name: 'Ana Martínez', time: 'Hace 1 día', text: 'Solo 15 minutos al día y los resultados son sorprendentes. Mi familia está feliz 🙌', stars: 5 }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2ecc71] to-[#27ae60] rounded-full flex items-center justify-center text-white font-black text-lg">
                    {review.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-[14px]">{review.name}</p>
                    <p className="text-[11px] text-gray-400">{review.time}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.stars)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                    ))}
                  </div>
                </div>
                <div className="bg-[#DCF8C6] p-4 rounded-2xl rounded-tl-none">
                  <p className="text-[14px] leading-relaxed">{review.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GOLDEN-BORDERED BONUS SECTION */}
        <section className="relative">
          <div className="border-4 border-dashed border-[#FFD700] bg-gradient-to-br from-[#FFF9E6] to-[#FFFBF0] p-8 rounded-3xl shadow-[0_15px_50px_rgba(255,215,0,0.2)]">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#FFD700] px-6 py-2 rounded-full shadow-lg">
              <span className="text-[14px] font-black uppercase">Bono Gratis</span>
            </div>
            <div className="text-center space-y-4 pt-4">
              <h3 className="text-[24px] font-black uppercase">Guía de Alimentación Saludable</h3>
              <p className="text-[16px] text-gray-700 font-medium">
                Valorado en <span className="line-through">$199 MXN</span>, hoy <span className="text-[#2ecc71] font-black text-[20px]">GRATIS</span>
              </p>
              <p className="text-[14px] text-gray-600 leading-relaxed max-w-md mx-auto">
                Descubre los alimentos que potencian su aprendizaje y mejoran su salud desde el primer día.
              </p>
            </div>
          </div>
        </section>

        {/* GUARANTEE SEAL */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-2xl border-2 border-[#2ecc71] shadow-lg">
            <ShieldCheck className="w-10 h-10 text-[#2ecc71]" />
            <div className="text-left">
              <p className="font-black text-[16px] uppercase">Garantía Incondicional</p>
              <p className="text-[13px] text-gray-600 font-medium">7 días de satisfacción total o te devolvemos el 100%</p>
            </div>
          </div>
        </section>

        {/* FINAL URGENCY CTA */}
        <section className="space-y-6 bg-gradient-to-br from-[#2ecc71]/10 to-transparent -mx-5 px-5 py-12 rounded-3xl">
          <h2 className="text-[28px] md:text-[34px] font-black text-center leading-tight">
            Sí, quiero transformar la vida de <span className="text-[#2ecc71]">{dogName}</span> por solo $149 MXN
          </h2>
          <Button
            onClick={handleCheckout}
            className="w-full h-20 rounded-full bg-[#2ecc71] hover:bg-[#27ae60] text-white text-[22px] font-black uppercase shadow-[0_20px_60px_rgba(46,204,113,0.5)] animate-pulse"
            style={{ animationDuration: '2s' }}
          >
            ¡Acceder Ahora!
          </Button>
          <p className="text-center text-[12px] text-gray-500 font-bold">
            <Clock className="w-4 h-4 inline mr-1" />
            Oferta válida por {formatTime(timeLeft)} minutos más
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-[26px] font-black text-center uppercase">Preguntas Frecuentes</h2>
          <div className="space-y-3">
            {[
              { q: "¿El precio de $149 MXN incluye todo?", a: "Sí, es un pago único que incluye el entrenamiento completo y el bono de alimentación." },
              { q: "¿Funciona para cachorros?", a: "Sí, es ideal para iniciar positivamente desde los 2 meses." },
              { q: "¿Cuándo veré resultados?", a: "La mayoría nota cambios drásticos en la primera semana de aplicación." },
              { q: "¿Tiene garantía?", a: "Sí, tienes 7 días de acceso total. Si no te gusta, te devolvemos el 100%." }
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-5 bg-white text-left font-bold text-[15px]"
                >
                  {faq.q}
                  {expandedFaq === i ? <ChevronUp className="w-5 h-5 text-[#2ecc71]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      className="bg-gray-50 px-5 pb-5 text-[14px] text-gray-700 font-medium"
                    >
                      <div className="pt-3 border-t border-gray-200">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* STICKY CTA */}
      <AnimatePresence>
        {showStickyButton && (
          <motion.div
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-lg border-t-2 border-[#2ecc71] z-50 shadow-2xl"
          >
            <Button
              onClick={handleCheckout}
              className="w-full h-16 bg-[#2ecc71] hover:bg-[#27ae60] text-white rounded-full font-black uppercase text-[17px] shadow-lg"
            >
              ¡Quiero Mi Guía por $149 MXN!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
