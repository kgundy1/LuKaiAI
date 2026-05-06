import { useState, useRef } from 'react';
import { subscribe } from '../lib/api';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function EmailCapture() {
  const [state, setState] = useState<FormState>('idle');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState('your@email.com');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inputRef.current) return;
    const email = inputRef.current.value;
    setState('loading');
    try {
      await subscribe(email);
      setState('success');
      setInputDisabled(true);
      setPlaceholder('Check your inbox.');
      if (inputRef.current) inputRef.current.value = '';
      setTimeout(() => {
        setState('idle');
        setInputDisabled(false);
        setPlaceholder('your@email.com');
      }, 5000);
    } catch {
      setState('error');
    }
  }

  const btnText =
    state === 'loading' ? 'Sending…' :
    state === 'success' ? "You're in ✓" :
    "I'm ready →";

  return (
    <section
      id="access"
      className="email-glow py-[140px] px-12 max-[960px]:px-6 text-center relative overflow-hidden"
    >
      <div className="relative z-[1] max-w-[560px] mx-auto">
        <div className="eyebrow center reveal">Get access</div>

        <h2 className="reveal d1 font-serif text-[clamp(40px,5.5vw,66px)] font-normal tracking-[-0.025em] leading-[1.05] mb-5">
          Your idea.<br />
          <span className="text-grad">Your build.</span><br />
          <em className="italic">Your timeline.</em>
        </h2>

        <p className="reveal d2 text-[17px] text-lk-text-secondary font-light leading-[1.75] mb-2">
          The workflow exists. The proof exists.{' '}
          <strong className="text-lk-text-primary font-semibold">
            The only thing missing is you starting.
          </strong>
        </p>

        <p className="reveal d3 font-serif italic text-[15px] text-lk-gold opacity-80 mb-12">
          — Named for Lucas &amp; Kailer. Built for everyone.
        </p>

        <form className="reveal d3 em-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="email"
            className="em-input"
            placeholder={placeholder}
            required
            autoComplete="email"
            disabled={inputDisabled}
          />
          <button
            type="submit"
            disabled={state === 'loading' || state === 'success'}
            className={`em-btn${state === 'success' ? ' success' : ''}`}
          >
            {btnText}
          </button>
        </form>

        {state === 'error' && (
          <p className="text-lk-red text-[0.85rem] text-center mt-2">
            Something went wrong — try again.
          </p>
        )}

        <p className="reveal d4 text-[12px] text-lk-text-dim">
          No pitch. No pressure. Just the workflow.
        </p>
      </div>
    </section>
  );
}
