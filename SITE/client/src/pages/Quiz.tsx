import { useQuiz } from '@/contexts/QuizContext';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';
import { motion } from 'framer-motion';
import WelcomeScreen from './WelcomeScreen';
import ProcessingScreen from './ProcessingScreen';
import ResultScreen from './ResultScreen';
import BonusSelection from './BonusSelection';
import DiscountReveal from './DiscountReveal';

import SingleChoice from '@/components/questions/SingleChoice';
import MultipleChoice from '@/components/questions/MultipleChoice';
import VisualCardGrid from '@/components/questions/VisualCardGrid';
import TextInput from '@/components/questions/TextInput';
import SliderQuestion from '@/components/questions/SliderQuestion';
import EmailInput from '@/components/questions/EmailInput';

import { QUIZ_STEPS } from '@/types/quiz';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

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

      case 'behaviors':
        // VISUAL CARD GRID for behavior selection
        return (
          <VisualCardGrid
            question={question}
            subtitle={step.subtitle}
            category={step.category}
            behaviors={(step.options || []).map(opt => ({
              id: opt.value,
              label: opt.label,
              emoji: opt.icon || '🐾',
              image: opt.image
            }))}
            onAnswer={handleAnswer}
            minSelection={1}
          />
        );

      case 'bonus-selection':
        return <BonusSelection onBonusSelected={handleAnswer} />;

      case 'discount-reveal':
        return <DiscountReveal onContinue={() => handleAnswer('continue')} />;

      case 'processing':
        return <ProcessingScreen />;

      case 'result':
        return <ResultScreen />;

      default:
        switch (step.type) {
          case 'single':
            return <SingleChoice question={question} subtitle={step.subtitle} options={step.options || []} category={step.category} skipText={step.skipText} onAnswer={handleAnswer} />;

          case 'multiple':
            return <MultipleChoice question={question} subtitle={step.subtitle} options={step.options || []} category={step.category} skipText={step.skipText} onAnswer={handleAnswer} />;

          case 'text':
            return <TextInput question={question} subtitle={step.subtitle} category={step.category} placeholder={step.placeholder} skipText={step.skipText} type="text" onAnswer={handleAnswer} />;

          case 'slider':
            return <SliderQuestion question={question} subtitle={step.subtitle} category={step.category} min={step.min} max={step.max} minLabel={step.minLabel} maxLabel={step.maxLabel} illustration={step.illustration} onAnswer={handleAnswer} />;

          case 'email':
            return <EmailInput question={question} subtitle={step.subtitle} placeholder={step.placeholder} onAnswer={handleAnswer} />;

          case 'info':
            return (
              <div className="space-y-6 text-center">
                <h3 className="text-2xl font-black">{question}</h3>
                <Button onClick={() => handleAnswer('next')} className="yellow-cta px-12 py-8">
                  CONTINUAR
                </Button>
              </div>
            );

          default:
            return <div className="organic-card p-10 text-center">Tipo não mapeado: {step.type}</div>;
        }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden font-sans">
      {currentStep > 0 && <BackButton />}

      <main className="flex-1 flex flex-col relative z-10">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full h-full max-w-md mx-auto flex flex-col pt-24 pb-24"
        >
          {renderStep()}
        </motion.div>
      </main>

      {/* FIXED HUD ELEMENTS - Minimalist */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-20" />
      <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />

    </div>
  );
}
