// Top-level App — 7 modules, per-module completion tracking, and a Tweaks panel
// for jumping around the demo without clicking through.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "startView": "landing",
  "jumpModule": "1",
  "jumpLesson": "1",
  "allComplete": false,
  "accent": "#00c8f0",
  "density": "regular"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = React.useState(t.startView || 'landing');
  const [user, setUser] = React.useState(t.startView !== 'landing' && t.startView !== 'signup' && t.startView !== 'login' ? { email: 'demo@lukai.ai' } : null);
  const [lessonCtx, setLessonCtx] = React.useState({ module: parseInt(t.jumpModule, 10) || 1, lesson: parseInt(t.jumpLesson, 10) || 1 });
  const [completedLessons, setCompletedLessons] = React.useState({});

  // ── Apply tweak-driven side effects ──────────────────────────────
  // Whenever the user picks a different module/lesson from Tweaks, jump to it.
  const lastJump = React.useRef({ m: t.jumpModule, l: t.jumpLesson });
  React.useEffect(() => {
    if (lastJump.current.m !== t.jumpModule || lastJump.current.l !== t.jumpLesson) {
      lastJump.current = { m: t.jumpModule, l: t.jumpLesson };
      const m = parseInt(t.jumpModule, 10);
      const l = parseInt(t.jumpLesson, 10);
      setLessonCtx({ module: m, lesson: l });
      setView('lesson');
      setUser(u => u || { email: 'demo@lukai.ai' });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [t.jumpModule, t.jumpLesson]);

  // "Mark all lessons complete" toggle — fills the progress bars for screenshots.
  React.useEffect(() => {
    if (t.allComplete) {
      const next = {};
      for (const mn of Object.keys(window.MODULE_LESSONS || {})) {
        next[mn] = new Set(window.MODULE_LESSONS[mn].lessons.map(l => l.num));
      }
      setCompletedLessons(next);
    } else {
      setCompletedLessons({});
    }
  }, [t.allComplete]);

  // Apply accent color + density tweaks at the document level.
  React.useEffect(() => {
    document.documentElement.style.setProperty('--cyan', t.accent || '#00c8f0');
  }, [t.accent]);
  React.useEffect(() => {
    document.body.style.fontSize = ({ compact: '14px', regular: '16px', comfy: '17px' })[t.density] || '16px';
  }, [t.density]);

  function navigate(v, opts) {
    setView(v);
    if (v === 'lesson' && opts) {
      setLessonCtx({ module: opts.module, lesson: opts.lesson });
      // sync the tweak picker so Tweaks reflects current page
      setTweak({ jumpModule: String(opts.module), jumpLesson: String(opts.lesson) });
      lastJump.current = { m: String(opts.module), l: String(opts.lesson) };
    }
    if (opts && opts.hash) {
      setTimeout(() => { const el = document.querySelector(opts.hash); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  function login(u) { setUser(u); }
  function logout() { setUser(null); navigate('landing'); }
  function completeLesson(moduleNum, lessonNum) {
    setCompletedLessons(prev => {
      const next = { ...prev };
      const set = new Set(next[moduleNum] || []);
      set.add(lessonNum);
      next[moduleNum] = set;
      return next;
    });
  }

  const modules = Object.keys(window.MODULE_LESSONS || {}).map(n => parseInt(n, 10)).sort((a, b) => a - b);
  const currentModule = parseInt(t.jumpModule, 10);
  const currentModuleData = window.MODULE_LESSONS?.[currentModule];

  return (
    <>
      {view !== 'login' && view !== 'signup' && (
        <Nav view={view} user={user} navigate={navigate} logout={logout} />
      )}

      {view === 'landing' && (<><Hero navigate={navigate} /><Story /><FrustrationGrid /><BigReceipt /><EmailCapture /><Footer /></>)}
      {view === 'login'  && <AuthForm mode="login"  navigate={navigate} login={login} />}
      {view === 'signup' && <AuthForm mode="signup" navigate={navigate} login={login} />}
      {view === 'learn'  && <LearnList navigate={navigate} completedLessons={completedLessons} />}
      {view === 'lesson' && (
        <LessonView
          navigate={navigate}
          moduleNum={lessonCtx.module}
          lessonNum={lessonCtx.lesson}
          completedLessons={completedLessons[lessonCtx.module] || new Set()}
          onComplete={(num) => completeLesson(lessonCtx.module, num)}
        />
      )}

      <TweaksPanel>
        <TweakSection label="Quick nav" />
        <TweakSelect
          label="Module"
          value={t.jumpModule}
          options={modules.map(m => ({ value: String(m), label: `Module ${String(m).padStart(2, '0')} · ${window.MODULE_LESSONS[m].title}` }))}
          onChange={(v) => setTweak({ jumpModule: v, jumpLesson: '1' })}
        />
        <TweakSelect
          label="Lesson"
          value={t.jumpLesson}
          options={(currentModuleData?.lessons || []).map(l => ({ value: String(l.num), label: `${l.num}. ${l.title}` }))}
          onChange={(v) => setTweak('jumpLesson', v)}
        />
        <TweakRadio
          label="Start view"
          value={view === 'lesson' ? 'lesson' : view}
          options={['landing', 'learn', 'lesson']}
          onChange={(v) => { setTweak('startView', v); if (v === 'landing') { setUser(null); navigate('landing'); } else if (v === 'learn') { setUser({ email: 'demo@lukai.ai' }); navigate('learn'); } else { setUser({ email: 'demo@lukai.ai' }); navigate('lesson', { module: parseInt(t.jumpModule,10), lesson: parseInt(t.jumpLesson,10) }); } }}
        />

        <TweakSection label="Demo state" />
        <TweakToggle
          label="All lessons complete"
          value={t.allComplete}
          onChange={(v) => setTweak('allComplete', v)}
        />
        <TweakButton label="Reset progress" secondary onClick={() => { setCompletedLessons({}); setTweak('allComplete', false); }} />

        <TweakSection label="Theme" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={['#00c8f0', '#8b5cf6', '#c9a84c', '#34d399']}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)}
        />
      </TweaksPanel>
    </>
  );
}

window.App = App;

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
