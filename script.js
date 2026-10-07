'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* Media URLs are generated from the project's Lovable Assets pointers. */
const photoCredits = {
  fritsch: ['R. D. Wood / Hunt Institute · Public domain', 'https://commons.wikimedia.org/wiki/File:Felix_Eugen_Fritsch_in_his_office_in_University_of_London.png'],
  'nurul-islam': ['Wikipedia · Identification photograph (non-free)', 'https://en.wikipedia.org/wiki/AKM_Nurul_Islam_(botanist)'],
  beijerinck: ['Wellcome Images · CC BY 4.0', 'https://commons.wikimedia.org/wiki/File:Martinus_Willem_Beijerinck.jpg'],
  warburg: ['Bundesarchiv / Georg Pahl · CC BY-SA 3.0 DE', 'https://commons.wikimedia.org/wiki/File:Otto_Heinrich_Warburg_(cropped).jpg'],
  calvin: ['National Cancer Institute / NIH · Public domain', 'https://commons.wikimedia.org/wiki/File:Calvin,_melvin_(1).jpg']
};
const assignments = {
  0: [], 1: [0], 2: [1], 3: [2], 4: [3], 5: [4], 6: [5],
  7: [6], 8: [6], 9: [6], 10: [8, 7], 11: [], 12: [9], 13: []
};
const pic = (k, alt, cls = '', cap = '') => `<figure class="pic ${cls}"><img class="img zoom" src="${window.ALGAE_ASSETS[k]}" data-credit="${k}" alt="${alt}" decoding="async" role="button" tabindex="0" aria-label="${alt} — বড় করে দেখুন" aria-haspopup="dialog">${cap ? `<figcaption class="zoomhint">${cap}</figcaption>` : ''}</figure>`;

