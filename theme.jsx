// theme.jsx — Ink Noir 墨黑雅典 · 純白 + 墨黑 + 鉑金灰（歐式私人俱樂部風）

const THEME = {
  // 底色：極致的純白
  pageBg:       '#FFFFFF',
  cardBg:       '#FFFFFF',
  surface:      '#FAFAF9',      // 象牙白（頁面底）
  surfaceSoft:  '#F5F4F2',      // 淺米白（卡片層次）
  surfaceDeep:  '#EEEDEA',      // 砂礫（極少使用）

  // 主墨：深黑不是純黑，帶一點藍灰讓它優雅
  ink:          '#141414',      // 主墨
  inkDeep:      '#0A0A0A',      // 極深墨（正文大字）
  inkSoft:      '#3A3A3A',
  inkMute:      '#8A8985',
  inkFaint:     '#BCBAB5',

  // 鉑金灰（取代金色的低調高級色）
  metal:        '#6B6762',      // 鉑金深
  metalSoft:    '#9E9A93',      // 鉑金亮
  metalTint:    '#EEEBE4',      // 鉑金底（極淺）
  metalLine:    '#D8D3C9',      // 鉑金線

  // 主 accent（墨黑）— 按鈕、強調、選中態
  accent:       '#141414',
  accentSoft:   '#3A3A3A',
  panelGradient: 'radial-gradient(circle at 18% 14%, rgba(226, 211, 177, 0.28), transparent 30%), linear-gradient(145deg, #4A433D 0%, #2D2823 42%, #11100F 100%)',
  panelGradientSoft: 'radial-gradient(circle at 16% 12%, rgba(226, 211, 177, 0.22), transparent 32%), linear-gradient(150deg, #443D37 0%, #28231F 52%, #121110 100%)',
  panelGradientElevated: 'radial-gradient(circle at 14% 12%, rgba(226, 211, 177, 0.24), transparent 34%), linear-gradient(165deg, #504841 0%, #2F2925 46%, #100F0E 100%)',
  phoneShellGradient: 'linear-gradient(180deg, #47403A 0%, #29241F 46%, #11100F 100%)',
  phoneNotchGradient: 'linear-gradient(180deg, #2E2926 0%, #191715 100%)',
  darkPanelShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 50px -28px rgba(20,20,20,0.38)',

  // 語意色（精品低飽和 — 極少使用、留給真正警示）
  danger:       '#8F3A2E',      // 勃艮第紅
  warn:         '#967638',      // 黃銅棕
  good:         '#3B5A47',      // 墨綠
  dangerBg:     '#F6EFEC',
  warnBg:       '#F5F1E8',
  goodBg:       '#ECEFEB',

  // 線條
  line:         '#E8E6E1',
  lineSoft:     '#F0EEE9',
  hair:         '#DCD9D2',

  // 字體
  serif:        "'KuMincho', 'Cormorant Garamond', 'Noto Serif TC', serif",
  sans:         "'Noto Sans TC', sans-serif",
  mono:         "'JetBrains Mono', monospace",
};

