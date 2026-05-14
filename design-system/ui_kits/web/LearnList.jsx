// LearnList — shows all 7 modules (0-6) with per-module progress.
// For demo / review purposes every module is available — user can flip through any lesson.

function LearnList({ navigate, completedLessons }) {
  // Auto-build module list from MODULE_LESSONS keys.
  const allModules = Object.keys(window.MODULE_LESSONS || {})
    .map(n => parseInt(n, 10))
    .sort((a, b) => a - b);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--void)' }}>
      <div style={{ paddingTop: 128, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, maxWidth: 960, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>— The workflow</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 48, color: 'var(--tp)', fontWeight: 400, marginBottom: 12, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
          Welcome to <span style={{ whiteSpace: 'nowrap' }}><Wordmark size="lg" /></span>
        </h1>
        <p style={{ color: 'var(--ts)', fontSize: 17, fontWeight: 300, marginBottom: 56, maxWidth: 580 }}>
          Seven units. Module 0 sets you up; Modules 1–6 build, deploy, and sustain your idea. Build at your pace.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {allModules.map((num) => {
            const data = window.MODULE_LESSONS[num];
            if (!data) return null;
            const total = data.lessons.length;
            const moduleCompletions = completedLessons[num] || new Set();
            const done = data.lessons.filter(l => moduleCompletions.has(l.num)).length;
            const pct = total ? (done / total) * 100 : 0;

            return (
              <div
                key={num}
                className="mod-row available"
                onClick={() => navigate('lesson', { module: num, lesson: 1 })}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--cyan)', paddingTop: 4 }}>
                    MODULE {String(num).padStart(2, '0')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--tp)', marginBottom: 6, lineHeight: 1.3 }}>{data.title}</div>
                    {data.description && <div style={{ fontSize: 13, color: 'var(--tt)', lineHeight: 1.55 }}>{data.description}</div>}
                    {total > 0 && (
                      <div className="mod-progress">
                        <div className="mod-progress-bar"><div className="mod-progress-fill" style={{ width: pct + '%' }} /></div>
                        <div className="mod-progress-text">{done} of {total} lessons complete</div>
                      </div>
                    )}
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, paddingTop: 4, color: 'var(--cyan)' }}>
                    {done === total && total > 0 ? 'REVIEW →' : (done > 0 ? 'CONTINUE →' : 'START →')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: 56, fontSize: 12, color: 'var(--td)', fontFamily: 'var(--mono)', letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center' }}>
          Review mode · all modules unlocked for preview
        </p>
      </div>
    </div>
  );
}

window.LearnList = LearnList;
