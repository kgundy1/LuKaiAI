import { useState } from 'react';

interface SorterTask {
  id: string;
  label: string;
  answer: string;
  why: string;
}

interface Bucket {
  id: string;
  label: string;
}

export interface WorkflowSorterPayload {
  tasks?: SorterTask[];
  bucketLeft?: Bucket;
  bucketRight?: Bucket;
}

const DEFAULT_TASKS: SorterTask[] = [
  { id: 't1', label: 'Decide which database to use',        answer: 'chat', why: 'Architecture decisions need discussion before implementation. This is a thinking task.' },
  { id: 't2', label: 'Write the SQL migration file',         answer: 'code', why: 'You already know what schema you want. Now it just needs typing.' },
  { id: 't3', label: 'Debate whether to add a new feature', answer: 'chat', why: "If you're still unsure it belongs in the product, you're not ready to build it." },
  { id: 't4', label: 'Implement a function from your spec', answer: 'code', why: 'Specs in, code out. No thinking needed mid-task.' },
  { id: 't5', label: 'Write the CLAUDE.md for a new project', answer: 'chat', why: 'CLAUDE.md is the project memory. Drafting it requires you to think about what the project is.' },
];
const DEFAULT_LEFT:  Bucket = { id: 'chat', label: 'Chat' };
const DEFAULT_RIGHT: Bucket = { id: 'code', label: 'Code' };

export default function WorkflowSorter({ tasks, bucketLeft, bucketRight }: WorkflowSorterPayload) {
  const T = tasks      ?? DEFAULT_TASKS;
  const L = bucketLeft  ?? DEFAULT_LEFT;
  const R = bucketRight ?? DEFAULT_RIGHT;

  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);

  const allAssigned  = T.every(t => assignments[t.id]);
  const correctCount = T.filter(t => assignments[t.id] === t.answer).length;

  function assign(id: string, bucketId: string) {
    if (!revealed) setAssignments(prev => ({ ...prev, [id]: bucketId }));
  }

  function reset() {
    setAssignments({});
    setRevealed(false);
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card p-6">
      <p className="font-mono text-xs text-lk-cyan tracking-widest uppercase mb-4">— Sort it</p>
      <p className="text-lk-text-primary text-base font-medium mb-5">
        Drop each item into the right column.
      </p>

      <div className="space-y-3 mb-6">
        {T.map(task => {
          const a = assignments[task.id];
          const correct   = revealed && a === task.answer;
          const incorrect = revealed && a !== task.answer;

          const borderClass = correct
            ? 'border-lk-green/30'
            : incorrect
            ? 'border-lk-red/30'
            : 'border-white/[0.07]';
          const bgClass = correct
            ? 'bg-lk-green/[0.04]'
            : incorrect
            ? 'bg-lk-red/[0.04]'
            : '';

          return (
            <div
              key={task.id}
              className={`rounded-xl border ${borderClass} ${bgClass} p-4 transition`}
            >
              <p className="text-sm text-lk-text-primary mb-3">{task.label}</p>
              <div className="flex gap-2">
                {[L, R].map(bucket => {
                  const isActive = a === bucket.id;
                  const activeClass = isActive
                    ? 'border-lk-cyan/50 bg-lk-cyan/10 text-lk-cyan'
                    : 'border-white/[0.07] text-lk-text-tertiary hover:border-white/20 hover:text-lk-text-secondary';
                  return (
                    <button
                      key={bucket.id}
                      onClick={() => assign(task.id, bucket.id)}
                      disabled={revealed}
                      className={`px-4 py-1.5 rounded-lg border text-xs font-mono tracking-wide transition disabled:cursor-default ${activeClass}`}
                    >
                      {bucket.label}
                    </button>
                  );
                })}
              </div>
              {revealed && (
                <div className="mt-3 pt-3 border-t border-white/[0.07] flex items-start gap-2">
                  <span className={`font-mono text-xs tracking-widest shrink-0 ${correct ? 'text-lk-green' : 'text-lk-red'}`}>
                    {correct
                      ? `✓ ${(a === L.id ? L.label : R.label).toUpperCase()}`
                      : `→ ${(task.answer === L.id ? L.label : R.label).toUpperCase()}`}
                  </span>
                  <span className="text-xs text-lk-text-secondary">{task.why}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        {!revealed ? (
          <button
            className="px-5 py-2.5 bg-lk-cyan hover:bg-lk-cyan/80 text-black text-sm font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition"
            disabled={!allAssigned}
            onClick={() => setRevealed(true)}
          >
            {allAssigned ? 'See the answers →' : `Sort all ${T.length} first`}
          </button>
        ) : (
          <>
            <span className="text-sm text-lk-text-secondary">
              {correctCount} / {T.length} right
            </span>
            <button
              className="px-5 py-2.5 border border-white/20 hover:border-white/40 text-lk-text-secondary hover:text-lk-text-primary text-sm font-medium rounded-lg transition"
              onClick={reset}
            >
              ↻ Try again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
