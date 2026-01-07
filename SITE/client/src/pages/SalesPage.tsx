import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Clock, CheckCircle, AlertTriangle, Gift, TrendingUp, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function SalesPage() {
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
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="py-16 md:py-28 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[5%] text-primary/10 select-none pointer-events-none"
        >
          <TrendingUp className="w-32 h-32" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[5%] text-accent/10 select-none pointer-events-none"
        >
          <Gift className="w-40 h-40" />
        </motion.div>

        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-[length:200%_100%] animate-gradient-x" />

        <div className="container max-w-5xl text-center space-y-10 relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-wider shadow-lg shadow-red-500/20"
          >
            <Clock className="w-4 h-4 animate-spin-slow" />
            Oferta por tiempo limitado
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-slate-900">
            Transforma al perro más rebelde en un{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              compañero ideal
            </span>{' '}
            en 21 días
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Sin gastar miles en adiestradores, sin castigos y con solo{' '}
            <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">
              15 minutos al día
            </span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            {[
              { icon: CheckCircle, text: 'Resultados Rápidos', color: 'text-green-500' },
              { icon: Shield, text: 'Garantía Total', color: 'text-blue-500' },
              { icon: Clock, text: 'Acceso de por vida', color: 'text-amber-500' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2.5 text-sm font-bold bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white shadow-xl shadow-slate-200/50"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-24 px-4 bg-white">
        <div className="container max-w-5xl space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              ¿Qué incluye la guía para tu perro?
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { text: "Guía completa en PDF (programa de 4 semanas)", icon: "📘" },
              { text: "Rutina diaria de solo 10–15 minutos", icon: "⏱️" },
              { text: "Ejercicios prácticos para aplicar en casa", icon: "🏠" },
              { text: "Métodos positivos, sin castigos", icon: "🧠" },
              { text: "Progreso claro y gradual", icon: "📈" },
              { text: "Ideal para perros de todas las edades", icon: "🐕" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col items-center text-center gap-4"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <p className="font-bold text-slate-700 leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIVO (PRICE ANCHORING) */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl space-y-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            ¿Por qué este es el método más inteligente?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Adiestrador Presencial */}
            <div className="bg-gray-50 rounded-3xl p-8 border-2 border-dashed border-gray-200 opacity-75 hover:opacity-100 transition-opacity">
              <h3 className="text-xl font-bold text-gray-500 mb-4">Adiestrador Presencial</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <X className="w-5 h-5 text-red-400" />
                  <span>Costo por sesión: $800 - $1,500</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <X className="w-5 h-5 text-red-400" />
                  <span>Requiere meses de citas</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <X className="w-5 h-5 text-red-400" />
                  <span>Horarios fijos e inconvenientes</span>
                </li>
              </ul>
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Costo promedio total:</p>
                <p className="text-3xl font-bold text-gray-400 line-through decoration-red-400">$8,000+ MXN</p>
              </div>
            </div>

            {/* Nuestra Guía */}
            <div className="bg-white rounded-3xl p-8 border-2 border-primary shadow-2xl relative overflow-hidden transform scale-105">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                MEJOR OPCIÓN
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Guía de Entrenamiento en Casa</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 font-medium">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Pago único y económico</span>
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>A tu propio ritmo (15 min/día)</span>
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Acceso de por vida</span>
                </li>
              </ul>
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-sm text-primary font-medium">Hoy por solo:</p>
                <p className="text-4xl font-black text-primary">$149 MXN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BONOS */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-sm font-bold tracking-widest text-primary uppercase">Regalos Exclusivos</span>
            <h2 className="text-3xl font-bold">
              Llévate GRATIS estos 3 Bonos si compras hoy
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                title: "Checklist: Adiós Pipí en Casa",
                desc: "El paso a paso exacto para enseñar a ir al baño en 3 días.",
                value: "$199",
                icon: CheckCircle
              },
              {
                title: "Áudios Relax para Perros",
                desc: "Banda sonora científica para calmar a tu perro cuando sale.",
                value: "$149",
                icon: Gift
              }
            ].map((bonus, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-primary">
                  <bonus.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{bonus.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{bonus.desc}</p>
                <p className="text-xs font-bold text-primary">Valor: <span className="line-through text-muted-foreground">{bonus.value}</span> (GRATIS)</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA FINAL */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary via-primary/90 to-accent text-white relative overflow-hidden">
        <div className="container max-w-md text-center space-y-8 relative z-10">

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black">
              Tu perro merece lo mejor, y tú también.
            </h2>
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-2xl inline-flex flex-col items-center gap-2 min-w-[200px]">
                <p className="text-xs font-black tracking-widest uppercase opacity-80">La oferta expira en:</p>
                <p className="text-4xl font-black font-mono tabular-nums tracking-tighter">
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white text-foreground rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground line-through text-lg">
                Precio Normal: $947 MXN
              </p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-5xl font-black text-primary">
                  $149
                </p>
                <span className="text-xl font-bold text-gray-400">MXN</span>
              </div>
              <p className="text-green-600 font-bold bg-green-50 inline-block px-3 py-1 rounded-full text-sm">
                Ahorras 84% Hoy
              </p>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full text-xl py-8 shadow-xl animate-pulse hover:animate-none bg-red-600 hover:bg-red-700 text-white border-none"
            >
              👉 QUIERO MI GUÍA + BONUS
            </Button>

            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Pago Seguro</span>
              <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> Entrega Inmediata</span>
            </div>
          </div>

        </div>
      </section>

      {/* GARANTÍA */}
      <section className="py-16 px-4 bg-card text-center space-y-4">
        <Shield className="w-16 h-16 mx-auto text-primary" />
        <h2 className="text-3xl font-bold">
          Garantía de satisfacción
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Si no te gusta el contenido o no se adapta a tu rutina,
          puedes solicitar soporte. Apostamos por un método honesto,
          gradual y responsable (sin promesas milagrosas).
        </p>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-4 text-center space-y-6">
        <h2 className="text-3xl font-bold">
          Empieza hoy con tu perro
        </h2>

        <p className="text-muted-foreground">
          Miles de tutores ya están aplicando este método simple y efectivo.
        </p>

        <Button
          onClick={handleCheckout}
          className="max-w-md mx-auto w-full text-xl py-6"
        >
          👉 Descargar mi guía ahora
        </Button>

        <p className="text-sm text-muted-foreground">
          Acceso inmediato · Sin mensualidades · Sin complicaciones
        </p>
      </section>

    </div>
  );
}
