import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizData } from '@/types/quiz';

interface QuizContextType {
  quizData: QuizData;
  updateQuizData: (data: Partial<QuizData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  progress: number;
  initialPain: string | null;     // Dor principal selecionada na Landing (Budge Page)
  unlockedRewards: string[];      // Recompensas ganhas (ex: 'bonus-1', 'audio-relax')
  showRewardAnimation: boolean;   // Controla o pop-up de conquista
  unlockReward: (id: string) => void;
  hideRewardAnimation: () => void;
  setInitialPain: (pain: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizData, setQuizData] = useState<QuizData>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [initialPain, setInitialPain] = useState<string | null>(null);
  const [unlockedRewards, setUnlockedRewards] = useState<string[]>([]);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  const totalSteps = 27; // Total de etapas do quiz (inclui discount-wheel)
  const progress = (currentStep / totalSteps) * 100;

  const unlockReward = (id: string) => {
    if (!unlockedRewards.includes(id)) {
      setUnlockedRewards(prev => [...prev, id]);
      setShowRewardAnimation(true);
    }
  };

  const hideRewardAnimation = () => setShowRewardAnimation(false);

  const updateQuizData = (data: Partial<QuizData>) => {
    setQuizData((prev: QuizData) => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <QuizContext.Provider
      value={{
        quizData,
        updateQuizData,
        currentStep,
        setCurrentStep,
        goToNextStep,
        goToPreviousStep,
        progress,
        initialPain,
        unlockedRewards,
        showRewardAnimation,
        unlockReward,
        hideRewardAnimation,
        setInitialPain,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
