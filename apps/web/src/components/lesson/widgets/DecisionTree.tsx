import { useState, useMemo } from 'react';

export type DecisionTreePayload = Record<string, never>;

interface Choice {
  label: string;
  outcome: string;
}

interface Step {
  onlyIf?: string;
  setup: string;
  claudeTurn: string;
  question: string;
  choices: Choice[];
}

interface Outcome {
  tag: string;
  tone: 'good' | 'mid' | 'bad';
  text: string;
}

const SCENARIO: Step[] = [
  {
    setup: 'You asked Claude to fix a small bug in apps/api/src/routes/auth.ts (line 47, rate-limit returns 200 instead of 429).',
    claudeTurn: `I've patched the rate-limit branch to return 429. While I was in there, I also noticed the bcrypt comparison happens before the rate-limit check, which seems backwards — I went ahead and re-ordered them. Diff is 18 lines across 2 files.`,
    question: 'What do you do?',
    choices: [
      { label: 'Approve. The reorder sounds reasonable.', outcome: 'bad' },
      { label: 'Reject the diff. Tell Claude to stick to the line 47 change only.', outcome: 'good' },
      { label: 'Approve only the rate-limit fix, manually edit out the reorder.', outcome: 'meh' },
    ],
  },
  {
    onlyIf: 'good',
    setup: 'You rejected the diff and told Claude to make just the requested change.',
    claudeTurn: `Got it. Patched line 47 only. Returns 429 with the existing rate-limit body. No other changes. Diff is 4 lines.`,
    question: 'Next?',
    choices: [
      { label: 'Run the test suite. Merge if green.', outcome: 'great' },
      { label: 'Ask Claude to also write a test for it.', outcome: 'good' },
      { label: 'Ship it without checking.', outcome: 'meh' },
    ],
  },
  {
    onlyIf: 'bad',
    setup: "You approved the diff. Three hours later, login is broken for half your users.",
    claudeTurn: `The reorder changed when the rate-limit counter increments. Successful logins now increment the counter too. After 6 successful logins, the user gets locked out.`,
    question: 'What did you learn?',
    choices: [
      { label: 'The model needed to be smarter.', outcome: 'wrong' },
      { label: 'Scope creep is what killed it. Should have rejected the reorder.', outcome: 'right' },
      { label: 'I should have read the diff more carefully.', outcome: 'partial' },
    ],
  },
  {
    onlyIf: 'meh',
    setup: 'You approved the rate-limit fix and manually edited out the reorder.',
    claudeTurn: `Done — the merged version has just the line 47 change.`,
    question: 'How long did this take you?',
    choices: [
      { label: 'About 15 minutes — most of it spent unpicking the reorder.', outcome: 'partial' },
      { label: 'Two minutes. Trivial.', outcome: 'wrong' },
    ],
  },
];

const OUTCOMES: Record<string, Outcome> = {
  great:   { tag: 'GREAT',     tone: 'good', text: `Clean fix. Tests caught the change, no scope creep, merged in five minutes. This is what the loop looks like at its best.` },
  good:    { tag: 'GOOD',      tone: 'good', text: `Solid. Adding a test is a worthwhile follow-up but it can be its own session — don't bundle it with the bugfix PR.` },
  meh:     { tag: 'OKAY',      tone: 'mid',  text: `Works, but you spent fifteen minutes on a four-line change. The lesson: rejecting the scope-creep upfront is faster than unpicking it manually.` },
  bad:     { tag: 'EXPENSIVE', tone: 'bad',  text: `This is the canonical off-rails failure. Approving "while I was in there" changes is how a 4-line fix becomes a 3-hour incident.` },
  right:   { tag: 'RIGHT',     tone: 'good', text: `Yes. The model didn't fail — the handoff failed. The fix is naming what NOT to touch, every single Code session.` },
  partial: { tag: 'PARTIAL',   tone: 'mid',  text: `Reading the diff would have caught it — but a cleaner fix is to never accept a diff that goes beyond what you asked for.` },
  wrong:   { tag: 'WRONG',     tone: 'bad',  text: `Not the model. The model did what you let it do. The fix is upstream — in how you scope the prompt.` },
};

