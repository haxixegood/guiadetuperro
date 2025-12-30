import { useQuiz } from '@/contexts/QuizContext';

export default function ProgressBar() {
  const { progress } = useQuiz();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="h-2 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
