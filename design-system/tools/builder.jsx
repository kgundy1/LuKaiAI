// LuKaiAI Lesson Builder
// A two-pane authoring tool. Left: edit a lesson as a blocks array.
// Right: live preview using the kit's actual lesson widgets.
// Export: copy-paste-able JS code ready to drop into lessons.jsx.

// ─── Mini markdown renderer (mirrors LessonView's) ───────────────────
function MiniMarkdown({ children }) {
  const lines = (children || '').split('\n');
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
  const parts = []; let i = 0, key = 0;
  while (i < s.length) {
    if (s.startsWith('**', i)) { const end = s.indexOf('**', i + 2); if (end > i) { parts.push(<strong key={key++}>{s.slice(i+2, end)}</strong>); i = end + 2; continue; } }
    if (s[i] === '`') { const end = s.indexOf('`', i + 1); if (end > i) { parts.push(<code key={key++}>{s.slice(i+1, end)}</code>); i = end + 1; continue; } }
    if (s[i] === '*') { const end = s.indexOf('*', i + 1); if (end > i && s[i+1] !== ' ') { parts.push(<em key={key++}>{s.slice(i+1, end)}</em>); i = end + 1; continue; } }
    let next = s.length;
    for (const m of ['**', '`', '*']) { const idx = s.indexOf(m, i); if (idx >= 0 && idx < next) next = idx; }
    parts.push(s.slice(i, next));
    i = next;
  }
  return parts;
}

// ─── Defaults for each block type ────────────────────────────────────
const BLOCK_DEFAULTS = {
  prose: () => ({ type: 'prose', md: 'Write your section here. Use **bold**, *italic*, `code`, `## headings`, `- bullets`, and `> blockquotes`.' }),
  QuickCheck: () => ({ type: 'widget', kind: 'QuickCheck', props: {
    question: 'Your question here?',
    choices: ['A first option', 'A second option', 'A third option'],
    correctIndex: 1,
    explain: 'A one-sentence explanation that lands the point.'
  }}),
  WorkflowSorter: () => ({ type: 'widget', kind: 'WorkflowSorter', props: {
    bucketLeft:  { id: 'left',  label: 'Left' },
    bucketRight: { id: 'right', label: 'Right' },
    tasks: [
      { id: 't1', label: 'Something that goes left',  answer: 'left',  why: 'Why it goes left.' },
      { id: 't2', label: 'Something that goes right', answer: 'right', why: 'Why it goes right.' },
    ]
  }}),
  PromptCompare: () => ({ type: 'widget', kind: 'PromptCompare' }),
  TryWithClaude: () => ({ type: 'widget', kind: 'TryWithClaude', props: {
    placeholder: 'Write your draft here...',
    systemPrompt: 'You are a writing coach. Critique the following draft in three sentences. Be specific, useful, and not flattering.'
  }}),
  DecisionTree: () => ({ type: 'widget', kind: 'DecisionTree' }),
  stub: () => ({ type: 'stub' }),
};

const BLOCK_LABEL = {
  prose: 'Prose',
  stub: 'Draft placeholder',
  QuickCheck: 'Quick check',
  WorkflowSorter: 'Sort items',
  PromptCompare: 'Vague vs precise',
  TryWithClaude: 'Try with Claude',
  DecisionTree: 'Branching scenario',
};

function blockKindOf(b) {
  if (b.type === 'prose') return 'prose';
  if (b.type === 'stub') return 'stub';
  return b.kind;
}

// ─── Block editors ──────────────────────────────────────────────────
function ProseEditor({ block, onChange }) {
  return (
    <div className="lb-block-body">
      <textarea
        className="lb-input mono"
        rows={8}
        value={block.md}
        onChange={(e) => onChange({ ...block, md: e.target.value })}
      />
      <div className="lb-block-helptext">
        Markdown: <code>**bold**</code> · <code>*italic*</code> · <code>`code`</code> · <code>## H2</code> · <code>### H3</code> · <code>- bullet</code> · <code>&gt; blockquote</code>
      </div>
    </div>
  );
}

