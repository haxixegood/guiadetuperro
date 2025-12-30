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
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizData, setQuizData] = useState<QuizData>({});
  const [currentStep, setCurrentStep] = useState(0);
  
  const totalSteps = 27; // Total de etapas do quiz (inclui discount-wheel)
  const progress = (currentStep / totalSteps) * 100;
  
  const updateQuizData = (data: Partial<QuizData>) => {
    setQuizData(prev => ({ ...prev, ...data }));
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
