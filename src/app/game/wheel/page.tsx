"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { wheelItems, wheelChallenges } from "@/data/gameData";
import GameControls from "@/components/GameControls";

export default function WheelGame() {
  const router = useRouter();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const wheelRef = useRef<SVGSVGElement>(null);

  const numSegments = wheelItems.length;
  const segmentAngle = 360 / numSegments;

  useEffect(() => {
    if (!isSpinning && rotation > 0) {
      // Normalize the rotation to 0-360
      const normalizedRotation = rotation % 360;
      // The pointer is at top (0 degrees), wheel rotates clockwise
      // We need to find which segment is at the top after rotation
      const pointerPosition = (360 - normalizedRotation + segmentAngle / 2) % 360;
      const selectedIndex = Math.floor(pointerPosition / segmentAngle);
      const selected = wheelItems[selectedIndex % numSegments];
      setSelectedItem(selected.label);
      
      // Get random challenge from that category
      const challenges = wheelChallenges[selected.label];
      if (challenges && challenges.length > 0) {
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        setSelectedChallenge(randomChallenge);
      }
    }
  }, [isSpinning, rotation, segmentAngle, numSegments]);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedItem(null);
    setSelectedChallenge(null);

    const spinAmount = 1440 + Math.random() * 1080; // 4-7 full rotations
    const newRotation = rotation + spinAmount;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
    }, 4000);
  };

  const handleComplete = () => {
    setChallengesCompleted((c) => c + 1);
    setSelectedItem(null);
    setSelectedChallenge(null);
  };

  const handleReplay = () => {
    setRotation(0);
    setSelectedItem(null);
    setSelectedChallenge(null);
    setChallengesCompleted(0);
    setIsSpinning(false);
  };

  // Colors for wheel segments - monochrome palette
  const monoColors = [
    "#18181b", // black
    "#fafafa", // white
    "#71717a", // gray
    "#fafafa", // white
    "#18181b", // black
    "#d4d4d8", // light gray
    "#18181b", // black
    "#fafafa", // white
    "#71717a", // gray
    "#fafafa", // white
  ];

  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center justify-center">
      {/* Game Header */}
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-2 border-2 border-black bg-white text-xs font-bold tracking-widest mb-4">
          SPIN & WIN
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Spin & Challenge
        </h1>
        <p className="text-gray-600">
          Spin the wheel and complete the challenge!
        </p>
      </div>

      {/* Completed counter */}
      {challengesCompleted > 0 && (
        <div className="mb-6 px-4 py-2 border-2 border-black bg-black text-white font-bold">
          {challengesCompleted} challenge{challengesCompleted > 1 ? "s" : ""} completed!
        </div>
      )}

      {/* Wheel Container */}
      <div className="relative mb-8">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-black"></div>
        </div>

        {/* Wheel */}
        <svg
          ref={wheelRef}
          width="320"
          height="320"
          viewBox="0 0 320 320"
          className="drop-shadow-xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
          }}
        >
          {/* Outer ring */}
          <circle cx="160" cy="160" r="158" fill="none" stroke="#18181b" strokeWidth="4" />
          
          {wheelItems.map((item, index) => {
            const startAngle = index * segmentAngle - 90;
            const endAngle = (index + 1) * segmentAngle - 90;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            const x1 = 160 + 150 * Math.cos(startRad);
            const y1 = 160 + 150 * Math.sin(startRad);
            const x2 = 160 + 150 * Math.cos(endRad);
            const y2 = 160 + 150 * Math.sin(endRad);
            const largeArcFlag = segmentAngle > 180 ? 1 : 0;

            // Text positioning
            const midAngle = (startAngle + endAngle) / 2;
            const midRad = (midAngle * Math.PI) / 180;
            const textRadius = 100;
            const textX = 160 + textRadius * Math.cos(midRad);
            const textY = 160 + textRadius * Math.sin(midRad);

            // Determine colors
            const bgColor = monoColors[index % monoColors.length];
            const textColor = bgColor === "#18181b" || bgColor === "#71717a" ? "#fafafa" : "#18181b";

            return (
              <g key={index}>
                <path
                  d={`M 160 160 L ${x1} ${y1} A 150 150 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={bgColor}
                  stroke="#18181b"
                  strokeWidth="2"
                />
                <text
                  x={textX}
                  y={textY}
                  fill={textColor}
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="'DM Sans', sans-serif"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                >
                  {item.label.length > 12 ? item.label.substring(0, 10) + "..." : item.label}
                </text>
              </g>
            );
          })}
          {/* Center circle */}
          <circle cx="160" cy="160" r="25" fill="#18181b" stroke="#fafafa" strokeWidth="3" />
          <text x="160" y="160" fill="#fafafa" fontSize="10" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
            SPIN
          </text>
        </svg>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`btn-primary text-lg px-8 py-4 mb-6 ${isSpinning ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </button>

      {/* Selected Challenge */}
      {selectedChallenge && !isSpinning && (
        <div className="w-full max-w-md mb-6">
          <div className="border-2 border-black bg-white p-6 text-center">
            <div className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
              Category: {selectedItem}
            </div>
            <div className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">
              Your Challenge
            </div>
            <p className="text-xl font-bold text-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {selectedChallenge}
            </p>
            <button onClick={handleComplete} className="btn-secondary">
              ✓ Challenge Complete!
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="w-full max-w-md p-4 border-2 border-black bg-white mb-6">
        <h3 className="text-black font-bold mb-2">
          How to Play
        </h3>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>• Spin the wheel to get a random category</li>
          <li>• Complete the challenge with your team</li>
          <li>• Have fun and be creative!</li>
        </ul>
      </div>

      <GameControls
        onReplay={handleReplay}
        onSkip={!isSpinning ? spinWheel : undefined}
        skipLabel="Spin Again"
        showSkip={!!selectedChallenge && !isSpinning}
        onBack={() => router.push("/")}
      />
    </div>
  );
}
