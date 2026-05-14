const bigReceiptRows = [
  { name: 'Senior Full-Stack Engineer', sub: 'Frontend, backend, database, deployment', rate: '$175K/yr', cost: '$87,500' },
  { name: 'AI Integration Specialist',  sub: 'LLM pipeline, OCR, audit engine',        rate: '$195K/yr', cost: '$48,750' },
  { name: 'Product Manager',            sub: 'Workflow design, spec writing, QA',      rate: '$130K/yr', cost: '$65,000' },
  { name: 'Domain Consultant',          sub: 'Industry expertise, compliance logic',   rate: 'Project',   cost: '$85,000' },
];

function BigReceipt() {
  return (
    <section className="sec surface">
      <div className="sec-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
        <div>
          <Eyebrow>The real cost of waiting</Eyebrow>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: 20 }}>
            What your idea costs<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--tt)' }}>the traditional way.</em>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--ts)', lineHeight: 1.8, fontWeight: 300, maxWidth: 580, marginBottom: 24 }}>
            Every idea that stays an idea has a cost. Not just the revenue it never generates — the money you'd have to spend to build it the way people tell you it has to be built.{' '}
            <strong style={{ color: 'var(--tp)', fontWeight: 600 }}>This is what that actually looks like.</strong>
          </p>
          <p style={{ fontSize: 17, color: 'var(--ts)', lineHeight: 1.8, fontWeight: 300, maxWidth: 580 }}>
            These are real market rates for a real production build — a compliance auditing tool built in six weeks that would have taken a team of four nearly half a year.{' '}
            <strong style={{ color: 'var(--tp)', fontWeight: 600 }}>One subscription changed the math entirely.</strong>
          </p>
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--tt)', textTransform: 'uppercase' }}>
              Traditional build estimate
            </div>
            <div style={{ fontSize: 12, color: 'var(--tt)', fontStyle: 'italic' }}>
              6-month build · 2026 market rates
            </div>
          </div>

          {bigReceiptRows.map((row, i) => (
            <div
              key={row.name}
              style={{
                display: 'flex', alignItems: 'center',
                padding: '14px 28px', gap: 16,
                borderBottom: i < bigReceiptRows.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--tp)' }}>{row.name}</div>
                <div style={{ fontSize: 12, color: 'var(--tt)', marginTop: 1 }}>{row.sub}</div>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--tt)', width: 90, textAlign: 'right' }}>{row.rate}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ts)', width: 76, textAlign: 'right' }}>{row.cost}</div>
            </div>
          ))}

          <div style={{ height: 1, background: 'var(--border2)' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', background: 'var(--red-s)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--tp)' }}>
              Total traditional cost
              <small style={{ display: 'block', fontSize: 12, color: 'var(--tt)', fontWeight: 400, marginTop: 4 }}>6 months · 4 professionals</small>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 20, color: 'var(--red)' }}>$286,250</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', background: 'var(--green-s)', borderTop: '1px solid rgba(52,211,153,0.15)' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--green)' }}>
              What it actually cost
              <small style={{ display: 'block', fontSize: 12, color: 'var(--tt)', fontWeight: 400, marginTop: 2 }}>Claude subscription · same output</small>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 22, color: 'var(--green)' }}>$20/mo</div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.BigReceipt = BigReceipt;
