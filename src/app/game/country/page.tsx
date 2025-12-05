"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { countryQuiz } from "@/data/gameData";
import GameControls from "@/components/GameControls";
import ScoreDisplay from "@/components/ScoreDisplay";
import Confetti from "@/components/Confetti";

export default function CountryGame() {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledQuestions] = useState(() =>
    [...countryQuiz].sort(() => Math.random() - 0.5).slice(0, 10)
  );

  const currentQuestion = shuffledQuestions[questionIndex];
  const totalQuestions = shuffledQuestions.length;

  const handleCorrect = () => {
    setScore((s) => s + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 100);
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
      <div className="min-h-screen px-4 py-8 flex flex-col items-center justify-center">
        <Confetti active={percentage >= 70} />

        <div className="game-card p-8 text-center max-w-lg w-full">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? "🏆" : percentage >= 60 ? "🎉" : "👏"}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Game Over!</h2>
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
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 3.52} 352`}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{percentage}%</span>
            </div>
          </div>

          <p className="text-white/60 mb-6">
            {percentage >= 80
              ? "Amazing! You're a geography expert! 🌍"
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
    <div className="min-h-screen px-4 py-8 flex flex-col items-center justify-center">
      <Confetti active={showConfetti} />

      {/* Game Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm mb-4">
          <span>🌍</span>
          <span>Emoji Quiz</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Guess the Country
        </h1>
        <p className="text-white/60">Decode the emoji clues!</p>
      </div>

      {/* Progress & Score */}
      <div className="flex items-center gap-6 mb-8">
        <div className="text-white/60">
          <span className="text-white font-bold">{questionIndex + 1}</span> /{" "}
          {totalQuestions}
        </div>
        <ScoreDisplay score={score} total={totalQuestions} />
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-lg mb-8">
        <div className="timer-bar">
          <div
            className="timer-bar-fill"
            style={{
              width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
              background: "linear-gradient(90deg, #10b981 0%, #6366f1 100%)",
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-lg">
        <div className="game-card p-8 text-center">
          <div className="text-sm text-white/40 uppercase tracking-wider mb-4">
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
                <div className="text-sm text-white/40 uppercase tracking-wider mb-1">
                  Answer
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {currentQuestion.answer}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleCorrect}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-emerald-500/30"
                >
                  <svg
                    className="w-5 h-5"
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
                  Got it Right!
                </button>
                <button
                  onClick={handleSkip}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 hover:text-rose-200 transition-all"
                >
                  <svg
                    className="w-5 h-5"
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
                  Wrong / Skip
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