/* ---------- DATA ---------- */
const D = {
  origin: [
    { ic: '🦠', t: 'ব্যাকটেরিয়া', s: 'প্রায় ৪৫০০ মিলিয়ন বছর পূর্বে', d: 'ধারণা করা হয়, ক্লোরোফিলযুক্ত ব্যাকটেরিয়া থেকেই যাত্রার শুরু।' },
    { ic: '🔵', t: 'সায়ানোব্যাকটেরিয়া', s: 'প্রায় ৩৫০০ মিলিয়ন বছর পূর্বে', d: 'ক্লোরোফিলযুক্ত ব্যাকটেরিয়া থেকে এদের উদ্ভব ধরা হয়।' },
    { ic: '🌿', t: 'প্রকৃতকোষী শৈবাল', s: 'দীর্ঘ বিবর্তনের ফল', d: 'সায়ানোব্যাকটেরিয়া থেকে প্রকৃতকোষী শৈবালের উদ্ভব ধারণা করা হয়; দীর্ঘ বিবর্তনের ফলে বর্তমানের বিভিন্ন শৈবাল গোষ্ঠীর সৃষ্টি।' }
  ],
  chSci: [
    { k: 'beijerinck', n: 'M. W. Beijerinck', life: '১৬ মার্চ ১৮৫১ – ১ জানুয়ারি ১৯৩১', d: '১৮৯০ সালে Chlorella vulgaris বিশুদ্ধ কালচারে আলাদা করেন।' },
    { k: 'warburg', n: 'Otto Warburg', life: '৮ অক্টোবর ১৮৮৩ – ১ আগস্ট ১৯৭০', d: 'Chlorella নিয়ে আলোকসংশ্লেষণ ও শ্বসন গবেষণা করেন।' },
    { k: 'calvin', n: 'Melvin Calvin', life: '৮ এপ্রিল ১৯১১ – ৮ জানুয়ারি ১৯৯৭', d: 'Chlorella ব্যবহার করে ক্যালভিন চক্র আবিষ্কার করেন (নোবেল ১৯৬১)।' }
  ],
  trends: [
    { ic: '⚪', n: 'ভলভোসিন ধারা', e: 'Volvocine trend', d: 'একক সচল কোষ থেকে জটিল কলোনি', go: 4 },
    { ic: '🟢', n: 'ক্লোরোককসিন ধারা', e: 'Chlorococcine trend', d: 'ফ্লাজেলার বিলুপ্তি ও নিশ্চল শৈবালের উদ্ভব', go: 5 },
    { ic: '🧬', n: 'টেট্রাস্পোরিন ধারা', e: 'Tetrasporine trend', d: 'সরল ফিলামেন্ট থেকে শাখান্বিত থ্যালাস', go: 6 }
  ],
  volv: [
    { n: 'Chlamydomonas', c: 1, d: 'এককোষী ও ফ্লাজেলাযুক্ত সচল শৈবাল — ধারার সূচনা।' },
    { n: 'Gonium', c: 4, d: 'কয়েকটি কোষ নিয়ে গঠিত সরল কলোনি।' },
    { n: 'Pandorina', c: 12, d: 'কোষসংখ্যা আরও বেশি; কলোনি আরও সংগঠিত।' },
    { n: 'Pleodorina', c: 28, d: 'কোষের সংখ্যা ও জটিলতা আরও বৃদ্ধি পায়।' },
    { n: 'Volvox', c: 60, d: 'সবচেয়ে জটিল — সুস্পষ্ট শ্রমবিভাগ দেখা যায়।' }
  ],
  gam: [['আইসোগ্যামী', 'দুই গ্যামেটই দেখতে একই রকম।'], ['অ্যানাইসোগ্যামী', 'দুই গ্যামেটের আকার অসম।'], ['উগ্যামী', 'বড় অচল ডিম্বাণু ও ছোট সচল শুক্রাণুর মিলন।']],
  chloro: [
    { n: 'Chlamydomonas', st: 0, d: 'সচল, ফ্লাজেলাযুক্ত — ধারার সূচনা।' },
    { n: 'Chlorococcum / Chlorella', st: 1, d: 'ফ্লাজেলার বিলুপ্তি ঘটতে শুরু; কম সচল।' },
    { n: 'Scenedesmus', st: 2, d: 'নিশ্চল শৈবাল — কোষ কলোনি আকারে থাকে।' },
    { n: 'Pediastrum', st: 3, d: 'নিশ্চল, সুসংগঠিত কলোনি।' },
    { n: 'Hydrodictyon', st: 3, d: 'জালিকাকার (net-like) কলোনি সৃষ্টি হয়।' }
  ],
  stNames: ['সচল', 'কম সচল', 'নিশ্চল', 'কলোনি গঠন'],
  tetra: [
    { n: 'Chlamydomonas', d: 'সরল একক কোষ — যাত্রার শুরু।' },
    { n: 'Palmella / Tetraspora', d: 'কোষগুলো জেলির মতো আবরণে একত্র থাকে।' },
    { n: 'Ulothrix', d: 'সরল ফিলামেন্ট।' },
    { n: 'শাখান্বিত ও পত্রসদৃশ শৈবাল', d: 'শাখান্বিত ও জটিল থ্যালাসের বিকাশ।' }
  ],
  space: [
    ['🫧', 'অক্সিজেন উৎপাদন', 'আলোকসংশ্লেষণের মাধ্যমে শৈবাল O₂ উৎপাদন করে।'],
    ['🌬️', 'CO₂ অপসারণ', 'নভোচারীর ত্যাগ করা CO₂ শৈবাল গ্রহণ করে।'],
    ['🥗', 'খাদ্যের উৎস', 'শৈবাল প্রোটিন, ভিটামিন ও খনিজের সম্ভাব্য উৎস।'],
    ['♻️', 'বর্জ্য পুনর্ব্যবহার', 'বর্জ্য থেকে পুষ্টি উপাদান পুনর্ব্যবহার করে শৈবাল/উদ্ভিদে কাজে লাগানো যায়।'],
    ['🧪', 'জৈব পদার্থ উৎপাদন', 'আলোকসংশ্লেষণে শৈবাল জৈব পদার্থ তৈরি করে।'],
    ['🔄', 'বন্ধ-চক্র জীবনধারণ ব্যবস্থা', 'O₂, CO₂, পুষ্টি ও পানি চক্রাকারে ব্যবহার — দীর্ঘ মিশনের জন্য গুরুত্বপূর্ণ।'],
    ['🛰️', 'মহাকাশ পরিবেশের গবেষণা', 'মহাকাশ পরিবেশে শৈবাল কেমন আচরণ করে, তা গবেষণার সুযোগ।']
  ],
  pos: ['অক্সিজেন উৎপাদন', 'CO₂ পুনর্ব্যবহার', 'খাদ্য উৎপাদন', 'জৈব পদার্থ উৎপাদন', 'দীর্ঘমেয়াদি বন্ধ-চক্র জীবনধারণ ব্যবস্থা', 'ভবিষ্যৎ মহাকাশ স্টেশন/দীর্ঘমেয়াদি মিশনে ব্যবহার'],
  neg: ['নিয়ন্ত্রিত পরিবেশ প্রয়োজন', 'আলো ও পুষ্টির প্রয়োজন', 'সিস্টেম পরিচালনায় প্রযুক্তিগত জটিলতা', 'দূষণ/জীবাণু নিয়ন্ত্রণ', 'মহাকাশ পরিবেশে দীর্ঘমেয়াদি স্থায়িত্ব যাচাই প্রয়োজন'],
  team: [
    ['হুমাইরা', 'শৈবালের পরিচয় ও বিজ্ঞানী'], ['রাতুল', 'শৈবালের উৎপত্তি'], ['রাইহান', 'শৈবালের বিবর্তন'],
    ['আলিফা', 'ভলভোসিন ধারা'], ['নমিতা', 'ক্লোরোককসিন ধারা'], ['খুকুমণি', 'টেট্রাস্পোরিন ধারা'],
    ['গাজী', 'মহাকাশ গবেষণায় শৈবালের গুরুত্ব (ক্লোরেলা শৈবালের গুরুত্ব)'], ['সোলাইমান', 'মহাকাশ গবেষণায় শৈবালের সীমাবদ্ধতা'],
    ['ত্রয়ী', 'মহাকাশে শৈবালের সম্ভাবনা ও ব্যবহার'], ['তারিন', 'উপসংহার ও ভবিষ্যৎ সম্ভাবনা']
  ],
  quiz: [
    ['শৈবালের জনক কে?', ['Darwin', 'F. E. Fritsch', 'Blackman', 'Linnaeus'], 1],
    ['Chlorella কোন শ্রেণির অন্তর্ভুক্ত?', ['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae', 'Bacillariophyceae'], 0],
    ['E. E. Blackman কত সালে ৩টি প্রধান বিবর্তনধারা উল্লেখ করেন?', ['১৮৯০', '১৯০০', '১৯১০', '১৯২০'], 1],
    ['Volvocine trend-এর শেষ দিকে কোনটি দেখা যায়?', ['Chlamydomonas', 'Gonium', 'Volvox', 'Pandorina'], 2],
    ['মহাকাশে শৈবালের একটি গুরুত্বপূর্ণ ভূমিকা কী?', ['ফসিল তৈরি করা', 'Oxygen production / CO₂ removal', 'রকেটের জ্বালানি ট্যাংক হওয়া', 'মহাকাশযান ঠান্ডা রাখা'], 1]
  ]
};

