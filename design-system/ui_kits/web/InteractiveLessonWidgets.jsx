// Interactive lesson widgets — patterns for teaching workflow/judgment.
// Each widget is self-contained, brand-aligned, and shows a satisfying "completed" state.

// ─── 1. WorkflowSorter ─────────────────────────────────────────────
// "Sort each item into one of two buckets."
// Default buckets are Chat / Code; can be overridden via props for any
// binary judgment task.

const DEFAULT_SORTER_TASKS = [
  { id: 't1', label: 'Decide which database to use',         answer: 'chat', why: 'Architecture decisions need discussion before implementation. This is a thinking task.' },
  { id: 't2', label: 'Write the SQL migration file',          answer: 'code', why: 'You already know what schema you want. Now it just needs typing.' },
  { id: 't3', label: 'Debate whether to add a new feature',  answer: 'chat', why: "If you're still unsure it belongs in the product, you're not ready to build it." },
  { id: 't4', label: 'Implement a function from your spec',  answer: 'code', why: 'Specs in, code out. No thinking needed mid-task.' },
  { id: 't5', label: 'Write the CLAUDE.md for a new project', answer: 'chat', why: 'CLAUDE.md is the project memory. Drafting it requires you to *think* about what the project is.' },
];

const DEFAULT_BUCKET_LEFT  = { id: 'chat', label: 'Chat' };
const DEFAULT_BUCKET_RIGHT = { id: 'code', label: 'Code' };

