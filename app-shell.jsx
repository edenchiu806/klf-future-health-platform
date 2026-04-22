const TWEAKS = {
  panel: 'A',
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

function readResponsiveDevice() {
  try {
    const params = new URLSearchParams(window.location.search);
    const forced = params.get('device');
    if (forced === 'desktop' || forced === 'mobile') return forced;
  } catch (error) {
    // Ignore URL parsing issues and fall back to viewport detection.
  }

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(max-width: 960px)').matches ? 'mobile' : 'desktop';
  }

  return 'desktop';
}

function App() {
  injectStyles();
  const memberKey = 'yuhong';
  const viz = 'radar';
  const [panel, setPanel] = React.useState(() => initialView('panel', 'A', ['A', 'B']));
  const [device, setDevice] = React.useState(readResponsiveDevice);
  const [focusId, setFocusId] = React.useState(CASES[0].id);

  const member = MEMBERS[memberKey];
  const isMobile = device === 'mobile';
  const outerPad = isMobile ? 18 : 40;
  const heroTitleSize = isMobile ? 28 : 38;
  const heroTitleTracking = isMobile ? 9 : 16;
  const heroEyebrowSize = isMobile ? 10 : 11;
  const heroEyebrowTracking = isMobile ? 6 : 8;
  const btnPadding = isMobile ? '10px 14px' : '10px 18px';
  const contentMaxWidth = isMobile ? 520 : 1480;

  const btnBase = {
    border: 'none',
    padding: btnPadding,
    whiteSpace: 'nowrap',
    fontSize: 12,
    letterSpacing: 2,
    fontFamily: THEME.serif,
    cursor: 'pointer',
  };

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;

    let forced = null;
    try {
      const params = new URLSearchParams(window.location.search);
      const deviceParam = params.get('device');
      if (deviceParam === 'desktop' || deviceParam === 'mobile') {
        forced = deviceParam;
      }
    } catch (error) {
      // Ignore URL parsing issues and continue with viewport detection.
    }

    if (forced) {
      setDevice(forced);
      return undefined;
    }

    const media = window.matchMedia('(max-width: 960px)');
    const syncDevice = () => setDevice(media.matches ? 'mobile' : 'desktop');
    syncDevice();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', syncDevice);
      return () => media.removeEventListener('change', syncDevice);
    }

    media.addListener(syncDevice);
    return () => media.removeListener(syncDevice);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: THEME.surface, padding: isMobile ? '26px 0 56px' : '40px 0 80px' }}>
      <div className="in-fade-in" style={{ maxWidth: 1480, margin: '0 auto 24px', padding: `0 ${outerPad}px`, textAlign: 'center' }}>
        <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: heroEyebrowSize, color: THEME.metal, letterSpacing: heroEyebrowTracking, marginBottom: isMobile ? 14 : 16 }}>
          Health Atelier · Member Council
        </div>
        <div style={{ fontFamily: THEME.serif, fontSize: heroTitleSize, color: THEME.ink, letterSpacing: heroTitleTracking, fontWeight: 400 }}>
          大健康私人俱樂部
        </div>
        <div style={{ margin: isMobile ? '18px auto 4px' : '22px auto 4px' }}>
          <HairRule w={isMobile ? 40 : 56} />
        </div>
        <div style={{ margin: '18px auto 0', maxWidth: isMobile ? 320 : 640, fontSize: isMobile ? 10 : 11, color: THEME.inkSoft, letterSpacing: isMobile ? 1.5 : 2, lineHeight: 2 }}>
          A · 會員專屬頁　　|　　B · 團隊協作台
        </div>
      </div>

      <div style={{
        maxWidth: 1480,
        margin: `0 auto ${isMobile ? 20 : 32}px`,
        padding: `0 ${outerPad}px`,
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
      </div>

      <div style={{ maxWidth: contentMaxWidth, margin: '0 auto', padding: `0 ${outerPad}px` }}>
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
          <div className="in-fade-in" style={{
            background: THEME.cardBg,
            border: `1px solid ${THEME.line}`,
            boxShadow: '0 30px 70px -44px rgba(20, 20, 20, 0.24)',
            overflow: 'hidden',
          }}>
            {panel === 'A'
              ? <PanelAMobile member={member} viz={viz} />
              : <PanelBMobile cases={CASES} focusId={focusId} onFocus={setFocusId} member={member} />}
          </div>
        )}
      </div>
    </div>
  );
}

globalThis.__KLF_APP__ = App;
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
