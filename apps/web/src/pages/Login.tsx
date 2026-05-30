import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../lib/AuthContext';
import PageShell from '../components/PageShell';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/learn');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell brandTexture mainClassName="pt-24 pb-20 px-6 flex items-center justify-center">
      <Helmet>
        <title>Log in — LuKaiAI</title>
        <meta name="description" content="Log in to your LuKaiAI account." />
      </Helmet>
      <div className="w-full max-w-md">
        <h1 className="font-serif text-3xl text-lk-text-primary text-center mb-2">Welcome back</h1>
        <p className="text-lk-text-tertiary text-center text-sm mb-8">Pick up where you left off.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-lk-text-tertiary mb-2 tracking-wider uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-lk-text-primary focus:border-lk-cyan/40 focus:ring-2 focus:ring-lk-cyan/10 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-lk-text-tertiary mb-2 tracking-wider uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-lk-text-primary focus:border-lk-cyan/40 focus:ring-2 focus:ring-lk-cyan/10 outline-none transition"
            />
          </div>

          {error && (
            <p role="alert" aria-live="polite" className="text-lk-red text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lk-cyan text-void font-bold py-3 rounded-lg hover:bg-lk-cyan/90 transition disabled:opacity-50"
          >
            {loading ? 'Logging in…' : 'Log in →'}
          </button>
        </form>

        <p className="text-center text-sm text-lk-text-tertiary mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-lk-cyan hover:text-lk-cyan/80">Sign up</Link>
        </p>
      </div>
    </PageShell>
  );
}
