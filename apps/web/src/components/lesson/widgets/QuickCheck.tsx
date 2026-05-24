import { useState } from 'react';

export interface QuickCheckPayload {
  question: string;
  choices: string[];
  correctIndex: number;
  explain: string;
}

export default function QuickCheck({ question, choices, correctIndex, explain }: QuickCheckPayload) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card p-6">
      <p className="font-mono text-xs text-lk-cyan tracking-widest uppercase mb-4">— Quick check</p>
      <p className="text-lk-text-primary text-base font-medium mb-5">{question}</p>

      <div className="space-y-3">
        {choices.map((choice, i) => {
          const isCorrect = picked !== null && i === correctIndex;
          const isWrongPick = picked === i && i !== correctIndex;

          const borderClass = isCorrect
            ? 'border-lk-green/40'
            : isWrongPick
            ? 'border-lk-red/40'
            : 'border-white/[0.07] hover:border-white/20';
          const bgClass = isCorrect
            ? 'bg-lk-green/[0.06]'
            : isWrongPick
            ? 'bg-lk-red/[0.06]'
            : 'hover:bg-white/[0.02]';
          const textClass = isCorrect
            ? 'text-lk-green'
            : isWrongPick
            ? 'text-lk-red'
            : 'text-lk-text-secondary';
          const letterClass = isCorrect
            ? 'text-lk-green'
            : isWrongPick
            ? 'text-lk-red'
            : 'text-lk-text-dim';

          return (
            <button
              key={i}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl border ${borderClass} ${bgClass} text-left transition disabled:cursor-default`}
              disabled={picked !== null}
              onClick={() => setPicked(i)}
            >
              <span className={`font-mono text-xs tracking-widest shrink-0 ${letterClass}`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className={`text-sm flex-1 ${textClass}`}>{choice}</span>
              {isCorrect && <span className="ml-auto text-lk-green text-sm shrink-0">✓</span>}
              {isWrongPick && <span className="ml-auto text-lk-red text-sm shrink-0">✗</span>}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <p className="mt-5 pt-5 border-t border-white/[0.07] text-sm text-lk-text-secondary">
          {explain}
        </p>
      )}
    </div>
  );
}
