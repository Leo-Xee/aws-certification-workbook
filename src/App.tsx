import { cn } from './lib/utils';
import QuizProgress from '@/components/QuizProgress';
import QuizNavigation from './components/QuizNavigation';
import QuizCard from './components/QuizCard';
import { QuizProvider } from './contexts/QuizContext';

function App() {
  return (
    <QuizProvider>
      <div className={cn('min-h-screen bg-white')}>
        <div className={cn('max-w-[960px] mx-auto pt-12 pb-24 px-6')}>
          <main className={cn('flex flex-col gap-8')}>
            <h1 className={cn('text-3xl font-bold text-center')}>
              AWS Certification Workbook
            </h1>
            <QuizProgress />
            <QuizNavigation />
            <QuizCard />
          </main>
        </div>
      </div>
    </QuizProvider>
  );
}

export default App;
