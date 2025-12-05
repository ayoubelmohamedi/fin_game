"use client";

interface ScoreDisplayProps {
  score: number;
  total?: number;
  label?: string;
}

export default function ScoreDisplay({
  score,
  total,
  label = "Score",
}: ScoreDisplayProps) {
  return (
    <div className="score-display inline-flex items-center gap-3">
      <div className="flex items-center justify-center w-8 h-8 bg-black text-white font-bold text-xs">
        ★
      </div>
      <div>
        <div className="score-label">
          {label}
        </div>
        <div className="score-value">
          {score}
          {total !== undefined && (
            <span className="text-gray-600 text-sm font-normal">
              {" "}/ {total}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
