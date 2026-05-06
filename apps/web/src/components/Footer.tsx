export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.07)] px-12 py-11 max-[960px]:px-6">
      <div className="max-w-[1060px] mx-auto flex items-center justify-between flex-wrap gap-5">
        <div>
          <a href="#" className="font-serif text-[20px] tracking-[-0.01em] no-underline">
            <span className="text-lk-gold">Lu</span>
            <span className="text-lk-text-primary">Kai</span>
            <span className="font-mono text-[11px] text-lk-cyan tracking-[0.05em] ml-[2px] align-super">AI</span>
          </a>
          <div className="text-[12px] text-lk-text-dim mt-[3px]">
            Named for Lucas &amp; Kailer · Built for anyone with an idea
          </div>
        </div>

        <ul className="flex gap-7 list-none p-0">
          <li>
            <a href="#story" className="text-[13px] text-lk-text-tertiary no-underline transition-colors duration-200 hover:text-lk-text-primary">
              Story
            </a>
          </li>
          <li>
            <a href="#why" className="text-[13px] text-lk-text-tertiary no-underline transition-colors duration-200 hover:text-lk-text-primary">
              Why it works
            </a>
          </li>
          <li>
            <a href="#access" className="text-[13px] text-lk-text-tertiary no-underline transition-colors duration-200 hover:text-lk-text-primary">
              Get access
            </a>
          </li>
        </ul>

        <div className="text-[12px] text-lk-text-dim">© 2026 LuKaiAI</div>
      </div>
    </footer>
  );
}
