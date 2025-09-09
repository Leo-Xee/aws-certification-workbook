import { useQuiz } from '@/contexts/QuizContext';
import { cn } from '@/lib/utils';
import { CircleCheck, CircleX } from 'lucide-react';

type QuizCardChoiceProps = {
  choiceKey: string;
  choiceText: string;
};

const QuizCardChoice = ({ choiceKey, choiceText }: QuizCardChoiceProps) => {
  const {
    selectedChoices,
    correctAnswers,
    hasSelectedAllAnswers,
    selectChoice,
  } = useQuiz();

  const isCorrectAnswer = correctAnswers.includes(choiceKey);
  const isSelectedChoice = selectedChoices.includes(choiceKey);

  const handleChoiceClick = () => {
    selectChoice(choiceKey);
  };

  const renderIcon = () => {
    const DefaultIcon = () => {
      return (
        <div
          className={cn(
            `w-5 h-5 rounded-full border-gray-400 border flex items-center justify-center text-xs`
          )}
        >
          {choiceKey}
        </div>
      );
    };

    if (!hasSelectedAllAnswers) {
      return <DefaultIcon />;
    }

    if (isCorrectAnswer) {
      return <CircleCheck size={20} strokeWidth={3} stroke="green" />;
    }

    if (isSelectedChoice && !isCorrectAnswer) {
      return <CircleX size={20} strokeWidth={3} stroke="red" />;
    }

    return <DefaultIcon />;
  };

  return (
    <button
      type="button"
      className={cn(
        'w-full text-left border border-gray-300 rounded-2xl py-4 px-3',
        !hasSelectedAllAnswers &&
          'hover:bg-gray-50 active:bg-gray-100 cursor-pointer',
        hasSelectedAllAnswers &&
          isCorrectAnswer &&
          'bg-green-50 border-green-500',
        isSelectedChoice && !isCorrectAnswer && 'bg-red-50 border-red-500',
        !hasSelectedAllAnswers &&
          isSelectedChoice &&
          'bg-blue-50 border-blue-500'
      )}
      disabled={hasSelectedAllAnswers}
      onClick={handleChoiceClick}
    >
      <div className={cn('flex gap-3 items-start')}>
        <div className="pt-[3px]">{renderIcon()}</div>
        <div className={cn('flex-1 break-keep leading-7')}>{choiceText}</div>
      </div>
    </button>
  );
};

export default QuizCardChoice;
