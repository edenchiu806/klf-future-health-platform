// panelA-mobile.jsx — A 面板（會員專屬頁）手機版 · Ink Noir
//   純白 + 墨黑 + 鉑金灰 · 歐式私人俱樂部

function MobSection({ n, label, subtitle, children, delay = 0 }) {
  return (
    <section className="in-fade-up" style={{ animationDelay: `${delay}s`, marginBottom: 44 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: subtitle ? 6 : 14 }}>
        <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 2, minWidth: 18 }}>{n}</span>
        <span className="in-hair" style={{ width: 22, height: 1, background: THEME.ink, display: 'block' }} />
        <div style={{ fontFamily: THEME.serif, fontSize: 19, color: THEME.ink, letterSpacing: 5 }}>{label}</div>
      </div>
      {subtitle && (
        <div style={{ fontSize: 10.5, color: THEME.inkSoft, letterSpacing: 1, lineHeight: 1.8, marginTop: 4, marginBottom: 16, paddingLeft: 52 }}>
          {subtitle}
        </div>
      )}
      {children}
    </section>
  );
}

// ─── 封面：信箋式書法排版
function MobCover({ member }) {
  return (
    <div className="in-fade-in" style={{
      padding: '40px 22px 30px', borderBottom: `1px solid ${THEME.line}`,
      background: `linear-gradient(180deg, #FFFFFF 0%, ${THEME.surfaceSoft} 100%)`,
      position: 'relative',
    }}>
      {/* 頂部徽標 */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <Eyebrow size={8} letter={6}>Health Atelier</Eyebrow>
        <div style={{ margin: '10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span style={{ width: 30, height: 1, background: THEME.ink }} />
          <span style={{ width: 4, height: 4, background: THEME.ink, transform: 'rotate(45deg)' }} />
          <span style={{ width: 30, height: 1, background: THEME.ink }} />
        </div>
        <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.metal, letterSpacing: 4, marginTop: 10 }}>
          Private · Member Edition
        </div>
      </div>

      {/* 收件 */}
      <div style={{ fontSize: 9.5, color: THEME.metal, letterSpacing: 3, marginBottom: 6 }}>
        敬致　<span style={{ color: THEME.ink }}>{member.level}</span>
      </div>

      {/* 姓名 */}
      <div style={{ fontFamily: THEME.serif, fontSize: 42, fontWeight: 300, color: THEME.ink, letterSpacing: 10, lineHeight: 1.1 }}>
        {member.name}
      </div>
      <div style={{ fontSize: 9, color: THEME.inkMute, letterSpacing: 3, marginTop: 6 }}>先生／女士　親啟</div>

      {/* 引言 */}
      <div style={{ marginTop: 22, paddingTop: 22, borderTop: `1px solid ${THEME.line}`,
        fontSize: 11.5, color: THEME.inkSoft, letterSpacing: 1, lineHeight: 2 }}>
        謹為閣下整理本季身心狀態與調理方向，願您安好。
      </div>

      {/* 底部資訊 */}
      <div style={{
        marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
        borderTop: `1px solid ${THEME.line}`, borderBottom: `1px solid ${THEME.line}`,
      }}>
        {[
          { l: 'Edition',  v: '04.21' },
          { l: 'N°',       v: member.id.slice(-4) },
          { l: 'Revisit',  v: member.nextVisit.slice(5) },
        ].map((x, i) => (
          <div key={i} style={{
            padding: '12px 8px',
            borderRight: i < 2 ? `1px solid ${THEME.line}` : 'none',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 8, color: THEME.metal, letterSpacing: 2, marginBottom: 3 }}>{x.l}</div>
            <div style={{ fontFamily: THEME.serif, fontSize: 13, color: THEME.ink, letterSpacing: 2 }}>{x.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 身體訊息
function MobBodyMessage({ member }) {
  const m = member.lifestyle;
  const items = [
    { label: '睡眠',     en: 'Sleep',   value: m.sleep,   unit: '時',   ideal: '7–8',    flag: m.sleep < 6 },
    { label: '壓力',     en: 'Stress',  value: m.stress,  unit: '／10', ideal: '≤ 4',    flag: m.stress >= 6 },
    { label: '疲勞',     en: 'Fatigue', value: m.fatigue, unit: '／10', ideal: '≤ 4',    flag: m.fatigue >= 6 },
    { label: '體態',     en: 'BMI',     value: m.bmi,     unit: '',     ideal: '22–24',  flag: m.bmi >= 27 },
    { label: '腰圍',     en: 'Waist',   value: m.waist,   unit: 'cm',   ideal: '≤ 90',   flag: m.waist >= 90 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {items.map((it, i) => (
        <div key={i} className={`in-fade-up in-delay-${Math.min(i + 1, 5)}`} style={{
          padding: '14px 0',
          borderBottom: i < items.length - 1 ? `1px solid ${THEME.lineSoft}` : 'none',
          display: 'grid', gridTemplateColumns: '82px 1fr auto auto', gap: 12, alignItems: 'baseline',
        }}>
          <div>
            <div style={{ fontFamily: THEME.serif, fontSize: 14, color: THEME.ink, letterSpacing: 3 }}>{it.label}</div>
            <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 8, color: THEME.metal, letterSpacing: 2, marginTop: 1 }}>{it.en}</div>
          </div>
          <div style={{ fontSize: 9.5, color: THEME.metal, letterSpacing: 1.5, fontFamily: THEME.serif, fontStyle: 'italic' }}>ideal {it.ideal}</div>
          {it.flag
            ? <span style={{ fontSize: 8, color: THEME.danger, letterSpacing: 2 }}>● 需關注</span>
            : <span />}
          <Metric value={it.value} unit={it.unit} tone={it.flag ? 'danger' : 'ink'} size={22} />
        </div>
      ))}
    </div>
  );
}

// ─── 身心六感（雷達為主視覺）
function MobSixSenses({ member, viz = 'radar' }) {
  return (
    <div>
      <div style={{
        padding: '18px 10px 16px',
        background: `
          radial-gradient(circle at 16% 14%, rgba(238, 235, 228, 0.9) 0%, transparent 28%),
          linear-gradient(180deg, #FFFFFF 0%, ${THEME.surfaceSoft} 100%)
        `,
        border: `1px solid ${THEME.line}`,
        marginBottom: 14,
        overflow: 'visible',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 6px' }}>
          <RadarFigure scores={member.nt} mobile />
        </div>
      </div>

      <CompositeScoreStrip scores={member.nt} compact />

      <SenseInsightGrid scores={member.nt} columns={2} compact />
    </div>
  );
}

// ─── 量身方向
function MobDirection({ member }) {
  const b = member.brief;
  return (
    <div>
      <div className="in-fade-up" style={{
        padding: '24px 22px 22px', marginBottom: 20,
        background: THEME.panelGradientElevated,
        color: THEME.cardBg, position: 'relative',
        boxShadow: THEME.darkPanelShadow,
      }}>
        <Eyebrow color={THEME.metalSoft} size={8} letter={5}>This Season · Direction</Eyebrow>
        <div style={{ fontFamily: THEME.serif, fontSize: 22, color: THEME.cardBg, letterSpacing: 4, marginTop: 14, lineHeight: 1.5 }}>
          {b.direction}
        </div>
      </div>

      {b.insights.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 18 }}>
          {b.insights.map((x, i) => (
            <div key={i} className={`in-fade-up in-delay-${i + 1}`} style={{
              padding: '14px 0', borderBottom: `1px solid ${THEME.lineSoft}`,
              display: 'grid', gridTemplateColumns: '26px 1fr', gap: 10,
            }}>
              <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 12, color: THEME.metal, letterSpacing: 1 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div style={{ fontFamily: THEME.serif, fontSize: 15, color: THEME.ink, letterSpacing: 3, marginBottom: 4 }}>{x.label}</div>
                <div style={{ fontSize: 10.5, color: THEME.inkSoft, lineHeight: 1.8, letterSpacing: 1 }}>{x.detail}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: '16px 18px', background: `linear-gradient(180deg, ${THEME.surfaceSoft} 0%, ${THEME.metalTint} 100%)`, borderTop: `1px solid ${THEME.metalLine}` }}>
        <Eyebrow size={8} letter={4}>Why</Eyebrow>
        <div style={{ marginTop: 8, fontSize: 11.5, color: THEME.ink, lineHeight: 2, letterSpacing: 1 }}>{b.reason}</div>
      </div>
    </div>
  );
}

// ─── 產品
function MobProducts({ member }) {
  const [picked, setPicked] = React.useState({});
  const b = member.brief;
  if (!b.products.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1px solid ${THEME.line}` }}>
      {b.products.map((pid, i) => {
        const p = PRODUCTS[pid];
        const taken = !!picked[pid];
        return (
          <div key={pid} className={`in-fade-up in-delay-${Math.min(i + 1, 6)}`} style={{
            background: THEME.cardBg, padding: '16px 16px',
            display: 'grid', gridTemplateColumns: '48px 1fr auto',
            gap: 14, alignItems: 'center',
            borderBottom: i < b.products.length - 1 ? `1px solid ${THEME.line}` : 'none',
          }}>
            <div style={{
              width: 48, height: 60, background: THEME.surfaceSoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', border: `1px solid ${THEME.metalLine}`,
            }}>
              <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.metal, letterSpacing: 1, position: 'absolute', top: 4, left: 4 }}>N°</span>
              <span style={{ fontFamily: THEME.serif, fontSize: 20, color: THEME.ink, letterSpacing: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.metal, letterSpacing: 3, marginBottom: 4 }}>{p.tag}</div>
              <div style={{ fontFamily: THEME.serif, fontSize: 16, color: THEME.ink, letterSpacing: 2, lineHeight: 1.3 }}>
                {p.name}
              </div>
              <div style={{ fontSize: 9, color: THEME.inkMute, letterSpacing: 2, marginTop: 4 }}>{p.unit}</div>
            </div>
            <button
              className="in-btn"
              onClick={() => setPicked(s => ({ ...s, [pid]: !s[pid] }))}
              style={{
                padding: '10px 14px',
                background: taken ? THEME.cardBg : THEME.ink,
                color: taken ? THEME.ink : THEME.cardBg,
                border: `1px solid ${THEME.ink}`,
                fontSize: 10, letterSpacing: 3, fontFamily: THEME.serif,
                minHeight: 44, whiteSpace: 'nowrap',
              }}
            >
              {taken ? '已取' : '取貨'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ─── 三層陪伴
function MobThreeLayer({ member }) {
  const s = member.brief.service;
  const layers = [
    { tier: '居家日常',    en: 'Home',    items: s.home,   n: 'I' },
    { tier: '會員顧問',    en: 'Counsel', items: s.advise, n: 'II' },
    { tier: '俱樂部診所',  en: 'Clinic',  items: s.clinic, n: 'III' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {layers.map((l, i) => (
        <div key={l.tier} className={`in-fade-up in-delay-${i + 1}`} style={{
          background: THEME.cardBg, border: `1px solid ${THEME.line}`,
          padding: '16px 18px',
          borderTop: i === 0 ? `1px solid ${THEME.line}` : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12, paddingBottom: 10, borderBottom: `1px solid ${THEME.lineSoft}` }}>
            <span style={{
              fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 13,
              color: THEME.metal, letterSpacing: 1, minWidth: 22,
            }}>{l.n}</span>
            <div style={{ fontFamily: THEME.serif, fontSize: 16, color: THEME.ink, letterSpacing: 4 }}>{l.tier}</div>
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.metal, letterSpacing: 3 }}>{l.en}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {l.items.map((x, j) => (
              <div key={j} style={{ display: 'grid', gridTemplateColumns: '10px 1fr', gap: 8,
                fontSize: 11, color: THEME.inkSoft, lineHeight: 1.75, letterSpacing: 0.5 }}>
                <span style={{ color: THEME.ink, fontSize: 6, paddingTop: 7 }}>■</span>
                <span>{x}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 俱樂部旅程
function MobJourney({ member }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {member.journey.map((s, i) => {
        const last = i === member.journey.length - 1;
        return (
          <div key={i} className={`in-fade-up in-delay-${Math.min(i + 1, 6)}`}
            style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 14 }}>
            {/* 時間軸 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={s.current ? 'in-pulse' : ''} style={{
                width: 9, height: 9, marginTop: 5,
                background: s.done ? THEME.ink : THEME.cardBg,
                border: `1px solid ${s.current || s.done ? THEME.ink : THEME.metalLine}`,
                boxShadow: s.current ? `0 0 0 3px ${THEME.metalTint}` : 'none',
                transform: 'rotate(45deg)',
              }} />
              {!last && (
                <div style={{ width: 1, flex: 1, background: s.done ? THEME.ink : THEME.line, minHeight: 30 }} />
              )}
            </div>
            <div style={{ paddingBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <div style={{ fontFamily: THEME.serif, fontSize: 15,
                  color: s.current ? THEME.ink : (s.done ? THEME.ink : THEME.inkMute),
                  letterSpacing: 3, fontWeight: s.current ? 500 : 400 }}>{s.label}</div>
                {s.current && (
                  <span style={{ fontSize: 8, color: THEME.cardBg, letterSpacing: 3,
                    padding: '2px 6px', background: THEME.ink }}>進行中</span>
                )}
              </div>
              {s.date && <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 1, marginTop: 3 }}>{s.date}</div>}
            </div>
          </div>
        );
      })}
      {member.brief.followUp.length > 0 && (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {member.brief.followUp.map((f, i) => (
            <div key={f.day} style={{
              background: THEME.surfaceSoft, padding: '12px 14px',
              borderLeft: `2px solid ${THEME.ink}`,
            }}>
              <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 3, marginBottom: 4 }}>
                Day + {f.day}　回訪
              </div>
              <div style={{ fontSize: 11, color: THEME.ink, lineHeight: 1.8, letterSpacing: 0.5 }}>{f.item}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 家族網絡
function MobFamily({ member }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
      {member.family.map((f, i) => {
        const mine = f.role === '本人';
        return (
          <div key={i} className={`in-fade-up in-delay-${Math.min(i + 1, 6)}`} style={{
            background: mine ? THEME.panelGradientSoft : THEME.cardBg,
            color: mine ? THEME.cardBg : THEME.ink,
            border: `1px solid ${mine ? THEME.ink : THEME.line}`,
            padding: '12px 6px 10px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 8,
              color: mine ? THEME.metalSoft : THEME.metal, letterSpacing: 2, marginBottom: 4 }}>{f.role}</div>
            <div style={{ fontFamily: THEME.serif, fontSize: 14, letterSpacing: 2 }}>{f.name}</div>
            <div style={{ fontSize: 8, color: mine ? THEME.metalSoft : THEME.inkMute, margin: '4px 0 6px', letterSpacing: 1 }}>{f.age} 歲</div>
            <div style={{ fontSize: 8, color: mine ? THEME.metalSoft : THEME.inkSoft, letterSpacing: 2 }}>{f.stage}</div>
          </div>
        );
      })}
    </div>
  );
}

function PanelAMobile({ member, viz }) {
  return (
    <div style={{ background: THEME.cardBg, color: THEME.ink, fontFamily: THEME.sans, minHeight: '100%' }}>
      <MobCover member={member} />
      <div style={{ padding: '32px 26px 44px' }}>
        <MobSection n="I"   label="身體訊息"     subtitle="紅色標註的項目值得特別留意。" delay={0.05}>
          <MobBodyMessage member={member} />
        </MobSection>
        <MobSection n="II"  label="身心六感"     subtitle="身體透過六種神經傳導物質表達狀態。" delay={0.1}>
          <MobSixSenses member={member} viz={viz} />
        </MobSection>
        <MobSection n="III" label="量身方向" delay={0.15}>
          <MobDirection member={member} />
        </MobSection>
        <MobSection n="IV"  label="為您推薦" subtitle="點右側「取貨」即安排送達。" delay={0.2}>
          <MobProducts member={member} />
        </MobSection>
        <MobSection n="V"   label="三層陪伴" delay={0.25}>
          <MobThreeLayer member={member} />
        </MobSection>
        <MobSection n="VI"  label="俱樂部旅程" delay={0.3}>
          <MobJourney member={member} />
        </MobSection>
        <MobSection n="VII" label="家族網絡" delay={0.35}>
          <MobFamily member={member} />
        </MobSection>

        {/* 結尾 */}
        <div style={{ textAlign: 'center', paddingTop: 26, borderTop: `1px solid ${THEME.ink}`, marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ width: 30, height: 1, background: THEME.ink }} />
            <span style={{ width: 4, height: 4, background: THEME.ink, transform: 'rotate(45deg)' }} />
            <span style={{ width: 30, height: 1, background: THEME.ink }} />
          </div>
          <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 5 }}>
            {member.id}　·　Private Edition
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PanelAMobile });
