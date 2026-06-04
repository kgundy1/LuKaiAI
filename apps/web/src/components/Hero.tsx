import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-12 max-[960px]:px-6 pt-[100px] pb-[80px] relative overflow-hidden">
      {/* Orb 1 */}
      <div className="absolute w-[700px] h-[700px] -top-[200px] -right-[200px] bg-[radial-gradient(circle,rgba(0,200,240,0.06)_0%,transparent_65%)] pointer-events-none" />
      {/* Orb 2 — drifting */}
      <div className="orb-drift absolute w-[500px] h-[500px] -bottom-[100px] -left-[100px] bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_65%)] pointer-events-none" />
      {/* Grid lines */}
      <div className="grid-lines" />

      <div className="max-w-[1060px] mx-auto w-full relative z-[2] grid grid-cols-[1fr_400px] max-[960px]:grid-cols-1 gap-[80px] max-[960px]:gap-12 items-center">
        {/* Left — message */}
        <div>
          <div className="hero-badge inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-lk-cyan border border-[rgba(0,200,240,0.2)] bg-[rgba(0,200,240,0.05)] rounded-full px-[14px] py-[5px] mb-9">
            <div className="bdot" />
            Free · build real software with AI
          </div>

          <h1 className="hero-h1 font-serif text-[clamp(48px,6.5vw,78px)] font-normal leading-[1.08] tracking-[-0.025em] mb-7">
            <span className="block text-lk-text-primary">Capture,</span>
            <span className="block italic text-grad pb-[0.08em]">don&apos;t guess.</span>
          </h1>

          <p className="hero-body text-[18px] text-lk-text-secondary leading-[1.7] font-light max-w-[500px] mb-10">
            It&apos;s the one habit that decides whether AI builds{' '}
            <strong className="text-lk-text-primary font-semibold">your</strong> idea — or the
            same generic version it hands everyone else. Learn it, and turn any idea into real,
            working software. No coding background needed.
          </p>

          <div className="hero-acts flex flex-col items-start gap-3">
            <div className="flex items-center gap-5">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-lk-cyan text-void px-[26px] py-[13px] rounded-[9px] text-[15px] font-bold no-underline tracking-[0.01em] transition-all duration-200 hover:bg-[#22d3f0] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(0,200,240,0.28)]"
              >
                Start free →
              </Link>
              <a
                href="#how"
                className="text-[14px] font-medium text-lk-text-tertiary no-underline transition-colors duration-200 hover:text-lk-text-primary"
              >
                See how it works ↓
              </a>
            </div>
            <p className="text-[12px] text-lk-text-dim">
              Free · no credit card · you just need your own Claude subscription.
            </p>
          </div>
        </div>

        {/* Right — the principle, shown */}
        <div className="hero-receipt flex flex-col gap-4">
          {/* Guess */}
          <div className="bg-card border border-[rgba(255,255,255,0.08)] rounded-[14px] p-5">
            <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-lk-text-dim mb-3">Guess</div>
            <div className="bg-[#181c28] rounded-[9px] px-[14px] py-[11px] font-mono text-[13px] text-lk-text-secondary">
              &ldquo;build me a business&rdquo;
            </div>
            <div className="text-center text-lk-text-tertiary text-[16px] my-[10px]">↓</div>
            <p className="text-[13px] leading-[1.5] text-lk-text-tertiary">
              A generic lead-gen model. Fix websites, find clients. The exact answer it gives
              everyone who asks that.
            </p>
            <span className="inline-block font-mono text-[10px] tracking-[0.1em] uppercase mt-3 px-[9px] py-[3px] rounded-[5px] bg-white/[0.05] text-lk-text-dim">
              Everyone gets this
            </span>
          </div>

          {/* Capture */}
          <div className="bg-card border border-[rgba(0,200,240,0.35)] rounded-[14px] p-5 shadow-[0_8px_40px_rgba(0,200,240,0.08)]">
            <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-lk-cyan mb-3">Capture</div>
            <div className="bg-[#181c28] rounded-[9px] px-[14px] py-[11px] font-mono text-[13px] text-lk-text-secondary">
              &ldquo;here&apos;s my exact situation, the real numbers, the screenshot, what I
              actually need…&rdquo;
            </div>
            <div className="text-center text-lk-cyan text-[16px] my-[10px]">↓</div>
            <p className="text-[13px] leading-[1.5] text-lk-text-primary">
              The thing <em>you</em> pictured — built, working, yours.
            </p>
            <span className="inline-block font-mono text-[10px] tracking-[0.1em] uppercase mt-3 px-[9px] py-[3px] rounded-[5px] bg-[rgba(0,200,240,0.12)] text-lk-cyan">
              This is yours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
