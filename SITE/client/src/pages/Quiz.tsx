import { useQuiz } from '@/contexts/QuizContext';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

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
    const key = step.id as keyof typeof quizData;
    updateQuizData({ [key]: value });

    // Gatilhos de Gamificação
    if (step.id === 'age') unlockReward('Plan Personalizado');
    if (step.id === 'daily-habits') unlockReward('Checklist: Casa Limpa');
    if (step.id === 'motivation') unlockReward('Audio Relaxante');

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
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

      <ProgressBar />

      {/* GAMIFICATION METER */}
      <div className="px-6 py-2 bg-slate-50 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[8px] ${unlockedRewards.length > i ? 'bg-green-500 text-white font-black' : 'bg-slate-200 text-slate-400'}`}>
                {unlockedRewards.length > i ? '✓' : i + 1}
              </div>
            ))}
          </div>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Bónus</span>
        </div>
        <div className="text-[10px] font-black text-primary">
          VALOR: <span className="text-slate-900">${(unlockedRewards.length * 249).toLocaleString()} MXN</span>
        </div>
      </div>

      <BackButton />

      {/* REWARD ANIMATION OVERLAY */}
      <AnimatePresence>
        {showRewardAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] w-full max-w-xs px-4"
          >
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-white/20 flex flex-col items-center text-center gap-4">
              <div className="text-5xl animate-bounce">
                {rewardMetadata[currentReward]?.icon || '🎁'}
              </div>
              <div className="space-y-1">
                <p className="text-primary font-black uppercase text-[10px] tracking-widest">¡NUEVO LOGRO!</p>
                <h3 className="text-lg font-black leading-tight">
                  {rewardMetadata[currentReward]?.title || 'Recompensa Desbloqueada'}
                </h3>
              </div>
              <Button onClick={hideRewardAnimation} className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl font-black">
                ¡GENIAL!
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl quiz-card animate-slide-up-fade">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}
