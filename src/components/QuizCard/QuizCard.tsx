import { useQuiz } from '@/contexts/QuizContext';
import { cn } from '@/lib/utils';
import QuizCardChoice from '../QuizCardChoice';

const QuizCard = () => {
  const { currentQuestion } = useQuiz();

  return (
    <div className={cn('flex flex-col gap-8')}>
      <h2 className={cn('leading-7 break-keep')}>{currentQuestion.question}</h2>

      <div className={cn('flex flex-col gap-4')}>
        {Object.entries(currentQuestion.choices).map(
          ([choiceKey, choiceText]) => {
            return (
              <QuizCardChoice
                key={choiceKey}
                choiceKey={choiceKey}
                choiceText={choiceText}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default QuizCard;
