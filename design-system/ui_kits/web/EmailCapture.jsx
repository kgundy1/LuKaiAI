function EmailCapture() {
  const [state, setState] = React.useState('idle');
  const [placeholder, setPlaceholder] = React.useState('your@email.com');
  const [email, setEmail] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setState('loading');
    setTimeout(() => {
      setState('success');
      setEmail('');
      setPlaceholder('Check your inbox.');
      setTimeout(() => {
        setState('idle');
        setPlaceholder('your@email.com');
      }, 5000);
    }, 600);
  }

  const btnText =
    state === 'loading' ? 'Sending…' :
    state === 'success' ? "You're in ✓" :
    "I'm ready →";

  return (
    <section
      id="access"
      style={{
        padding: '140px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(0,200,240,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto' }}>
        <Eyebrow center>Get access</Eyebrow>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5.5vw, 66px)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 20 }}>
          Your idea.<br/>
          <span className="lk-grad">Your build.</span><br/>
          <em style={{ fontStyle: 'italic' }}>Your timeline.</em>
        </h2>
        <p style={{ fontSize: 17, color: 'var(--ts)', fontWeight: 300, lineHeight: 1.75, marginBottom: 8 }}>
          The workflow exists. The proof exists.{' '}
          <strong style={{ color: 'var(--tp)', fontWeight: 600 }}>The only thing missing is you starting.</strong>
        </p>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--gold)', marginBottom: 48, opacity: 0.8 }}>
          — Named for Lucas &amp; Kailer. Built for everyone.
        </p>

        <form className="em-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="em-input"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={state === 'success'}
          />
          <button
            type="submit"
            disabled={state === 'loading' || state === 'success'}
            className={'em-btn' + (state === 'success' ? ' success' : '')}
          >
            {btnText}
          </button>
        </form>

        <p style={{ fontSize: 12, color: 'var(--td)' }}>No pitch. No pressure. Just the workflow.</p>
      </div>
    </section>
  );
}

window.EmailCapture = EmailCapture;
