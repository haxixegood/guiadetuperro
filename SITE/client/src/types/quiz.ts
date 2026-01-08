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
  image?: string;
}

export type QuizStep = {
  id: string;
  type: 'info' | 'single' | 'multiple' | 'text' | 'slider' | 'search' | 'email';

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

  // 4. Comportamentos Indesejados (VISUAL CARDS)
  {
    id: 'behaviors',
    category: 'ANÁLISIS DE COMPORTAMIENTO',
    type: 'multiple',
    question: 'Marca todo lo que {name} hace en casa',
    subtitle: 'Selecciona todos los comportamientos que quieres eliminar',
    options: [
      {
        value: 'pulling',
        label: 'Tira de la correa',
        icon: '🦮',
        image: 'https://images.unsplash.com/photo-1625316709148-634ccae464b7?q=80&w=600&auto=format&fit=crop' // Dog pulling/running
      },
      {
        value: 'peeing',
        label: 'Hace pipí en lugares incorrectos',
        icon: '💧',
        image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=600&auto=format&fit=crop' // Guilty dog
      },
      {
        value: 'biting',
        label: 'Muerde muebles o manos',
        icon: '🦷',
        image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=600&auto=format&fit=crop' // Dog chewing
      },
      {
        value: 'barking',
        label: 'Ladra excesivamente',
        icon: '🔊',
        image: 'https://images.unsplash.com/photo-1558550186-b4528c7c9438?q=80&w=600&auto=format&fit=crop' // Dog barking
      },
      {
        value: 'jumping',
        label: 'Salta sobre las personas',
        icon: '🐕',
        image: 'https://images.unsplash.com/photo-1546447147-3f20b33568c0?q=80&w=600&auto=format&fit=crop' // Dog jumping
      },
      {
        value: 'alone',
        label: 'Ansiedad al quedarse solo',
        icon: '😟',
        image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=600&auto=format&fit=crop' // Sad pug
      },
    ],
  },

  // 5. Nivel de Urgencia
  {
    id: 'urgency',
    category: 'PRIORIDAD',
    type: 'single',
    question: '¿Qué tan urgente es resolver esto?',
    options: [
      { value: 'critical', label: 'Crítico - No puedo más con esto', icon: '🚨' },
      { value: 'high', label: 'Alto - Necesito solución pronto', icon: '⚠️' },
      { value: 'moderate', label: 'Moderado - Puedo esperar un poco', icon: '📅' },
    ],
  },

  // 6. Objetivo Principal
  {
    id: 'goal',
    category: 'TU OBJETIVO',
    type: 'single',
    question: 'Si pudieras elegir un solo beneficio hoy, ¿cuál sería?',
    options: [
      { value: 'no-punish', label: 'Educar con amor, sin gritos ni castigos', icon: '❤️' },
      { value: 'fast', label: 'Resultados reales con solo 15 min al día', icon: '⚡' },
      { value: 'bonding', label: 'Tener una conexión profunda e inquebrantable', icon: '🤝' },
    ],
  },

  // 7. Bonus Selection (GAMIFICATION)
  { id: 'bonus-selection', type: 'info' },

  // 8. Discount Reveal (GAMIFICATION)
  { id: 'discount-reveal', type: 'info' },

  // 9. Processing
  { id: 'processing', type: 'info' },

  // 10. Result
  { id: 'result', type: 'info' },

  // 11. Email (Optional - can be removed if going straight to sales)
  {
    id: 'email',
    type: 'text',
    question: '¡Diagnóstico casi listo! ¿A qué email enviamos el plan de {name}?',
    placeholder: 'Introduce tu email principal'
  },
];