function QuickCheckEditor({ block, onChange }) {
  const p = block.props;
  const upd = (patch) => onChange({ ...block, props: { ...p, ...patch } });

  function setChoice(i, val) { const next = [...p.choices]; next[i] = val; upd({ choices: next }); }
  function addChoice() { upd({ choices: [...p.choices, 'A new option'] }); }
  function removeChoice(i) {
    if (p.choices.length <= 2) return;
    const next = p.choices.filter((_, idx) => idx !== i);
    const newCorrect = p.correctIndex >= next.length ? 0 : (p.correctIndex > i ? p.correctIndex - 1 : p.correctIndex);
    upd({ choices: next, correctIndex: newCorrect });
  }

  return (
    <div className="lb-block-body">
      <div className="lb-field">
        <div className="lb-field-label">Question</div>
        <textarea className="lb-input" rows={2} value={p.question} onChange={(e) => upd({ question: e.target.value })} />
      </div>
      <div className="lb-field">
        <div className="lb-field-label">Choices (mark the correct one)</div>
        <div className="lb-sublist">
          {p.choices.map((c, i) => (
            <div key={i} className="lb-sub">
              <div className="lb-sub-row">
                <span className="lb-sub-tag">{String.fromCharCode(65 + i)}</span>
                <input className="lb-sub-input" value={c} onChange={(e) => setChoice(i, e.target.value)} />
                <button className={'lb-radio' + (p.correctIndex === i ? ' on' : '')} onClick={() => upd({ correctIndex: i })}>
                  {p.correctIndex === i ? '✓ Correct' : 'Mark correct'}
                </button>
                <button className="lb-icon-btn danger" onClick={() => removeChoice(i)} disabled={p.choices.length <= 2} title="Remove">×</button>
              </div>
            </div>
          ))}
        </div>
        {p.choices.length < 5 && (
          <button className="lb-add-btn" style={{ marginTop: 8, alignSelf: 'flex-start' }} onClick={addChoice}>+ Add choice</button>
        )}
      </div>
      <div className="lb-field">
        <div className="lb-field-label">Explanation (shown after the user picks)</div>
        <textarea className="lb-input" rows={2} value={p.explain} onChange={(e) => upd({ explain: e.target.value })} />
      </div>
    </div>
  );
}

