import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Star,
  TrendingUp,
  Sparkles,
  Footprints,
  X,
  AlertTriangle,
  ShieldCheck,
  MessageCircle,
  MoreVertical,
  Camera,
  Phone,
  Video
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
    // URL de checkout (Hotmart exemplo)
    window.location.href = 'https://pay.hotmart.com/YOUR_ID?checkoutMode=10';
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 overflow-x-hidden selection:bg-primary/20">

      {/* SCARCITY BAR */}
      <div className="bg-slate-900 text-white py-3 px-4 text-center sticky top-0 z-50 shadow-lg border-b border-primary/20">
        <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3">
          <span className="text-primary italic animate-bounce">OFERTA LIMITADA:</span>
          TU DESCUENTO DEL 84% EXPIRA EM <span className="text-primary bg-white/10 px-3 py-1 rounded-lg tabular-nums font-mono">{formatTime(timeLeft)}</span>
        </p>
      </div>

      {/* BEHANCE HERO - ELEGANT & BALANCED */}
      <section className="relative pt-16 md:pt-32 pb-20 px-4 overflow-hidden">
        {/* Abstract Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10 -translate-x-1/2" />

        <div className="container max-w-6xl mx-auto flex flex-col items-center text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-white border border-slate-100 px-6 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
          >
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Metodología Validada por +3,240 Tutores</span>
          </motion.div>

          <h1 className="text-5xl md:text-9xl font-black text-slate-900 leading-[0.85] tracking-tighter">
            DOMINA LO <span className="text-primary block md:inline italic">IMPOSIBLE</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-tight">
            Transforma la rebeldía de <span className="text-slate-900 underline decoration-primary/40 underline-offset-4">{quizData.name || 'tu perro'}</span> en obediencia ciega
            <span className="block mt-2 text-primary">sin gritos y en tiempo récord.</span>
          </p>

          {/* BALANCED BUTTON AREA */}
          <div className="relative w-full max-w-xl mx-auto pt-12 flex flex-col items-center">
            {/* Cutout Dog Integration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute -top-32 -right-8 md:-top-56 md:-right-32 w-48 md:w-[450px] pointer-events-none z-0 opacity-40 md:opacity-100"
            >
              <img src="/assets/dog-hero-new.png" alt="Happy Dog" className="w-full mix-blend-multiply drop-shadow-[0_50px_50px_rgba(0,0,0,0.1)]" />
            </motion.div>

            <Button
              onClick={handleBuy}
              className="group w-full md:w-auto px-12 md:px-20 py-12 text-xl md:text-3xl font-black rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all hover:scale-105 active:scale-95 relative z-10 overflow-hidden border-none"
            >
              <span className="flex items-center gap-4">
                QUIERO EL PLAN DE {quizData.name?.toUpperCase() || 'MI PERRO'}
                <Sparkles className="w-6 h-6 text-primary group-hover:rotate-12 transition-all" />
              </span>
              <div className="absolute top-0 right-0 bg-red-600 text-[10px] px-5 py-2 font-black uppercase tracking-widest text-white rounded-bl-3xl shadow-xl">
                84% OFF HOY
              </div>
            </Button>

            {/* Confidence Seals below button */}
            <div className="flex justify-center gap-10 mt-16 opacity-30">
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-[9px] font-black uppercase tracking-widest">Pago Seguro</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Star className="w-6 h-6" />
                <span className="text-[9px] font-black uppercase tracking-widest">Acceso Vitalicio</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span className="text-[9px] font-black uppercase tracking-widest">Garantía 7 Días</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THIS EBOOK? (IMPERDÍVEL SECTION - PHOTO 4 REFERENCE) */}
      <section className="py-32 bg-[#F8F9FF] relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
        <div className="container max-w-6xl mx-auto px-6 space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">¿POR QUÉ ESTA GUÍA ES <span className="text-primary italic">IMPERDIBLE</span>?</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
            <p className="text-slate-400 font-bold max-w-2xl mx-auto text-lg md:text-2xl leading-tight">
              Sintetizamos 15 años de adiestramiento profesional para que {quizData.name || 'tu perro'} sea el ejemplar más educado del vecindario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Educación Pro",
                desc: "Aprenda a cuidar de seu cão de forma completa e eficaz, sem erros.",
                icon: <Footprints className="w-12 h-12 text-primary" />,
                bg: "bg-white"
              },
              {
                title: "Vínculo Fuerte",
                desc: "Descubra como passar mais tempo de qualidade com seu mllhor amigo.",
                icon: <Sparkles className="w-12 h-12 text-primary" />,
                bg: "bg-white"
              },
              {
                title: "Salud & Dieta",
                desc: "Melhore a alimentação do seu pet para uma vida longa e cheia de energia.",
                icon: <ShieldCheck className="w-12 h-12 text-primary" />,
                bg: "bg-white"
              },
              {
                title: "Socialización",
                desc: "Saiba como expor seu cão a novos ambientes mantendo a calma absoluta.",
                icon: <CheckCircle className="w-12 h-12 text-primary" />,
                bg: "bg-white"
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                className={`${card.bg} p-12 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.04)] border border-slate-50 flex flex-col gap-8 text-center group transition-all duration-500`}
              >
                <div className="mx-auto bg-slate-50 p-8 rounded-[2rem] group-hover:bg-primary/10 transition-all duration-500 group-hover:rotate-6">
                  {card.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="font-black text-xl text-slate-900 leading-tight">{card.title}</h3>
                  <div className="w-10 h-1 bg-primary/20 mx-auto rounded-full group-hover:w-16 transition-all" />
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHATSAPP PROOF SECTION - AUTHENTIC & HIGH CONVERSION */}
      <section className="py-32 px-6 bg-white">
        <div className="container max-w-4x1 mx-auto space-y-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-green-50 text-green-600 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm">
              <MessageCircle className="w-4 h-4" /> CASOS DE ÉXITO SEMANALES
            </div>
            <h2 className="text-4xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">Pruebas <span className="text-primary italic">Innegables</span></h2>
          </div>

          <div className="grid gap-12 max-w-4xl mx-auto">
            {/* WhatsApp Chat Simulation 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#E5DDD5] rounded-[3rem] p-4 md:p-10 shadow-2xl relative overflow-hidden border-4 border-white"
            >
              <div className="absolute top-0 inset-x-0 h-20 bg-[#075E54] flex items-center justify-between px-8 text-white shadow-lg">
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full border-2 border-white/20" />
                  <div>
                    <p className="font-bold text-base leading-none">Carla Jimenez (CDMX)</p>
                    <p className="text-[11px] opacity-70 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> En línea</p>
                  </div>
                </div>
                <div className="flex gap-6 opacity-80 scale-110">
                  <Video className="w-6 h-6" />
                  <Phone className="w-6 h-6" />
                  <MoreVertical className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-24 flex flex-col gap-6">
                <div className="self-start max-w-[85%] bg-white p-5 rounded-[2rem] rounded-tl-none text-sm md:text-base text-slate-800 shadow-[0_5px_10px_rgba(0,0,0,0.05)] relative">
                  ¡No puedo creerlo! Toby finalmente dejó de ladrar cada vez que alguien pasa por la puerta. 😱 Estaba a punto de rendirme.
                  <span className="text-[10px] opacity-40 block text-right mt-2">10:42 AM</span>
                </div>
                <div className="self-end max-w-[85%] bg-[#DCF8C6] p-5 rounded-[2rem] rounded-tr-none text-sm md:text-base text-slate-800 shadow-[0_5px_10px_rgba(0,0,0,0.05)] relative">
                  ¡Qué alegría Carla! La técnica de "Enfoque Zero" en 15 segundos es mágica para la ansiedad. ✨
                  <span className="text-[10px] opacity-40 block text-right mt-2 flex justify-end gap-1">10:43 AM <Check className="w-3 text-blue-500" /></span>
                </div>
                <div className="self-start max-w-[85%] bg-white p-5 rounded-[2rem] rounded-tl-none text-sm md:text-base text-slate-800 shadow-sm relative">
                  <div className="bg-slate-50 rounded-2xl p-2 mb-3">
                    <img src="/assets/dog-side.png" className="w-full h-auto rounded-xl grayscale opacity-80" alt="Happy Toby" />
                  </div>
                  Aquí está él ahora, descansando tranquilo mientras el cartero pasó. ¡Gracias por la guía! Recomiendo 100%.
                  <span className="text-[10px] opacity-40 block text-right mt-2">10:45 AM</span>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Chat Simulation 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#E5DDD5] rounded-[3rem] p-4 md:p-10 shadow-2xl relative overflow-hidden border-4 border-white"
            >
              <div className="absolute top-0 inset-x-0 h-20 bg-[#075E54] flex items-center justify-between px-8 text-white shadow-lg">
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full border-2 border-white/20" />
                  <div>
                    <p className="font-bold text-base leading-none">Ricardo Ortiz</p>
                    <p className="text-[11px] opacity-70 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> En línea</p>
                  </div>
                </div>
                <div className="flex gap-6 opacity-80 scale-110">
                  <Video className="w-6 h-6" />
                  <Phone className="w-6 h-6" />
                  <MoreVertical className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-24 flex flex-col gap-6">
                <div className="self-start max-w-[85%] bg-white p-5 rounded-[2rem] rounded-tl-none text-sm md:text-base text-slate-800 shadow-sm relative">
                  Mano, tu método funcionó incluso con mi Bulldog que es súper testarudo. El truco de la comida fue el 'game changer'. ¡Vale cada centavo! 🙌
                  <span className="text-[10px] opacity-40 block text-right mt-2">02:15 PM</span>
                </div>
                <div className="self-end max-w-[85%] bg-[#DCF8C6] p-5 rounded-[2rem] rounded-tr-none text-sm md:text-base text-slate-800 shadow-sm relative">
                  ¡Excelente Ricardo! Los perros 'difíciles' son solo perros mal entendidos. La guía aclara todo.
                  <span className="text-[10px] opacity-40 block text-right mt-2 flex justify-end gap-1">02:18 PM <Check className="w-3 text-blue-500" /></span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ARSENAL PREMIUM - REDESIGNED */}
      <section className="py-32 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="container max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-none">
              El Arsenal <span className="text-primary italic">Inalcanzable</span>
            </h2>
            <p className="text-primary/60 font-extrabold max-w-xl mx-auto uppercase text-[11px] tracking-[0.4em]">
              Material de Alto Calibre • Entrega Instantánea
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Protocolo 'Paso a Paso'",
                desc: "4 Semanas Intensivas de re-programación de conducta. El mapa exacto del éxito sin rodeos.",
                icon: "📘",
                badge: "EL CORAZÓN",
                accent: "bg-blue-500"
              },
              {
                title: "Rutina 15 Segundos",
                desc: "Micro-lecciones de alto impacto para gente ocupada. Resultados visibles desde el día 1.",
                icon: "⚡",
                badge: "VELOCIDAD",
                accent: "bg-amber-500"
              },
              {
                title: "Psicología Canina Pro",
                desc: "Entiende qué piensa antes de que actúe. Sé el líder que tu perro realmente respeta.",
                icon: "🧠",
                badge: "MAESTRÍA",
                accent: "bg-purple-500"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                className="bg-white/5 backdrop-blur-xl rounded-[4rem] p-12 border border-white/10 flex flex-col gap-10 relative group overflow-hidden transition-all duration-700"
              >
                <div className={`absolute top-0 left-0 w-2 h-full ${item.accent} opacity-40 group-hover:opacity-100 transition-all`} />
                <div className="bg-white/10 self-start px-6 py-2.5 rounded-full text-[10px] font-black tracking-[0.2em]">{item.badge}</div>
                <div className="text-8xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">{item.icon}</div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-black leading-tight tracking-tight">{item.title}</h3>
                  <p className="text-base font-bold opacity-50 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - CONVICTION ZONE */}
      <section className="py-32 px-6 bg-[#FDFDFF] text-center border-t border-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />

        <div className="container max-w-5xl mx-auto space-y-16">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="/assets/dog-bond.png" className="w-56 md:w-96 mx-auto mix-blend-multiply mb-8 drop-shadow-2xl" alt="Nuestra Misión" />
          </motion.div>

          <h2 className="text-5xl md:text-9xl font-black tracking-tighter text-slate-900 leading-[0.8]">
            ES HORA DE <span className="text-primary italic">TRANSFORMAR</span> TU HOGAR
          </h2>
          <p className="text-xl md:text-3xl text-slate-400 font-bold max-w-2xl mx-auto leading-tight">
            No dejes que los problemas de comportamiento alejen la alegría de {quizData.name || 'tu perro'}. El plan perfecto está a un clic.
          </p>

          <Button
            onClick={handleBuy}
            className="w-full md:w-auto px-16 md:px-24 py-12 md:py-16 text-2xl md:text-5xl font-black rounded-full shadow-[0_40px_100px_-20px_rgba(245,158,11,0.6)] bg-primary hover:bg-primary/90 text-white border-none shimmer-button hover:scale-105 active:scale-95 transition-all"
          >
            ¡ACCEDER AHORA →
          </Button>

          <div className="pt-16 flex flex-col items-center gap-6">
            <div className="flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" className="h-8" alt="Visa" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" className="h-8" alt="Mastercard" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" className="h-8" alt="Amex" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">ENTREGA INSTANTÁNEA POR E-MAIL • 100% SEGURO</p>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/YOUR_NUMBER"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-5 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] z-[100] hover:scale-110 transition-all flex items-center gap-4 font-black text-sm pr-8 group"
      >
        <div className="relative">
          <MessageCircle className="w-9 h-9 fill-white text-transparent group-hover:rotate-12 transition-all" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-ping" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] opacity-80 mb-0.5">¿Dudas?</span>
          <span>Chat con Soporte</span>
        </div>
      </a>

    </div>
  );
}
