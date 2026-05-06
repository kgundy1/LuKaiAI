const receiptRows = [
  { role: 'Senior Full-Stack Engineer', sub: '6 months · $175K/yr', cost: '$87,500' },
  { role: 'AI Integration Specialist',  sub: '3 months · $195K/yr', cost: '$48,750' },
  { role: 'Product Manager',            sub: '6 months · $130K/yr', cost: '$65,000' },
  { role: 'Domain Consultant',          sub: 'Project basis',        cost: '$85,000' },
];

const checks = [
  'No developers. No agency. No technical co-founder.',
  'Production software — not a prototype, not a demo.',
  'The only thing it cost was a subscription.',
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-12 max-[960px]:px-6 pt-[100px] pb-[80px] relative overflow-hidden">
      {/* Orb 1 */}
      <div className="absolute w-[700px] h-[700px] -top-[200px] -right-[200px] bg-[radial-gradient(circle,rgba(0,200,240,0.06)_0%,transparent_65%)] pointer-events-none" />
      {/* Orb 2 — drifting */}
      <div className="orb-drift absolute w-[500px] h-[500px] -bottom-[100px] -left-[100px] bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_65%)] pointer-events-none" />
      {/* Grid lines */}
      <div className="grid-lines" />

      <div className="max-w-[1060px] mx-auto w-full relative z-[2] grid grid-cols-[1fr_360px] max-[960px]:grid-cols-1 gap-[100px] max-[960px]:gap-12 items-center">
        {/* Left */}
        <div>
          <div className="hero-badge inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-lk-cyan border border-[rgba(0,200,240,0.2)] bg-[rgba(0,200,240,0.05)] rounded-full px-[14px] py-[5px] mb-9">
            <div className="bdot" />
            Live build · Real workflow
          </div>

          <h1 className="hero-h1 font-serif text-[clamp(52px,6.5vw,80px)] font-normal leading-[1.0] tracking-[-0.025em] mb-7">
            <span className="block text-lk-text-primary">I built something.</span>
            <span className="block italic text-grad">This is how.</span>
            <span className="block text-lk-text-secondary text-[0.72em] not-italic mt-2 tracking-[-0.01em]">You can too.</span>
          </h1>

          <p className="hero-body text-[18px] text-lk-text-secondary leading-[1.8] font-light max-w-[500px] mb-11">
            I had an idea. I had{' '}
            <strong className="text-lk-text-primary font-semibold">zero coding background.</strong>{' '}
            I had no budget for developers. What I had was a real problem
            costing real money — and the stubbornness to figure it out.{' '}
            <strong className="text-lk-text-primary font-semibold">Six weeks later it was live.</strong>
          </p>

          <div className="hero-acts flex items-center gap-5 mb-[52px]">
            <a
              href="#access"
              className="inline-flex items-center gap-2 bg-lk-cyan text-void px-[26px] py-[13px] rounded-[9px] text-[15px] font-bold no-underline tracking-[0.01em] transition-all duration-200 hover:bg-[#22d3f0] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(0,200,240,0.28)]"
            >
              I want to know how →
            </a>
            <a
              href="#story"
              className="text-[14px] font-medium text-lk-text-tertiary no-underline transition-colors duration-200 hover:text-lk-text-primary"
            >
              The full story ↓
            </a>
          </div>

          <div className="hero-checks flex flex-col gap-[10px]">
            {checks.map((text) => (
              <div key={text} className="flex items-center gap-[10px] text-[14px] text-lk-text-secondary">
                <div className="w-[18px] h-[18px] rounded-full bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.25)] flex items-center justify-center text-[10px] text-lk-green shrink-0">
                  ✓
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right — receipt card */}
        <div className="hero-receipt max-[960px]:hidden receipt-top bg-card border border-[rgba(255,255,255,0.12)] rounded-[18px] overflow-hidden">
          <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between">
            <div className="font-mono text-[10px] tracking-[0.12em] text-lk-cyan uppercase">
              What it would have cost
            </div>
            <div className="font-mono text-[10px] text-lk-green bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.2)] px-2 py-[3px] rounded">
              ACTUAL: $20/mo
            </div>
          </div>

          {receiptRows.map((row, i) => (
            <div
              key={row.role}
              className={`flex items-baseline justify-between px-6 py-[10px] gap-4${i < receiptRows.length - 1 ? ' border-b border-[rgba(255,255,255,0.07)]' : ''}`}
            >
              <div className="text-[13px] text-lk-text-secondary flex-1 leading-[1.4]">
                {row.role}
                <small className="block text-[11px] text-lk-text-tertiary mt-[1px]">{row.sub}</small>
              </div>
              <div className="font-mono text-[13px] text-lk-text-primary font-medium whitespace-nowrap shrink-0">
                {row.cost}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between px-6 py-[10px] bg-[rgba(248,113,113,0.04)] border-t border-[rgba(248,113,113,0.15)]">
            <div className="text-[13px] font-semibold text-lk-text-primary">Traditional build cost</div>
            <div className="font-mono text-[15px] text-lk-red">$286,250</div>
          </div>

          <div className="flex items-center justify-between px-6 py-4 bg-[rgba(52,211,153,0.05)] border-t border-[rgba(52,211,153,0.15)]">
            <div className="text-[14px] font-bold text-lk-green">
              What it actually cost
              <small className="block text-[11px] text-lk-text-tertiary font-normal mt-[1px]">Claude subscription</small>
            </div>
            <div className="font-mono text-[20px] text-lk-green">$20/mo</div>
          </div>
        </div>
      </div>
    </section>
  );
}
