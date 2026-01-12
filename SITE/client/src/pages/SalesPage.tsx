import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import {
  CheckCircle2, Clock, ShieldCheck, Star, AlertTriangle,
  Heart, Home, Zap, ChevronDown, ChevronUp, Flame, Users, TrendingUp
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { trackSalesPageView, trackCTAClick } from '@/lib/tracking';

export default function SalesPage() {
  const { quizData } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('offerTimer');
    const savedTime = saved ? parseInt(saved) : 900;
    // Auto-reset if timer reached zero
    if (savedTime === 0) {
      localStorage.setItem('offerTimer', '900');
      return 900;
    }
    return savedTime;
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const [showStickyButton, setShowStickyButton] = useState(false);

  // Vacancy counter for scarcity
  const [vacanciesLeft] = useState(() => {
    return Math.floor(Math.random() * 8) + 8; // 8-15 vagas
  });

  const dogName = quizData.name || 'tu perro';

  useEffect(() => {
    window.scrollTo(0, 0);

    // Track sales page view
    trackSalesPageView(dogName);

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
  }, [dogName]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCheckout = (location: string) => {
    // Track CTA click
    trackCTAClick(location, dogName);
    // Redirect to Hotmart checkout
    window.location.href = 'https://pay.hotmart.com/N103636478Y?checkoutMode=10';
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-[#2ecc71]/30 scroll-smooth">

      {/* URGENCY BAR - RED PULSING - COMPACT */}
      <motion.div
        animate={{
          backgroundColor: ['#e74c3c', '#c0392b', '#e74c3c'],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="fixed top-0 left-0 right-0 z-[100] text-white py-2.5 px-4 shadow-2xl border-b-2 border-[#FFD700]"
      >
        <div className="w-full max-w-4xl mx-auto flex justify-between items-center gap-3">
          <div className="flex items-center gap-2 font-bold text-[11px] md:text-[13px] uppercase tracking-wide">
            <span>⚠️ Oferta expira en:</span>
          </div>

          <div className="bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-xl border border-[#FFD700]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFD700]" />
              <span className="font-mono text-[18px] md:text-[20px] font-black text-[#FFD700] tabular-nums">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <main className="pt-16 px-5 max-w-2xl mx-auto space-y-16 pb-32">

        {/* MAGNETIC HEADLINE with 88% */}
        <section className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#f39c12] border-2 border-[#2ecc71] rounded-full shadow-lg"
          >
            <TrendingUp className="w-6 h-6 text-white" />
            <span className="text-[14px] font-black uppercase tracking-widest text-white">88% de Compatibilidad Confirmada</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[32px] md:text-[42px] font-black leading-[1.1] tracking-tight uppercase"
          >
            ¡Increíble! <span className="text-[#e74c3c]">{dogName}</span> es candidato <span className="text-[#2ecc71]">IDEAL</span> para el método de 15 minutos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[17px] text-gray-600 font-medium leading-relaxed max-w-xl mx-auto"
          >
            Basado en su perfil único, hemos diseñado un plan personalizado que transformará su comportamiento <span className="font-black text-[#e74c3c]">sin gritos ni castigos</span>.
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
              className="w-80 md:w-96 h-auto mx-auto"
              style={{
                mixBlendMode: 'multiply',
                filter: 'drop-shadow(0 30px 70px rgba(231,76,60,0.3)) drop-shadow(0 10px 30px rgba(46,204,113,0.3))'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/dog-hero-new.png';
              }}
            />
          </motion.div>

          {/* PRIMARY CTA - RED URGENCY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            ref={checkoutRef}
          >
            <motion.div
              animate={{
                x: [-2, 2, -2, 2, 0],
                boxShadow: [
                  '0 20px 60px rgba(231,76,60,0.4)',
                  '0 20px 60px rgba(231,76,60,0.6)',
                  '0 20px 60px rgba(231,76,60,0.4)'
                ]
              }}
              transition={{
                x: { duration: 0.5, repeat: Infinity, repeatDelay: 3 },
                boxShadow: { duration: 1.5, repeat: Infinity }
              }}
            >
              <Button
                onClick={() => handleCheckout('hero')}
                className="w-full h-20 rounded-full bg-gradient-to-r from-[#e74c3c] via-[#e67e22] to-[#e74c3c] hover:from-[#c0392b] hover:to-[#d35400] text-white text-[20px] md:text-[22px] font-black uppercase relative overflow-hidden group border-4 border-[#FFD700]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)] bg-[length:200%_100%] animate-[shine_1.5s_infinite]" />
                <span className="relative z-10">¡Quiero Mi Guía Ahora!</span>
              </Button>
            </motion.div>
            <p className="text-center text-[15px] font-bold mt-4">
              De <span className="line-through text-red-500 text-[18px]">$599 MXN</span> por solo <span className="text-[#2ecc71] text-[24px] font-black">$149 MXN</span> (Pago Único)
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Users className="w-4 h-4 text-red-500" />
              <span className="text-[12px] font-bold text-red-600">🔥 47 personas viendo esta oferta ahora</span>
            </div>
          </motion.div>
        </section>

        {/* PARA QUIÉN ES - GRAY BACKGROUND */}
        <section className="bg-[#f8f9fa] -mx-5 px-5 py-12 rounded-3xl space-y-6">
          <h2 className="text-[28px] font-black text-center uppercase">Este método es perfecto para:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Clock className="w-8 h-8 text-[#2ecc71]" />, text: 'Dueños sin tiempo que necesitan resultados rápidos' },
              { icon: <Heart className="w-8 h-8 text-[#e74c3c]" />, text: 'Perros rebeldes que ignoran comandos básicos' },
              { icon: <Home className="w-8 h-8 text-[#f39c12]" />, text: 'Cachorros que necesitan educación desde cero' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="bg-white p-6 rounded-2xl border-2 border-[#2ecc71]/30 text-center space-y-3 shadow-lg"
              >
                <div className="flex justify-center">{item.icon}</div>
                <p className="text-[14px] font-bold leading-tight">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHATSAPP SOCIAL PROOF - WHITE BACKGROUND */}
        <section className="space-y-6">
          <h2 className="text-[28px] font-black text-center uppercase">Lo que dicen nuestros clientes</h2>
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
                className="bg-white p-5 rounded-2xl shadow-xl border-2 border-gray-100"
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

        {/* GOLDEN BONUS SECTION - YELLOW BACKGROUND */}
        <section className="bg-gradient-to-br from-[#fff9e6] to-[#fffbf0] -mx-5 px-5 py-12 rounded-3xl border-4 border-dashed border-[#FFD700] shadow-[0_15px_50px_rgba(255,215,0,0.3)] relative">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FFD700] to-[#f39c12] px-6 py-2.5 rounded-full shadow-xl border-2 border-white">
            <span className="text-[14px] font-black uppercase text-white text-center leading-tight">
              Bonos Gratis<br />Hoy
            </span>
          </div>
          <div className="text-center space-y-6 pt-6">
            <h3 className="text-[26px] font-black uppercase">Guía de Alimentación Saludable</h3>
            <p className="text-[18px] font-bold">
              Valorado en <span className="line-through text-red-500">$199 MXN</span>, hoy <span className="text-[#2ecc71] font-black text-[24px]">GRATIS</span>
            </p>
            <p className="text-[15px] text-gray-700 leading-relaxed max-w-md mx-auto font-medium">
              Descubre los alimentos que potencian su aprendizaje y mejoran su salud desde el primer día.
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border-2 border-[#2ecc71] shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-[#2ecc71]" />
              <span className="font-black text-[14px]">+ $447 MXN en bonos incluidos</span>
            </div>
          </div>
        </section>

        {/* PRICING SECTION - BLACK BACKGROUND */}
        <section className="bg-[#1a1a1a] -mx-5 px-5 py-16 rounded-3xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2ecc71] rounded-full blur-[150px] opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e74c3c] rounded-full blur-[150px] opacity-20" />

          <div className="relative z-10 space-y-8">
            {/* GIANT COUNTDOWN */}
            <div className="text-center space-y-3">
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">⏰ La oferta termina en:</p>
              <motion.div
                animate={{
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    '0 0 40px rgba(231,76,60,0.5)',
                    '0 0 60px rgba(231,76,60,0.8)',
                    '0 0 40px rgba(231,76,60,0.5)'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block bg-gradient-to-r from-[#e74c3c] to-[#c0392b] px-10 py-5 rounded-3xl border-4 border-[#FFD700]"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-[#FFD700] animate-pulse" />
                  <span className="font-mono text-[48px] md:text-[56px] font-black text-white tabular-nums tracking-tight">
                    {formatTime(timeLeft)}
                  </span>
                  <AlertTriangle className="w-8 h-8 text-[#FFD700] animate-pulse" />
                </div>
              </motion.div>
            </div>

            {/* PRICE */}
            <div className="text-center space-y-4">
              <p className="text-gray-400 text-[24px] line-through decoration-red-500 decoration-[4px] font-black">De $599 MXN</p>
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-[96px] font-black text-white tracking-tighter leading-none">$149</span>
                  <span className="text-[48px] font-black text-[#2ecc71]">.00</span>
                </div>
                <span className="text-[14px] font-black text-[#FFD700] uppercase tracking-[0.4em] mt-3">MÉXICO • PAGO ÚNICO</span>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              animate={{
                x: [-3, 3, -3, 3, 0],
              }}
              transition={{
                x: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
              }}
            >
              <Button
                onClick={() => handleCheckout('pricing')}
                className="w-full h-20 rounded-full bg-gradient-to-r from-[#e74c3c] via-[#e67e22] to-[#e74c3c] hover:from-[#c0392b] hover:to-[#d35400] text-white text-[22px] font-black uppercase border-4 border-[#FFD700] shadow-[0_20px_60px_rgba(231,76,60,0.6)]"
              >
                <span>¡Acceder Ahora!</span>
              </Button>
            </motion.div>

            {/* GUARANTEE */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl border-2 border-[#2ecc71]">
                <ShieldCheck className="w-10 h-10 text-[#2ecc71]" />
                <div className="text-left">
                  <p className="font-black text-[16px] uppercase text-white">Garantía Incondicional</p>
                  <p className="text-[13px] text-gray-300 font-medium">7 días o 100% de tu dinero de vuelta</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GUARANTEE SECTION - GREEN BACKGROUND */}
        <section className="bg-gradient-to-br from-[#e8f8f5] to-[#d5f4e6] -mx-5 px-5 py-12 rounded-3xl border-2 border-[#2ecc71] space-y-6">
          <div className="text-center">
            <ShieldCheck className="w-16 h-16 text-[#2ecc71] mx-auto mb-4" />
            <h3 className="text-[24px] font-black uppercase mb-3">Garantía Total de 7 Días</h3>
            <p className="text-[15px] text-gray-700 font-medium max-w-lg mx-auto leading-relaxed">
              Si no ves resultados en los primeros 7 días, te devolvemos el <span className="font-black text-[#2ecc71]">100% de tu inversión</span>. Sin preguntas, sin complicaciones.
            </p>
          </div>
        </section>

        {/* FINAL URGENCY CTA */}
        <section className="space-y-6 bg-gradient-to-br from-red-50 to-orange-50 -mx-5 px-5 py-12 rounded-3xl border-2 border-red-200">
          <h2 className="text-[30px] md:text-[36px] font-black text-center leading-tight">
            Sí, quiero transformar la vida de <span className="text-[#e74c3c]">{dogName}</span> por solo $149 MXN
          </h2>
          <motion.div
            animate={{
              x: [-2, 2, -2, 2, 0],
            }}
            transition={{
              x: { duration: 0.5, repeat: Infinity, repeatDelay: 3 }
            }}
          >
            <Button
              onClick={() => handleCheckout('final')}
              className="w-full h-20 rounded-full bg-gradient-to-r from-[#e74c3c] to-[#e67e22] hover:from-[#c0392b] hover:to-[#d35400] text-white text-[18px] md:text-[20px] font-black uppercase border-4 border-[#FFD700] shadow-[0_20px_60px_rgba(231,76,60,0.5)]"
            >
              ¡Acceder Antes Que Expire!
            </Button>
          </motion.div>
          <p className="text-center text-[14px] text-gray-600 font-bold flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-red-500" />
            Oferta válida por {formatTime(timeLeft)} minutos más
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-[28px] font-black text-center uppercase">Preguntas Frecuentes</h2>
          <div className="space-y-3">
            {[
              { q: "¿El precio de $149 MXN incluye todo?", a: "Sí, es un pago único que incluye el entrenamiento completo y todos los bonos." },
              { q: "¿Funciona para cachorros?", a: "Sí, es ideal para iniciar positivamente desde los 2 meses." },
              { q: "¿Cuándo veré resultados?", a: "La mayoría nota cambios drásticos en la primera semana de aplicación." },
              { q: "¿Tiene garantía?", a: "Sí, tienes 7 días de acceso total. Si no te gusta, te devolvemos el 100%." }
            ].map((faq, i) => (
              <div key={i} className="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-[15px] hover:bg-gray-50"
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
            className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-[#e74c3c] to-[#e67e22] border-t-4 border-[#FFD700] z-50 shadow-2xl"
          >
            <Button
              onClick={() => handleCheckout('sticky')}
              className="w-full h-16 bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white rounded-full font-black uppercase text-[18px] border-2 border-white/30"
            >
              ¡Quiero Mi Guía por $149 MXN! 🔥
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
