import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

export default function Nav() {
  const { user, loading, logout } = useAuth();
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + '/');

  const linkBase = 'text-sm transition-colors duration-200';
  const linkInactive = 'text-lk-text-tertiary hover:text-lk-text-primary';
  const linkActive = 'text-lk-text-primary';
  const linkCls = (path: string) =>
    `${linkBase} ${isActive(path) ? linkActive : linkInactive}`;

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-12 max-[960px]:px-6 bg-void/80 backdrop-blur-xl border-b border-white/[0.07] z-50"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-lk-cyan focus:text-void focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Skip to content
      </a>

      <Link to={user ? '/learn' : '/'} className="font-serif text-2xl" aria-label="LuKaiAI home">
        <span className="text-lk-gold">Lu</span>
        <span className="text-lk-text-primary">Kai</span>
        <span className="text-lk-cyan font-mono text-xs align-super ml-1">AI</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {(!user || loading) && (
          <>
            <Link to="/projects" className={linkCls('/projects')}>Projects</Link>
            <Link to="/#story" className={`${linkBase} ${linkInactive}`}>The story</Link>
            <Link to="/#why" className={`${linkBase} ${linkInactive}`}>Why it works</Link>
            <Link to="/login" className={linkCls('/login')}>Log in</Link>
            <Link
              to="/signup"
              className="bg-lk-cyan text-void px-5 py-2 rounded-lg text-sm font-bold hover:bg-lk-cyan/90 transition-colors duration-200"
            >
              Sign up →
            </Link>
          </>
        )}
        {user && !loading && (
          <>
            <Link to="/projects" className={linkCls('/projects')}>Projects</Link>
            <Link to="/learn" className={linkCls('/learn')}>Learn</Link>
            <span
              className="text-sm text-lk-text-tertiary max-w-[180px] truncate"
              title={user.email}
              aria-label="Signed in as"
            >
              {user.email}
            </span>
            <button
              type="button"
              onClick={() => { void logout(); }}
              className="text-sm text-lk-text-tertiary hover:text-lk-text-primary transition-colors duration-200"
            >
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
