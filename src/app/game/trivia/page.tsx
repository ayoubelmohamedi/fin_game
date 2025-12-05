"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { techTrivia } from "@/data/gameData";
import GameControls from "@/components/GameControls";
import ScoreDisplay from "@/components/ScoreDisplay";
import Confetti from "@/components/Confetti";

export default function TriviaGame() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = techTrivia[currentIndex];
  const totalQuestions = techTrivia.length;
  const isLastQuestion = currentIndex >= totalQuestions - 1;

  const handleAnswer = (optionIndex: number) => {
    if (answered) return;

    setSelectedAnswer(optionIndex);
    setAnswered(true);

    if (optionIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const handleReplay = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getResultMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return "Perfect Score!";
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 60) return "Well Done!";
    if (percentage >= 40) return "Good Try!";
    return "Keep Learning!";
  };

  if (showResult) {
    return (
      <div className="min-h-screen px-4 py-12 flex flex-col items-center justify-center">
        <Confetti active={score >= totalQuestions * 0.6} />
        
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 border-2 border-black bg-white text-xs font-bold tracking-widest mb-4">
            QUIZ COMPLETE
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {getResultMessage()}
          </h1>
        </div>

        <div className="w-full max-w-md mb-8">
          <div className="border-2 border-black bg-white p-8 text-center">
            <div className="text-6xl font-bold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {score}/{totalQuestions}
            </div>
            <div className="text-gray-600 mb-4">
              {Math.round((score / totalQuestions) * 100)}% correct
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-3 border-2 border-black bg-white mb-6">
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${(score / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <GameControls
          onReplay={handleReplay}
          onBack={() => router.push("/")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center justify-center">
      {/* Game Header */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-2 border-2 border-black bg-white text-xs font-bold tracking-widest mb-4">
          TECH QUIZ
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Tech Trivia
        </h1>
        <p className="text-gray-600">
          Test your technology knowledge!
        </p>
      </div>

      {/* Progress & Score */}
      <div className="flex items-center gap-6 mb-6">
        <div className="px-4 py-2 border-2 border-black bg-white">
          <span className="text-gray-600 text-sm">Question </span>
          <span className="font-bold text-black">{currentIndex + 1}/{totalQuestions}</span>
        </div>
        <ScoreDisplay score={score} total={totalQuestions} label="Score" />
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md h-2 border-2 border-black bg-white mb-8">
        <div
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="w-full max-w-md mb-8">
        <div className="border-2 border-black bg-white p-6">
          <p className="text-xl font-bold text-black text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            {currentQuestion.question}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="w-full max-w-md space-y-3 mb-8">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === currentQuestion.correct;
          const showCorrect = answered && isCorrect;
          const showWrong = answered && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={answered}
              className={`w-full p-4 text-left border-2 transition-all font-medium ${
                showCorrect
                  ? "border-black bg-black text-white"
                  : showWrong
                  ? "border-gray-400 bg-gray-200 text-gray-600"
                  : isSelected
                  ? "border-black bg-black text-white"
                  : "border-black bg-white text-black hover:bg-gray-100"
              } ${answered ? "cursor-default" : "cursor-pointer"}`}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 border-2 border-current mr-3 text-xs font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
              {showCorrect && <span className="float-right">✓</span>}
              {showWrong && <span className="float-right">✗</span>}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      {answered && (
        <button onClick={nextQuestion} className="btn-primary text-lg px-8 py-4 mb-6">
          {isLastQuestion ? "See Results" : "Next Question"} →
        </button>
      )}

      {/* Tips */}
      <div className="w-full max-w-md p-4 border-2 border-black bg-white">
        <h3 className="text-black font-bold mb-2">
          How to Play
        </h3>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>• Select the correct answer for each question</li>
          <li>• Score points for each correct answer</li>
          <li>• Try to get the highest score!</li>
        </ul>
      </div>

      <div className="mt-6">
        <GameControls
          onReplay={handleReplay}
          onSkip={nextQuestion}
          skipLabel="Skip"
          showSkip={!answered}
          onBack={() => router.push("/")}
        />
      </div>
    </div>
  );
}
