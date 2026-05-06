import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

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
    <div className="min-h-screen bg-void flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="block text-center mb-12">
          <span className="font-serif text-3xl">
            <span className="text-lk-gold">Lu</span>
            <span className="text-lk-text-primary">Kai</span>
            <span className="text-lk-cyan font-mono text-sm align-super ml-1">AI</span>
          </span>
        </Link>

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
            <p className="text-lk-red text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lk-cyan text-void font-bold py-3 rounded-lg hover:bg-lk-cyan/90 transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account →'}
          </button>
        </form>

        <p className="text-center text-sm text-lk-text-tertiary mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-lk-cyan hover:text-lk-cyan/80">Log in</Link>
        </p>
      </div>
    </div>
  );
}
