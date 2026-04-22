// data.jsx — 會員、產品池、建議資料（俱樂部版）

// ─── 康樂富產品池（price 仍保留在資料中，但介面不顯示）
const PRODUCTS = {
  'ai-liemian-ex':   { name: '艾立眠 EX',            tag: '夜間放鬆',   axis: 'sleep',  unit: '30 粒 / 盒' },
  'goodnight-drink': { name: '科技燕窩晚安纖姿飲',    tag: '助眠修復',   axis: 'sleep',  unit: '14 入 / 盒' },
  'pearl-powder':    { name: '御賞珍珠粉',            tag: '安神穩眠',   axis: 'sleep',  unit: '30 包 / 盒' },
  'zhiming-drink':   { name: '智明靈光飲',            tag: '專注清明',   axis: 'focus',  unit: '14 入 / 盒' },
  'allround-drink':  { name: '科技燕窩全能飲',        tag: '全面修復',   axis: 'focus',  unit: '14 入 / 盒' },
  'fish-oil':        { name: '頂級高濃度魚油',        tag: '腦力油脂',   axis: 'focus',  unit: '60 粒 / 盒' },
  'plant-dha':       { name: '法國 DHA 植物藻油',     tag: '素食腦力',   axis: 'focus',  unit: '60 粒 / 盒' },
  'xinggan-ex':      { name: '小心甘 EX',             tag: '熬夜修復',   axis: 'stress', unit: '30 粒 / 盒' },
  'hongqu-ex':       { name: '紅麴活力循 EX',         tag: '循環代謝',   axis: 'circ',   unit: '60 粒 / 盒' },
  'natto-q10':       { name: '納豆紅麴 Q10 複方',     tag: '循環養護',   axis: 'circ',   unit: '60 粒 / 盒' },
  'collagen-joint':  { name: '膠原關鍵穩 EX',         tag: '關節修復',   axis: 'joint',  unit: '30 包 / 盒' },
  'turtle-deer':     { name: '龜鹿膠原關鍵飲',        tag: '骨關節養護', axis: 'joint',  unit: '14 入 / 盒' },
  'beauty-drink':    { name: '科技燕窩美妍賦活飲',    tag: '美妍賦活',   axis: 'beauty', unit: '14 入 / 盒' },
  'bright-ex':       { name: '極光白賦美 EX',         tag: '透亮潤養',   axis: 'beauty', unit: '30 包 / 盒' },
};

// ─── 身心六感指標（專業名稱為主，白話翻譯為輔）
// name = 專業名稱（雷達圖主要顯示）
// plain = 白話副標（動能／連結…）
// meaning = 意義說明（展開或副標使用）
const NT_SCHEMA = [
  { key: 'da',  name: '多巴胺', en: 'Dopamine',     plain: '動能',
    meaning: '追尋未來的動力、獎勵機制',
    low: '提不起勁、拖延', high: '充滿動力' },
  { key: 'oxt', name: '催產素', en: 'Oxytocin',     plain: '連結',
    meaning: '建立信任與親密連結',
    low: '疏離、難放鬆',   high: '信任與溫暖' },
  { key: '5ht', name: '血清素', en: 'Serotonin',    plain: '心情',
    meaning: '帶來安全感與幸福感',
    low: '低落、焦躁',      high: '平和自在' },
  { key: 'cor', name: '皮質醇', en: 'Cortisol',     plain: '壓力',
    meaning: '身體承受的緊繃與壓力',
    low: '放鬆狀態',       high: '緊繃、難入眠' },
  { key: 'end', name: '腦內啡', en: 'Endorphins',   plain: '愉悅',
    meaning: '得到獎勵與回饋的快感',
    low: '無感、提不起興趣', high: '容易感到快樂' },
  { key: 'tes', name: '睪固酮', en: 'Testosterone', plain: '底氣',
    meaning: '自信、膽量與行動力的根',
    low: '沒自信、退縮',    high: '主動積極' },
];

