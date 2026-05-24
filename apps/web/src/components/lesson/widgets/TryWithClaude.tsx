import { useState } from 'react';

export interface TryWithClaudePayload {
  placeholder?: string;
  systemPrompt?: string;
}

export default function TryWithClaude({ placeholder }: TryWithClaudePayload) {
  const ph = placeholder ?? 'LuKaiAI is a self-guided workflow for people who want to...';
  const [input, setInput] = useState('');

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card p-6">
      <p className="font-mono text-xs text-lk-cyan tracking-widest uppercase mb-4">— Try it with Claude</p>
      <p className="text-lk-text-primary text-base font-medium mb-5">
        Write your draft. Claude will tell you what's strong and what's weak.
      </p>

      <textarea
        className="w-full rounded-xl border border-white/[0.07] bg-void text-sm text-lk-text-primary placeholder:text-lk-text-dim px-4 py-3 font-sans leading-relaxed resize-none focus:outline-none focus:border-white/20"
        placeholder={ph}
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={6}
      />

      <div className="mt-4 flex items-center gap-4">
        <button
          disabled
          className="px-5 py-2.5 bg-lk-cyan/40 text-black/60 text-sm font-medium rounded-lg cursor-not-allowed"
        >
          Get critique →
        </button>
        <span className="text-xs text-lk-text-dim font-mono">
          Live critique coming soon — Phase 6 Step 5.
        </span>
      </div>
    </div>
  );
}