function WorkflowSorterEditor({ block, onChange }) {
  const p = block.props;
  const upd = (patch) => onChange({ ...block, props: { ...p, ...patch } });

  function setBucket(side, key, val) {
    upd({ [side]: { ...p[side], [key]: val } });
  }
  function setTask(i, patch) {
    const next = p.tasks.map((t, idx) => idx === i ? { ...t, ...patch } : t);
    upd({ tasks: next });
  }
  function addTask() {
    const id = 't' + Date.now();
    upd({ tasks: [...p.tasks, { id, label: 'New item', answer: p.bucketLeft.id, why: 'Why it belongs there.' }] });
  }
  function removeTask(i) {
    if (p.tasks.length <= 2) return;
    upd({ tasks: p.tasks.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="lb-block-body">
      <div className="lb-row">
        <div className="lb-field">
          <div className="lb-field-label">Left bucket — label</div>
          <input className="lb-input" value={p.bucketLeft.label} onChange={(e) => setBucket('bucketLeft', 'label', e.target.value)} />
        </div>
        <div className="lb-field">
          <div className="lb-field-label">Right bucket — label</div>
          <input className="lb-input" value={p.bucketRight.label} onChange={(e) => setBucket('bucketRight', 'label', e.target.value)} />
        </div>
      </div>

      <div className="lb-field">
        <div className="lb-field-label">Items to sort</div>
        <div className="lb-sublist">
          {p.tasks.map((t, i) => (
            <div key={t.id || i} className="lb-sub">
              <div className="lb-sub-row">
                <span className="lb-sub-tag">{i + 1}</span>
                <input className="lb-sub-input" value={t.label} onChange={(e) => setTask(i, { label: e.target.value })} placeholder="Item label" />
                <div className="lb-bucket-pick">
                  <button className={t.answer === p.bucketLeft.id ? 'on' : ''} onClick={() => setTask(i, { answer: p.bucketLeft.id })}>{p.bucketLeft.label}</button>
                  <button className={t.answer === p.bucketRight.id ? 'on' : ''} onClick={() => setTask(i, { answer: p.bucketRight.id })}>{p.bucketRight.label}</button>
                </div>
                <button className="lb-icon-btn danger" onClick={() => removeTask(i)} disabled={p.tasks.length <= 2}>×</button>
              </div>
              <input className="lb-sub-input" value={t.why} onChange={(e) => setTask(i, { why: e.target.value })} placeholder="Why it belongs in that bucket" />
            </div>
          ))}
        </div>
        {p.tasks.length < 8 && (
          <button className="lb-add-btn" style={{ marginTop: 8, alignSelf: 'flex-start' }} onClick={addTask}>+ Add item</button>
        )}
      </div>
    </div>
  );
}

function TryWithClaudeEditor({ block, onChange }) {
  const p = block.props || {};
  const upd = (patch) => onChange({ ...block, props: { ...p, ...patch } });
  return (
    <div className="lb-block-body">
      <div className="lb-field">
        <div className="lb-field-label">Placeholder (shown in the textarea)</div>
        <input className="lb-input" value={p.placeholder || ''} onChange={(e) => upd({ placeholder: e.target.value })} />
      </div>
      <div className="lb-field">
        <div className="lb-field-label">System prompt — tells Claude how to critique</div>
        <textarea className="lb-input mono" rows={6} value={p.systemPrompt || ''} onChange={(e) => upd({ systemPrompt: e.target.value })} />
      </div>
      <div className="lb-block-helptext">
        Claude's response will be appended below this prompt. Keep the rules tight — short, specific, no flattery.
      </div>
    </div>
  );
}

function NoConfigEditor({ kind }) {
  return (
    <div className="lb-block-body">
      <div className="lb-block-helptext">
        {kind === 'PromptCompare' && 'Uses the default vague-vs-precise example. Custom variants coming.'}
        {kind === 'DecisionTree' && 'Uses the default branching scenario. Custom trees coming.'}
        {kind === 'stub' && 'A "Founder fills in the rest" marker. No configuration.'}
      </div>
    </div>
  );
}

// ─── Single block editor card ───────────────────────────────────────
function BlockEditor({ block, idx, total, onChange, onMove, onDelete }) {
  const kind = blockKindOf(block);
  let Body = null;
  if (kind === 'prose') Body = <ProseEditor block={block} onChange={onChange} />;
  else if (kind === 'QuickCheck') Body = <QuickCheckEditor block={block} onChange={onChange} />;
  else if (kind === 'WorkflowSorter') Body = <WorkflowSorterEditor block={block} onChange={onChange} />;
  else if (kind === 'TryWithClaude') Body = <TryWithClaudeEditor block={block} onChange={onChange} />;
  else Body = <NoConfigEditor kind={kind} />;

  return (
    <div className="lb-block">
      <div className="lb-block-head">
        <div className={'lb-block-kind ' + kind}>
          <span className="swatch" />
          {BLOCK_LABEL[kind]}
        </div>
        <div className="lb-block-tools">
          <button className="lb-icon-btn" onClick={() => onMove(idx, -1)} disabled={idx === 0} title="Move up">↑</button>
          <button className="lb-icon-btn" onClick={() => onMove(idx, +1)} disabled={idx === total - 1} title="Move down">↓</button>
          <button className="lb-icon-btn danger" onClick={() => onDelete(idx)} title="Remove">×</button>
        </div>
      </div>
      {Body}
    </div>
  );
}

// ─── Preview pane ───────────────────────────────────────────────────
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
  // key on JSON snapshot of props so widget remounts when configuration changes
  return <Cmp key={i + ':' + JSON.stringify(block.props || {})} {...(block.props || {})} />;
}

function Preview({ meta, blocks }) {
  return (
    <div className="lb-preview-frame">
      <div className="lb-prev-meta">
        <div className="lb-prev-eyebrow">Lesson · {meta.time}</div>
        <div className="lb-prev-title">{meta.title || 'Untitled lesson'}</div>
      </div>
      {blocks.map(renderBlock)}
    </div>
  );
}

// ─── Export modal ───────────────────────────────────────────────────
function ExportModal({ meta, blocks, onClose }) {
  function fmtBlocks() {
    // pretty-print blocks as JS code that can be pasted into lessons.jsx
    const indent = (s, n) => s.split('\n').map(l => ' '.repeat(n) + l).join('\n');
    function fmtVal(v, depth) {
      if (typeof v === 'string') return JSON.stringify(v);
      if (typeof v === 'number' || typeof v === 'boolean' || v === null) return JSON.stringify(v);
      if (Array.isArray(v)) {
        if (v.length === 0) return '[]';
        const inner = v.map(item => fmtVal(item, depth + 1)).join(',\n');
        return '[\n' + indent(inner, (depth + 1) * 2) + '\n' + ' '.repeat(depth * 2) + ']';
      }
      const entries = Object.entries(v).map(([k, val]) => `${k}: ${fmtVal(val, depth + 1)}`);
      return '{\n' + indent(entries.join(',\n'), (depth + 1) * 2) + '\n' + ' '.repeat(depth * 2) + '}';
    }
    return fmtVal(blocks, 0);
  }

  const meta_block = `{
  num: <NUMBER>,
  title: ${JSON.stringify(meta.title)},
  time: ${JSON.stringify(meta.time)},
  blocks: ${fmtBlocks().replace(/\n/g, '\n  ')}
}`;

  const [copied, setCopied] = React.useState(false);
  function copy() {
    navigator.clipboard.writeText(meta_block).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className="lb-modal-backdrop" onClick={onClose}>
      <div className="lb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lb-modal-head">
          <div className="lb-modal-title">Lesson code</div>
          <button className="lb-icon-btn" onClick={onClose}>×</button>
        </div>
        <div className="lb-modal-body">
          <p style={{ fontSize: 13, color: 'var(--ts)', marginBottom: 16, lineHeight: 1.65 }}>
            Paste this object into the <code style={{ fontFamily: 'var(--mono)', color: 'var(--cyan)', fontSize: 12 }}>lessons</code> array in <code style={{ fontFamily: 'var(--mono)', color: 'var(--cyan)', fontSize: 12 }}>lessons.jsx</code>. Set <code style={{ fontFamily: 'var(--mono)', color: 'var(--cyan)', fontSize: 12 }}>num</code> to the lesson's position in the module.
          </p>
          <div className="lb-code">{meta_block}</div>
        </div>
        <div className="lb-modal-foot">
          <button className="cta-secondary" onClick={onClose}>Close</button>
          <button className="cta-primary" onClick={copy}>{copied ? '✓ Copied' : 'Copy to clipboard'}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Top-level app ──────────────────────────────────────────────────
const STARTER_BLOCKS = [
  { type: 'prose', md:
`## The opening

Write the first beat of your lesson here. Hook the reader. Name the problem you're about to solve.

The brand voice is **quiet confidence** — short declaratives, em-dashes for the pivots, one bolded phrase per paragraph that has to land.` },
  { type: 'widget', kind: 'QuickCheck', props: {
    question: 'A starter question to wake the reader up.',
    choices: ['An obvious wrong answer', 'The right answer', 'A plausible distractor'],
    correctIndex: 1,
    explain: 'One sentence on why that answer is right.'
  }},
];

function App() {
  const [meta, setMeta] = React.useState({ title: 'New lesson', time: '~6 min' });
  const [blocks, setBlocks] = React.useState(STARTER_BLOCKS);
  const [exportOpen, setExportOpen] = React.useState(false);

  function updateBlock(i, next) {
    setBlocks(bs => bs.map((b, idx) => idx === i ? next : b));
  }
  function addBlock(kind) {
    setBlocks(bs => [...bs, BLOCK_DEFAULTS[kind]()]);
    // scroll the edit pane to bottom after add
    setTimeout(() => {
      const pane = document.querySelector('.lb-pane.edit');
      if (pane) pane.scrollTop = pane.scrollHeight;
    }, 30);
  }
  function moveBlock(i, dir) {
    setBlocks(bs => {
      const next = [...bs];
      const j = i + dir;
      if (j < 0 || j >= next.length) return next;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }
  function deleteBlock(i) {
    setBlocks(bs => bs.filter((_, idx) => idx !== i));
  }

  const blockKinds = ['prose', 'QuickCheck', 'WorkflowSorter', 'PromptCompare', 'TryWithClaude', 'DecisionTree', 'stub'];

  return (
    <div className="lb-app">
      <div className="lb-top">
        <div className="lb-brand">
          <span className="lu">Lu</span>Kai<span className="ai">AI</span>
          <span className="pipe">/</span>
          <span className="tool">Lesson Builder</span>
        </div>
        <div className="lb-top-actions">
          <button className="cta-secondary" onClick={() => { setBlocks(STARTER_BLOCKS); setMeta({ title: 'New lesson', time: '~6 min' }); }}>↻ Reset</button>
          <button className="cta-primary" style={{ padding: '9px 18px', fontSize: 13 }} onClick={() => setExportOpen(true)}>Export →</button>
        </div>
      </div>

      <div className="lb-body">
        <div className="lb-pane edit">
          <div className="lb-pane-label">Edit</div>

          <div className="lb-meta">
            <div className="lb-row">
              <div className="lb-field">
                <div className="lb-field-label">Lesson title</div>
                <input className="lb-input" value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} />
              </div>
              <div className="lb-field short">
                <div className="lb-field-label">Time</div>
                <input className="lb-input" value={meta.time} onChange={(e) => setMeta({ ...meta, time: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="lb-blocks">
            {blocks.map((b, i) => (
              <BlockEditor
                key={i}
                block={b}
                idx={i}
                total={blocks.length}
                onChange={(next) => updateBlock(i, next)}
                onMove={moveBlock}
                onDelete={deleteBlock}
              />
            ))}
          </div>

          <div className="lb-add">
            <div className="lb-add-label">+ Add block</div>
            <div className="lb-add-row">
              {blockKinds.map(k => (
                <button key={k} className="lb-add-btn" onClick={() => addBlock(k)}>
                  <span className={'swatch ' + k} style={{
                    background: ({
                      prose: 'var(--tp)',
                      QuickCheck: 'var(--green)',
                      WorkflowSorter: 'var(--cyan)',
                      PromptCompare: 'var(--violet)',
                      TryWithClaude: 'var(--cyan)',
                      DecisionTree: 'var(--red)',
                      stub: 'var(--gold)',
                    })[k]
                  }} />
                  {BLOCK_LABEL[k]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lb-pane preview">
          <div className="lb-pane-label">Preview</div>
          <Preview meta={meta} blocks={blocks} />
        </div>
      </div>

      {exportOpen && <ExportModal meta={meta} blocks={blocks} onClose={() => setExportOpen(false)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
