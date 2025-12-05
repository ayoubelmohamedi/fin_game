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
    <div className="min-h-screen px-4 py-12 flex flex-col items-center justify-center">
      {/* Game Header */}
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-2 border-2 border-black bg-white text-xs font-bold tracking-widest mb-4">
          FUN CHALLENGES
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Dare to Fail
        </h1>
        <p className="text-gray-600">
          Draw a card and complete the challenge!
        </p>
      </div>

      {/* Dares completed counter */}
      {daresCompleted > 0 && (
        <div className="mb-6 px-4 py-2 border-2 border-black bg-black text-white font-bold">
          {daresCompleted} dare{daresCompleted > 1 ? "s" : ""} completed!
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
                className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center p-8 border-2 border-black bg-white"
                onClick={!currentDare ? drawCard : undefined}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="text-6xl mb-4">■</div>
                <div className="text-2xl font-bold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Dare Card
                </div>
                <p className="text-gray-600 text-center">
                  {currentDare ? "Flip to see your dare!" : "Tap to draw a card"}
                </p>

                {/* Card pattern decoration */}
                <div className="absolute inset-4 border-2 border-gray-200 pointer-events-none"></div>
              </div>

              {/* Card Front (Dare content) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-8 border-2 border-black bg-black text-white"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-400">
                  Your Dare
                </div>
                <p className="text-xl text-white text-center font-medium mb-6 leading-relaxed">
                  {currentDare}
                </p>
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 border-2 border-white bg-white text-black font-medium hover:bg-black hover:text-white transition-all"
                >
                  ✓ Dare Complete!
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
      <div className="w-full max-w-md p-4 border-2 border-black bg-white mb-6">
        <h3 className="text-black font-bold mb-2">
          How to Play
        </h3>
        <ul className="text-gray-600 text-sm space-y-1">
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
