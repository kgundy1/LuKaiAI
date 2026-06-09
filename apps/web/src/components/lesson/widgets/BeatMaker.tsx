import { useCallback, useEffect, useRef, useState } from 'react';

export type BeatMakerPayload = Record<string, never>;

type Key = 'kick' | 'clap' | 'hat' | 'bass';
const STEPS = 16;

const ROWS: { key: Key; label: string; color: string }[] = [
  { key: 'kick', label: 'Kick', color: '#00c8f0' },
  { key: 'clap', label: 'Clap', color: '#8b5cf6' },
  { key: 'hat', label: 'Hats', color: '#c9a84c' },
  { key: 'bass', label: 'Bass', color: '#34d399' },
];

const LAYERS: Record<Key, number[]> = {
  kick: [0, 4, 8, 12],
  clap: [4, 12],
  hat: [2, 6, 10, 14],
  bass: [0, 6, 8, 14],
};

const PRESET: Record<Key, number[]> = {
  kick: [0, 6, 10],
  clap: [8],
  hat: [2, 4, 6, 10, 12, 14],
  bass: [0, 3, 6, 8, 11, 13, 14],
};

const TEACH: { key: Key; title: string; text: string }[] = [
  { key: 'kick', title: 'Start with the kick', text: 'Every beat begins with the kick drum — the heartbeat. Four steady hits, one on each beat. Press play and feel the pulse.' },
  { key: 'clap', title: 'Add the backbeat', text: 'Now a clap on beats 2 and 4 — the “backbeat.” This is the part that makes you nod your head. Hear how it answers the kick.' },
  { key: 'hat', title: 'Drive it with hats', text: 'Hi-hats fill the spaces between, adding the ticking energy that pushes the beat forward. Small sound, huge difference.' },
  { key: 'bass', title: 'The dubstep wobble', text: 'Here’s the signature: a wobble bass. That growl is just a low note with a filter opening and closing fast — and you just built one.' },
];

type Grid = Record<Key, boolean[]>;
function emptyGrid(): Grid {
  return { kick: Array(STEPS).fill(false), clap: Array(STEPS).fill(false), hat: Array(STEPS).fill(false), bass: Array(STEPS).fill(false) };
}
function gridFrom(pattern: Record<Key, number[]>): Grid {
  const g = emptyGrid();
  (Object.keys(pattern) as Key[]).forEach((k) => pattern[k].forEach((i) => { g[k][i] = true; }));
  return g;
}

type Ripple = { x: number; y: number; r: number; max: number; a: number; c: string; lw: number };

