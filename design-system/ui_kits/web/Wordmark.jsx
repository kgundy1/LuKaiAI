// <Wordmark size /> — the canonical LuKai^AI mark.
// Sizes: 'sm' 16, 'md' 22 (default, nav), 'lg' 32 (auth header), 'xl' 44.

function Wordmark({ size = 'md', onClick }) {
  const sizes = {
    sm: { wm: 16, ai: 9 },
    md: { wm: 22, ai: 11 },
    lg: { wm: 32, ai: 14 },
    xl: { wm: 44, ai: 18 },
  };
  const s = sizes[size] || sizes.md;
  return (
    <a
      onClick={onClick}
      style={{
        fontFamily: 'var(--serif)',
        fontSize: s.wm,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        cursor: onClick ? 'pointer' : 'default',
        display: 'inline-block',
      }}
    >
      <span style={{ color: 'var(--gold)' }}>Lu</span>
      <span style={{ color: 'var(--tp)' }}>Kai</span>
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: s.ai,
          color: 'var(--cyan)',
          letterSpacing: '0.05em',
          marginLeft: 2,
          verticalAlign: 'super',
        }}
      >
        AI
      </span>
    </a>
  );
}

function Eyebrow({ children, center = false }) {
  return (
    <div
      style={{
        fontFamily: 'var(--mono)',
        fontSize: 10,
        letterSpacing: '0.15em',
        color: 'var(--cyan)',
        textTransform: 'uppercase',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        justifyContent: center ? 'center' : 'flex-start',
      }}
    >
      <span style={{ width: 18, height: 1, background: 'var(--cyan)', flexShrink: 0 }} />
      {children}
    </div>
  );
}

window.Wordmark = Wordmark;
window.Eyebrow = Eyebrow;
