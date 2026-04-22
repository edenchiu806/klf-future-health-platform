// panelA-desktop.jsx — A 面板（會員專屬頁）桌面版 · Ink Noir

function DeskSection({ n, label, en, subtitle, children, delay = 0 }) {
  return (
    <section className="in-fade-up" style={{ animationDelay: `${delay}s`, marginBottom: 60 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
        <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 12, color: THEME.metal, letterSpacing: 2, width: 28 }}>{n}</span>
        <span className="in-hair" style={{ width: 44, height: 1, background: THEME.ink, display: 'block' }} />
        <div style={{ fontFamily: THEME.serif, fontSize: 24, color: THEME.ink, letterSpacing: 5 }}>{label}</div>
        <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 11, color: THEME.metal, letterSpacing: 3, marginLeft: 8 }}>{en}</div>
      </div>
      {subtitle && (
        <div style={{ fontSize: 12, color: THEME.inkSoft, letterSpacing: 1.5, lineHeight: 1.9, marginBottom: 24, marginLeft: 88 }}>
          {subtitle}
        </div>
      )}
      <div style={{ marginLeft: 88 }}>{children}</div>
    </section>
  );
}

function DeskCover({ member }) {
  return (
    <div className="in-fade-in" style={{
      padding: '64px 72px 48px', borderBottom: `1px solid ${THEME.ink}`,
      background: THEME.cardBg, position: 'relative',
    }}>
      <Corners size={22} inset={18} color={THEME.ink} />
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <Eyebrow size={10} letter={8}>Health Atelier</Eyebrow>
        <div style={{ margin: '14px auto 0' }}><HairRule w={50} /></div>
        <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 5, marginTop: 12 }}>
          Private Counsel · Member Edition
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end' }}>
        <div>
          <div style={{ fontSize: 11, color: THEME.metal, letterSpacing: 3, marginBottom: 8 }}>
            敬致　<span style={{ color: THEME.ink }}>{member.level}</span>
          </div>
          <div style={{ fontFamily: THEME.serif, fontSize: 60, fontWeight: 300, color: THEME.ink, letterSpacing: 12, lineHeight: 1.1 }}>
            {member.name}
            <span style={{ fontFamily: THEME.serif, fontSize: 20, color: THEME.inkMute, letterSpacing: 3, marginLeft: 12 }}>先生／女士</span>
          </div>
          <div style={{ marginTop: 22, fontSize: 12, color: THEME.inkSoft, letterSpacing: 1.5, lineHeight: 2, maxWidth: 520 }}>
            謹為閣下整理本季身心狀態與本期建議方向，<br />
            請與您的會員顧問一同審閱。
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, paddingBottom: 4, border: `1px solid ${THEME.line}` }}>
          {[
            { label: 'N°',      value: member.id },
            { label: 'Edition', value: '2026.04.21' },
            { label: 'Revisit', value: member.nextVisit },
          ].map((x, i) => (
            <div key={i} style={{
              padding: '14px 22px',
              borderRight: i < 2 ? `1px solid ${THEME.line}` : 'none',
            }}>
              <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.metal, letterSpacing: 3, marginBottom: 6 }}>{x.label}</div>
              <div style={{ fontFamily: THEME.serif, fontSize: 14, color: THEME.ink, letterSpacing: 2 }}>{x.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeskBodyMessage({ member }) {
  const m = member.lifestyle;
  const items = [
    { label: '睡眠',     value: m.sleep,   unit: '時',   ideal: '7–8',    flag: m.sleep < 6,  en: 'Sleep' },
    { label: '壓力',     value: m.stress,  unit: '／10', ideal: '≤ 4',    flag: m.stress >= 6, en: 'Stress' },
    { label: '疲勞',     value: m.fatigue, unit: '／10', ideal: '≤ 4',    flag: m.fatigue >= 6, en: 'Fatigue' },
    { label: '體態',     value: m.bmi,     unit: 'BMI',  ideal: '22–24',  flag: m.bmi >= 27, en: 'BMI' },
    { label: '腰圍',     value: m.waist,   unit: 'cm',   ideal: '≤ 90',   flag: m.waist >= 90, en: 'Waist' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, border: `1px solid ${THEME.line}` }}>
      {items.map((it, i) => (
        <div key={i} className={`in-fade-up in-delay-${Math.min(i + 1, 5)}`} style={{
          padding: '22px 22px 20px', background: THEME.cardBg,
          borderRight: i < 4 ? `1px solid ${THEME.line}` : 'none',
          borderTop: it.flag ? `2px solid ${THEME.danger}` : 'none',
        }}>
          <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 3, marginBottom: 14 }}>{it.en}</div>
          <div style={{ fontFamily: THEME.serif, fontSize: 14, color: THEME.ink, letterSpacing: 3, marginBottom: 12 }}>{it.label}</div>
          <Metric value={it.value} unit={it.unit} tone={it.flag ? 'danger' : 'ink'} size={36} />
          <div style={{
            marginTop: 14, paddingTop: 10, borderTop: `1px solid ${THEME.lineSoft}`,
            display: 'flex', justifyContent: 'space-between', fontSize: 10, letterSpacing: 1,
          }}>
            <span style={{ color: THEME.metal, fontStyle: 'italic', fontFamily: THEME.serif }}>ideal {it.ideal}</span>
            {it.flag && <span style={{ color: THEME.danger, letterSpacing: 2 }}>● 需關注</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function DeskSixSenses({ member, viz }) {
  if (viz === 'bars')  return <NeuroBars scores={member.nt} />;
  if (viz === 'cards') return <NeuroCards scores={member.nt} columns={3} />;
  return <NeuroHero scores={member.nt} />;
}

function DeskDirection({ member }) {
  const b = member.brief;
  return (
    <div>
      <div className="in-fade-up" style={{
        padding: '32px 36px 30px', marginBottom: 24,
        background: THEME.panelGradient,
        color: THEME.cardBg,
        boxShadow: THEME.darkPanelShadow,
      }}>
        <Eyebrow color={THEME.metalSoft} size={10} letter={6}>This Season · Direction</Eyebrow>
        <div style={{ fontFamily: THEME.serif, fontSize: 32, color: THEME.cardBg, letterSpacing: 6, marginTop: 16, lineHeight: 1.4 }}>
          {b.direction}
        </div>
      </div>
      {b.insights.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${b.insights.length}, 1fr)`, gap: 0, marginBottom: 28, border: `1px solid ${THEME.line}` }}>
          {b.insights.map((x, i) => (
            <div key={i} className={`in-fade-up in-delay-${i + 1}`} style={{
              padding: '22px 24px',
              borderRight: i < b.insights.length - 1 ? `1px solid ${THEME.line}` : 'none',
            }}>
              <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 13, color: THEME.metal, letterSpacing: 1, marginBottom: 10 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: THEME.serif, fontSize: 17, color: THEME.ink, letterSpacing: 4, marginBottom: 8 }}>{x.label}</div>
              <div style={{ fontSize: 12, color: THEME.inkSoft, lineHeight: 1.9, letterSpacing: 1 }}>{x.detail}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 20, padding: '20px 24px', background: THEME.surfaceSoft }}>
        <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 12, color: THEME.metal, letterSpacing: 4, paddingTop: 4 }}>Why</div>
        <div style={{ fontSize: 13, color: THEME.ink, lineHeight: 2.1, letterSpacing: 1 }}>{b.reason}</div>
      </div>
    </div>
  );
}

function DeskProducts({ member }) {
  const [picked, setPicked] = React.useState({});
  const b = member.brief;
  if (!b.products.length) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, border: `1px solid ${THEME.line}` }}>
      {b.products.map((pid, i) => {
        const p = PRODUCTS[pid];
        const taken = !!picked[pid];
        return (
          <div key={pid} className={`in-fade-up in-delay-${Math.min(i + 1, 6)}`} style={{
            background: THEME.cardBg,
            padding: '26px 28px', display: 'grid', gridTemplateColumns: '88px 1fr auto', gap: 22, alignItems: 'center',
            borderRight: i % 2 === 0 ? `1px solid ${THEME.line}` : 'none',
            borderBottom: i < b.products.length - 2 ? `1px solid ${THEME.line}` : 'none',
          }}>
            <div style={{
              width: 88, height: 112, background: THEME.surfaceSoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', border: `1px solid ${THEME.metalLine}`,
            }}>
              <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 1, position: 'absolute', top: 8, left: 10 }}>N°</span>
              <span style={{ fontFamily: THEME.serif, fontSize: 28, color: THEME.ink, letterSpacing: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <div>
              <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 3, marginBottom: 8 }}>{p.tag}</div>
              <div style={{ fontFamily: THEME.serif, fontSize: 20, color: THEME.ink, letterSpacing: 3, lineHeight: 1.4, marginBottom: 8 }}>
                {p.name}
              </div>
              <div style={{ fontSize: 10, color: THEME.inkMute, letterSpacing: 2 }}>{p.unit}</div>
            </div>
            <button
              className="in-btn"
              onClick={() => setPicked(s => ({ ...s, [pid]: !s[pid] }))}
              style={{
                padding: '11px 22px',
                background: taken ? THEME.cardBg : THEME.ink,
                color: taken ? THEME.ink : THEME.cardBg,
                border: `1px solid ${THEME.ink}`,
                fontSize: 11, letterSpacing: 5, fontFamily: THEME.serif,
                whiteSpace: 'nowrap',
              }}
            >
              {taken ? '已取貨' : '取　貨'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function DeskThreeLayer({ member }) {
  const s = member.brief.service;
  const layers = [
    { tier: '居家日常',    en: 'Home',    items: s.home,   note: '日常節奏與習慣', n: 'I' },
    { tier: '會員顧問',    en: 'Counsel', items: s.advise, note: '專屬關心與回訪', n: 'II' },
    { tier: '俱樂部診所',  en: 'Clinic',  items: s.clinic, note: '必要時的醫療介面', n: 'III' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${THEME.line}` }}>
      {layers.map((l, i) => (
        <div key={l.tier} className={`in-fade-up in-delay-${i + 1}`} style={{
          background: THEME.cardBg,
          padding: '28px 28px 24px',
          borderRight: i < 2 ? `1px solid ${THEME.line}` : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${THEME.ink}` }}>
            <span style={{
              fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 20,
              color: THEME.metal, letterSpacing: 1, minWidth: 30,
            }}>{l.n}</span>
            <div>
              <div style={{ fontFamily: THEME.serif, fontSize: 20, color: THEME.ink, letterSpacing: 4 }}>{l.tier}</div>
              <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 3, marginTop: 2 }}>{l.en} · {l.note}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {l.items.map((x, j) => (
              <div key={j} style={{ display: 'grid', gridTemplateColumns: '10px 1fr', gap: 10, fontSize: 12, color: THEME.inkSoft, lineHeight: 1.8, letterSpacing: 0.5 }}>
                <span style={{ color: THEME.ink, fontSize: 6, paddingTop: 8 }}>■</span>
                <span>{x}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DeskJourney({ member }) {
  const stages = member.journey;
  return (
    <div>
      <div style={{ position: 'relative', padding: '10px 0 26px' }}>
        <div style={{ position: 'absolute', top: 42, left: 24, right: 24, height: 1, background: THEME.line }} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stages.length}, 1fr)`, position: 'relative' }}>
          {stages.map((s, i) => {
            const filled = s.done;
            const current = s.current;
            return (
              <div key={i} className={`in-fade-up in-delay-${Math.min(i + 1, 6)}`}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 2 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className={current ? 'in-pulse' : ''} style={{
                  width: 12, height: 12,
                  background: filled ? THEME.ink : THEME.cardBg,
                  border: `1.5px solid ${current ? THEME.ink : (filled ? THEME.ink : THEME.metalLine)}`,
                  boxShadow: current ? `0 0 0 5px ${THEME.metalTint}` : 'none',
                  transform: 'rotate(45deg)',
                }} />
                <div style={{ fontFamily: THEME.serif, fontSize: 13,
                  color: current ? THEME.ink : (filled ? THEME.ink : THEME.inkMute),
                  letterSpacing: 3, textAlign: 'center', fontWeight: current ? 500 : 400 }}>{s.label}</div>
                {s.date && <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 1 }}>{s.date}</div>}
              </div>
            );
          })}
        </div>
      </div>
      {member.brief.followUp.length > 0 && (
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${THEME.line}` }}>
          {member.brief.followUp.map((f, i) => (
            <div key={f.day} className={`in-fade-up in-delay-${i + 1}`} style={{
              background: THEME.surfaceSoft, padding: '18px 22px 16px',
              borderLeft: i === 0 ? 'none' : `1px solid ${THEME.line}`,
              borderTop: `2px solid ${THEME.ink}`,
            }}>
              <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 12, color: THEME.metal, letterSpacing: 4, marginBottom: 8 }}>
                Day + {f.day}
              </div>
              <div style={{ fontSize: 12, color: THEME.ink, lineHeight: 1.8, letterSpacing: 1 }}>{f.item}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeskFamily({ member }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(${Math.min(member.family.length, 7)}, 1fr)`,
      gap: 0, border: `1px solid ${THEME.line}`,
    }}>
      {member.family.map((f, i) => {
        const mine = f.role === '本人';
        return (
          <div key={i} className={`in-fade-up in-delay-${Math.min(i + 1, 6)}`} style={{
            background: mine ? THEME.panelGradientSoft : THEME.cardBg,
            color: mine ? THEME.cardBg : THEME.ink,
            padding: '20px 12px 18px', textAlign: 'center',
            borderRight: i < member.family.length - 1 ? `1px solid ${mine ? THEME.inkDeep : THEME.line}` : 'none',
          }}>
            <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9,
              color: mine ? THEME.metalSoft : THEME.metal, letterSpacing: 3, marginBottom: 10 }}>{f.role}</div>
            <div style={{ fontFamily: THEME.serif, fontSize: 17, letterSpacing: 3 }}>{f.name}</div>
            <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10,
              color: mine ? THEME.metalSoft : THEME.inkMute, margin: '5px 0 12px', letterSpacing: 1 }}>{f.age} 歲</div>
            <div style={{ fontSize: 9,
              color: mine ? THEME.metalSoft : THEME.inkSoft, letterSpacing: 2 }}>{f.stage}</div>
          </div>
        );
      })}
    </div>
  );
}