function WorkflowSorter({ tasks, bucketLeft, bucketRight }) {
  const T = tasks || DEFAULT_SORTER_TASKS;
  const L = bucketLeft  || DEFAULT_BUCKET_LEFT;
  const R = bucketRight || DEFAULT_BUCKET_RIGHT;

  const [assignments, setAssignments] = React.useState({});
  const [revealed, setRevealed] = React.useState(false);

  const allAssigned = T.every(t => assignments[t.id]);
  const correctCount = T.filter(t => assignments[t.id] === t.answer).length;

  function assign(id, bucket) { if (!revealed) setAssignments(p => ({ ...p, [id]: bucket })); }
  function reset() { setAssignments({}); setRevealed(false); }

  return (
    <div className="widget">
      <div className="widget-eyebrow">— Sort it</div>
      <div className="widget-prompt">Drop each item into the right column.</div>

      <div className="sorter-grid">
        {T.map(t => {
          const a = assignments[t.id];
          const correct = revealed && a === t.answer;
          const wrong   = revealed && a !== t.answer;
          return (
            <div key={t.id} className={'sorter-task' + (correct ? ' correct' : '') + (wrong ? ' wrong' : '')}>
              <div className="sorter-label">{t.label}</div>
              <div className="sorter-buckets">
                <button onClick={() => assign(t.id, L.id)} className={'sb' + (a === L.id ? ' on left' : '')} disabled={revealed}>{L.label}</button>
                <button onClick={() => assign(t.id, R.id)} className={'sb' + (a === R.id ? ' on right' : '')} disabled={revealed}>{R.label}</button>
              </div>
              {revealed && (
                <div className="sorter-why">
                  <span className={correct ? 'tag-correct' : 'tag-wrong'}>
                    {correct ? '✓ ' + (a === L.id ? L.label.toUpperCase() : R.label.toUpperCase()) : 'Should be ' + (t.answer === L.id ? L.label.toUpperCase() : R.label.toUpperCase())}
                  </span>
                  <span>{t.why}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="widget-foot">
        {!revealed ? (
          <button className="cta-primary" disabled={!allAssigned} onClick={() => setRevealed(true)}>
            {allAssigned ? 'See the answers →' : `Sort all ${T.length} first`}
          </button>
        ) : (
          <div className="widget-result">
            <div className="widget-score">{correctCount} / {T.length} right</div>
            <button className="cta-secondary" onClick={reset}>↻ Try again</button>
          </div>
        )}
      </div>
    </div>
  );
}


// ─── 2. PromptCompare ───────────────────────────────────────────────

const COMPARE_VARIANTS = {
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

function PromptCompare() {
  const [variant, setVariant] = React.useState('vague');
  const v = COMPARE_VARIANTS[variant];

  return (
    <div className="widget">
      <div className="widget-eyebrow">— Compare</div>
      <div className="widget-prompt">Same task. Different prompt. Toggle to compare.</div>

      <div className="compare-toggle">
        <button className={'ct ' + (variant === 'vague' ? 'on' : '')} onClick={() => setVariant('vague')}>Vague</button>
        <button className={'ct ' + (variant === 'precise' ? 'on' : '')} onClick={() => setVariant('precise')}>Precise</button>
      </div>

      <div className="compare-body">
        <div className="compare-half">
          <div className="compare-tag">YOU</div>
          <pre className="compare-text">{v.prompt}</pre>
        </div>
        <div className="compare-half">
          <div className="compare-tag claude">CLAUDE</div>
          <pre className="compare-text dim">{v.response}</pre>
        </div>
      </div>

      <div className="compare-verdict">
        <strong>Result:</strong> {v.verdict}
      </div>
    </div>
  );
}


// ─── 3. TryWithClaude ───────────────────────────────────────────────
// Live Claude call. Configurable system prompt + placeholder.

const DEFAULT_TRYIT_SYSTEM = `You are reviewing the opening paragraph of a CLAUDE.md file — the project-memory document at the root of a software repo. Your job is to critique it.

Rules:
- Three sentences, no more.
- Be specific. Point at what's vague, what's missing, what's strong.
- Don't flatter. Don't be mean. Be useful.
- Don't suggest a rewrite. Just diagnose.
- Format: one sentence on what works, one on what's weak, one with a single concrete fix.

The user's draft is below.`;

function TryWithClaude({ placeholder, systemPrompt }) {
  const ph = placeholder || 'LuKaiAI is a self-guided course for people who want to...';
  const sp = systemPrompt || DEFAULT_TRYIT_SYSTEM;

  const [input, setInput] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [state, setState] = React.useState('idle');

  async function submit() {
    if (!input.trim() || state === 'loading') return;
    setState('loading'); setResponse('');
    try {
      const text = await window.claude.complete(sp + '\n\n---\n\n' + input);
      setResponse(text); setState('done');
    } catch (e) {
      setResponse('Something went wrong reaching Claude. Try again in a moment.');
      setState('error');
    }
  }

  return (
    <div className="widget">
      <div className="widget-eyebrow">— Try it with Claude</div>
      <div className="widget-prompt">Write your draft. Claude will tell you what's strong and what's weak.</div>

      <textarea
        className="tryit-input"
        placeholder={ph}
        value={input}
        onChange={(e) => { setInput(e.target.value); if (state !== 'idle') setState('idle'); }}
        rows={6}
        disabled={state === 'loading'}
      />

      <div className="widget-foot">
        <button className="cta-primary" onClick={submit} disabled={!input.trim() || state === 'loading'}>
          {state === 'loading' ? <><span className="bdot" /> Reading…</> : 'Get feedback →'}
        </button>
        {state === 'done' && <span className="tryit-meta">Powered by Claude · uses your subscription quota</span>}
      </div>

      {response && (
        <div className={'tryit-response' + (state === 'error' ? ' err' : '')}>
          <div className="tryit-response-tag">CLAUDE</div>
          <div className="tryit-response-text">{response}</div>
        </div>
      )}
    </div>
  );
}


// ─── 4. QuickCheck ──────────────────────────────────────────────────

function QuickCheck({ question, choices, correctIndex, explain }) {
  const [picked, setPicked] = React.useState(null);
  return (
    <div className="widget compact">
      <div className="widget-eyebrow">— Quick check</div>
      <div className="widget-prompt">{question}</div>

      <div className="qc-choices">
        {choices.map((c, i) => {
          const isPicked = picked === i;
          const isCorrect = picked !== null && i === correctIndex;
          const isWrongPick = isPicked && i !== correctIndex;
          return (
            <button
              key={i}
              className={'qc-choice' + (isCorrect ? ' correct' : '') + (isWrongPick ? ' wrong' : '')}
              disabled={picked !== null}
              onClick={() => setPicked(i)}
            >
              <span className="qc-letter">{String.fromCharCode(65 + i)}</span>
              <span className="qc-text">{c}</span>
              {isCorrect && <span className="qc-mark">✓</span>}
              {isWrongPick && <span className="qc-mark wrong">✗</span>}
            </button>
          );
        })}
      </div>

      {picked !== null && <div className="qc-explain">{explain}</div>}
    </div>
  );
}


// ─── 5. DecisionTree ────────────────────────────────────────────────
// A multi-step branching scenario. Each step shows a "Claude turn" + a
// situation; user picks what to do next; their picks shape the path
// and the final outcome.

const DEFAULT_SCENARIO = [
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
  // path branches based on first answer
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
      { label: 'The model needed to be smarter.',  outcome: 'wrong' },
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

const OUTCOMES = {
  great: { tag: 'GREAT', tone: 'good',
    text: `Clean fix. Tests caught the change, no scope creep, merged in five minutes. This is what the loop looks like at its best.` },
  good:  { tag: 'GOOD',  tone: 'good',
    text: `Solid. Adding a test is a worthwhile follow-up but it can be its own session — don't bundle it with the bugfix PR.` },
  meh:   { tag: 'OKAY',  tone: 'mid',
    text: `Works, but you spent fifteen minutes on a four-line change. The lesson: rejecting the scope-creep upfront is faster than unpicking it manually.` },
  bad:   { tag: 'EXPENSIVE', tone: 'bad',
    text: `This is the canonical off-rails failure. Approving "while I was in there" changes is how a 4-line fix becomes a 3-hour incident.` },
  right: { tag: 'RIGHT', tone: 'good',
    text: `Yes. The model didn't fail — the *handoff* failed. The fix is naming what NOT to touch, every single Code session.` },
  partial: { tag: 'PARTIAL', tone: 'mid',
    text: `Reading the diff would have caught it — but a cleaner fix is to never accept a diff that goes beyond what you asked for. Diff review is the safety net, not the strategy.` },
  wrong: { tag: 'WRONG', tone: 'bad',
    text: `Not the model. The model did what you let it do. The fix is upstream — in how you scope the prompt.` },
};

function DecisionTree() {
  const [step, setStep] = React.useState(0);
  const [path, setPath] = React.useState([]);
  // The "current step" is determined by the first step, then by branching:
  // step 0 is always shown; subsequent steps match the previous outcome.
  
  const visibleSteps = React.useMemo(() => {
    const out = [DEFAULT_SCENARIO[0]];
    for (let i = 0; i < path.length; i++) {
      const prevOutcome = path[i];
      // Find a step matching onlyIf = prevOutcome
      const next = DEFAULT_SCENARIO.slice(1).find(s => s.onlyIf === prevOutcome);
      if (next) out.push(next);
      else break;
    }
    return out;
  }, [path]);

  const currentStep = visibleSteps[visibleSteps.length - 1];
  const isFinal = path.length > 0 && !DEFAULT_SCENARIO.slice(1).find(s => s.onlyIf === path[path.length - 1]);
  const lastOutcome = path[path.length - 1];
  const summary = isFinal && lastOutcome ? OUTCOMES[lastOutcome] : null;

  function choose(outcome) {
    setPath(p => [...p, outcome]);
  }

  function reset() { setPath([]); }

  return (
    <div className="widget">
      <div className="widget-eyebrow">— Decide</div>
      <div className="widget-prompt">A real session in progress. What do you do next?</div>

      <div className="dt-steps">
        {visibleSteps.map((s, i) => {
          const stepOutcome = path[i];
          const showChoices = i === visibleSteps.length - 1 && !stepOutcome;
          return (
            <div key={i} className="dt-step">
              <div className="dt-step-label">Step {i + 1}</div>
              <div className="dt-setup">{s.setup}</div>

              <div className="dt-claude">
                <div className="dt-claude-tag">CLAUDE</div>
                <div className="dt-claude-text">{s.claudeTurn}</div>
              </div>

              {showChoices ? (
                <>
                  <div className="dt-question">{s.question}</div>
                  <div className="dt-choices">
                    {s.choices.map((c, ci) => (
                      <button key={ci} className="dt-choice" onClick={() => choose(c.outcome)}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : stepOutcome ? (
                <div className="dt-chosen">
                  <span className="dt-chosen-tag">YOU PICKED</span>
                  <span className="dt-chosen-text">{s.choices.find(c => c.outcome === stepOutcome)?.label}</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {summary && (
        <div className={'dt-summary tone-' + summary.tone}>
          <div className="dt-summary-tag">{summary.tag}</div>
          <div className="dt-summary-text">{summary.text}</div>
          <button className="cta-secondary" onClick={reset}>↻ Try a different path</button>
        </div>
      )}
    </div>
  );
}




// ─── 6. Screenshot ──────────────────────────────────────────────────
// An annotated reference screenshot. Two modes:
//  - Authored: pass src="..." for a baked-in reference image
//  - Placeholder: omit src; renders an <image-slot> the reviewer drags into
// Both support 'pins' — numbered callouts at percentage positions on the image
// with a label and a tooltip note. Optional 'caption' renders below.

function Screenshot({ src, slotId, placeholder, caption, pins = [], alt = 'Reference screenshot' }) {
  const [activePin, setActivePin] = React.useState(null);
  const useSlot = !src; // no src → placeholder mode

  return (
    <div className="ss-widget">
      <div className="ss-tag">— Reference</div>
      <div className="ss-frame">
        {useSlot ? (
          <image-slot
            id={slotId || 'screenshot'}
            shape="rounded"
            radius="8"
            placeholder={placeholder || 'Drop a screenshot here'}
            style={{ width: '100%', aspectRatio: '16/10', display: 'block' }}
          />
        ) : (
          <img src={src} alt={alt} className="ss-img" />
        )}
        {!useSlot && pins.map((p, i) => (
          <button
            key={i}
            className={'ss-pin' + (activePin === i ? ' active' : '')}
            style={{ left: p.x + '%', top: p.y + '%' }}
            onClick={() => setActivePin(activePin === i ? null : i)}
            onMouseEnter={() => setActivePin(i)}
            onMouseLeave={() => setActivePin(null)}
            title={p.label}
          >
            {i + 1}
            {activePin === i && (
              <div className="ss-pin-card" style={p.cardAlign === 'right' ? { right: 32, left: 'auto' } : null}>
                <div className="ss-pin-label">{p.label}</div>
                {p.note && <div className="ss-pin-note">{p.note}</div>}
              </div>
            )}
          </button>
        ))}
      </div>
      {caption && <div className="ss-caption">{caption}</div>}
      {pins.length > 0 && !useSlot && (
        <ol className="ss-legend">
          {pins.map((p, i) => (
            <li key={i}>
              <span className="ss-legend-num">{i + 1}</span>
              <span><strong>{p.label}</strong>{p.note ? ' — ' + p.note : ''}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

window.Screenshot = Screenshot;

window.WorkflowSorter = WorkflowSorter;
window.PromptCompare = PromptCompare;
window.TryWithClaude = TryWithClaude;
window.QuickCheck = QuickCheck;
window.DecisionTree = DecisionTree;
