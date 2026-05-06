export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[60px] flex items-center justify-between px-12 max-[960px]:px-6 bg-[rgba(6,7,10,0.82)] backdrop-blur-[20px] border-b border-white/[0.07] z-[800]">
      <a href="#" className="font-serif text-[22px] tracking-[-0.01em] no-underline">
        <span className="text-lk-gold">Lu</span>
        <span className="text-lk-text-primary">Kai</span>
        <span className="font-mono text-[11px] text-lk-cyan tracking-[0.05em] ml-[2px] align-super">AI</span>
      </a>
      <div className="flex items-center gap-7">
        <a
          href="#story"
          className="max-[960px]:hidden text-[13px] font-medium text-lk-text-tertiary no-underline transition-colors duration-200 hover:text-lk-text-primary"
        >
          The story
        </a>
        <a
          href="#why"
          className="max-[960px]:hidden text-[13px] font-medium text-lk-text-tertiary no-underline transition-colors duration-200 hover:text-lk-text-primary"
        >
          Why it works
        </a>
        <a
          href="#access"
          className="text-[13px] font-bold text-void bg-lk-cyan px-[18px] py-2 rounded-[7px] no-underline transition-all duration-200 tracking-[0.02em] hover:bg-[#22d3f0] hover:shadow-[0_0_18px_rgba(0,200,240,0.2)]"
        >
          Get access →
        </a>
      </div>
    </nav>
  );
}
