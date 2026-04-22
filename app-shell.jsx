const TWEAKS = {
  panel: 'A',
  device: 'desktop',
};

function initialView(key, fallback, allowed) {
  try {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(key);
    if (allowed.includes(value)) return value;
  } catch (error) {
    // Ignore URL parsing issues and fall back to the built-in defaults.
  }
  return TWEAKS[key] || fallback;
}

function App() {
  injectStyles();
  const memberKey = 'yuhong';
  const viz = 'radar';
  const [panel, setPanel] = React.useState(() => initialView('panel', 'A', ['A', 'B']));
  const [device, setDevice] = React.useState(() => initialView('device', 'mobile', ['desktop', 'mobile']));
  const [focusId, setFocusId] = React.useState(CASES[0].id);

  const member = MEMBERS[memberKey];
  const MOB_W = 390;
  const MOB_H = 820;

  const btnBase = {
    border: 'none',
    padding: '10px 18px',
    whiteSpace: 'nowrap',
    fontSize: 12,
    letterSpacing: 2,
    fontFamily: THEME.serif,
    cursor: 'pointer',
  };

  return (
    <div style={{ minHeight: '100vh', background: THEME.surface, padding: '40px 0 80px' }}>
      <div className="in-fade-in" style={{ maxWidth: 1480, margin: '0 auto 24px', padding: '0 40px', textAlign: 'center' }}>
        <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 11, color: THEME.metal, letterSpacing: 8, marginBottom: 16 }}>
          Health Atelier · Member Council
        </div>
        <div style={{ fontFamily: THEME.serif, fontSize: 38, color: THEME.ink, letterSpacing: 16, fontWeight: 400 }}>
          大健康私人俱樂部
        </div>
        <div style={{ margin: '22px auto 4px' }}>
          <HairRule w={56} />
        </div>
        <div style={{ margin: '18px auto 0', maxWidth: 640, fontSize: 11, color: THEME.inkSoft, letterSpacing: 2, lineHeight: 2 }}>
          A · 會員專屬頁　　|　　B · 團隊協作台
        </div>
      </div>

      <div style={{
        maxWidth: 1480,
        margin: '0 auto 32px',
        padding: '0 40px',
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', border: `1px solid ${THEME.ink}` }}>
          {[
            { k: 'A', label: 'A · 會員專屬頁' },
            { k: 'B', label: 'B · 團隊協作台' },
          ].map((item) => (
            <button
              key={item.k}
              className="in-btn"
              onClick={() => setPanel(item.k)}
              style={{
                ...btnBase,
                background: panel === item.k ? THEME.ink : THEME.cardBg,
                color: panel === item.k ? THEME.cardBg : THEME.ink,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', border: `1px solid ${THEME.line}` }}>
          {[
            { k: 'desktop', label: '電腦版' },
            { k: 'mobile', label: '手機版' },
          ].map((item) => (
            <button
              key={item.k}
              className="in-btn"
              onClick={() => setDevice(item.k)}
              style={{
                ...btnBase,
                background: device === item.k ? THEME.surfaceSoft : THEME.cardBg,
                color: device === item.k ? THEME.ink : THEME.inkSoft,
                fontFamily: THEME.sans,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1480, margin: '0 auto', padding: '0 40px' }}>
        {device === 'desktop' ? (
          <div className="in-fade-in" style={{
            background: THEME.cardBg,
            border: `1px solid ${THEME.line}`,
            boxShadow: '0 40px 100px -50px rgba(20, 20, 20, 0.22)',
            overflow: 'hidden',
          }}>
            {panel === 'A'
              ? <PanelADesktop member={member} viz={viz} />
              : <PanelBDesktop cases={CASES} focusId={focusId} onFocus={setFocusId} member={member} />}
          </div>
        ) : (
          <div className="in-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: MOB_W + 14,
              padding: 7,
              background: THEME.phoneShellGradient,
              borderRadius: 48,
              boxShadow: '0 40px 80px -30px rgba(20,20,20,0.45)',
            }}>
              <div className="in-scroll" style={{
                width: MOB_W,
                height: MOB_H,
                overflowY: 'auto',
                overflowX: 'hidden',
                background: THEME.cardBg,
                borderRadius: 41,
                position: 'relative',
              }}>
                <div style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 10,
                  height: 32,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 60%, rgba(255,255,255,0) 100%)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingTop: 7,
                }}>
                  <div style={{ width: 100, height: 22, background: THEME.phoneNotchGradient, borderRadius: 14 }} />
                </div>
                <div style={{ marginTop: -32 }}>
                  {panel === 'A'
                    ? <PanelAMobile member={member} viz={viz} />
                    : <PanelBMobile cases={CASES} focusId={focusId} onFocus={setFocusId} member={member} />}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

globalThis.__KLF_APP__ = App;
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
