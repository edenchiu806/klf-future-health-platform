// radar.jsx — 身心六感（六角雷達圖）
// 設計方向：
// 1. 電腦版恢復左側雷達圖、右側數值卡
// 2. 雷達圖六角外保留中文名、英文名、數值
// 3. 座標從中心 0 開始計算，拉開低分與高分差距

function polar(cx, cy, r, deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function scoreValue(scores, key) {
  const raw = Number(scores[key] || 0);
  const value = key === 'cor' ? (100 - raw) : raw;
  return Math.max(0, Math.min(100, value));
}

function compositeScore(scores) {
  return Math.round(
    NT_SCHEMA.reduce((sum, axis) => sum + scoreValue(scores, axis.key), 0) / NT_SCHEMA.length
  );
}

function withAlpha(hex, alpha) {
  const base = typeof hex === 'string' ? hex : THEME.metalLine;
  const clean = base.replace('#', '');
  const parts = clean.length === 3
    ? clean.split('').map((part) => part + part)
    : [clean.slice(0, 2), clean.slice(2, 4), clean.slice(4, 6)];
  const [r, g, b] = parts.map((part) => parseInt(part, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function pointsString(points) {
  return points.map((point) => `${point.x},${point.y}`).join(' ');
}

function compositeTone(value) {
  if (value < 40) return { label: '需優先調整', color: THEME.danger, bg: THEME.dangerBg };
  if (value < 60) return { label: '需留意', color: THEME.warn, bg: THEME.warnBg };
  if (value < 80) return { label: '良好', color: THEME.good, bg: THEME.goodBg };
  return { label: '理想', color: THEME.good, bg: THEME.goodBg };
}

function toneAccentColor(tone) {
  if (!tone) return THEME.ink;
  return tone.color || THEME.ink;
}

function valueDisplayColor(tone) {
  if (!tone) return THEME.ink;
  if (tone.tone === 'danger') return THEME.danger;
  if (tone.tone === 'warn') return THEME.warn;
  return THEME.ink;
}

function senseNarrative(entry, compact = false) {
  const intro = `${entry.name}關係到${entry.meaning}`;

  if (entry.key === 'cor') {
    if (entry.raw >= 60) {
      return compact
        ? `${intro}，目前偏向${entry.feeling}。`
        : `${intro}，目前壓力負荷偏高，身體比較容易出現${entry.feeling}的傾向。`;
    }
    return compact
      ? `${intro}，目前較接近${entry.feeling}。`
      : `${intro}，目前壓力回復相對穩定，整體狀態較接近${entry.feeling}。`;
  }

  if (entry.value < 40) {
    return compact
      ? `${intro}，目前偏低。`
      : `${intro}，目前分數偏低，日常裡比較容易出現${entry.feeling}的狀態。`;
  }

  if (entry.value < 60) {
    return compact
      ? `${intro}，目前需留意。`
      : `${intro}，目前還有些不足，近期比較容易出現${entry.feeling}的感受。`;
  }

  if (entry.value < 80) {
    return compact
      ? `${intro}，目前良好。`
      : `${intro}，目前維持在不錯的區間，整體表現較接近${entry.feeling}。`;
  }

  return compact
    ? `${intro}，目前理想。`
    : `${intro}，目前表現理想，身心反應多半會更接近${entry.feeling}。`;
}

function senseEntries(scores) {
  return NT_SCHEMA.map((axis, index) => {
    const raw = Number(scores[axis.key] || 0);
    const value = scoreValue(scores, axis.key);
    const tone = toneFor(raw, axis.key);
    const feeling = axis.key === 'cor'
      ? (raw >= 60 ? axis.high : axis.low)
      : (value >= 60 ? axis.high : axis.low);

    return {
      ...axis,
      index,
      raw,
      value,
      tone,
      feeling,
      angle: index * 60,
    };
  });
}

function axisAnchor(angle) {
  if (angle === 0) {
    return { transform: 'translate(-50%, -100%)', alignItems: 'center', textAlign: 'center' };
  }
  if (angle === 180) {
    return { transform: 'translate(-50%, 0)', alignItems: 'center', textAlign: 'center' };
  }
  if (angle < 180) {
    return { transform: 'translate(0, -50%)', alignItems: 'flex-start', textAlign: 'left' };
  }
  return { transform: 'translate(-100%, -50%)', alignItems: 'flex-end', textAlign: 'right' };
}

function leaderRadiusOffset(angle) {
  if (angle === 0 || angle === 180) return 26;
  return 20;
}

function NeuroRadar({ scores, size = 420, compact = false }) {
  const cx = size / 2;
  const cy = size / 2;
  const levels = [20, 40, 60, 80, 100];
  const outerPlotRadius = size * (compact ? 0.34 : 0.35);
  const labelOffsetX = size * (compact ? 0.026 : 0.03);
  const fillId = compact ? 'sense-fill-compact' : 'sense-fill-desktop';
  const glowId = compact ? 'sense-glow-compact' : 'sense-glow-desktop';
  const plateId = compact ? 'sense-plate-compact' : 'sense-plate-desktop';
  const entries = senseEntries(scores);
  const axisAngles = entries.map((entry) => entry.angle);
  const polygonPoints = entries.map((entry) =>
    polar(cx, cy, outerPlotRadius * (entry.value / 100), entry.angle)
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <defs>
        <radialGradient id={fillId} cx="50%" cy="42%" r="68%">
          <stop offset="0%" stopColor={withAlpha(THEME.metalSoft, compact ? 0.24 : 0.2)} />
          <stop offset="70%" stopColor={withAlpha(THEME.metal, compact ? 0.12 : 0.1)} />
          <stop offset="100%" stopColor={withAlpha(THEME.metalTint, 0.03)} />
        </radialGradient>
        <radialGradient id={glowId} cx="50%" cy="50%" r="54%">
          <stop offset="0%" stopColor={withAlpha(THEME.metalTint, 0.9)} />
          <stop offset="100%" stopColor={withAlpha(THEME.metalTint, 0)} />
        </radialGradient>
        <radialGradient id={plateId} cx="50%" cy="48%" r="58%">
          <stop offset="0%" stopColor={withAlpha(THEME.cardBg, 0.94)} />
          <stop offset="62%" stopColor={withAlpha(THEME.metalTint, compact ? 0.24 : 0.18)} />
          <stop offset="100%" stopColor={withAlpha(THEME.metalTint, 0)} />
        </radialGradient>
      </defs>

      <circle
        cx={cx}
        cy={cy}
        r={outerPlotRadius + size * (compact ? 0.05 : 0.06)}
        fill={`url(#${glowId})`}
      />
      <circle
        cx={cx}
        cy={cy}
        r={outerPlotRadius + size * (compact ? 0.028 : 0.032)}
        fill={`url(#${plateId})`}
      />
      <circle
        cx={cx}
        cy={cy}
        r={outerPlotRadius + size * (compact ? 0.056 : 0.07)}
        fill="none"
        stroke={withAlpha(THEME.metalLine, compact ? 0.84 : 0.72)}
        strokeWidth={compact ? '1.15' : '1.1'}
        strokeDasharray={compact ? '3 6' : '4 8'}
      />

      {levels.map((level, index) => {
        const ringRadius = outerPlotRadius * (level / 100);
        const ringPoints = axisAngles.map((deg) => polar(cx, cy, ringRadius, deg));
        return (
          <polygon
            key={`grid-${level}`}
            points={pointsString(ringPoints)}
            fill={index === levels.length - 1
              ? withAlpha(THEME.metalTint, 0.15)
              : (index % 2 === 0 ? withAlpha(THEME.metalTint, compact ? 0.08 : 0.06) : 'none')}
            stroke={index === levels.length - 1 ? THEME.metalLine : withAlpha(THEME.lineSoft, 0.95)}
            strokeWidth={index === levels.length - 1 ? '1.05' : '0.8'}
          />
        );
      })}

      {axisAngles.map((deg) => {
        const outerPoint = polar(cx, cy, outerPlotRadius, deg);
        return (
          <line
            key={`axis-${deg}`}
            x1={cx}
            y1={cy}
            x2={outerPoint.x}
            y2={outerPoint.y}
            stroke={withAlpha(THEME.lineSoft, 0.98)}
            strokeWidth="0.9"
          />
        );
      })}

      {axisAngles.map((deg) => {
        const tickStart = polar(cx, cy, outerPlotRadius + size * 0.006, deg);
        const tickEnd = polar(cx, cy, outerPlotRadius + size * (compact ? 0.024 : 0.028), deg);
        return (
          <line
            key={`tick-${deg}`}
            x1={tickStart.x}
            y1={tickStart.y}
            x2={tickEnd.x}
            y2={tickEnd.y}
            stroke={withAlpha(THEME.metalLine, 0.82)}
            strokeWidth="1"
          />
        );
      })}

      {levels.map((level) => {
        const y = cy - outerPlotRadius * (level / 100);
        return (
          <text
            key={`level-label-${level}`}
            x={cx + labelOffsetX}
            y={y + 4}
            fontSize={compact ? 10 : 11}
            fill={THEME.metal}
            style={{ fontFamily: THEME.serif, letterSpacing: 0.5 }}
          >
            {level}
          </text>
        );
      })}

      <polygon
        points={pointsString(polygonPoints)}
        fill="none"
        stroke={withAlpha(THEME.metalSoft, compact ? 0.18 : 0.14)}
        strokeWidth={compact ? '4.5' : '6'}
        strokeLinejoin="round"
      />
      <polygon
        points={pointsString(polygonPoints)}
        fill={`url(#${fillId})`}
        stroke={withAlpha(THEME.ink, 0.74)}
        strokeWidth={compact ? '1.2' : '1.35'}
        strokeLinejoin="round"
      />

      <circle
        cx={cx}
        cy={cy}
        r={compact ? 9 : 12}
        fill="none"
        stroke={withAlpha(THEME.metalLine, compact ? 0.46 : 0.38)}
        strokeWidth="0.9"
      />
      <circle
        cx={cx}
        cy={cy}
        r={compact ? 2.6 : 3.2}
        fill={withAlpha(THEME.metalSoft, 0.86)}
      />

      {polygonPoints.map((point, index) => (
        <circle
          key={`point-${entries[index].key}`}
          cx={point.x}
          cy={point.y}
          r={compact ? 4 : 4.6}
          fill={THEME.cardBg}
          stroke={withAlpha(THEME.ink, 0.74)}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function BalanceScoreCard({ scores, compact = false }) {
  const avg = compositeScore(scores);
  const tone = compositeTone(avg);
  const knobSize = compact ? 8 : 10;

  return (
    <div style={{
      padding: compact ? '16px 18px 14px' : '24px 24px 20px',
      background: `linear-gradient(180deg, rgba(255,255,255,0.96) 0%, ${THEME.surfaceSoft} 100%)`,
      border: `1px solid ${THEME.line}`,
      borderRadius: compact ? 20 : 26,
      boxShadow: `0 24px 50px -38px ${withAlpha(THEME.ink, 0.36)}`,
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        fontFamily: THEME.serif,
        fontSize: compact ? 9 : 10,
        color: THEME.metal,
        letterSpacing: compact ? 3 : 4,
        marginBottom: compact ? 10 : 14,
      }}>
        整體平衡指數
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: compact ? 4 : 6, marginBottom: compact ? 12 : 16 }}>
        <div style={{
          fontFamily: THEME.serif,
          fontSize: compact ? 46 : 60,
          color: tone.color,
          lineHeight: 0.9,
          fontWeight: 400,
          letterSpacing: 0,
        }}>
          {avg}
        </div>
        <div style={{
          fontFamily: THEME.serif,
          fontSize: compact ? 16 : 18,
          color: THEME.inkMute,
          letterSpacing: 1,
        }}>
          /100
        </div>
      </div>

      <div style={{
        position: 'relative',
        height: compact ? 6 : 7,
        borderRadius: 999,
        background: withAlpha(THEME.line, 0.95),
        overflow: 'hidden',
        marginBottom: compact ? 12 : 16,
      }}>
        <div style={{
          width: `${avg}%`,
          height: '100%',
          borderRadius: 999,
          background: `linear-gradient(90deg, ${THEME.metalSoft} 0%, ${tone.color} 100%)`,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: `calc(${avg}% - ${knobSize / 2}px)`,
          width: knobSize,
          height: knobSize,
          borderRadius: 999,
          background: THEME.cardBg,
          border: `1px solid ${tone.color}`,
          transform: 'translateY(-50%)',
          boxShadow: `0 0 0 2px ${THEME.cardBg}`,
        }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{
          padding: compact ? '4px 10px' : '5px 12px',
          background: tone.bg,
          color: tone.color,
          borderRadius: 999,
          fontSize: compact ? 10 : 11,
          letterSpacing: compact ? 2 : 2.5,
        }}>
          {tone.label}
        </div>
        <div style={{
          fontSize: compact ? 10 : 11,
          color: THEME.inkSoft,
          letterSpacing: 1.2,
        }}>
          平衡狀態
        </div>
      </div>
    </div>
  );
}

function CompositeScoreStrip({ scores, compact = false }) {
  return (
    <div style={{ marginBottom: compact ? 14 : 18 }}>
      <BalanceScoreCard scores={scores} compact={compact} />
    </div>
  );
}

function SenseInsightGrid({ scores, columns = 3, compact = false }) {
  const entries = senseEntries(scores);
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gap: compact ? 8 : 14,
    }}>
      {entries.map((entry) => (
        <div
          key={entry.key}
          className={`in-fade-up in-delay-${Math.min(entry.index + 1, 6)}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            minHeight: compact ? 'auto' : 208,
            padding: compact ? '12px 12px 10px' : '18px 22px 16px',
            background: compact
              ? THEME.cardBg
              : `linear-gradient(180deg, ${withAlpha(THEME.cardBg, 0.96)} 0%, ${withAlpha(entry.tone.bg, 0.86)} 100%)`,
            border: `1px solid ${THEME.line}`,
            borderTop: `1px solid ${withAlpha(toneAccentColor(entry.tone), compact ? 0.16 : 0.32)}`,
            boxShadow: compact ? 'none' : `0 20px 34px -30px ${withAlpha(THEME.ink, 0.24)}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontFamily: THEME.serif,
                fontStyle: 'italic',
                fontSize: compact ? 9 : 10,
                color: THEME.metal,
                letterSpacing: compact ? 1 : 2,
                marginBottom: compact ? 8 : 10,
              }}>
                {String(entry.index + 1).padStart(2, '0')}
              </div>
              <div style={{
                fontFamily: THEME.serif,
                fontSize: compact ? 14 : 17,
                color: THEME.ink,
                letterSpacing: compact ? 2.5 : 4,
                marginBottom: 4,
              }}>
                {entry.name}
              </div>
              <div style={{
                fontSize: compact ? 8.5 : 9.5,
                color: THEME.metal,
                letterSpacing: compact ? 1.5 : 2,
                fontFamily: THEME.serif,
                fontStyle: 'italic',
              }}>
                {entry.en}　·　{entry.plain}
              </div>
            </div>
            <div style={{
              fontFamily: THEME.serif,
              fontSize: compact ? 26 : 30,
              color: valueDisplayColor(entry.tone),
              lineHeight: 0.92,
              flexShrink: 0,
            }}>
              {entry.value}
            </div>
          </div>

          <div style={{
            fontSize: compact ? 10 : 11,
            color: THEME.inkSoft,
            lineHeight: compact ? 1.7 : 1.82,
            letterSpacing: 0.8,
            marginTop: compact ? 8 : 10,
            marginBottom: compact ? 8 : 10,
            flex: 1,
          }}>
            {senseNarrative(entry, compact)}
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: compact ? '3px 8px' : '4px 10px',
            borderRadius: 999,
            background: entry.tone.bg,
            color: toneAccentColor(entry.tone),
            fontSize: compact ? 8.5 : 9.5,
            letterSpacing: compact ? 1.5 : 2,
          }}>
            {entry.tone.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function RadarAxisLabel({ entry, x, y, compact = false, showEnglish = true }) {
  const anchor = axisAnchor(entry.angle);
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: compact
        ? (entry.angle === 0 || entry.angle === 180 ? 76 : 60)
        : 132,
      display: 'flex',
      flexDirection: 'column',
      gap: compact ? 2 : 4,
      ...anchor,
    }}>
      <div style={{
        fontFamily: THEME.serif,
        fontSize: compact ? 11.5 : 18,
        color: THEME.ink,
        letterSpacing: compact ? 1.5 : 4,
        lineHeight: 1.15,
      }}>
        {entry.name}
      </div>
      {showEnglish && (
        <div style={{
          fontFamily: THEME.serif,
          fontStyle: 'italic',
          fontSize: 9.5,
          color: THEME.metal,
          letterSpacing: 1.8,
        }}>
          {entry.en}
        </div>
      )}
      <div style={{
        fontFamily: THEME.serif,
        fontSize: compact ? 20 : 44,
        lineHeight: 0.94,
        color: valueDisplayColor(entry.tone),
        marginTop: compact ? 1 : 2,
      }}>
        {entry.value}
      </div>
    </div>
  );
}

function RadarFigure({ scores, mobile = false }) {
  const entries = senseEntries(scores);
  const stageWidth = mobile ? 316 : 560;
  const stageHeight = mobile ? 316 : 560;
  const chartSize = mobile ? 208 : 340;
  const chartCompact = mobile;
  const chartRadius = chartSize * (chartCompact ? 0.34 : 0.35);
  const chartCenterX = stageWidth / 2;
  const chartCenterY = stageHeight / 2;
  const chartLeft = chartCenterX - chartSize / 2;
  const chartTop = chartCenterY - chartSize / 2;
  const labelRadius = mobile ? 116 : 182;
  const outerRingOffset = mobile ? 14 : 18;
  const leaderStartOffset = mobile ? 8 : 12;

  return (
    <div style={{ position: 'relative', width: stageWidth, height: stageHeight }}>
      <svg
        width={stageWidth}
        height={stageHeight}
        viewBox={`0 0 ${stageWidth} ${stageHeight}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        <circle
          cx={chartCenterX}
          cy={chartCenterY}
          r={labelRadius + outerRingOffset}
          fill="none"
          stroke={withAlpha(THEME.metalLine, mobile ? 0.62 : 0.66)}
          strokeWidth={mobile ? '1' : '1.1'}
          strokeDasharray={mobile ? '3 7' : '3 8'}
        />
        {entries.map((entry) => {
          const start = polar(chartCenterX, chartCenterY, chartRadius + leaderStartOffset, entry.angle);
          const end = polar(
            chartCenterX,
            chartCenterY,
            labelRadius - leaderRadiusOffset(entry.angle),
            entry.angle
          );
          return (
            <line
              key={`leader-${entry.key}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke={withAlpha(THEME.metalLine, mobile ? 0.74 : 0.78)}
              strokeWidth="1"
              strokeDasharray={mobile ? '2.5 6' : '3 7'}
            />
          );
        })}
      </svg>

      {entries.map((entry) => {
        const point = polar(chartCenterX, chartCenterY, labelRadius, entry.angle);
        return (
          <RadarAxisLabel
            key={`axis-label-${entry.key}`}
            entry={entry}
            x={point.x}
            y={point.y}
            compact={mobile}
            showEnglish={!mobile}
          />
        );
      })}

      <div style={{ position: 'absolute', left: chartLeft, top: chartTop }}>
        <NeuroRadar scores={scores} size={chartSize} compact={chartCompact} />
      </div>
    </div>
  );
}

function NeuroHero({ scores }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 560px) minmax(0, 1fr)',
      gap: 30,
      alignItems: 'stretch',
      padding: '34px 36px 34px',
      background: `linear-gradient(180deg, #FFFFFF 0%, ${THEME.surfaceSoft} 100%)`,
      border: `1px solid ${THEME.line}`,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px 8px',
        background: `
          radial-gradient(circle at 14% 10%, ${withAlpha(THEME.metalTint, 0.76)} 0%, transparent 24%),
          radial-gradient(circle at 88% 88%, ${withAlpha(THEME.metalTint, 0.42)} 0%, transparent 28%),
          linear-gradient(180deg, #FFFFFF 0%, ${THEME.surfaceSoft} 100%)
        `,
        border: `1px solid ${THEME.line}`,
        minWidth: 0,
      }}>
        <RadarFigure scores={scores} />
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        minWidth: 0,
        paddingTop: 36,
        paddingLeft: 22,
      }}>
        <div style={{ maxWidth: 312 }}>
          <BalanceScoreCard scores={scores} />
        </div>
        <div style={{ paddingTop: 18, borderTop: `1px solid ${THEME.line}` }}>
          <SenseInsightGrid scores={scores} columns={2} />
        </div>
      </div>
    </div>
  );
}