export default function BeatMaker(_payload: BeatMakerPayload) {
  const [grid, setGrid] = useState<Grid>(emptyGrid);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [teachOpen, setTeachOpen] = useState(false);
  const [teachIdx, setTeachIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);

  const gridRef = useRef<Grid>(grid);
  gridRef.current = grid;
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cellEls = useRef<Record<Key, (HTMLButtonElement | null)[]>>({ kick: [], clap: [], hat: [], bass: [] });
  const ripples = useRef<Ripple[]>([]);
  const engine = useRef<any>(null);
  const counter = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  // ----- canvas: contained ambient particles + ripples -----
  const spawnRipples = useCallback((s: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cr = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    for (const row of ROWS) {
      if (gridRef.current[row.key][s]) {
        const el = cellEls.current[row.key][s];
        if (!el) continue;
        const b = el.getBoundingClientRect();
        ripples.current.push({
          x: (b.left + b.width / 2 - cr.left) * dpr,
          y: (b.top + b.height / 2 - cr.top) * dpr,
          r: 4 * dpr,
          max: (row.key === 'kick' ? 170 : 90) * dpr,
          a: row.key === 'kick' ? 0.8 : 0.5,
          c: row.color,
          lw: row.key === 'kick' ? 2 : 1.3,
        });
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = ['#00c8f0', '#8b5cf6', '#c9a84c', '#34d399'];
    let parts: { x: number; y: number; r: number; vx: number; vy: number; a: number; c: string }[] = [];

    const seed = () => {
      const w = canvas.width, h = canvas.height;
      parts = Array.from({ length: 34 }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: (Math.random() * 1.4 + 0.4) * dpr,
        vx: (Math.random() - 0.5) * 0.1 * dpr, vy: (Math.random() - 0.5) * 0.1 * dpr,
        a: Math.random() * 0.4 + 0.08, c: colors[Math.floor(Math.random() * 4)],
      }));
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = root.getBoundingClientRect();
      canvas.width = Math.max(1, r.width * dpr);
      canvas.height = Math.max(1, r.height * dpr);
      canvas.style.width = r.width + 'px';
      canvas.style.height = r.height + 'px';
      if (parts.length === 0) seed();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize();
    seed();

    const loop = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.globalAlpha = p.a; ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
      const rs = ripples.current;
      for (let i = rs.length - 1; i >= 0; i--) {
        const r = rs[i];
        r.r += 4 * dpr; r.a *= 0.95;
        if (r.a < 0.02 || r.r > r.max) { rs.splice(i, 1); continue; }
        ctx.globalAlpha = r.a; ctx.strokeStyle = r.c; ctx.lineWidth = r.lw * dpr;
        ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 7); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  // ----- audio -----
  const initAudio = useCallback(async () => {
    if (engine.current || audioFailed) return;
    try {
      const Tone: any = await import('tone');
      await Tone.start();
      const out = new Tone.Gain(0.95).toDestination();
      const verb = new Tone.Reverb({ decay: 1.6, wet: 0.12 }).connect(out);
      const kick = new Tone.MembraneSynth({ pitchDecay: 0.03, octaves: 6, envelope: { attack: 0.001, decay: 0.42, sustain: 0 } }).connect(out);
      kick.volume.value = 4;
      const clapF = new Tone.Filter(1400, 'bandpass').connect(verb);
      const clap = new Tone.NoiseSynth({ noise: { type: 'white' }, envelope: { attack: 0.001, decay: 0.2, sustain: 0 } }).connect(clapF);
      clap.volume.value = -7;
      const hatF = new Tone.Filter(8500, 'highpass').connect(out);
      const hat = new Tone.NoiseSynth({ noise: { type: 'white' }, envelope: { attack: 0.001, decay: 0.045, sustain: 0 } }).connect(hatF);
      hat.volume.value = -16;
      const bassF = new Tone.Filter({ type: 'lowpass', frequency: 240, Q: 9 }).connect(out);
      const bass = new Tone.MonoSynth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.02, decay: 0.2, sustain: 0.95, release: 0.18 } }).connect(bassF);
      bass.volume.value = -9;
      const lfo = new Tone.LFO({ frequency: '8n', min: 130, max: 2400, type: 'sine' }).connect(bassF.frequency);
      lfo.start();

      Tone.Transport.bpm.value = 140;
      const repeatId = Tone.Transport.scheduleRepeat((time: number) => {
        const s = counter.current % STEPS;
        counter.current++;
        const g = gridRef.current;
        if (!mutedRef.current) {
          if (g.kick[s]) kick.triggerAttackRelease('C1', '8n', time);
          if (g.clap[s]) clap.triggerAttackRelease('16n', time);
          if (g.hat[s]) hat.triggerAttackRelease('32n', time);
          if (g.bass[s]) bass.triggerAttackRelease('E1', '8n', time);
        }
        Tone.Draw.schedule(() => { setStep(s); spawnRipples(s); }, time);
      }, '16n');

      engine.current = { Tone, out, verb, kick, clap, hat, bass, lfo, bassF, clapF, hatF, repeatId };
    } catch {
      setAudioFailed(true);
    }
  }, [audioFailed, spawnRipples]);

  useEffect(() => () => {
    const e = engine.current;
    if (!e) return;
    try {
      e.Tone.Transport.stop();
      e.Tone.Transport.clear(e.repeatId);
      e.lfo.stop();
      [e.kick, e.clap, e.hat, e.bass, e.lfo, e.bassF, e.clapF, e.hatF, e.verb, e.out].forEach((n: any) => n && n.dispose && n.dispose());
    } catch { /* noop */ }
    engine.current = null;
  }, []);

  // ----- actions -----
  const setPlay = useCallback(async (on: boolean) => {
    await initAudio();
    const e = engine.current;
    setPlaying(on);
    if (!e) return;
    if (on) { if (e.Tone.Transport.state !== 'started') e.Tone.Transport.start(); }
    else { e.Tone.Transport.pause(); setStep(-1); }
  }, [initAudio]);

  const toggle = (key: Key, c: number) =>
    setGrid((g) => ({ ...g, [key]: g[key].map((v, i) => (i === c ? !v : v)) }));

  const clearAll = () => setGrid(emptyGrid());

  const surprise = async () => { setGrid(gridFrom(PRESET)); await setPlay(true); };

  const startTeach = async () => {
    setGrid({ ...emptyGrid(), kick: Array(STEPS).fill(false).map((_, i) => LAYERS.kick.includes(i)) });
    setTeachIdx(0);
    setTeachOpen(true);
    await setPlay(true);
  };
  const teachNext = () => {
    if (teachIdx < TEACH.length - 1) {
      const ni = teachIdx + 1;
      const k = TEACH[ni].key;
      setGrid((g) => ({ ...g, [k]: Array(STEPS).fill(false).map((_, i) => LAYERS[k].includes(i)) }));
      setTeachIdx(ni);
    } else {
      setTeachOpen(false);
    }
  };
  const teachSkip = () => { setGrid(gridFrom(LAYERS)); setTeachOpen(false); };

  const btnBase = 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold cursor-pointer transition border';

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card p-5 sm:p-6"
      style={{ opacity: mounted ? 1 : 0, transition: 'opacity .5s' }}
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />
      <div className="relative z-10">
        <p className="font-serif text-2xl text-lk-text-primary">Your Beat Maker</p>
        <p className="font-mono text-[11px] tracking-wide text-lk-text-tertiary mb-5">140 BPM · tap any square · press play</p>

        <div className="flex flex-col gap-1.5">
          {ROWS.map((row) => (
            <div key={row.key} className="grid items-center gap-1.5" style={{ gridTemplateColumns: '46px repeat(16, 1fr)' }}>
              <div className="font-mono text-[9.5px] uppercase tracking-wide text-right pr-1.5" style={{ color: row.color }}>{row.label}</div>
              {Array.from({ length: STEPS }).map((_, c) => {
                const on = grid[row.key][c];
                const ph = step === c;
                return (
                  <button
                    key={c}
                    ref={(el) => { cellEls.current[row.key][c] = el; }}
                    onClick={() => toggle(row.key, c)}
                    aria-label={`${row.label} step ${c + 1}`}
                    className="aspect-square rounded-[5px] border transition-transform duration-100"
                    style={{
                      borderColor: on ? row.color : (c % 4 === 0 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'),
                      background: on ? row.color : 'rgba(255,255,255,0.03)',
                      boxShadow: on ? (ph ? `0 0 22px 2px ${row.color}` : `0 0 10px -1px ${row.color}`) : (ph ? 'inset 0 0 0 1.5px rgba(255,255,255,0.35)' : 'none'),
                      transform: on && ph ? 'scale(1.18)' : 'scale(1)',
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
          <button
            onClick={() => setPlay(!playing)}
            className={btnBase}
            style={playing
              ? { background: '#00c8f0', color: '#06070a', borderColor: '#00c8f0' }
              : { background: 'rgba(0,200,240,0.1)', color: '#00c8f0', borderColor: 'rgba(0,200,240,0.4)' }}
          >
            {playing ? '⏸ Pause' : '▶ Play'}
          </button>
          <button onClick={startTeach} className={btnBase} style={{ background: 'rgba(139,92,246,0.12)', color: '#b794ff', borderColor: 'rgba(139,92,246,0.45)' }}>
            🎧 Teach me a beat
          </button>
          <button onClick={surprise} className={btnBase} style={{ background: 'none', color: '#7a8299', borderColor: 'rgba(255,255,255,0.14)' }}>⚡ Surprise me</button>
          <button onClick={clearAll} className={btnBase} style={{ background: 'none', color: '#7a8299', borderColor: 'rgba(255,255,255,0.14)' }}>Clear</button>
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label="Toggle sound"
            className="rounded-full w-[42px] h-[42px] cursor-pointer transition border border-white/[0.14] text-lk-text-tertiary hover:text-lk-text-primary"
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>

        {teachOpen && (
          <div className="mt-5 rounded-2xl border p-5 text-left" style={{ background: 'linear-gradient(180deg,rgba(139,92,246,0.1),rgba(139,92,246,0.03))', borderColor: 'rgba(139,92,246,0.35)' }}>
            <div className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: '#b794ff' }}>Layer {teachIdx + 1} of {TEACH.length}</div>
            <div className="font-serif text-xl text-lk-text-primary mb-1.5">{TEACH[teachIdx].title}</div>
            <div className="text-sm text-lk-text-secondary leading-relaxed">{TEACH[teachIdx].text}</div>
            <div className="flex items-center justify-between gap-3 mt-4">
              <button onClick={teachSkip} className="bg-transparent border-none text-lk-text-tertiary text-xs cursor-pointer">skip lesson</button>
              <button onClick={teachNext} className="rounded-lg px-4 py-2 text-xs font-bold cursor-pointer text-white border-none" style={{ background: '#8b5cf6' }}>
                {teachIdx < TEACH.length - 1 ? 'Next ▸' : 'Done — let me play'}
              </button>
            </div>
          </div>
        )}

        {audioFailed && (
          <p className="mt-4 text-xs italic text-lk-text-dim text-center">Sound is blocked in this browser — the beat still moves visually. Try tapping play again or unmuting your device.</p>
        )}
      </div>
    </div>
  );
}
