// Re-sequenced landing sections. Goal: a cold visitor knows what this is in one read,
// the cost is honest and never hidden, and it's short enough not to bore.
// Uses the existing .reveal scroll system and lk-* tokens. Anchors #what #how #cost
// are referenced by Nav and Footer — keep them.

const sectionBase = 'px-12 max-[960px]:px-6 py-[88px] border-t border-white/[0.05]';
const kicker = 'reveal font-mono text-[11px] tracking-[0.18em] uppercase text-lk-cyan';
const h2 =
  'reveal font-serif text-[clamp(28px,3.8vw,40px)] font-normal tracking-[-0.02em] leading-[1.12] mt-4 mb-5';
const lead = 'reveal text-[18px] text-lk-text-secondary leading-[1.7] font-light';

export function WhatThisIs() {
  return (
    <section id="what" className={sectionBase}>
      <div className="max-w-[720px] mx-auto text-center">
        <div className={kicker}>What this is</div>
        <h2 className={h2}>A free path to building with AI — from zero</h2>
        <p className={`${lead} max-w-[620px] mx-auto`}>
          LuKaiAI teaches you to use AI to build real, working things — an app, a tool, a site —
          even if you&apos;ve never written a line of code or really used AI before. You learn by
          building something real, step by step. Not theory. Not jargon. Just the path.
        </p>
      </div>
    </section>
  );
}

export function Principle() {
  return (
    <section className={sectionBase}>
      <div className="max-w-[720px] mx-auto text-center">
        <div className={kicker}>The core idea</div>
        <h2 className={h2}>
          Guess, and AI gives you <span className="text-lk-cyan">the average.</span>
        </h2>
        <p className={`${lead} max-w-[620px] mx-auto`}>
          Most people type something vague and get back the same generic answer AI hands everyone.
          The real skill — the thing almost nobody teaches — is learning to give AI the exact
          specifics, so it builds what <em>you</em> actually want. That&apos;s what
          &ldquo;understanding AI&rdquo; really means, and it&apos;s the heart of everything here.
          We call it: <span className="text-lk-text-primary font-medium">capture, don&apos;t guess.</span>
        </p>
      </div>
    </section>
  );
}

const steps = [
  {
    n: '01',
    title: 'Bring your idea',
    body: "Any idea — a tool for your job, an app for your family, something you've sat on for years. Nothing's too small or too ambitious.",
  },
  {
    n: '02',
    title: "Capture, don't guess",
    body: 'You\u2019ll learn to give AI the real specifics instead of vague descriptions — so it builds what you actually mean, not the generic version.',
  },
  {
    n: '03',
    title: 'Build it, and keep the skill',
    body: 'Go from idea to a real, working thing you can use and share — and the skill to do it again, on your own, is yours to keep.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className={sectionBase}>
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center">
          <div className={kicker}>How it works</div>
          <h2 className={h2}>Three steps, idea to real</h2>
        </div>
        <div className="grid grid-cols-3 max-[960px]:grid-cols-1 gap-[22px] mt-12">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`reveal${i === 1 ? ' d2' : i === 2 ? ' d3' : ''} bg-card border border-white/[0.06] rounded-[14px] p-7`}
            >
              <div className="font-mono text-[12px] tracking-[0.1em] text-lk-cyan">{s.n}</div>
              <h3 className="font-serif text-[22px] font-normal mt-3 mb-2 text-lk-text-primary">
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

export function Cost() {
  return (
    <section id="cost" className={sectionBase}>
      <div className="max-w-[680px] mx-auto text-center">
        <div className={kicker}>The honest part</div>
        <h2 className={h2}>Free — and here&apos;s the one cost</h2>
        <p className={`${lead} max-w-[620px] mx-auto`}>
          Every lesson is free. The only thing you pay for is your own Claude subscription (about
          $20/month) — the AI you&apos;ll actually build with. If you&apos;re already paying for an
          AI tool, you&apos;re most of the way there. No course fees. No upsells. No card to start.
        </p>
        <div className="reveal d2 font-mono text-[13px] text-lk-green mt-5">
          $0 to LuKaiAI · ~$20/mo to Claude · cancel anytime
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
        <h2 className={h2}>If AI feels like it&apos;s moving fast without you</h2>
        <p className={`${lead} max-w-[620px] mx-auto`}>
          Operators, parents, hobbyists, business owners, anyone who&apos;s watched AI change
          everything and wondered how to actually keep up. No coding background. No design
          background. No prior AI experience. Just an idea and the will to build it.
        </p>
        <p className="reveal d2 font-serif italic text-[20px] text-lk-text-primary max-w-[560px] mx-auto leading-[1.4] mt-8">
          &ldquo;Built by someone who started with zero coding background — which is the whole
          point. If the path only worked for engineers, it wouldn&apos;t be much of a path.&rdquo;
        </p>
      </div>
    </section>
  );
}
