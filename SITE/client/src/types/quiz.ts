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
// ======================
// QUIZ STEPS - OPTIMIZED FOR MEXICO (8 STEPS)
// ======================
export const QUIZ_STEPS: QuizStep[] = [
  // 1. Welcome
  {
    id: 'welcome',
    type: 'info',
  },

  // 2. Name (Personalization moved up for deep connection)
  {
    id: 'name',
    type: 'text',
    question: 'Para empezar, ¿cómo se llama tu perrito?',
    placeholder: 'Nombre del perrito',
    skipText: 'No quiero decir el nombre',
  },

  // 3. Gender/Age (Lightweight context)
  {
    id: 'age',
    category: 'SOBRE TU PERRO',
    type: 'single',
    question: '¿Qué edad tiene {name}?',
    options: [
      { value: '0-6', label: 'Cachorro (0–12 meses)' },
      { value: '1-7', label: 'Adulto (1–7 años)' },
      { value: '7+', label: 'Senior (Más de 7 años)' },
    ],
  },

  // 4. Size (Replaces Breed Search - ZERO friction)
  {
    id: 'size',
    category: 'COMPORTAMIENTO',
    type: 'single',
    question: '¿De que tamaño es {name}?',
    options: [
      { value: 'chico', label: 'Chico (0-10kg)', icon: '🐶' },
      { value: 'mediano', label: 'Mediano (11-25kg)', icon: '🐕' },
      { value: 'grande', label: 'Grande (+26kg)', icon: '🐘' },
    ],
  },

  // 5. Environment (High-density hook)
  {
    id: 'environment',
    category: 'EN EL HOGAR',
    type: 'single',
    question: '¿Dónde vive {name} actualmente?',
    options: [
      { value: 'apt', label: 'Departamento / Flat', icon: '🏢' },
      { value: 'house', label: 'Casa con patio', icon: '🏡' },
      { value: 'other', label: 'Otro / Terreno', icon: '🌳' },
    ],
  },

  // 6. Main Challenges (Consolidated - Mirroring Creative)
  {
    id: 'daily-habits',
    category: 'RETOS PRINCIPALES',
    type: 'multiple',
    question: '¿Qué comportamientos de {name} te gustaría corregir hoy?',
    options: [
      { value: 'accidents', label: 'Hace sus necesidades en interior', icon: '🏠' },
      { value: 'barking', label: 'Ladridos excesivos (vecinos molestos)', icon: '🔊' },
      { value: 'biting', label: 'Muerde manos, muebles o cosas', icon: '🦷' },
      { value: 'pulling', label: 'Tira mucho de la correa al pasear', icon: '💪' },
      { value: 'alone', label: 'Llora o destruye al quedarse solo', icon: '😟' },
    ],
  },

  // 7. Motivation (Deepening the Ad Hook)
  {
    id: 'motivation',
    category: 'ESTILO DE VIDA',
    type: 'single',
    question: 'Para ti, ¿qué es lo más importante en su educación?',
    options: [
      { value: 'no-punish', label: 'Educar con amor, sin golpes ni gritos', icon: '❤️' },
      { value: 'fast', label: 'Tener resultados rápidos (15 min/día)', icon: '⚡' },
      { value: 'bonding', label: 'Tener una mejor relación con mi perro', icon: '🤝' },
    ],
  },

  // 8. Final Conversion Block
  { id: 'processing', type: 'info' },
  { id: 'result', type: 'info' },
  {
    id: 'email',
    type: 'text',
    question: '¿A qué email te enviamos el diagnóstico de {name}?',
    placeholder: 'tu@email.com'
  },
  { id: 'sales', type: 'info' },
];
