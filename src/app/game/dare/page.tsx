"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { dareCards } from "@/data/gameData";
import GameControls from "@/components/GameControls";

export default function DareGame() {
  const router = useRouter();
  const [currentDare, setCurrentDare] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [usedDares, setUsedDares] = useState<string[]>([]);
  const [daresCompleted, setDaresCompleted] = useState(0);

  const drawCard = () => {
    const availableDares = dareCards.filter((d) => !usedDares.includes(d));
    if (availableDares.length === 0) {
      setUsedDares([]);
      const newDare = dareCards[Math.floor(Math.random() * dareCards.length)];
      setCurrentDare(newDare);
    } else {
      const newDare =
        availableDares[Math.floor(Math.random() * availableDares.length)];
      setCurrentDare(newDare);
      setUsedDares((prev) => [...prev, newDare]);
    }
    setIsFlipped(false);
    setTimeout(() => setIsFlipped(true), 100);
  };

  const handleComplete = () => {
    setDaresCompleted((d) => d + 1);
    setIsFlipped(false);
    setCurrentDare(null);
  };

  const handleReplay = () => {
    setCurrentDare(null);
    setIsFlipped(false);
    setUsedDares([]);
    setDaresCompleted(0);
  };

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center justify-center">
      {/* Game Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-sm mb-4">
          <span>🎲</span>
          <span>Fun Challenges</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Dare to Fail
        </h1>
        <p className="text-white/60">
          Draw a card and complete the challenge!
        </p>
      </div>

      {/* Dares completed counter */}
      {daresCompleted > 0 && (
        <div className="mb-6 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300">
          🏆 {daresCompleted} dare{daresCompleted > 1 ? "s" : ""} completed!
        </div>
      )}

      {/* Card Area */}
      <div className="w-full max-w-md mb-8">
        <div style={{ perspective: "1000px" }}>
          <div
            className={`card-flip ${isFlipped ? "flipped" : ""}`}
            style={{ height: "360px" }}
          >
            <div className="card-flip-inner relative w-full h-full" style={{ transformStyle: "preserve-3d", transition: "transform 0.6s" }}>
              {/* Card Back */}
              <div
                className="absolute inset-0 rounded-2xl cursor-pointer flex flex-col items-center justify-center p-8 border border-white/10"
                onClick={!currentDare ? drawCard : undefined}
                style={{
                  background: "linear-gradient(135deg, #1a1a3e 0%, #2d1f3d 100%)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="text-6xl mb-4">🎲</div>
                <div className="text-2xl font-bold text-white mb-2">
                  Dare Card
                </div>
                <p className="text-white/60 text-center">
                  {currentDare ? "Flip to see your dare!" : "Tap to draw a card"}
                </p>

                {/* Card pattern decoration */}
                <div className="absolute inset-4 border-2 border-white/10 rounded-xl pointer-events-none"></div>
                <div className="absolute top-8 left-8 text-3xl opacity-20">
                  🎭
                </div>
                <div className="absolute bottom-8 right-8 text-3xl opacity-20">
                  🎭
                </div>
              </div>

              {/* Card Front (Dare content) */}
              <div
                className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8 border border-white/10"
                style={{
                  background: "linear-gradient(135deg, #2d1f3d 0%, #1a1a3e 100%)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="text-4xl mb-4">🎬</div>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                  Your Dare
                </div>
                <p className="text-xl text-white text-center font-medium mb-6 leading-relaxed">
                  {currentDare}
                </p>
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-rose-500/30"
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
                  Dare Complete!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Draw button when no card */}
      {!currentDare && (
        <button onClick={drawCard} className="btn-primary text-lg px-8 py-4 mb-8">
          Draw a Dare Card
        </button>
      )}

      {/* Tips */}
      <div className="w-full max-w-md p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
        <h3 className="text-white/80 font-medium mb-2 flex items-center gap-2">
          <span>📋</span> How to Play
        </h3>
        <ul className="text-white/50 text-sm space-y-1">
          <li>• Failed a mini-challenge? Draw a dare!</li>
          <li>• Complete the dare with enthusiasm</li>
          <li>• Have fun and don&apos;t take it too seriously!</li>
        </ul>
      </div>

      <GameControls
        onReplay={handleReplay}
        onSkip={currentDare ? drawCard : undefined}
        skipLabel="Draw Another"
        showSkip={!!currentDare}
        onBack={() => router.push("/")}
      />
    </div>
  );
}
