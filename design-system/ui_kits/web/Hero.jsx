// Hero + the inline ReceiptCard.

const heroReceiptRows = [
  { role: 'Senior Full-Stack Engineer', sub: '6 months · $175K/yr', cost: '$87,500' },
  { role: 'AI Integration Specialist',  sub: '3 months · $195K/yr', cost: '$48,750' },
  { role: 'Product Manager',            sub: '6 months · $130K/yr', cost: '$65,000' },
  { role: 'Domain Consultant',          sub: 'Project basis',        cost: '$85,000' },
];

function ReceiptCard() {
  return (
    <div
      className="fade-up d2"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border2)',
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <span
        style={{
          content: '',
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent 10%, var(--cyan) 50%, transparent 90%)',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cyan)', textTransform: 'uppercase' }}>
          What it would have cost
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', background: 'var(--green-s)', border: '1px solid rgba(52,211,153,0.2)', padding: '3px 8px', borderRadius: 4 }}>
          ACTUAL: $20/mo
        </div>
      </div>

      {heroReceiptRows.map((row, i) => (
        <div
          key={row.role}
          style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            padding: '10px 24px',
            borderBottom: i < heroReceiptRows.length - 1 ? '1px solid var(--border)' : 'none',
            gap: 16,
          }}
        >
          <div style={{ fontSize: 13, color: 'var(--ts)', flex: 1, lineHeight: 1.4 }}>
            {row.role}
            <small style={{ display: 'block', fontSize: 11, color: 'var(--tt)', marginTop: 1 }}>{row.sub}</small>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--tp)', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {row.cost}
          </div>
        </div>
      ))}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', background: 'var(--red-s)', borderTop: '1px solid rgba(248,113,113,0.15)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--tp)' }}>Traditional build cost</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 15, color: 'var(--red)' }}>$286,250</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'var(--green-s)', borderTop: '1px solid rgba(52,211,153,0.15)' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>
          What it actually cost
          <small style={{ display: 'block', fontSize: 11, color: 'var(--tt)', fontWeight: 400, marginTop: 1 }}>Claude subscription</small>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 20, color: 'var(--green)' }}>$20/mo</div>
      </div>
    </div>
  );
}

function Hero({ navigate }) {
  const checks = [
    'No developers. No agency. No technical co-founder.',
    'Production software — not a prototype, not a demo.',
    'The only thing it cost was a subscription.',
  ];

  return (
    <section className="hero-stage">
      <div className="hero-orb1" />
      <div className="hero-orb2" />
      <div className="hero-grid" />

      <div
        style={{
          maxWidth: 1060, margin: '0 auto', width: '100%',
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 360px',
          gap: 100,
          alignItems: 'center',
        }}
      >
        <div>
          <div
            className="fade-up"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
              color: 'var(--cyan)',
              border: '1px solid rgba(0,200,240,0.2)',
              background: 'rgba(0,200,240,0.05)',
              borderRadius: 100,
              padding: '5px 14px',
              marginBottom: 36,
            }}
          >
            <span className="bdot" />
            Live build · Real workflow
          </div>

          <h1
            className="fade-up d1"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(52px, 6.5vw, 80px)',
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              marginBottom: 28,
            }}
          >
            <span style={{ display: 'block', color: 'var(--tp)' }}>I built something.</span>
            <span
              className="lk-grad"
              style={{ display: 'block', fontStyle: 'italic' }}
            >
              This is how.
            </span>
            <span style={{ display: 'block', color: 'var(--ts)', fontSize: '0.72em', fontStyle: 'normal', marginTop: 8, letterSpacing: '-0.01em' }}>
              You can too.
            </span>
          </h1>

          <p
            className="fade-up d2"
            style={{ fontSize: 18, color: 'var(--ts)', lineHeight: 1.8, fontWeight: 300, maxWidth: 500, marginBottom: 44 }}
          >
            I had an idea. I had <strong style={{ color: 'var(--tp)', fontWeight: 600 }}>zero coding background.</strong>{' '}
            I had no budget for developers. What I had was a real problem costing real money — and the stubbornness to figure it out.{' '}
            <strong style={{ color: 'var(--tp)', fontWeight: 600 }}>Six weeks later it was live.</strong>
          </p>

          <div className="fade-up d3" style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 52 }}>
            <a className="cta-primary" onClick={() => navigate('signup')}>I want to know how →</a>
            <a className="cta-secondary" href="#story">The full story ↓</a>
          </div>

          <div className="fade-up d4" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {checks.map((text) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--ts)' }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--green-s)', border: '1px solid rgba(52,211,153,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--green)', flexShrink: 0 }}>
                  ✓
                </span>
                {text}
              </div>
            ))}
          </div>
        </div>

        <ReceiptCard />
      </div>
    </section>
  );
}

window.Hero = Hero;
window.ReceiptCard = ReceiptCard;
