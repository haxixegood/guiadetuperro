import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function ThankYou() {
  const handleAccessProduct = () => {
    window.open('/guia-entrenamiento-perro.pdf', '_blank');
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-card rounded-3xl shadow-xl p-8 md:p-12 space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">
            ¡Pago confirmado con éxito! 🎉
          </h1>
          <p className="text-muted-foreground text-lg">
            Tu acceso al <strong>Plan de Entrenamiento para Tu Perro</strong> ya está disponible.
          </p>
        </div>

        {/* What you receive */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tu material incluye:</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>📘 Guía completa en PDF (programa de 4 semanas)</li>
            <li>🐶 Entrenamiento positivo paso a paso</li>
            <li>⏱ Sesiones diarias de solo 10–15 minutos</li>
            <li>🏠 Entrena en casa, sin equipos especiales</li>
            <li>📈 Progresión clara y realista</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center space-y-3">
          <Button
            onClick={handleAccessProduct}
            size="lg"
            className="w-full text-lg py-6"
          >
            👉 Acceder ahora a mi guía de entrenamiento
          </Button>
          <p className="text-sm text-muted-foreground">
            🔒 Acceso inmediato y permanente. Guarda este enlace.
          </p>
        </div>

        {/* Next steps */}
        <div className="bg-background rounded-2xl p-6 space-y-3">
          <h3 className="font-semibold text-lg">¿Qué hacer ahora?</h3>
          <ol className="list-decimal list-inside text-muted-foreground space-y-1">
            <li>Abre el PDF usando el botón de arriba</li>
            <li>Lee la introducción completa</li>
            <li>Comienza por el Día 1 – Fundamentos</li>
            <li>Aplica los ejercicios con calma y consistencia</li>
          </ol>
        </div>

        {/* Disclaimer */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            Este es un <strong>material educativo digital</strong>. Los resultados dependen
            de la correcta aplicación de los ejercicios, la constancia y el compromiso del tutor.
          </p>
          <p>
            No prometemos milagros, sino un método probado, gradual y responsable.
          </p>
        </div>

        {/* Support */}
        <div className="border-t pt-6 text-center space-y-2">
          <p className="font-medium">¿Tienes dudas o necesitas ayuda? Estamos aquí para ti 👋</p>
          <p className="text-muted-foreground">
            📧 soportetuperro@gmail.com <br />
            📲 WhatsApp: +56 9 2687 8834
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          Gracias por dar este paso por el bienestar de tu perro. 🐾
        </div>
      </motion.div>
    </div>
  )
}
