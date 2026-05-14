// Lesson view — reads from window.MODULE_LESSONS, renders prose + widgets,
// includes lesson sidebar, progress, and prev/next pagination.

function MiniMarkdown({ children }) {
  const lines = children.split('\n');
  const out = [];
  let para = [];
  let listBuf = null;

  const flushPara = () => { if (para.length) { out.push(<p key={out.length}>{paraText(para.join(' '))}</p>); para = []; } };
  const flushList = () => { if (listBuf) { out.push(<ul key={out.length}>{listBuf.map((t,i)=><li key={i}>{paraText(t)}</li>)}</ul>); listBuf = null; } };

  for (const line of lines) {
    if (line.startsWith('## ')) { flushPara(); flushList(); out.push(<h2 key={out.length}>{line.slice(3)}</h2>); continue; }
    if (line.startsWith('### ')) { flushPara(); flushList(); out.push(<h3 key={out.length}>{line.slice(4)}</h3>); continue; }
    if (line.startsWith('> ')) { flushPara(); flushList(); out.push(<blockquote key={out.length}>{paraText(line.slice(2))}</blockquote>); continue; }
    if (line.startsWith('- ')) { flushPara(); (listBuf = listBuf || []).push(line.slice(2)); continue; }
    if (line.trim() === '') { flushPara(); flushList(); continue; }
    para.push(line);
  }
  flushPara(); flushList();
  return <>{out}</>;
}

function paraText(s) {
  const parts = [];
  let i = 0, key = 0;
  while (i < s.length) {
    if (s.startsWith('**', i)) {
      const end = s.indexOf('**', i + 2);
      if (end > i) { parts.push(<strong key={key++}>{s.slice(i+2, end)}</strong>); i = end + 2; continue; }
    }
    if (s[i] === '`') {
      const end = s.indexOf('`', i + 1);
      if (end > i) { parts.push(<code key={key++}>{s.slice(i+1, end)}</code>); i = end + 1; continue; }
    }
    if (s[i] === '*') {
      const end = s.indexOf('*', i + 1);
      if (end > i && s[i+1] !== ' ') { parts.push(<em key={key++}>{s.slice(i+1, end)}</em>); i = end + 1; continue; }
    }
    let next = s.length;
    for (const m of ['**', '`', '*']) { const idx = s.indexOf(m, i); if (idx >= 0 && idx < next) next = idx; }
    parts.push(s.slice(i, next));
    i = next;
  }
  return parts;
}

