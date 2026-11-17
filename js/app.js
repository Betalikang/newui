/* 遗韵杨家埠 · 移动端文化学习体验 —— 路由 / 返回栈 / 事件委托 / 状态 */
(function () {
  'use strict';
  const S = window.SCREENS, META = window.META, ICON = window.ICONS;
  const $ = id => document.getElementById(id);
  const app = $('app'), toastEl = $('toast'), mask = $('loadingMask');

  const A = 'assets/';
  const COVERS = ['art_door.png', 'art_flower.png', 'art_main.png', 'art_village.png', 'art_kite.jpg'];
  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const TAB_HOME = { '览遗': 's01', '习艺': 's08', '游村': 's10', '会友': 's06' };
  const ORDER = ['s01','s02','s07','s13','s14','s15',
                 's08','s03','s09','s16','s17','s18',
                 's10','s04','s05','s19','s20','s21',
                 's06','s11','s22','s23','s24','s12'];
  const state = { current: 's01', stack: [], people: 1, date: '周六 · 上午', ver: 2, notes: '', booking: null };

  /* 状态栏（动态时间） */
  function statusBar() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    return `<div class="status"><span>${h}:${m}</span><span class="r">
      <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><path d="M1 11V8M5 11V5M9 11V2M13 11V5" stroke="#211C19" stroke-width="1.6" stroke-linecap="round"/></svg>
      <svg width="15" height="12" viewBox="0 0 15 12" fill="none"><path d="M1 4c3.5-3 9.5-3 13 0M3.5 7c2.2-1.8 5.8-1.8 8 0M6 10c1-0.8 2-0.8 3 0" stroke="#211C19" stroke-width="1.5" stroke-linecap="round"/></svg>
      <svg width="22" height="12" viewBox="0 0 24 12" fill="none"><rect x="1" y="2" width="19" height="8" rx="2" stroke="#211C19" stroke-width="1.5"/><rect x="3" y="4" width="13" height="4" rx="1" fill="#211C19"/><path d="M22 4v4" stroke="#211C19" stroke-width="2" stroke-linecap="round"/></svg>
      </span></div>`;
  }

  function renderSideNav() {
    const groups = [
      ['览遗', ['s01','s02','s07','s13','s14','s15']],
      ['习艺', ['s08','s03','s09','s16','s17','s18']],
      ['游村', ['s10','s04','s05','s19','s20','s21']],
      ['会友', ['s06','s11','s22','s23','s24','s12']],
    ];
    const icon = {
      '览遗': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v14H4z" stroke="currentColor" stroke-width="1.8"/></svg>',
      '习艺': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 20l4-1L19 8l-3-3L5 16l-1 4z" stroke="currentColor" stroke-width="1.8"/></svg>',
      '游村': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" stroke="currentColor" stroke-width="1.8"/></svg>',
      '会友': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" stroke-width="1.8"/></svg>',
    };
    let html = '';
    groups.forEach(([g, ids]) => {
      const on = META[state.current].tab === g;
      html += `<button class="snav-btn${on ? ' on' : ''}" data-action="tab" data-tab="${g}">
        <span class="ico">${icon[g]}</span><span>${g}</span><span class="cnt">${ids.length}</span></button>`;
    });
    $('sideNav').innerHTML = html;

    $('pageList').innerHTML = ORDER.map((id, i) =>
      `<button class="page-btn${id === state.current ? ' on' : ''}" data-nav="${id}">
        <b>${String(i + 1).padStart(2, '0')}</b><span>${META[id].name}</span></button>`).join('');
  }

  function renderInfo() {
    const m = META[state.current];
    $('crumbName').textContent = m.name;
    $('capText').textContent = m.cap;
  }

  function paint() {
    const id = state.current, m = META[id];
    app.innerHTML = statusBar() + `<div class="content screen-in">${S[id]()}</div>` + navBar(m.tab);
    renderSideNav();
    renderInfo();
    restoreState(id);
    app.scrollTop = 0;
    const c = app.querySelector('.content');
    if (c) c.scrollTop = 0;
  }

  function navBar(active) {
    let out = '<div class="nav">';
    const icon = window.NAV_ICON || {
      '览遗': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v14H4z" stroke="currentColor" stroke-width="1.8"/></svg>',
      '习艺': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 20l4-1L19 8l-3-3L5 16l-1 4z" stroke="currentColor" stroke-width="1.8"/></svg>',
      '游村': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" stroke="currentColor" stroke-width="1.8"/></svg>',
      '会友': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" stroke-width="1.8"/></svg>',
    };
    ['览遗', '习艺', '游村', '会友'].forEach(name => {
      out += `<button class="item${name === active ? ' on' : ''}" data-action="tab" data-tab="${name}">
        <div class="ic">${icon[name]}</div><div class="lb">${name}</div></button>`;
    });
    return out + '</div>';
  }

  function restoreState(id) {
    if (id === 's04') {
      $('phoneInput').classList.add('filled');
      $('phoneInput').value = '';
      $('phoneInput').placeholder = '请输入 11 位手机号';
      $('phoneErr').style.display = 'none';
      $('peopleNum').textContent = state.people + ' 人';
      const chips = app.querySelectorAll('[data-group="日期"] .chip');
      chips.forEach(c => c.classList.toggle('on', c.textContent === state.date));
    }
    if (id === 's03') updateVerUI();
    if (id === 's05') {
      const b = state.booking;
      $('fPeople').textContent = (b ? b.people : state.people) + ' 人';
      $('fDate').textContent = b ? b.slot : state.date;
      const t = $('bookTitle');
      if (t) t.innerHTML = ICON.check + (b ? ` 预约已记录 · 编号 ${esc(b.booking_no)}` : ' 预约已记录');
      const st = $('bookStatus');
      if (st) st.textContent = b ? '已记录到云端' : '待提交';
    }
    if (id === 's06') hydrateCommunity();
  }

  function go(id, push = true) {
    if (!S[id] || id === state.current) return;
    if (push) state.stack.push(state.current);
    state.current = id;
    paint();
  }

  function back() {
    if (!state.stack.length) { go('s01', false); return; }
    const prev = state.stack.pop();
    state.current = prev;
    paint();
  }

  let toastTimer = null;
  function toast(msg, ms = 2000) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
  }

  function loading(show, text) {
    if (text) mask.querySelector('.loading-txt').textContent = text;
    mask.classList.toggle('show', show);
  }

  function updateVerUI() {
    const names = ['朱红', '藤黄', '松绿', '靛紫'];
    const colors = ['#C1402E', '#E9A93C', '#2F6B58', '#5E4577'];
    const sub = $('verSub'), tag = $('verTag'), steps = $('verSteps');
    if (!sub || !steps) return;
    sub.textContent = `第 ${state.ver} / 4 版 · ${names[state.ver - 1]}`;
    tag.textContent = `当前版 · ${names[state.ver - 1]}`;
    [...steps.children].forEach((el, i) => {
      const n = i + 1;
      el.className = n === state.ver ? 'on' : '';
      if (n < state.ver) {
        el.style.background = colors[i]; el.style.color = '#fff';
        el.textContent = `${n} ${names[i]} 完成`;
      } else if (n === state.ver) {
        el.style.background = colors[i]; el.style.color = (i === 1) ? '#211C19' : '#fff';
        el.textContent = `${n} ${names[i]} 进行`;
      } else {
        el.style.background = '#E7DAC4'; el.style.color = '#6E655C';
        el.textContent = `${n} ${names[i]}`;
      }
    });
    $('btnNextVer').innerHTML = (state.ver === 4 ? '完成最后一版，查看成图 ' : '完成本版，进入下一版 ') + ICON.arrow;
  }

  /* ---------------- 云服务动作 ---------------- */

  async function submitBooking(phone) {
    if (!window.YYCloud || !YYCloud.isReady()) {
      toast((window.YYCloud && YYCloud.getError()) || '云服务未连接，预约未保存', 3200);
      return;
    }
    loading(true, '正在提交预约…');
    try {
      const row = await YYCloud.bookLesson({ slot: state.date, people: state.people, phone });
      state.booking = row;
      loading(false);
      go('s05');
      toast(`预约成功 · 编号 ${row.booking_no}`, 2600);
      refreshCloudState();
    } catch (e) {
      loading(false);
      state.booking = null;
      toast('预约失败：' + (e && e.message ? e.message : '请稍后重试'), 3600);
    }
  }

  async function submitWork() {
    const nameEl = $('workName'), noteEl = $('workNote');
    const title = ((nameEl && nameEl.value) || '').trim();
    if (!title) { toast('请先填写作品名称'); return; }
    if (!window.YYCloud || !YYCloud.isReady()) {
      toast((window.YYCloud && YYCloud.getError()) || '云服务未连接，作品未发布', 3200);
      return;
    }
    const chip = app.querySelector('[data-group="话题"] .chip.on');
    const topic = chip ? chip.textContent.trim() : '套色练习';
    loading(true, '正在发布作品…');
    try {
      await YYCloud.publishWork({
        title,
        note: (noteEl && noteEl.value) || '',
        topic,
        cover: 'art_flower.png',
        author: '手艺学习者'
      });
      loading(false);
      toast('作品已发布，已保存到云端', 2600);
      go('s06', false);
      refreshCloudState();
    } catch (e) {
      loading(false);
      toast('发布失败：' + (e && e.message ? e.message : '请稍后重试'), 3600);
    }
  }

  async function hydrateCommunity() {
    const grid = $('communityGrid');
    if (!grid || !window.YYCloud || !YYCloud.isReady()) return;
    try {
      const rows = await YYCloud.listWorks(2);
      if (!rows || !rows.length) return;
      grid.innerHTML = rows.map(r => {
        const cover = COVERS.indexOf(r.cover) >= 0 ? r.cover : 'art_flower.png';
        return `<div class="mini clickable" data-nav="s07"><img src="${A}${cover}" alt="${esc(r.title)}">
          <div class="b"><div class="n">${esc(r.title)}</div><div class="d">${esc(r.note || '作者没有留下注解')}</div></div></div>`;
      }).join('');
    } catch (e) {
      /* 读取失败时保留设计稿里的静态卡片，不打断浏览 */
    }
  }

  async function refreshCloudState() {
    const el = $('cloudState');
    if (!el) return;
    if (!window.YYCloud || !YYCloud.isReady()) {
      el.textContent = '云服务未连接';
      el.className = 'cloud-pill err';
      el.title = (window.YYCloud && YYCloud.getError()) || '云服务 SDK 未能加载';
      return;
    }
    try {
      const s = await YYCloud.stats();
      el.textContent = `云服务已连接 · 作品 ${s.works} · 预约 ${s.bookings}`;
      el.className = 'cloud-pill';
      el.title = '数据实时来自云数据库';
    } catch (e) {
      el.textContent = '云服务已连接 · 统计待刷新';
      el.className = 'cloud-pill warn';
    }
  }

  /* 事件委托 */
  document.addEventListener('click', e => {
    const navEl = e.target.closest('[data-nav]');
    if (navEl) { go(navEl.dataset.nav); return; }

    const act = e.target.closest('[data-action]');
    if (act) {
      switch (act.dataset.action) {
        case 'tab': {
          const t = act.dataset.tab, home = TAB_HOME[t];
          state.stack = [];
          go(home, false);
          break;
        }
        case 'minus':
          if (state.people > 1) { state.people--; $('peopleNum').textContent = state.people + ' 人'; }
          else toast('至少 1 人');
          break;
        case 'plus':
          if (state.people < 2) { state.people++; $('peopleNum').textContent = state.people + ' 人'; }
          else toast('每次预约最多 2 人');
          break;
        case 'submit-book': {
          const inp = $('phoneInput'), err = $('phoneErr');
          const v = (inp.value || '').replace(/\s/g, '');
          if (!/^\d{11}$/.test(v)) {
            inp.classList.remove('err'); void inp.offsetWidth; inp.classList.add('err');
            err.style.display = 'flex';
            toast('手机号需为 11 位数字');
            return;
          }
          err.style.display = 'none';
          submitBooking(v);
          break;
        }
        case 'next-ver':
          if (state.ver < 4) { state.ver++; updateVerUI(); toast('已落下一版，继续对齐十字线'); }
          else { state.ver = 2; go('s09'); toast('四版合印完成'); }
          break;
        case 'save-img':
          toast('作品已保存到本地');
          break;
        case 'more-works':
          toast('更多作品持续更新中');
          break;
        case 'craft':
          toast(`「${act.dataset.name}」工艺，等你亲手体验`);
          break;
        case 'clear-search':
          $('searchInput').value = '';
          applySearch('');
          break;
        case 'filter':
          toast('按题材筛选作品');
          break;
        case 'publish':
          submitWork();
          break;
        case 'back':
          back();
          break;
      }
      return;
    }

    /* chips 单选 */
    const chip = e.target.closest('.chip');
    if (chip) {
      const box = chip.closest('[data-group]');
      if (box) {
        box.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
        chip.classList.add('on');
        if (box.dataset.group === '日期') state.date = chip.textContent;
        if (box.dataset.group === '题材') applyFilter(chip.textContent);
        if (box.dataset.group === '话题') toast('已选择话题：' + chip.textContent);
      }
      return;
    }
  });

  document.addEventListener('input', e => {
    if (e.target.id === 'phoneInput') {
      const v = e.target.value.replace(/\s/g, '');
      e.target.classList.remove('err');
      if (/^\d{11}$/.test(v)) { e.target.classList.add('filled'); $('phoneErr').style.display = 'none'; }
      else { $('phoneErr').style.display = 'flex'; }
    }
    if (e.target.id === 'searchInput') applySearch(e.target.value.trim());
    if (e.target.id === 'workNote') $('noteCount').textContent = e.target.value.length + ' / 120';
  });

  function applySearch(q) {
    const grid = $('galleryGrid'), empty = $('emptyState'), cnt = $('resultCount');
    if (!grid) return;
    const map = { '门神': ['门神题材'], '花鸟': ['花卉吉祥'], '风筝': ['沙燕风筝'] };
    const kw = q.toLowerCase();
    const matched = !q || Object.values(map).flat().some(n => n.toLowerCase().includes(kw));
    grid.style.display = matched ? '' : 'none';
    empty.style.display = matched ? 'none' : '';
    cnt.textContent = matched ? '共 4 件作品' : '共 0 件作品';
  }

  function applyFilter(topic) {
    const grid = $('galleryGrid');
    if (!grid) return;
    const cards = grid.querySelectorAll('.mini');
    const map = { '全部': null, '门神': '门神', '花鸟': '花卉', '风筝': '风筝' };
    const key = map[topic];
    let shown = 0;
    cards.forEach(c => {
      const match = !key || c.textContent.includes(key);
      c.style.display = match ? '' : 'none';
      if (match) shown++;
    });
    $('resultCount').textContent = key ? `共 ${shown} 件作品` : '共 4 件作品';
    $('emptyState').style.display = 'none';
    grid.style.display = '';
    const inp = $('searchInput'); if (inp) inp.value = '';
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { state.stack = []; go('s01', false); }
    if (e.key === 'ArrowLeft') back();
  });
  $('btnRestart').addEventListener('click', () => { state.stack = []; state.ver = 2; state.people = 1; go('s01', false); toast('已回到首页'); });

  /* 自适应缩放：窗口过窄或过矮时整体缩小，保证整机（含底部导航栏）完整可见 */
  function fitDevice() {
    const wrap = document.querySelector('.device-wrap');
    if (!wrap) return;
    const availH = wrap.clientHeight - 44;   // 预留手机下方的说明文字
    const availW = wrap.clientWidth - 32;
    let s = Math.min(1, availH / 868, availW / 414);
    s = Math.max(0.4, s);
    document.documentElement.style.setProperty('--dev-scale', s.toFixed(3));
  }
  window.addEventListener('resize', fitDevice);
  window.addEventListener('orientationchange', fitDevice);
  window.addEventListener('load', fitDevice);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitDevice).catch(() => {});

  // 暴露导航图标供渲染
  window.NAV_ICON = {
    '览遗': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v14H4z" stroke="currentColor" stroke-width="1.8"/><path d="M8 5v14M12 5v14M16 5v14" stroke="currentColor" stroke-width="1.4"/></svg>',
    '习艺': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 6l3 3" stroke="currentColor" stroke-width="1.8"/></svg>',
    '游村': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="1.4"/></svg>',
    '会友': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="9" r="2.4" stroke="currentColor" stroke-width="1.6"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M15 15c3 0 6 1.6 6 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  };

  paint();
  fitDevice();
  refreshCloudState();
})();