const TONE_BORDER: Record<string, string> = {
  good: 'border-lk-green/30',
  mid:  'border-lk-violet/30',
  bad:  'border-lk-red/30',
};
const TONE_BG: Record<string, string> = {
  good: 'bg-lk-green/[0.05]',
  mid:  'bg-lk-violet/[0.05]',
  bad:  'bg-lk-red/[0.05]',
};
const TONE_TAG: Record<string, string> = {
  good: 'text-lk-green',
  mid:  'text-lk-violet',
  bad:  'text-lk-red',
};

export default function DecisionTree() {
  const [path, setPath] = useState<string[]>([]);

  const visibleSteps = useMemo(() => {
    const out: Step[] = [SCENARIO[0]];
    for (let i = 0; i < path.length; i++) {
      const next = SCENARIO.slice(1).find(s => s.onlyIf === path[i]);
      if (next) out.push(next);
      else break;
    }
    return out;
  }, [path]);

  const lastOutcome = path[path.length - 1];
  const isFinal = path.length > 0 && !SCENARIO.slice(1).find(s => s.onlyIf === lastOutcome);
  const summary = isFinal && lastOutcome ? OUTCOMES[lastOutcome] : null;

  function choose(outcome: string) {
    setPath(prev => [...prev, outcome]);
  }

  function reset() {
    setPath([]);
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card p-6">
      <p className="font-mono text-xs text-lk-cyan tracking-widest uppercase mb-4">— Decide</p>
      <p className="text-lk-text-primary text-base font-medium mb-5">
        A real session in progress. What do you do next?
      </p>

      <div className="space-y-4">
        {visibleSteps.map((step, i) => {
          const stepOutcome = path[i];
          const isCurrentStep = i === visibleSteps.length - 1 && !stepOutcome;
          const chosenLabel = stepOutcome
            ? step.choices.find(c => c.outcome === stepOutcome)?.label
            : null;

          return (
            <div key={i} className="rounded-xl border border-white/[0.07] bg-void p-5">
              <p className="font-mono text-xs text-lk-text-dim tracking-widest uppercase mb-3">
                Step {i + 1}
              </p>
              <p className="text-sm text-lk-text-secondary mb-4">{step.setup}</p>

              <div className="rounded-lg border border-white/[0.07] bg-card px-4 py-3 mb-4">
                <p className="font-mono text-xs text-lk-cyan tracking-widest uppercase mb-2">Claude</p>
                <p className="text-sm text-lk-text-secondary leading-relaxed">{step.claudeTurn}</p>
              </div>

              {isCurrentStep && (
                <>
                  <p className="text-sm text-lk-text-primary font-medium mb-3">{step.question}</p>
                  <div className="space-y-2">
                    {step.choices.map((choice, ci) => (
                      <button
                        key={ci}
                        onClick={() => choose(choice.outcome)}
                        className="w-full text-left px-4 py-3 rounded-xl border border-white/[0.07] text-sm text-lk-text-secondary hover:border-white/20 hover:bg-white/[0.02] hover:text-lk-text-primary transition"
                      >
                        {choice.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {chosenLabel && (
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs text-lk-text-dim tracking-widest uppercase shrink-0 pt-0.5">
                    You picked
                  </span>
                  <span className="text-sm text-lk-text-primary">{chosenLabel}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {summary && (
        <div className={`mt-4 rounded-xl border ${TONE_BORDER[summary.tone]} ${TONE_BG[summary.tone]} p-5`}>
          <p className={`font-mono text-xs tracking-widest uppercase mb-2 ${TONE_TAG[summary.tone]}`}>
            {summary.tag}
          </p>
          <p className="text-sm text-lk-text-secondary mb-4">{summary.text}</p>
          <button
            onClick={reset}
            className="px-5 py-2.5 border border-white/20 hover:border-white/40 text-lk-text-secondary hover:text-lk-text-primary text-sm font-medium rounded-lg transition"
          >
            ↻ Try a different path
          </button>
        </div>
      )}
    </div>
  );
}
