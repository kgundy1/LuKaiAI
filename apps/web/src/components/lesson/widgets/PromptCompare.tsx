import { useState } from 'react';

export type PromptComparePayload = Record<string, never>;

type Variant = 'vague' | 'precise';

const VARIANTS: Record<Variant, { label: string; prompt: string; response: string; verdict: string }> = {
  vague: {
    label: 'Vague',
    prompt: 'fix the login bug',
    response: `I'll need more context to help. A few questions:\n\n1. What's the actual error you're seeing?\n2. Is this client-side or server-side?\n3. Which file should I look in?\n4. What did you try already?\n\nIf you share the relevant code, I can take a closer look.`,
    verdict: 'Claude has to play 20 Questions. You re-explain the project. Forty minutes vanish.',
  },
  precise: {
    label: 'Precise',
    prompt: `In apps/api/src/routes/auth.ts, the POST /login route returns 200 with no Set-Cookie header when the user is rate-limited (after 6 failed attempts).\n\nExpected: return 429 with the existing rate-limit body.\n\nThe rate-limit check is at line 47. Don't touch the bcrypt logic.`,
    response: `Patching auth.ts:\n\n• Line 47: rate-limit branch now returns reply.code(429).send({ ok: false, error: 'rate_limited' })\n• No changes to bcrypt path\n• No changes to the 200 success branch\n\nDiff is 4 lines. Run pnpm test:auth to verify.`,
    verdict: 'Claude makes the exact edit. You review four lines. Done in two minutes.',
  },
};

export default function PromptCompare() {
  const [variant, setVariant] = useState<Variant>('vague');
  const v = VARIANTS[variant];

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card p-6">
      <p className="font-mono text-xs text-lk-cyan tracking-widest uppercase mb-4">— Compare</p>
      <p className="text-lk-text-primary text-base font-medium mb-5">
        Same task. Different prompt. Toggle to compare.
      </p>

      <div className="flex gap-2 mb-5">
        {(['vague', 'precise'] as Variant[]).map(key => (
          <button
            key={key}
            onClick={() => setVariant(key)}
            className={`px-4 py-1.5 rounded-lg border text-xs font-mono tracking-wide transition ${
              variant === key
                ? 'border-lk-cyan/50 bg-lk-cyan/10 text-lk-cyan'
                : 'border-white/[0.07] text-lk-text-tertiary hover:border-white/20 hover:text-lk-text-secondary'
            }`}
          >
            {VARIANTS[key].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-xl border border-white/[0.07] bg-void p-4">
          <p className="font-mono text-xs text-lk-text-dim tracking-widest uppercase mb-3">You</p>
          <pre className="text-xs text-lk-text-secondary whitespace-pre-wrap font-mono leading-relaxed">{v.prompt}</pre>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-void p-4">
          <p className="font-mono text-xs text-lk-cyan tracking-widest uppercase mb-3">Claude</p>
          <pre className="text-xs text-lk-text-tertiary whitespace-pre-wrap font-mono leading-relaxed">{v.response}</pre>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-void px-4 py-3 text-sm text-lk-text-secondary">
        <span className="text-lk-text-primary font-medium">Result: </span>
        {v.verdict}
      </div>
    </div>
  );
}
