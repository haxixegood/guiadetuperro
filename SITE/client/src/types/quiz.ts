// ======================
// TIPO BASE DO QUIZ
// ======================
export interface QuizData {
  [key: string]: any;
}

export interface QuizOption {
  value: string;
  label: string;
  icon?: string;
}

export type QuizStep = {
  id: string;
  type: 'info' | 'single' | 'multiple' | 'text' | 'slider' | 'search';

  category?: string;
  question?: string;
  subtitle?: string;
  placeholder?: string;
  skipText?: string;

  options?: QuizOption[];

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

  // 2. Name
  {
    id: 'name',
    type: 'text',
    question: 'Para empezar este análisis personalizado, ¿cómo se llama tu perrito?',
    placeholder: 'Nombre de tu mejor amigo',
    skipText: 'Prefiero no decir el nombre',
  },

  // 3. Age
  {
    id: 'age',
    category: 'PERFIL INDIVIDUAL',
    type: 'single',
    question: '¿Qué edad tiene {name}? Su etapa de vida define el método de aprendizaje.',
    options: [
      { value: '0-6', label: 'Cachorro (0–12 meses) - Etapa crítica' },
      { value: '1-7', label: 'Adulto (1–7 años) - Hábitos formados' },
      { value: '7+', label: 'Senior (Más de 7 años) - Sabio pero terco' },
    ],
  },

  // 4. Size
  {
    id: 'size',
    category: 'COMPORTAMIENTO',
    type: 'single',
    question: '¿De que tamaño es {name}? El gasto de energía varía según su peso.',
    options: [
      { value: 'chico', label: 'Chico (0-10kg)', icon: '🐶' },
      { value: 'mediano', label: 'Mediano (11-25kg)', icon: '🐕' },
      { value: 'grande', label: 'Grande (+26kg)', icon: '🐘' },
    ],
  },

  // 5. Environment
  {
    id: 'environment',
    category: 'ANÁLISIS DE ENTORNO',
    type: 'single',
    question: '¿Dónde vive {name}? El espacio influye directamente en su nivel de estrés.',
    options: [
      { value: 'apt', label: 'Departamento (Espacio limitado)', icon: '🏢' },
      { value: 'house', label: 'Casa con patio (Más estímulos)', icon: '🏡' },
      { value: 'other', label: 'Otro / Terreno (Libertad total)', icon: '🌳' },
    ],
  },

  // 6. Main Challenges
  {
    id: 'daily-habits',
    category: 'PROBLEMAS DE CONDUCTA',
    type: 'multiple',
    question: '¿Qué comportamientos de {name} te están causando más frustración hoy?',
    options: [
      { value: 'accidents', label: 'Hace sus necesidades en el lugar equivocado', icon: '🏠' },
      { value: 'barking', label: 'Ladridos excesivos que molestan a todos', icon: '🔊' },
      { value: 'biting', label: 'Muerde manos, muebles o destruye cosas', icon: '🦷' },
      { value: 'pulling', label: 'Tira de la correa como si quisiera escapar', icon: '💪' },
      { value: 'alone', label: 'No soporta quedarse solo (Ansiedad)', icon: '😟' },
    ],
  },

  // 7. Motivation
  {
    id: 'motivation',
    category: 'TU OBJETIVO',
    type: 'single',
    question: 'Si pudieras elegir un solo beneficio ahora, ¿cuál sería?',
    options: [
      { value: 'no-punish', label: 'Educar con amor, sin gritos ni castigos', icon: '❤️' },
      { value: 'fast', label: 'Resultados reales con solo 15 min al día', icon: '⚡' },
      { value: 'bonding', label: 'Tener una conexión profunda e inquebrantable', icon: '🤝' },
    ],
  },

  // 8. Final Conversion Block
  { id: 'processing', type: 'info' },
  { id: 'result', type: 'info' },
  {
    id: 'email',
    type: 'text',
    question: '¡Diagnóstico casi listo! ¿A qué email enviamos el plan de {name}?',
    placeholder: 'Introduce tu email principal'
  },
  { id: 'sales', type: 'info' },
];
