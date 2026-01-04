import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';

export default function BackButton() {
  const { goToPreviousStep, currentStep } = useQuiz();
  
  if (currentStep === 0) return null;
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={goToPreviousStep}
      className="fixed top-6 left-6 z-40 rounded-full hover:bg-muted"
      aria-label="Voltar"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}
