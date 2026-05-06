const facts = [
  {
    num: '18.6K',
    color: '#00c8f0',
    label: 'Lines of production code',
    sub: 'Backend, frontend, database, AI engine — none typed by hand',
  },
  {
    num: '59',
    color: '#8b5cf6',
    label: 'Features shipped to production',
    sub: 'Each a pull request on GitHub, auto-deployed on merge',
  },
  {
    num: '6 wks',
    color: '#c9a84c',
    label: 'From first prompt to live software',
    sub: 'OCR, AI audit engine, role-based workflow, mobile upload',
  },
  {
    num: '$0',
    color: '#34d399',
    label: 'Spent on developers or designers',
    sub: 'One subscription. That was the entire budget.',
  },
];

export default function Story() {
  return (
    <section
      id="story"
      className="py-[120px] px-12 max-[960px]:py-[80px] max-[960px]:px-6 bg-surface border-t border-b border-[rgba(255,255,255,0.07)]"
    >
      <div className="max-w-[1060px] mx-auto">
        <div className="grid grid-cols-2 max-[960px]:grid-cols-1 gap-[96px] max-[960px]:gap-12 items-start">
          {/* Left */}
          <div className="reveal">
            <div className="eyebrow">The origin</div>
            <h2 className="font-serif text-[clamp(36px,4.5vw,56px)] font-normal tracking-[-0.025em] leading-[1.08] mb-5">
              Named for my kids.<br />
              <em className="italic text-lk-text-tertiary">Built for anyone</em><br />
              with an idea.
            </h2>
            <p className="text-[17px] text-lk-text-secondary leading-[1.8] font-light max-w-[580px] mb-12">
              I watched money walk out the door every month because one person was manually
              cross-referencing paper documents against policy requirements before submitting claims.{' '}
              <strong className="text-lk-text-primary font-semibold">
                Every error was a chargeback. Every chargeback was lost revenue.
              </strong>{' '}
              The problem was obvious. The solution felt out of reach — until it wasn't.
            </p>
            <p className="text-[17px] text-lk-text-secondary leading-[1.8] font-light max-w-[580px] mb-8">
              I had never written a line of code. I had a subscription and a problem I understood
              better than any developer ever could.{' '}
              <strong className="text-lk-text-primary font-semibold">That turned out to be enough.</strong>
            </p>
            <div className="inline-flex items-center gap-[14px] bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.2)] rounded-xl px-5 py-4">
              <div className="text-[22px]">👦👦</div>
              <div>
                <strong className="block font-serif text-[17px] text-lk-gold tracking-[-0.01em] mb-[2px]">
                  LuKai — Lucas &amp; Kailer
                </strong>
                <span className="text-[13px] text-lk-text-tertiary leading-[1.5]">
                  Named for my two sons. To show them that "I don't know how" is not a reason to stop.
                </span>
              </div>
            </div>
          </div>

          {/* Right — facts */}
          <div className="reveal d2 flex flex-col border border-[rgba(255,255,255,0.07)] rounded-[16px] overflow-hidden">
            {facts.map((f, i) => (
              <div
                key={f.num}
                className={`flex items-center gap-5 px-6 py-[22px] transition-colors duration-200 hover:bg-white/[0.02]${i < facts.length - 1 ? ' border-b border-[rgba(255,255,255,0.07)]' : ''}`}
              >
                <div
                  className="font-serif text-[36px] font-normal tracking-[-0.02em] leading-none shrink-0 w-[100px]"
                  style={{ color: f.color }}
                >
                  {f.num}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-lk-text-primary mb-[3px]">{f.label}</div>
                  <div className="text-[13px] text-lk-text-tertiary leading-[1.5]">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
