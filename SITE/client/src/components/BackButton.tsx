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
      className="fixed top-4 left-4 z-40 rounded-full hover:bg-muted text-[#333333]"
      aria-label="Voltar"
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  );
}
