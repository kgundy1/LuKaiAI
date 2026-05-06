const rows = [
  {
    name: 'Senior Full-Stack Engineer',
    sub: 'Frontend, backend, database, deployment',
    rate: '$175K/yr',
    cost: '$87,500',
  },
  {
    name: 'AI Integration Specialist',
    sub: 'LLM pipeline, OCR, audit engine',
    rate: '$195K/yr',
    cost: '$48,750',
  },
  {
    name: 'Product Manager',
    sub: 'Workflow design, spec writing, QA',
    rate: '$130K/yr',
    cost: '$65,000',
  },
  {
    name: 'Domain Consultant',
    sub: 'Industry expertise, compliance logic',
    rate: 'Project',
    cost: '$85,000',
  },
];

export default function BigReceipt() {
  return (
    <section className="py-[120px] px-12 max-[960px]:py-[80px] max-[960px]:px-6 bg-surface border-t border-b border-[rgba(255,255,255,0.07)]">
      <div className="max-w-[1060px] mx-auto">
        <div className="grid grid-cols-2 max-[960px]:grid-cols-1 gap-[96px] max-[960px]:gap-12 items-center">
          {/* Left */}
          <div className="reveal">
            <div className="eyebrow">The real cost of waiting</div>
            <h2 className="font-serif text-[clamp(36px,4.5vw,56px)] font-normal tracking-[-0.025em] leading-[1.08] mb-5">
              What your idea costs<br />
              <em className="italic text-lk-text-tertiary">the traditional way.</em>
            </h2>
            <p className="text-[17px] text-lk-text-secondary leading-[1.8] font-light max-w-[580px] mb-12">
              Every idea that stays an idea has a cost. Not just the revenue it never generates —
              the money you'd have to spend to build it the way people tell you it has to be built.{' '}
              <strong className="text-lk-text-primary font-semibold">
                This is what that actually looks like.
              </strong>
            </p>
            <p className="text-[17px] text-lk-text-secondary leading-[1.8] font-light max-w-[580px]">
              These are real market rates for a real production build — a compliance auditing tool
              built in six weeks that would have taken a team of four nearly half a year.{' '}
              <strong className="text-lk-text-primary font-semibold">
                One subscription changed the math entirely.
              </strong>
            </p>
          </div>

          {/* Right — detailed receipt */}
          <div className="reveal d2 bg-card border border-[rgba(255,255,255,0.12)] rounded-[18px] overflow-hidden">
            <div className="flex items-center justify-between px-7 py-[18px] border-b border-[rgba(255,255,255,0.07)]">
              <div className="font-mono text-[10px] tracking-[0.14em] text-lk-text-tertiary uppercase">
                Traditional build estimate
              </div>
              <div className="text-[12px] text-lk-text-tertiary italic">
                6-month build · 2026 market rates
              </div>
            </div>

            {rows.map((row, i) => (
              <div
                key={row.name}
                className={`flex items-center px-7 py-[14px] gap-4${i < rows.length - 1 ? ' border-b border-[rgba(255,255,255,0.07)]' : ''}`}
              >
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-lk-text-primary">{row.name}</div>
                  <div className="text-[12px] text-lk-text-tertiary mt-[1px]">{row.sub}</div>
                </div>
                <div className="font-mono text-[12px] text-lk-text-tertiary w-[90px] text-right">
                  {row.rate}
                </div>
                <div className="font-mono text-[13px] text-lk-text-secondary w-[76px] text-right">
                  {row.cost}
                </div>
              </div>
            ))}

            <div className="h-px bg-[rgba(255,255,255,0.12)]" />

            <div className="flex items-center justify-between px-7 py-[14px] bg-[rgba(248,113,113,0.04)]">
              <div className="text-[14px] font-semibold text-lk-text-primary">
                Total traditional cost
                <small className="block text-[12px] text-lk-text-tertiary font-normal mt-1">
                  6 months · 4 professionals
                </small>
              </div>
              <div className="font-mono text-[20px] text-lk-red">$286,250</div>
            </div>

            <div className="flex items-center justify-between px-7 py-[18px] bg-[rgba(52,211,153,0.05)] border-t border-[rgba(52,211,153,0.15)]">
              <div className="text-[15px] font-bold text-lk-green">
                What it actually cost
                <small className="block text-[12px] text-lk-text-tertiary font-normal mt-[2px]">
                  Claude subscription · same output
                </small>
              </div>
              <div className="font-mono text-[22px] text-lk-green">$20/mo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
