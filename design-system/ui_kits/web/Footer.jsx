function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '44px 48px' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <Wordmark size="md" />
          <div style={{ fontSize: 12, color: 'var(--td)', marginTop: 3 }}>
            Named for Lucas &amp; Kailer · Built for anyone with an idea
          </div>
        </div>
        <ul style={{ display: 'flex', gap: 28, listStyle: 'none', padding: 0, margin: 0 }}>
          <li><a href="#story" style={{ fontSize: 13, color: 'var(--tt)', textDecoration: 'none' }}>Story</a></li>
          <li><a href="#why" style={{ fontSize: 13, color: 'var(--tt)', textDecoration: 'none' }}>Why it works</a></li>
          <li><a href="#access" style={{ fontSize: 13, color: 'var(--tt)', textDecoration: 'none' }}>Get access</a></li>
        </ul>
        <div style={{ fontSize: 12, color: 'var(--td)' }}>© 2026 LuKaiAI</div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
