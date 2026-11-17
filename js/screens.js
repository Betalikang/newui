/* 12 屏模板 —— 移植自 build_screens.py，保留文案与视觉，加入交互钩子。
   导航：data-nav="页面id"；动作：data-action="动作名" */
(function (global) {
  'use strict';
  const A = 'assets/';
  const ICON = {
    back: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#211C19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#8C8478" stroke-width="2"/><path d="M16.5 16.5L21 21" stroke="#8C8478" stroke-width="2" stroke-linecap="round"/></svg>',
    check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    alert: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 8v5M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  };
  const NAV_ICON = {
    '览遗': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v14H4z" stroke="currentColor" stroke-width="1.8"/><path d="M8 5v14M12 5v14M16 5v14" stroke="currentColor" stroke-width="1.4"/></svg>',
    '习艺': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 6l3 3" stroke="currentColor" stroke-width="1.8"/></svg>',
    '游村': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 4v14M15 6v14" stroke="currentColor" stroke-width="1.4"/></svg>',
    '会友': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="9" r="2.4" stroke="currentColor" stroke-width="1.6"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M15 15c3 0 6 1.6 6 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  };

  function nav(active) {
    let out = '<div class="nav">';
    ['览遗', '习艺', '游村', '会友'].forEach(name => {
      const on = name === active ? ' on' : '';
      out += `<button class="item${on}" data-action="tab" data-tab="${name}"><div class="ic">${NAV_ICON[name]}</div><div class="lb">${name}</div></button>`;
    });
    return out + '</div>';
  }

  const S = {};

  /* 01 每日遗珍 */
  S.s01 = () => `
    <div class="hdr">
      <div class="kicker">今日画版 · 一版一色</div>
      <h1 class="serif">遗韵杨家埠</h1>
      <div class="sub">把年画与风筝，读成一堂活态课</div>
      <div class="bar"></div>
    </div>
    <div class="hero" style="height:246px">
      <img src="${A}art_main.png" alt="今日画版">
      <div class="hero-tag">今日画版</div>
      <div class="hero-cap"><div class="t">一版一色，印出杨家埠</div>
        <div class="d">从木版年画到沙燕风筝的手艺故事</div></div>
    </div>
    <button class="btn btn-primary" data-nav="s02">进入年画图库 ${ICON.arrow}</button>
    <div class="two">
      <div class="mini clickable" data-nav="s08">
        <div style="height:76px;background:#E9A93C;display:flex;align-items:center;justify-content:center">
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" stroke="#211C19" stroke-width="1.5" stroke-linejoin="round"/></svg>
        </div>
        <div class="b"><div class="n">习艺 · 套色</div><div class="d">亲手试一次套印</div></div>
      </div>
      <div class="mini clickable" data-nav="s10">
        <div style="height:76px;background:#2F6B58;display:flex;align-items:center;justify-content:center">
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.6-7-10a7 7 0 0114 0c0 5.4-7 10-7 10z" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="11" r="2.5" stroke="#fff" stroke-width="1.5"/></svg>
        </div>
        <div class="b"><div class="n">游村 · 行前</div><div class="d">了解在地体验</div></div>
      </div>
    </div>
    <div class="foot">杨家埠木版年画 · 一版一色</div>`;

  /* 02 年画图库 */
  S.s02 = () => `
    <div class="hdr">
      <h1 class="serif">年画图库</h1>
      <div class="sub">按题材，慢慢看一纸年画</div>
      <div class="bar"></div>
    </div>
    <label class="input">${ICON.search}<input id="searchInput" type="text" placeholder="搜索题材、工艺或纹样" style="border:0;outline:0;background:transparent;margin-left:8px;font:inherit;font-size:14px;width:100%;color:#211C19"></label>
    <div class="row">
      <div class="chips" data-group="题材">
        <span class="chip on">全部</span><span class="chip">门神</span>
        <span class="chip">花鸟</span><span class="chip">风筝</span>
      </div>
    </div>
    <div class="row" style="font-size:12px;color:#6E655C"><span id="resultCount">共 4 件作品</span><span class="more" data-action="filter">筛选 ▾</span></div>
    <div id="galleryGrid">
      <div class="two">
        <div class="mini clickable" data-nav="s07"><img src="${A}art_door.png" alt="门神题材">
          <div class="b"><span class="tag tag-red">门神</span>
            <div class="n" style="margin-top:8px">门神题材</div><div class="d">守护与祝愿 · 门神题材</div></div></div>
        <div class="mini clickable" data-nav="s07"><img src="${A}art_flower.png" alt="花卉吉祥">
          <div class="b"><span class="tag tag-purple">花卉</span>
            <div class="n" style="margin-top:8px">花卉吉祥</div><div class="d">花开富贵 · 花卉吉祥</div></div></div>
      </div>
      <div class="two" style="margin-top:12px">
        <div class="mini clickable" data-nav="s07"><img src="${A}art_main.png" alt="沙燕风筝">
          <div class="b"><span class="tag tag-gold">风筝</span>
            <div class="n" style="margin-top:8px">沙燕风筝</div><div class="d">竹骨与春光 · 沙燕风筝</div></div></div>
        <div class="mini clickable" data-nav="s10"><img src="${A}art_village.png" alt="村落手艺">
          <div class="b"><span class="tag tag-green">村落</span>
            <div class="n" style="margin-top:8px">村落手艺</div><div class="d">过年画村 · 村落手艺</div></div></div>
      </div>
    </div>
    <div id="emptyState" style="display:none">
      <div class="card card-pad" style="text-align:center;padding:28px 16px">
        <div style="width:64px;height:64px;border-radius:32px;background:#F0E7D6;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
          ${ICON.search}</div>
        <div class="serif" style="font-size:16px;font-weight:700">没有找到相关题材</div>
        <div style="font-size:12px;color:#6E655C;line-height:18px;margin:8px 0 16px">换个关键词试试，或看看全部作品</div>
        <button class="btn btn-ghost" data-action="clear-search" style="height:42px;font-size:13px">查看全部</button>
      </div>
    </div>`;

  /* 03 套色操作 */
  S.s03 = () => `
    <div class="hdr">
      <div class="hdr-row"><button class="back" data-nav="s08">${ICON.back}</button>
        <div><h1 class="serif" style="font-size:26px;line-height:36px">套色操作</h1>
          <div class="sub" id="verSub">第 2 / 4 版 · 藤黄</div></div></div>
      <div class="bar"></div>
    </div>
    <div class="hero" style="height:210px">
      <img src="${A}art_flower.png" alt="当前套色版">
      <div class="hero-tag" id="verTag">当前版 · 藤黄</div>
    </div>
    <div class="card card-pad">
      <div class="row" style="margin-bottom:12px"><span class="sec-title" style="font-size:16px">套色版次</span>
        <span style="font-size:12px;color:#6E655C">4 色版</span></div>
      <div class="four" id="verSteps">
        <div style="background:#C1402E;color:#fff">1 朱红 完成</div>
        <div class="on" style="background:#E9A93C;color:#211C19">2 藤黄 进行</div>
        <div style="background:#E7DAC4;color:#6E655C">3 松绿</div>
        <div style="background:#E7DAC4;color:#6E655C">4 靛紫</div>
      </div>
    </div>
    <div class="row" style="font-size:13px;color:#4A443E"><span>对齐套版十字线，再落下一版</span></div>
    <button class="btn btn-primary" id="btnNextVer" data-action="next-ver">完成本版，进入下一版 ${ICON.arrow}</button>
    <div class="foot">套色工艺 · 四版依次叠印</div>`;

  /* 04 课程预约 */
  S.s04 = () => `
    <div class="hdr">
      <div class="hdr-row"><button class="back" data-nav="s10">${ICON.back}</button>
        <h1 class="serif" style="font-size:26px;line-height:36px">课程预约</h1></div>
      <div class="sub">选一个适合的时间，来动手做一次</div>
      <div class="bar"></div>
    </div>
    <div class="card" style="padding:16px;background:#211C19">
      <div style="font-size:12px;color:#E9A93C;font-weight:600">体验课堂 · 套色入门</div>
      <div class="serif" style="font-size:18px;color:#fff;font-weight:700;margin-top:4px;line-height:26px">从画样到套印的一堂课</div>
      <div style="font-size:12px;color:#B8ADA0;margin-top:6px;display:flex;align-items:center;gap:6px">${ICON.clock} 时长约 60 分钟 · 每场 12 人</div>
    </div>
    <div class="field">
      <div class="label">选择日期</div>
      <div class="chips" data-group="日期">
        <span class="chip on">周六 · 上午</span><span class="chip">周六 · 下午</span>
        <span class="chip">周日 · 上午</span><span class="chip">周日 · 下午</span>
      </div>
    </div>
    <div class="field">
      <div class="label">参加人数 <span style="font-weight:400;color:#6E655C;font-size:12px">上限 2 人</span></div>
      <div class="stepper"><button class="cir minus" data-action="minus">−</button><span class="num" id="peopleNum">1 人</span><button class="cir" data-action="plus">+</button></div>
    </div>
    <div class="field">
      <div class="label">联系方式</div>
      <input id="phoneInput" class="input" type="tel" maxlength="11" placeholder="请输入 11 位手机号" value="138 0000">
      <div class="errtxt" id="phoneErr">${ICON.alert} 手机号需为 11 位数字，请检查后重试</div>
    </div>
    <button class="btn btn-primary" data-action="submit-book">提交预约 ${ICON.arrow}</button>`;

  /* 05 预约反馈 */
  S.s05 = () => `
    <div class="hdr">
      <div class="kicker">预约已提交</div>
      <h1 class="serif" style="font-size:28px;line-height:38px">预约反馈</h1>
      <div class="sub">这是一次模拟提交，不是有效预约凭证</div>
      <div class="bar"></div>
    </div>
    <div class="result">
      <div class="t">${ICON.check} 已走完提交步骤</div>
      <div class="d">我们已收到你的预约，请留意确认消息</div>
    </div>
    <div class="info">
      <div class="h">本次操作信息</div>
      <div class="r"><span class="k">体验内容</span><span class="v">套色入门</span></div>
      <div class="r"><span class="k">所选时段</span><span class="v" id="fDate">周六 · 上午</span></div>
      <div class="r"><span class="k">参加人数</span><span class="v" id="fPeople">1 人</span></div>
      <div class="r"><span class="k">预约状态</span><span class="v" style="color:#2F6B58">仅供界面展示</span></div>
    </div>
    <div>
      <div class="sec-title" style="font-size:18px;margin-bottom:12px">接下来可以做什么</div>
      <div class="two" style="margin-bottom:12px">
        <button class="btn btn-ghost" style="height:64px;flex-direction:column;gap:4px" data-nav="s06">
          <span style="font-size:14px">去看看作品广场</span>
          <span style="font-size:11px;font-weight:400;color:#6E655C">读别人的文化注解</span></button>
        <button class="btn btn-ghost" style="height:64px;flex-direction:column;gap:4px" data-nav="s10">
          <span style="font-size:14px">继续看村落导览</span>
          <span style="font-size:11px;font-weight:400;color:#6E655C">了解行前信息</span></button>
      </div>
      <button class="btn btn-primary" data-nav="s10">返回游村导览 ${ICON.arrow}</button>
    </div>`;

  /* 06 作品广场 */
  S.s06 = () => `
    <div class="hdr">
      <h1 class="serif">作品广场</h1>
      <div class="sub">分享作品，也留下你的文化注解</div>
      <div class="bar"></div>
    </div>
    <div class="card clickable" data-nav="s07">
      <div style="height:150px;position:relative;overflow:hidden">
        <img src="${A}art_main.png" style="width:100%;height:100%;object-fit:cover;display:block" alt="作品">
        <span class="tag tag-red" style="position:absolute;top:12px;left:12px">套色练习</span>
      </div>
      <div class="card-pad">
        <div class="serif" style="font-size:18px;font-weight:700;line-height:26px">一只沙燕，也是一张版画</div>
        <div style="font-size:13px;line-height:20px;color:#6E655C;margin-top:6px">用竹骨的十字，读懂套色的对版线。</div>
        <div style="margin-top:10px"><span class="tag tag-purple">文化注解</span></div>
      </div>
    </div>
    <button class="btn btn-green" data-action="more-works">浏览更多作品 ${ICON.arrow}</button>
    <div class="sec-title">社区里的练习 <span class="more" data-action="more-works">查看全部 ▸</span></div>
    <div class="two">
      <div class="mini clickable" data-nav="s07"><img src="${A}art_door.png" alt="守护意象">
        <div class="b"><div class="n">年画中的守护意象</div><div class="d">一笔墨线，藏着一份祝愿。</div></div></div>
      <div class="mini clickable" data-nav="s07"><img src="${A}art_flower.png" alt="吉祥纹样">
        <div class="b"><div class="n">花卉纹样的吉祥话</div><div class="d">从花瓣与叶脉里读懂祝福。</div></div></div>
    </div>
    <button class="btn btn-primary" data-nav="s11">写我的作品注解 ${ICON.arrow}</button>`;

  /* 07 作品详情 */
  S.s07 = () => {
    const steps = [['1', '画样', '#C1402E'], ['2', '雕版', '#E9A93C'], ['3', '套印', '#2F6B58'], ['4', '点胭', '#5E4577']];
    const st = steps.map(([n, t, c]) => `<div class="ver-step">
      <div class="cir" style="background:${c}">${n}</div>
      <span style="font-size:13px;font-weight:600;color:#211C19">${t}</span></div>`).join('');
    return `
    <div class="hdr">
      <div class="hdr-row"><button class="back" data-nav="s02">${ICON.back}</button>
        <h1 class="serif" style="font-size:26px;line-height:36px">作品细看</h1></div>
      <div class="sub">图样、工艺与它想说的话</div>
      <div class="bar"></div>
    </div>
    <div class="card" style="background:#211C19;padding:14px;display:flex;justify-content:center;position:relative">
      <span class="tag tag-red" style="position:absolute;top:12px;left:12px">门神题材</span>
      <img src="${A}art_door.png" style="width:145px;height:196px;object-fit:cover;border-radius:8px" alt="门神画版">
    </div>
    <div>
      <div class="kicker" style="font-size:12px;color:#C1402E;font-weight:700">门神画版 · 守护与祝愿</div>
      <div class="serif" style="font-size:20px;font-weight:700;line-height:28px;margin-top:2px">一版一色，四色依次套印</div>
    </div>
    <div class="divider"></div>
    <div class="sec-title" style="font-size:18px">从一根线到四色</div>
    <div class="card card-pad">${st}</div>
    <button class="btn btn-primary" data-nav="s08">去习艺工坊 · 试一道套印 ${ICON.arrow}</button>
    <div class="foot">门神画版 · 守护与祝愿</div>`;
  };

  /* 08 套色拓印工坊入口 */
  S.s08 = () => `
    <div class="hdr">
      <h1 class="serif">套色拓印</h1>
      <div class="sub">选一道工艺，亲手印一遍</div>
      <div class="bar"></div>
    </div>
    <div class="card" style="background:#211C19;padding:18px;color:#fff">
      <div style="font-size:12px;color:#E9A93C;font-weight:700">核心体验</div>
      <div class="serif" style="font-size:22px;font-weight:700;line-height:30px;margin-top:4px">四色套印工坊</div>
      <div style="font-size:12px;color:#B8ADA0;line-height:18px;margin-top:5px">从未红起版到点胭收尾，按版次叠色</div>
      <div style="font-size:12px;color:#E9A93C;margin-top:8px">4 个版次 · 约 3 分钟</div>
      <button class="btn btn-primary" style="margin-top:14px" data-nav="s03">开始套印 ${ICON.arrow}</button>
    </div>
    <div class="sec-title" style="font-size:18px">还有两种手艺</div>
    <div class="two">
      <div class="card card-pad clickable" data-action="craft" data-name="木版雕线"><div style="font-size:14px;font-weight:700">木版雕线</div>
        <div style="font-size:12px;color:#6E655C;line-height:18px;margin-top:4px">看刀痕如何留在版上</div>
        <div style="font-size:12px;color:#C1402E;font-weight:600;margin-top:8px">了解 ›</div></div>
      <div class="card card-pad clickable" data-action="craft" data-name="风筝扎制"><div style="font-size:14px;font-weight:700">风筝扎制</div>
        <div style="font-size:12px;color:#6E655C;line-height:18px;margin-top:4px">认识沙燕的竹骨结构</div>
        <div style="font-size:12px;color:#C1402E;font-weight:600;margin-top:8px">了解 ›</div></div>
    </div>
    <div>
      <div class="sec-title" style="font-size:18px;margin-bottom:10px">套印四步</div>
      <div class="four">
        <div style="background:#E9A93C;color:#211C19"><span style="font-size:20px;font-weight:800">1</span><span>朱红起版</span></div>
        <div style="background:#C1402E;color:#fff"><span style="font-size:20px;font-weight:800">2</span><span>藤黄叠印</span></div>
        <div style="background:#2F6B58;color:#fff"><span style="font-size:20px;font-weight:800">3</span><span>松绿压色</span></div>
        <div style="background:#5E4577;color:#fff"><span style="font-size:20px;font-weight:800">4</span><span>靛紫点胭</span></div>
      </div>
    </div>
    <div class="note">四色套印 · 从朱红起版到靛紫点胭</div>`;

  /* 09 成图预览与保存 */
  S.s09 = () => `
    <div class="hdr">
      <div class="kicker">四版合印 · 完成</div>
      <h1 class="serif" style="font-size:28px;line-height:38px">你的套色作品</h1>
      <div class="sub">四层颜色落在同一张纸上</div>
      <div class="bar"></div>
    </div>
    <div class="card" style="background:#211C19;padding:14px;display:flex;justify-content:center;position:relative">
      <span class="tag tag-gold" style="position:absolute;top:12px;right:12px">四版完成</span>
      <img src="${A}art_flower.png" style="width:165px;height:220px;object-fit:cover;border-radius:8px" alt="套色作品">
    </div>
    <div>
      <div class="serif" style="font-size:20px;font-weight:700;line-height:28px">我的第一张套色练习</div>
      <div style="font-size:12px;color:#6E655C;line-height:18px;margin-top:2px">朱红、藤黄、松绿、靛紫依次叠印</div>
    </div>
    <div class="sec-title" style="font-size:18px">留下这一版</div>
    <div class="two">
      <button class="btn btn-primary" data-action="save-img">保存图片</button>
      <button class="btn btn-ghost" data-nav="s11">为作品写注解</button>
    </div>
    <div class="info">
      <div class="h">这一张的套印记录</div>
      <div class="r"><span class="k">朱红 · 1 版</span><span class="v">松绿 · 3 版</span></div>
      <div class="r"><span class="k">藤黄 · 2 版</span><span class="v">靛紫 · 4 版</span></div>
      <div style="font-size:11px;color:#6E655C;margin-top:10px;line-height:17px">四色版次已全部完成，作品可保存与分享</div>
    </div>
    <div class="foot">留住这一版，让手艺继续发生</div>`;

  /* 10 游村导览 */
  S.s10 = () => `
    <div class="hdr">
      <h1 class="serif">游村导览</h1>
      <div class="sub">先看情境，再安排行前功课</div>
      <div class="bar"></div>
    </div>
    <div class="hero" style="height:210px">
      <img src="${A}art_village.png" alt="村落情境">
      <div class="hero-tag">杨家埠 · 手艺村庄</div>
    </div>
    <div>
      <div class="serif" style="font-size:20px;font-weight:700;line-height:28px">沿着手艺走进村庄</div>
      <div style="font-size:12px;color:#6E655C;line-height:18px;margin-top:2px">年画作坊、风筝竹骨与研学课堂，都在一条参观线上</div>
    </div>
    <div class="sec-title" style="font-size:18px">行前准备</div>
    <div class="two">
      <div class="card card-pad"><div style="font-size:14px;font-weight:700">看什么</div>
        <div style="font-size:12px;color:#6E655C;line-height:18px;margin-top:4px">木板刀痕、套色层次、风筝骨架</div></div>
      <div class="card card-pad"><div style="font-size:14px;font-weight:700">怎么走</div>
        <div style="font-size:12px;color:#6E655C;line-height:18px;margin-top:4px">先作坊、再工坊、后课堂</div></div>
    </div>
    <div class="card card-pad clickable" data-nav="s04" style="background:#E9A93C">
      <div style="font-size:12px;font-weight:700;color:#211C19">在地体验 · 动手课堂</div>
      <div class="serif" style="font-size:18px;font-weight:700;line-height:26px;margin-top:4px;color:#211C19">想动手，就预约一堂体验课</div>
      <div style="font-size:12px;color:#6B5416;margin-top:4px">查看可预约时段与报名条件</div>
      <div style="font-size:12px;font-weight:700;color:#211C19;margin-top:8px">了解课程 ›</div>
    </div>
    <div class="foot">场景为原创插画，仅表达参观情境；不提供实时导航定位</div>`;

  /* 11 作品发布 */
  S.s11 = () => `
    <div class="hdr">
      <div class="hdr-row"><button class="back" data-nav="s06">${ICON.back}</button>
        <h1 class="serif" style="font-size:26px;line-height:36px">发布作品</h1></div>
      <div class="sub">给照片之外的发现留一句话</div>
      <div class="bar"></div>
    </div>
    <div class="card" style="background:#E7DAC4;padding:14px;display:flex;justify-content:center;position:relative">
      <span class="tag tag-gold" style="position:absolute;top:12px;left:12px">作品预览</span>
      <img src="${A}art_flower.png" style="width:150px;height:150px;object-fit:cover;border-radius:8px" alt="作品预览">
    </div>
    <div class="field">
      <div class="label">作品名称</div>
      <input class="input" id="workName" type="text" value="我完成的套色练习" maxlength="24">
    </div>
    <div class="field">
      <div class="row"><div class="label">文化注解</div>
        <span style="font-size:12px;color:#6E655C">写写你注意到的刀痕、色版或寓意</span></div>
      <div style="height:92px;background:#fff;border:2px solid #2F6B58;border-radius:10px;padding:12px;position:relative">
        <textarea id="workNote" maxlength="120" placeholder="例如：这一版的红色偏暖，像年画里常见的朱砂。"
          style="border:0;outline:0;background:transparent;width:100%;height:100%;resize:none;font:inherit;font-size:13px;line-height:20px;color:#211C19"></textarea>
        <div style="position:absolute;right:12px;bottom:8px;font-size:11px;color:#8C8478" id="noteCount">0 / 120</div>
      </div>
    </div>
    <div class="field">
      <div class="label">选择话题</div>
      <div class="chips" data-group="话题"><span class="chip on">套色练习</span>
        <span class="chip">年画题材</span><span class="chip">风筝扎制</span></div>
    </div>
    <button class="btn btn-primary" data-action="publish">发布练习作品 ${ICON.arrow}</button>
    <div class="foot">让每一次分享，都带着理解</div>`;

  /* 12 个人中心 */
  S.s12 = () => `
    <div class="hdr">
      <h1 class="serif">我的·遗韵</h1>
      <div class="sub">收藏每一次发现与手艺练习</div>
      <div class="bar"></div>
    </div>
    <div class="card" style="background:#211C19;padding:18px;color:#fff">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:56px;height:56px;border-radius:28px;background:#E9A93C;color:#211C19;
          display:flex;align-items:center;justify-content:center;font-family:'Noto Serif SC',serif;
          font-size:26px;font-weight:700;flex:0 0 56px">遗</div>
        <div><div style="font-family:'Noto Serif SC',serif;font-size:19px;font-weight:700">李康 · 手艺学习者</div>
          <div style="font-size:11px;color:#B8ADA0;margin-top:3px">坚持每一次发现与练习</div></div>
      </div>
      <div style="margin-top:12px"><span class="tag tag-green">初识套色</span></div>
      <div style="display:flex;margin-top:16px">
        <div style="flex:1"><div style="font-size:24px;font-weight:800;color:#E9A93C">3</div><div style="font-size:11px;color:#B8ADA0">练习作品</div></div>
        <div style="flex:1"><div style="font-size:24px;font-weight:800;color:#E9A93C">8</div><div style="font-size:11px;color:#B8ADA0">收藏条目</div></div>
        <div style="flex:1"><div style="font-size:24px;font-weight:800;color:#E9A93C">2</div><div style="font-size:11px;color:#B8ADA0">完成课程</div></div>
      </div>
    </div>
    <div class="sec-title" style="font-size:18px">我的练习作品</div>
    <div style="display:flex;gap:8px">
      <img src="${A}art_flower.png" class="clickable" data-nav="s09" style="flex:1;height:76px;object-fit:cover;border-radius:8px" alt="练习1">
      <img src="${A}art_door.png" class="clickable" data-nav="s09" style="flex:1;height:76px;object-fit:cover;border-radius:8px" alt="练习2">
      <img src="${A}art_main.png" class="clickable" data-nav="s09" style="flex:1;height:76px;object-fit:cover;border-radius:8px" alt="练习3">
    </div>
    <div class="sec-title" style="font-size:18px">最近收藏</div>
    <div class="card card-pad clickable" data-nav="s07" style="padding:12px 14px"><div style="font-size:13px;font-weight:600">年画的门神题材</div>
      <div style="font-size:11px;color:#6E655C;margin-top:2px">览遗 · 图库作品</div></div>
    <div class="card card-pad clickable" data-nav="s10" style="padding:12px 14px"><div style="font-size:13px;font-weight:600">沙燕风筝的竹骨</div>
      <div style="font-size:11px;color:#6E655C;margin-top:2px">游村 · 工艺条目</div></div>
    <div class="foot">收藏每一次发现与手艺练习</div>`;

  /* 页面元信息 */
  const META = {
    s01: { name: '每日遗珍', id: 'L1-01', tab: '览遗', cap: '览遗 · L1-01 每日遗珍',
      why: '原先首屏标题与卡片标题字号接近、信息平铺。优化后建立<b>三级字阶</b>，首屏只保留<b>一个朱红主按钮</b>，形成 kicker → 主标题 → 主 CTA → 双入口的清晰动线。',
      try: '点「进入年画图库」，或直接点下方两张入口卡跳到习艺 / 游村。' },
    s02: { name: '年画图库', id: 'L1-02', tab: '览遗', cap: '览遗 · L1-02 年画图库',
      why: '卡片尺寸、圆角、标签各页漂移。优化后四张作品卡<b>同构</b>，标签按语义取色，4 列栅格横向对齐，并补齐<b>搜索空状态</b>。',
      try: '在搜索框输入不存在的词（如「汽车」）查看<b>空状态</b>；点题材 chip 切换选中；点作品卡进详情。' },
    s03: { name: '套色操作', id: 'L2-01b', tab: '习艺', cap: '习艺 · L2-01b 套色操作',
      why: '版次流程缺少当前态强调。优化后用<b>颜色 + 描边 + 文案</b>三重编码标出「进行中」版次，主操作唯一。',
      try: '点「完成本版」推进版次，四版完成后自动进入成图预览。' },
    s04: { name: '课程预约', id: 'L3-02', tab: '游村', cap: '游村 · L3-02 课程预约',
      why: '原表单是静态展示。优化后补齐<b>输入错误态</b>、日期 chip 选中态、人数步进器，让表单可真实操作并给出具体原因。',
      try: '手机号已是错误的 8 位；点「提交」看校验抖动与提示，改成 11 位数字后再提交，观察<b>加载 → 成功反馈</b>。' },
    s05: { name: '预约反馈', id: 'L3-02d', tab: '游村', cap: '游村 · L3-02d 预约反馈',
      why: '提交后缺少结果页。优化后以<b>绿色成功卡 + 操作信息 + 两个明确出口</b>闭合流程，让用户对结果一目了然。',
      try: '点「去看看作品广场」或「返回游村导览」继续流程。' },
    s06: { name: '作品广场', id: 'L4-01', tab: '会友', cap: '会友 · L4-01 作品广场',
      why: '社区卡片与主按钮权重混乱。优化后卡片统一、标签语义化，主按钮收敛为唯一朱红，次级操作用描边按钮。',
      try: '点作品卡进详情；点「写我的作品注解」进入发布页；点「浏览更多」看 toast 反馈。' },
    s07: { name: '作品详情', id: 'L1-02b', tab: '览遗', cap: '览遗 · L1-02b 作品详情',
      why: '详情信息层级弱。优化后把<b>画样 / 雕版 / 套印 / 点胭</b>四道工序做成 numbered step，配四色语义，页尾只留一个主 CTA。',
      try: '点页尾按钮去习艺工坊，串起「看图 → 学艺」路径。' },
    s08: { name: '套色拓印工坊入口', id: 'L2-01', tab: '习艺', cap: '习艺 · L2-01 套色拓印工坊入口',
      why: '入口页缺少主次。优化后突出<b>核心体验卡</b>，其余手艺降为次级卡，四步流程用四色横条表达。',
      try: '点「开始套印」进入版次操作；点两种手艺卡看轻量提示。' },
    s09: { name: '成图预览与保存', id: 'L2-01c', tab: '习艺', cap: '习艺 · L2-01c 成图预览与保存',
      why: '完成态缺反馈。优化后以<b>完成徽标 + 套印记录 + 双操作</b>让结果可感知、可追溯。',
      try: '点「保存图片」看成功 toast；点「为作品写注解」进入发布流程。' },
    s10: { name: '游村导览', id: 'L3-01', tab: '游村', cap: '游村 · L3-01 游村导览',
      why: '情境图与信息混杂。优化后拆为<b>情境图 / 行前双卡 / 体验课 CTA</b>三层，让情境与信息各得其所。',
      try: '点金色体验课卡进入课程预约。' },
    s11: { name: '作品发布', id: 'L4-01c', tab: '会友', cap: '会友 · L4-01c 作品发布',
      why: '发布表单缺输入反馈。优化后作品名、注解、话题各有状态，<b>字数实时计数</b>，主按钮唯一。',
      try: '在注解框输入文字看字数统计；切换话题 chip；点「发布」看反馈。' },
    s12: { name: '个人中心', id: 'L4-06', tab: '会友', cap: '会友 · L4-06 个人中心',
      why: '个人数据展示零散。优化后聚合为<b>用户卡 + 三项统计 + 作品缩略 + 收藏列表</b>，信息密度与层级更清晰。',
      try: '点练习作品缩略图或收藏条目，可跳回对应内容页。' },
  };

  global.SCREENS = S;
  global.META = META;
  global.ICONS = ICON;
})(window);
