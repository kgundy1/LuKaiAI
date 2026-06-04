// Re-sequenced landing sections, built around the "Capture, don't guess" principle.
// Each section uses the existing .reveal scroll system and lk-* design tokens.

const sectionBase =
  'px-12 max-[960px]:px-6 py-[96px] border-t border-white/[0.05]';
const kicker =
  'reveal font-mono text-[11px] tracking-[0.18em] uppercase text-lk-cyan';
const h2 =
  'reveal font-serif text-[clamp(30px,4vw,42px)] font-normal tracking-[-0.02em] leading-[1.1] mt-4 mb-5';
const lead = 'reveal text-[18px] text-lk-text-secondary leading-[1.7] font-light';

export function Problem() {
  return (
    <section className={sectionBase}>
      <div className="max-w-[760px] mx-auto text-center">
        <div className={kicker}>The real problem</div>
        <h2 className={h2}>Why most ideas never get built</h2>
        <p className={`${lead} max-w-[620px] mx-auto`}>
          It was never about whether you&apos;re capable. It&apos;s that the path looked
          impossible: learn to code (years), hire a developer (thousands), or try an AI tool and
          watch it hand you the same generic thing it gives everyone — then leave you stranded the
          moment something breaks. So the idea stays an idea.
        </p>
      </div>
    </section>
  );
}

export function Principle() {
  return (
    <section className={sectionBase}>
      <div className="max-w-[760px] mx-auto text-center">
        <div className={kicker}>What it actually means</div>
        <h2 className={h2}>
          Guess, and you get <span className="text-lk-cyan">the average.</span>
        </h2>
        <p className={`${lead} max-w-[620px] mx-auto`}>
          When you&apos;re vague, AI fills the gaps with the average — the same answer it gives
          everyone who&apos;s vague. When you <em>capture</em> — hand it the real specifics, the
          actual screen, your exact situation — it builds <em>yours</em>. That single shift is the
          difference between the generic version and the thing you actually pictured. Everything
          here is built to make capturing second nature.
        </p>
      </div>
    </section>
  );
}

const steps = [
  {
    n: '01',
    title: 'Bring your idea',
    body: "Any idea — a tool for your job, an app for your family, a side project you've sat on for years. Nothing's too small or too ambitious.",
  },
  {
    n: '02',
    title: "Capture, don't guess",
    body: 'You\u2019ll learn to give AI the real specifics instead of vague descriptions — so it builds what you actually mean, not the generic version.',
  },
  {
    n: '03',
    title: 'Build it and ship it',
    body: 'Go from idea to a real, working, live thing you can use and share. Step by step. Nothing skipped, nothing assumed.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className={sectionBase}>
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center">
          <div className={kicker}>How it works</div>
          <h2 className={h2}>From idea to a real, working thing</h2>
        </div>
        <div className="grid grid-cols-3 max-[960px]:grid-cols-1 gap-[22px] mt-12">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`reveal${i === 1 ? ' d2' : i === 2 ? ' d3' : ''} bg-card border border-white/[0.06] rounded-[14px] p-7`}
            >
              <div className="font-mono text-[12px] tracking-[0.1em] text-lk-cyan">{s.n}</div>
              <h3 className="font-serif text-[23px] font-normal mt-3 mb-2 text-lk-text-primary">
                {s.title}
              </h3>
              <p className="text-[15px] text-lk-text-secondary leading-[1.6]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhatYouKeep() {
  return (
    <section className={sectionBase}>
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center">
          <div className={kicker}>What you walk away with</div>
          <h2 className={h2}>Two things that are yours to keep</h2>
        </div>
        <div className="grid grid-cols-2 max-[960px]:grid-cols-1 gap-[22px] mt-11">
          <div className="reveal bg-card border border-white/[0.06] rounded-[14px] p-8">
            <h3 className="font-serif text-[25px] font-normal mb-3 text-lk-cyan">
              A real, working thing
            </h3>
            <p className="text-[15px] text-lk-text-secondary leading-[1.6]">
              Not a tutorial project. Your idea — live, usable, the thing you&apos;d actually open
              Monday morning or hand to a friend who needs it.
            </p>
          </div>
          <div className="reveal d2 bg-card border border-white/[0.06] rounded-[14px] p-8">
            <h3 className="font-serif text-[25px] font-normal mb-3 text-lk-cyan">
              The skill to keep building
            </h3>
            <p className="text-[15px] text-lk-text-secondary leading-[1.6]">
              You won&apos;t be locked into a tool that strands you when it breaks. You&apos;ll know
              how to do it again — on your own, for the next idea, and the one after that.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhoFor() {
  return (
    <section className={sectionBase}>
      <div className="max-w-[720px] mx-auto text-center">
        <div className={kicker}>Who this is for</div>
        <h2 className={h2}>Anyone with an idea and the will to see it exist</h2>
        <p className={`${lead} max-w-[620px] mx-auto`}>
          Operators, parents, hobbyists, business owners, people halfway into a career change,
          people who had an idea last week. No coding background. No design background. No prior AI
          experience.
        </p>
        <p className="reveal d2 font-serif italic text-[20px] text-lk-text-primary max-w-[560px] mx-auto leading-[1.4] mt-8">
          &ldquo;Built by someone who started with zero coding background — which is the whole
          point. If the path only worked for engineers, it wouldn&apos;t be much of a path.&rdquo;
        </p>
      </div>
    </section>
  );
}

export function Cost() {
  return (
    <section id="cost" className={sectionBase}>
      <div className="max-w-[680px] mx-auto text-center">
        <div className={kicker}>The honest part</div>
        <h2 className={h2}>Is it really free?</h2>
        <p className={`${lead} max-w-[620px] mx-auto`}>
          The method, every lesson, all of it — free. The one thing you&apos;ll need is your own
          Claude subscription (about $20/month) — that&apos;s the tool you build with. No course
          fees. No upsells. No card to start.
        </p>
        <div className="reveal d2 font-mono text-[13px] text-lk-green mt-5">
          $0 to LuKaiAI · ~$20/mo to Claude · cancel anytime
        </div>
      </div>
    </section>
  );
}
