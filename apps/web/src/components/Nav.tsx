import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

export default function Nav() {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-12 bg-void/80 backdrop-blur-xl border-b border-white/[0.07] z-50">
      <Link to="/" className="font-serif text-2xl">
        <span className="text-lk-gold">Lu</span>
        <span className="text-lk-text-primary">Kai</span>
        <span className="text-lk-cyan font-mono text-xs align-super ml-1">AI</span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        {!user && (
          <>
            <a href="#story" className="text-sm text-lk-text-tertiary hover:text-lk-text-primary transition">The story</a>
            <a href="#why" className="text-sm text-lk-text-tertiary hover:text-lk-text-primary transition">Why it works</a>
            <Link to="/login" className="text-sm text-lk-text-tertiary hover:text-lk-text-primary transition">Log in</Link>
            <Link to="/signup" className="bg-lk-cyan text-void px-5 py-2 rounded-lg text-sm font-bold hover:bg-lk-cyan/90 transition">Sign up →</Link>
          </>
        )}
        {user && (
          <>
            <span className="text-sm text-lk-text-tertiary">{user.email}</span>
            <Link to="/learn" className="bg-lk-cyan text-void px-5 py-2 rounded-lg text-sm font-bold hover:bg-lk-cyan/90 transition">Go to learn →</Link>
          </>
        )}
      </div>
    </nav>
  );
}
