import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="min-h-[88vh] flex items-center px-12 max-[960px]:px-6 pt-[100px] pb-[80px] relative overflow-hidden">
      {/* Orb 1 */}
      <div className="absolute w-[700px] h-[700px] -top-[200px] -right-[200px] bg-[radial-gradient(circle,rgba(0,200,240,0.06)_0%,transparent_65%)] pointer-events-none" />
      {/* Orb 2 — drifting */}
      <div className="orb-drift absolute w-[500px] h-[500px] -bottom-[100px] -left-[150px] bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_65%)] pointer-events-none" />
      {/* Grid lines */}
      <div className="grid-lines" />

      <div className="max-w-[820px] mx-auto w-full relative z-[2] text-center">
        <div className="hero-badge inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-lk-cyan border border-[rgba(0,200,240,0.2)] bg-[rgba(0,200,240,0.05)] rounded-full px-[14px] py-[5px] mb-9">
          <div className="bdot" />
          Free · learn to build with AI
        </div>

        <h1 className="hero-h1 font-serif text-[clamp(34px,4.8vw,58px)] font-normal leading-[1.14] tracking-[-0.02em] mb-7">
          Understand AI the way it actually works — and{' '}
          <span className="italic text-grad">build real things</span> with it.
        </h1>

        <p className="hero-body text-[19px] max-[600px]:text-[17px] text-lk-text-secondary leading-[1.65] font-light max-w-[600px] mx-auto mb-10">
          No tech background needed. Learn to make AI build what you actually want — not the
          generic version it hands everyone — then turn it into something real.
        </p>

        <div className="hero-acts flex flex-col items-center gap-3">
          <div className="flex items-center gap-5">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-lk-cyan text-void px-[28px] py-[14px] rounded-[9px] text-[15px] font-bold no-underline tracking-[0.01em] transition-all duration-200 hover:bg-[#22d3f0] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(0,200,240,0.28)]"
            >
              Start free →
            </Link>
            <a
              href="#what"
              className="text-[14px] font-medium text-lk-text-tertiary no-underline transition-colors duration-200 hover:text-lk-text-primary"
            >
              What is this? ↓
            </a>
          </div>
          <p className="text-[12px] text-lk-text-dim">
            Free · no credit card · you bring your own Claude subscription.
          </p>
        </div>
      </div>
    </section>
  );
}
