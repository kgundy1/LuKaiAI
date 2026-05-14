function Nav({ view, user, navigate, logout }) {
  const inApp = view === 'learn' || view === 'lesson';

  return (
    <nav className="kit-nav">
      <Wordmark onClick={() => navigate(user ? 'learn' : 'landing')} />
      <div className="kit-nav-r">
        {!user && (
          <>
            <a className="kit-nav-l" onClick={() => navigate('landing', { hash: '#story' })}>The story</a>
            <a className="kit-nav-l" onClick={() => navigate('landing', { hash: '#why' })}>Why it works</a>
            <a className="kit-nav-l" onClick={() => navigate('login')}>Log in</a>
            <button className="kit-cta" onClick={() => navigate('signup')}>Sign up →</button>
          </>
        )}
        {user && (
          <>
            <span style={{ fontSize: 13, color: 'var(--tt)' }}>{user.email}</span>
            {inApp ? (
              <button className="kit-nav-l" onClick={logout} style={{ background: 'none', border: 'none' }}>Log out</button>
            ) : (
              <button className="kit-cta" onClick={() => navigate('learn')}>Go to learn →</button>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

window.Nav = Nav;
