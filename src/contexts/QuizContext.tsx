// src/contexts/QuizContext.tsx
import { createContext, useContext, type ReactNode } from 'react';
import {
  quizzes,
  type Quiz,
} from '@/source/aws-saa-c03-examtopics-v18.35-240224';
import { useState } from 'react';

interface QuizContextType {
  currentQuestionNumber: number;
  correctAnswers: string[];
  selectedChoices: string[];
  currentQuestion: Quiz;
  totalQuestionCount: number;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  hasSelectedAllAnswers: boolean;
  moveToPreviousQuestion: () => void;
  moveToNextQuestion: () => void;
  moveToQuestion: (questionNumber: number) => void;
  selectChoice: (choice: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);

  const currentQuestion = quizzes[currentQuestionNumber - 1];
  const correctAnswers = currentQuestion.answers;
  const requiredAnswerCount = correctAnswers.length;
  const totalQuestionCount = quizzes.length;

  const hasSelectedAllAnswers = selectedChoices.length === requiredAnswerCount;

  const isFirstQuestion = currentQuestionNumber === 1;
  const isLastQuestion = currentQuestionNumber === totalQuestionCount;

  const resetSelectedChoices = () => {
    setSelectedChoices([]);
  };

  const moveToPreviousQuestion = () => {
    if (isFirstQuestion) return;
    setCurrentQuestionNumber(currentQuestionNumber - 1);
    resetSelectedChoices();
  };

  const moveToNextQuestion = () => {
    if (isLastQuestion) return;
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    resetSelectedChoices();
  };

  const moveToQuestion = (questionNumber: number) => {
    setCurrentQuestionNumber(questionNumber);
    resetSelectedChoices();
  };

  const selectChoice = (choice: string) => {
    setSelectedChoices(
      (prevChoices) =>
        prevChoices.includes(choice)
          ? prevChoices.filter((c) => c !== choice) // 이미 선택된 경우 제거 (toggle)
          : [...prevChoices, choice] // 새로 선택하는 경우 추가
    );
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestionNumber,
        correctAnswers,
        selectedChoices,
        currentQuestion,
        totalQuestionCount,
        isFirstQuestion,
        isLastQuestion,
        hasSelectedAllAnswers,
        moveToPreviousQuestion,
        moveToNextQuestion,
        moveToQuestion,
        selectChoice,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }

  return context;
};
