"use client";

interface GameControlsProps {
  onReplay: () => void;
  onSkip?: () => void;
  onBack?: () => void;
  showSkip?: boolean;
  showBack?: boolean;
  skipLabel?: string;
}

export default function GameControls({
  onReplay,
  onSkip,
  onBack,
  showSkip = true,
  showBack = true,
  skipLabel = "Skip",
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8">
      {showBack && onBack && (
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-medium"
        >
          ← Back
        </button>
      )}

      <button
        onClick={onReplay}
        className="px-6 py-3 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-all font-medium"
      >
        ↻ New Round
      </button>

      {showSkip && onSkip && (
        <button
          onClick={onSkip}
          className="px-6 py-3 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-medium"
        >
          {skipLabel} →
        </button>
      )}
    </div>
  );
}
