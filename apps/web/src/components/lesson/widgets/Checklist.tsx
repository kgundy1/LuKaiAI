import { useEffect, useState } from 'react';
import { fetchChecklistState, toggleChecklistItem } from '../../../lib/api';

export interface ChecklistPayload {
  items: { id: string; label: string }[];
}

interface Props extends ChecklistPayload {
  lessonId: string;
  blockId: string;
}

export default function Checklist({ items, lessonId, blockId }: Props) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchChecklistState(lessonId)
      .then((data) => {
        if (cancelled || !data?.ok) return;
        const next = new Set<string>();
        for (const row of data.completedItems ?? []) {
          if (row.blockId === blockId) next.add(row.itemId);
        }
        setCompleted(next);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load your progress");
      });
    return () => {
      cancelled = true;
    };
  }, [lessonId, blockId]);

  async function toggle(itemId: string) {
    const wasCompleted = completed.has(itemId);
    const nextCompleted = !wasCompleted;

    const optimistic = new Set(completed);
    if (nextCompleted) optimistic.add(itemId);
    else optimistic.delete(itemId);
    setCompleted(optimistic);
    setError(null);

    try {
      const res = await toggleChecklistItem(lessonId, blockId, itemId, nextCompleted);
      if (!res?.ok) throw new Error('save failed');
    } catch {
      const reverted = new Set(completed);
      if (wasCompleted) reverted.add(itemId);
      else reverted.delete(itemId);
      setCompleted(reverted);
      setError("Couldn't save — try again");
    }
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card p-6">
      <p className="font-mono text-xs text-lk-cyan tracking-widest uppercase mb-4">— Checklist</p>

      <ul className="space-y-2">
        {items.map((item) => {
          const isDone = completed.has(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full flex items-start gap-4 px-4 py-3 rounded-xl border border-white/[0.07] hover:border-white/20 hover:bg-white/[0.02] text-left transition"
              >
                <span
                  className={`mt-0.5 inline-flex items-center justify-center shrink-0 w-5 h-5 rounded-md border transition ${
                    isDone
                      ? 'bg-lk-cyan border-lk-cyan text-black'
                      : 'border-white/20 bg-transparent text-transparent'
                  }`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 8 6.5 11.5 13 5" />
                  </svg>
                </span>
                <span
                  className={`text-sm flex-1 ${
                    isDone ? 'text-lk-text-tertiary line-through' : 'text-lk-text-primary'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {error && (
        <p className="mt-4 text-xs text-lk-red">{error}</p>
      )}
    </div>
  );
}
