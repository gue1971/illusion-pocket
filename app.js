const categories = ["すべて", "錯視", "運動", "明暗・色", "錯聴", "錯触", "多感覚"];

const illusions = [
  {
    title: "ミュラーリヤー錯視",
    category: "錯視",
    lead: "同じ長さの線でも、両端の羽根の向きだけで片方が長く見えます。",
    hint: "中央の2本は同じ長さです。端の矢羽根だけに注目して見比べてください。",
    visual: "muller",
  },
  {
    title: "ポンゾ錯視",
    category: "錯視",
    lead: "遠近を示す線に挟まれると、同じ長さの横線が違う長さに感じられます。",
    hint: "上下の黄色い線は同じ長さです。",
    visual: "ponzo",
  },
  {
    title: "エビングハウス錯視",
    category: "錯視",
    lead: "周囲の円の大きさによって、中央の円の大きさの見えが変わります。",
    hint: "左右の赤い円は同じ大きさです。",
    visual: "ebbinghaus",
  },
  {
    title: "カフェウォール錯視",
    category: "錯視",
    lead: "白黒タイルを少しずらすだけで、水平な線が傾いて見えます。",
    hint: "灰色の横線はすべて平行です。",
    visual: "cafewall",
  },
  {
    title: "カニッツァの三角形",
    category: "錯視",
    lead: "輪郭線が描かれていないのに、白い三角形が浮かんで見えます。",
    hint: "存在しない辺を、脳が補って見ています。",
    visual: "kanizsa",
  },
  {
    title: "チェッカーシャドー",
    category: "明暗・色",
    lead: "影の中の明るいマスと、影の外の暗いマスが同じ明るさに見えにくくなります。",
    hint: "AとBのマスは同じ灰色になるよう作っています。",
    visual: "checker",
  },
  {
    title: "同時対比",
    category: "明暗・色",
    lead: "同じ灰色でも、周囲が暗いか明るいかで明るさが違って見えます。",
    hint: "中央の小さな四角は左右で同じ色です。",
    visual: "contrast",
  },
  {
    title: "ライラックチェイサー",
    category: "運動",
    lead: "点滅する円を見続けると、消えた場所に緑の点が走るように見えます。",
    hint: "中央の印を見つめて、周辺の円を直接追わないでください。",
    visual: "lilac",
  },
  {
    title: "運動残効",
    category: "運動",
    lead: "動く模様を見たあと静止画を見ると、反対方向に動いて感じられることがあります。",
    hint: "中央を10秒ほど見続けてから、下の静止グリッドを見ると効果が出やすくなります。",
    visual: "aftereffect",
  },
  {
    title: "呼吸する四角形",
    category: "運動",
    lead: "周囲の動きに引っ張られて、静かな四角形が膨らんだり縮んだりするように見えます。",
    hint: "中央の四角形の辺は動いていません。",
    visual: "breathing",
  },
  {
    title: "フレイザーの渦巻き",
    category: "錯視",
    lead: "実際には同心円なのに、斜めの短い線が渦巻きの印象を作ります。",
    hint: "円周を指でなぞると、閉じた円であることがわかります。",
    visual: "fraser",
  },
  {
    title: "無限音階",
    category: "錯聴",
    lead: "音がずっと上がり続けているように聞こえる、循環する高さの錯覚です。",
    hint: "再生ボタンを押すと、上昇し続けるような合成音を鳴らします。",
    visual: "audioScale",
    audio: "scale",
  },
  {
    title: "ミッシング・ファンダメンタル",
    category: "錯聴",
    lead: "低い基音が実際には無くても、倍音の関係から低い高さを感じることがあります。",
    hint: "再生時、複数の高い音だけで低いまとまりを作ります。",
    visual: "audioFundamental",
    audio: "fundamental",
  },
  {
    title: "皮膚兎",
    category: "錯触",
    lead: "離れた場所を順に刺激されると、皮膚の上を点が跳ねて移動したように感じます。",
    hint: "スマホでは図解として、刺激点が腕の上を跳ぶ様子を見せています。",
    visual: "cutaneous",
  },
  {
    title: "大きさ-重さの錯覚",
    category: "錯触",
    lead: "同じ重さでも、小さい物体のほうが重く感じられることがあります。",
    hint: "見た目から予測した重さと実際の差が、重さの印象を変えます。",
    visual: "sizeWeight",
  },
  {
    title: "ラバーハンド錯覚",
    category: "多感覚",
    lead: "見えている手と自分の手が同時に刺激されると、見えている手を自分の手のように感じます。",
    hint: "視覚と触覚のタイミングが身体感覚を組み替えます。",
    visual: "rubberHand",
  },
  {
    title: "ダブルフラッシュ錯覚",
    category: "多感覚",
    lead: "1回の光でも、短い音が2回鳴ると光も2回見えたように感じることがあります。",
    hint: "中央の光と周囲の音パルスの関係を図解しています。",
    visual: "doubleFlash",
  },
];

