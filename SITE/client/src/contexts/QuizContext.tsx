import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizData, QUIZ_STEPS } from '@/types/quiz';
import { useLocation } from 'wouter';

interface QuizContextType {
  quizData: QuizData;
  updateQuizData: (data: Partial<QuizData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  handleAnswer: (answer: any) => void;
  progress: number;
  initialPain: string | null;
  unlockedRewards: string[];
  showRewardAnimation: boolean;
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
  const [, setLocation] = useLocation();

  const totalSteps = QUIZ_STEPS.length;
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

  const handleAnswer = (answer: any) => {
    const step = QUIZ_STEPS[currentStep];
    if (!step) return;

    // Persist answer
    updateQuizData({ [step.id]: answer });

    // Handle flow logic
    if (step.id === 'email') {
      setLocation('/sales');
    } else {
      goToNextStep();
    }
  };

  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
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
        handleAnswer,
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
