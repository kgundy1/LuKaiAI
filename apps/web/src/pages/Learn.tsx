import { useAuth } from '../lib/AuthContext';
import { Link } from 'react-router-dom';

const MODULES = [
  { number: 1, title: 'Before you open Claude', description: 'The 20-minute thinking exercise that makes everything downstream better.', locked: false },
  { number: 2, title: 'Building the prototype', description: 'Use the Artifacts panel to build a live, clickable interface in plain language.', locked: true },
  { number: 3, title: 'CLAUDE.md — your project memory', description: 'How to give Claude memory across sessions. The file that ends the spiral.', locked: true },
  { number: 4, title: 'The two-session method', description: 'How Chat and Code work together. The core skill of this workflow.', locked: true },
  { number: 5, title: 'When things break', description: 'Things will break. The skill is knowing where to go and what to ask.', locked: true },
  { number: 6, title: 'Your actual job', description: 'AI handles every technical decision. You handle every domain decision.', locked: true },
];

export default function Learn() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-void">
      <nav className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-12 bg-void/80 backdrop-blur-xl border-b border-white/[0.07] z-50">
        <Link to="/" className="font-serif text-2xl">
          <span className="text-lk-gold">Lu</span>
          <span className="text-lk-text-primary">Kai</span>
          <span className="text-lk-cyan font-mono text-xs align-super ml-1">AI</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-sm text-lk-text-tertiary">{user?.email}</span>
          <button onClick={logout} className="text-sm text-lk-text-tertiary hover:text-lk-text-primary transition">Log out</button>
        </div>
      </nav>

      <div className="pt-32 px-6 pb-20 max-w-4xl mx-auto">
        <p className="font-mono text-xs text-lk-cyan tracking-widest uppercase mb-4">— The workflow</p>
        <h1 className="font-serif text-5xl text-lk-text-primary mb-4">Welcome to LuKai<span className="text-lk-cyan font-mono text-xl align-super">AI</span></h1>
        <p className="text-lk-text-secondary text-lg mb-16 max-w-2xl">Six modules. Each unlocks the next. Build at your pace.</p>

        <div className="space-y-4">
          {MODULES.map((m) => (
            <div
              key={m.number}
              className={`border rounded-2xl p-6 transition ${
                m.locked
                  ? 'border-white/[0.07] bg-card/30 opacity-60'
                  : 'border-lk-cyan/20 bg-card hover:border-lk-cyan/40 cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-6">
                <div className={`font-mono text-xs tracking-widest pt-1 ${m.locked ? 'text-lk-text-dim' : 'text-lk-cyan'}`}>
                  MODULE {String(m.number).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-lk-text-primary mb-2">{m.title}</h3>
                  <p className="text-lk-text-tertiary text-sm">{m.description}</p>
                </div>
                <div className="text-xs font-mono pt-1">
                  {m.locked ? (
                    <span className="text-lk-text-dim">🔒 LOCKED</span>
                  ) : (
                    <span className="text-lk-cyan">START →</span>
                  )}
                </div>
              </div>
              {!m.locked && (
                <p className="text-xs text-lk-text-dim mt-4 ml-20 italic">Module content coming soon.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