const state = {
  category: "すべて",
  query: "",
  current: 0,
};

const stage = document.querySelector("#stage");
const title = document.querySelector("#illusionTitle");
const lead = document.querySelector("#illusionLead");
const hint = document.querySelector("#illusionHint");
const categoryLabel = document.querySelector("#categoryLabel");
const counterLabel = document.querySelector("#counterLabel");
const resultCount = document.querySelector("#resultCount");
const list = document.querySelector("#illusionList");
const filters = document.querySelector("#filters");
const searchInput = document.querySelector("#searchInput");
const shuffleButton = document.querySelector("#shuffleButton");

function svg(content, viewBox = "0 0 360 260") {
  return `<svg viewBox="${viewBox}" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}

function visual(name, compact = false) {
  const scale = compact ? 0.72 : 1;
  const map = {
    muller: svg(`
      <rect width="360" height="260" fill="#fff8ee"/>
      <g stroke="#17212b" stroke-width="7" stroke-linecap="round" fill="none" opacity=".92">
        <path d="M70 76l42 28M70 76l42-28M290 76l-42 28M290 76l-42-28"/>
        <path d="M70 184l-42 28M70 184l-42-28M290 184l42 28M290 184l42-28"/>
      </g>
      <g stroke="#d9273f" stroke-width="10" stroke-linecap="round" fill="none">
        <path d="M70 76h220"/>
        <path d="M70 184h220"/>
      </g>
      <g stroke="#d9273f" stroke-width="2" opacity=".28"><path d="M70 58v36M290 58v36M70 166v36M290 166v36"/></g>`),
    ponzo: svg(`
      <rect width="360" height="260" fill="#14202b"/>
      <g stroke="#e9eef0" stroke-width="5" stroke-linecap="round" opacity=".9">
        <path d="M54 250L148 8"/><path d="M306 250L212 8"/>
      </g>
      <g stroke="#8b99a6" stroke-width="4" opacity=".78">
        ${Array.from({ length: 11 }, (_, i) => {
          const y = 238 - i * 21;
          const inset = 18 + i * 12;
          return `<path d="M${inset} ${y}H${360 - inset}"/>`;
        }).join("")}
      </g>
      <g stroke="#ffcf3f" stroke-width="12" stroke-linecap="round"><path d="M112 78h136"/><path d="M112 178h136"/></g>
      <g stroke="#ffcf3f" stroke-width="2" opacity=".35"><path d="M112 64v28M248 64v28M112 164v28M248 164v28"/></g>`),
    ebbinghaus: svg(`
      <rect width="360" height="260" fill="#f6fbff"/>
      <g fill="#2e78c7" opacity=".96">${circleRing(104, 132, 68, 25, 7)}${circleRing(256, 132, 42, 9, 11)}</g>
      <circle cx="104" cy="132" r="24" fill="#dd3f5a"/><circle cx="256" cy="132" r="24" fill="#dd3f5a"/>
      <g fill="none" stroke="#17212b" stroke-width="2" opacity=".16"><circle cx="104" cy="132" r="24"/><circle cx="256" cy="132" r="24"/></g>`),
    cafewall: svg(`
      <rect width="360" height="260" fill="#6f7477"/>
      ${Array.from({ length: 9 }, (_, r) => {
        const offset = r % 2 ? 28 : -8;
        return `<g transform="translate(${offset} ${18 + r * 27})">${Array.from({ length: 8 }, (_, c) => `<rect x="${c * 54}" y="0" width="44" height="21" fill="${c % 2 ? "#111" : "#f8f5ec"}"/>`).join("")}</g><rect x="0" y="${42 + r * 27}" width="360" height="5" fill="#9b9b9b"/>`;
      }).join("")}`),
    kanizsa: svg(`
      <rect width="360" height="260" fill="#ddd7cb"/>
      <polygon points="180,58 88,206 272,206" fill="#ffffff" opacity=".98"/>
      <g fill="#151d25">
        <circle cx="180" cy="58" r="38"/><circle cx="88" cy="206" r="38"/><circle cx="272" cy="206" r="38"/>
      </g>
      <g fill="#151d25">
        <path d="M180 20a38 38 0 0 0 0 76V58h-38a38 38 0 0 0 38-38z"/>
        <path d="M55 225a38 38 0 0 0 66-38l-33 19 19 33a38 38 0 0 0-52-14z"/>
        <path d="M305 225a38 38 0 0 1-66-38l33 19-19 33a38 38 0 0 1 52-14z"/>
      </g>`),
    checker: svg(`
      <rect width="360" height="260" fill="#d7d7d7"/>
      <g transform="translate(54 22)">${Array.from({ length: 8 }, (_, y) => Array.from({ length: 8 }, (_, x) => `<rect x="${x * 32}" y="${y * 26}" width="32" height="26" fill="${(x + y) % 2 ? "#6a6a6a" : "#b9b9b9"}"/>`).join("")).join("")}</g>
      <ellipse cx="212" cy="126" rx="112" ry="66" fill="rgba(22,32,42,.38)" transform="rotate(-18 212 126)"/>
      <rect x="102" y="86" width="32" height="26" fill="#878787"/><rect x="226" y="138" width="32" height="26" fill="#878787"/>
      <g font-size="18" font-weight="800" fill="#111"><text x="80" y="105">A</text><text x="263" y="157">B</text></g>
      <path d="M134 99C170 91 202 118 226 151" stroke="#ffcf3f" stroke-width="3" fill="none" opacity=".55"/>`),
    contrast: svg(`
      <rect width="360" height="260" fill="#8d8d8d"/>
      <rect x="0" y="0" width="180" height="260" fill="#111820"/><rect x="180" y="0" width="180" height="260" fill="#eef1f2"/>
      <g opacity=".18">${Array.from({ length: 8 }, (_, i) => `<rect x="${i * 24}" y="0" width="12" height="260" fill="#fff"/><rect x="${184 + i * 24}" y="0" width="12" height="260" fill="#000"/>`).join("")}</g>
      <rect x="70" y="88" width="82" height="84" fill="#888"/><rect x="208" y="88" width="82" height="84" fill="#888"/>`),
    lilac: svg(`
      <defs><filter id="softLilac"><feGaussianBlur stdDeviation="3.2"/></filter></defs>
      <rect width="360" height="260" fill="#f7f7f1"/>
      <g transform="translate(180 130)">${Array.from({ length: 12 }, (_, i) => `<circle class="blink-dot" style="animation-delay:${i * -0.18}s" cx="${Math.cos((i / 12) * Math.PI * 2) * 86}" cy="${Math.sin((i / 12) * Math.PI * 2) * 86}" r="17" fill="#d785d1" filter="url(#softLilac)"/>`).join("")}<circle r="5" fill="#111"/></g>
      <style>.blink-dot{animation:blink 2.15s steps(1) infinite}@keyframes blink{0%,11%{opacity:0}12%,100%{opacity:.78}}</style>`),
    aftereffect: svg(`
      <rect width="360" height="260" fill="#111820"/>
      <g transform="translate(180 102)"><circle r="73" fill="#f6f2e8"/><g class="spin-lines">${Array.from({ length: 34 }, (_, i) => `<rect x="-2" y="-69" width="4" height="138" fill="${i % 2 ? "#111820" : "#f6f2e8"}" transform="rotate(${i * 10.6}) translate(22 0)"/>`).join("")}</g><circle r="5" fill="#dd3f5a"/></g>
      <g transform="translate(180 207)" stroke="#e8edf0" stroke-width="2" opacity=".75">${Array.from({ length: 10 }, (_, i) => `<path d="M-86 ${-36 + i * 8}H86"/><path d="M${-80 + i * 16} -42V42"/>`).join("")}</g>
      <style>.spin-lines{transform-origin:0 0;animation:spin 1.2s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}</style>`),
    breathing: svg(`
      <rect width="360" height="260" fill="#faf5ea"/>
      <g transform="translate(180 130)">${Array.from({ length: 4 }, (_, r) => `<rect class="breath-ring" x="${-42 - r * 28}" y="${-42 - r * 28}" width="${84 + r * 56}" height="${84 + r * 56}" fill="none" stroke="${r % 2 ? "#dd3f5a" : "#0b8f86"}" stroke-width="7" opacity="${0.82 - r * 0.13}" transform="rotate(${r * 10})"/>`).join("")}</g>
      <rect x="138" y="88" width="84" height="84" fill="#faf5ea" stroke="#17212b" stroke-width="8"/>
      <style>.breath-ring{transform-origin:180px 130px;animation:breathe 2.2s ease-in-out infinite}.breath-ring:nth-of-type(2){animation-delay:.18s}.breath-ring:nth-of-type(3){animation-delay:.34s}.breath-ring:nth-of-type(4){animation-delay:.48s}@keyframes breathe{50%{transform:scale(.82) rotate(18deg)}}</style>`),
    fraser: svg(`
      <rect width="360" height="260" fill="#f6f4ec"/>
      <g transform="translate(180 130)">${Array.from({ length: 7 }, (_, r) => {
        const rad = 30 + r * 13;
        return `<circle r="${rad}" fill="none" stroke="#17212b" stroke-width="2" opacity=".55"/>${Array.from({ length: 28 }, (_, i) => {
          const a = (i / 28) * Math.PI * 2;
          const x = Math.cos(a) * rad;
          const y = Math.sin(a) * rad;
          return `<rect x="${x - 8}" y="${y - 3}" width="16" height="6" fill="${i % 2 ? "#dd3f5a" : "#0b8f86"}" transform="rotate(${(a * 180) / Math.PI + 28} ${x} ${y})"/>`;
        }).join("")}`;
      }).join("")}</g>`),
    audioScale: audioScene("上がり続ける音", compact),
    audioFundamental: audioScene("ない低音を感じる", compact),
    cutaneous: svg(`
      <rect width="360" height="260" fill="#fff4ec"/>
      <path d="M61 146c62-36 174-34 238 4" stroke="#c87757" stroke-width="54" stroke-linecap="round" fill="none"/>
      ${[96, 154, 214, 272].map((x, i) => `<circle class="hop" style="animation-delay:${i * .28}s" cx="${x}" cy="${126 + (i % 2) * 9}" r="13" fill="#dd3f5a"/>`).join("")}
      <style>.hop{animation:hop 1.25s ease-in-out infinite}@keyframes hop{50%{transform:translateY(-18px);opacity:.45}}</style>`),
    sizeWeight: svg(`
      <rect width="360" height="260" fill="#eef7f6"/>
      <line x1="70" y1="194" x2="290" y2="194" stroke="#17212b" stroke-width="8"/><line x1="180" y1="55" x2="180" y2="206" stroke="#17212b" stroke-width="8"/>
      <circle cx="105" cy="155" r="24" fill="#dd3f5a"/><circle cx="255" cy="127" r="58" fill="#0b8f86"/><text x="82" y="224" font-size="18" font-weight="800">同じ重さ</text><text x="220" y="224" font-size="18" font-weight="800">同じ重さ</text>`),
    rubberHand: svg(`
      <rect width="360" height="260" fill="#f5f1e9"/>
      <path d="M70 153c30-42 76-46 112-7l24 26c21 23 58 15 70-14" stroke="#c88665" stroke-width="38" stroke-linecap="round" fill="none"/>
      <path d="M62 95c64 5 111 22 141 59" stroke="#17212b" stroke-width="5" stroke-dasharray="8 9" fill="none"/>
      <path class="brush" d="M60 75l28 28" stroke="#dd3f5a" stroke-width="10" stroke-linecap="round"/><style>.brush{animation:brush 1.6s ease-in-out infinite}@keyframes brush{50%{transform:translate(115px,52px) rotate(16deg)}}</style>`),
    doubleFlash: svg(`
      <rect width="360" height="260" fill="#121820"/>
      <circle class="flash" cx="180" cy="100" r="42" fill="#fff1a3"/>
      <g fill="#dd3f5a"><circle cx="119" cy="178" r="18"/><circle cx="241" cy="178" r="18"/></g>
      <g stroke="#fff" stroke-width="5" fill="none" opacity=".8"><path class="sound" d="M103 178c-24-21-24-55 0-76"/><path class="sound" d="M257 178c24-21 24-55 0-76"/></g>
      <style>.flash{animation:flash 1.35s steps(1) infinite}.sound{animation:sound 1.35s ease-in-out infinite}@keyframes flash{0%,18%{opacity:1}19%,100%{opacity:.2}}@keyframes sound{50%{opacity:.15;transform:scale(1.2)}}</style>`),
  };
  return map[name] || map.muller;
}

