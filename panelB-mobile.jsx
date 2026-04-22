// panelB-mobile.jsx — B 面板（團隊協作台）手機版 · Ink Noir

function MobBSection({ n, label, right, children }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
        <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 2, minWidth: 18 }}>{n}</span>
        <span className="in-hair" style={{ width: 22, height: 1, background: THEME.ink, display: 'block' }} />
        <div style={{ fontFamily: THEME.serif, fontSize: 17, color: THEME.ink, letterSpacing: 4 }}>{label}</div>
        <span style={{ flex: 1 }} />
        {right}
      </div>
      {children}
    </section>
  );
}

function MobBCasePool({ cases, focusId, onFocus }) {
  const [filter, setFilter] = React.useState('all');
  const stages = ['all', 'ai', 'test', 'product', 'follow', 'intro'];
  const labelOf = s => s === 'all' ? '全部' : STAGE_META[s]?.label || s;
  const filtered = filter === 'all' ? cases : cases.filter(c => c.stage === filter);
  return (
    <div>
      <div className="in-scroll" style={{ display: 'flex', gap: 0, marginBottom: 12, overflowX: 'auto', paddingBottom: 4, border: `1px solid ${THEME.line}` }}>
        {stages.map(s => {
          const active = filter === s;
          return (
            <button key={s} className="in-btn" onClick={() => setFilter(s)} style={{
              background: active ? THEME.ink : 'transparent',
              color: active ? THEME.cardBg : THEME.inkSoft,
              border: 'none',
              padding: '8px 14px', fontSize: 10, letterSpacing: 2, whiteSpace: 'nowrap', flexShrink: 0,
              fontFamily: THEME.serif,
            }}>{labelOf(s)}</button>
          );
        })}
      </div>
      <div style={{ border: `1px solid ${THEME.line}` }}>
        {filtered.map((c, i) => {
          const active = c.id === focusId;
          return (
            <div key={c.id} className="in-btn" onClick={() => onFocus(c.id)} style={{
              padding: '14px 16px', cursor: 'pointer',
              background: active ? THEME.surfaceSoft : THEME.cardBg,
              borderLeft: `2px solid ${active ? THEME.ink : 'transparent'}`,
              borderBottom: i < filtered.length - 1 ? `1px solid ${THEME.lineSoft}` : 'none',
              minHeight: 44,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: THEME.serif, fontSize: 15, color: THEME.ink, letterSpacing: 3 }}>{c.name}</div>
                <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 2 }}>{STAGE_META[c.stage]?.label}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: THEME.inkMute, marginTop: 4, letterSpacing: 1 }}>
                <span style={{ fontFamily: THEME.serif, fontStyle: 'italic' }}>{c.id}</span>
                {c.risk && <span style={{ color: THEME.danger, letterSpacing: 2 }}>
                  ● {c.risk === 'noMember' ? '未入會' : '資料不足'}
                </span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobBRoleMatrix({ focusCase }) {
  const roles = [
    { key: 'sales',  label: '業務',       en: 'Sales' },
    { key: 'clinic', label: '俱樂部診所', en: 'Clinic' },
    { key: 'ops',    label: '後勤',       en: 'Operations' },
    { key: 'ai',     label: 'AI 系統',    en: 'AI' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1px solid ${THEME.line}` }}>
      {roles.map((r, i) => (
        <div key={r.key} className={`in-fade-up in-delay-${i + 1}`} style={{
          background: THEME.cardBg,
          padding: '14px 16px',
          borderBottom: i < roles.length - 1 ? `1px solid ${THEME.lineSoft}` : 'none',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.metal, letterSpacing: 2 }}>{r.en}</span>
              <span style={{ fontFamily: THEME.serif, fontSize: 14, color: THEME.ink, letterSpacing: 3 }}>{r.label}</span>
            </div>
            <span style={{ fontSize: 9, color: THEME.inkMute, letterSpacing: 1 }}>{focusCase.owners[r.key]}</span>
          </div>
          <div style={{ fontSize: 11, color: THEME.ink, lineHeight: 1.7, letterSpacing: 0.5 }}>
            <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', color: THEME.metal, fontSize: 9, letterSpacing: 2, marginRight: 6 }}>next</span>
            {focusCase.next[r.key]}
          </div>
        </div>
      ))}
    </div>
  );
}

function MobBSync() {
  const items = [
    { label: '檢測套件', status: '已寄出', detail: '04.22 送達',             tone: 'good' },
    { label: '產品訂單', status: '備貨中', detail: '魚油 ×2 / 靈光飲 ×1',   tone: 'warn' },
    { label: '診所預約', status: '已確認', detail: '李怡君 05.12 14:00',     tone: 'good' },
    { label: 'AI 觸發', status: '待執行', detail: 'D+7 量表',               tone: 'ink' },
  ];
  const toneColor = t => t === 'good' ? THEME.good : t === 'warn' ? THEME.warn : THEME.inkMute;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
      {items.map((x, i) => (
        <div key={i} className={`in-fade-up in-delay-${i + 1}`} style={{
          padding: '12px 14px', background: THEME.cardBg, border: `1px solid ${THEME.line}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <span style={{ fontFamily: THEME.serif, fontSize: 13, color: THEME.ink, letterSpacing: 3 }}>{x.label}</span>
            <span style={{ width: 5, height: 5, background: toneColor(x.tone), transform: 'rotate(45deg)' }} />
          </div>
          <div style={{ fontSize: 9, color: toneColor(x.tone), letterSpacing: 2, marginBottom: 3 }}>{x.status}</div>
          <div style={{ fontSize: 9, color: THEME.inkMute, letterSpacing: 1, lineHeight: 1.5 }}>{x.detail}</div>
        </div>
      ))}
    </div>
  );
}

function MobBRisk({ cases }) {
  const risks = cases.filter(c => c.risk);
  if (risks.length === 0) return (
    <div style={{ fontSize: 10, color: THEME.inkMute, letterSpacing: 2, padding: 14, border: `1px dashed ${THEME.line}`, textAlign: 'center', fontFamily: THEME.serif, fontStyle: 'italic' }}>
      目前無高風險案件
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {risks.map((r, i) => (
        <div key={i} style={{ padding: '12px 14px', background: THEME.dangerBg, borderLeft: `2px solid ${THEME.danger}` }}>
          <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.danger, letterSpacing: 3, marginBottom: 4 }}>
            {r.risk === 'noMember' ? '未入會' : '資料不足'}
          </div>
          <div style={{ fontFamily: THEME.serif, fontSize: 13, color: THEME.ink, letterSpacing: 2 }}>{r.name} · {r.id}</div>
        </div>
      ))}
    </div>
  );
}

