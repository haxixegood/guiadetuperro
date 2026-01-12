import { AnimatePresence, motion } from 'framer-motion';
import { useQuiz } from '@/contexts/QuizContext';
import { useEffect } from 'react';
import WelcomeScreen from './WelcomeScreen';
import SingleChoice from '@/components/questions/SingleChoice';
import MultipleChoice from '@/components/questions/MultipleChoice';
import RevelationScreen from './RevelationScreen';
import EmailStep from '@/components/questions/EmailStep';
import { QUIZ_STEPS } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Quiz() {
  const { currentStep, handleAnswer } = useQuiz();

  useEffect(() => {
    // RESET NAVIGATION: Load from Top (0,0)
    window.scrollTo(0, 0);
  }, [currentStep]);

  const step = QUIZ_STEPS[currentStep];

  if (!step) return null;

  const renderStep = () => {
    if (step.id === 'revelation') {
      return <RevelationScreen />;
    }

    switch (step.type) {
      case 'info':
        if (step.id === 'welcome') return <WelcomeScreen />;
        return <WelcomeScreen />;

      case 'single':
        return (
          <SingleChoice
            question={step.question}
            subtitle={step.subtitle}
            options={step.options || []}
            onAnswer={handleAnswer}
          />
        );

      case 'multiple':
        return (
          <MultipleChoice
            question={step.question}
            subtitle={step.subtitle}
            options={step.options || []}
            onAnswer={handleAnswer}
          />
        );

      case 'text':
        if (step.id === 'email') return <EmailStep />;
        return (
          <div className="flex flex-col items-center min-h-screen px-6 pt-16 font-sans">
            <h2 className="text-2xl font-[900] text-center uppercase mb-8">{step.question || ''}</h2>
            <div className="w-full max-w-sm space-y-6">
              <Input
                type="text"
                placeholder={step.placeholder || ''}
                className="h-16 rounded-2xl border-2 border-gray-100 focus:border-[#28a745] px-6 text-lg font-medium"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = (e.currentTarget as HTMLInputElement).value;
                    if (val) handleAnswer(val);
                  }
                }}
              />
              <Button
                onClick={() => {
                  const input = document.querySelector('input');
                  if (input && input.value) {
                    handleAnswer(input.value);
                  }
                }}
                className="w-full h-16 rounded-full bg-[#28a745] text-white font-bold text-lg uppercase shadow-lg"
              >
                CONTINUAR
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Header / Progress */}
      {step.id !== 'revelation' && step.id !== 'welcome' && (
        <div className="fixed top-0 left-0 w-full h-[6px] bg-gray-100 z-[100]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (QUIZ_STEPS.length - 1)) * 100}%` }}
            className="h-full bg-[#28a745]"
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
