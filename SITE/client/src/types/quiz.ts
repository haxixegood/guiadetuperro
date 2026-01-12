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
// QUIZ STEPS - OPTIMIZED FOR CONVERSION
// ======================
export const QUIZ_STEPS: QuizStep[] = [
  // 1. Welcome
  {
    id: 'welcome',
    type: 'info',
  },

  // 1.5 Name (Personalization)
  {
    id: 'name',
    type: 'text',
    question: '¿Cómo se llama tu mejor amigo?',
    placeholder: 'Introduce el nombre de tu perro',
  },

  // 2. Age (REPLACES NAME STEP)
  {
    id: 'age',
    category: 'PERFIL INDIVIDUAL',
    type: 'single',
    question: '¿Qué edad tiene tu mejor amigo?',
    subtitle: 'Su etapa de vida define el método de aprendizaje.',
    options: [
      { value: '0-12m', label: 'CACHORRO (0-12 MESES)', icon: '3d-age-puppy' },
      { value: '1-7y', label: 'ADULTO (1-7 AÑOS)', icon: '3d-age-adult' },
      { value: '+7y', label: 'SENIOR (8+ AÑOS)', icon: '3d-age-senior' },
    ],
  },

  // 3. Energy Level (REPLACES SIZE)
  {
    id: 'energy',
    category: 'NIVEL DE ENERGÍA',
    type: 'single',
    question: '¿Cómo definirías el nivel de energía de tu perro?',
    subtitle: 'Su gasto de energía varía según su personalidad y tamaño.',
    options: [
      { value: 'tranquilo', label: 'TRANQUILO (Prefiere dormir y muerde poco)', icon: '3d-energy-tranquilo' },
      { value: 'activo', label: 'ACTIVO (Le gusta jugar pero se distrae fácil)', icon: '3d-energy-activo' },
      { value: 'hiperactivo', label: 'HIPERACTIVO (No para quieto y destruye cosas)', icon: '3d-energy-hiperactivo' },
    ],
  },

  // 4. Tutor Reaction (REPLACES ENVIRONMENT)
  {
    id: 'reaction',
    category: 'REACCIÓN DEL TUTOR',
    type: 'single',
    question: '¿Cómo reaccionas cuando tu perro se porta mal?',
    subtitle: 'Entender tu reacción es clave para desbloquear su aprendizaje.',
    options: [
      { value: 'tranquilo', label: 'Espera tranquilo a que le sirva', icon: '3d-reaction-question' },
      { value: 'activo', label: 'Se emociona y salta mucho', icon: '3d-reaction-cloud' },
      { value: 'intenso', label: 'Ladra o se desespera por comer', icon: '3d-reaction-megaphone' },
    ],
  },

  // 5. Behaviors (MULTIPLE CHOICE)
  {
    id: 'behaviors',
    category: 'ANÁLISIS DE COMPORTAMIENTO',
    type: 'multiple',
    question: '¿Qué comportamientos vamos a transformar hoy?',
    subtitle: 'Tu plan personalizado incluirá soluciones para cada opción que selecciones.',
    options: [
      { value: 'morder', label: 'Morder', icon: '3d-behavior-bite' },
      { value: 'pipi', label: 'Pipí / Higiene', icon: '3d-behavior-pee' },
      { value: 'correa', label: 'Correa / Paseo', icon: '3d-behavior-leash' },
      { value: 'ladridos', label: 'Ladridos', icon: '3d-behavior-bark' },
    ],
  },

  // 6. Urgency (PULSE EFFECT ON CRITICO)
  {
    id: 'urgency',
    category: 'PRIORIDAD',
    type: 'single',
    question: '¿Qué tan urgente es para ti resolver esto hoy?',
    subtitle: 'Priorizaremos tu plan de acción según tu necesidad de cambio.',
    options: [
      { value: 'critical', label: 'CRÍTICO', icon: '3d-urgency-siren' },
      { value: 'high', label: 'ALTO', icon: '3d-urgency-alert' },
      { value: 'moderate', label: 'MODERADO', icon: '3d-urgency-clock' },
    ],
  },

  // 7. Main Goal
  {
    id: 'goal',
    category: 'TU OBJETIVO',
    type: 'single',
    question: '¿Cuál de estos resultados es el más prioritario para ti hoy?',
    options: [
      { value: 'love', label: 'EDUCAR CON AMOR', icon: '3d-goal-heart' },
      { value: 'fast', label: 'RESULTADOS RÁPIDOS', icon: '3d-goal-speed' },
      { value: 'bond', label: 'VÍNCULO PROFUNDO', icon: '3d-goal-bond' },
    ],
  },

  // 8. Consolidation into RevelationScreen
  { id: 'revelation', type: 'info' },

  // 9. Email step (Final)
  {
    id: 'email',
    type: 'text',
    question: '¡Diagnóstico casi listo! ¿A qué email enviamos tu plan?',
    placeholder: 'Introduce tu email principal'
  },
];
