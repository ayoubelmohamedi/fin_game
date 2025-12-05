"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { techTrivia } from "@/data/gameData";
import GameControls from "@/components/GameControls";
import ScoreDisplay from "@/components/ScoreDisplay";
import Confetti from "@/components/Confetti";

export default function TriviaGame() {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [shuffledQuestions] = useState(() =>
    [...techTrivia].sort(() => Math.random() - 0.5)
  );

  const currentQuestion = shuffledQuestions[questionIndex];
  const totalQuestions = shuffledQuestions.length;

  const handleNextQuestion = useCallback(() => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(15);
    } else {
      setGameOver(true);
    }
  }, [questionIndex, totalQuestions]);

  // Timer
  useEffect(() => {
    if (showResult || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setShowResult(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionIndex, showResult, gameOver]);

  const handleAnswer = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === currentQuestion.correct) {
      setScore((s) => s + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
    }
  };

  const handleReplay = () => {
    setScore(0);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameOver(false);
    setTimeLeft(15);
  };

  if (gameOver) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="min-h-screen px-4 py-8 flex flex-col items-center justify-center">
        <Confetti active={percentage >= 70} />

        <div className="game-card p-8 text-center max-w-lg w-full">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? "🧠" : percentage >= 60 ? "🎉" : "📚"}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-white/60 mb-6">
            You scored {score} out of {totalQuestions}
          </p>

          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#trivia-gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 3.52} 352`}
              />
              <defs>
                <linearGradient
                  id="trivia-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{percentage}%</span>
            </div>
          </div>

          <p className="text-white/60 mb-6">
            {percentage >= 80
              ? "Incredible! You're a tech & hospitality genius! 🌟"
              : percentage >= 60
              ? "Well done! You know your stuff!"
              : "Keep learning! Technology is always evolving!"}
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
    <div className="min-h-screen px-4 py-8 flex flex-col items-center justify-center">
      <Confetti active={showConfetti} />

      {/* Game Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm mb-4">
          <span>🧠</span>
          <span>Quiz Challenge</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Tech Trivia
        </h1>
      </div>

      {/* Progress & Score */}
      <div className="flex items-center gap-6 mb-4">
        <div className="text-white/60">
          <span className="text-white font-bold">{questionIndex + 1}</span> /{" "}
          {totalQuestions}
        </div>
        <ScoreDisplay score={score} total={totalQuestions} />
      </div>

      {/* Timer */}
      <div className="w-full max-w-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/50 text-sm">Time remaining</span>
          <span
            className={`font-bold ${
              timeLeft <= 5 ? "text-rose-400" : "text-white"
            }`}
          >
            {timeLeft}s
          </span>
        </div>
        <div className="timer-bar">
          <div
            className="timer-bar-fill"
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-lg">
        <div className="game-card p-6 mb-6">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-4">
            Question {questionIndex + 1}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonStyle = "bg-white/5 border-white/10 hover:bg-white/10";

              if (showResult) {
                if (index === currentQuestion.correct) {
                  buttonStyle =
                    "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
                } else if (index === selectedAnswer) {
                  buttonStyle = "bg-rose-500/20 border-rose-500/50 text-rose-300";
                } else {
                  buttonStyle = "bg-white/5 border-white/10 opacity-50";
                }
              } else if (selectedAnswer === index) {
                buttonStyle = "bg-violet-500/20 border-violet-500/50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-white">{option}</span>
                    {showResult && index === currentQuestion.correct && (
                      <svg
                        className="w-5 h-5 text-emerald-400 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                    {showResult &&
                      index === selectedAnswer &&
                      index !== currentQuestion.correct && (
                        <svg
                          className="w-5 h-5 text-rose-400 ml-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        {showResult && (
          <button
            onClick={handleNextQuestion}
            className="w-full btn-primary text-lg py-4"
          >
            {questionIndex < totalQuestions - 1 ? "Next Question" : "See Results"}
          </button>
        )}

        <GameControls
          onReplay={handleReplay}
          onBack={() => router.push("/")}
          showSkip={false}
        />
      </div>
    </div>
  );
}
