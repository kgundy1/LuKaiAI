function AuthForm({ mode, navigate, login }) {
  const isSignup = mode === 'signup';
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({ email });
      navigate('learn');
    }, 500);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--void)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 40px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Wordmark size="lg" onClick={() => navigate('landing')} />
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 30, color: 'var(--tp)', textAlign: 'center', fontWeight: 400, marginBottom: 8, letterSpacing: '-0.02em' }}>
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h1>
        <p style={{ color: 'var(--tt)', textAlign: 'center', fontSize: 14, marginBottom: 32 }}>
          {isSignup ? 'Start building. Your idea is ready.' : 'Pick up where you left off.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label className="auth-label">Email</label>
            <input className="auth-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div>
            <label className="auth-label">Password</label>
            <input className="auth-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={isSignup ? 8 : 1} autoComplete={isSignup ? 'new-password' : 'current-password'} />
            {isSignup && <p style={{ fontSize: 11, color: 'var(--td)', marginTop: 6 }}>At least 8 characters</p>}
          </div>
          <button type="submit" disabled={loading} className="cta-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px 26px', marginTop: 4 }}>
            {loading ? (isSignup ? 'Creating account…' : 'Logging in…') : (isSignup ? 'Create account →' : 'Log in →')}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--tt)', marginTop: 24 }}>
          {isSignup ? (
            <>Already have an account?{' '}<a onClick={() => navigate('login')} style={{ color: 'var(--cyan)', cursor: 'pointer' }}>Log in</a></>
          ) : (
            <>Don't have an account?{' '}<a onClick={() => navigate('signup')} style={{ color: 'var(--cyan)', cursor: 'pointer' }}>Sign up</a></>
          )}
        </p>
      </div>
    </div>
  );
}

window.AuthForm = AuthForm;
