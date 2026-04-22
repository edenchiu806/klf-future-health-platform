// panelB-desktop.jsx — B 面板（團隊協作台）桌面版 · Ink Noir
//   三欄：案件池（左）· 當前焦點+角色分工（中）· 同步+風險（右）

function BDeskSection({ n, label, en, right, children, pad = true }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
        <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 11, color: THEME.metal, letterSpacing: 2, minWidth: 20 }}>{n}</span>
        <span className="in-hair" style={{ width: 24, height: 1, background: THEME.ink, display: 'block' }} />
        <div style={{ fontFamily: THEME.serif, fontSize: 17, color: THEME.ink, letterSpacing: 4 }}>{label}</div>
        <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 2 }}>{en}</div>
        <span style={{ flex: 1 }} />
        {right}
      </div>
      {children}
    </section>
  );
}

function BDeskCasePool({ cases, focusId, onFocus }) {
  const [filter, setFilter] = React.useState('all');
  const stages = ['all', 'ai', 'test', 'product', 'follow', 'intro'];
  const labelOf = s => s === 'all' ? '全部' : STAGE_META[s]?.label || s;
  const filtered = filter === 'all' ? cases : cases.filter(c => c.stage === filter);

  return (
    <div>
      <div style={{ display: 'flex', gap: 0, marginBottom: 14, border: `1px solid ${THEME.line}`, overflow: 'hidden' }}>
        {stages.map(s => {
          const active = filter === s;
          return (
            <button key={s} className="in-btn" onClick={() => setFilter(s)} style={{
              flex: 1, background: active ? THEME.ink : THEME.cardBg,
              color: active ? THEME.cardBg : THEME.inkSoft,
              border: 'none', padding: '9px 6px',
              fontSize: 11, letterSpacing: 2, fontFamily: THEME.serif,
              whiteSpace: 'nowrap',
            }}>{labelOf(s)}</button>
          );
        })}
      </div>

      <div style={{ border: `1px solid ${THEME.line}` }}>
        {filtered.map((c, i) => {
          const active = c.id === focusId;
          return (
            <div key={c.id} className="in-btn" onClick={() => onFocus(c.id)} style={{
              padding: '14px 18px', cursor: 'pointer',
              background: active ? THEME.surfaceSoft : THEME.cardBg,
              borderLeft: `2px solid ${active ? THEME.ink : 'transparent'}`,
              borderBottom: i < filtered.length - 1 ? `1px solid ${THEME.lineSoft}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ fontFamily: THEME.serif, fontSize: 16, color: THEME.ink, letterSpacing: 3 }}>{c.name}</div>
                <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 2 }}>
                  {STAGE_META[c.stage]?.label}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 10, color: THEME.inkMute, letterSpacing: 1 }}>
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

function BDeskFocus({ focusCase }) {
  return (
    <div className="in-fade-in" style={{
      background: THEME.panelGradient,
      color: THEME.cardBg,
      padding: '28px 32px 26px', marginBottom: 24,
      boxShadow: THEME.darkPanelShadow,
    }}>
      <Eyebrow color={THEME.metalSoft} size={9} letter={5}>Focus Case</Eyebrow>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
        <div style={{ fontFamily: THEME.serif, fontSize: 32, letterSpacing: 6, lineHeight: 1.2 }}>
          {focusCase.name}
        </div>
        <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 13, color: THEME.metalSoft, letterSpacing: 2 }}>
          {focusCase.id}
        </div>
        <span style={{ flex: 1 }} />
        <div style={{
          padding: '5px 12px', border: `1px solid ${THEME.metalLine}`,
          fontFamily: THEME.serif, fontSize: 11, color: THEME.cardBg, letterSpacing: 3,
        }}>
          Stage · {STAGE_META[focusCase.stage]?.label}
        </div>
      </div>
      <div style={{ marginTop: 14, fontSize: 12, color: THEME.metalSoft, lineHeight: 1.9, letterSpacing: 0.5, maxWidth: 680 }}>
        {focusCase.summary}
      </div>
    </div>
  );
}

function BDeskRoleMatrix({ focusCase }) {
  const roles = [
    { key: 'sales',  label: '業務',       en: 'Sales',       desc: '建立信任、引導入會' },
    { key: 'clinic', label: '俱樂部診所', en: 'Clinic',      desc: '深度檢測、醫療介面' },
    { key: 'ops',    label: '後勤',       en: 'Operations',  desc: '物流、排程、記錄' },
    { key: 'ai',     label: 'AI 系統',    en: 'AI',          desc: '解讀、建議、觸發' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      {roles.map((r, i) => (
        <div key={r.key} className={`in-fade-up in-delay-${i + 1} in-lift`} style={{
          background: THEME.cardBg, border: `1px solid ${THEME.line}`,
          padding: '18px 20px 16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${THEME.lineSoft}` }}>
            <div>
              <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.metal, letterSpacing: 3, marginBottom: 2 }}>{r.en}</div>
              <div style={{ fontFamily: THEME.serif, fontSize: 17, color: THEME.ink, letterSpacing: 4 }}>{r.label}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.metal, letterSpacing: 2, marginBottom: 2 }}>Owner</div>
              <div style={{ fontSize: 11, color: THEME.ink, letterSpacing: 1 }}>{focusCase.owners[r.key]}</div>
            </div>
          </div>
          <div style={{ fontSize: 10, color: THEME.inkMute, letterSpacing: 1, marginBottom: 10, fontStyle: 'italic', fontFamily: THEME.serif }}>
            {r.desc}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.metal, letterSpacing: 2, paddingTop: 3 }}>Next</span>
            <span style={{ fontSize: 12, color: THEME.ink, lineHeight: 1.7, letterSpacing: 0.5, flex: 1 }}>{focusCase.next[r.key]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BDeskCoNotes({ focusCase }) {
  return (
    <div className="in-fade-up" style={{
      background: THEME.surfaceSoft, border: `1px solid ${THEME.line}`,
      padding: '20px 22px', marginBottom: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
        <Eyebrow size={9} letter={4}>Co-Notes · AI 共筆</Eyebrow>
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 2 }}>
          updated 04.20
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { by: 'AI', note: '建議優先處理睡眠與壓力軸；產品清單已自動帶入取貨單。', date: '04.20 10:14' },
          { by: '業務 · 林慧', note: '已聯繫，預計週五上午到店。', date: '04.20 14:30' },
          { by: 'AI', note: 'D+7 自動觸發感受量表；若紅旗出現 → 優先轉診。', date: '04.20 10:14' },
        ].map((x, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 14,
            padding: '8px 0', borderBottom: i < 2 ? `1px dashed ${THEME.line}` : 'none',
            alignItems: 'baseline',
          }}>
            <span style={{ fontFamily: THEME.serif, fontSize: 11, color: THEME.ink, letterSpacing: 2 }}>{x.by}</span>
            <span style={{ fontSize: 12, color: THEME.inkSoft, lineHeight: 1.7, letterSpacing: 0.5 }}>{x.note}</span>
            <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 1 }}>{x.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BDeskSync() {
  const items = [
    { label: '檢測套件', status: '已寄出', detail: '04.22 送達',              tone: 'good' },
    { label: '產品訂單', status: '備貨中', detail: '魚油 ×2 / 靈光飲 ×1',    tone: 'warn' },
    { label: '診所預約', status: '已確認', detail: '李怡君 · 05.12 14:00',    tone: 'good' },
    { label: 'AI 觸發', status: '待執行', detail: 'D+7 感受量表',            tone: 'ink' },
  ];
  const toneColor = t => t === 'good' ? THEME.good : t === 'warn' ? THEME.warn : THEME.ink;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
      {items.map((x, i) => (
        <div key={i} className={`in-fade-up in-delay-${i + 1}`} style={{
          padding: '14px 16px 12px', background: THEME.cardBg, border: `1px solid ${THEME.line}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ fontFamily: THEME.serif, fontSize: 14, color: THEME.ink, letterSpacing: 3 }}>{x.label}</span>
            <span style={{ width: 6, height: 6, background: toneColor(x.tone), transform: 'rotate(45deg)' }} />
          </div>
          <div style={{ fontSize: 10, color: toneColor(x.tone), letterSpacing: 2, marginBottom: 4 }}>{x.status}</div>
          <div style={{ fontSize: 10, color: THEME.inkMute, letterSpacing: 1, lineHeight: 1.6 }}>{x.detail}</div>
        </div>
      ))}
    </div>
  );
}

function BDeskRisk({ cases }) {
  const risks = cases.filter(c => c.risk);
  if (risks.length === 0) return (
    <div style={{ fontSize: 11, color: THEME.inkMute, letterSpacing: 2, padding: 16, border: `1px dashed ${THEME.line}`, textAlign: 'center', fontFamily: THEME.serif, fontStyle: 'italic' }}>
      目前無高風險案件
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {risks.map((r, i) => (
        <div key={i} className="in-fade-up" style={{
          padding: '12px 16px', background: THEME.dangerBg, borderLeft: `2px solid ${THEME.danger}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontFamily: THEME.serif, fontSize: 13, color: THEME.ink, letterSpacing: 2 }}>{r.name}</div>
            <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.danger, letterSpacing: 2 }}>
              {r.risk === 'noMember' ? '未入會' : '資料不足'}
            </div>
          </div>
          <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 1, marginTop: 3 }}>
            {r.id}
          </div>
        </div>
      ))}
    </div>
  );
}

