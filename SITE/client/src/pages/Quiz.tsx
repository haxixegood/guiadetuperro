import { useQuiz } from '@/contexts/QuizContext';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

import WelcomeScreen from './WelcomeScreen';
import ProcessingScreen from './ProcessingScreen';
import ResultScreen from './ResultScreen';
import { Footprints } from 'lucide-react';
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
  const {
    currentStep,
    goToNextStep,
    updateQuizData,
    quizData,
    unlockedRewards,
    showRewardAnimation,
    unlockReward,
    hideRewardAnimation
  } = useQuiz();
  const [, setLocation] = useLocation();

  const step = QUIZ_STEPS[currentStep];

  if (!step) {
    return <div>Carregando...</div>;
  }

  // Substitui {name} pelo nome do cachorro, se existir
  const question =
    step.question?.replace('{name}', quizData.name || 'tu perrito') || '';

  const handleAnswer = (value: any) => {
    // Sanitize Name (Evita que o nome do cachorro vire "skip")
    if (step.id === 'name' && (value === 'skip' || !value)) {
      value = 'tu perrito';
    }

    const key = step.id as keyof typeof quizData;
    updateQuizData({ [key]: value });

    // Gatilhos de Gamificação
    if (step.id === 'age') unlockReward('Plan Personalizado');
    if (step.id === 'daily-habits') unlockReward('Checklist: Casa Limpa');
    if (step.id === 'motivation') unlockReward('Audio Relaxante');

    // Tracking de Milestones (Conversão)
    if (window.fbq && [2, 5, 8].includes(currentStep)) {
      window.fbq('trackCustom', 'QuizMilestone', { step: currentStep });
    }

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

  const rewardMetadata: Record<string, { title: string, icon: string }> = {
    'Plan Personalizado': { title: 'Plan de 21 días generado con éxito', icon: '📝' },
    'Checklist: Casa Limpa': { title: 'Bono: Checklist de Baño Unlocked', icon: '🚽' },
    'Audio Relaxante': { title: 'Bono: Áudio Calmante Unlocked', icon: '🎵' }
  };

  const currentReward = unlockedRewards[unlockedRewards.length - 1];

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

      <ProgressBar />

      <BackButton />

      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-2xl cyber-card p-8 md:p-12 animate-slide-up-fade">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}
