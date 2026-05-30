import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../lib/AuthContext';
import PageShell from '../components/PageShell';

export default function Signup() {
  const { signup } = useAuth();
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
      await signup(email, password);
      navigate('/learn');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell brandTexture mainClassName="pt-24 pb-20 px-6 flex items-center justify-center">
      <Helmet>
        <title>Sign up — LuKaiAI</title>
        <meta name="description" content="Create your free LuKaiAI account." />
      </Helmet>
      <div className="w-full max-w-md">
        <h1 className="font-serif text-3xl text-lk-text-primary text-center mb-2">Create your account</h1>
        <p className="text-lk-text-tertiary text-center text-sm mb-8">Start building. Your idea is ready.</p>

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
              minLength={8}
              autoComplete="new-password"
              className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-lk-text-primary focus:border-lk-cyan/40 focus:ring-2 focus:ring-lk-cyan/10 outline-none transition"
            />
            <p className="text-xs text-lk-text-dim mt-1">At least 8 characters</p>
          </div>

          {error && (
            <p role="alert" aria-live="polite" className="text-lk-red text-sm text-center">{error}</p>
          )}

          <p className="text-sm text-lk-text-tertiary text-center">
            We'll send a welcome email — check spam if you don't see it.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lk-cyan text-void font-bold py-3 rounded-lg hover:bg-lk-cyan/90 transition disabled:opacity-50"
          >
            {loading ? 'Creating account…' : 'Create account →'}
          </button>
        </form>

        <p className="text-center text-sm text-lk-text-tertiary mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-lk-cyan hover:text-lk-cyan/80">Log in</Link>
        </p>
      </div>
    </PageShell>
  );
}
