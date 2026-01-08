import { useQuiz } from '@/contexts/QuizContext';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './WelcomeScreen';
import ProcessingScreen from './ProcessingScreen';
import ResultScreen from './ResultScreen';
import SalesPage from './SalesPage';

import SingleChoice from '@/components/questions/SingleChoice';
import MultipleChoice from '@/components/questions/MultipleChoice';
import TextInput from '@/components/questions/TextInput';
import SliderQuestion from '@/components/questions/SliderQuestion';
import EmailInput from '@/components/questions/EmailInput';

import { QUIZ_STEPS } from '@/types/quiz';
import { useLocation } from 'wouter';

export default function Quiz() {
  const {
    currentStep,
    updateQuizData,
    quizData,
    goToNextStep
  } = useQuiz();
  const [, setLocation] = useLocation();

  const step = QUIZ_STEPS[currentStep];

  if (!step) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-black uppercase tracking-[0.5em] animate-pulse">Syncing...</div>;
  }

  const question = step.question?.replace('{name}', quizData.name || 'tu perrito') || '';

  const handleAnswer = (value: any) => {
    if (step.id === 'name' && (value === 'skip' || !value)) {
      value = 'tu perrito';
    }

    const key = step.id as keyof typeof quizData;
    updateQuizData({ [key]: value });

    if (step.id === 'email') {
      setLocation('/sales');
      return;
    }

    goToNextStep();
  };

  const renderStep = () => {
    switch (step.id) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'processing':
        return <ProcessingScreen />;
      case 'result':
        return <ResultScreen />;
      default:
        switch (step.type) {
          case 'single':
            return <SingleChoice question={question} options={step.options || []} category={step.category} skipText={step.skipText} onAnswer={handleAnswer} />;
          case 'multiple':
            return <MultipleChoice question={question} subtitle={step.subtitle} options={step.options || []} category={step.category} skipText={step.skipText} onAnswer={handleAnswer} />;
          case 'email':
            return <EmailInput question={question} subtitle={step.subtitle} placeholder={step.placeholder} onAnswer={handleAnswer} />;
          default:
            return <div className="organic-card p-10 text-center">Tipo não mapeado: {step.type}</div>;
        }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <ProgressBar />
      {currentStep > 0 && <BackButton />}

      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-2xl organic-card p-8 md:p-12 animate-slide-up-fade">
          {renderStep()}
        </div>
      </main>

      {/* HUD DECOR CORNERS */}
      <div className="fixed top-20 left-10 w-4 h-4 border-l border-t border-white/10 pointer-events-none" />
      <div className="fixed top-20 right-10 w-4 h-4 border-r border-t border-white/10 pointer-events-none" />
    </div>
  );
}