function PanelBMobile({ cases, focusId, onFocus, member }) {
  const focusCase = cases.find(c => c.id === focusId) || cases[0];
  return (
    <div style={{ background: THEME.cardBg, minHeight: '100%', fontFamily: THEME.sans }}>
      <div className="in-fade-in" style={{
        padding: '34px 24px 26px', borderBottom: `1px solid ${THEME.line}`,
        background: THEME.cardBg, position: 'relative',
      }}>
        <Corners size={12} inset={12} color={THEME.ink} />
        <Eyebrow size={8} letter={5}>Team Console</Eyebrow>
        <div style={{ fontFamily: THEME.serif, fontSize: 28, color: THEME.ink, letterSpacing: 6, marginTop: 10 }}>
          協作工作台
        </div>
        <div style={{ display: 'flex', gap: 0, marginTop: 18, borderTop: `1px solid ${THEME.line}` }}>
          {[
            { label: '進行中', value: cases.length, tone: 'ink' },
            { label: '需關注', value: cases.filter(c => c.risk).length, tone: 'danger' },
            { label: '本週回訪', value: 2, tone: 'ink' },
          ].map((x, i) => (
            <div key={i} style={{
              flex: 1, padding: '12px 8px',
              borderRight: i < 2 ? `1px solid ${THEME.line}` : 'none',
            }}>
              <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.metal, letterSpacing: 2, marginBottom: 4 }}>{x.label}</div>
              <Metric value={x.value} tone={x.tone} size={22} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '28px 24px 44px' }}>
        <MobBSection n="I" label="案件池">
          <MobBCasePool cases={cases} focusId={focusCase.id} onFocus={onFocus} />
        </MobBSection>

        <div className="in-fade-in" style={{
          padding: '20px 20px', marginBottom: 28,
          background: THEME.panelGradientElevated,
          color: THEME.cardBg,
          boxShadow: THEME.darkPanelShadow,
        }}>
          <Eyebrow size={8} letter={5} color={THEME.metalSoft}>Focus</Eyebrow>
          <div style={{ fontFamily: THEME.serif, fontSize: 22, letterSpacing: 4, marginTop: 10 }}>
            {focusCase.name}
            <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 11, color: THEME.metalSoft, letterSpacing: 1, marginLeft: 10 }}>{focusCase.id}</span>
          </div>
          <div style={{ fontSize: 9, color: THEME.metalSoft, letterSpacing: 3, marginTop: 6, fontFamily: THEME.serif, fontStyle: 'italic' }}>
            Stage · {STAGE_META[focusCase.stage]?.label}
          </div>
          <div style={{ fontSize: 11, color: THEME.metalSoft, lineHeight: 1.8, letterSpacing: 0.5, marginTop: 10 }}>
            {focusCase.summary}
          </div>
        </div>

        <MobBSection n="II" label="角色分工">
          <MobBRoleMatrix focusCase={focusCase} />
        </MobBSection>

        <MobBSection n="III" label="同步">
          <MobBSync />
        </MobBSection>

        <MobBSection n="IV" label="風險">
          <MobBRisk cases={cases} />
        </MobBSection>
      </div>
    </div>
  );
}

Object.assign(window, { PanelBMobile });
