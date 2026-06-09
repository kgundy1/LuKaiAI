import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../lib/AuthContext';

export default function Nav() {
  const { user, loading, logout } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const prevOpenRef = useRef(false);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + '/');

  const linkBase = 'text-sm transition-colors duration-200';
  const linkInactive = 'text-lk-text-tertiary hover:text-lk-text-primary';
  const linkActive = 'text-lk-text-primary';
  const linkCls = (path: string) =>
    `${linkBase} ${isActive(path) ? linkActive : linkInactive}`;

  const drawerLink =
    'block py-3 text-base text-lk-text-secondary hover:text-lk-text-primary transition-colors duration-200';

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body scroll lock while drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC closes the drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Inert toggle for backdrop + panel when closed (keeps off-screen
  // links out of the tab order without needing a focus trap).
  // Set via DOM API because @types/react 18.3.3 doesn't expose `inert`.
  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (open) {
      panel?.removeAttribute('inert');
      backdrop?.removeAttribute('inert');
    } else {
      panel?.setAttribute('inert', '');
      backdrop?.setAttribute('inert', '');
    }
  }, [open]);

  // Focus management: first link on open, hamburger on close
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      const first = panelRef.current?.querySelector<HTMLElement>('a, button');
      first?.focus();
    } else if (!open && prevOpenRef.current) {
      hamburgerRef.current?.focus();
    }
    prevOpenRef.current = open;
  }, [open]);

  return (
    <>
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
              <Link to="/method" className={linkCls('/method')}>The method</Link>
              <Link to="/#how" className={`${linkBase} ${linkInactive}`}>How it works</Link>
              <Link to="/#cost" className={`${linkBase} ${linkInactive}`}>Is it free?</Link>
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
              <Link to="/method" className={linkCls('/method')}>The method</Link>
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

        <button
          ref={hamburgerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-lk-text-secondary hover:text-lk-text-primary transition-colors duration-200"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </nav>

      <div
        ref={backdropRef}
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`md:hidden fixed left-0 right-0 top-16 bottom-0 bg-void/60 backdrop-blur-sm z-30 motion-safe:transition-opacity motion-safe:duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <nav
        ref={panelRef}
        id="mobile-menu"
        aria-label="Mobile menu"
        aria-hidden={!open}
        className={`md:hidden fixed top-16 right-0 bottom-0 w-64 bg-void border-l border-white/[0.07] z-40 p-6 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {(!user || loading) && (
          <div className="flex flex-col h-full">
            <div className="flex flex-col">
              <Link to="/projects" className={drawerLink}>Projects</Link>
              <Link to="/method" className={drawerLink}>The method</Link>
              <Link to="/#how" className={drawerLink}>How it works</Link>
              <Link to="/#cost" className={drawerLink}>Is it free?</Link>
              <Link to="/login" className={drawerLink}>Log in</Link>
            </div>
            <Link
              to="/signup"
              className="mt-auto bg-lk-cyan text-void px-5 py-3 rounded-lg text-base font-bold text-center hover:bg-lk-cyan/90 transition-colors duration-200"
            >
              Sign up →
            </Link>
          </div>
        )}
        {user && !loading && (
          <div className="flex flex-col h-full">
            <div className="flex flex-col">
              <Link to="/projects" className={drawerLink}>Projects</Link>
              <Link to="/method" className={drawerLink}>The method</Link>
              <Link to="/learn" className={drawerLink}>Learn</Link>
            </div>
            <div className="mt-auto">
              <div className="font-mono text-[10px] tracking-widest uppercase text-lk-text-tertiary mb-2">
                Signed in as
              </div>
              <div className="text-sm text-lk-text-secondary break-all mb-4">
                {user.email}
              </div>
              <div className="border-t border-white/[0.07] pt-4">
                <button
                  type="button"
                  onClick={() => { void logout(); }}
                  className="text-base text-lk-text-secondary hover:text-lk-text-primary transition-colors duration-200"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