// 全局樣式注入
function injectStyles() {
  if (document.getElementById('ink-noir-styles')) return;
  const style = document.createElement('style');
  style.id = 'ink-noir-styles';
  style.textContent = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes hairLine {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes pulseDot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50%      { transform: scale(1.25); opacity: 0.65; }
    }
    @keyframes barFill { from { width: 0; } }
    @keyframes fillUp  { from { transform: scaleY(0); } to { transform: scaleY(1); } }

    .in-fade-up   { animation: fadeUp .7s cubic-bezier(.2,.6,.2,1) both; }
    .in-fade-in   { animation: fadeIn .6s ease both; }
    .in-hair      { transform-origin: left center; animation: hairLine 1s cubic-bezier(.2,.6,.2,1) both; }
    .in-pulse     { animation: pulseDot 2.4s ease-in-out infinite; }
    .in-bar       { animation: barFill 1.1s cubic-bezier(.2,.6,.2,1) both; }

    .in-delay-1 { animation-delay: .08s; }
    .in-delay-2 { animation-delay: .16s; }
    .in-delay-3 { animation-delay: .24s; }
    .in-delay-4 { animation-delay: .32s; }
    .in-delay-5 { animation-delay: .40s; }
    .in-delay-6 { animation-delay: .48s; }

    .in-lift { transition: all .35s cubic-bezier(.2,.6,.2,1); }
    .in-lift:hover {
      transform: translateY(-1px);
      box-shadow: 0 18px 40px -24px rgba(20, 20, 20, 0.18);
      border-color: #141414;
    }

    .in-btn {
      transition: all .25s ease;
      cursor: pointer;
      font-family: inherit;
    }
    .in-btn:hover { opacity: 0.82; }
    .in-btn:active { transform: translateY(0.5px); }

    /* 極細滾動條 */
    .in-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
    .in-scroll::-webkit-scrollbar-track { background: transparent; }
    .in-scroll::-webkit-scrollbar-thumb { background: #D8D3C9; border-radius: 2px; }
    .in-scroll::-webkit-scrollbar-thumb:hover { background: #6B6762; }

    /* 文字選取 */
    ::selection { background: #141414; color: #FFFFFF; }
  `;
  document.head.appendChild(style);
}

// 根據分數決定語意色
function toneFor(rawScore, key) {
  const display = key === 'cor' ? (100 - rawScore) : rawScore;
  if (display < 40) return { tone: 'danger', color: THEME.danger, bg: THEME.dangerBg, label: '偏低' };
  if (display < 60) return { tone: 'warn',   color: THEME.warn,   bg: THEME.warnBg,   label: '需留意' };
  if (display < 80) return { tone: 'good',   color: THEME.good,   bg: THEME.goodBg,   label: '良好' };
  return               { tone: 'best',   color: THEME.good,   bg: THEME.goodBg,   label: '理想' };
}

// ─── 小元件：單一鉑金分割線（配一個極小的菱形或雙線）
function HairRule({ w = 40, variant = 'center' }) {
  if (variant === 'double') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        <span style={{ width: w, height: 1, background: THEME.ink }} />
        <span style={{ width: w * 0.4, height: 1, background: THEME.ink }} />
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <span style={{ width: w, height: 1, background: THEME.ink }} />
      <span style={{ width: 3, height: 3, background: THEME.ink, transform: 'rotate(45deg)' }} />
      <span style={{ width: w, height: 1, background: THEME.ink }} />
    </div>
  );
}

// 四角框（墨線，極細，取代舊的金色）
function Corners() { return null; }
function _CornersOld({ size = 12, inset = 8, color }) {
  const c = color || THEME.ink;
  const s = { position: 'absolute', width: size, height: size, pointerEvents: 'none' };
  return (
    <>
      <span style={{ ...s, top: inset,    left: inset,  borderTop:    `1px solid ${c}`, borderLeft:  `1px solid ${c}` }} />
      <span style={{ ...s, top: inset,    right: inset, borderTop:    `1px solid ${c}`, borderRight: `1px solid ${c}` }} />
      <span style={{ ...s, bottom: inset, left: inset,  borderBottom: `1px solid ${c}`, borderLeft:  `1px solid ${c}` }} />
      <span style={{ ...s, bottom: inset, right: inset, borderBottom: `1px solid ${c}`, borderRight: `1px solid ${c}` }} />
    </>
  );
}

// 小眉標（英文大寫 spaced label）
function Eyebrow({ children, color, size = 9, letter = 5 }) {
  return (
    <div style={{
      fontFamily: THEME.serif, fontSize: size, letterSpacing: letter,
      color: color || THEME.metal, textTransform: 'uppercase', fontWeight: 400,
    }}>{children}</div>
  );
}

// 數字顯示（襯線字體主導）
function Metric({ value, unit, tone = 'ink', size = 32, serif = true }) {
  const c = tone === 'ink' ? THEME.ink : tone === 'metal' ? THEME.metal :
            tone === 'danger' ? THEME.danger : tone === 'warn' ? THEME.warn :
            tone === 'good' ? THEME.good : tone;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 3 }}>
      <span style={{
        fontFamily: serif ? THEME.serif : THEME.sans,
        fontSize: size, fontWeight: 400, color: c, letterSpacing: 0.5, lineHeight: 1,
      }}>{value}</span>
      {unit && <span style={{ fontSize: 10, color: THEME.inkMute, letterSpacing: 1 }}>{unit}</span>}
    </span>
  );
}

// 章節編號（羅馬數字 + 極細橫線 + 標題）
function SectionHeader({ n, label, subtitle }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: subtitle ? 8 : 0 }}>
        <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 13, color: THEME.metal, letterSpacing: 2, minWidth: 22 }}>{n}</span>
        <span className="in-hair" style={{ width: 32, height: 1, background: THEME.ink, display: 'block' }} />
        <div style={{ fontFamily: THEME.serif, fontSize: 20, color: THEME.ink, letterSpacing: 5, fontWeight: 400 }}>{label}</div>
      </div>
      {subtitle && (
        <div style={{ fontSize: 11, color: THEME.inkSoft, letterSpacing: 1, lineHeight: 1.8, paddingLeft: 68 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { THEME, injectStyles, toneFor, HairRule, Corners, Eyebrow, Metric, SectionHeader });