function PanelADesktop({ member, viz }) {
  return (
    <div style={{ background: THEME.cardBg, color: THEME.ink, fontFamily: THEME.sans, minHeight: '100%' }}>
      <DeskCover member={member} />
      <div style={{ padding: '64px 72px 72px' }}>
        <DeskSection n="I"   label="身體訊息" en="Body Signals"
          subtitle="這些是您最近的生活紀錄；紅色標註的項目值得特別留意。" delay={0.05}>
          <DeskBodyMessage member={member} />
        </DeskSection>
        <DeskSection n="II"  label="身心六感" en="Six Senses"
          subtitle="身體透過六種神經傳導物質表達狀態；多巴胺、催產素、血清素、皮質醇、腦內啡、睪固酮。" delay={0.1}>
          <DeskSixSenses member={member} viz={viz} />
        </DeskSection>
        <DeskSection n="III" label="量身方向" en="Direction" delay={0.15}>
          <DeskDirection member={member} />
        </DeskSection>
        <DeskSection n="IV"  label="為您推薦" en="Selected for You"
          subtitle="依身心六感結果，從康樂富產品系列中為您選出本期照顧起點；點選右側「取貨」即安排送達。" delay={0.2}>
          <DeskProducts member={member} />
        </DeskSection>
        <DeskSection n="V"   label="三層陪伴" en="Three Layers" delay={0.25}>
          <DeskThreeLayer member={member} />
        </DeskSection>
        <DeskSection n="VI"  label="俱樂部旅程" en="Journey" delay={0.3}>
          <DeskJourney member={member} />
        </DeskSection>
        <DeskSection n="VII" label="家族網絡" en="Family" delay={0.35}>
          <DeskFamily member={member} />
        </DeskSection>
        <div style={{ textAlign: 'center', paddingTop: 44, borderTop: `1px solid ${THEME.ink}` }}>
          <HairRule w={60} />
          <div style={{ marginTop: 18, fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 11, color: THEME.metal, letterSpacing: 8 }}>
            Health Atelier　·　{member.id}　·　Private Edition
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PanelADesktop });