function PanelBDesktop({ cases, focusId, onFocus, member }) {
  const focusCase = cases.find(c => c.id === focusId) || cases[0];
  return (
    <div style={{ background: THEME.cardBg, color: THEME.ink, fontFamily: THEME.sans, minHeight: '100%' }}>
      {/* 頂部抬頭 */}
      <div className="in-fade-in" style={{
        padding: '40px 56px 32px', borderBottom: `1px solid ${THEME.line}`,
        background: THEME.cardBg, position: 'relative',
      }}>
        <Corners size={18} inset={14} color={THEME.ink} />
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <Eyebrow size={10} letter={6}>Team Console · 搭檔協作台</Eyebrow>
            <div style={{ fontFamily: THEME.serif, fontSize: 40, fontWeight: 400, color: THEME.ink, letterSpacing: 8, marginTop: 12, lineHeight: 1.1 }}>
              協作工作台
            </div>
            <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 11, color: THEME.metal, letterSpacing: 3, marginTop: 8 }}>
              Sales · Clinic · Ops · AI ／ 四人一組
            </div>
          </div>
          <div style={{ display: 'flex', gap: 0, border: `1px solid ${THEME.line}` }}>
            {[
              { label: '進行中', value: cases.length, tone: 'ink' },
              { label: '需關注', value: cases.filter(c => c.risk).length, tone: 'danger' },
              { label: '本週回訪', value: 2, tone: 'ink' },
              { label: '待診', value: 1, tone: 'warn' },
            ].map((x, i) => (
              <div key={i} style={{
                padding: '14px 22px',
                borderRight: i < 3 ? `1px solid ${THEME.line}` : 'none',
                minWidth: 90,
              }}>
                <div style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 10, color: THEME.metal, letterSpacing: 2, marginBottom: 6 }}>{x.label}</div>
                <Metric value={x.value} tone={x.tone} size={26} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 三欄主體 */}
      <div style={{
        display: 'grid', gridTemplateColumns: '300px 1fr 280px',
        gap: 32, padding: '36px 56px 56px',
      }}>
        {/* 左欄：案件池 */}
        <div>
          <BDeskSection n="I" label="案件池" en="Case Pool">
            <BDeskCasePool cases={cases} focusId={focusCase.id} onFocus={onFocus} />
          </BDeskSection>
        </div>

        {/* 中欄：焦點 + 角色 + 共筆 */}
        <div>
          <BDeskFocus focusCase={focusCase} />
          <BDeskSection n="II" label="角色分工" en="Roles & Actions">
            <BDeskRoleMatrix focusCase={focusCase} />
          </BDeskSection>
          <BDeskSection n="III" label="AI 共筆" en="Co-Notes">
            <BDeskCoNotes focusCase={focusCase} />
          </BDeskSection>
        </div>

        {/* 右欄：同步 + 風險 */}
        <div>
          <BDeskSection n="IV" label="同步" en="Pipeline">
            <BDeskSync />
          </BDeskSection>
          <BDeskSection n="V" label="風險" en="Risk">
            <BDeskRisk cases={cases} />
          </BDeskSection>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PanelBDesktop });