// 分數帶分級 — 壓力越高越需要關注（反向），其他越低越需要
function bandOf(score, key) {
  // 壓力（cor）反向：分數高 = 偏高需關注
  const reverse = key === 'cor';
  const v = reverse ? (100 - score) : score;
  if (v < 40) return { key: 'low',  label: '偏低',  color: '#9E4A3B', tone: 'danger' };
  if (v < 60) return { key: 'edge', label: '需留意', color: '#B8802A', tone: 'warn' };
  if (v < 80) return { key: 'good', label: '良好',  color: '#3E5C4A', tone: 'ok' };
  return              { key: 'best', label: '理想',  color: '#3E5C4A', tone: 'ok' };
}

// 簡潔建議文字（給會員看的版本，不用醫學術語）
const MEMBER_FRIENDLY = {
  direction: '幫您穩住壓力、找回動能與好心情',
  summary: '最近壓力偏高、動能不足，記憶力與減重容易受影響。先把壓力緩下來、睡眠穩定，再恢復活力與愉悅感。',
};

const MEMBERS = {
  yuhong: {
    id: 'M-2024-0813',
    name: '陳昱閎',
    age: 29,
    gender: '男',
    level: '尊爵會員',
    joinedAt: '2025-11-18',
    primary: ['體重管理', '記憶與專注'],
    status: '新建議已生成．待預約',
    nextVisit: '2026.04.28',
    lastInteraction: '2026.04.19 · 會員顧問回訪',
    // 分數解讀為「越高越好」（除壓力為反向）
    nt: { da: 38, oxt: 62, '5ht': 48, cor: 76, end: 44, tes: 54 },
    lifestyle: {
      sleep: 5.2,
      stress: 7,
      fatigue: 6,
      bmi: 29.4,
      waist: 94,
    },
    tags: ['動能偏弱', '壓力偏高', '愉悅感不足', '代謝偏慢'],
    family: [
      { role: '本人', name: '陳昱閎', age: 29, status: 'active',   stage: '有建議' },
      { role: '配偶', name: '林佩君', age: 28, status: 'active',   stage: '待檢測' },
      { role: '父親', name: '陳國華', age: 58, status: 'active',   stage: '已入會' },
      { role: '母親', name: '王美蘭', age: 56, status: 'active',   stage: '已啟用' },
      { role: '哥哥', name: '陳昱翔', age: 33, status: 'pending',  stage: '待說明' },
      { role: '嫂嫂', name: '黃珮瑜', age: 31, status: 'pending',  stage: '待說明' },
      { role: '姪女', name: '陳安安', age:  6, status: 'reserved', stage: '保留' },
    ],
    journey: [
      { key: 'join',    label: '加入會員',     date: '2025.11.18', done: true },
      { key: 'intake',  label: '生活問卷',     date: '2025.11.22', done: true },
      { key: 'test',    label: '身心檢測',     date: '2026.03.05', done: true },
      { key: 'ai',      label: '專屬建議',     date: '2026.04.15', done: true, current: true },
      { key: 'product', label: '產品啟用',     date: '2026.04.28', done: false },
      { key: 'clinic',  label: '診所諮詢',     date: '2026.05.12', done: false },
      { key: 'follow',  label: '30 天回訪',    date: '2026.05.30', done: false },
    ],
    // 給會員看的主軸
    brief: {
      direction: '穩住壓力・找回動能・恢復好心情',
      headline: '最近的您，身體在發出這些訊息',
      // 改成會員能讀懂的白話
      insights: [
        { label: '壓力偏高', detail: '身體持續緊繃，記憶與睡眠都受影響' },
        { label: '動能不足', detail: '做事容易提不起勁，減重也比較吃力' },
        { label: '愉悅感偏低', detail: '日常小確幸的感受被壓抑了' },
      ],
      reason: '身心檢測顯示：壓力指數偏高、動能與愉悅感偏低。建議的方向是先讓睡眠與壓力穩定，再一步步恢復活力，最後啟動體態管理。這是為您量身安排的節奏，不需要一次改變所有習慣。',
      products: ['fish-oil', 'zhiming-drink', 'ai-liemian-ex', 'hongqu-ex'],
      service: {
        home:   ['22:30 前入睡、晨間日曬 10 分鐘', '主食份量降一階，記錄腰圍'],
        advise: ['會員顧問每週一次簡訊關心，追蹤睡眠與專注'],
        clinic: ['視 30 天狀況，由俱樂部診所評估更精細的檢查'],
      },
      followUp: [
        { day: 7,  item: '睡眠是否 > 6.5 小時、專注度自評' },
        { day: 14, item: '腰圍、疲勞指數、產品使用感' },
        { day: 30, item: '重新評估，決定是否預約診所諮詢' },
      ],
    },
  },
  meiling: {
    id: 'M-2024-0412',
    name: '王美玲',
    age: 52,
    gender: '女',
    level: '白金會員',
    joinedAt: '2025-06-10',
    primary: ['睡眠照顧', '更年期調理'],
    status: '待回訪',
    nextVisit: '2026.04.25',
    lastInteraction: '2026.04.10 · 診所回診',
    nt: { da: 55, oxt: 48, '5ht': 32, cor: 82, end: 40, tes: 36 },
    lifestyle: { sleep: 4.5, stress: 8, fatigue: 7, bmi: 23.1, waist: 78 },
    tags: ['心情偏低', '壓力偏高', '睡眠不足', '情緒起伏'],
    family: [
      { role: '本人', name: '王美玲', age: 52, status: 'active',  stage: '已啟用' },
      { role: '配偶', name: '張建志', age: 55, status: 'active',  stage: '待檢測' },
      { role: '女兒', name: '張雅筑', age: 24, status: 'pending', stage: '待說明' },
      { role: '兒子', name: '張宇軒', age: 20, status: 'pending', stage: '待說明' },
    ],
    journey: [
      { key: 'join',    label: '加入會員', date: '2025.06.10', done: true },
      { key: 'intake',  label: '生活問卷', date: '2025.06.15', done: true },
      { key: 'test',    label: '身心檢測', date: '2025.09.20', done: true },
      { key: 'ai',      label: '專屬建議', date: '2025.10.01', done: true },
      { key: 'product', label: '產品啟用', date: '2025.10.05', done: true },
      { key: 'clinic',  label: '診所諮詢', date: '2026.03.15', done: true, current: true },
      { key: 'follow',  label: '30 天回訪', date: '2026.04.25', done: false },
    ],
    brief: {
      direction: '助眠舒壓・安穩情緒・更年期陪伴',
      headline: '最近的您，身體在發出這些訊息',
      insights: [
        { label: '睡眠不足', detail: '平均只睡 4.5 小時，身體來不及修復' },
        { label: '心情偏低', detail: '情緒與耐受度都被影響' },
        { label: '壓力偏高', detail: '更年期搭配高壓，更容易疲倦' },
      ],
      reason: '這階段最重要的是穩下來。先照顧睡眠與情緒，再看身體恢復速度決定下一步。',
      products: ['ai-liemian-ex', 'goodnight-drink', 'pearl-powder', 'beauty-drink'],
      service: {
        home:   ['21:30 後調暗光線，固定入睡時間', '每日 15 分鐘緩步走'],
        advise: ['會員顧問每兩週追蹤睡眠與情緒'],
        clinic: ['診所已完成賀爾蒙評估，每季追蹤'],
      },
      followUp: [
        { day: 7,  item: '入睡時間、助眠產品耐受' },
        { day: 14, item: '情緒穩定度、潮熱頻率' },
        { day: 30, item: '診所複診與建議更新' },
      ],
    },
  },
  guohua: {
    id: 'M-2023-1102',
    name: '陳國華',
    age: 58,
    gender: '男',
    level: '尊爵會員',
    joinedAt: '2024-12-05',
    primary: ['循環代謝', '關節照顧'],
    status: '已入會・待檢測',
    nextVisit: '2026.04.30',
    lastInteraction: '2026.04.16 · 會員顧問說明',
    nt: { da: 50, oxt: 58, '5ht': 48, cor: 60, end: 52, tes: 58 },
    lifestyle: { sleep: 6.8, stress: 5, fatigue: 5, bmi: 26.8, waist: 92 },
    tags: ['代謝需留意', '關節磨耗', '壓力中等'],
    family: [
      { role: '本人', name: '陳國華', age: 58, status: 'active',  stage: '待檢測' },
      { role: '配偶', name: '王淑貞', age: 56, status: 'pending', stage: '待說明' },
    ],
    journey: [
      { key: 'join',    label: '加入會員', date: '2024.12.05', done: true },
      { key: 'intake',  label: '生活問卷', date: '2024.12.10', done: true, current: true },
      { key: 'test',    label: '身心檢測', date: '2026.04.30', done: false },
      { key: 'ai',      label: '專屬建議', date: '',           done: false },
      { key: 'product', label: '產品啟用', date: '',           done: false },
      { key: 'clinic',  label: '診所諮詢', date: '',           done: false },
      { key: 'follow',  label: '回訪',     date: '',           done: false },
    ],
    brief: {
      direction: '檢測完成後，為您量身規劃',
      headline: '尚待完成檢測',
      insights: [],
      reason: '目前只有生活問卷資料，完成身心檢測後，系統會為您整理專屬建議。',
      products: [],
      service: {
        home:   ['已提供初步飲食與活動指引'],
        advise: ['會員顧問已安排檢測套件寄送'],
        clinic: ['檢測後再評估'],
      },
      followUp: [],
    },
  },
};

