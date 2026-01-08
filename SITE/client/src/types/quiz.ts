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
    question: '¿Qué edad tiene {name}?',
    subtitle: 'Su etapa de vida define el método de aprendizaje.',
    options: [
      { value: '0-6', label: 'Cachorro (0–12 meses)', icon: 'age-puppy' },
      { value: '1-7', label: 'Adulto (1–7 años)', icon: 'age-adult' },
      { value: '7+', label: 'Senior (+7 años)', icon: 'age-senior' },
    ],
  },

  // 4. Size
  {
    id: 'size',
    category: 'COMPORTAMIENTO',
    type: 'single',
    question: '¿De qué tamaño es {name}?',
    subtitle: 'El gasto de energía varía según su peso.',
    options: [
      { value: 'chico', label: 'Chico (0-10kg)', icon: 'dog-sm' },
      { value: 'mediano', label: 'Mediano (11-25kg)', icon: 'dog-md' },
      { value: 'grande', label: 'Grande (+26kg)', icon: 'dog-lg' },
    ],
  },

  // 5. Environment
  {
    id: 'environment',
    category: 'ANÁLISIS DE ENTORNO',
    type: 'single',
    question: '¿Dónde vive {name}?',
    subtitle: 'El entorno influye en su nivel de estrés.',
    options: [
      { value: 'apt', label: 'Departamento / Flat', icon: 'env-apt' },
      { value: 'house', label: 'Casa con patio', icon: 'env-house' },
      { value: 'other', label: 'Terreno / Espacio abierto', icon: 'env-land' },
    ],
  },

  // 4. Comportamentos Indesejados (VISUAL CARDS)
  {
    id: 'behaviors',
    category: 'ANÁLISIS DE COMPORTAMIENTO',
    type: 'multiple',
    question: '¿Qué desafíos está enfrentando tu perrito actualmente?',
    subtitle: 'Selecciona los comportamientos que vamos a transformar. No te preocupes, todos tienen solución.',
    options: [
      {
        value: 'pulling',
        label: 'Tira de la correa',
        icon: 'behavior-leash',
      },
      {
        value: 'peeing',
        label: 'Pipí en lugar incorrecto',
        icon: 'behavior-pee',
      },
      {
        value: 'biting',
        label: 'Muerde muebles o manos',
        icon: 'behavior-biting',
      },
      {
        value: 'barking',
        label: 'Ladra excesivamente',
        icon: 'behavior-barking',
      },
      {
        value: 'jumping',
        label: 'Salta sobre las personas',
        icon: 'behavior-jumping',
      },
      {
        value: 'alone',
        label: 'Ansiedad por soledad',
        icon: 'behavior-alone',
      },
    ],
  },

  // 5. Nivel de Urgencia
  {
    id: 'urgency',
    category: 'PRIORIDAD',
    type: 'single',
    question: '¿Qué tan urgente es resolver esto para {name}?',
    options: [
      { value: 'critical', label: 'Crítico: No aguanto más', icon: 'urgency-critical' },
      { value: 'high', label: 'Alto: Necesito solución', icon: 'urgency-high' },
      { value: 'moderate', label: 'Moderado: Evitar que empeore', icon: 'urgency-moderate' },
    ],
  },

  // 6. Objetivo Principal
  {
    id: 'goal',
    category: 'TU OBJETIVO',
    type: 'single',
    question: '¿Cuál de estos resultados es el más prioritario para ti y para {name} hoy?',
    options: [
      { value: 'no-punish', label: 'Educar con amor, sin castigos', icon: 'goal-love' },
      { value: 'fast', label: 'Resultados en 15 min al día', icon: 'goal-speed' },
      { value: 'bonding', label: 'Vínculo profundo y real', icon: 'goal-bond' },
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
