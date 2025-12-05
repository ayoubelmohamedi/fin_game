"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { icebreakerCards } from "@/data/gameData";
import GameControls from "@/components/GameControls";

export default function IcebreakerGame() {
  const router = useRouter();
  const [currentCard, setCurrentCard] = useState<string | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [shuffledCards] = useState(() =>
    [...icebreakerCards].sort(() => Math.random() - 0.5)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no" | null>(null);

  const drawCard = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentCard(shuffledCards[cardIndex % shuffledCards.length]);
      setCardIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleYes = () => {
    setSelectedAnswer("yes");
  };

  const handleNo = () => {
    setSelectedAnswer("no");
  };

  const handleReplay = () => {
    setCurrentCard(null);
    setCardIndex(0);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center justify-center">
      {/* Game Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm mb-4">
          <span>💬</span>
          <span>Icebreaker Cards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Did You...?
        </h1>
        <p className="text-white/60">
          Share experiences and discover stories!
        </p>
      </div>

      {/* Card counter */}
      <div className="mb-6 text-white/50 text-sm">
        Card {cardIndex} of {shuffledCards.length}
      </div>

      {/* Card Area */}
      <div className="w-full max-w-md mb-8">
        <div
          className={`game-card p-8 text-center transition-all duration-300 ${
            isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(249,115,22,0.15) 100%)",
            minHeight: "300px",
          }}
        >
          {!currentCard ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-6xl mb-4">💭</div>
              <div className="text-xl font-bold text-white mb-2">
                Ready to Share?
              </div>
              <p className="text-white/60 mb-6">
                Draw a card to start the conversation
              </p>
              <button onClick={drawCard} className="btn-primary px-8 py-4">
                Draw a Card
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-4xl mb-4">🤔</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mb-4">
                Ask the group
              </div>
              <p className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6">
                {currentCard}
              </p>

              {/* Response options */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleYes}
                  disabled={selectedAnswer !== null}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all cursor-pointer ${
                    selectedAnswer === "yes"
                      ? "bg-emerald-500 border-emerald-400 text-white scale-105"
                      : selectedAnswer === "no"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300/50 cursor-not-allowed"
                      : "bg-emerald-500/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 hover:scale-105"
                  }`}
                >
                  <span>👍</span>
                  <span>Yes!</span>
                  {selectedAnswer === "yes" && (
                    <span className="ml-1">✓</span>
                  )}
                </button>
                <button
                  onClick={handleNo}
                  disabled={selectedAnswer !== null}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all cursor-pointer ${
                    selectedAnswer === "no"
                      ? "bg-rose-500 border-rose-400 text-white scale-105"
                      : selectedAnswer === "yes"
                      ? "bg-rose-500/10 border-rose-500/20 text-rose-300/50 cursor-not-allowed"
                      : "bg-rose-500/20 border-rose-500/30 text-rose-300 hover:bg-rose-500/30 hover:scale-105"
                  }`}
                >
                  <span>👎</span>
                  <span>Nope</span>
                  {selectedAnswer === "no" && (
                    <span className="ml-1">✓</span>
                  )}
                </button>
              </div>

              <button
                onClick={drawCard}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-amber-500/30"
              >
                Next Question
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
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="w-full max-w-md p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
        <h3 className="text-white/80 font-medium mb-2 flex items-center gap-2">
          <span>🎯</span> How to Play
        </h3>
        <ul className="text-white/50 text-sm space-y-1">
          <li>• Read the question aloud to the group</li>
          <li>• Everyone answers yes/no or shares a story</li>
          <li>• Vote if someone&apos;s answer seems unlikely!</li>
        </ul>
      </div>

      <GameControls
        onReplay={handleReplay}
        onBack={() => router.push("/")}
        showSkip={false}
      />
    </div>
  );
}