function circleRing(cx, cy, radius, dot, count) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return `<circle cx="${cx + Math.cos(a) * radius}" cy="${cy + Math.sin(a) * radius}" r="${dot}"/>`;
  }).join("");
}

function audioScene(label, compact = false) {
  return `<div class="audio-panel"><div class="audio-waves">${Array.from({ length: compact ? 8 : 12 }, () => "<i></i>").join("")}</div>${compact ? "" : `<button class="play-button" type="button" data-play>${label}</button>`}</div>`;
}

function filteredIllusions() {
  return illusions.filter((item) => {
    const byCategory = state.category === "すべて" || item.category === state.category;
    const byQuery = !state.query || item.title.includes(state.query) || item.lead.includes(state.query);
    return byCategory && byQuery;
  });
}

function renderFilters() {
  filters.innerHTML = categories.map((cat) => `<button class="filter-button ${cat === state.category ? "active" : ""}" type="button" data-category="${cat}">${cat}</button>`).join("");
}

function renderList(items) {
  list.innerHTML = items.map((item, index) => `
    <button class="list-card ${index === state.current ? "active" : ""}" type="button" data-index="${index}">
      <span class="thumb">${visual(item.visual, true)}</span>
      <strong>${item.title}</strong>
      <span>${item.category}</span>
    </button>`).join("");
  resultCount.textContent = `${items.length}件`;
}