/* ---------- helpers ---------- */
function colony(n) {
  const S = 100, R = 42; let c = '';
  if (n === 1) c = `<path d="M44 30 Q40 12 34 6M56 30 Q60 12 66 6" stroke="#9ff" stroke-width="2" fill="none"/><ellipse cx="50" cy="58" rx="20" ry="25" fill="#46d37a"/><circle cx="50" cy="66" r="6" fill="#fb923c"/>`;
  else {
    c = `<circle cx="50" cy="50" r="${R + 4}" fill="rgba(34,211,238,.1)" stroke="#22d3ee" stroke-width="1.5"/>`;
    const cr = Math.max(2.4, R * 1.15 / Math.sqrt(n));
    for (let i = 0; i < n; i++) { const r = R * Math.sqrt((i + .5) / n), a = i * 2.39996; c += `<circle cx="${(50 + r * Math.cos(a)).toFixed(1)}" cy="${(50 + r * Math.sin(a)).toFixed(1)}" r="${cr.toFixed(1)}" fill="${n > 40 && i > n * .8 ? '#fb923c' : '#46d37a'}" stroke="#0a5" stroke-width=".4"/>`; }
  }
  return `<svg class="org" viewBox="0 0 ${S} ${S}" aria-hidden="true">${c}</svg>`;
}
/* simple schematic icons for the Chlorococcine line (conceptual, not to scale) */
function cico(i) {
  const g = '#46d37a', s = '#0a5';
  const o = [
    () => colony(1),
    () => `<circle cx="50" cy="50" r="24" fill="${g}" stroke="${s}"/><circle cx="50" cy="50" r="8" fill="${s}" opacity=".5"/>`,
    () => [24, 41, 58, 75].map(x => `<ellipse cx="${x}" cy="50" rx="8" ry="20" fill="${g}" stroke="${s}"/>`).join(''),
    () => `<circle cx="50" cy="50" r="9" fill="${g}" stroke="${s}"/>` + Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4; return `<circle cx="${(50 + 27 * Math.cos(a)).toFixed(1)}" cy="${(50 + 27 * Math.sin(a)).toFixed(1)}" r="9" fill="${g}" stroke="${s}"/>`; }).join(''),
    () => `<path d="M14 28h72M14 50h72M14 72h72M28 14v72M50 14v72M72 14v72" stroke="#22d3ee" stroke-width="2.2"/>` + [28, 50, 72].flatMap(x => [28, 50, 72].map(y => `<circle cx="${x}" cy="${y}" r="5" fill="${g}"/>`)).join('')
  ];
  return i === 0 ? o[0]() : `<svg class="org" viewBox="0 0 100 100" aria-hidden="true">${o[i]()}</svg>`;
}
/* closed-loop diagram: Astronaut → CO₂ → Algae → Photosynthesis → O₂ → Astronaut */
function cycleSVG() {
  const N = [['👨‍🚀 নভোচারী', 'Astronaut'], ['CO₂', 'কার্বন ডাই-অক্সাইড'], ['🌿 শৈবাল', 'Algae / Chlorella'], ['আলোকসংশ্লেষণ', 'Photosynthesis'], ['O₂', 'অক্সিজেন']];
  const cx = 220, cy = 170, rx = 150, ry = 110, hw = 66, hh = 26;
  const P = N.map((_, k) => { const a = (-90 + 72 * k) * Math.PI / 180; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
  let e = '', nodes = '';
  P.forEach((p, k) => {
    const q = P[(k + 1) % 5], dx = q[0] - p[0], dy = q[1] - p[1];
    const f = Math.min(hw / Math.abs(dx || 1e-9), hh / Math.abs(dy || 1e-9)) + .03;
    e += `<line x1="${(p[0] + dx * f).toFixed(1)}" y1="${(p[1] + dy * f).toFixed(1)}" x2="${(q[0] - dx * f).toFixed(1)}" y2="${(q[1] - dy * f).toFixed(1)}" marker-end="url(#ah)" style="stroke:#22d3ee;stroke-width:2.5"/>`;
    nodes += `<g class="node"><rect x="${(p[0] - hw).toFixed(1)}" y="${(p[1] - hh).toFixed(1)}" width="${hw * 2}" height="${hh * 2}" rx="14"/><text x="${p[0].toFixed(1)}" y="${(p[1] - 3).toFixed(1)}" text-anchor="middle" font-size="14" font-weight="700">${N[k][0]}</text><text x="${p[0].toFixed(1)}" y="${(p[1] + 13).toFixed(1)}" text-anchor="middle" font-size="10" style="fill:var(--mute)">${N[k][1]}</text></g>`;
  });
  const path = 'M' + P.map(p => p.map(v => v.toFixed(1)).join(' ')).join('L') + 'Z';
  return `<svg viewBox="0 0 440 320" style="width:100%;max-height:44vh" role="img" aria-label="নভোচারী → CO₂ → শৈবাল → আলোকসংশ্লেষণ → O₂ → নভোচারী"><defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:#22d3ee"/></marker></defs>${e}<circle r="5" style="fill:#fb923c"><animateMotion dur="10s" repeatCount="indefinite" path="${path}"/></circle>${nodes}<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--green)">বন্ধ-চক্র</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" style="fill:var(--mute)">Closed loop</text></svg>`;
}
const head = (t, e, tag) => `${tag ? `<span class="tag">${tag}</span>` : ''}<h2>${t}</h2>${e ? `<div class="sub">${e}</div>` : ''}`;
let timers = [];
const later = (f, ms) => { const id = setInterval(f, ms); timers.push(id); return id; };
/* highlight items one after another (animation only — the content is always visible) */
const cycle = (items, ms, on) => { let k = 0; const f = () => { items.forEach((x, j) => x.classList.toggle('hl', j === k)); on && on(k); k = (k + 1) % items.length; }; f(); later(f, ms); };
const replay = (btn, el, fn) => { btn.onclick = () => { timers.forEach(clearInterval); timers = []; fn(el); }; };

/* ---------- SLIDES ---------- */
const slides = [
  /* 0 — cover */
  { t: 'শুরু', cls: 'center cover', html: () => `
    <div class="dna">🌿</div>
    <h1>শৈবাল: বিবর্তন, বৈচিত্র্য ও মহাকাশ গবেষণায় সম্ভাবনা</h1>
    <div class="sub big2" style="font-size:1.3rem">Algae: Evolution, Diversity &amp; Potential in Space Research</div>
    <div><button class="btn" data-go="1">উপস্থাপনা শুরু করুন →</button></div>
    <p class="zoomhint">← → কীবোর্ড, Space, Home/End • Esc: কন্ট্রোল দেখান/লুকান</p>` },

  /* 1 — introduction & scientists */
  { t: 'পরিচয়', tag: 'অংশ ১', html: () => `
    ${head('শৈবাল — পরিচয় ও বিজ্ঞানী', 'Algae — Introduction &amp; Pioneers', 'অংশ ১')}
    <div class="glass">শৈবাল হলো প্রধানত জলজ পরিবেশে বসবাসকারী সরল গঠনবিশিষ্ট আলোকসংশ্লেষণকারী জীব। এদের দেহকে <b>মূল, কাণ্ড ও পাতায়</b> বিভক্ত করা যায় না।</div>
    <div class="grid g2 grow">
      <div class="glass sci-card">
        ${pic('fritsch', 'F. E. Fritsch-এর ছবি', 'sphoto')}
        <div><span class="tag">শৈবালের জনক</span><h3 style="font-size:1.4rem;margin-top:6px">F. E. Fritsch</h3>
          <div class="sub">জন্ম–মৃত্যু: ২৬ এপ্রিল ১৮৭৯ – ২ মে ১৯৫৪</div>
          <p>তিনি শৈবালের সবচেয়ে নির্ভরযোগ্য পূর্ণাঙ্গ শ্রেণিবিন্যাস প্রদান করেন।</p></div>
      </div>
      <div class="glass sci-card">
        ${pic('nurul-islam', 'ড. এ কে এম নুরুল ইসলাম-এর ছবি', 'sphoto')}
        <div><span class="tag" style="background:rgba(251,146,60,.16);border-color:rgba(251,146,60,.5);color:var(--orange)">বাংলাদেশের শৈবালবিজ্ঞানের জনক</span><h3 style="font-size:1.4rem;margin-top:6px">ড. এ কে এম নুরুল ইসলাম</h3>
          <div class="sub">জন্ম–মৃত্যু: ২৭ অক্টোবর ১৯২৮ – ১ জুলাই ২০০৬</div>
          <p>ঢাকা বিশ্ববিদ্যালয়ের বোটানি বিভাগের অধ্যাপক; বাংলাদেশে শৈবালবিজ্ঞানের গবেষণা ও বিকাশে গুরুত্বপূর্ণ ভূমিকা রাখেন।</p></div>
      </div>
    </div>
    <div class="zoomhint">ছবিতে ক্লিক করলে বড় করে দেখা যাবে</div>` },

  /* 2 — origin */
  { t: 'উৎপত্তি', cls: 'light', html: () => `
    ${head('শৈবালের উৎপত্তি', 'Origin of Algae', 'অংশ ২')}
    <div class="glass"><b>শৈবালের দেহ নরম হওয়ায় ফসিল রেকর্ড খুবই সীমিত।</b></div>
    <div class="grid g12 grow">
      <div class="vflow" id="ov">
        ${D.origin.map((o, i) => `<div class="glass ostage"><span class="big">${o.ic}</span><div><h3>${o.t}</h3><div class="sub">${o.s}</div><small>${o.d}</small></div></div>${i < 2 ? '<div class="arr">↓</div>' : ''}`).join('')}
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;justify-content:center">
        <div class="glass"><b>ধারণা করা হয়:</b>
          <div class="vflow" style="margin-top:8px"><div class="chip">ক্লোরোফিলযুক্ত ব্যাকটেরিয়া</div><div class="arr">↓</div><div class="chip">সায়ানোব্যাকটেরিয়া</div><div class="arr">↓</div><div class="chip">প্রকৃতকোষী শৈবাল</div></div></div>
        <div class="glass">দীর্ঘ বিবর্তনের ফলে বর্তমানের বিভিন্ন শৈবাল গোষ্ঠীর উদ্ভব হয়েছে।</div>
      </div>
    </div>`,
    play(el) { cycle($$('.ostage', el), 1500); } },

  /* 3 — trends overview */
  { t: 'ধারা', html: () => `
    ${head('শৈবালের বিবর্তনের ধারা', 'Evolutionary Trends', 'অংশ ৩')}
    <div class="glass"><b>বিবর্তন হলো জীবের ধারাবাহিক পরিবর্তন।</b><br>শৈবালের দৈহিক গঠন, প্রজনন, ফ্লাজেলা, রঞ্জক ও সঞ্চিত খাদ্যে বৈচিত্র্য দেখা যায়।</div>
    <div class="quote">E. E. Blackman (1900) শৈবালের প্রধান ৩টি বিবর্তনধারা উল্লেখ করেন।</div>
    <div class="grid g3 grow">${D.trends.map((t, i) => `<div class="glass hov trend" role="link" tabindex="0" data-go="${t.go}"><div class="ico">${t.ic}</div><small class="sub">${i + 1}.</small><h2>${t.n}</h2><div class="sub">${t.e}</div><div>${t.d}</div><small class="zoomhint">বিস্তারিত স্লাইডে যেতে ক্লিক করুন →</small></div>`).join('')}</div>` },

  /* 4 — Volvocine */
  { t: 'ভলভোসিন', html: () => `
    ${head('ভলভোসিন ধারা', 'Volvocine Trend', 'অংশ ৪')}
    <div class="row" id="vrow">${D.volv.map((o, i) => `<div class="glass stage"><span class="tag" style="font-size:.7rem">ধাপ ${i + 1}</span>${colony(o.c)}<b class="sci">${o.n}</b><small>${o.d}</small></div>${i < 4 ? '<span class="arr">→</span>' : ''}`).join('')}</div>
    <div class="glass"><b>কোষের সংখ্যা ও জটিলতা ক্রমে বৃদ্ধি পায়।</b> <small>(চিত্রের কোষসংখ্যা ধারণাগত)</small>
      <div class="meter" style="margin-top:8px" id="vm">${D.volv.map((o, i) => `<span>${i + 1}</span>`).join('')}</div></div>
    <div class="grid g2 grow">
      <div class="glass"><b>যৌন প্রজনন:</b>
        <div class="row" style="margin-top:8px">${D.gam.map((g, i) => `<div class="chip" style="flex:1"><b>${g[0]}</b><br><small>${g[1]}</small></div>${i < 2 ? '<span class="arr">→</span>' : ''}`).join('')}</div></div>
      <div class="glass quote" style="display:flex;align-items:center"><span><b>Volvox-এ সুস্পষ্ট শ্রমবিভাগ দেখা যায়।</b><br><button class="btn" id="vplay" style="margin-top:8px">▶ অ্যানিমেশন আবার চালান</button></span></div>
    </div>`,
    play(el) {
      const st = $$('.stage', el), ms = $$('#vm span', el);
      const run = () => { let k = 0; const f = () => { st.forEach((s, j) => { s.classList.toggle('lit', j <= k); s.classList.toggle('hl', j === k); }); ms.forEach((m, j) => m.classList.toggle('on', j <= k)); k = (k + 1) % (st.length + 1); if (k === st.length) k = 0; }; f(); later(f, 1300); };
      run(); replay($('#vplay', el), el, s => slides[4].play(s));
    } },

  /* 5 — Chlorococcine */
  { t: 'ক্লোরোককসিন', cls: 'light', html: () => `
    ${head('ক্লোরোককসিন ধারা', 'Chlorococcine Trend', 'অংশ ৫')}
    <div class="row" id="crow">${D.chloro.map((o, i) => `<div class="glass stage">${cico(i)}<b class="sci">${o.n}</b><span class="tag" style="font-size:.7rem">${D.stNames[o.st]}</span><small>${o.d}</small></div>${i < 4 ? '<span class="arr">→</span>' : ''}`).join('')}</div>
    <div class="grid g2 grow">
      <div class="glass"><b>ফ্লাজেলার বিলুপ্তির মাধ্যমে নিশ্চল শৈবালের উদ্ভব।</b>
        <div class="meter" style="margin-top:10px" id="cm">${D.stNames.map(s => `<span>${s}</span>`).join('')}</div></div>
      <div class="glass quote" style="display:flex;align-items:center"><span><b>Hydrodictyon-এ জালিকাকার কলোনি সৃষ্টি হয়।</b><br><button class="btn" id="cplay" style="margin-top:8px">▶ অ্যানিমেশন আবার চালান</button></span></div>
    </div>`,
    play(el) {
      const st = $$('.stage', el), ms = $$('#cm span', el);
      cycle(st, 1400, k => { st.forEach((s, j) => s.classList.toggle('lit', j <= k)); ms.forEach((m, j) => m.classList.toggle('on', j <= D.chloro[k].st)); });
      replay($('#cplay', el), el, s => slides[5].play(s));
    } },

  /* 6 — Tetrasporine */
  { t: 'টেট্রাস্পোরিন', html: () => `
    ${head('টেট্রাস্পোরিন ধারা ও আধুনিক ধারণা', 'Tetrasporine Trend', 'অংশ ৬')}
    <div class="grid g2 grow">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="glass"><div class="vflow" id="tv">${D.tetra.map((o, i) => `<div class="chip stage" style="flex-direction:row;gap:10px;justify-content:flex-start;text-align:left"><b class="sci">${o.n}</b><small>— ${o.d}</small></div>${i < 3 ? '<div class="arr">↓</div>' : ''}`).join('')}</div></div>
        <div class="glass"><b>সরল ফিলামেন্ট থেকে শাখান্বিত ও জটিল থ্যালাসের বিকাশ।</b>
          <svg class="morph" viewBox="0 0 300 160" style="width:100%;max-height:22vh" aria-hidden="true">
            <g id="m0"><ellipse cx="150" cy="95" rx="24" ry="30" fill="#46d37a"/><path d="M142 66Q136 40 126 30M158 66Q164 40 174 30" stroke="#9ff" stroke-width="2.5" fill="none"/><circle cx="150" cy="102" r="6" fill="#fb923c"/></g>
            <g id="m1"><rect x="60" y="30" width="180" height="110" rx="55" fill="rgba(34,211,238,.18)" stroke="#22d3ee"/>${[[100, 70], [140, 60], [180, 75], [120, 105], [165, 108], [205, 100]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="14" fill="#46d37a"/>`).join('')}</g>
            <g id="m2">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${24 + i * 33}" y="68" width="32" height="26" rx="5" fill="#46d37a" stroke="#0a5"/>`).join('')}</g>
            <g id="m3"><path class="dash" d="M150 150V60M150 110L100 70M150 90L205 50M150 70L120 30M100 70L70 40M205 50L240 30" stroke="#46d37a" stroke-width="6" stroke-linecap="round" fill="none"/>${[[120, 28], [70, 38], [240, 28], [150, 52], [100, 68], [205, 48]].map(p => `<ellipse cx="${p[0]}" cy="${p[1]}" rx="14" ry="8" fill="#10b981"/>`).join('')}</g>
          </svg></div>
        <div class="glass quote">Fritsch-এর মতে, হেটারোট্রিকাস স্বভাব স্থলজ উদ্ভিদের উৎপত্তির পূর্বধাপ।</div>
      </div>
      <div class="glass" style="display:flex;flex-direction:column;justify-content:center">${pic('tetrasporine', 'টেট্রাস্পোরিন ধারার বিবর্তন-চিত্র', 'contain big', 'টেট্রাস্পোরিন ধারার চিত্র — বড় করতে ক্লিক করুন')}</div>
    </div>`,
    play(el) { const st = $$('#tv .stage', el); cycle(st, 1700, k => [0, 1, 2, 3].forEach(j => $('#m' + j, el).classList.toggle('show', j === k))); } },

  /* 7 — Chlorella */
  { t: 'Chlorella', cls: 'light', html: () => `
    ${head('Chlorella — একটি গুরুত্বপূর্ণ শৈবাল', '', 'অংশ ৭')}
    <div class="glass" style="border-color:var(--orange);font-weight:700">Chlorella ক্লোরোফাইসি (Chlorophyceae) শ্রেণির অন্তর্ভুক্ত।</div>
    <div class="grid grow" style="grid-template-columns:1.25fr 1fr">
      <div class="glass chlorella-photos">
        ${pic('chlorella-field-photo', 'সাদা পোশাকে নমুনার বোতল হাতে — Chlorella বিষয়ের ছবি', 'contain field-photo', 'Chlorella — মাঠপর্যায়ের নমুনা সংগ্রহ')}
        ${pic('chlorella', 'Chlorella শৈবালের ছবি', 'contain big', 'Chlorella — বড় করতে ক্লিক করুন')}
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="glass"><ul style="padding-left:1.1em;display:grid;gap:6px"><li>Chlorella একটি এককোষী, গোলাকার সবুজ শৈবাল।</li><li>এটি Chlorophyceae শ্রেণির অন্তর্ভুক্ত।</li><li>উচ্চমাত্রার প্রোটিন, ভিটামিন ও খনিজ পদার্থ পাওয়া যায়।</li><li>জীবপ্রযুক্তিতে খাদ্য, জৈব সার ও বায়োফুয়েল উৎপাদনে ব্যবহার করা যায়।</li></ul></div>
        <div class="glass"><div class="row" style="gap:8px;justify-content:center"><span class="chip">🥗 খাদ্য</span><span class="chip">🌱 জৈব সার</span><span class="chip">⛽ বায়োফুয়েল</span><span class="chip">🛰️ মহাকাশে সম্ভাবনা</span></div></div>
      </div>
    </div>`  },

  /* 7b — Chlorella scientists */
  { t: 'Chlorella বিজ্ঞানী', html: () => `
    ${head('Chlorella ও সংশ্লিষ্ট বিজ্ঞানী', 'Pioneers of Chlorella research', 'অংশ ৭')}
    <div class="grid g3 grow">${D.chSci.map(c => `<div class="glass sbig">${pic(c.k, c.n + '-এর ছবি', 'sphoto lg')}<h3>${c.n}</h3><div class="sub">জন্ম–মৃত্যু:<br>${c.life}</div><small>${c.d}</small></div>`).join('')}</div>` },

  /* 8 — space */
  { t: 'মহাকাশ', cls: 'space', html: () => `
    ${head('মহাকাশ গবেষণায় শৈবালের গুরুত্ব', 'Space Life Support System', 'অংশ ৮')}
    <div class="grid g2 astronaut-photos">
      ${pic('astronaut-algae-1', 'মহাকাশ স্টেশনে সবুজ শৈবালের নমুনা পরীক্ষা করছেন নভোচারী', 'contain sq', 'নভোচারী — মহাকাশে শৈবালের নমুনা পরীক্ষা')}
      ${pic('astronaut-algae-2', 'মহাকাশ স্টেশনে গবেষণার নমুনা নিয়ে কাজ করছেন নভোচারী', 'contain sq', 'নভোচারী — মহাকাশ স্টেশনে গবেষণা')}
    </div>
    <div class="glass">দীর্ঘমেয়াদি মহাকাশ মিশনে শৈবাল জীবনধারণ ব্যবস্থা (life-support system) তৈরিতে গুরুত্বপূর্ণ ভূমিকা রাখতে পারে।</div>
    <div class="grid g2">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="glass" id="cyc">${cycleSVG()}</div>
        <div class="glass"><b>♻️ বর্জ্য-চক্র</b><div class="flow" id="f2" style="margin-top:6px">${['Waste', 'Recycling', 'Nutrients', 'Algae / Plants', 'Life-support system'].map((x, i) => `<span class="chip">${x}</span>${i < 4 ? '<span class="arr" style="color:var(--cyan)">→</span>' : ''}`).join('')}</div></div>
      </div>
      <div class="glass pts">${D.space.map((s, i) => `<div class="pt"><span class="n">${i + 1}</span><div><b>${s[0]} ${s[1]}</b><br><small>${s[2]}</small></div></div>`).join('')}</div>
    </div>
    <div class="grid g3">
      ${pic('space-photobioreactor', 'মহাকাশ পরিবেশে মাইক্রোঅ্যালগি ফটোবায়োরিয়াক্টর', 'contain sq', 'মহাকাশ পরিবেশে ফটোবায়োরিয়াক্টর')}
      ${pic('oxygen-system', 'মাইক্রোঅ্যালগিভিত্তিক অক্সিজেন পুনরুৎপাদন ব্যবস্থা', 'contain sq', 'মাইক্রোঅ্যালগিভিত্তিক অক্সিজেন পুনরুৎপাদন ব্যবস্থা')}
      ${pic('space-system', 'মহাকাশ জীবনধারণ / শৈবাল ব্যবস্থার ডায়াগ্রাম', 'contain sq', 'মহাকাশ জীবনধারণ ব্যবস্থার ডায়াগ্রাম')}
    </div>
    <div class="zoomhint">ছবি/ডায়াগ্রাম বড় করতে ক্লিক করুন</div>`,
    play(el) {
      cycle($$('.node', $('#cyc', el)), 1800);
      cycle($$('.chip', $('#f2', el)), 1100);
    } },

  /* 9 — potential & limits */
  { t: 'সম্ভাবনা', html: () => `
    ${head('মহাকাশে শৈবালের সম্ভাবনা ও সীমাবদ্ধতা', 'Potential vs Challenges', 'অংশ ৯')}
    <div class="beam" id="beam"></div>
    <div class="grid g2 grow">
      <div class="glass col pos" id="cp1"><h2>✅ মহাকাশে শৈবালের সম্ভাবনা</h2><ul>${D.pos.map(x => `<li>${x}</li>`).join('')}</ul></div>
      <div class="glass col neg" id="cp2"><h2>⚠️ সীমাবদ্ধতা</h2><ul>${D.neg.map(x => `<li>${x}</li>`).join('')}</ul></div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button class="btn" data-b="-3">সম্ভাবনা</button><button class="btn" data-b="0">তুলনা</button><button class="btn" data-b="3">সীমাবদ্ধতা</button></div>`,
    play(el) {
      const set = v => { $('#beam', el).style.transform = `rotate(${-v}deg)`; $('#cp1', el).classList.toggle('dim', v > 0); $('#cp2', el).classList.toggle('dim', v < 0); $('#cp1', el).classList.toggle('hi', v < 0); $('#cp2', el).classList.toggle('hi', v > 0); };
      let v = -3; set(v); later(() => { v = -v; set(v); }, 2600);
      $$('[data-b]', el).forEach(b => b.onclick = () => { timers.forEach(clearInterval); timers = []; set(+b.dataset.b); });
    } },

  /* 10 — team */
  { t: 'দল', cls: 'light', html: () => `
    ${head('আমাদের দল', 'Our Team', 'অংশ ১০')}
    <div class="team">${D.team.map(m => `<div class="glass hov tm"><div class="avatar">${m[0][0]}</div><b>${m[0]}</b><small>${m[1]}</small></div>`).join('')}</div>` },

  /* 11 — closing */
  { t: 'সমাপ্তি', cls: 'center cover space', html: () => `
    <div class="dna">🌿🚀</div><h1>ছোট্ট শৈবাল, বিশাল সম্ভাবনা</h1>
    <h2>জীবনধারণ থেকে মহাকাশ গবেষণা—<br>শৈবাল হতে পারে ভবিষ্যতের গুরুত্বপূর্ণ সহযাত্রী।</h2>
    <div><button class="btn" data-go="13">🧠 কুইজ শুরু করুন →</button></div>` },

  /* 12 — quiz */
  { t: 'কুইজ', html: () => `${head('কুইজ', 'Test your knowledge', 'শেষ অংশ')}<div class="glass grow" id="qz"></div>`,
    init(el) {
      let q = 0, sc = 0; const box = $('#qz', el);
      const show = () => {
        if (q >= D.quiz.length) { box.innerHTML = `<div style="text-align:center"><div class="big">${sc >= 4 ? '🏆' : '🌱'}</div><h2>স্কোর: ${sc} / ${D.quiz.length}</h2><p>${sc === 5 ? 'চমৎকার!' : 'আবার চেষ্টা করুন!'}</p><button class="btn" id="rq">↻ আবার খেলুন</button></div>`; $('#rq', box).onclick = () => { q = 0; sc = 0; show(); }; return; }
        const [t, o, a] = D.quiz[q];
        box.innerHTML = `<div class="sub">প্রশ্ন ${q + 1} / ${D.quiz.length}</div><h2>${t}</h2>${o.map((x, i) => `<button class="opt" data-i="${i}">${'ABCD'[i]}. ${x}</button>`).join('')}<div id="fb"></div>`;
        $$('.opt', box).forEach(b => b.onclick = () => {
          const i = +b.dataset.i; if ($('.ok', box)) return;
          $$('.opt', box)[a].classList.add('ok'); if (i === a) sc++; else b.classList.add('no');
          $('#fb', box).innerHTML = `<p>${i === a ? '✅ সঠিক!' : '❌ সঠিক উত্তর: ' + o[a]}</p><button class="btn" id="nq">${q === 4 ? 'ফলাফল দেখুন' : 'পরের প্রশ্ন →'}</button>`;
          $('#nq', box).onclick = () => { q++; show(); };
        });
      }; show();
    } }
];

/* ---------- ENGINE ---------- */
const pb = document.createElement('div'); pb.id = 'presenter'; document.body.appendChild(pb);
const stage = $('#stage'); let cur = -1;
slides.forEach((s, i) => {
  const d = document.createElement('section'); d.className = 'slide ' + (s.cls || '').replace('cover', '').replace('center', '').trim(); d.dataset.i = i;
  d.innerHTML = `<div class="wrap ${s.cls || ''}">${s.html()}</div>`; stage.appendChild(d); s.el = d;
  const b = document.createElement('button'); b.title = s.t; b.setAttribute('aria-label', s.t); b.onclick = () => go(i); $('#timeline').appendChild(b);
});
function go(n) {
  n = Math.max(0, Math.min(slides.length - 1, n)); if (n === cur) return;
  slides.forEach((s, i) => { s.el.classList.toggle('active', i === n); s.el.classList.toggle('left', i < n); });
  $$('#timeline button').forEach((b, i) => b.classList.toggle('on', i === n));
  $('#counter').textContent = `${n + 1} / ${slides.length}`;
  $('#progress i').style.width = ((n + 1) / slides.length * 100) + '%';
  timers.forEach(clearInterval); timers = [];
  cur = n; const s = slides[n];
  const members = assignments[n] || [];
  pb.innerHTML = members.length ? members.map(i => `<span>উপস্থাপক: <b>${D.team[i][0]}</b> — ${D.team[i][1]}</span>`).join('') : '<span>শৈবাল — আমাদের দলের উপস্থাপনা</span>';
  if (s.init && !s.done) { s.init(s.el); s.done = true; }
  if (s.play) s.play(s.el);               /* (re)start this slide's animation every time it is shown */
  $('.wrap', s.el).scrollTop = 0; history.replaceState(null, '', '#' + (n + 1));
}
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (g) go(+g.dataset.go);
  const z = e.target.closest('img.zoom'); if (z) {
    const credit = photoCredits[z.dataset.credit];
    openModal(`<img src="${z.currentSrc || z.src}" alt="${z.alt}"><p class="zoomhint">${z.alt}</p>${credit ? `<p class="zoomhint">ছবির উৎস: <a href="${credit[1]}" target="_blank" rel="noopener noreferrer">${credit[0]}</a></p>` : ''}`);
  }
});
let modalTrigger = null;
function openModal(h) {
  modalTrigger = document.activeElement;
  $('#mbody').innerHTML = h;
  $('.mbox').setAttribute('aria-label', 'ছবি বড় করে দেখুন');
  $('#modal').hidden = false;
  $('#mclose').focus();
}
function closeModal() {
  $('#modal').hidden = true;
  $('#mbody').replaceChildren();
  if (modalTrigger instanceof HTMLElement) modalTrigger.focus({ preventScroll: true });
}
$('#mclose').onclick = closeModal; $('#modal').onclick = e => { if (e.target.id === 'modal') closeModal(); };
$('#prev').onclick = () => go(cur - 1); $('#next').onclick = () => go(cur + 1);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (!$('#modal').hidden) closeModal(); else $('#controls').classList.toggle('hide'); return; }
  if (!$('#modal').hidden) {
    if (e.key === 'Tab') {
      const focusable = $$('button, a[href]', $('.mbox'));
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }
    return;
  }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('img.zoom')) {
    e.preventDefault(); e.target.click(); return;
  }
  if (e.key === 'Enter' && e.target.matches('[data-go]')) { go(+e.target.dataset.go); return; }
  if (e.key === 'ArrowRight' || e.key === ' ' && !e.target.closest('button')) { e.preventDefault(); go(cur + 1); }
  else if (e.key === 'ArrowLeft') go(cur - 1);
  else if (e.key === 'Home') go(0); else if (e.key === 'End') go(slides.length - 1);
});
let tx = 0; stage.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
stage.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 90) go(cur + (d < 0 ? 1 : -1)); });

/* ---------- particles ---------- */
(function () {
  const c = $('#bg'), x = c.getContext('2d'); let W, H, P = [];
  const rs = () => { W = c.width = innerWidth; H = c.height = innerHeight; }; rs(); addEventListener('resize', rs);
  for (let i = 0; i < 40; i++) P.push({ x: Math.random(), y: Math.random(), r: 2 + Math.random() * 7, s: .0004 + Math.random() * .0012, h: Math.random() > .8 ? 270 : 150 + Math.random() * 40 });
  const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
  (function f() { x.clearRect(0, 0, W, H); P.forEach(p => { p.y -= still ? 0 : p.s; if (p.y < -.05) p.y = 1.05; x.beginPath(); x.arc(p.x * W, p.y * H, p.r, 0, 7); x.fillStyle = `hsla(${p.h},80%,65%,.13)`; x.fill(); x.strokeStyle = `hsla(${p.h},80%,75%,.3)`; x.stroke(); }); still || requestAnimationFrame(f); })();
})();

const start = parseInt(location.hash.slice(1)) - 1;
go(start >= 0 && start < slides.length ? start : 0);
