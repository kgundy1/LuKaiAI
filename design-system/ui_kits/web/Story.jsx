const storyFacts = [
  { num: '18.6K', color: 'var(--cyan)',   label: 'Lines of production code',         sub: 'Backend, frontend, database, AI engine — none typed by hand' },
  { num: '59',     color: 'var(--violet)', label: 'Features shipped to production',   sub: 'Each a pull request on GitHub, auto-deployed on merge' },
  { num: '6 wks',  color: 'var(--gold)',   label: 'From first prompt to live software', sub: 'OCR, AI audit engine, role-based workflow, mobile upload' },
  { num: '$0',     color: 'var(--green)',  label: 'Spent on developers or designers', sub: 'One subscription. That was the entire budget.' },
];

function Story() {
  return (
    <section id="story" className="sec surface">
      <div className="sec-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start' }}>
        <div>
          <Eyebrow>The origin</Eyebrow>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: 20 }}>
            Named for my kids.<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--tt)' }}>Built for anyone</em><br/>
            with an idea.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--ts)', lineHeight: 1.8, fontWeight: 300, maxWidth: 580, marginBottom: 24 }}>
            I watched money walk out the door every month because one person was manually cross-referencing paper documents against policy requirements before submitting claims.{' '}
            <strong style={{ color: 'var(--tp)', fontWeight: 600 }}>Every error was a chargeback. Every chargeback was lost revenue.</strong> The problem was obvious. The solution felt out of reach — until it wasn't.
          </p>
          <p style={{ fontSize: 17, color: 'var(--ts)', lineHeight: 1.8, fontWeight: 300, maxWidth: 580, marginBottom: 32 }}>
            I had never written a line of code. I had a subscription and a problem I understood better than any developer ever could.{' '}
            <strong style={{ color: 'var(--tp)', fontWeight: 600 }}>That turned out to be enough.</strong>
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: 'var(--gold-s)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 22 }}>👦👦</div>
            <div>
              <strong style={{ display: 'block', fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--gold)', letterSpacing: '-0.01em', marginBottom: 2 }}>
                LuKai — Lucas &amp; Kailer
              </strong>
              <span style={{ fontSize: 13, color: 'var(--tt)', lineHeight: 1.5 }}>
                Named for my two sons. To show them that "I don't know how" is not a reason to stop.
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {storyFacts.map((f, i) => (
            <div
              key={f.num}
              style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '22px 24px',
                borderBottom: i < storyFacts.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1, flexShrink: 0, width: 100, color: f.color }}>
                {f.num}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--tp)', marginBottom: 3 }}>{f.label}</div>
                <div style={{ fontSize: 13, color: 'var(--tt)', lineHeight: 1.5 }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Story = Story;
