import { Progress } from '@/components/ui/progress';
import { useQuiz } from '@/contexts/QuizContext';

const QuizProgress = () => {
  const { currentQuestionNumber, totalQuestionCount } = useQuiz();

  return (
    <div>
      <Progress value={(currentQuestionNumber / totalQuestionCount) * 100} />
    </div>
  );
};

export default QuizProgress;
