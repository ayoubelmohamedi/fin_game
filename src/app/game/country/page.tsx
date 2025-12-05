"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { countryQuiz } from "@/data/gameData";
import GameControls from "@/components/GameControls";
import ScoreDisplay from "@/components/ScoreDisplay";

export default function CountryGame() {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledQuestions] = useState(() =>
    [...countryQuiz].sort(() => Math.random() - 0.5).slice(0, 10)
  );

  const currentQuestion = shuffledQuestions[questionIndex];
  const totalQuestions = shuffledQuestions.length;

  const handleCorrect = () => {
    setScore((s) => s + 1);
    nextQuestion();
  };

  const nextQuestion = useCallback(() => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((i) => i + 1);
      setShowAnswer(false);
    } else {
      setGameOver(true);
    }
  }, [questionIndex, totalQuestions]);

  const handleSkip = () => {
    nextQuestion();
  };

  const handleReplay = () => {
    setScore(0);
    setQuestionIndex(0);
    setShowAnswer(false);
    setGameOver(false);
  };

  if (gameOver) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="min-h-screen px-4 py-12 flex flex-col items-center justify-center">
        <div className="game-card p-8 text-center max-w-lg w-full">
          <div className="text-6xl mb-4">■</div>
          <h2 className="text-2xl font-bold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Game Over!
          </h2>
          <p className="text-gray-600 mb-6">
            You scored {score} out of {totalQuestions}
          </p>

          <div className="relative w-32 h-32 mx-auto mb-6 border-4 border-black flex items-center justify-center">
            <span className="text-4xl font-bold text-black">{percentage}%</span>
          </div>

          <p className="text-gray-600 mb-6">
            {percentage >= 80
              ? "Excellent! You're a geography expert!"
              : percentage >= 60
              ? "Great job! Keep exploring the world!"
              : "Good effort! Practice makes perfect!"}
          </p>

          <GameControls
            onReplay={handleReplay}
            onBack={() => router.push("/")}
            showSkip={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center justify-center">
      {/* Game Header */}
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-2 border-2 border-black bg-white text-xs font-bold tracking-widest mb-4">
          EMOJI QUIZ
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Guess the Country
        </h1>
        <p className="text-gray-600">Decode the emoji clues!</p>
      </div>

      {/* Progress & Score */}
      <div className="flex items-center gap-6 mb-8">
        <div className="text-gray-600">
          <span className="text-black font-bold">{questionIndex + 1}</span> / {totalQuestions}
        </div>
        <ScoreDisplay score={score} total={totalQuestions} />
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-lg mb-8">
        <div className="timer-bar">
          <div
            className="timer-bar-fill"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-lg">
        <div className="game-card p-8 text-center">
          <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
            What country is this?
          </div>

          <div className="text-5xl sm:text-6xl mb-8 tracking-wider">
            {currentQuestion.emoji}
          </div>

          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              Reveal Answer
            </button>
          ) : (
            <>
              <div className="mb-6">
                <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">
                  Answer
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {currentQuestion.answer}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleCorrect}
                  className="px-6 py-3 border-2 border-black bg-black text-white font-medium hover:bg-white hover:text-black transition-all"
                >
                  ✓ Got it Right!
                </button>
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 border-2 border-black bg-white text-black font-medium hover:bg-black hover:text-white transition-all"
                >
                  ✗ Wrong / Skip
                </button>
              </div>
            </>
          )}
        </div>

        <GameControls
          onReplay={handleReplay}
          onBack={() => router.push("/")}
          showSkip={false}
        />
      </div>
    </div>
  );
}
