import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Clock, CheckCircle } from "lucide-react";

export default function SalesPage() {
  const CHECKOUT_URL = "https://pay.hotmart.com/N103636478Y";

  const handleCheckout = () => {
    window.location.href = CHECKOUT_URL;
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container max-w-4xl text-center space-y-6">

          <h1 className="text-4xl md:text-5xl font-bold">
            Entrena a tu perro en casa en solo 15 minutos al día
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Guía práctica en PDF para mejorar el comportamiento de tu perro
            sin castigos, sin métodos complicados y sin gastar en adiestradores.
          </p>

          <div className="inline-flex items-center gap-3 bg-accent text-white px-6 py-3 rounded-full">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">
              Resultados visibles desde la primera semana
            </span>
          </div>

        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl space-y-8">

          <h2 className="text-3xl font-bold text-center">
            ¿Qué incluye la guía?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "📘 Guía completa en PDF (programa de 4 semanas)",
              "⏱️ Rutina diaria de solo 10–15 minutos",
              "🏠 Ejercicios prácticos para aplicar en casa",
              "🧠 Métodos positivos, sin castigos",
              "📈 Progreso claro y gradual",
              "🐕 Ideal para perros de todas las edades",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl p-6 shadow-md flex items-center gap-3"
              >
                <CheckCircle className="text-primary" />
                <p className="font-medium">{text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* OFERTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container max-w-md text-center space-y-6">

          <span className="inline-block bg-primary text-white px-4 py-2 rounded-full font-bold">
            OFERTA ESPECIAL
          </span>

          <h2 className="text-3xl font-bold">
            Acceso inmediato a la guía completa
          </h2>

          <div className="bg-card rounded-3xl p-8 shadow-lg space-y-4">
            <p className="text-muted-foreground line-through">
              Precio regular: $299 MXN
            </p>

            <p className="text-4xl font-black text-primary">
              Hoy por solo $149 MXN
            </p>

            <p className="text-sm text-muted-foreground">
              Acceso inmediato y permanente al material
            </p>

            <Button
              onClick={handleCheckout}
              className="w-full text-xl py-6"
            >
              👉 Acceder ahora a la guía
            </Button>

            <p className="text-sm text-muted-foreground">
              🔒 Pago 100% seguro · Descarga inmediata
            </p>
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
