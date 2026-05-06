export default function Frustration() {
  return (
    <section id="why" className="py-[120px] px-12 max-[960px]:py-[80px] max-[960px]:px-6">
      <div className="max-w-[1060px] mx-auto">
        {/* Header */}
        <div className="reveal max-w-[640px] mb-16">
          <div className="eyebrow">Why most people fail</div>
          <h2 className="font-serif text-[clamp(36px,4.5vw,56px)] font-normal tracking-[-0.025em] leading-[1.08] mb-5">
            You've probably<br />been here before.
          </h2>
          <p className="text-[17px] text-lk-text-secondary leading-[1.8] font-light max-w-[580px]">
            These aren't failures of effort. They're failures of workflow. There's a reason things
            keep breaking — and once you see it,{' '}
            <strong className="text-lk-text-primary font-semibold">everything changes.</strong>
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 max-[960px]:grid-cols-1 gap-4">
          {/* Card 1 */}
          <div className="reveal d1 bg-card border border-[rgba(255,255,255,0.07)] rounded-[14px] p-7 transition-colors duration-200 hover:border-[rgba(255,255,255,0.12)]">
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] uppercase mb-[14px] px-2 py-[3px] rounded border text-lk-text-tertiary border-[rgba(255,255,255,0.07)]">
              Sounds familiar
            </div>
            <div className="font-serif text-[20px] italic text-lk-text-secondary leading-[1.4] mb-4">
              "Claude Code keeps breaking things I didn't ask it to touch."
            </div>
            <div className="text-[14px] text-lk-text-tertiary leading-[1.65]">
              Every session it goes in circles. You give it one task and it touches six files. You
              approve a change and something else stops working.{' '}
              <strong className="text-lk-text-secondary font-semibold">It's not a Claude problem.</strong>{' '}
              It's a workflow problem.
            </div>
          </div>

          {/* Card 2 */}
          <div className="reveal d2 bg-card border border-[rgba(255,255,255,0.07)] rounded-[14px] p-7 transition-colors duration-200 hover:border-[rgba(255,255,255,0.12)]">
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] uppercase mb-[14px] px-2 py-[3px] rounded border text-lk-text-tertiary border-[rgba(255,255,255,0.07)]">
              Sounds familiar
            </div>
            <div className="font-serif text-[20px] italic text-lk-text-secondary leading-[1.4] mb-4">
              "I have to re-explain the whole project every single session."
            </div>
            <div className="text-[14px] text-lk-text-tertiary leading-[1.65]">
              Starting over every time. Context lost. Claude suggests rebuilding things that already
              exist. An hour of every session is just catching it up.{' '}
              <strong className="text-lk-text-secondary font-semibold">There's a fix for this.</strong>{' '}
              Most people never find it.
            </div>
          </div>

          {/* Card 3 */}
          <div className="reveal d3 bg-card border border-[rgba(255,255,255,0.07)] rounded-[14px] p-7 transition-colors duration-200 hover:border-[rgba(255,255,255,0.12)]">
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] uppercase mb-[14px] px-2 py-[3px] rounded border text-lk-text-tertiary border-[rgba(255,255,255,0.07)]">
              Sounds familiar
            </div>
            <div className="font-serif text-[20px] italic text-lk-text-secondary leading-[1.4] mb-4">
              "It worked — then I added one feature and everything broke."
            </div>
            <div className="text-[14px] text-lk-text-tertiary leading-[1.65]">
              A working prototype that falls apart the moment you build on it. Features tangled
              together. No clean way to isolate a fix.{' '}
              <strong className="text-lk-text-secondary font-semibold">This is a scoping problem</strong>{' '}
              — and it's completely preventable.
            </div>
          </div>

          {/* Card 4 — answer */}
          <div className="reveal d4 bg-card border border-[rgba(255,255,255,0.07)] rounded-[14px] p-7 transition-colors duration-200 hover:border-[rgba(255,255,255,0.12)]">
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] uppercase mb-[14px] px-2 py-[3px] rounded border text-lk-cyan border-[rgba(0,200,240,0.25)] bg-[rgba(0,200,240,0.05)]">
              The answer exists
            </div>
            <div className="font-serif text-[20px] italic text-lk-text-secondary leading-[1.4] mb-4">
              "What am I missing that everyone else seems to know?"
            </div>
            <div className="text-[14px] text-lk-text-tertiary leading-[1.65]">
              You're not missing a technical skill.{' '}
              <strong className="text-lk-text-secondary font-semibold">
                You're missing one specific workflow decision
              </strong>{' '}
              that changes everything. The people who ship consistently all figured it out — usually
              by accident, after a lot of pain. This is the shortcut.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
