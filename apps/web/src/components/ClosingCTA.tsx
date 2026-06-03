import { Link } from 'react-router-dom';

export default function ClosingCTA() {
  return (
    <section
      id="access"
      className="email-glow py-[140px] px-12 max-[960px]:px-6 text-center relative overflow-hidden"
    >
      <div className="relative z-[1] max-w-[560px] mx-auto">
        <h2 className="reveal font-serif text-[clamp(32px,4vw,48px)] font-normal tracking-[-0.025em] leading-[1.1]">
          Start when you&apos;re ready.
        </h2>

        <div className="reveal d2 mt-10">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-lk-cyan text-void px-[26px] py-[13px] rounded-[9px] text-[15px] font-bold no-underline tracking-[0.01em] transition-all duration-200 hover:bg-[#22d3f0] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(0,200,240,0.28)]"
          >
            Start Module 0 →
          </Link>
          <p className="mt-4 text-[12px] text-lk-text-dim">
            Free · no credit card.
          </p>
        </div>
      </div>
    </section>
  );
}
