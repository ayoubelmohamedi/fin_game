"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { icebreakerCards } from "@/data/gameData";
import GameControls from "@/components/GameControls";
import ScoreDisplay from "@/components/ScoreDisplay";

export default function IcebreakerGame() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<"yes" | "no" | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const currentQuestion = icebreakerCards[currentIndex];

  const handleAnswer = (answer: "yes" | "no") => {
    if (answered) return;
    
    setCurrentAnswer(answer);
    setAnswered(true);
    
    if (answer === "yes") {
      setYesCount((prev) => prev + 1);
    } else {
      setNoCount((prev) => prev + 1);
    }
    setQuestionsAnswered((prev) => prev + 1);
  };

  const nextQuestion = () => {
    setCurrentIndex((prev) => (prev + 1) % icebreakerCards.length);
    setAnswered(false);
    setCurrentAnswer(null);
  };

  const handleReplay = () => {
    setCurrentIndex(0);
    setYesCount(0);
    setNoCount(0);
    setAnswered(false);
    setCurrentAnswer(null);
    setQuestionsAnswered(0);
  };

  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center justify-center">
      {/* Game Header */}
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-2 border-2 border-black bg-white text-xs font-bold tracking-widest mb-4">
          ICEBREAKER
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Did You?
        </h1>
        <p className="text-gray-600">
          Answer honestly and share your stories!
        </p>
      </div>

      {/* Score counters */}
      <div className="flex gap-6 mb-8">
        <div className="text-center px-6 py-3 border-2 border-black bg-white">
          <div className="text-2xl font-bold text-black">{yesCount}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wider">Yes</div>
        </div>
        <div className="text-center px-6 py-3 border-2 border-black bg-black text-white">
          <div className="text-2xl font-bold">{noCount}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">No</div>
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-md mb-8">
        <div className="border-2 border-black bg-white p-8 relative">
          {/* Progress indicator */}
          <div className="absolute top-4 right-4 text-xs font-bold text-gray-400">
            #{currentIndex + 1}
          </div>
          
          <div className="text-center">
            <div className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">
              Did You Ever...
            </div>
            <p className="text-xl sm:text-2xl font-bold text-black leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
              {currentQuestion}
            </p>
          </div>
        </div>
      </div>

      {/* Answer buttons */}
      {!answered ? (
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => handleAnswer("yes")}
            className="px-10 py-4 text-lg font-bold border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all"
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer("no")}
            className="px-10 py-4 text-lg font-bold border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-all"
          >
            No
          </button>
        </div>
      ) : (
        <div className="text-center mb-8">
          <div className="mb-4 px-6 py-3 border-2 border-black bg-white">
            <span className="text-black font-medium">You answered: </span>
            <span className="font-bold text-black">{currentAnswer === "yes" ? "Yes ✓" : "No ✗"}</span>
          </div>
          <button
            onClick={nextQuestion}
            className="btn-primary text-lg px-8 py-4"
          >
            Next Question →
          </button>
        </div>
      )}

      {/* Stats */}
      {questionsAnswered > 0 && (
        <ScoreDisplay
          score={questionsAnswered}
          label="Questions Answered"
        />
      )}

      {/* Tips */}
      <div className="w-full max-w-md p-4 border-2 border-black bg-white mb-6 mt-4">
        <h3 className="text-black font-bold mb-2">
          How to Play
        </h3>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>• Answer yes or no honestly</li>
          <li>• Share the story behind your answer</li>
          <li>• Great for getting to know your team!</li>
        </ul>
      </div>

      <GameControls
        onReplay={handleReplay}
        onSkip={nextQuestion}
        skipLabel="Skip"
        showSkip={true}
        onBack={() => router.push("/")}
      />
    </div>
  );
}