// B 面板案件池
const CASES = [
  { id: 'M-2024-0813', name: '陳昱閎', stage: 'ai',      owners: { sales: '吳明翰', clinic: '—', ops: '林佳穎', ai: '健康顧問系統' },
    next: { sales: '確認啟動包宅配時間', clinic: '待結果評估診所路徑', ops: '魚油 + 智明靈光飲備貨', ai: '追加記憶量表問卷' },
    risk: null, summary: '主訴體重與記憶力。建議先從壓力與睡眠著手。' },
  { id: 'M-2024-0412', name: '王美玲', stage: 'follow',  owners: { sales: '吳明翰', clinic: '李怡君醫師', ops: '林佳穎', ai: '健康顧問系統' },
    next: { sales: '確認 4/25 30 天回訪', clinic: '賀爾蒙追蹤已排', ops: '晚安飲補貨', ai: '重新評估觸發條件' },
    risk: null, summary: '診所已承接，產品第 3 週，情緒量表改善 2 分。' },
  { id: 'M-2023-1102', name: '陳國華', stage: 'test',    owners: { sales: '吳明翰', clinic: '—', ops: '林佳穎', ai: '—' },
    next: { sales: '4/30 檢測陪同', clinic: '檢測後評估', ops: '檢測套件已寄出', ai: '待資料回傳' },
    risk: null, summary: '配偶尚未入會，評估家族方案擴展路徑。' },
  { id: 'M-2025-0220', name: '劉志成', stage: 'intro',   owners: { sales: '黃品誠', clinic: '—', ops: '—', ai: '—' },
    next: { sales: '第 2 次說明約定 4/23', clinic: '未進場', ops: '—', ai: '—' },
    risk: 'noMember', summary: '尚未入會，不可推診所方案。' },
  { id: 'M-2025-0305', name: '蔡惠雯', stage: 'product', owners: { sales: '黃品誠', clinic: '王俊宏醫師', ops: '林佳穎', ai: '健康顧問系統' },
    next: { sales: '追蹤第 7 日量表', clinic: '診所已評估無須介入', ops: '已出貨 2 箱', ai: '7 日回訪觸發' },
    risk: null, summary: '助眠舒壓方案，適配度佳。' },
  { id: 'M-2025-0118', name: '周慧君', stage: 'intake',  owners: { sales: '黃品誠', clinic: '—', ops: '—', ai: '—' },
    next: { sales: '問卷補填提醒', clinic: '—', ops: '—', ai: '資料不足' },
    risk: 'noData', summary: '尚未上傳檢測，不可生成完整方案。' },
];

const STAGE_META = {
  intro:   { label: '待說明' },
  member:  { label: '已入會' },
  intake:  { label: '問卷中' },
  test:    { label: '待檢測' },
  ai:      { label: '待建議' },
  product: { label: '產品啟用' },
  clinic:  { label: '待診所' },
  follow:  { label: '待回訪' },
};

Object.assign(window, { PRODUCTS, NT_SCHEMA, bandOf, MEMBERS, CASES, STAGE_META, MEMBER_FRIENDLY });