function renderViewer() {
  const items = filteredIllusions();
  if (state.current >= items.length) state.current = 0;
  const item = items[state.current];
  if (!item) {
    stage.innerHTML = "";
    title.textContent = "見つかりません";
    lead.textContent = "検索条件を変えてください。";
    hint.textContent = "";
    categoryLabel.textContent = "";
    counterLabel.textContent = "0 / 0";
    renderList(items);
    return;
  }
  stage.innerHTML = visual(item.visual);
  title.textContent = item.title;
  lead.textContent = item.lead;
  hint.textContent = item.hint;
  categoryLabel.textContent = item.category;
  counterLabel.textContent = `${state.current + 1} / ${items.length}`;
  renderList(items);
}

function render() {
  renderFilters();
  renderViewer();
}

function playAudio(kind) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.16, now + 0.04);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
  master.connect(ctx.destination);

  if (kind === "fundamental") {
    [440, 660, 880, 1100].forEach((freq) => addTone(ctx, master, freq, now, 2.2));
  } else {
    for (let i = 0; i < 24; i += 1) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + i * 0.085;
      const freq = 220 * Math.pow(2, (i % 12) / 12);
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.05, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);
      osc.connect(gain).connect(master);
      osc.start(start);
      osc.stop(start + 0.18);
    }
  }
}

function addTone(ctx, destination, freq, start, duration) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.07, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain).connect(destination);
  osc.start(start);
  osc.stop(start + duration);
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  state.current = 0;
  render();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-index]");
  if (!button) return;
  state.current = Number(button.dataset.index);
  renderViewer();
});

stage.addEventListener("click", (event) => {
  if (!event.target.closest("[data-play]")) return;
  const item = filteredIllusions()[state.current];
  if (item?.audio) playAudio(item.audio);
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  state.current = 0;
  renderViewer();
});

shuffleButton.addEventListener("click", () => {
  const items = filteredIllusions();
  if (items.length < 2) return;
  let next = state.current;
  while (next === state.current) next = Math.floor(Math.random() * items.length);
  state.current = next;
  renderViewer();
});

render();
