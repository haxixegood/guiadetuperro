// ======================
// TIPO BASE DO QUIZ
// ======================
export type QuizStep = {
  id: string;
  type: 'info' | 'single' | 'multiple' | 'text' | 'slider' | 'search';

  category?: string;
  question?: string;
  subtitle?: string;
  placeholder?: string;
  skipText?: string;

  options?: {
    value: string;
    label: string;
    icon?: string;
  }[];

  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  illustration?: string;
};

// ======================
// QUIZ STEPS
// ======================
export const QUIZ_STEPS: QuizStep[] = [
  // Welcome
  {
    id: 'welcome',
    type: 'info',
  },

  // ======================
  // BLOCO 1 — SOBRE SEU CACHORRO
  // ======================
  {
    id: 'gender',
    category: 'SOBRE SEU CACHORRO',
    type: 'single',
    question: 'Seu cachorro é macho ou fêmea?',
    options: [
      { value: 'female', label: 'Fêmea', icon: '♀' },
      { value: 'male', label: 'Macho', icon: '♂' },
    ],
  },

  {
    id: 'age',
    category: 'SOBRE TU PERRO',
    type: 'single',
    question: '¿Qué edad tiene tu perrito?',
    options: [
      { value: '0-6', label: '0–6 meses' },
      { value: '7-12', label: '7–12 meses' },
      { value: '1-2', label: '1–2 años' },
      { value: '2-7', label: '2–7 años' },
      { value: '7+', label: 'Más de 7 años' },
    ],
  },

  {
    id: 'breed',
    category: 'SOBRE TU PERRO',
    type: 'search',
    question: '¿Sabes qué tipo de perrito es?',
    placeholder: 'Buscar raza',
    skipText: 'Es mestizo / no sé la raza',
  },

  {
    id: 'health',
    category: 'SOBRE TU PERRO',
    type: 'single',
    question: '¿Tu perrito tiene algún problema de salud actualmente?',
    options: [
      { value: 'healthy', label: 'No, está sano ❤️' },
      { value: 'yes', label: 'Sí, algunos detalles 🩺' },
    ],
  },

  { id: 'social-proof-1', type: 'info' },

  // ======================
  // BLOCO 2 — COMPORTAMIENTO
  // ======================
  {
    id: 'daily-habits',
    category: 'PROBLEMAS DE COMPORTAMIENTO',
    type: 'multiple',
    question: '¿Hay algo del comportamiento de tu perrito en casa que te preocupe?',
    options: [
      { value: 'accidents', label: 'Hace sus necesidades dentro de casa', icon: '🏠' },
      { value: 'alone', label: 'Se porta diferente cuando está solo', icon: '😟' },
      { value: 'routine', label: 'Le cuesta seguir una rutina', icon: '⏰' },
      { value: 'none', label: 'No, todo va bien 😊', icon: '✨' },
    ],
    skipText: 'Prefiero no responder',
  },

  {
    id: 'home-issues',
    category: 'PROBLEMAS DE COMPORTAMIENTO',
    type: 'multiple',
    question: '¿En casa, hay alguna situación con tu perrito que te resulte difícil manejar?',
    options: [
      { value: 'crate', label: 'No se siente cómodo en su espacio', icon: '📦' },
      { value: 'biting', label: 'Muerde cosas o personas', icon: '🦷' },
      { value: 'barking', label: 'Ladra mucho', icon: '🔊' },
      { value: 'chewing', label: 'Daña objetos', icon: '🛋️' },
      { value: 'anxiety', label: 'Ansiedad al estar solo', icon: '😟' },
    ],
    skipText: 'No tengo este tipo de dificultades',
  },

  {
    id: 'frustration',
    category: 'PROBLEMAS DE COMPORTAMIENTO',
    type: 'slider',
    question: 'A veces me siento frustrado cuando mi perrito daña cosas en casa',
    subtitle: '¿Qué tanto te identificas?',
    min: 0,
    max: 100,
    minLabel: 'Nada',
    maxLabel: 'Mucho',
    illustration: 'dog-playing',
  },

  {
    id: 'walking',
    category: 'PROBLEMAS DE COMPORTAMIENTO',
    type: 'multiple',
    question: 'Cuando sales a pasear con tu perrito:',
    options: [
      { value: 'no-walk', label: 'Aún no pasea', icon: '🏠' },
      { value: 'pulling', label: 'Jala la correa', icon: '🦮' },
      { value: 'trash', label: 'Come cosas del suelo', icon: '🗑️' },
      { value: 'dogs', label: 'Ladra a perros', icon: '🐕' },
      { value: 'people', label: 'Ladra a personas', icon: '👥' },
    ],
    skipText: 'No me pasa ninguna',
  },

  {
    id: 'activity',
    category: 'PROBLEMAS DE COMPORTAMIENTO',
    type: 'single',
    question: 'Nivel de actividad diaria',
    options: [
      { value: 'high', label: 'Muy activo ⚡' },
      { value: 'medium', label: 'Moderado 🐾' },
      { value: 'low', label: 'Bajo 💤' },
    ],
  },

  { id: 'empathy', type: 'info' },

  // ======================
  // BLOCO 3 — ENTRENAMIENTO
  // ======================
  {
    id: 'commands',
    category: 'ENTRENAMIENTO',
    type: 'multiple',
    question: '¿Qué comandos entiende?',
    options: [
      { value: 'name', label: 'Nombre' },
      { value: 'come', label: 'Ven' },
      { value: 'no', label: 'No' },
      { value: 'look', label: 'Mírame' },
    ],
    skipText: 'Ninguno',
  },

  {
    id: 'prediction',
    category: 'ENTRENAMIENTO',
    type: 'single',
    question: '¿Cuánto tiempo puedes dedicarle?',
    options: [
      { value: '10', label: '10–15 min' },
      { value: '20', label: '15–20 min' },
      { value: '30', label: '30+ min' },
    ],
  },

  // ======================
  // BLOCO FINAL
  // ======================
  {
    id: 'name',
    type: 'text',
    question: '¿Cómo se llama tu perrito?',
    placeholder: 'Nombre',
    skipText: 'Prefiero no decirlo',
  },

  {
    id: 'previous-training',
    type: 'single',
    question: '¿Ya intentaste entrenarlo?',
    options: [
      { value: 'pro', label: 'Con entrenador 👨‍🏫' },
      { value: 'self', label: 'Por mi cuenta 🤝' },
      { value: 'no', label: 'Aún no 📅' },
    ],
  },

  // ======================
  // CONVERSÃO
  // ======================
  { id: 'result', type: 'info' },
  { id: 'email', type: 'text' },
  { id: 'opt-in', type: 'single' },
  { id: 'gift', type: 'info' },
  { id: 'discount', type: 'info' },
  { id: 'sales', type: 'info' },
  { id: 'discount-wheel', type: 'info' },

  // ======================
  // THANK YOU
  // ======================
  { id: 'thank-you', type: 'info' },
];
