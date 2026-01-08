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
            return <SingleChoice question={question} options={step.options || []} category={step.category} skipText={step.skipText} onAnswer={handleAnswer} />;

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
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <ProgressBar />
      {currentStep > 0 && <BackButton />}

      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl organic-card p-8 md:p-12"
        >
          {renderStep()}
        </motion.div>
      </main>

      {/* HUD DECOR CORNERS - ONLY TOP */}
      <div className="fixed top-20 left-10 w-4 h-4 border-l border-t border-white/10 pointer-events-none" />
      <div className="fixed top-20 right-10 w-4 h-4 border-r border-t border-white/10 pointer-events-none" />

      {/* Floating HUD Elements - SUBTLE */}
      <div className="fixed top-1/4 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Sticky Reinforcement Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary/10 border-t border-primary/20 py-2 z-30 backdrop-blur-sm">
        <p className="text-center text-xs font-black text-white/60 uppercase tracking-widest">
          📱 Solucionable en 15 min/día | ⚡ Sin gritos ni castigos
        </p>
      </div>
    </div>
  );
}
