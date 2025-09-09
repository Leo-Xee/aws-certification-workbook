import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { useQuiz } from '@/contexts/QuizContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const QuizNavigation = () => {
  const {
    currentQuestionNumber,
    moveToQuestion,
    totalQuestionCount,
    moveToPreviousQuestion,
    moveToNextQuestion,
    isFirstQuestion,
    isLastQuestion,
  } = useQuiz();

  const formSchema = z.object({
    questionNumber: z
      .string()
      .min(1, '숫자를 입력하세요')
      .refine(
        (val) =>
          !isNaN(Number(val)) &&
          Number(val) >= 1 &&
          Number(val) <= totalQuestionCount,
        {
          message: `1부터 ${totalQuestionCount}까지의 숫자를 입력하세요`,
        }
      ),
  });
  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionNumber: currentQuestionNumber.toString(),
    },
  });

  const handleSubmit = (data: FormData) => {
    moveToQuestion(Number(data.questionNumber));
  };

  return (
    <div className={cn('flex justify-between')}>
      <div className={cn('flex items-center gap-2')}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className={cn('flex gap-2 items-center')}
          >
            <FormField
              control={form.control}
              name="questionNumber"
              render={({ field }) => (
                <FormItem className={cn('relative flex flex-col gap-2')}>
                  <FormLabel className={cn('sr-only')}>문제 번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이동할 문제 번호"
                      className={cn('w-34')}
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      'text-xs text-red-500 absolute bottom-[-25px] w-[200px]'
                    )}
                  />
                </FormItem>
              )}
            />
            <div className={cn('flex items-start pt-0')}>
              <Button variant="outline" size="sm" type="submit">
                검색
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className={cn('flex gap-4 items-center')}>
        <div className={cn('text-lg flex items-center')}>
          <span className={cn('font-bold')}>{currentQuestionNumber}</span>
          <span className={cn('mx-1')}>/</span>
          <span> {totalQuestionCount}</span>
        </div>

        <div className={cn('flex gap-2')}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => moveToPreviousQuestion()}
            disabled={isFirstQuestion}
          >
            이전
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => moveToNextQuestion()}
            disabled={isLastQuestion}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizNavigation;