function NeuroCards({ scores, columns = 3 }) {
  return <SenseInsightGrid scores={scores} columns={columns} />;
}

function NeuroBars({ scores }) {
  const entries = senseEntries(scores);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {entries.map((entry) => (
        <div key={entry.key} className={`in-fade-up in-delay-${Math.min(entry.index + 1, 6)}`}>
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 6, gap: 8 }}>
            <span style={{ fontFamily: THEME.serif, fontStyle: 'italic', fontSize: 9, color: THEME.metal, letterSpacing: 2 }}>
              N°&nbsp;{String(entry.index + 1).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: THEME.serif, fontSize: 15, fontWeight: 400, color: THEME.ink, letterSpacing: 4 }}>
              {entry.name}
            </span>
            <span style={{ fontSize: 9, color: THEME.metal, letterSpacing: 2, fontStyle: 'italic', fontFamily: THEME.serif }}>
              ／{entry.plain}
            </span>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 9, color: toneAccentColor(entry.tone), letterSpacing: 2, marginRight: 12 }}>
              {entry.tone.label}
            </span>
            <Metric value={entry.value} tone={valueDisplayColor(entry.tone)} size={20} />
          </div>
          <div style={{ position: 'relative', height: 1, background: THEME.line }}>
            <div
              className="in-bar"
              style={{
                height: '100%',
                width: `${entry.value}%`,
                background: toneAccentColor(entry.tone),
                animationDelay: `${0.15 + entry.index * 0.08}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  NeuroRadar,
  RadarFigure,
  NeuroCards,
  NeuroBars,
  NeuroHero,
  scoreValue,
  compositeScore,
  CompositeScoreStrip,
  SenseInsightGrid,
});
