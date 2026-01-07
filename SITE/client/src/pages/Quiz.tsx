import { useQuiz } from '@/contexts/QuizContext';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';

import WelcomeScreen from './WelcomeScreen';
import ProcessingScreen from './ProcessingScreen';
import ResultScreen from './ResultScreen';
import SalesPage from './SalesPage';
import ThankYou from './thank-you';

import SingleChoice from '@/components/questions/SingleChoice';
import MultipleChoice from '@/components/questions/MultipleChoice';
import TextInput from '@/components/questions/TextInput';
import SliderQuestion from '@/components/questions/SliderQuestion';
import EmailInput from '@/components/questions/EmailInput';

import { QUIZ_STEPS } from '@/types/quiz';
import { useLocation } from 'wouter';

export default function Quiz() {
  const { currentStep, goToNextStep, updateQuizData, quizData } = useQuiz();
  const [, setLocation] = useLocation();

  const step = QUIZ_STEPS[currentStep];

  if (!step) {
    return <div>Carregando...</div>;
  }

  // Substitui {name} pelo nome do cachorro, se existir
  const question =
    step.question?.replace('{name}', quizData.name || 'tu perrito') || '';

  const handleAnswer = (value: any) => {
    const key = step.id as keyof typeof quizData;
    updateQuizData({ [key]: value });

    // 🔥 REDIRECT DEFINITIVO PARA SALES PAGE APÓS EMAIL
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

      case 'environment':
        return (
          <SingleChoice
            question={question}
            options={step.options || []}
            category={step.category}
            onAnswer={handleAnswer}
          />
        );

      case 'processing':
        return <ProcessingScreen />;

      case 'result':
        return <ResultScreen />;

      case 'email':
        return (
          <EmailInput
            question={question}
            subtitle={step.subtitle}
            category={step.category}
            placeholder={step.placeholder}
            skipText={step.skipText}
            onAnswer={handleAnswer}
          />
        );

      default:
        switch (step.type) {
          case 'single':
            return (
              <SingleChoice
                question={question}
                options={step.options || []}
                category={step.category}
                skipText={step.skipText}
                onAnswer={handleAnswer}
              />
            );

          case 'multiple':
            return (
              <MultipleChoice
                question={question}
                subtitle={step.subtitle}
                options={step.options || []}
                category={step.category}
                skipText={step.skipText}
                onAnswer={handleAnswer}
              />
            );

          case 'text':
            return (
              <TextInput
                question={question}
                subtitle={step.subtitle}
                category={step.category}
                placeholder={step.placeholder}
                skipText={step.skipText}
                type="text"
                onAnswer={handleAnswer}
              />
            );

          case 'slider':
            return (
              <SliderQuestion
                question={question}
                subtitle={step.subtitle}
                category={step.category}
                min={step.min}
                max={step.max}
                minLabel={step.minLabel}
                maxLabel={step.maxLabel}
                illustration={step.illustration}
                onAnswer={handleAnswer}
              />
            );

          case 'info':
            return null; // Info steps usually have their own screen or are handled by specific IDs

          default:
            return (
              <div className="p-8 text-center bg-card rounded-2xl shadow-lg border">
                <h3 className="text-xl font-bold mb-2">Ops!</h3>
                <p className="text-muted-foreground">
                  Tipo de pergunta não implementado: <b>{step.type}</b>
                </p>
              </div>
            );
        }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ProgressBar />
      <BackButton />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl quiz-card animate-slide-up-fade">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}
