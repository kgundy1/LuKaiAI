// Screenshot Annotator — upload a screenshot, click to drop pins, export config.

function App() {
  const [imgSrc, setImgSrc] = React.useState(null);
  const [imgName, setImgName] = React.useState('');
  const [pins, setPins] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [caption, setCaption] = React.useState('');
  const [dragOver, setDragOver] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const stageRef = React.useRef(null);
  const fileRef = React.useRef(null);

  // ── File handling ──────────────────────────────────────────────
  function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    setImgName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImgSrc(e.target.result);
      setPins([]);
      setSelected(null);
    };
    reader.readAsDataURL(file);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  }
  function onDragOver(e) { e.preventDefault(); setDragOver(true); }
  function onDragLeave() { setDragOver(false); }

  // ── Pin handling ──────────────────────────────────────────────
  function addPin(e) {
    if (!imgSrc || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    // ignore clicks on existing pins
    if (e.target.classList?.contains('ann-pin')) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newPin = { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, label: '', note: '' };
    setPins(prev => {
      const next = [...prev, newPin];
      setSelected(next.length - 1);
      return next;
    });
  }

  function updatePin(i, patch) {
    setPins(prev => prev.map((p, idx) => idx === i ? { ...p, ...patch } : p));
  }
  function removePin(i) {
    setPins(prev => prev.filter((_, idx) => idx !== i));
    setSelected(null);
  }

  // ── Drag a pin to reposition ──────────────────────────────────
  const dragState = React.useRef(null);
  function onPinMouseDown(i, e) {
    e.stopPropagation();
    setSelected(i);
    dragState.current = { i, started: false };
  }
  React.useEffect(() => {
    function onMove(e) {
      if (!dragState.current || !stageRef.current) return;
      dragState.current.started = true;
      const rect = stageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      updatePin(dragState.current.i, {
        x: Math.max(0, Math.min(100, Math.round(x * 10) / 10)),
        y: Math.max(0, Math.min(100, Math.round(y * 10) / 10)),
      });
    }
    function onUp() { dragState.current = null; }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  // ── Reset ──────────────────────────────────────────────────────
  function reset() {
    setImgSrc(null);
    setImgName('');
    setPins([]);
    setSelected(null);
    setCaption('');
  }

  return (
    <div className="lb-app">
      <div className="lb-top">
        <div className="lb-brand">
          <span className="lu">Lu</span>Kai<span className="ai">AI</span>
          <span className="pipe">/</span>
          <span className="tool">Screenshot Annotator</span>
        </div>
        <div className="lb-top-actions">
          {imgSrc && <button className="cta-secondary" onClick={reset}>↻ New screenshot</button>}
          <button className="cta-primary" style={{ padding: '9px 18px', fontSize: 13 }} onClick={() => setExportOpen(true)} disabled={!imgSrc}>
            Export →
          </button>
        </div>
      </div>

      <div className="lb-body">
        <div className="lb-pane edit">
          <div className="lb-pane-label">Annotate</div>

          <div className="ann-pane-meta">
            <div className="lb-field">
              <div className="lb-field-label">Caption</div>
              <input
                className="lb-input"
                placeholder='e.g., "GitHub → top-right + → New repository"'
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            {imgName && (
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--tt)' }}>
                Image: {imgName} · {pins.length} pin{pins.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {pins.length > 0 && (
            <>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--tt)', textTransform: 'uppercase', marginBottom: 10 }}>
                Pins · click in the image to add more · drag any pin to reposition
              </div>
              <div className="ann-pins-list">
                {pins.map((p, i) => (
                  <div key={i} className={'ann-pin-card' + (selected === i ? ' selected' : '')} onClick={() => setSelected(i)}>
                    <div className="ann-pin-head">
                      <div className="ann-pin-num">{i + 1}</div>
                      <div style={{ fontSize: 13, color: 'var(--tp)', fontWeight: 500 }}>Pin {i + 1}</div>
                      <div className="ann-pin-coord">{p.x}% × {p.y}%</div>
                      <button className="lb-icon-btn danger" onClick={(e) => { e.stopPropagation(); removePin(i); }}>×</button>
                    </div>
                    <input
                      className="lb-input"
                      placeholder="Label (e.g., 'New repository button')"
                      value={p.label}
                      onChange={(e) => updatePin(i, { label: e.target.value })}
                      onClick={(e) => e.stopPropagation()}
                      style={{ marginBottom: 8 }}
                    />
                    <textarea
                      className="lb-input"
                      rows={2}
                      placeholder="Note (the tooltip that appears when learners hover the pin)"
                      value={p.note}
                      onChange={(e) => updatePin(i, { note: e.target.value })}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {!imgSrc && (
            <div style={{ fontSize: 13, color: 'var(--tt)', lineHeight: 1.65, marginTop: 24 }}>
              <strong style={{ color: 'var(--tp)', fontWeight: 600, display: 'block', marginBottom: 8 }}>How this works</strong>
              <ol style={{ paddingLeft: 18, lineHeight: 1.7 }}>
                <li>Capture a screenshot of the GitHub / Render / Cloudflare / Claude page you want to reference</li>
                <li>Drop it onto the preview pane on the right (or click to browse)</li>
                <li>Click anywhere on the image to drop a numbered pin</li>
                <li>Type a label + the tooltip note in the form that appears here</li>
                <li>Drag pins to reposition them; click × to remove</li>
                <li>When done, click <strong>Export →</strong> to get the lesson code</li>
              </ol>
            </div>
          )}
        </div>

        <div className="lb-pane preview">
          <div className="lb-pane-label">Preview · {imgSrc ? 'click image to drop pins' : 'drop a screenshot to start'}</div>

          {imgSrc ? (
            <div className="ann-stage" ref={stageRef} onClick={addPin}>
              <div className="ann-hint">Click to add pin</div>
              <img src={imgSrc} alt="Screenshot" />
              {pins.map((p, i) => (
                <button
                  key={i}
                  className={'ann-pin' + (selected === i ? ' selected' : '')}
                  style={{ left: p.x + '%', top: p.y + '%' }}
                  onMouseDown={(e) => onPinMouseDown(i, e)}
                  onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                >
                  {i + 1}
                </button>
              ))}
              {caption && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 14px', background: 'rgba(6,7,10,0.85)', color: 'var(--ts)', fontSize: 12, fontStyle: 'italic' }}>
                  {caption}
                </div>
              )}
            </div>
          ) : (
            <div
              className={'ann-stage'}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
            >
              <div className={'ann-empty' + (dragOver ? ' drag-over' : '')}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="9" cy="11" r="2" />
                  <path d="M3 17l5-5 4 4 3-3 6 6" />
                </svg>
                <div>{dragOver ? 'Release to upload' : 'Drop a screenshot here'}</div>
                <button className="ann-empty-btn" onClick={() => fileRef.current?.click()}>Browse files</button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => loadFile(e.target.files?.[0])}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {exportOpen && <ExportModal imgSrc={imgSrc} imgName={imgName} pins={pins} caption={caption} onClose={() => setExportOpen(false)} />}
    </div>
  );
}

function ExportModal({ imgSrc, imgName, pins, caption, onClose }) {
  const [copied, setCopied] = React.useState(false);

  // Filename suggestion based on imgName
  const sanitized = (imgName || 'screenshot.png').toLowerCase().replace(/[^a-z0-9.-]+/g, '-');
  const suggestedPath = `assets/screenshots/${sanitized}`;

  const code = `{ type: 'widget', kind: 'Screenshot', props: {
  src: ${JSON.stringify(suggestedPath)},
  caption: ${JSON.stringify(caption || '')},
  pins: ${JSON.stringify(pins, null, 4).split('\n').map((l, i) => i === 0 ? l : '  ' + l).join('\n')}
}}`;

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }
  function downloadImage() {
    const a = document.createElement('a');
    a.href = imgSrc;
    a.download = sanitized;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="lb-modal-backdrop" onClick={onClose}>
      <div className="lb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lb-modal-head">
          <div className="lb-modal-title">Screenshot block</div>
          <button className="lb-icon-btn" onClick={onClose}>×</button>
        </div>
        <div className="lb-modal-body">
          <p style={{ fontSize: 13, color: 'var(--ts)', marginBottom: 16, lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--tp)', fontWeight: 600 }}>Two steps to put this in a lesson:</strong>
          </p>
          <ol style={{ fontSize: 13, color: 'var(--ts)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 18 }}>
            <li>
              <strong style={{ color: 'var(--tp)' }}>Save the image</strong> to <code style={{ fontFamily: 'var(--mono)', color: 'var(--cyan)', fontSize: 12 }}>{suggestedPath}</code>{' '}
              <button className="cta-secondary" style={{ marginLeft: 8 }} onClick={downloadImage}>↓ Download image</button>
            </li>
            <li>
              <strong style={{ color: 'var(--tp)' }}>Paste this block</strong> into the lesson's <code style={{ fontFamily: 'var(--mono)', color: 'var(--cyan)', fontSize: 12 }}>blocks</code> array in <code style={{ fontFamily: 'var(--mono)', color: 'var(--cyan)', fontSize: 12 }}>lessons.jsx</code>
            </li>
          </ol>
          <div className="lb-code">{code}</div>
        </div>
        <div className="lb-modal-foot">
          <button className="cta-secondary" onClick={onClose}>Close</button>
          <button className="cta-primary" onClick={copy}>{copied ? '✓ Copied' : 'Copy block code'}</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
