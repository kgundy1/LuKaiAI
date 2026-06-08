import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-[rgba(255,255,255,0.07)] px-12 py-11 max-[960px]:px-6">
      <div className="max-w-[1060px] mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div>
            <Link to="/" className="font-serif text-[20px] tracking-[-0.01em] no-underline">
              <span className="text-lk-gold">Lu</span>
              <span className="text-lk-text-primary">Kai</span>
              <span className="font-mono text-[11px] text-lk-cyan tracking-[0.05em] ml-[2px] align-super">AI</span>
            </Link>
            <div className="text-[12px] text-lk-text-dim mt-[3px]">
              Named for Lucas &amp; Kailer · Built for anyone with an idea
            </div>
          </div>

          <ul className="flex gap-7 list-none p-0">
            <li>
              <Link to="/#how" className="text-[13px] text-lk-text-tertiary no-underline transition-colors duration-200 hover:text-lk-text-primary">
                How it works
              </Link>
            </li>
            <li>
              <Link to="/#cost" className="text-[13px] text-lk-text-tertiary no-underline transition-colors duration-200 hover:text-lk-text-primary">
                Is it free?
              </Link>
            </li>
            <li>
              <Link to="/#access" className="text-[13px] text-lk-text-tertiary no-underline transition-colors duration-200 hover:text-lk-text-primary">
                Get access
              </Link>
            </li>
          </ul>

          <div className="text-[12px] text-lk-text-dim">© 2026 LuKaiAI</div>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.07)] flex items-start justify-between gap-5 max-[640px]:flex-col max-[640px]:items-center max-[640px]:text-center">
          <div>
            <div className="text-[12px] text-lk-text-dim">© 2026 LuKaiAI. All rights reserved.</div>
            <div className="text-[12px] text-lk-text-dim mt-[3px] max-w-[520px] leading-[1.6]">
              Educational content only — no professional advice and no guarantee of any outcome;
              results depend on the effort you put in. Cost comparisons are illustrative estimates,
              not guarantees. LuKaiAI is independent and is not affiliated with, endorsed by, or
              sponsored by Anthropic. Claude is a trademark of Anthropic, PBC.
            </div>
          </div>

          <div className="text-[13px] text-lk-text-tertiary">
            <Link to="/projects" className="no-underline transition-colors duration-200 hover:text-lk-text-primary">
              Projects
            </Link>
            <span className="mx-2 text-lk-text-dim">·</span>
            <Link to="/terms" className="no-underline transition-colors duration-200 hover:text-lk-text-primary">
              Terms
            </Link>
            <span className="mx-2 text-lk-text-dim">·</span>
            <Link to="/privacy" className="no-underline transition-colors duration-200 hover:text-lk-text-primary">
              Privacy
            </Link>
            <span className="mx-2 text-lk-text-dim">·</span>
            <a href="mailto:contact@lukaiai.com" className="no-underline transition-colors duration-200 hover:text-lk-text-primary">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
