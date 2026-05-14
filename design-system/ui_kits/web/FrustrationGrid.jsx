const frustrationCards = [
  {
    type: 'familiar',
    quote: '"Claude Code keeps breaking things I didn\'t ask it to touch."',
    body: <>Every session it goes in circles. You give it one task and it touches six files. You approve a change and something else stops working. <strong>It's not a Claude problem.</strong> It's a workflow problem.</>,
  },
  {
    type: 'familiar',
    quote: '"I have to re-explain the whole project every single session."',
    body: <>Starting over every time. Context lost. Claude suggests rebuilding things that already exist. An hour of every session is just catching it up. <strong>There's a fix for this.</strong> Most people never find it.</>,
  },
  {
    type: 'familiar',
    quote: '"It worked — then I added one feature and everything broke."',
    body: <>A working prototype that falls apart the moment you build on it. Features tangled together. No clean way to isolate a fix. <strong>This is a scoping problem</strong> — and it's completely preventable.</>,
  },
  {
    type: 'answer',
    quote: '"What am I missing that everyone else seems to know?"',
    body: <>You're not missing a technical skill. <strong>You're missing one specific workflow decision</strong> that changes everything. The people who ship consistently all figured it out — usually by accident, after a lot of pain. This is the shortcut.</>,
  },
];

function FrustrationGrid() {
  return (
    <section id="why" className="sec">
      <div className="sec-in">
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <Eyebrow>Why most ideas stay ideas</Eyebrow>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: 20 }}>
            Building goes one<br/>of two ways.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--ts)', lineHeight: 1.8, fontWeight: 300, maxWidth: 580 }}>
            People who try to build with AI alone usually hit the same four walls. People who use a workflow don't.{' '}
            <strong style={{ color: 'var(--tp)', fontWeight: 600 }}>That's the whole difference — and these are the walls.</strong>
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {frustrationCards.map((c, i) => {
            const isAnswer = c.type === 'answer';
            return (
              <div
                key={i}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: 28,
                  transition: 'border-color .2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em',
                    textTransform: 'uppercase', marginBottom: 14,
                    padding: '3px 8px', borderRadius: 4,
                    border: '1px solid ' + (isAnswer ? 'rgba(0,200,240,0.25)' : 'var(--border)'),
                    background: isAnswer ? 'rgba(0,200,240,0.05)' : 'transparent',
                    color: isAnswer ? 'var(--cyan)' : 'var(--tt)',
                  }}
                >
                  {isAnswer ? 'The answer exists' : 'Sounds familiar'}
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 20, fontStyle: 'italic', color: 'var(--ts)', lineHeight: 1.4, marginBottom: 16 }}>
                  {c.quote}
                </div>
                <div style={{ fontSize: 14, color: 'var(--tt)', lineHeight: 1.65 }}>
                  {c.body}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.FrustrationGrid = FrustrationGrid;
