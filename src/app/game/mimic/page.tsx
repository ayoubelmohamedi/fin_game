"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { mimicWords } from "@/data/gameData";
import GameControls from "@/components/GameControls";
import ScoreDisplay from "@/components/ScoreDisplay";

export default function MimicGame() {
  const router = useRouter();
  const [currentWord, setCurrentWord] = useState(() =>
    mimicWords[Math.floor(Math.random() * mimicWords.length)]
  );
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
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
    <div className="min-h-screen px-4 py-12 flex flex-col items-center justify-center">
      {/* Game Header */}
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-2 border-2 border-black bg-white text-xs font-bold tracking-widest mb-4">
          HOSPITALITY × TECH
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Mimic the Word
        </h1>
        <p className="text-gray-600">
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
              <div className="text-6xl mb-6">■</div>
              <p className="text-gray-600 mb-6">
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
              <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                Act this out
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-black mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                {currentWord}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleCorrect}
                  className="px-6 py-3 border-2 border-black bg-black text-white font-medium hover:bg-white hover:text-black transition-all"
                >
                  ✓ Team Got It!
                </button>
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 border-2 border-black bg-white text-black font-medium hover:bg-black hover:text-white transition-all"
                >
                  Skip Word →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 border-2 border-black bg-white">
          <h3 className="text-black font-bold mb-2">
            Tips for Acting
          </h3>
          <ul className="text-gray-600 text-sm space-y-1">
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
