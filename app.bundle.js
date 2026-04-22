(() => {
  // ../../../../../../private/var/folders/28/_p58vyd12zbf4wkxq5cpxmrr0000gn/T/klf-health-build-etBApq/app.entry.jsx
  var THEME = {
    // 底色：極致的純白
    pageBg: "#FFFFFF",
    cardBg: "#FFFFFF",
    surface: "#FAFAF9",
    surfaceSoft: "#F5F4F2",
    surfaceDeep: "#EEEDEA",
    // 主墨：深黑不是純黑，帶一點藍灰讓它優雅
    ink: "#141414",
    inkDeep: "#0A0A0A",
    inkSoft: "#3A3A3A",
    inkMute: "#8A8985",
    inkFaint: "#BCBAB5",
    // 鉑金灰（取代金色的低調高級色）
    metal: "#6B6762",
    metalSoft: "#9E9A93",
    metalTint: "#EEEBE4",
    metalLine: "#D8D3C9",
    // 主 accent（墨黑）— 按鈕、強調、選中態
    accent: "#141414",
    accentSoft: "#3A3A3A",
    panelGradient: "radial-gradient(circle at 18% 14%, rgba(226, 211, 177, 0.28), transparent 30%), linear-gradient(145deg, #4A433D 0%, #2D2823 42%, #11100F 100%)",
    panelGradientSoft: "radial-gradient(circle at 16% 12%, rgba(226, 211, 177, 0.22), transparent 32%), linear-gradient(150deg, #443D37 0%, #28231F 52%, #121110 100%)",
    panelGradientElevated: "radial-gradient(circle at 14% 12%, rgba(226, 211, 177, 0.24), transparent 34%), linear-gradient(165deg, #504841 0%, #2F2925 46%, #100F0E 100%)",
    phoneShellGradient: "linear-gradient(180deg, #47403A 0%, #29241F 46%, #11100F 100%)",
    phoneNotchGradient: "linear-gradient(180deg, #2E2926 0%, #191715 100%)",
    darkPanelShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 50px -28px rgba(20,20,20,0.38)",
    // 語意色（精品低飽和 — 極少使用、留給真正警示）
    danger: "#8F3A2E",
    warn: "#967638",
    good: "#3B5A47",
    dangerBg: "#F6EFEC",
    warnBg: "#F5F1E8",
    goodBg: "#ECEFEB",
    // 線條
    line: "#E8E6E1",
    lineSoft: "#F0EEE9",
    hair: "#DCD9D2",
    // 字體
    serif: "'KuMincho', 'Cormorant Garamond', 'Noto Serif TC', serif",
    sans: "'Noto Sans TC', sans-serif",
    mono: "'JetBrains Mono', monospace"
  };
  function injectStyles() {
    if (document.getElementById("ink-noir-styles")) return;
    const style = document.createElement("style");
    style.id = "ink-noir-styles";
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

    /* \u6975\u7D30\u6EFE\u52D5\u689D */
    .in-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
    .in-scroll::-webkit-scrollbar-track { background: transparent; }
    .in-scroll::-webkit-scrollbar-thumb { background: #D8D3C9; border-radius: 2px; }
    .in-scroll::-webkit-scrollbar-thumb:hover { background: #6B6762; }

    /* \u6587\u5B57\u9078\u53D6 */
    ::selection { background: #141414; color: #FFFFFF; }
  `;
    document.head.appendChild(style);
  }
  function toneFor(rawScore, key) {
    const display = key === "cor" ? 100 - rawScore : rawScore;
    if (display < 40) return {
      tone: "danger",
      color: THEME.danger,
      bg: THEME.dangerBg,
      label: "\u504F\u4F4E"
    };
    if (display < 60) return {
      tone: "warn",
      color: THEME.warn,
      bg: THEME.warnBg,
      label: "\u9700\u7559\u610F"
    };
    if (display < 80) return {
      tone: "good",
      color: THEME.good,
      bg: THEME.goodBg,
      label: "\u826F\u597D"
    };
    return {
      tone: "best",
      color: THEME.good,
      bg: THEME.goodBg,
      label: "\u7406\u60F3"
    };
  }
  function HairRule({ w = 40, variant = "center" }) {
    if (variant === "double") {
      return /* @__PURE__ */ React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center"
        }
      }, /* @__PURE__ */ React.createElement("span", {
        style: {
          width: w,
          height: 1,
          background: THEME.ink
        }
      }), /* @__PURE__ */ React.createElement("span", {
        style: {
          width: w * 0.4,
          height: 1,
          background: THEME.ink
        }
      }));
    }
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        width: w,
        height: 1,
        background: THEME.ink
      }
    }), /* @__PURE__ */ React.createElement("span", {
      style: {
        width: 3,
        height: 3,
        background: THEME.ink,
        transform: "rotate(45deg)"
      }
    }), /* @__PURE__ */ React.createElement("span", {
      style: {
        width: w,
        height: 1,
        background: THEME.ink
      }
    }));
  }
  function Corners() {
    return null;
  }
  function Eyebrow({ children, color, size = 9, letter = 5 }) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: size,
        letterSpacing: letter,
        color: color || THEME.metal,
        textTransform: "uppercase",
        fontWeight: 400
      }
    }, children);
  }
  function Metric({ value, unit, tone = "ink", size = 32, serif = true }) {
    const c = tone === "ink" ? THEME.ink : tone === "metal" ? THEME.metal : tone === "danger" ? THEME.danger : tone === "warn" ? THEME.warn : tone === "good" ? THEME.good : tone;
    return /* @__PURE__ */ React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "baseline",
        gap: 3
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: serif ? THEME.serif : THEME.sans,
        fontSize: size,
        fontWeight: 400,
        color: c,
        letterSpacing: 0.5,
        lineHeight: 1
      }
    }, value), unit && /* @__PURE__ */ React.createElement("span", {
      style: {
        fontSize: 10,
        color: THEME.inkMute,
        letterSpacing: 1
      }
    }, unit));
  }
  function SectionHeader({ n, label, subtitle }) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        marginBottom: 18
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: subtitle ? 8 : 0
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 13,
        color: THEME.metal,
        letterSpacing: 2,
        minWidth: 22
      }
    }, n), /* @__PURE__ */ React.createElement("span", {
      className: "in-hair",
      style: {
        width: 32,
        height: 1,
        background: THEME.ink,
        display: "block"
      }
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 20,
        color: THEME.ink,
        letterSpacing: 5,
        fontWeight: 400
      }
    }, label)), subtitle && /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 11,
        color: THEME.inkSoft,
        letterSpacing: 1,
        lineHeight: 1.8,
        paddingLeft: 68
      }
    }, subtitle));
  }
  Object.assign(window, {
    THEME,
    injectStyles,
    toneFor,
    HairRule,
    Corners,
    Eyebrow,
    Metric,
    SectionHeader
  });
  var PRODUCTS = {
    "ai-liemian-ex": {
      name: "\u827E\u7ACB\u7720 EX",
      tag: "\u591C\u9593\u653E\u9B06",
      axis: "sleep",
      unit: "30 \u7C92 / \u76D2"
    },
    "goodnight-drink": {
      name: "\u79D1\u6280\u71D5\u7AA9\u665A\u5B89\u7E96\u59FF\u98F2",
      tag: "\u52A9\u7720\u4FEE\u5FA9",
      axis: "sleep",
      unit: "14 \u5165 / \u76D2"
    },
    "pearl-powder": {
      name: "\u5FA1\u8CDE\u73CD\u73E0\u7C89",
      tag: "\u5B89\u795E\u7A69\u7720",
      axis: "sleep",
      unit: "30 \u5305 / \u76D2"
    },
    "zhiming-drink": {
      name: "\u667A\u660E\u9748\u5149\u98F2",
      tag: "\u5C08\u6CE8\u6E05\u660E",
      axis: "focus",
      unit: "14 \u5165 / \u76D2"
    },
    "allround-drink": {
      name: "\u79D1\u6280\u71D5\u7AA9\u5168\u80FD\u98F2",
      tag: "\u5168\u9762\u4FEE\u5FA9",
      axis: "focus",
      unit: "14 \u5165 / \u76D2"
    },
    "fish-oil": {
      name: "\u9802\u7D1A\u9AD8\u6FC3\u5EA6\u9B5A\u6CB9",
      tag: "\u8166\u529B\u6CB9\u8102",
      axis: "focus",
      unit: "60 \u7C92 / \u76D2"
    },
    "plant-dha": {
      name: "\u6CD5\u570B DHA \u690D\u7269\u85FB\u6CB9",
      tag: "\u7D20\u98DF\u8166\u529B",
      axis: "focus",
      unit: "60 \u7C92 / \u76D2"
    },
    "xinggan-ex": {
      name: "\u5C0F\u5FC3\u7518 EX",
      tag: "\u71AC\u591C\u4FEE\u5FA9",
      axis: "stress",
      unit: "30 \u7C92 / \u76D2"
    },
    "hongqu-ex": {
      name: "\u7D05\u9EB4\u6D3B\u529B\u5FAA EX",
      tag: "\u5FAA\u74B0\u4EE3\u8B1D",
      axis: "circ",
      unit: "60 \u7C92 / \u76D2"
    },
    "natto-q10": {
      name: "\u7D0D\u8C46\u7D05\u9EB4 Q10 \u8907\u65B9",
      tag: "\u5FAA\u74B0\u990A\u8B77",
      axis: "circ",
      unit: "60 \u7C92 / \u76D2"
    },
    "collagen-joint": {
      name: "\u81A0\u539F\u95DC\u9375\u7A69 EX",
      tag: "\u95DC\u7BC0\u4FEE\u5FA9",
      axis: "joint",
      unit: "30 \u5305 / \u76D2"
    },
    "turtle-deer": {
      name: "\u9F9C\u9E7F\u81A0\u539F\u95DC\u9375\u98F2",
      tag: "\u9AA8\u95DC\u7BC0\u990A\u8B77",
      axis: "joint",
      unit: "14 \u5165 / \u76D2"
    },
    "beauty-drink": {
      name: "\u79D1\u6280\u71D5\u7AA9\u7F8E\u598D\u8CE6\u6D3B\u98F2",
      tag: "\u7F8E\u598D\u8CE6\u6D3B",
      axis: "beauty",
      unit: "14 \u5165 / \u76D2"
    },
    "bright-ex": {
      name: "\u6975\u5149\u767D\u8CE6\u7F8E EX",
      tag: "\u900F\u4EAE\u6F64\u990A",
      axis: "beauty",
      unit: "30 \u5305 / \u76D2"
    }
  };
  var NT_SCHEMA = [
    {
      key: "da",
      name: "\u591A\u5DF4\u80FA",
      en: "Dopamine",
      plain: "\u52D5\u80FD",
      meaning: "\u8FFD\u5C0B\u672A\u4F86\u7684\u52D5\u529B\u3001\u734E\u52F5\u6A5F\u5236",
      low: "\u63D0\u4E0D\u8D77\u52C1\u3001\u62D6\u5EF6",
      high: "\u5145\u6EFF\u52D5\u529B"
    },
    {
      key: "oxt",
      name: "\u50AC\u7522\u7D20",
      en: "Oxytocin",
      plain: "\u9023\u7D50",
      meaning: "\u5EFA\u7ACB\u4FE1\u4EFB\u8207\u89AA\u5BC6\u9023\u7D50",
      low: "\u758F\u96E2\u3001\u96E3\u653E\u9B06",
      high: "\u4FE1\u4EFB\u8207\u6EAB\u6696"
    },
    {
      key: "5ht",
      name: "\u8840\u6E05\u7D20",
      en: "Serotonin",
      plain: "\u5FC3\u60C5",
      meaning: "\u5E36\u4F86\u5B89\u5168\u611F\u8207\u5E78\u798F\u611F",
      low: "\u4F4E\u843D\u3001\u7126\u8E81",
      high: "\u5E73\u548C\u81EA\u5728"
    },
    {
      key: "cor",
      name: "\u76AE\u8CEA\u9187",
      en: "Cortisol",
      plain: "\u58D3\u529B",
      meaning: "\u8EAB\u9AD4\u627F\u53D7\u7684\u7DCA\u7E43\u8207\u58D3\u529B",
      low: "\u653E\u9B06\u72C0\u614B",
      high: "\u7DCA\u7E43\u3001\u96E3\u5165\u7720"
    },
    {
      key: "end",
      name: "\u8166\u5167\u5561",
      en: "Endorphins",
      plain: "\u6109\u6085",
      meaning: "\u5F97\u5230\u734E\u52F5\u8207\u56DE\u994B\u7684\u5FEB\u611F",
      low: "\u7121\u611F\u3001\u63D0\u4E0D\u8D77\u8208\u8DA3",
      high: "\u5BB9\u6613\u611F\u5230\u5FEB\u6A02"
    },
    {
      key: "tes",
      name: "\u776A\u56FA\u916E",
      en: "Testosterone",
      plain: "\u5E95\u6C23",
      meaning: "\u81EA\u4FE1\u3001\u81BD\u91CF\u8207\u884C\u52D5\u529B\u7684\u6839",
      low: "\u6C92\u81EA\u4FE1\u3001\u9000\u7E2E",
      high: "\u4E3B\u52D5\u7A4D\u6975"
    }
  ];
  function bandOf(score, key) {
    const reverse = key === "cor";
    const v = reverse ? 100 - score : score;
    if (v < 40) return {
      key: "low",
      label: "\u504F\u4F4E",
      color: "#9E4A3B",
      tone: "danger"
    };
    if (v < 60) return {
      key: "edge",
      label: "\u9700\u7559\u610F",
      color: "#B8802A",
      tone: "warn"
    };
    if (v < 80) return {
      key: "good",
      label: "\u826F\u597D",
      color: "#3E5C4A",
      tone: "ok"
    };
    return {
      key: "best",
      label: "\u7406\u60F3",
      color: "#3E5C4A",
      tone: "ok"
    };
  }
  var MEMBER_FRIENDLY = {
    direction: "\u5E6B\u60A8\u7A69\u4F4F\u58D3\u529B\u3001\u627E\u56DE\u52D5\u80FD\u8207\u597D\u5FC3\u60C5",
    summary: "\u6700\u8FD1\u58D3\u529B\u504F\u9AD8\u3001\u52D5\u80FD\u4E0D\u8DB3\uFF0C\u8A18\u61B6\u529B\u8207\u6E1B\u91CD\u5BB9\u6613\u53D7\u5F71\u97FF\u3002\u5148\u628A\u58D3\u529B\u7DE9\u4E0B\u4F86\u3001\u7761\u7720\u7A69\u5B9A\uFF0C\u518D\u6062\u5FA9\u6D3B\u529B\u8207\u6109\u6085\u611F\u3002"
  };
  var MEMBERS = {
    yuhong: {
      id: "M-2024-0813",
      name: "\u9673\u6631\u958E",
      age: 29,
      gender: "\u7537",
      level: "\u5C0A\u7235\u6703\u54E1",
      joinedAt: "2025-11-18",
      primary: [
        "\u9AD4\u91CD\u7BA1\u7406",
        "\u8A18\u61B6\u8207\u5C08\u6CE8"
      ],
      status: "\u65B0\u5EFA\u8B70\u5DF2\u751F\u6210\uFF0E\u5F85\u9810\u7D04",
      nextVisit: "2026.04.28",
      lastInteraction: "2026.04.19 \xB7 \u6703\u54E1\u9867\u554F\u56DE\u8A2A",
      // 分數解讀為「越高越好」（除壓力為反向）
      nt: {
        da: 38,
        oxt: 62,
        "5ht": 48,
        cor: 76,
        end: 44,
        tes: 54
      },
      lifestyle: {
        sleep: 5.2,
        stress: 7,
        fatigue: 6,
        bmi: 29.4,
        waist: 94
      },
      tags: [
        "\u52D5\u80FD\u504F\u5F31",
        "\u58D3\u529B\u504F\u9AD8",
        "\u6109\u6085\u611F\u4E0D\u8DB3",
        "\u4EE3\u8B1D\u504F\u6162"
      ],
      family: [
        {
          role: "\u672C\u4EBA",
          name: "\u9673\u6631\u958E",
          age: 29,
          status: "active",
          stage: "\u6709\u5EFA\u8B70"
        },
        {
          role: "\u914D\u5076",
          name: "\u6797\u4F69\u541B",
          age: 28,
          status: "active",
          stage: "\u5F85\u6AA2\u6E2C"
        },
        {
          role: "\u7236\u89AA",
          name: "\u9673\u570B\u83EF",
          age: 58,
          status: "active",
          stage: "\u5DF2\u5165\u6703"
        },
        {
          role: "\u6BCD\u89AA",
          name: "\u738B\u7F8E\u862D",
          age: 56,
          status: "active",
          stage: "\u5DF2\u555F\u7528"
        },
        {
          role: "\u54E5\u54E5",
          name: "\u9673\u6631\u7FD4",
          age: 33,
          status: "pending",
          stage: "\u5F85\u8AAA\u660E"
        },
        {
          role: "\u5AC2\u5AC2",
          name: "\u9EC3\u73EE\u745C",
          age: 31,
          status: "pending",
          stage: "\u5F85\u8AAA\u660E"
        },
        {
          role: "\u59EA\u5973",
          name: "\u9673\u5B89\u5B89",
          age: 6,
          status: "reserved",
          stage: "\u4FDD\u7559"
        }
      ],
      journey: [
        {
          key: "join",
          label: "\u52A0\u5165\u6703\u54E1",
          date: "2025.11.18",
          done: true
        },
        {
          key: "intake",
          label: "\u751F\u6D3B\u554F\u5377",
          date: "2025.11.22",
          done: true
        },
        {
          key: "test",
          label: "\u8EAB\u5FC3\u6AA2\u6E2C",
          date: "2026.03.05",
          done: true
        },
        {
          key: "ai",
          label: "\u5C08\u5C6C\u5EFA\u8B70",
          date: "2026.04.15",
          done: true,
          current: true
        },
        {
          key: "product",
          label: "\u7522\u54C1\u555F\u7528",
          date: "2026.04.28",
          done: false
        },
        {
          key: "clinic",
          label: "\u8A3A\u6240\u8AEE\u8A62",
          date: "2026.05.12",
          done: false
        },
        {
          key: "follow",
          label: "30 \u5929\u56DE\u8A2A",
          date: "2026.05.30",
          done: false
        }
      ],
      // 給會員看的主軸
      brief: {
        direction: "\u7A69\u4F4F\u58D3\u529B\u30FB\u627E\u56DE\u52D5\u80FD\u30FB\u6062\u5FA9\u597D\u5FC3\u60C5",
        headline: "\u6700\u8FD1\u7684\u60A8\uFF0C\u8EAB\u9AD4\u5728\u767C\u51FA\u9019\u4E9B\u8A0A\u606F",
        // 改成會員能讀懂的白話
        insights: [
          {
            label: "\u58D3\u529B\u504F\u9AD8",
            detail: "\u8EAB\u9AD4\u6301\u7E8C\u7DCA\u7E43\uFF0C\u8A18\u61B6\u8207\u7761\u7720\u90FD\u53D7\u5F71\u97FF"
          },
          {
            label: "\u52D5\u80FD\u4E0D\u8DB3",
            detail: "\u505A\u4E8B\u5BB9\u6613\u63D0\u4E0D\u8D77\u52C1\uFF0C\u6E1B\u91CD\u4E5F\u6BD4\u8F03\u5403\u529B"
          },
          {
            label: "\u6109\u6085\u611F\u504F\u4F4E",
            detail: "\u65E5\u5E38\u5C0F\u78BA\u5E78\u7684\u611F\u53D7\u88AB\u58D3\u6291\u4E86"
          }
        ],
        reason: "\u8EAB\u5FC3\u6AA2\u6E2C\u986F\u793A\uFF1A\u58D3\u529B\u6307\u6578\u504F\u9AD8\u3001\u52D5\u80FD\u8207\u6109\u6085\u611F\u504F\u4F4E\u3002\u5EFA\u8B70\u7684\u65B9\u5411\u662F\u5148\u8B93\u7761\u7720\u8207\u58D3\u529B\u7A69\u5B9A\uFF0C\u518D\u4E00\u6B65\u6B65\u6062\u5FA9\u6D3B\u529B\uFF0C\u6700\u5F8C\u555F\u52D5\u9AD4\u614B\u7BA1\u7406\u3002\u9019\u662F\u70BA\u60A8\u91CF\u8EAB\u5B89\u6392\u7684\u7BC0\u594F\uFF0C\u4E0D\u9700\u8981\u4E00\u6B21\u6539\u8B8A\u6240\u6709\u7FD2\u6163\u3002",
        products: [
          "fish-oil",
          "zhiming-drink",
          "ai-liemian-ex",
          "hongqu-ex"
        ],
        service: {
          home: [
            "22:30 \u524D\u5165\u7761\u3001\u6668\u9593\u65E5\u66EC 10 \u5206\u9418",
            "\u4E3B\u98DF\u4EFD\u91CF\u964D\u4E00\u968E\uFF0C\u8A18\u9304\u8170\u570D"
          ],
          advise: [
            "\u6703\u54E1\u9867\u554F\u6BCF\u9031\u4E00\u6B21\u7C21\u8A0A\u95DC\u5FC3\uFF0C\u8FFD\u8E64\u7761\u7720\u8207\u5C08\u6CE8"
          ],
          clinic: [
            "\u8996 30 \u5929\u72C0\u6CC1\uFF0C\u7531\u4FF1\u6A02\u90E8\u8A3A\u6240\u8A55\u4F30\u66F4\u7CBE\u7D30\u7684\u6AA2\u67E5"
          ]
        },
        followUp: [
          {
            day: 7,
            item: "\u7761\u7720\u662F\u5426 > 6.5 \u5C0F\u6642\u3001\u5C08\u6CE8\u5EA6\u81EA\u8A55"
          },
          {
            day: 14,
            item: "\u8170\u570D\u3001\u75B2\u52DE\u6307\u6578\u3001\u7522\u54C1\u4F7F\u7528\u611F"
          },
          {
            day: 30,
            item: "\u91CD\u65B0\u8A55\u4F30\uFF0C\u6C7A\u5B9A\u662F\u5426\u9810\u7D04\u8A3A\u6240\u8AEE\u8A62"
          }
        ]
      }
    },
    meiling: {
      id: "M-2024-0412",
      name: "\u738B\u7F8E\u73B2",
      age: 52,
      gender: "\u5973",
      level: "\u767D\u91D1\u6703\u54E1",
      joinedAt: "2025-06-10",
      primary: [
        "\u7761\u7720\u7167\u9867",
        "\u66F4\u5E74\u671F\u8ABF\u7406"
      ],
      status: "\u5F85\u56DE\u8A2A",
      nextVisit: "2026.04.25",
      lastInteraction: "2026.04.10 \xB7 \u8A3A\u6240\u56DE\u8A3A",
      nt: {
        da: 55,
        oxt: 48,
        "5ht": 32,
        cor: 82,
        end: 40,
        tes: 36
      },
      lifestyle: {
        sleep: 4.5,
        stress: 8,
        fatigue: 7,
        bmi: 23.1,
        waist: 78
      },
      tags: [
        "\u5FC3\u60C5\u504F\u4F4E",
        "\u58D3\u529B\u504F\u9AD8",
        "\u7761\u7720\u4E0D\u8DB3",
        "\u60C5\u7DD2\u8D77\u4F0F"
      ],
      family: [
        {
          role: "\u672C\u4EBA",
          name: "\u738B\u7F8E\u73B2",
          age: 52,
          status: "active",
          stage: "\u5DF2\u555F\u7528"
        },
        {
          role: "\u914D\u5076",
          name: "\u5F35\u5EFA\u5FD7",
          age: 55,
          status: "active",
          stage: "\u5F85\u6AA2\u6E2C"
        },
        {
          role: "\u5973\u5152",
          name: "\u5F35\u96C5\u7B51",
          age: 24,
          status: "pending",
          stage: "\u5F85\u8AAA\u660E"
        },
        {
          role: "\u5152\u5B50",
          name: "\u5F35\u5B87\u8ED2",
          age: 20,
          status: "pending",
          stage: "\u5F85\u8AAA\u660E"
        }
      ],
      journey: [
        {
          key: "join",
          label: "\u52A0\u5165\u6703\u54E1",
          date: "2025.06.10",
          done: true
        },
        {
          key: "intake",
          label: "\u751F\u6D3B\u554F\u5377",
          date: "2025.06.15",
          done: true
        },
        {
          key: "test",
          label: "\u8EAB\u5FC3\u6AA2\u6E2C",
          date: "2025.09.20",
          done: true
        },
        {
          key: "ai",
          label: "\u5C08\u5C6C\u5EFA\u8B70",
          date: "2025.10.01",
          done: true
        },
        {
          key: "product",
          label: "\u7522\u54C1\u555F\u7528",
          date: "2025.10.05",
          done: true
        },
        {
          key: "clinic",
          label: "\u8A3A\u6240\u8AEE\u8A62",
          date: "2026.03.15",
          done: true,
          current: true
        },
        {
          key: "follow",
          label: "30 \u5929\u56DE\u8A2A",
          date: "2026.04.25",
          done: false
        }
      ],
      brief: {
        direction: "\u52A9\u7720\u8212\u58D3\u30FB\u5B89\u7A69\u60C5\u7DD2\u30FB\u66F4\u5E74\u671F\u966A\u4F34",
        headline: "\u6700\u8FD1\u7684\u60A8\uFF0C\u8EAB\u9AD4\u5728\u767C\u51FA\u9019\u4E9B\u8A0A\u606F",
        insights: [
          {
            label: "\u7761\u7720\u4E0D\u8DB3",
            detail: "\u5E73\u5747\u53EA\u7761 4.5 \u5C0F\u6642\uFF0C\u8EAB\u9AD4\u4F86\u4E0D\u53CA\u4FEE\u5FA9"
          },
          {
            label: "\u5FC3\u60C5\u504F\u4F4E",
            detail: "\u60C5\u7DD2\u8207\u8010\u53D7\u5EA6\u90FD\u88AB\u5F71\u97FF"
          },
          {
            label: "\u58D3\u529B\u504F\u9AD8",
            detail: "\u66F4\u5E74\u671F\u642D\u914D\u9AD8\u58D3\uFF0C\u66F4\u5BB9\u6613\u75B2\u5026"
          }
        ],
        reason: "\u9019\u968E\u6BB5\u6700\u91CD\u8981\u7684\u662F\u7A69\u4E0B\u4F86\u3002\u5148\u7167\u9867\u7761\u7720\u8207\u60C5\u7DD2\uFF0C\u518D\u770B\u8EAB\u9AD4\u6062\u5FA9\u901F\u5EA6\u6C7A\u5B9A\u4E0B\u4E00\u6B65\u3002",
        products: [
          "ai-liemian-ex",
          "goodnight-drink",
          "pearl-powder",
          "beauty-drink"
        ],
        service: {
          home: [
            "21:30 \u5F8C\u8ABF\u6697\u5149\u7DDA\uFF0C\u56FA\u5B9A\u5165\u7761\u6642\u9593",
            "\u6BCF\u65E5 15 \u5206\u9418\u7DE9\u6B65\u8D70"
          ],
          advise: [
            "\u6703\u54E1\u9867\u554F\u6BCF\u5169\u9031\u8FFD\u8E64\u7761\u7720\u8207\u60C5\u7DD2"
          ],
          clinic: [
            "\u8A3A\u6240\u5DF2\u5B8C\u6210\u8CC0\u723E\u8499\u8A55\u4F30\uFF0C\u6BCF\u5B63\u8FFD\u8E64"
          ]
        },
        followUp: [
          {
            day: 7,
            item: "\u5165\u7761\u6642\u9593\u3001\u52A9\u7720\u7522\u54C1\u8010\u53D7"
          },
          {
            day: 14,
            item: "\u60C5\u7DD2\u7A69\u5B9A\u5EA6\u3001\u6F6E\u71B1\u983B\u7387"
          },
          {
            day: 30,
            item: "\u8A3A\u6240\u8907\u8A3A\u8207\u5EFA\u8B70\u66F4\u65B0"
          }
        ]
      }
    },
    guohua: {
      id: "M-2023-1102",
      name: "\u9673\u570B\u83EF",
      age: 58,
      gender: "\u7537",
      level: "\u5C0A\u7235\u6703\u54E1",
      joinedAt: "2024-12-05",
      primary: [
        "\u5FAA\u74B0\u4EE3\u8B1D",
        "\u95DC\u7BC0\u7167\u9867"
      ],
      status: "\u5DF2\u5165\u6703\u30FB\u5F85\u6AA2\u6E2C",
      nextVisit: "2026.04.30",
      lastInteraction: "2026.04.16 \xB7 \u6703\u54E1\u9867\u554F\u8AAA\u660E",
      nt: {
        da: 50,
        oxt: 58,
        "5ht": 48,
        cor: 60,
        end: 52,
        tes: 58
      },
      lifestyle: {
        sleep: 6.8,
        stress: 5,
        fatigue: 5,
        bmi: 26.8,
        waist: 92
      },
      tags: [
        "\u4EE3\u8B1D\u9700\u7559\u610F",
        "\u95DC\u7BC0\u78E8\u8017",
        "\u58D3\u529B\u4E2D\u7B49"
      ],
      family: [
        {
          role: "\u672C\u4EBA",
          name: "\u9673\u570B\u83EF",
          age: 58,
          status: "active",
          stage: "\u5F85\u6AA2\u6E2C"
        },
        {
          role: "\u914D\u5076",
          name: "\u738B\u6DD1\u8C9E",
          age: 56,
          status: "pending",
          stage: "\u5F85\u8AAA\u660E"
        }
      ],
      journey: [
        {
          key: "join",
          label: "\u52A0\u5165\u6703\u54E1",
          date: "2024.12.05",
          done: true
        },
        {
          key: "intake",
          label: "\u751F\u6D3B\u554F\u5377",
          date: "2024.12.10",
          done: true,
          current: true
        },
        {
          key: "test",
          label: "\u8EAB\u5FC3\u6AA2\u6E2C",
          date: "2026.04.30",
          done: false
        },
        {
          key: "ai",
          label: "\u5C08\u5C6C\u5EFA\u8B70",
          date: "",
          done: false
        },
        {
          key: "product",
          label: "\u7522\u54C1\u555F\u7528",
          date: "",
          done: false
        },
        {
          key: "clinic",
          label: "\u8A3A\u6240\u8AEE\u8A62",
          date: "",
          done: false
        },
        {
          key: "follow",
          label: "\u56DE\u8A2A",
          date: "",
          done: false
        }
      ],
      brief: {
        direction: "\u6AA2\u6E2C\u5B8C\u6210\u5F8C\uFF0C\u70BA\u60A8\u91CF\u8EAB\u898F\u5283",
        headline: "\u5C1A\u5F85\u5B8C\u6210\u6AA2\u6E2C",
        insights: [],
        reason: "\u76EE\u524D\u53EA\u6709\u751F\u6D3B\u554F\u5377\u8CC7\u6599\uFF0C\u5B8C\u6210\u8EAB\u5FC3\u6AA2\u6E2C\u5F8C\uFF0C\u7CFB\u7D71\u6703\u70BA\u60A8\u6574\u7406\u5C08\u5C6C\u5EFA\u8B70\u3002",
        products: [],
        service: {
          home: [
            "\u5DF2\u63D0\u4F9B\u521D\u6B65\u98F2\u98DF\u8207\u6D3B\u52D5\u6307\u5F15"
          ],
          advise: [
            "\u6703\u54E1\u9867\u554F\u5DF2\u5B89\u6392\u6AA2\u6E2C\u5957\u4EF6\u5BC4\u9001"
          ],
          clinic: [
            "\u6AA2\u6E2C\u5F8C\u518D\u8A55\u4F30"
          ]
        },
        followUp: []
      }
    }
  };
  var CASES = [
    {
      id: "M-2024-0813",
      name: "\u9673\u6631\u958E",
      stage: "ai",
      owners: {
        sales: "\u5433\u660E\u7FF0",
        clinic: "\u2014",
        ops: "\u6797\u4F73\u7A4E",
        ai: "\u5065\u5EB7\u9867\u554F\u7CFB\u7D71"
      },
      next: {
        sales: "\u78BA\u8A8D\u555F\u52D5\u5305\u5B85\u914D\u6642\u9593",
        clinic: "\u5F85\u7D50\u679C\u8A55\u4F30\u8A3A\u6240\u8DEF\u5F91",
        ops: "\u9B5A\u6CB9 + \u667A\u660E\u9748\u5149\u98F2\u5099\u8CA8",
        ai: "\u8FFD\u52A0\u8A18\u61B6\u91CF\u8868\u554F\u5377"
      },
      risk: null,
      summary: "\u4E3B\u8A34\u9AD4\u91CD\u8207\u8A18\u61B6\u529B\u3002\u5EFA\u8B70\u5148\u5F9E\u58D3\u529B\u8207\u7761\u7720\u8457\u624B\u3002"
    },
    {
      id: "M-2024-0412",
      name: "\u738B\u7F8E\u73B2",
      stage: "follow",
      owners: {
        sales: "\u5433\u660E\u7FF0",
        clinic: "\u674E\u6021\u541B\u91AB\u5E2B",
        ops: "\u6797\u4F73\u7A4E",
        ai: "\u5065\u5EB7\u9867\u554F\u7CFB\u7D71"
      },
      next: {
        sales: "\u78BA\u8A8D 4/25 30 \u5929\u56DE\u8A2A",
        clinic: "\u8CC0\u723E\u8499\u8FFD\u8E64\u5DF2\u6392",
        ops: "\u665A\u5B89\u98F2\u88DC\u8CA8",
        ai: "\u91CD\u65B0\u8A55\u4F30\u89F8\u767C\u689D\u4EF6"
      },
      risk: null,
      summary: "\u8A3A\u6240\u5DF2\u627F\u63A5\uFF0C\u7522\u54C1\u7B2C 3 \u9031\uFF0C\u60C5\u7DD2\u91CF\u8868\u6539\u5584 2 \u5206\u3002"
    },
    {
      id: "M-2023-1102",
      name: "\u9673\u570B\u83EF",
      stage: "test",
      owners: {
        sales: "\u5433\u660E\u7FF0",
        clinic: "\u2014",
        ops: "\u6797\u4F73\u7A4E",
        ai: "\u2014"
      },
      next: {
        sales: "4/30 \u6AA2\u6E2C\u966A\u540C",
        clinic: "\u6AA2\u6E2C\u5F8C\u8A55\u4F30",
        ops: "\u6AA2\u6E2C\u5957\u4EF6\u5DF2\u5BC4\u51FA",
        ai: "\u5F85\u8CC7\u6599\u56DE\u50B3"
      },
      risk: null,
      summary: "\u914D\u5076\u5C1A\u672A\u5165\u6703\uFF0C\u8A55\u4F30\u5BB6\u65CF\u65B9\u6848\u64F4\u5C55\u8DEF\u5F91\u3002"
    },
    {
      id: "M-2025-0220",
      name: "\u5289\u5FD7\u6210",
      stage: "intro",
      owners: {
        sales: "\u9EC3\u54C1\u8AA0",
        clinic: "\u2014",
        ops: "\u2014",
        ai: "\u2014"
      },
      next: {
        sales: "\u7B2C 2 \u6B21\u8AAA\u660E\u7D04\u5B9A 4/23",
        clinic: "\u672A\u9032\u5834",
        ops: "\u2014",
        ai: "\u2014"
      },
      risk: "noMember",
      summary: "\u5C1A\u672A\u5165\u6703\uFF0C\u4E0D\u53EF\u63A8\u8A3A\u6240\u65B9\u6848\u3002"
    },
    {
      id: "M-2025-0305",
      name: "\u8521\u60E0\u96EF",
      stage: "product",
      owners: {
        sales: "\u9EC3\u54C1\u8AA0",
        clinic: "\u738B\u4FCA\u5B8F\u91AB\u5E2B",
        ops: "\u6797\u4F73\u7A4E",
        ai: "\u5065\u5EB7\u9867\u554F\u7CFB\u7D71"
      },
      next: {
        sales: "\u8FFD\u8E64\u7B2C 7 \u65E5\u91CF\u8868",
        clinic: "\u8A3A\u6240\u5DF2\u8A55\u4F30\u7121\u9808\u4ECB\u5165",
        ops: "\u5DF2\u51FA\u8CA8 2 \u7BB1",
        ai: "7 \u65E5\u56DE\u8A2A\u89F8\u767C"
      },
      risk: null,
      summary: "\u52A9\u7720\u8212\u58D3\u65B9\u6848\uFF0C\u9069\u914D\u5EA6\u4F73\u3002"
    },
    {
      id: "M-2025-0118",
      name: "\u5468\u6167\u541B",
      stage: "intake",
      owners: {
        sales: "\u9EC3\u54C1\u8AA0",
        clinic: "\u2014",
        ops: "\u2014",
        ai: "\u2014"
      },
      next: {
        sales: "\u554F\u5377\u88DC\u586B\u63D0\u9192",
        clinic: "\u2014",
        ops: "\u2014",
        ai: "\u8CC7\u6599\u4E0D\u8DB3"
      },
      risk: "noData",
      summary: "\u5C1A\u672A\u4E0A\u50B3\u6AA2\u6E2C\uFF0C\u4E0D\u53EF\u751F\u6210\u5B8C\u6574\u65B9\u6848\u3002"
    }
  ];
  var STAGE_META = {
    intro: {
      label: "\u5F85\u8AAA\u660E"
    },
    member: {
      label: "\u5DF2\u5165\u6703"
    },
    intake: {
      label: "\u554F\u5377\u4E2D"
    },
    test: {
      label: "\u5F85\u6AA2\u6E2C"
    },
    ai: {
      label: "\u5F85\u5EFA\u8B70"
    },
    product: {
      label: "\u7522\u54C1\u555F\u7528"
    },
    clinic: {
      label: "\u5F85\u8A3A\u6240"
    },
    follow: {
      label: "\u5F85\u56DE\u8A2A"
    }
  };
  Object.assign(window, {
    PRODUCTS,
    NT_SCHEMA,
    bandOf,
    MEMBERS,
    CASES,
    STAGE_META,
    MEMBER_FRIENDLY
  });
  function polar(cx, cy, r, deg) {
    const rad = (deg - 90) * Math.PI / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }
  function scoreValue(scores, key) {
    const raw = Number(scores[key] || 0);
    const value = key === "cor" ? 100 - raw : raw;
    return Math.max(0, Math.min(100, value));
  }
  function compositeScore(scores) {
    return Math.round(NT_SCHEMA.reduce((sum, axis) => sum + scoreValue(scores, axis.key), 0) / NT_SCHEMA.length);
  }
  function withAlpha(hex, alpha) {
    const base = typeof hex === "string" ? hex : THEME.metalLine;
    const clean = base.replace("#", "");
    const parts = clean.length === 3 ? clean.split("").map((part) => part + part) : [
      clean.slice(0, 2),
      clean.slice(2, 4),
      clean.slice(4, 6)
    ];
    const [r, g, b] = parts.map((part) => parseInt(part, 16));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  function pointsString(points) {
    return points.map((point) => `${point.x},${point.y}`).join(" ");
  }
  function compositeTone(value) {
    if (value < 40) return {
      label: "\u9700\u512A\u5148\u8ABF\u6574",
      color: THEME.danger,
      bg: THEME.dangerBg
    };
    if (value < 60) return {
      label: "\u9700\u7559\u610F",
      color: THEME.warn,
      bg: THEME.warnBg
    };
    if (value < 80) return {
      label: "\u826F\u597D",
      color: THEME.good,
      bg: THEME.goodBg
    };
    return {
      label: "\u7406\u60F3",
      color: THEME.good,
      bg: THEME.goodBg
    };
  }
  function toneAccentColor(tone) {
    if (!tone) return THEME.ink;
    return tone.color || THEME.ink;
  }
  function valueDisplayColor(tone) {
    if (!tone) return THEME.ink;
    if (tone.tone === "danger") return THEME.danger;
    if (tone.tone === "warn") return THEME.warn;
    return THEME.ink;
  }
  function senseNarrative(entry, compact = false) {
    const intro = `${entry.name}\u95DC\u4FC2\u5230${entry.meaning}`;
    if (entry.key === "cor") {
      if (entry.raw >= 60) {
        return compact ? `${intro}\uFF0C\u76EE\u524D\u504F\u5411${entry.feeling}\u3002` : `${intro}\uFF0C\u76EE\u524D\u58D3\u529B\u8CA0\u8377\u504F\u9AD8\uFF0C\u8EAB\u9AD4\u6BD4\u8F03\u5BB9\u6613\u51FA\u73FE${entry.feeling}\u7684\u50BE\u5411\u3002`;
      }
      return compact ? `${intro}\uFF0C\u76EE\u524D\u8F03\u63A5\u8FD1${entry.feeling}\u3002` : `${intro}\uFF0C\u76EE\u524D\u58D3\u529B\u56DE\u5FA9\u76F8\u5C0D\u7A69\u5B9A\uFF0C\u6574\u9AD4\u72C0\u614B\u8F03\u63A5\u8FD1${entry.feeling}\u3002`;
    }
    if (entry.value < 40) {
      return compact ? `${intro}\uFF0C\u76EE\u524D\u504F\u4F4E\u3002` : `${intro}\uFF0C\u76EE\u524D\u5206\u6578\u504F\u4F4E\uFF0C\u65E5\u5E38\u88E1\u6BD4\u8F03\u5BB9\u6613\u51FA\u73FE${entry.feeling}\u7684\u72C0\u614B\u3002`;
    }
    if (entry.value < 60) {
      return compact ? `${intro}\uFF0C\u76EE\u524D\u9700\u7559\u610F\u3002` : `${intro}\uFF0C\u76EE\u524D\u9084\u6709\u4E9B\u4E0D\u8DB3\uFF0C\u8FD1\u671F\u6BD4\u8F03\u5BB9\u6613\u51FA\u73FE${entry.feeling}\u7684\u611F\u53D7\u3002`;
    }
    if (entry.value < 80) {
      return compact ? `${intro}\uFF0C\u76EE\u524D\u826F\u597D\u3002` : `${intro}\uFF0C\u76EE\u524D\u7DAD\u6301\u5728\u4E0D\u932F\u7684\u5340\u9593\uFF0C\u6574\u9AD4\u8868\u73FE\u8F03\u63A5\u8FD1${entry.feeling}\u3002`;
    }
    return compact ? `${intro}\uFF0C\u76EE\u524D\u7406\u60F3\u3002` : `${intro}\uFF0C\u76EE\u524D\u8868\u73FE\u7406\u60F3\uFF0C\u8EAB\u5FC3\u53CD\u61C9\u591A\u534A\u6703\u66F4\u63A5\u8FD1${entry.feeling}\u3002`;
  }
  function senseEntries(scores) {
    return NT_SCHEMA.map((axis, index) => {
      const raw = Number(scores[axis.key] || 0);
      const value = scoreValue(scores, axis.key);
      const tone = toneFor(raw, axis.key);
      const feeling = axis.key === "cor" ? raw >= 60 ? axis.high : axis.low : value >= 60 ? axis.high : axis.low;
      return {
        ...axis,
        index,
        raw,
        value,
        tone,
        feeling,
        angle: index * 60
      };
    });
  }
  function axisAnchor(angle) {
    if (angle === 0) {
      return {
        transform: "translate(-50%, -100%)",
        alignItems: "center",
        textAlign: "center"
      };
    }
    if (angle === 180) {
      return {
        transform: "translate(-50%, 0)",
        alignItems: "center",
        textAlign: "center"
      };
    }
    if (angle < 180) {
      return {
        transform: "translate(0, -50%)",
        alignItems: "flex-start",
        textAlign: "left"
      };
    }
    return {
      transform: "translate(-100%, -50%)",
      alignItems: "flex-end",
      textAlign: "right"
    };
  }
  function leaderRadiusOffset(angle) {
    if (angle === 0 || angle === 180) return 26;
    return 20;
  }
  function NeuroRadar({ scores, size = 420, compact = false }) {
    const cx = size / 2;
    const cy = size / 2;
    const levels = [
      20,
      40,
      60,
      80,
      100
    ];
    const outerPlotRadius = size * (compact ? 0.34 : 0.35);
    const labelOffsetX = size * (compact ? 0.026 : 0.03);
    const fillId = compact ? "sense-fill-compact" : "sense-fill-desktop";
    const glowId = compact ? "sense-glow-compact" : "sense-glow-desktop";
    const plateId = compact ? "sense-plate-compact" : "sense-plate-desktop";
    const entries = senseEntries(scores);
    const axisAngles = entries.map((entry) => entry.angle);
    const polygonPoints = entries.map((entry) => polar(cx, cy, outerPlotRadius * (entry.value / 100), entry.angle));
    return /* @__PURE__ */ React.createElement("svg", {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      style: {
        display: "block"
      }
    }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("radialGradient", {
      id: fillId,
      cx: "50%",
      cy: "42%",
      r: "68%"
    }, /* @__PURE__ */ React.createElement("stop", {
      offset: "0%",
      stopColor: withAlpha(THEME.metalSoft, compact ? 0.24 : 0.2)
    }), /* @__PURE__ */ React.createElement("stop", {
      offset: "70%",
      stopColor: withAlpha(THEME.metal, compact ? 0.12 : 0.1)
    }), /* @__PURE__ */ React.createElement("stop", {
      offset: "100%",
      stopColor: withAlpha(THEME.metalTint, 0.03)
    })), /* @__PURE__ */ React.createElement("radialGradient", {
      id: glowId,
      cx: "50%",
      cy: "50%",
      r: "54%"
    }, /* @__PURE__ */ React.createElement("stop", {
      offset: "0%",
      stopColor: withAlpha(THEME.metalTint, 0.9)
    }), /* @__PURE__ */ React.createElement("stop", {
      offset: "100%",
      stopColor: withAlpha(THEME.metalTint, 0)
    })), /* @__PURE__ */ React.createElement("radialGradient", {
      id: plateId,
      cx: "50%",
      cy: "48%",
      r: "58%"
    }, /* @__PURE__ */ React.createElement("stop", {
      offset: "0%",
      stopColor: withAlpha(THEME.cardBg, 0.94)
    }), /* @__PURE__ */ React.createElement("stop", {
      offset: "62%",
      stopColor: withAlpha(THEME.metalTint, compact ? 0.24 : 0.18)
    }), /* @__PURE__ */ React.createElement("stop", {
      offset: "100%",
      stopColor: withAlpha(THEME.metalTint, 0)
    }))), /* @__PURE__ */ React.createElement("circle", {
      cx,
      cy,
      r: outerPlotRadius + size * (compact ? 0.05 : 0.06),
      fill: `url(#${glowId})`
    }), /* @__PURE__ */ React.createElement("circle", {
      cx,
      cy,
      r: outerPlotRadius + size * (compact ? 0.028 : 0.032),
      fill: `url(#${plateId})`
    }), /* @__PURE__ */ React.createElement("circle", {
      cx,
      cy,
      r: outerPlotRadius + size * (compact ? 0.056 : 0.07),
      fill: "none",
      stroke: withAlpha(THEME.metalLine, compact ? 0.84 : 0.72),
      strokeWidth: compact ? "1.15" : "1.1",
      strokeDasharray: compact ? "3 6" : "4 8"
    }), levels.map((level, index) => {
      const ringRadius = outerPlotRadius * (level / 100);
      const ringPoints = axisAngles.map((deg) => polar(cx, cy, ringRadius, deg));
      return /* @__PURE__ */ React.createElement("polygon", {
        key: `grid-${level}`,
        points: pointsString(ringPoints),
        fill: index === levels.length - 1 ? withAlpha(THEME.metalTint, 0.15) : index % 2 === 0 ? withAlpha(THEME.metalTint, compact ? 0.08 : 0.06) : "none",
        stroke: index === levels.length - 1 ? THEME.metalLine : withAlpha(THEME.lineSoft, 0.95),
        strokeWidth: index === levels.length - 1 ? "1.05" : "0.8"
      });
    }), axisAngles.map((deg) => {
      const outerPoint = polar(cx, cy, outerPlotRadius, deg);
      return /* @__PURE__ */ React.createElement("line", {
        key: `axis-${deg}`,
        x1: cx,
        y1: cy,
        x2: outerPoint.x,
        y2: outerPoint.y,
        stroke: withAlpha(THEME.lineSoft, 0.98),
        strokeWidth: "0.9"
      });
    }), axisAngles.map((deg) => {
      const tickStart = polar(cx, cy, outerPlotRadius + size * 6e-3, deg);
      const tickEnd = polar(cx, cy, outerPlotRadius + size * (compact ? 0.024 : 0.028), deg);
      return /* @__PURE__ */ React.createElement("line", {
        key: `tick-${deg}`,
        x1: tickStart.x,
        y1: tickStart.y,
        x2: tickEnd.x,
        y2: tickEnd.y,
        stroke: withAlpha(THEME.metalLine, 0.82),
        strokeWidth: "1"
      });
    }), levels.map((level) => {
      const y = cy - outerPlotRadius * (level / 100);
      return /* @__PURE__ */ React.createElement("text", {
        key: `level-label-${level}`,
        x: cx + labelOffsetX,
        y: y + 4,
        fontSize: compact ? 10 : 11,
        fill: THEME.metal,
        style: {
          fontFamily: THEME.serif,
          letterSpacing: 0.5
        }
      }, level);
    }), /* @__PURE__ */ React.createElement("polygon", {
      points: pointsString(polygonPoints),
      fill: "none",
      stroke: withAlpha(THEME.metalSoft, compact ? 0.18 : 0.14),
      strokeWidth: compact ? "4.5" : "6",
      strokeLinejoin: "round"
    }), /* @__PURE__ */ React.createElement("polygon", {
      points: pointsString(polygonPoints),
      fill: `url(#${fillId})`,
      stroke: withAlpha(THEME.ink, 0.74),
      strokeWidth: compact ? "1.2" : "1.35",
      strokeLinejoin: "round"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx,
      cy,
      r: compact ? 9 : 12,
      fill: "none",
      stroke: withAlpha(THEME.metalLine, compact ? 0.46 : 0.38),
      strokeWidth: "0.9"
    }), /* @__PURE__ */ React.createElement("circle", {
      cx,
      cy,
      r: compact ? 2.6 : 3.2,
      fill: withAlpha(THEME.metalSoft, 0.86)
    }), polygonPoints.map((point, index) => /* @__PURE__ */ React.createElement("circle", {
      key: `point-${entries[index].key}`,
      cx: point.x,
      cy: point.y,
      r: compact ? 4 : 4.6,
      fill: THEME.cardBg,
      stroke: withAlpha(THEME.ink, 0.74),
      strokeWidth: "1"
    })));
  }
  function BalanceScoreCard({ scores, compact = false }) {
    const avg = compositeScore(scores);
    const tone = compositeTone(avg);
    const knobSize = compact ? 8 : 10;
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        padding: compact ? "16px 18px 14px" : "24px 24px 20px",
        background: `linear-gradient(180deg, rgba(255,255,255,0.96) 0%, ${THEME.surfaceSoft} 100%)`,
        border: `1px solid ${THEME.line}`,
        borderRadius: compact ? 20 : 26,
        boxShadow: `0 24px 50px -38px ${withAlpha(THEME.ink, 0.36)}`,
        backdropFilter: "blur(10px)"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: compact ? 9 : 10,
        color: THEME.metal,
        letterSpacing: compact ? 3 : 4,
        marginBottom: compact ? 10 : 14
      }
    }, "\u6574\u9AD4\u5E73\u8861\u6307\u6578"), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: compact ? 4 : 6,
        marginBottom: compact ? 12 : 16
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: compact ? 46 : 60,
        color: tone.color,
        lineHeight: 0.9,
        fontWeight: 400,
        letterSpacing: 0
      }
    }, avg), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: compact ? 16 : 18,
        color: THEME.inkMute,
        letterSpacing: 1
      }
    }, "/100")), /* @__PURE__ */ React.createElement("div", {
      style: {
        position: "relative",
        height: compact ? 6 : 7,
        borderRadius: 999,
        background: withAlpha(THEME.line, 0.95),
        overflow: "hidden",
        marginBottom: compact ? 12 : 16
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        width: `${avg}%`,
        height: "100%",
        borderRadius: 999,
        background: `linear-gradient(90deg, ${THEME.metalSoft} 0%, ${tone.color} 100%)`
      }
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        position: "absolute",
        top: "50%",
        left: `calc(${avg}% - ${knobSize / 2}px)`,
        width: knobSize,
        height: knobSize,
        borderRadius: 999,
        background: THEME.cardBg,
        border: `1px solid ${tone.color}`,
        transform: "translateY(-50%)",
        boxShadow: `0 0 0 2px ${THEME.cardBg}`
      }
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        padding: compact ? "4px 10px" : "5px 12px",
        background: tone.bg,
        color: tone.color,
        borderRadius: 999,
        fontSize: compact ? 10 : 11,
        letterSpacing: compact ? 2 : 2.5
      }
    }, tone.label), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: compact ? 10 : 11,
        color: THEME.inkSoft,
        letterSpacing: 1.2
      }
    }, "\u5E73\u8861\u72C0\u614B")));
  }
  function CompositeScoreStrip({ scores, compact = false }) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        marginBottom: compact ? 14 : 18
      }
    }, /* @__PURE__ */ React.createElement(BalanceScoreCard, {
      scores,
      compact
    }));
  }
  function SenseInsightGrid({ scores, columns = 3, compact = false }) {
    const entries = senseEntries(scores);
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: compact ? 8 : 14
      }
    }, entries.map((entry) => /* @__PURE__ */ React.createElement("div", {
      key: entry.key,
      className: `in-fade-up in-delay-${Math.min(entry.index + 1, 6)}`,
      style: {
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        minHeight: compact ? "auto" : 208,
        padding: compact ? "12px 12px 10px" : "18px 22px 16px",
        background: compact ? THEME.cardBg : `linear-gradient(180deg, ${withAlpha(THEME.cardBg, 0.96)} 0%, ${withAlpha(entry.tone.bg, 0.86)} 100%)`,
        border: `1px solid ${THEME.line}`,
        borderTop: `1px solid ${withAlpha(toneAccentColor(entry.tone), compact ? 0.16 : 0.32)}`,
        boxShadow: compact ? "none" : `0 20px 34px -30px ${withAlpha(THEME.ink, 0.24)}`
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: compact ? 9 : 10,
        color: THEME.metal,
        letterSpacing: compact ? 1 : 2,
        marginBottom: compact ? 8 : 10
      }
    }, String(entry.index + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: compact ? 14 : 17,
        color: THEME.ink,
        letterSpacing: compact ? 2.5 : 4,
        marginBottom: 4
      }
    }, entry.name), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: compact ? 8.5 : 9.5,
        color: THEME.metal,
        letterSpacing: compact ? 1.5 : 2,
        fontFamily: THEME.serif,
        fontStyle: "italic"
      }
    }, entry.en, "\u3000\xB7\u3000", entry.plain)), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: compact ? 26 : 30,
        color: valueDisplayColor(entry.tone),
        lineHeight: 0.92,
        flexShrink: 0
      }
    }, entry.value)), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: compact ? 10 : 11,
        color: THEME.inkSoft,
        lineHeight: compact ? 1.7 : 1.82,
        letterSpacing: 0.8,
        marginTop: compact ? 8 : 10,
        marginBottom: compact ? 8 : 10,
        flex: 1
      }
    }, senseNarrative(entry, compact)), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        padding: compact ? "3px 8px" : "4px 10px",
        borderRadius: 999,
        background: entry.tone.bg,
        color: toneAccentColor(entry.tone),
        fontSize: compact ? 8.5 : 9.5,
        letterSpacing: compact ? 1.5 : 2
      }
    }, entry.tone.label))));
  }
  function RadarAxisLabel({ entry, x, y, compact = false, showEnglish = true }) {
    const anchor = axisAnchor(entry.angle);
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        position: "absolute",
        left: x,
        top: y,
        width: compact ? entry.angle === 0 || entry.angle === 180 ? 76 : 60 : 132,
        display: "flex",
        flexDirection: "column",
        gap: compact ? 2 : 4,
        ...anchor
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: compact ? 11.5 : 18,
        color: THEME.ink,
        letterSpacing: compact ? 1.5 : 4,
        lineHeight: 1.15
      }
    }, entry.name), showEnglish && /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 9.5,
        color: THEME.metal,
        letterSpacing: 1.8
      }
    }, entry.en), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: compact ? 20 : 44,
        lineHeight: 0.94,
        color: valueDisplayColor(entry.tone),
        marginTop: compact ? 1 : 2
      }
    }, entry.value));
  }
  function RadarFigure({ scores, mobile = false }) {
    const entries = senseEntries(scores);
    const stageWidth = mobile ? 316 : 560;
    const stageHeight = mobile ? 316 : 560;
    const chartSize = mobile ? 208 : 340;
    const chartCompact = mobile;
    const chartRadius = chartSize * (chartCompact ? 0.34 : 0.35);
    const chartCenterX = stageWidth / 2 + (mobile ? -8 : 0);
    const chartCenterY = stageHeight / 2;
    const chartLeft = chartCenterX - chartSize / 2;
    const chartTop = chartCenterY - chartSize / 2;
    const labelRadius = mobile ? 116 : 182;
    const outerRingOffset = mobile ? 14 : 18;
    const leaderStartOffset = mobile ? 8 : 12;
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        position: "relative",
        width: stageWidth,
        height: stageHeight
      }
    }, /* @__PURE__ */ React.createElement("svg", {
      width: stageWidth,
      height: stageHeight,
      viewBox: `0 0 ${stageWidth} ${stageHeight}`,
      style: {
        position: "absolute",
        inset: 0
      }
    }, /* @__PURE__ */ React.createElement("circle", {
      cx: chartCenterX,
      cy: chartCenterY,
      r: labelRadius + outerRingOffset,
      fill: "none",
      stroke: withAlpha(THEME.metalLine, mobile ? 0.62 : 0.66),
      strokeWidth: mobile ? "1" : "1.1",
      strokeDasharray: mobile ? "3 7" : "3 8"
    }), entries.map((entry) => {
      const start = polar(chartCenterX, chartCenterY, chartRadius + leaderStartOffset, entry.angle);
      const end = polar(chartCenterX, chartCenterY, labelRadius - leaderRadiusOffset(entry.angle), entry.angle);
      return /* @__PURE__ */ React.createElement("line", {
        key: `leader-${entry.key}`,
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
        stroke: withAlpha(THEME.metalLine, mobile ? 0.74 : 0.78),
        strokeWidth: "1",
        strokeDasharray: mobile ? "2.5 6" : "3 7"
      });
    })), entries.map((entry) => {
      const point = polar(chartCenterX, chartCenterY, labelRadius, entry.angle);
      return /* @__PURE__ */ React.createElement(RadarAxisLabel, {
        key: `axis-label-${entry.key}`,
        entry,
        x: point.x,
        y: point.y,
        compact: mobile,
        showEnglish: !mobile
      });
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        position: "absolute",
        left: chartLeft,
        top: chartTop
      }
    }, /* @__PURE__ */ React.createElement(NeuroRadar, {
      scores,
      size: chartSize,
      compact: chartCompact
    })));
  }
  function NeuroHero({ scores }) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(0, 560px) minmax(0, 1fr)",
        gap: 30,
        alignItems: "stretch",
        padding: "34px 36px 34px",
        background: `linear-gradient(180deg, #FFFFFF 0%, ${THEME.surfaceSoft} 100%)`,
        border: `1px solid ${THEME.line}`,
        overflow: "hidden"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px 8px",
        background: `
          radial-gradient(circle at 14% 10%, ${withAlpha(THEME.metalTint, 0.76)} 0%, transparent 24%),
          radial-gradient(circle at 88% 88%, ${withAlpha(THEME.metalTint, 0.42)} 0%, transparent 28%),
          linear-gradient(180deg, #FFFFFF 0%, ${THEME.surfaceSoft} 100%)
        `,
        border: `1px solid ${THEME.line}`,
        minWidth: 0
      }
    }, /* @__PURE__ */ React.createElement(RadarFigure, {
      scores
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18,
        minWidth: 0,
        paddingTop: 36,
        paddingLeft: 22
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        maxWidth: 312
      }
    }, /* @__PURE__ */ React.createElement(BalanceScoreCard, {
      scores
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        paddingTop: 18,
        borderTop: `1px solid ${THEME.line}`
      }
    }, /* @__PURE__ */ React.createElement(SenseInsightGrid, {
      scores,
      columns: 2
    }))));
  }
  function NeuroCards({ scores, columns = 3 }) {
    return /* @__PURE__ */ React.createElement(SenseInsightGrid, {
      scores,
      columns
    });
  }
  function NeuroBars({ scores }) {
    const entries = senseEntries(scores);
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18
      }
    }, entries.map((entry) => /* @__PURE__ */ React.createElement("div", {
      key: entry.key,
      className: `in-fade-up in-delay-${Math.min(entry.index + 1, 6)}`
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        marginBottom: 6,
        gap: 8
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 9,
        color: THEME.metal,
        letterSpacing: 2
      }
    }, "N\xB0\xA0", String(entry.index + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 15,
        fontWeight: 400,
        color: THEME.ink,
        letterSpacing: 4
      }
    }, entry.name), /* @__PURE__ */ React.createElement("span", {
      style: {
        fontSize: 9,
        color: THEME.metal,
        letterSpacing: 2,
        fontStyle: "italic",
        fontFamily: THEME.serif
      }
    }, "\uFF0F", entry.plain), /* @__PURE__ */ React.createElement("span", {
      style: {
        flex: 1
      }
    }), /* @__PURE__ */ React.createElement("span", {
      style: {
        fontSize: 9,
        color: toneAccentColor(entry.tone),
        letterSpacing: 2,
        marginRight: 12
      }
    }, entry.tone.label), /* @__PURE__ */ React.createElement(Metric, {
      value: entry.value,
      tone: valueDisplayColor(entry.tone),
      size: 20
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        position: "relative",
        height: 1,
        background: THEME.line
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "in-bar",
      style: {
        height: "100%",
        width: `${entry.value}%`,
        background: toneAccentColor(entry.tone),
        animationDelay: `${0.15 + entry.index * 0.08}s`
      }
    })))));
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
    SenseInsightGrid
  });
  function DeskSection({ n, label, en, subtitle, children, delay = 0 }) {
    return /* @__PURE__ */ React.createElement("section", {
      className: "in-fade-up",
      style: {
        animationDelay: `${delay}s`,
        marginBottom: 60
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 16,
        marginBottom: 8
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 12,
        color: THEME.metal,
        letterSpacing: 2,
        width: 28
      }
    }, n), /* @__PURE__ */ React.createElement("span", {
      className: "in-hair",
      style: {
        width: 44,
        height: 1,
        background: THEME.ink,
        display: "block"
      }
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 24,
        color: THEME.ink,
        letterSpacing: 5
      }
    }, label), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 11,
        color: THEME.metal,
        letterSpacing: 3,
        marginLeft: 8
      }
    }, en)), subtitle && /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 12,
        color: THEME.inkSoft,
        letterSpacing: 1.5,
        lineHeight: 1.9,
        marginBottom: 24,
        marginLeft: 88
      }
    }, subtitle), /* @__PURE__ */ React.createElement("div", {
      style: {
        marginLeft: 88
      }
    }, children));
  }
  function DeskCover({ member }) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-in",
      style: {
        padding: "64px 72px 48px",
        borderBottom: `1px solid ${THEME.ink}`,
        background: THEME.cardBg,
        position: "relative"
      }
    }, /* @__PURE__ */ React.createElement(Corners, {
      size: 22,
      inset: 18,
      color: THEME.ink
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        textAlign: "center",
        marginBottom: 36
      }
    }, /* @__PURE__ */ React.createElement(Eyebrow, {
      size: 10,
      letter: 8
    }, "Health Atelier"), /* @__PURE__ */ React.createElement("div", {
      style: {
        margin: "14px auto 0"
      }
    }, /* @__PURE__ */ React.createElement(HairRule, {
      w: 50
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 5,
        marginTop: 12
      }
    }, "Private Counsel \xB7 Member Edition")), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 40,
        alignItems: "end"
      }
    }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 11,
        color: THEME.metal,
        letterSpacing: 3,
        marginBottom: 8
      }
    }, "\u656C\u81F4\u3000", /* @__PURE__ */ React.createElement("span", {
      style: {
        color: THEME.ink
      }
    }, member.level)), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 60,
        fontWeight: 300,
        color: THEME.ink,
        letterSpacing: 12,
        lineHeight: 1.1
      }
    }, member.name, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 20,
        color: THEME.inkMute,
        letterSpacing: 3,
        marginLeft: 12
      }
    }, "\u5148\u751F\uFF0F\u5973\u58EB")), /* @__PURE__ */ React.createElement("div", {
      style: {
        marginTop: 22,
        fontSize: 12,
        color: THEME.inkSoft,
        letterSpacing: 1.5,
        lineHeight: 2,
        maxWidth: 520
      }
    }, "\u8B39\u70BA\u95A3\u4E0B\u6574\u7406\u672C\u5B63\u8EAB\u5FC3\u72C0\u614B\u8207\u672C\u671F\u5EFA\u8B70\u65B9\u5411\uFF0C", /* @__PURE__ */ React.createElement("br", null), "\u8ACB\u8207\u60A8\u7684\u6703\u54E1\u9867\u554F\u4E00\u540C\u5BE9\u95B1\u3002")), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: 0,
        paddingBottom: 4,
        border: `1px solid ${THEME.line}`
      }
    }, [
      {
        label: "N\xB0",
        value: member.id
      },
      {
        label: "Edition",
        value: "2026.04.21"
      },
      {
        label: "Revisit",
        value: member.nextVisit
      }
    ].map((x, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      style: {
        padding: "14px 22px",
        borderRight: i < 2 ? `1px solid ${THEME.line}` : "none"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 9,
        color: THEME.metal,
        letterSpacing: 3,
        marginBottom: 6
      }
    }, x.label), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 14,
        color: THEME.ink,
        letterSpacing: 2
      }
    }, x.value))))));
  }
  function DeskBodyMessage({ member }) {
    const m = member.lifestyle;
    const items = [
      {
        label: "\u7761\u7720",
        value: m.sleep,
        unit: "\u6642",
        ideal: "7\u20138",
        flag: m.sleep < 6,
        en: "Sleep"
      },
      {
        label: "\u58D3\u529B",
        value: m.stress,
        unit: "\uFF0F10",
        ideal: "\u2264 4",
        flag: m.stress >= 6,
        en: "Stress"
      },
      {
        label: "\u75B2\u52DE",
        value: m.fatigue,
        unit: "\uFF0F10",
        ideal: "\u2264 4",
        flag: m.fatigue >= 6,
        en: "Fatigue"
      },
      {
        label: "\u9AD4\u614B",
        value: m.bmi,
        unit: "BMI",
        ideal: "22\u201324",
        flag: m.bmi >= 27,
        en: "BMI"
      },
      {
        label: "\u8170\u570D",
        value: m.waist,
        unit: "cm",
        ideal: "\u2264 90",
        flag: m.waist >= 90,
        en: "Waist"
      }
    ];
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 0,
        border: `1px solid ${THEME.line}`
      }
    }, items.map((it, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      className: `in-fade-up in-delay-${Math.min(i + 1, 5)}`,
      style: {
        padding: "22px 22px 20px",
        background: THEME.cardBg,
        borderRight: i < 4 ? `1px solid ${THEME.line}` : "none",
        borderTop: it.flag ? `2px solid ${THEME.danger}` : "none"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 3,
        marginBottom: 14
      }
    }, it.en), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 14,
        color: THEME.ink,
        letterSpacing: 3,
        marginBottom: 12
      }
    }, it.label), /* @__PURE__ */ React.createElement(Metric, {
      value: it.value,
      unit: it.unit,
      tone: it.flag ? "danger" : "ink",
      size: 36
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        marginTop: 14,
        paddingTop: 10,
        borderTop: `1px solid ${THEME.lineSoft}`,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 10,
        letterSpacing: 1
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        color: THEME.metal,
        fontStyle: "italic",
        fontFamily: THEME.serif
      }
    }, "ideal ", it.ideal), it.flag && /* @__PURE__ */ React.createElement("span", {
      style: {
        color: THEME.danger,
        letterSpacing: 2
      }
    }, "\u25CF \u9700\u95DC\u6CE8")))));
  }
  function DeskSixSenses({ member, viz }) {
    if (viz === "bars") return /* @__PURE__ */ React.createElement(NeuroBars, {
      scores: member.nt
    });
    if (viz === "cards") return /* @__PURE__ */ React.createElement(NeuroCards, {
      scores: member.nt,
      columns: 3
    });
    return /* @__PURE__ */ React.createElement(NeuroHero, {
      scores: member.nt
    });
  }
  function DeskDirection({ member }) {
    const b = member.brief;
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-up",
      style: {
        padding: "32px 36px 30px",
        marginBottom: 24,
        background: THEME.panelGradient,
        color: THEME.cardBg,
        boxShadow: THEME.darkPanelShadow
      }
    }, /* @__PURE__ */ React.createElement(Eyebrow, {
      color: THEME.metalSoft,
      size: 10,
      letter: 6
    }, "This Season \xB7 Direction"), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 32,
        color: THEME.cardBg,
        letterSpacing: 6,
        marginTop: 16,
        lineHeight: 1.4
      }
    }, b.direction)), b.insights.length > 0 && /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${b.insights.length}, 1fr)`,
        gap: 0,
        marginBottom: 28,
        border: `1px solid ${THEME.line}`
      }
    }, b.insights.map((x, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      className: `in-fade-up in-delay-${i + 1}`,
      style: {
        padding: "22px 24px",
        borderRight: i < b.insights.length - 1 ? `1px solid ${THEME.line}` : "none"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 13,
        color: THEME.metal,
        letterSpacing: 1,
        marginBottom: 10
      }
    }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 17,
        color: THEME.ink,
        letterSpacing: 4,
        marginBottom: 8
      }
    }, x.label), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 12,
        color: THEME.inkSoft,
        lineHeight: 1.9,
        letterSpacing: 1
      }
    }, x.detail)))), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        gap: 20,
        padding: "20px 24px",
        background: THEME.surfaceSoft
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 12,
        color: THEME.metal,
        letterSpacing: 4,
        paddingTop: 4
      }
    }, "Why"), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 13,
        color: THEME.ink,
        lineHeight: 2.1,
        letterSpacing: 1
      }
    }, b.reason)));
  }
  function DeskProducts({ member }) {
    const [picked, setPicked] = React.useState({});
    const b = member.brief;
    if (!b.products.length) return null;
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 0,
        border: `1px solid ${THEME.line}`
      }
    }, b.products.map((pid, i) => {
      const p = PRODUCTS[pid];
      const taken = !!picked[pid];
      return /* @__PURE__ */ React.createElement("div", {
        key: pid,
        className: `in-fade-up in-delay-${Math.min(i + 1, 6)}`,
        style: {
          background: THEME.cardBg,
          padding: "26px 28px",
          display: "grid",
          gridTemplateColumns: "88px 1fr auto",
          gap: 22,
          alignItems: "center",
          borderRight: i % 2 === 0 ? `1px solid ${THEME.line}` : "none",
          borderBottom: i < b.products.length - 2 ? `1px solid ${THEME.line}` : "none"
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          width: 88,
          height: 112,
          background: THEME.surfaceSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          border: `1px solid ${THEME.metalLine}`
        }
      }, /* @__PURE__ */ React.createElement("span", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 10,
          color: THEME.metal,
          letterSpacing: 1,
          position: "absolute",
          top: 8,
          left: 10
        }
      }, "N\xB0"), /* @__PURE__ */ React.createElement("span", {
        style: {
          fontFamily: THEME.serif,
          fontSize: 28,
          color: THEME.ink,
          letterSpacing: 0
        }
      }, String(i + 1).padStart(2, "0"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 10,
          color: THEME.metal,
          letterSpacing: 3,
          marginBottom: 8
        }
      }, p.tag), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontSize: 20,
          color: THEME.ink,
          letterSpacing: 3,
          lineHeight: 1.4,
          marginBottom: 8
        }
      }, p.name), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontSize: 10,
          color: THEME.inkMute,
          letterSpacing: 2
        }
      }, p.unit)), /* @__PURE__ */ React.createElement("button", {
        className: "in-btn",
        onClick: () => setPicked((s) => ({
          ...s,
          [pid]: !s[pid]
        })),
        style: {
          padding: "11px 22px",
          background: taken ? THEME.cardBg : THEME.ink,
          color: taken ? THEME.ink : THEME.cardBg,
          border: `1px solid ${THEME.ink}`,
          fontSize: 11,
          letterSpacing: 5,
          fontFamily: THEME.serif,
          whiteSpace: "nowrap"
        }
      }, taken ? "\u5DF2\u53D6\u8CA8" : "\u53D6\u3000\u8CA8"));
    }));
  }
  function DeskThreeLayer({ member }) {
    const s = member.brief.service;
    const layers = [
      {
        tier: "\u5C45\u5BB6\u65E5\u5E38",
        en: "Home",
        items: s.home,
        note: "\u65E5\u5E38\u7BC0\u594F\u8207\u7FD2\u6163",
        n: "I"
      },
      {
        tier: "\u6703\u54E1\u9867\u554F",
        en: "Counsel",
        items: s.advise,
        note: "\u5C08\u5C6C\u95DC\u5FC3\u8207\u56DE\u8A2A",
        n: "II"
      },
      {
        tier: "\u4FF1\u6A02\u90E8\u8A3A\u6240",
        en: "Clinic",
        items: s.clinic,
        note: "\u5FC5\u8981\u6642\u7684\u91AB\u7642\u4ECB\u9762",
        n: "III"
      }
    ];
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 0,
        border: `1px solid ${THEME.line}`
      }
    }, layers.map((l, i) => /* @__PURE__ */ React.createElement("div", {
      key: l.tier,
      className: `in-fade-up in-delay-${i + 1}`,
      style: {
        background: THEME.cardBg,
        padding: "28px 28px 24px",
        borderRight: i < 2 ? `1px solid ${THEME.line}` : "none"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 14,
        marginBottom: 20,
        paddingBottom: 14,
        borderBottom: `1px solid ${THEME.ink}`
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 20,
        color: THEME.metal,
        letterSpacing: 1,
        minWidth: 30
      }
    }, l.n), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 20,
        color: THEME.ink,
        letterSpacing: 4
      }
    }, l.tier), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 3,
        marginTop: 2
      }
    }, l.en, " \xB7 ", l.note))), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, l.items.map((x, j) => /* @__PURE__ */ React.createElement("div", {
      key: j,
      style: {
        display: "grid",
        gridTemplateColumns: "10px 1fr",
        gap: 10,
        fontSize: 12,
        color: THEME.inkSoft,
        lineHeight: 1.8,
        letterSpacing: 0.5
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        color: THEME.ink,
        fontSize: 6,
        paddingTop: 8
      }
    }, "\u25A0"), /* @__PURE__ */ React.createElement("span", null, x)))))));
  }
  function DeskJourney({ member }) {
    const stages = member.journey;
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      style: {
        position: "relative",
        padding: "10px 0 26px"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        position: "absolute",
        top: 42,
        left: 24,
        right: 24,
        height: 1,
        background: THEME.line
      }
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${stages.length}, 1fr)`,
        position: "relative"
      }
    }, stages.map((s, i) => {
      const filled = s.done;
      const current = s.current;
      return /* @__PURE__ */ React.createElement("div", {
        key: i,
        className: `in-fade-up in-delay-${Math.min(i + 1, 6)}`,
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 10,
          color: THEME.metal,
          letterSpacing: 2
        }
      }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", {
        className: current ? "in-pulse" : "",
        style: {
          width: 12,
          height: 12,
          background: filled ? THEME.ink : THEME.cardBg,
          border: `1.5px solid ${current ? THEME.ink : filled ? THEME.ink : THEME.metalLine}`,
          boxShadow: current ? `0 0 0 5px ${THEME.metalTint}` : "none",
          transform: "rotate(45deg)"
        }
      }), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontSize: 13,
          color: current ? THEME.ink : filled ? THEME.ink : THEME.inkMute,
          letterSpacing: 3,
          textAlign: "center",
          fontWeight: current ? 500 : 400
        }
      }, s.label), s.date && /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 10,
          color: THEME.metal,
          letterSpacing: 1
        }
      }, s.date));
    }))), member.brief.followUp.length > 0 && /* @__PURE__ */ React.createElement("div", {
      style: {
        marginTop: 20,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 0,
        border: `1px solid ${THEME.line}`
      }
    }, member.brief.followUp.map((f, i) => /* @__PURE__ */ React.createElement("div", {
      key: f.day,
      className: `in-fade-up in-delay-${i + 1}`,
      style: {
        background: THEME.surfaceSoft,
        padding: "18px 22px 16px",
        borderLeft: i === 0 ? "none" : `1px solid ${THEME.line}`,
        borderTop: `2px solid ${THEME.ink}`
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 12,
        color: THEME.metal,
        letterSpacing: 4,
        marginBottom: 8
      }
    }, "Day + ", f.day), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 12,
        color: THEME.ink,
        lineHeight: 1.8,
        letterSpacing: 1
      }
    }, f.item)))));
  }
  function DeskFamily({ member }) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(member.family.length, 7)}, 1fr)`,
        gap: 0,
        border: `1px solid ${THEME.line}`
      }
    }, member.family.map((f, i) => {
      const mine = f.role === "\u672C\u4EBA";
      return /* @__PURE__ */ React.createElement("div", {
        key: i,
        className: `in-fade-up in-delay-${Math.min(i + 1, 6)}`,
        style: {
          background: mine ? THEME.panelGradientSoft : THEME.cardBg,
          color: mine ? THEME.cardBg : THEME.ink,
          padding: "20px 12px 18px",
          textAlign: "center",
          borderRight: i < member.family.length - 1 ? `1px solid ${mine ? THEME.inkDeep : THEME.line}` : "none"
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 9,
          color: mine ? THEME.metalSoft : THEME.metal,
          letterSpacing: 3,
          marginBottom: 10
        }
      }, f.role), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontSize: 17,
          letterSpacing: 3
        }
      }, f.name), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 10,
          color: mine ? THEME.metalSoft : THEME.inkMute,
          margin: "5px 0 12px",
          letterSpacing: 1
        }
      }, f.age, " \u6B72"), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontSize: 9,
          color: mine ? THEME.metalSoft : THEME.inkSoft,
          letterSpacing: 2
        }
      }, f.stage));
    }));
  }
  function PanelADesktop({ member, viz }) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        background: THEME.cardBg,
        color: THEME.ink,
        fontFamily: THEME.sans,
        minHeight: "100%"
      }
    }, /* @__PURE__ */ React.createElement(DeskCover, {
      member
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        padding: "64px 72px 72px"
      }
    }, /* @__PURE__ */ React.createElement(DeskSection, {
      n: "I",
      label: "\u8EAB\u9AD4\u8A0A\u606F",
      en: "Body Signals",
      subtitle: "\u9019\u4E9B\u662F\u60A8\u6700\u8FD1\u7684\u751F\u6D3B\u7D00\u9304\uFF1B\u7D05\u8272\u6A19\u8A3B\u7684\u9805\u76EE\u503C\u5F97\u7279\u5225\u7559\u610F\u3002",
      delay: 0.05
    }, /* @__PURE__ */ React.createElement(DeskBodyMessage, {
      member
    })), /* @__PURE__ */ React.createElement(DeskSection, {
      n: "II",
      label: "\u8EAB\u5FC3\u516D\u611F",
      en: "Six Senses",
      subtitle: "\u8EAB\u9AD4\u900F\u904E\u516D\u7A2E\u795E\u7D93\u50B3\u5C0E\u7269\u8CEA\u8868\u9054\u72C0\u614B\uFF1B\u591A\u5DF4\u80FA\u3001\u50AC\u7522\u7D20\u3001\u8840\u6E05\u7D20\u3001\u76AE\u8CEA\u9187\u3001\u8166\u5167\u5561\u3001\u776A\u56FA\u916E\u3002",
      delay: 0.1
    }, /* @__PURE__ */ React.createElement(DeskSixSenses, {
      member,
      viz
    })), /* @__PURE__ */ React.createElement(DeskSection, {
      n: "III",
      label: "\u91CF\u8EAB\u65B9\u5411",
      en: "Direction",
      delay: 0.15
    }, /* @__PURE__ */ React.createElement(DeskDirection, {
      member
    })), /* @__PURE__ */ React.createElement(DeskSection, {
      n: "IV",
      label: "\u70BA\u60A8\u63A8\u85A6",
      en: "Selected for You",
      subtitle: "\u4F9D\u8EAB\u5FC3\u516D\u611F\u7D50\u679C\uFF0C\u5F9E\u5EB7\u6A02\u5BCC\u7522\u54C1\u7CFB\u5217\u4E2D\u70BA\u60A8\u9078\u51FA\u672C\u671F\u7167\u9867\u8D77\u9EDE\uFF1B\u9EDE\u9078\u53F3\u5074\u300C\u53D6\u8CA8\u300D\u5373\u5B89\u6392\u9001\u9054\u3002",
      delay: 0.2
    }, /* @__PURE__ */ React.createElement(DeskProducts, {
      member
    })), /* @__PURE__ */ React.createElement(DeskSection, {
      n: "V",
      label: "\u4E09\u5C64\u966A\u4F34",
      en: "Three Layers",
      delay: 0.25
    }, /* @__PURE__ */ React.createElement(DeskThreeLayer, {
      member
    })), /* @__PURE__ */ React.createElement(DeskSection, {
      n: "VI",
      label: "\u4FF1\u6A02\u90E8\u65C5\u7A0B",
      en: "Journey",
      delay: 0.3
    }, /* @__PURE__ */ React.createElement(DeskJourney, {
      member
    })), /* @__PURE__ */ React.createElement(DeskSection, {
      n: "VII",
      label: "\u5BB6\u65CF\u7DB2\u7D61",
      en: "Family",
      delay: 0.35
    }, /* @__PURE__ */ React.createElement(DeskFamily, {
      member
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        textAlign: "center",
        paddingTop: 44,
        borderTop: `1px solid ${THEME.ink}`
      }
    }, /* @__PURE__ */ React.createElement(HairRule, {
      w: 60
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        marginTop: 18,
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 11,
        color: THEME.metal,
        letterSpacing: 8
      }
    }, "Health Atelier\u3000\xB7\u3000", member.id, "\u3000\xB7\u3000Private Edition"))));
  }
  Object.assign(window, {
    PanelADesktop
  });
  function BDeskSection({ n, label, en, right, children, pad = true }) {
    return /* @__PURE__ */ React.createElement("section", {
      style: {
        marginBottom: 28
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 12,
        marginBottom: 14
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 11,
        color: THEME.metal,
        letterSpacing: 2,
        minWidth: 20
      }
    }, n), /* @__PURE__ */ React.createElement("span", {
      className: "in-hair",
      style: {
        width: 24,
        height: 1,
        background: THEME.ink,
        display: "block"
      }
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 17,
        color: THEME.ink,
        letterSpacing: 4
      }
    }, label), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 2
      }
    }, en), /* @__PURE__ */ React.createElement("span", {
      style: {
        flex: 1
      }
    }), right), children);
  }
  function BDeskCasePool({ cases, focusId, onFocus }) {
    const [filter, setFilter] = React.useState("all");
    const stages = [
      "all",
      "ai",
      "test",
      "product",
      "follow",
      "intro"
    ];
    const labelOf = (s) => s === "all" ? "\u5168\u90E8" : STAGE_META[s]?.label || s;
    const filtered = filter === "all" ? cases : cases.filter((c) => c.stage === filter);
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: 0,
        marginBottom: 14,
        border: `1px solid ${THEME.line}`,
        overflow: "hidden"
      }
    }, stages.map((s) => {
      const active = filter === s;
      return /* @__PURE__ */ React.createElement("button", {
        key: s,
        className: "in-btn",
        onClick: () => setFilter(s),
        style: {
          flex: 1,
          background: active ? THEME.ink : THEME.cardBg,
          color: active ? THEME.cardBg : THEME.inkSoft,
          border: "none",
          padding: "9px 6px",
          fontSize: 11,
          letterSpacing: 2,
          fontFamily: THEME.serif,
          whiteSpace: "nowrap"
        }
      }, labelOf(s));
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        border: `1px solid ${THEME.line}`
      }
    }, filtered.map((c, i) => {
      const active = c.id === focusId;
      return /* @__PURE__ */ React.createElement("div", {
        key: c.id,
        className: "in-btn",
        onClick: () => onFocus(c.id),
        style: {
          padding: "14px 18px",
          cursor: "pointer",
          background: active ? THEME.surfaceSoft : THEME.cardBg,
          borderLeft: `2px solid ${active ? THEME.ink : "transparent"}`,
          borderBottom: i < filtered.length - 1 ? `1px solid ${THEME.lineSoft}` : "none"
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 4
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontSize: 16,
          color: THEME.ink,
          letterSpacing: 3
        }
      }, c.name), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 10,
          color: THEME.metal,
          letterSpacing: 2
        }
      }, STAGE_META[c.stage]?.label)), /* @__PURE__ */ React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontSize: 10,
          color: THEME.inkMute,
          letterSpacing: 1
        }
      }, /* @__PURE__ */ React.createElement("span", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic"
        }
      }, c.id), c.risk && /* @__PURE__ */ React.createElement("span", {
        style: {
          color: THEME.danger,
          letterSpacing: 2
        }
      }, "\u25CF ", c.risk === "noMember" ? "\u672A\u5165\u6703" : "\u8CC7\u6599\u4E0D\u8DB3")));
    })));
  }
  function BDeskFocus({ focusCase }) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-in",
      style: {
        background: THEME.panelGradient,
        color: THEME.cardBg,
        padding: "28px 32px 26px",
        marginBottom: 24,
        boxShadow: THEME.darkPanelShadow
      }
    }, /* @__PURE__ */ React.createElement(Eyebrow, {
      color: THEME.metalSoft,
      size: 9,
      letter: 5
    }, "Focus Case"), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 16,
        marginTop: 12,
        flexWrap: "wrap"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 32,
        letterSpacing: 6,
        lineHeight: 1.2
      }
    }, focusCase.name), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 13,
        color: THEME.metalSoft,
        letterSpacing: 2
      }
    }, focusCase.id), /* @__PURE__ */ React.createElement("span", {
      style: {
        flex: 1
      }
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        padding: "5px 12px",
        border: `1px solid ${THEME.metalLine}`,
        fontFamily: THEME.serif,
        fontSize: 11,
        color: THEME.cardBg,
        letterSpacing: 3
      }
    }, "Stage \xB7 ", STAGE_META[focusCase.stage]?.label)), /* @__PURE__ */ React.createElement("div", {
      style: {
        marginTop: 14,
        fontSize: 12,
        color: THEME.metalSoft,
        lineHeight: 1.9,
        letterSpacing: 0.5,
        maxWidth: 680
      }
    }, focusCase.summary));
  }
  function BDeskRoleMatrix({ focusCase }) {
    const roles = [
      {
        key: "sales",
        label: "\u696D\u52D9",
        en: "Sales",
        desc: "\u5EFA\u7ACB\u4FE1\u4EFB\u3001\u5F15\u5C0E\u5165\u6703"
      },
      {
        key: "clinic",
        label: "\u4FF1\u6A02\u90E8\u8A3A\u6240",
        en: "Clinic",
        desc: "\u6DF1\u5EA6\u6AA2\u6E2C\u3001\u91AB\u7642\u4ECB\u9762"
      },
      {
        key: "ops",
        label: "\u5F8C\u52E4",
        en: "Operations",
        desc: "\u7269\u6D41\u3001\u6392\u7A0B\u3001\u8A18\u9304"
      },
      {
        key: "ai",
        label: "AI \u7CFB\u7D71",
        en: "AI",
        desc: "\u89E3\u8B80\u3001\u5EFA\u8B70\u3001\u89F8\u767C"
      }
    ];
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 16
      }
    }, roles.map((r, i) => /* @__PURE__ */ React.createElement("div", {
      key: r.key,
      className: `in-fade-up in-delay-${i + 1} in-lift`,
      style: {
        background: THEME.cardBg,
        border: `1px solid ${THEME.line}`,
        padding: "18px 20px 16px"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 10,
        paddingBottom: 10,
        borderBottom: `1px solid ${THEME.lineSoft}`
      }
    }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 9,
        color: THEME.metal,
        letterSpacing: 3,
        marginBottom: 2
      }
    }, r.en), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 17,
        color: THEME.ink,
        letterSpacing: 4
      }
    }, r.label)), /* @__PURE__ */ React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 9,
        color: THEME.metal,
        letterSpacing: 2,
        marginBottom: 2
      }
    }, "Owner"), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 11,
        color: THEME.ink,
        letterSpacing: 1
      }
    }, focusCase.owners[r.key]))), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 10,
        color: THEME.inkMute,
        letterSpacing: 1,
        marginBottom: 10,
        fontStyle: "italic",
        fontFamily: THEME.serif
      }
    }, r.desc), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        alignItems: "flex-start"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 9,
        color: THEME.metal,
        letterSpacing: 2,
        paddingTop: 3
      }
    }, "Next"), /* @__PURE__ */ React.createElement("span", {
      style: {
        fontSize: 12,
        color: THEME.ink,
        lineHeight: 1.7,
        letterSpacing: 0.5,
        flex: 1
      }
    }, focusCase.next[r.key])))));
  }
  function BDeskCoNotes({ focusCase }) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-up",
      style: {
        background: THEME.surfaceSoft,
        border: `1px solid ${THEME.line}`,
        padding: "20px 22px",
        marginBottom: 24
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 10,
        marginBottom: 12
      }
    }, /* @__PURE__ */ React.createElement(Eyebrow, {
      size: 9,
      letter: 4
    }, "Co-Notes \xB7 AI \u5171\u7B46"), /* @__PURE__ */ React.createElement("span", {
      style: {
        flex: 1
      }
    }), /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 2
      }
    }, "updated 04.20")), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, [
      {
        by: "AI",
        note: "\u5EFA\u8B70\u512A\u5148\u8655\u7406\u7761\u7720\u8207\u58D3\u529B\u8EF8\uFF1B\u7522\u54C1\u6E05\u55AE\u5DF2\u81EA\u52D5\u5E36\u5165\u53D6\u8CA8\u55AE\u3002",
        date: "04.20 10:14"
      },
      {
        by: "\u696D\u52D9 \xB7 \u6797\u6167",
        note: "\u5DF2\u806F\u7E6B\uFF0C\u9810\u8A08\u9031\u4E94\u4E0A\u5348\u5230\u5E97\u3002",
        date: "04.20 14:30"
      },
      {
        by: "AI",
        note: "D+7 \u81EA\u52D5\u89F8\u767C\u611F\u53D7\u91CF\u8868\uFF1B\u82E5\u7D05\u65D7\u51FA\u73FE \u2192 \u512A\u5148\u8F49\u8A3A\u3002",
        date: "04.20 10:14"
      }
    ].map((x, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      style: {
        display: "grid",
        gridTemplateColumns: "100px 1fr auto",
        gap: 14,
        padding: "8px 0",
        borderBottom: i < 2 ? `1px dashed ${THEME.line}` : "none",
        alignItems: "baseline"
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 11,
        color: THEME.ink,
        letterSpacing: 2
      }
    }, x.by), /* @__PURE__ */ React.createElement("span", {
      style: {
        fontSize: 12,
        color: THEME.inkSoft,
        lineHeight: 1.7,
        letterSpacing: 0.5
      }
    }, x.note), /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 1
      }
    }, x.date)))));
  }
  function BDeskSync() {
    const items = [
      {
        label: "\u6AA2\u6E2C\u5957\u4EF6",
        status: "\u5DF2\u5BC4\u51FA",
        detail: "04.22 \u9001\u9054",
        tone: "good"
      },
      {
        label: "\u7522\u54C1\u8A02\u55AE",
        status: "\u5099\u8CA8\u4E2D",
        detail: "\u9B5A\u6CB9 \xD72 / \u9748\u5149\u98F2 \xD71",
        tone: "warn"
      },
      {
        label: "\u8A3A\u6240\u9810\u7D04",
        status: "\u5DF2\u78BA\u8A8D",
        detail: "\u674E\u6021\u541B \xB7 05.12 14:00",
        tone: "good"
      },
      {
        label: "AI \u89F8\u767C",
        status: "\u5F85\u57F7\u884C",
        detail: "D+7 \u611F\u53D7\u91CF\u8868",
        tone: "ink"
      }
    ];
    const toneColor = (t) => t === "good" ? THEME.good : t === "warn" ? THEME.warn : THEME.ink;
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 12
      }
    }, items.map((x, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      className: `in-fade-up in-delay-${i + 1}`,
      style: {
        padding: "14px 16px 12px",
        background: THEME.cardBg,
        border: `1px solid ${THEME.line}`
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 8
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 14,
        color: THEME.ink,
        letterSpacing: 3
      }
    }, x.label), /* @__PURE__ */ React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        background: toneColor(x.tone),
        transform: "rotate(45deg)"
      }
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 10,
        color: toneColor(x.tone),
        letterSpacing: 2,
        marginBottom: 4
      }
    }, x.status), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 10,
        color: THEME.inkMute,
        letterSpacing: 1,
        lineHeight: 1.6
      }
    }, x.detail))));
  }
  function BDeskRisk({ cases }) {
    const risks = cases.filter((c) => c.risk);
    if (risks.length === 0) return /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 11,
        color: THEME.inkMute,
        letterSpacing: 2,
        padding: 16,
        border: `1px dashed ${THEME.line}`,
        textAlign: "center",
        fontFamily: THEME.serif,
        fontStyle: "italic"
      }
    }, "\u76EE\u524D\u7121\u9AD8\u98A8\u96AA\u6848\u4EF6");
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, risks.map((r, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      className: "in-fade-up",
      style: {
        padding: "12px 16px",
        background: THEME.dangerBg,
        borderLeft: `2px solid ${THEME.danger}`
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 13,
        color: THEME.ink,
        letterSpacing: 2
      }
    }, r.name), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.danger,
        letterSpacing: 2
      }
    }, r.risk === "noMember" ? "\u672A\u5165\u6703" : "\u8CC7\u6599\u4E0D\u8DB3")), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 1,
        marginTop: 3
      }
    }, r.id))));
  }
  function PanelBDesktop({ cases, focusId, onFocus, member }) {
    const focusCase = cases.find((c) => c.id === focusId) || cases[0];
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        background: THEME.cardBg,
        color: THEME.ink,
        fontFamily: THEME.sans,
        minHeight: "100%"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-in",
      style: {
        padding: "40px 56px 32px",
        borderBottom: `1px solid ${THEME.line}`,
        background: THEME.cardBg,
        position: "relative"
      }
    }, /* @__PURE__ */ React.createElement(Corners, {
      size: 18,
      inset: 14,
      color: THEME.ink
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 40,
        flexWrap: "wrap"
      }
    }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Eyebrow, {
      size: 10,
      letter: 6
    }, "Team Console \xB7 \u642D\u6A94\u5354\u4F5C\u53F0"), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 40,
        fontWeight: 400,
        color: THEME.ink,
        letterSpacing: 8,
        marginTop: 12,
        lineHeight: 1.1
      }
    }, "\u5354\u4F5C\u5DE5\u4F5C\u53F0"), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 11,
        color: THEME.metal,
        letterSpacing: 3,
        marginTop: 8
      }
    }, "Sales \xB7 Clinic \xB7 Ops \xB7 AI \uFF0F \u56DB\u4EBA\u4E00\u7D44")), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: 0,
        border: `1px solid ${THEME.line}`
      }
    }, [
      {
        label: "\u9032\u884C\u4E2D",
        value: cases.length,
        tone: "ink"
      },
      {
        label: "\u9700\u95DC\u6CE8",
        value: cases.filter((c) => c.risk).length,
        tone: "danger"
      },
      {
        label: "\u672C\u9031\u56DE\u8A2A",
        value: 2,
        tone: "ink"
      },
      {
        label: "\u5F85\u8A3A",
        value: 1,
        tone: "warn"
      }
    ].map((x, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      style: {
        padding: "14px 22px",
        borderRight: i < 3 ? `1px solid ${THEME.line}` : "none",
        minWidth: 90
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 2,
        marginBottom: 6
      }
    }, x.label), /* @__PURE__ */ React.createElement(Metric, {
      value: x.value,
      tone: x.tone,
      size: 26
    })))))), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "300px 1fr 280px",
        gap: 32,
        padding: "36px 56px 56px"
      }
    }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(BDeskSection, {
      n: "I",
      label: "\u6848\u4EF6\u6C60",
      en: "Case Pool"
    }, /* @__PURE__ */ React.createElement(BDeskCasePool, {
      cases,
      focusId: focusCase.id,
      onFocus
    }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(BDeskFocus, {
      focusCase
    }), /* @__PURE__ */ React.createElement(BDeskSection, {
      n: "II",
      label: "\u89D2\u8272\u5206\u5DE5",
      en: "Roles & Actions"
    }, /* @__PURE__ */ React.createElement(BDeskRoleMatrix, {
      focusCase
    })), /* @__PURE__ */ React.createElement(BDeskSection, {
      n: "III",
      label: "AI \u5171\u7B46",
      en: "Co-Notes"
    }, /* @__PURE__ */ React.createElement(BDeskCoNotes, {
      focusCase
    }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(BDeskSection, {
      n: "IV",
      label: "\u540C\u6B65",
      en: "Pipeline"
    }, /* @__PURE__ */ React.createElement(BDeskSync, null)), /* @__PURE__ */ React.createElement(BDeskSection, {
      n: "V",
      label: "\u98A8\u96AA",
      en: "Risk"
    }, /* @__PURE__ */ React.createElement(BDeskRisk, {
      cases
    })))));
  }
  Object.assign(window, {
    PanelBDesktop
  });
  function MobSection({ n, label, subtitle, children, delay = 0 }) {
    return /* @__PURE__ */ React.createElement("section", {
      className: "in-fade-up",
      style: {
        animationDelay: `${delay}s`,
        marginBottom: 44
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 12,
        marginBottom: subtitle ? 6 : 14
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 2,
        minWidth: 18
      }
    }, n), /* @__PURE__ */ React.createElement("span", {
      className: "in-hair",
      style: {
        width: 22,
        height: 1,
        background: THEME.ink,
        display: "block"
      }
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 19,
        color: THEME.ink,
        letterSpacing: 5
      }
    }, label)), subtitle && /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: THEME.inkSoft,
        letterSpacing: 1,
        lineHeight: 1.8,
        marginTop: 4,
        marginBottom: 16,
        paddingLeft: 52
      }
    }, subtitle), children);
  }
  function MobCover({ member }) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-in",
      style: {
        padding: "40px 22px 30px",
        borderBottom: `1px solid ${THEME.line}`,
        background: `linear-gradient(180deg, #FFFFFF 0%, ${THEME.surfaceSoft} 100%)`,
        position: "relative"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        textAlign: "center",
        marginBottom: 28
      }
    }, /* @__PURE__ */ React.createElement(Eyebrow, {
      size: 8,
      letter: 6
    }, "Health Atelier"), /* @__PURE__ */ React.createElement("div", {
      style: {
        margin: "10px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        width: 30,
        height: 1,
        background: THEME.ink
      }
    }), /* @__PURE__ */ React.createElement("span", {
      style: {
        width: 4,
        height: 4,
        background: THEME.ink,
        transform: "rotate(45deg)"
      }
    }), /* @__PURE__ */ React.createElement("span", {
      style: {
        width: 30,
        height: 1,
        background: THEME.ink
      }
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 9,
        color: THEME.metal,
        letterSpacing: 4,
        marginTop: 10
      }
    }, "Private \xB7 Member Edition")), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 9.5,
        color: THEME.metal,
        letterSpacing: 3,
        marginBottom: 6
      }
    }, "\u656C\u81F4\u3000", /* @__PURE__ */ React.createElement("span", {
      style: {
        color: THEME.ink
      }
    }, member.level)), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 42,
        fontWeight: 300,
        color: THEME.ink,
        letterSpacing: 10,
        lineHeight: 1.1
      }
    }, member.name), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 9,
        color: THEME.inkMute,
        letterSpacing: 3,
        marginTop: 6
      }
    }, "\u5148\u751F\uFF0F\u5973\u58EB\u3000\u89AA\u555F"), /* @__PURE__ */ React.createElement("div", {
      style: {
        marginTop: 22,
        paddingTop: 22,
        borderTop: `1px solid ${THEME.line}`,
        fontSize: 11.5,
        color: THEME.inkSoft,
        letterSpacing: 1,
        lineHeight: 2
      }
    }, "\u8B39\u70BA\u95A3\u4E0B\u6574\u7406\u672C\u5B63\u8EAB\u5FC3\u72C0\u614B\u8207\u8ABF\u7406\u65B9\u5411\uFF0C\u9858\u60A8\u5B89\u597D\u3002"), /* @__PURE__ */ React.createElement("div", {
      style: {
        marginTop: 22,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 0,
        borderTop: `1px solid ${THEME.line}`,
        borderBottom: `1px solid ${THEME.line}`
      }
    }, [
      {
        l: "Edition",
        v: "04.21"
      },
      {
        l: "N\xB0",
        v: member.id.slice(-4)
      },
      {
        l: "Revisit",
        v: member.nextVisit.slice(5)
      }
    ].map((x, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      style: {
        padding: "12px 8px",
        borderRight: i < 2 ? `1px solid ${THEME.line}` : "none",
        textAlign: "center"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 8,
        color: THEME.metal,
        letterSpacing: 2,
        marginBottom: 3
      }
    }, x.l), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 13,
        color: THEME.ink,
        letterSpacing: 2
      }
    }, x.v)))));
  }
  function MobBodyMessage({ member }) {
    const m = member.lifestyle;
    const items = [
      {
        label: "\u7761\u7720",
        en: "Sleep",
        value: m.sleep,
        unit: "\u6642",
        ideal: "7\u20138",
        flag: m.sleep < 6
      },
      {
        label: "\u58D3\u529B",
        en: "Stress",
        value: m.stress,
        unit: "\uFF0F10",
        ideal: "\u2264 4",
        flag: m.stress >= 6
      },
      {
        label: "\u75B2\u52DE",
        en: "Fatigue",
        value: m.fatigue,
        unit: "\uFF0F10",
        ideal: "\u2264 4",
        flag: m.fatigue >= 6
      },
      {
        label: "\u9AD4\u614B",
        en: "BMI",
        value: m.bmi,
        unit: "",
        ideal: "22\u201324",
        flag: m.bmi >= 27
      },
      {
        label: "\u8170\u570D",
        en: "Waist",
        value: m.waist,
        unit: "cm",
        ideal: "\u2264 90",
        flag: m.waist >= 90
      }
    ];
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 0
      }
    }, items.map((it, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      className: `in-fade-up in-delay-${Math.min(i + 1, 5)}`,
      style: {
        padding: "14px 0",
        borderBottom: i < items.length - 1 ? `1px solid ${THEME.lineSoft}` : "none",
        display: "grid",
        gridTemplateColumns: "82px 1fr auto auto",
        gap: 12,
        alignItems: "baseline"
      }
    }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 14,
        color: THEME.ink,
        letterSpacing: 3
      }
    }, it.label), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 8,
        color: THEME.metal,
        letterSpacing: 2,
        marginTop: 1
      }
    }, it.en)), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 9.5,
        color: THEME.metal,
        letterSpacing: 1.5,
        fontFamily: THEME.serif,
        fontStyle: "italic"
      }
    }, "ideal ", it.ideal), it.flag ? /* @__PURE__ */ React.createElement("span", {
      style: {
        fontSize: 8,
        color: THEME.danger,
        letterSpacing: 2
      }
    }, "\u25CF \u9700\u95DC\u6CE8") : /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement(Metric, {
      value: it.value,
      unit: it.unit,
      tone: it.flag ? "danger" : "ink",
      size: 22
    }))));
  }
  function MobSixSenses({ member, viz = "radar" }) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      style: {
        padding: "18px 10px 16px",
        background: `
          radial-gradient(circle at 16% 14%, rgba(238, 235, 228, 0.9) 0%, transparent 28%),
          linear-gradient(180deg, #FFFFFF 0%, ${THEME.surfaceSoft} 100%)
        `,
        border: `1px solid ${THEME.line}`,
        marginBottom: 14,
        overflow: "visible"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        padding: "4px 0 6px"
      }
    }, /* @__PURE__ */ React.createElement(RadarFigure, {
      scores: member.nt,
      mobile: true
    }))), /* @__PURE__ */ React.createElement(CompositeScoreStrip, {
      scores: member.nt,
      compact: true
    }), /* @__PURE__ */ React.createElement(SenseInsightGrid, {
      scores: member.nt,
      columns: 2,
      compact: true
    }));
  }
  function MobDirection({ member }) {
    const b = member.brief;
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-up",
      style: {
        padding: "24px 22px 22px",
        marginBottom: 20,
        background: THEME.panelGradientElevated,
        color: THEME.cardBg,
        position: "relative",
        boxShadow: THEME.darkPanelShadow
      }
    }, /* @__PURE__ */ React.createElement(Eyebrow, {
      color: THEME.metalSoft,
      size: 8,
      letter: 5
    }, "This Season \xB7 Direction"), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 22,
        color: THEME.cardBg,
        letterSpacing: 4,
        marginTop: 14,
        lineHeight: 1.5
      }
    }, b.direction)), b.insights.length > 0 && /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 0,
        marginBottom: 18
      }
    }, b.insights.map((x, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      className: `in-fade-up in-delay-${i + 1}`,
      style: {
        padding: "14px 0",
        borderBottom: `1px solid ${THEME.lineSoft}`,
        display: "grid",
        gridTemplateColumns: "26px 1fr",
        gap: 10
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 12,
        color: THEME.metal,
        letterSpacing: 1
      }
    }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 15,
        color: THEME.ink,
        letterSpacing: 3,
        marginBottom: 4
      }
    }, x.label), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: THEME.inkSoft,
        lineHeight: 1.8,
        letterSpacing: 1
      }
    }, x.detail))))), /* @__PURE__ */ React.createElement("div", {
      style: {
        padding: "16px 18px",
        background: `linear-gradient(180deg, ${THEME.surfaceSoft} 0%, ${THEME.metalTint} 100%)`,
        borderTop: `1px solid ${THEME.metalLine}`
      }
    }, /* @__PURE__ */ React.createElement(Eyebrow, {
      size: 8,
      letter: 4
    }, "Why"), /* @__PURE__ */ React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 11.5,
        color: THEME.ink,
        lineHeight: 2,
        letterSpacing: 1
      }
    }, b.reason)));
  }
  function MobProducts({ member }) {
    const [picked, setPicked] = React.useState({});
    const b = member.brief;
    if (!b.products.length) return null;
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 0,
        border: `1px solid ${THEME.line}`
      }
    }, b.products.map((pid, i) => {
      const p = PRODUCTS[pid];
      const taken = !!picked[pid];
      return /* @__PURE__ */ React.createElement("div", {
        key: pid,
        className: `in-fade-up in-delay-${Math.min(i + 1, 6)}`,
        style: {
          background: THEME.cardBg,
          padding: "16px 16px",
          display: "grid",
          gridTemplateColumns: "48px 1fr auto",
          gap: 14,
          alignItems: "center",
          borderBottom: i < b.products.length - 1 ? `1px solid ${THEME.line}` : "none"
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          width: 48,
          height: 60,
          background: THEME.surfaceSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          border: `1px solid ${THEME.metalLine}`
        }
      }, /* @__PURE__ */ React.createElement("span", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 9,
          color: THEME.metal,
          letterSpacing: 1,
          position: "absolute",
          top: 4,
          left: 4
        }
      }, "N\xB0"), /* @__PURE__ */ React.createElement("span", {
        style: {
          fontFamily: THEME.serif,
          fontSize: 20,
          color: THEME.ink,
          letterSpacing: 0
        }
      }, String(i + 1).padStart(2, "0"))), /* @__PURE__ */ React.createElement("div", {
        style: {
          minWidth: 0
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 9,
          color: THEME.metal,
          letterSpacing: 3,
          marginBottom: 4
        }
      }, p.tag), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontSize: 16,
          color: THEME.ink,
          letterSpacing: 2,
          lineHeight: 1.3
        }
      }, p.name), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontSize: 9,
          color: THEME.inkMute,
          letterSpacing: 2,
          marginTop: 4
        }
      }, p.unit)), /* @__PURE__ */ React.createElement("button", {
        className: "in-btn",
        onClick: () => setPicked((s) => ({
          ...s,
          [pid]: !s[pid]
        })),
        style: {
          padding: "10px 14px",
          background: taken ? THEME.cardBg : THEME.ink,
          color: taken ? THEME.ink : THEME.cardBg,
          border: `1px solid ${THEME.ink}`,
          fontSize: 10,
          letterSpacing: 3,
          fontFamily: THEME.serif,
          minHeight: 44,
          whiteSpace: "nowrap"
        }
      }, taken ? "\u5DF2\u53D6" : "\u53D6\u8CA8"));
    }));
  }
  function MobThreeLayer({ member }) {
    const s = member.brief.service;
    const layers = [
      {
        tier: "\u5C45\u5BB6\u65E5\u5E38",
        en: "Home",
        items: s.home,
        n: "I"
      },
      {
        tier: "\u6703\u54E1\u9867\u554F",
        en: "Counsel",
        items: s.advise,
        n: "II"
      },
      {
        tier: "\u4FF1\u6A02\u90E8\u8A3A\u6240",
        en: "Clinic",
        items: s.clinic,
        n: "III"
      }
    ];
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 0
      }
    }, layers.map((l, i) => /* @__PURE__ */ React.createElement("div", {
      key: l.tier,
      className: `in-fade-up in-delay-${i + 1}`,
      style: {
        background: THEME.cardBg,
        border: `1px solid ${THEME.line}`,
        padding: "16px 18px",
        borderTop: i === 0 ? `1px solid ${THEME.line}` : "none"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 12,
        marginBottom: 12,
        paddingBottom: 10,
        borderBottom: `1px solid ${THEME.lineSoft}`
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 13,
        color: THEME.metal,
        letterSpacing: 1,
        minWidth: 22
      }
    }, l.n), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 16,
        color: THEME.ink,
        letterSpacing: 4
      }
    }, l.tier), /* @__PURE__ */ React.createElement("span", {
      style: {
        flex: 1
      }
    }), /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 9,
        color: THEME.metal,
        letterSpacing: 3
      }
    }, l.en)), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, l.items.map((x, j) => /* @__PURE__ */ React.createElement("div", {
      key: j,
      style: {
        display: "grid",
        gridTemplateColumns: "10px 1fr",
        gap: 8,
        fontSize: 11,
        color: THEME.inkSoft,
        lineHeight: 1.75,
        letterSpacing: 0.5
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        color: THEME.ink,
        fontSize: 6,
        paddingTop: 7
      }
    }, "\u25A0"), /* @__PURE__ */ React.createElement("span", null, x)))))));
  }
  function MobJourney({ member }) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 0
      }
    }, member.journey.map((s, i) => {
      const last = i === member.journey.length - 1;
      return /* @__PURE__ */ React.createElement("div", {
        key: i,
        className: `in-fade-up in-delay-${Math.min(i + 1, 6)}`,
        style: {
          display: "grid",
          gridTemplateColumns: "24px 1fr",
          gap: 14
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }
      }, /* @__PURE__ */ React.createElement("div", {
        className: s.current ? "in-pulse" : "",
        style: {
          width: 9,
          height: 9,
          marginTop: 5,
          background: s.done ? THEME.ink : THEME.cardBg,
          border: `1px solid ${s.current || s.done ? THEME.ink : THEME.metalLine}`,
          boxShadow: s.current ? `0 0 0 3px ${THEME.metalTint}` : "none",
          transform: "rotate(45deg)"
        }
      }), !last && /* @__PURE__ */ React.createElement("div", {
        style: {
          width: 1,
          flex: 1,
          background: s.done ? THEME.ink : THEME.line,
          minHeight: 30
        }
      })), /* @__PURE__ */ React.createElement("div", {
        style: {
          paddingBottom: 18
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "baseline",
          gap: 8
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontSize: 15,
          color: s.current ? THEME.ink : s.done ? THEME.ink : THEME.inkMute,
          letterSpacing: 3,
          fontWeight: s.current ? 500 : 400
        }
      }, s.label), s.current && /* @__PURE__ */ React.createElement("span", {
        style: {
          fontSize: 8,
          color: THEME.cardBg,
          letterSpacing: 3,
          padding: "2px 6px",
          background: THEME.ink
        }
      }, "\u9032\u884C\u4E2D")), s.date && /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 10,
          color: THEME.metal,
          letterSpacing: 1,
          marginTop: 3
        }
      }, s.date)));
    }), member.brief.followUp.length > 0 && /* @__PURE__ */ React.createElement("div", {
      style: {
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, member.brief.followUp.map((f, i) => /* @__PURE__ */ React.createElement("div", {
      key: f.day,
      style: {
        background: THEME.surfaceSoft,
        padding: "12px 14px",
        borderLeft: `2px solid ${THEME.ink}`
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 3,
        marginBottom: 4
      }
    }, "Day + ", f.day, "\u3000\u56DE\u8A2A"), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 11,
        color: THEME.ink,
        lineHeight: 1.8,
        letterSpacing: 0.5
      }
    }, f.item)))));
  }
  function MobFamily({ member }) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 6
      }
    }, member.family.map((f, i) => {
      const mine = f.role === "\u672C\u4EBA";
      return /* @__PURE__ */ React.createElement("div", {
        key: i,
        className: `in-fade-up in-delay-${Math.min(i + 1, 6)}`,
        style: {
          background: mine ? THEME.panelGradientSoft : THEME.cardBg,
          color: mine ? THEME.cardBg : THEME.ink,
          border: `1px solid ${mine ? THEME.ink : THEME.line}`,
          padding: "12px 6px 10px",
          textAlign: "center"
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 8,
          color: mine ? THEME.metalSoft : THEME.metal,
          letterSpacing: 2,
          marginBottom: 4
        }
      }, f.role), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontSize: 14,
          letterSpacing: 2
        }
      }, f.name), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontSize: 8,
          color: mine ? THEME.metalSoft : THEME.inkMute,
          margin: "4px 0 6px",
          letterSpacing: 1
        }
      }, f.age, " \u6B72"), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontSize: 8,
          color: mine ? THEME.metalSoft : THEME.inkSoft,
          letterSpacing: 2
        }
      }, f.stage));
    }));
  }
  function PanelAMobile({ member, viz }) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        background: THEME.cardBg,
        color: THEME.ink,
        fontFamily: THEME.sans,
        minHeight: "100%"
      }
    }, /* @__PURE__ */ React.createElement(MobCover, {
      member
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        padding: "32px 26px 44px"
      }
    }, /* @__PURE__ */ React.createElement(MobSection, {
      n: "I",
      label: "\u8EAB\u9AD4\u8A0A\u606F",
      subtitle: "\u7D05\u8272\u6A19\u8A3B\u7684\u9805\u76EE\u503C\u5F97\u7279\u5225\u7559\u610F\u3002",
      delay: 0.05
    }, /* @__PURE__ */ React.createElement(MobBodyMessage, {
      member
    })), /* @__PURE__ */ React.createElement(MobSection, {
      n: "II",
      label: "\u8EAB\u5FC3\u516D\u611F",
      subtitle: "\u8EAB\u9AD4\u900F\u904E\u516D\u7A2E\u795E\u7D93\u50B3\u5C0E\u7269\u8CEA\u8868\u9054\u72C0\u614B\u3002",
      delay: 0.1
    }, /* @__PURE__ */ React.createElement(MobSixSenses, {
      member,
      viz
    })), /* @__PURE__ */ React.createElement(MobSection, {
      n: "III",
      label: "\u91CF\u8EAB\u65B9\u5411",
      delay: 0.15
    }, /* @__PURE__ */ React.createElement(MobDirection, {
      member
    })), /* @__PURE__ */ React.createElement(MobSection, {
      n: "IV",
      label: "\u70BA\u60A8\u63A8\u85A6",
      subtitle: "\u9EDE\u53F3\u5074\u300C\u53D6\u8CA8\u300D\u5373\u5B89\u6392\u9001\u9054\u3002",
      delay: 0.2
    }, /* @__PURE__ */ React.createElement(MobProducts, {
      member
    })), /* @__PURE__ */ React.createElement(MobSection, {
      n: "V",
      label: "\u4E09\u5C64\u966A\u4F34",
      delay: 0.25
    }, /* @__PURE__ */ React.createElement(MobThreeLayer, {
      member
    })), /* @__PURE__ */ React.createElement(MobSection, {
      n: "VI",
      label: "\u4FF1\u6A02\u90E8\u65C5\u7A0B",
      delay: 0.3
    }, /* @__PURE__ */ React.createElement(MobJourney, {
      member
    })), /* @__PURE__ */ React.createElement(MobSection, {
      n: "VII",
      label: "\u5BB6\u65CF\u7DB2\u7D61",
      delay: 0.35
    }, /* @__PURE__ */ React.createElement(MobFamily, {
      member
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        textAlign: "center",
        paddingTop: 26,
        borderTop: `1px solid ${THEME.ink}`,
        marginTop: 8
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 14
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        width: 30,
        height: 1,
        background: THEME.ink
      }
    }), /* @__PURE__ */ React.createElement("span", {
      style: {
        width: 4,
        height: 4,
        background: THEME.ink,
        transform: "rotate(45deg)"
      }
    }), /* @__PURE__ */ React.createElement("span", {
      style: {
        width: 30,
        height: 1,
        background: THEME.ink
      }
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 5
      }
    }, member.id, "\u3000\xB7\u3000Private Edition"))));
  }
  Object.assign(window, {
    PanelAMobile
  });
  function MobBSection({ n, label, right, children }) {
    return /* @__PURE__ */ React.createElement("section", {
      style: {
        marginBottom: 32
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 12,
        marginBottom: 12
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 10,
        color: THEME.metal,
        letterSpacing: 2,
        minWidth: 18
      }
    }, n), /* @__PURE__ */ React.createElement("span", {
      className: "in-hair",
      style: {
        width: 22,
        height: 1,
        background: THEME.ink,
        display: "block"
      }
    }), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 17,
        color: THEME.ink,
        letterSpacing: 4
      }
    }, label), /* @__PURE__ */ React.createElement("span", {
      style: {
        flex: 1
      }
    }), right), children);
  }
  function MobBCasePool({ cases, focusId, onFocus }) {
    const [filter, setFilter] = React.useState("all");
    const stages = [
      "all",
      "ai",
      "test",
      "product",
      "follow",
      "intro"
    ];
    const labelOf = (s) => s === "all" ? "\u5168\u90E8" : STAGE_META[s]?.label || s;
    const filtered = filter === "all" ? cases : cases.filter((c) => c.stage === filter);
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      className: "in-scroll",
      style: {
        display: "flex",
        gap: 0,
        marginBottom: 12,
        overflowX: "auto",
        paddingBottom: 4,
        border: `1px solid ${THEME.line}`
      }
    }, stages.map((s) => {
      const active = filter === s;
      return /* @__PURE__ */ React.createElement("button", {
        key: s,
        className: "in-btn",
        onClick: () => setFilter(s),
        style: {
          background: active ? THEME.ink : "transparent",
          color: active ? THEME.cardBg : THEME.inkSoft,
          border: "none",
          padding: "8px 14px",
          fontSize: 10,
          letterSpacing: 2,
          whiteSpace: "nowrap",
          flexShrink: 0,
          fontFamily: THEME.serif
        }
      }, labelOf(s));
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        border: `1px solid ${THEME.line}`
      }
    }, filtered.map((c, i) => {
      const active = c.id === focusId;
      return /* @__PURE__ */ React.createElement("div", {
        key: c.id,
        className: "in-btn",
        onClick: () => onFocus(c.id),
        style: {
          padding: "14px 16px",
          cursor: "pointer",
          background: active ? THEME.surfaceSoft : THEME.cardBg,
          borderLeft: `2px solid ${active ? THEME.ink : "transparent"}`,
          borderBottom: i < filtered.length - 1 ? `1px solid ${THEME.lineSoft}` : "none",
          minHeight: 44
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between"
        }
      }, /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontSize: 15,
          color: THEME.ink,
          letterSpacing: 3
        }
      }, c.name), /* @__PURE__ */ React.createElement("div", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic",
          fontSize: 10,
          color: THEME.metal,
          letterSpacing: 2
        }
      }, STAGE_META[c.stage]?.label)), /* @__PURE__ */ React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9,
          color: THEME.inkMute,
          marginTop: 4,
          letterSpacing: 1
        }
      }, /* @__PURE__ */ React.createElement("span", {
        style: {
          fontFamily: THEME.serif,
          fontStyle: "italic"
        }
      }, c.id), c.risk && /* @__PURE__ */ React.createElement("span", {
        style: {
          color: THEME.danger,
          letterSpacing: 2
        }
      }, "\u25CF ", c.risk === "noMember" ? "\u672A\u5165\u6703" : "\u8CC7\u6599\u4E0D\u8DB3")));
    })));
  }
  function MobBRoleMatrix({ focusCase }) {
    const roles = [
      {
        key: "sales",
        label: "\u696D\u52D9",
        en: "Sales"
      },
      {
        key: "clinic",
        label: "\u4FF1\u6A02\u90E8\u8A3A\u6240",
        en: "Clinic"
      },
      {
        key: "ops",
        label: "\u5F8C\u52E4",
        en: "Operations"
      },
      {
        key: "ai",
        label: "AI \u7CFB\u7D71",
        en: "AI"
      }
    ];
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 0,
        border: `1px solid ${THEME.line}`
      }
    }, roles.map((r, i) => /* @__PURE__ */ React.createElement("div", {
      key: r.key,
      className: `in-fade-up in-delay-${i + 1}`,
      style: {
        background: THEME.cardBg,
        padding: "14px 16px",
        borderBottom: i < roles.length - 1 ? `1px solid ${THEME.lineSoft}` : "none"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 6
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 10
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 9,
        color: THEME.metal,
        letterSpacing: 2
      }
    }, r.en), /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 14,
        color: THEME.ink,
        letterSpacing: 3
      }
    }, r.label)), /* @__PURE__ */ React.createElement("span", {
      style: {
        fontSize: 9,
        color: THEME.inkMute,
        letterSpacing: 1
      }
    }, focusCase.owners[r.key])), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 11,
        color: THEME.ink,
        lineHeight: 1.7,
        letterSpacing: 0.5
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        color: THEME.metal,
        fontSize: 9,
        letterSpacing: 2,
        marginRight: 6
      }
    }, "next"), focusCase.next[r.key]))));
  }
  function MobBSync() {
    const items = [
      {
        label: "\u6AA2\u6E2C\u5957\u4EF6",
        status: "\u5DF2\u5BC4\u51FA",
        detail: "04.22 \u9001\u9054",
        tone: "good"
      },
      {
        label: "\u7522\u54C1\u8A02\u55AE",
        status: "\u5099\u8CA8\u4E2D",
        detail: "\u9B5A\u6CB9 \xD72 / \u9748\u5149\u98F2 \xD71",
        tone: "warn"
      },
      {
        label: "\u8A3A\u6240\u9810\u7D04",
        status: "\u5DF2\u78BA\u8A8D",
        detail: "\u674E\u6021\u541B 05.12 14:00",
        tone: "good"
      },
      {
        label: "AI \u89F8\u767C",
        status: "\u5F85\u57F7\u884C",
        detail: "D+7 \u91CF\u8868",
        tone: "ink"
      }
    ];
    const toneColor = (t) => t === "good" ? THEME.good : t === "warn" ? THEME.warn : THEME.inkMute;
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 8
      }
    }, items.map((x, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      className: `in-fade-up in-delay-${i + 1}`,
      style: {
        padding: "12px 14px",
        background: THEME.cardBg,
        border: `1px solid ${THEME.line}`
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 6
      }
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 13,
        color: THEME.ink,
        letterSpacing: 3
      }
    }, x.label), /* @__PURE__ */ React.createElement("span", {
      style: {
        width: 5,
        height: 5,
        background: toneColor(x.tone),
        transform: "rotate(45deg)"
      }
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 9,
        color: toneColor(x.tone),
        letterSpacing: 2,
        marginBottom: 3
      }
    }, x.status), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 9,
        color: THEME.inkMute,
        letterSpacing: 1,
        lineHeight: 1.5
      }
    }, x.detail))));
  }
  function MobBRisk({ cases }) {
    const risks = cases.filter((c) => c.risk);
    if (risks.length === 0) return /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 10,
        color: THEME.inkMute,
        letterSpacing: 2,
        padding: 14,
        border: `1px dashed ${THEME.line}`,
        textAlign: "center",
        fontFamily: THEME.serif,
        fontStyle: "italic"
      }
    }, "\u76EE\u524D\u7121\u9AD8\u98A8\u96AA\u6848\u4EF6");
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, risks.map((r, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      style: {
        padding: "12px 14px",
        background: THEME.dangerBg,
        borderLeft: `2px solid ${THEME.danger}`
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 9,
        color: THEME.danger,
        letterSpacing: 3,
        marginBottom: 4
      }
    }, r.risk === "noMember" ? "\u672A\u5165\u6703" : "\u8CC7\u6599\u4E0D\u8DB3"), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 13,
        color: THEME.ink,
        letterSpacing: 2
      }
    }, r.name, " \xB7 ", r.id))));
  }
  function PanelBMobile({ cases, focusId, onFocus, member }) {
    const focusCase = cases.find((c) => c.id === focusId) || cases[0];
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        background: THEME.cardBg,
        minHeight: "100%",
        fontFamily: THEME.sans
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-in",
      style: {
        padding: "34px 24px 26px",
        borderBottom: `1px solid ${THEME.line}`,
        background: THEME.cardBg,
        position: "relative"
      }
    }, /* @__PURE__ */ React.createElement(Corners, {
      size: 12,
      inset: 12,
      color: THEME.ink
    }), /* @__PURE__ */ React.createElement(Eyebrow, {
      size: 8,
      letter: 5
    }, "Team Console"), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 28,
        color: THEME.ink,
        letterSpacing: 6,
        marginTop: 10
      }
    }, "\u5354\u4F5C\u5DE5\u4F5C\u53F0"), /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        gap: 0,
        marginTop: 18,
        borderTop: `1px solid ${THEME.line}`
      }
    }, [
      {
        label: "\u9032\u884C\u4E2D",
        value: cases.length,
        tone: "ink"
      },
      {
        label: "\u9700\u95DC\u6CE8",
        value: cases.filter((c) => c.risk).length,
        tone: "danger"
      },
      {
        label: "\u672C\u9031\u56DE\u8A2A",
        value: 2,
        tone: "ink"
      }
    ].map((x, i) => /* @__PURE__ */ React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        padding: "12px 8px",
        borderRight: i < 2 ? `1px solid ${THEME.line}` : "none"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 9,
        color: THEME.metal,
        letterSpacing: 2,
        marginBottom: 4
      }
    }, x.label), /* @__PURE__ */ React.createElement(Metric, {
      value: x.value,
      tone: x.tone,
      size: 22
    }))))), /* @__PURE__ */ React.createElement("div", {
      style: {
        padding: "28px 24px 44px"
      }
    }, /* @__PURE__ */ React.createElement(MobBSection, {
      n: "I",
      label: "\u6848\u4EF6\u6C60"
    }, /* @__PURE__ */ React.createElement(MobBCasePool, {
      cases,
      focusId: focusCase.id,
      onFocus
    })), /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-in",
      style: {
        padding: "20px 20px",
        marginBottom: 28,
        background: THEME.panelGradientElevated,
        color: THEME.cardBg,
        boxShadow: THEME.darkPanelShadow
      }
    }, /* @__PURE__ */ React.createElement(Eyebrow, {
      size: 8,
      letter: 5,
      color: THEME.metalSoft
    }, "Focus"), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: 22,
        letterSpacing: 4,
        marginTop: 10
      }
    }, focusCase.name, /* @__PURE__ */ React.createElement("span", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: 11,
        color: THEME.metalSoft,
        letterSpacing: 1,
        marginLeft: 10
      }
    }, focusCase.id)), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 9,
        color: THEME.metalSoft,
        letterSpacing: 3,
        marginTop: 6,
        fontFamily: THEME.serif,
        fontStyle: "italic"
      }
    }, "Stage \xB7 ", STAGE_META[focusCase.stage]?.label), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontSize: 11,
        color: THEME.metalSoft,
        lineHeight: 1.8,
        letterSpacing: 0.5,
        marginTop: 10
      }
    }, focusCase.summary)), /* @__PURE__ */ React.createElement(MobBSection, {
      n: "II",
      label: "\u89D2\u8272\u5206\u5DE5"
    }, /* @__PURE__ */ React.createElement(MobBRoleMatrix, {
      focusCase
    })), /* @__PURE__ */ React.createElement(MobBSection, {
      n: "III",
      label: "\u540C\u6B65"
    }, /* @__PURE__ */ React.createElement(MobBSync, null)), /* @__PURE__ */ React.createElement(MobBSection, {
      n: "IV",
      label: "\u98A8\u96AA"
    }, /* @__PURE__ */ React.createElement(MobBRisk, {
      cases
    }))));
  }
  Object.assign(window, {
    PanelBMobile
  });
  var TWEAKS = {
    panel: "A"
  };
  function initialView(key, fallback, allowed) {
    try {
      const params = new URLSearchParams(window.location.search);
      const value = params.get(key);
      if (allowed.includes(value)) return value;
    } catch (error) {
    }
    return TWEAKS[key] || fallback;
  }
  function readResponsiveDevice() {
    try {
      const params = new URLSearchParams(window.location.search);
      const forced = params.get("device");
      if (forced === "desktop" || forced === "mobile") return forced;
    } catch (error) {
    }
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      return window.matchMedia("(max-width: 960px)").matches ? "mobile" : "desktop";
    }
    return "desktop";
  }
  function App() {
    injectStyles();
    const memberKey = "yuhong";
    const viz = "radar";
    const [panel, setPanel] = React.useState(() => initialView("panel", "A", [
      "A",
      "B"
    ]));
    const [device, setDevice] = React.useState(readResponsiveDevice);
    const [focusId, setFocusId] = React.useState(CASES[0].id);
    const member = MEMBERS[memberKey];
    const isMobile = device === "mobile";
    const outerPad = isMobile ? 18 : 40;
    const heroTitleSize = isMobile ? 28 : 38;
    const heroTitleTracking = isMobile ? 9 : 16;
    const heroEyebrowSize = isMobile ? 10 : 11;
    const heroEyebrowTracking = isMobile ? 6 : 8;
    const btnPadding = isMobile ? "10px 14px" : "10px 18px";
    const contentMaxWidth = isMobile ? 520 : 1480;
    const btnBase = {
      border: "none",
      padding: btnPadding,
      whiteSpace: "nowrap",
      fontSize: 12,
      letterSpacing: 2,
      fontFamily: THEME.serif,
      cursor: "pointer"
    };
    React.useEffect(() => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") return void 0;
      let forced = null;
      try {
        const params = new URLSearchParams(window.location.search);
        const deviceParam = params.get("device");
        if (deviceParam === "desktop" || deviceParam === "mobile") {
          forced = deviceParam;
        }
      } catch (error) {
      }
      if (forced) {
        setDevice(forced);
        return void 0;
      }
      const media = window.matchMedia("(max-width: 960px)");
      const syncDevice = () => setDevice(media.matches ? "mobile" : "desktop");
      syncDevice();
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", syncDevice);
        return () => media.removeEventListener("change", syncDevice);
      }
      media.addListener(syncDevice);
      return () => media.removeListener(syncDevice);
    }, []);
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        minHeight: "100vh",
        background: THEME.surface,
        padding: isMobile ? "26px 0 56px" : "40px 0 80px"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-in",
      style: {
        maxWidth: 1480,
        margin: "0 auto 24px",
        padding: `0 ${outerPad}px`,
        textAlign: "center"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontStyle: "italic",
        fontSize: heroEyebrowSize,
        color: THEME.metal,
        letterSpacing: heroEyebrowTracking,
        marginBottom: isMobile ? 14 : 16
      }
    }, "Health Atelier \xB7 Member Council"), /* @__PURE__ */ React.createElement("div", {
      style: {
        fontFamily: THEME.serif,
        fontSize: heroTitleSize,
        color: THEME.ink,
        letterSpacing: heroTitleTracking,
        fontWeight: 400
      }
    }, "\u5927\u5065\u5EB7\u79C1\u4EBA\u4FF1\u6A02\u90E8"), /* @__PURE__ */ React.createElement("div", {
      style: {
        margin: isMobile ? "18px auto 4px" : "22px auto 4px"
      }
    }, /* @__PURE__ */ React.createElement(HairRule, {
      w: isMobile ? 40 : 56
    })), /* @__PURE__ */ React.createElement("div", {
      style: {
        margin: "18px auto 0",
        maxWidth: isMobile ? 320 : 640,
        fontSize: isMobile ? 10 : 11,
        color: THEME.inkSoft,
        letterSpacing: isMobile ? 1.5 : 2,
        lineHeight: 2
      }
    }, "A \xB7 \u6703\u54E1\u5C08\u5C6C\u9801\u3000\u3000|\u3000\u3000B \xB7 \u5718\u968A\u5354\u4F5C\u53F0")), /* @__PURE__ */ React.createElement("div", {
      style: {
        maxWidth: 1480,
        margin: `0 auto ${isMobile ? 20 : 32}px`,
        padding: `0 ${outerPad}px`,
        display: "flex",
        justifyContent: "center",
        gap: 20,
        flexWrap: "wrap"
      }
    }, /* @__PURE__ */ React.createElement("div", {
      style: {
        display: "flex",
        border: `1px solid ${THEME.ink}`
      }
    }, [
      {
        k: "A",
        label: "A \xB7 \u6703\u54E1\u5C08\u5C6C\u9801"
      },
      {
        k: "B",
        label: "B \xB7 \u5718\u968A\u5354\u4F5C\u53F0"
      }
    ].map((item) => /* @__PURE__ */ React.createElement("button", {
      key: item.k,
      className: "in-btn",
      onClick: () => setPanel(item.k),
      style: {
        ...btnBase,
        background: panel === item.k ? THEME.ink : THEME.cardBg,
        color: panel === item.k ? THEME.cardBg : THEME.ink
      }
    }, item.label)))), /* @__PURE__ */ React.createElement("div", {
      style: {
        maxWidth: contentMaxWidth,
        margin: "0 auto",
        padding: `0 ${outerPad}px`
      }
    }, device === "desktop" ? /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-in",
      style: {
        background: THEME.cardBg,
        border: `1px solid ${THEME.line}`,
        boxShadow: "0 40px 100px -50px rgba(20, 20, 20, 0.22)",
        overflow: "hidden"
      }
    }, panel === "A" ? /* @__PURE__ */ React.createElement(PanelADesktop, {
      member,
      viz
    }) : /* @__PURE__ */ React.createElement(PanelBDesktop, {
      cases: CASES,
      focusId,
      onFocus: setFocusId,
      member
    })) : /* @__PURE__ */ React.createElement("div", {
      className: "in-fade-in",
      style: {
        background: THEME.cardBg,
        border: `1px solid ${THEME.line}`,
        boxShadow: "0 30px 70px -44px rgba(20, 20, 20, 0.24)",
        overflow: "hidden"
      }
    }, panel === "A" ? /* @__PURE__ */ React.createElement(PanelAMobile, {
      member,
      viz
    }) : /* @__PURE__ */ React.createElement(PanelBMobile, {
      cases: CASES,
      focusId,
      onFocus: setFocusId,
      member
    }))));
  }
  globalThis.__KLF_APP__ = App;
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
