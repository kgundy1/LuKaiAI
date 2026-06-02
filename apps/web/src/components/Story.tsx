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
    sub: 'OCR, AI engine, role-based workflow, mobile upload',
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
              I kept watching the same slow, manual process repeat — the kind of repetitive work
              that quietly eats hours and money, day after day.{' '}
              <strong className="text-lk-text-primary font-semibold">
                I knew exactly how it should work. I just didn't have a way to build it.
              </strong>{' '}
              The fix felt out of reach — until it wasn't.
            </p>
            <p className="text-[17px] text-lk-text-secondary leading-[1.8] font-light max-w-[580px] mb-8">
              I had never written a line of code. I had a subscription and a process I understood
              better than any developer ever could.{' '}
              <strong className="text-lk-text-primary font-semibold">That turned out to be enough.</strong>
            </p>
            <p className="text-[17px] text-lk-text-secondary leading-[1.8] font-light max-w-[580px] mb-8">
              I built it. It worked. Then I built this — LuKai — because once you've done it once,{' '}
              <strong className="text-lk-text-primary font-semibold">you start seeing all the ideas that should exist and don't.</strong>
            </p>
            <p className="text-[17px] text-lk-text-secondary leading-[1.8] font-light max-w-[580px] mb-8">
              Maybe yours is sitting in your head because every time you looked at the price of
              building it, you put it back down. If cost was the only barrier,{' '}
              <strong className="text-lk-text-primary font-semibold">that barrier is gone.</strong>{' '}
              This stays free. If even one person who'd given up on their idea ends up bringing it
              to life because of this, that's enough for me.
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