function renderBlock(block, i) {
  if (block.type === 'prose') {
    return <article className="prose" key={i}><MiniMarkdown>{block.md}</MiniMarkdown></article>;
  }
  if (block.type === 'stub') {
    return (
      <div key={i} style={{ padding: '20px 24px', background: 'var(--card)', border: '1px dashed var(--border2)', borderRadius: 12, margin: '24px 0', display: 'flex', gap: 14, alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--gold)', textTransform: 'uppercase' }}>DRAFT</span>
        <span style={{ fontSize: 13, color: 'var(--tt)' }}>Founder fills in the rest of this lesson here.</span>
      </div>
    );
  }
  const Cmp = window[block.kind];
  if (!Cmp) return <div key={i} style={{ color: 'var(--red)' }}>Missing widget: {block.kind}</div>;
  return <Cmp key={i} {...(block.props || {})} />;
}

function LessonSidebar({ moduleNum, moduleData, currentLesson, completedLessons, onJump }) {
  // Review mode: every lesson is unlocked so the user can flip freely between them.
  return (
    <aside className="lesson-side">
      <div className="lesson-side-eyebrow">Module {String(moduleNum).padStart(2, '0')}</div>
      <div className="lesson-side-title">{moduleData.title}</div>
      <div className="lesson-side-progress">
        <div className="bar"><div className="fill" style={{ width: (completedLessons.size / moduleData.lessons.length) * 100 + '%' }} /></div>
        <div className="count">{completedLessons.size}/{moduleData.lessons.length}</div>
      </div>
      <ul className="lesson-side-list">
        {moduleData.lessons.map(l => {
          const isCurrent = l.num === currentLesson;
          const isDone = completedLessons.has(l.num);
          return (
            <li key={l.num}>
              <button
                className={'lesson-side-item' + (isCurrent ? ' current' : '') + (isDone ? ' done' : '')}
                onClick={() => onJump(l.num)}
              >
                <span className="lesson-side-num">{isDone ? '✓' : String(l.num).padStart(2, '0')}</span>
                <span className="lesson-side-label">{l.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function LessonView({ navigate, moduleNum, lessonNum, completedLessons, onComplete }) {
  const moduleData = window.MODULE_LESSONS[moduleNum];
  if (!moduleData) return <div style={{ padding: 80, color: 'var(--tt)' }}>Module not found.</div>;
  const lesson = moduleData.lessons.find(l => l.num === lessonNum);
  if (!lesson) return <div style={{ padding: 80, color: 'var(--tt)' }}>Lesson not found.</div>;

  const lessonsList = moduleData.lessons;
  const idx = lessonsList.findIndex(l => l.num === lessonNum);
  const prev = idx > 0 ? lessonsList[idx - 1] : null;
  const next = idx < lessonsList.length - 1 ? lessonsList[idx + 1] : null;
  // If this is the last lesson of the module, see if a next module exists.
  const nextModuleNum = !next && window.MODULE_LESSONS[moduleNum + 1] ? moduleNum + 1 : null;
  const nextModuleData = nextModuleNum ? window.MODULE_LESSONS[nextModuleNum] : null;
  const completed = completedLessons.has(lessonNum);

  function handleComplete() { onComplete(lessonNum); }
  function jump(num) { navigate('lesson', { module: moduleNum, lesson: num }); }
  function jumpModule(m, l) { navigate('lesson', { module: m, lesson: l }); }

  return (
    <div className="lesson-layout">
      <LessonSidebar
        moduleNum={moduleNum}
        moduleData={moduleData}
        currentLesson={lessonNum}
        completedLessons={completedLessons}
        onJump={jump}
      />

      <main>
        <a onClick={() => navigate('learn')} style={{ color: 'var(--tt)', fontSize: 13, cursor: 'pointer', textDecoration: 'none' }}>← All modules</a>

        <div style={{ marginTop: 18, marginBottom: 10, color: 'var(--cyan)', fontSize: 11, fontFamily: 'var(--mono)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Lesson {lessonNum} of {lessonsList.length} · {lesson.time}
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 40, color: 'var(--tp)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 48, maxWidth: 620 }}>
          {lesson.title}
        </h1>

        {lesson.blocks.map(renderBlock)}

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          {completed ? (
            <div style={{ color: 'var(--green)', fontSize: 14, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✓</span>
              Lesson complete
            </div>
          ) : (
            <button onClick={handleComplete} className="cta-primary" style={{ marginBottom: 24 }}>
              Mark lesson complete →
            </button>
          )}

          <div className="lesson-pager">
            {prev ? (
              <button className="lesson-pager-link prev" onClick={() => jump(prev.num)}>
                <div className="lesson-pager-dir">← Previous lesson</div>
                <div className="lesson-pager-title">{prev.title}</div>
              </button>
            ) : (moduleNum > 0 && window.MODULE_LESSONS[moduleNum - 1]) ? (
              <button className="lesson-pager-link prev" onClick={() => jumpModule(moduleNum - 1, window.MODULE_LESSONS[moduleNum - 1].lessons.slice(-1)[0].num)}>
                <div className="lesson-pager-dir">← Previous module</div>
                <div className="lesson-pager-title">Module {String(moduleNum - 1).padStart(2, '0')} · {window.MODULE_LESSONS[moduleNum - 1].title}</div>
              </button>
            ) : <div style={{ flex: 1 }} />}
            {next ? (
              <button className="lesson-pager-link next" onClick={() => jump(next.num)}>
                <div className="lesson-pager-dir">Next lesson →</div>
                <div className="lesson-pager-title">{next.title}</div>
              </button>
            ) : nextModuleData ? (
              <button className="lesson-pager-link next" onClick={() => jumpModule(nextModuleNum, nextModuleData.lessons[0].num)}>
                <div className="lesson-pager-dir">Next module →</div>
                <div className="lesson-pager-title">Module {String(nextModuleNum).padStart(2, '0')} · {nextModuleData.title}</div>
              </button>
            ) : <div style={{ flex: 1 }} />}
          </div>
        </div>
      </main>
    </div>
  );
}

window.LessonView = LessonView;
window.MiniMarkdown = MiniMarkdown;
