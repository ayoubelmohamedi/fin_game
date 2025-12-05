"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { mimicWords } from "@/data/gameData";
import GameControls from "@/components/GameControls";
import ScoreDisplay from "@/components/ScoreDisplay";
import Confetti from "@/components/Confetti";

export default function MimicGame() {
  const router = useRouter();
  const [currentWord, setCurrentWord] = useState(() =>
    mimicWords[Math.floor(Math.random() * mimicWords.length)]
  );
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [usedWords, setUsedWords] = useState<string[]>([]);

  const getNewWord = useCallback(() => {
    const availableWords = mimicWords.filter((w) => !usedWords.includes(w));
    if (availableWords.length === 0) {
      setUsedWords([]);
      return mimicWords[Math.floor(Math.random() * mimicWords.length)];
    }
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  }, [usedWords]);

  const handleCorrect = () => {
    setScore((s) => s + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 100);
    nextWord();
  };

  const nextWord = () => {
    setUsedWords((prev) => [...prev, currentWord]);
    setCurrentWord(getNewWord());
    setRevealed(false);
  };

  const handleSkip = () => {
    nextWord();
  };

  const handleReplay = () => {
    setScore(0);
    setUsedWords([]);
    setCurrentWord(mimicWords[Math.floor(Math.random() * mimicWords.length)]);
    setRevealed(false);
  };

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center justify-center">
      <Confetti active={showConfetti} />

      {/* Game Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm mb-4">
          <span>🎭</span>
          <span>Hospitality × Tech</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Mimic the Word
        </h1>
        <p className="text-white/60">
          Act it out without speaking! Can your team guess?
        </p>
      </div>

      {/* Score */}
      <div className="mb-8">
        <ScoreDisplay score={score} label="Points" />
      </div>

      {/* Word Card */}
      <div className="w-full max-w-lg">
        <div className="game-card p-8 text-center">
          {!revealed ? (
            <>
              <div className="text-6xl mb-6 animate-bounce">🤫</div>
              <p className="text-white/60 mb-6">
                Only the actor should see the word!
              </p>
              <button
                onClick={() => setRevealed(true)}
                className="btn-primary text-lg px-8 py-4"
              >
                Reveal Word
              </button>
            </>
          ) : (
            <>
              <div className="text-sm text-white/40 uppercase tracking-wider mb-2">
                Act this out
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {currentWord}
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
                  Team Got It!
                </button>
                <button
                  onClick={handleSkip}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all"
                >
                  Skip Word
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-white/80 font-medium mb-2 flex items-center gap-2">
            <span>💡</span> Tips for Acting
          </h3>
          <ul className="text-white/50 text-sm space-y-1">
            <li>• Use hand gestures and body language</li>
            <li>• Break complex terms into parts</li>
            <li>• No speaking, lip-syncing, or pointing at objects!</li>
          </ul>
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
