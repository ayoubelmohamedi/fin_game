"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { wheelItems, wheelChallenges } from "@/data/gameData";
import GameControls from "@/components/GameControls";
import Confetti from "@/components/Confetti";

export default function WheelGame() {
  const router = useRouter();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const segmentAngle = 360 / wheelItems.length;

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedItem(null);
    setChallenge(null);

    // Random spin between 5-10 full rotations plus random segment
    const spins = 5 + Math.random() * 5;
    const extraDegrees = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + extraDegrees;

    setRotation(totalRotation);

    // Calculate which segment we landed on
    setTimeout(() => {
      // The pointer is at the top (12 o'clock position)
      // We need to figure out which segment is at the top after rotation
      const normalizedRotation = totalRotation % 360;
      // Since segments start at -90deg (top), and wheel rotates clockwise,
      // we need to find which segment index is now at the top
      const pointerAngle = (360 - normalizedRotation) % 360;
      const segmentIndex = Math.floor(pointerAngle / segmentAngle) % wheelItems.length;
      const item = wheelItems[segmentIndex];

      setSelectedItem(item.label);
      
      // Get random challenge for this category
      const challenges = wheelChallenges[item.label];
      if (challenges) {
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        setChallenge(randomChallenge);
      }

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
      setIsSpinning(false);
    }, 3000);
  };

  const handleReplay = () => {
    setSelectedItem(null);
    setChallenge(null);
    setRotation(0);
  };

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center justify-center">
      <Confetti active={showConfetti} />

      {/* Game Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm mb-4">
          <span>🎡</span>
          <span>Digital Wheel</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Spin & Challenge
        </h1>
        <p className="text-white/60">
          What will fate decide for you?
        </p>
      </div>

      {/* Wheel Container */}
      <div className="relative mb-8">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-white drop-shadow-lg"></div>
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 3s cubic-bezier(0.2, 0.8, 0.3, 1)" : "none",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {wheelItems.map((item, index) => {
              const startAngle = index * segmentAngle - 90;
              const endAngle = (index + 1) * segmentAngle - 90;
              const midAngle = (startAngle + endAngle) / 2;
              
              // Calculate SVG path for pie segment
              const radius = 50;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              
              const x1 = 50 + radius * Math.cos(startRad);
              const y1 = 50 + radius * Math.sin(startRad);
              const x2 = 50 + radius * Math.cos(endRad);
              const y2 = 50 + radius * Math.sin(endRad);
              
              const largeArcFlag = segmentAngle > 180 ? 1 : 0;
              
              const pathD = `M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

              // Text position - along the middle of the segment, pointing outward
              const textRadius = 32;
              const midRad = (midAngle * Math.PI) / 180;
              const textX = 50 + textRadius * Math.cos(midRad);
              const textY = 50 + textRadius * Math.sin(midRad);

              return (
                <g key={index}>
                  <path d={pathD} fill={item.color} stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="4"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-white/20 flex items-center justify-center shadow-inner">
            <span className="text-2xl">🎡</span>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`btn-primary text-lg px-10 py-4 mb-8 ${
          isSpinning ? "opacity-50 cursor-not-allowed" : "pulse"
        }`}
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel!"}
      </button>

      {/* Result */}
      {selectedItem && challenge && (
        <div className="w-full max-w-md game-card p-6 text-center animate-fade-in">
          <div className="text-3xl mb-2">{selectedItem}</div>
          <div className="text-xs text-white/40 uppercase tracking-wider mb-3">
            Your Challenge
          </div>
          <p className="text-lg text-white font-medium mb-4">{challenge}</p>
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
          >
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Spin Again
          </button>
        </div>
      )}

      <GameControls
        onReplay={handleReplay}
        onBack={() => router.push("/")}
        showSkip={false}
      />
    </div>
  );
}
