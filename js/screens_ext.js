/* 达标扩展 12 屏：s13-s24（每模块 6 页，共 24 页）
   复用 screens.js 的 CSS 类、ICONS 与 wrap 方式，追加到 S / META。 */
(function (global) {
  'use strict';
  const S = global.SCREENS, META = global.META, ICON = global.ICONS;
  const C = { zhu:'#C1402E', lv:'#2F6B58', huang:'#E9A93C', zi:'#5E4577',
              mo:'#211C19', cap:'#6E655C', body:'#4A443E' };
  const A = 'assets/';

  const nav = {
    '览遗': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v14H4z" stroke="currentColor" stroke-width="1.8"/><path d="M8 5v14M12 5v14M16 5v14" stroke="currentColor" stroke-width="1.4"/></svg>',
    '习艺': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" stroke="currentColor" stroke-width="1.8"/></svg>',
    '游村': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" stroke="currentColor" stroke-width="1.8"/></svg>',
    '会友': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" stroke-width="1.8"/></svg>',
  };

  function pill(text, color) {
    const m = { zhu:C.zhu, lv:C.lv, gold:'#9A6A12', zi:C.zi };
    const bg = { zhu:'#FBEEEA', lv:'#EAF2EE', gold:'#FBF1DE', zi:'#EFEAF3' };
    color = color || 'zhu';
    return `<span style="display:inline-flex;font-size:12px;font-weight:600;padding:5px 10px;border-radius:14px;background:${bg[color]};color:${m[color]}">${text}</span>`;
  }
  function stepList(rows) {
    const cols=[C.zhu,C.huang,C.lv,C.zi,'#9A6A12'];
    return rows.map(([t,d],i)=>`<div style="display:flex;gap:12px;margin-bottom:12px">
      <div style="width:30px;height:30px;border-radius:15px;background:${cols[i%5]};color:#fff;flex:0 0 30px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700">${i+1}</div>
      <div style="flex:1"><div style="font-size:14px;font-weight:700;line-height:22px">${t}</div>
      <div style="font-size:12px;line-height:18px;color:${C.cap};margin-top:2px">${d}</div></div></div>`).join('');
  }
  function wrap(body, active) {
    // app.js 的 paint() 会统一包裹状态栏 + .content 容器 + 底部四栏导航，
    // 并按 META[id].tab 高亮当前栏目。这里只返回页面内容，
    // 避免扩展屏出现重复状态栏与重复底栏（否则 navOn 会是 2）。
    return body;
  }

  S.s13 = () => wrap(`
    <div class="hdr"><div class="hdr-row"><button class="back" data-nav="s01">${ICON.back}</button>
      <h1 class="serif" style="font-size:26px;line-height:36px">非遗讲堂</h1></div>
      <div class="sub">一节课，读懂一门手艺的来处</div><div class="bar"></div></div>
    <div class="card"><img src="${A}art_main.png" style="width:100%;height:150px;object-fit:cover;display:block">
      <div class="card-pad"><div style="font-size:12px;color:${C.zhu};font-weight:700">第 01 讲 · 入门</div>
        <div class="serif" style="font-size:19px;font-weight:700;line-height:27px;margin-top:3px">年画为什么是「一版一色」</div>
        <div style="font-size:12px;color:${C.cap};line-height:18px;margin-top:4px">从梨木刻版到手工套印，理解颜色如何一层层落在纸上。</div>
        <div style="margin-top:10px;display:flex;gap:8px">${pill('约 8 分钟')}${pill('图文','lv')}</div></div></div>
    <div class="sec-title" style="font-size:18px">按主题学</div>
    <div class="card card-pad"><div class="row" style="padding:8px 0"><div><div style="font-size:14px;font-weight:700">题材与寓意</div><div style="font-size:12px;color:${C.cap};margin-top:2px">门神、花卉、吉语各说什么</div></div>${pill('4 讲','gold')}</div></div>
    <div class="card card-pad"><div class="row" style="padding:8px 0"><div><div style="font-size:14px;font-weight:700">工艺与工序</div><div style="font-size:12px;color:${C.cap};margin-top:2px">画样、雕版、套印、点胭</div></div>${pill('6 讲','gold')}</div></div>
    <div class="card card-pad"><div class="row" style="padding:8px 0"><div><div style="font-size:14px;font-weight:700">风筝与扎制</div><div style="font-size:12px;color:${C.cap};margin-top:2px">沙燕的竹骨与绢面</div></div>${pill('3 讲','gold')}</div></div>
    <button class="btn btn-primary" data-nav="s01">返回首页 ${ICON.arrow}</button>`, '览遗');

  S.s14 = () => wrap(`
    <div class="hdr"><div class="hdr-row"><button class="back" data-nav="s13">${ICON.back}</button>
      <h1 class="serif" style="font-size:26px;line-height:36px">匠人档案</h1></div>
      <div class="sub">把一门手艺，交到具体的人手里</div><div class="bar"></div></div>
    <div class="card" style="background:${C.mo};padding:18px;color:#fff">
      <div style="display:flex;align-items:center;gap:14px"><div style="width:60px;height:60px;border-radius:30px;background:${C.huang};color:${C.mo};display:flex;align-items:center;justify-content:center;font-family:'Noto Serif SC',serif;font-size:26px;font-weight:700;flex:0 0 60px">杨</div>
        <div><div class="serif" style="font-size:20px;font-weight:700">杨氏刻版 · 第三代</div><div style="font-size:12px;color:#B8ADA0;margin-top:3px">专注梨木刻版三十余年</div></div></div>
      <div style="font-size:12px;color:${C.huang};margin-top:14px;line-height:18px">擅长门神与吉语题材的刀法表现，刀痕利落、线条饱满。</div></div>
    <div class="sec-title" style="font-size:18px">匠人技艺</div>
    <div class="two">
      <div class="card clickable" data-nav="s07"><img src="${A}art_door.png" style="width:100%;height:110px;object-fit:cover;display:block"><div class="card-pad" style="padding:12px"><div style="font-size:14px;font-weight:700">门神刻版</div><div style="font-size:12px;color:${C.cap};margin-top:3px">一刀一线，讲守护</div></div></div>
      <div class="card clickable" data-nav="s07"><img src="${A}art_flower.png" style="width:100%;height:110px;object-fit:cover;display:block"><div class="card-pad" style="padding:12px"><div style="font-size:14px;font-weight:700">花卉纹样</div><div style="font-size:12px;color:${C.cap};margin-top:3px">花开富贵，藏祝愿</div></div></div>
    </div>
    <div class="note">匠人故事用于文化科普展示，人物与经历为课程原型设定。</div>
    <button class="btn btn-primary" data-nav="s15">看纹样百科 ${ICON.arrow}</button>`, '览遗');

  S.s15 = () => wrap(`
    <div class="hdr"><h1 class="serif">纹样百科</h1><div class="sub">读懂年画里的图像语言</div><div class="bar"></div></div>
    <label class="input">${ICON.search}<span style="margin-left:8px">搜索纹样、寓意或题材</span></label>
    <div class="chips"><span class="chip on">全部</span><span class="chip">门神</span><span class="chip">花鸟</span><span class="chip">吉语</span></div>
    <div class="two">
      <div class="mini clickable" data-nav="s07"><img src="${A}art_door.png" alt="门神"><div class="b">${pill('门神')}<div class="n" style="margin-top:8px">秦琼 · 尉迟恭</div><div class="d">守护平安 · 武将门神</div></div></div>
      <div class="mini clickable" data-nav="s07"><img src="${A}art_flower.png" alt="花卉"><div class="b">${pill('花鸟','zi')}<div class="n" style="margin-top:8px">花开富贵</div><div class="d">牡丹象征 · 吉祥寓意</div></div></div>
      <div class="mini clickable" data-nav="s17"><img src="${A}art_main.png" alt="风筝"><div class="b">${pill('风筝','gold')}<div class="n" style="margin-top:8px">沙燕纹</div><div class="d">燕形骨架 · 春日意象</div></div></div>
      <div class="mini clickable" data-nav="s10"><img src="${A}art_village.png" alt="村落"><div class="b">${pill('吉语','lv')}<div class="n" style="margin-top:8px">连年有余</div><div class="d">莲花鲤鱼 · 丰饶祝愿</div></div></div>
    </div>
    <div class="sec-title" style="font-size:18px">纹样小知识</div>
    <div class="card card-pad"><div style="font-size:13px;line-height:20px;color:${C.body}">年画纹样讲究「图必有意，意必吉祥」，一鹂一鱼、一花一叶都有说法。</div></div>
    <div class="foot">纹样示意用于文化科普，非馆藏图像复制</div>`, '览遗');

  S.s16 = () => wrap(`
    <div class="hdr"><div class="hdr-row"><button class="back" data-nav="s08">${ICON.back}</button><h1 class="serif" style="font-size:26px;line-height:36px">木版雕线</h1></div><div class="sub">看刀痕，如何留在梨木版上</div><div class="bar"></div></div>
    <div class="hero" style="height:196px"><img src="${A}art_door.png" alt="刻版"><div class="hero-tag">工艺演示 · 雕线</div></div>
    <div class="sec-title" style="font-size:18px">雕刻四步</div>
    <div class="card card-pad">${stepList([['选梨木','纹理细密、软硬适中，适合精刻。'],['画样上版','把图样反贴到版面上，描出轮廓。'],['持刀刻线','顺着墨线走刀，留出凸起的画面部分。'],['清版试印','扫去木屑，刷墨试印，检查线条。']])}</div>
    <div class="note">工艺为课程演示，不连接真实雕版设备。</div>
    <button class="btn btn-primary" data-nav="s08">回到工坊 ${ICON.arrow}</button>`, '习艺');

  S.s17 = () => wrap(`
    <div class="hdr"><div class="hdr-row"><button class="back" data-nav="s08">${ICON.back}</button><h1 class="serif" style="font-size:26px;line-height:36px">风筝扎制</h1></div><div class="sub">认识沙燕的竹骨与绢面</div><div class="bar"></div></div>
    <div class="hero" style="height:196px"><img src="${A}art_kite.jpg" alt="沙燕风筝"><div class="hero-tag">沙燕 · 串式风筝</div></div>
    <div class="sec-title" style="font-size:18px">扎制要点</div>
    <div class="card card-pad">${stepList([['选竹削骨','取竹青部位，削成均匀的骨架条。'],['烤弯定型','用火烤弯竹条，做出对称的翅膀。'],['扎绑骨架','用线绳交叉绑扎，形成稳定的十字结构。'],['糊纸彩绘','蒙上绢纸，绘以吉祥纹样。']])}</div>
    <div class="foot">风筝为课程示意，非制作教程</div>
    <button class="btn btn-primary" data-nav="s15">了解沙燕纹样 ${ICON.arrow}</button>`, '习艺');

  S.s18 = () => wrap(`
    <div class="hdr"><h1 class="serif">我的练习册</h1><div class="sub">一版一色，都留在这里</div><div class="bar"></div></div>
    <div class="card" style="background:${C.mo};padding:18px;color:#fff">
      <div style="display:flex;justify-content:space-between;align-items:flex-end"><div><div style="font-size:12px;color:${C.huang};font-weight:700">学习进度</div><div class="serif" style="font-size:22px;font-weight:700;margin-top:4px">已完成 7 / 12 项练习</div></div><div style="font-size:28px;font-weight:800;color:${C.huang}">58%</div></div>
      <div style="height:8px;background:#3A332D;border-radius:4px;margin-top:14px;overflow:hidden"><div style="width:58%;height:100%;background:${C.huang};border-radius:4px"></div></div></div>
    <div class="sec-title" style="font-size:18px">最近练习</div>
    <div class="card card-pad"><div style="display:flex;gap:12px;align-items:center"><img src="${A}art_flower.png" style="width:56px;height:56px;object-fit:cover;border-radius:8px" alt="练习"><div style="flex:1"><div style="font-size:14px;font-weight:700">四色套印 · 花卉版</div><div style="font-size:12px;color:${C.cap};margin-top:2px">四版完成 · 已保存</div></div>${pill('完成','lv')}</div></div>
    <div class="card card-pad"><div style="display:flex;gap:12px;align-items:center"><img src="${A}art_door.png" style="width:56px;height:56px;object-fit:cover;border-radius:8px" alt="练习"><div style="flex:1"><div style="font-size:14px;font-weight:700">门神刻版 · 线稿</div><div style="font-size:12px;color:${C.cap};margin-top:2px">进行到第 3 版</div></div>${pill('进行中','gold')}</div></div>
    <button class="btn btn-primary" data-nav="s03">继续练习 ${ICON.arrow}</button>`, '习艺');

  S.s19 = () => wrap(`
    <div class="hdr"><h1 class="serif">村落导览图</h1><div class="sub">一条线，走完年画村的手艺</div><div class="bar"></div></div>
    <div class="hero" style="height:210px"><img src="${A}art_village.png" alt="村落情境"><div class="hero-tag">情境示意 · 非地图</div></div>
    <div class="sec-title" style="font-size:18px">参观动线</div>
    <div class="card card-pad">${stepList([['年画作坊','看梨木刻版与手工套印的现场。'],['风筝工坊','认识沙燕竹骨与绢面彩绘。'],['研学课堂','预约一堂动手体验课。'],['文创小铺','带一张年画、一只风筝回家。']])}</div>
    <div class="foot">场景为原创插画，仅表达参观情境；不提供实时导航定位</div>`, '游村');

  S.s20 = () => wrap(`
    <div class="hdr"><div class="hdr-row"><button class="back" data-nav="s10">${ICON.back}</button><h1 class="serif" style="font-size:26px;line-height:36px">行前准备</h1></div><div class="sub">出发之前，先把功课做好</div><div class="bar"></div></div>
    <div class="sec-title" style="font-size:18px">行前清单</div>
    <div class="card card-pad">
      <div class="row" style="padding:10px 0;border-bottom:1px dashed #E7DAC4"><span style="font-size:14px;font-weight:600">了解年画的题材寓意</span>${pill('已完成','lv')}</div>
      <div class="row" style="padding:10px 0;border-bottom:1px dashed #E7DAC4"><span style="font-size:14px;font-weight:600">预约体验课时段</span>${pill('待完成','gold')}</div>
      <div class="row" style="padding:10px 0;border-bottom:1px dashed #E7DAC4"><span style="font-size:14px;font-weight:600">查看参观动线与开放信息</span>${pill('待完成','gold')}</div>
      <div class="row" style="padding:10px 0"><span style="font-size:14px;font-weight:600">准备速写本与相机</span>${pill('建议','zi')}</div></div>
    <div class="card card-pad" style="background:${C.huang}"><div style="font-size:13px;font-weight:700;color:${C.mo}">小提示</div><div style="font-size:12px;color:#6B5416;line-height:18px;margin-top:4px">套印体验会用到颜料，建议穿深色或耐脏衣物。</div></div>
    <button class="btn btn-primary" data-nav="s04">去预约体验课 ${ICON.arrow}</button>`, '游村');

  S.s21 = () => wrap(`
    <div class="hdr"><h1 class="serif">到访打卡</h1><div class="sub">把走过的地方，收进记忆</div><div class="bar"></div></div>
    <div class="card" style="background:${C.mo};padding:18px;color:#fff">
      <div class="serif" style="font-size:20px;font-weight:700">杨家埠 · 手艺村庄</div><div style="font-size:12px;color:#B8ADA0;margin-top:4px">已完成打卡 3 / 4 处</div>
      <div style="display:flex;gap:8px;margin-top:14px"><div style="flex:1;height:6px;background:${C.huang};border-radius:3px"></div><div style="flex:1;height:6px;background:${C.huang};border-radius:3px"></div><div style="flex:1;height:6px;background:${C.huang};border-radius:3px"></div><div style="flex:1;height:6px;background:#3A332D;border-radius:3px"></div></div></div>
    <div class="sec-title" style="font-size:18px">打卡点</div>
    <div class="two">
      <div class="card card-pad"><div style="font-size:14px;font-weight:700">年画作坊</div><div style="font-size:12px;color:${C.cap};margin-top:3px">已打卡</div><div style="margin-top:8px">${pill('完成','lv')}</div></div>
      <div class="card card-pad"><div style="font-size:14px;font-weight:700">风筝工坊</div><div style="font-size:12px;color:${C.cap};margin-top:3px">已打卡</div><div style="margin-top:8px">${pill('完成','lv')}</div></div>
      <div class="card card-pad"><div style="font-size:14px;font-weight:700">研学课堂</div><div style="font-size:12px;color:${C.cap};margin-top:3px">已打卡</div><div style="margin-top:8px">${pill('完成','lv')}</div></div>
      <div class="card card-pad"><div style="font-size:14px;font-weight:700">文创小铺</div><div style="font-size:12px;color:${C.cap};margin-top:3px">待到访</div><div style="margin-top:8px">${pill('未打卡','gold')}</div></div>
    </div>
    <div class="foot">打卡为课程演示，不接入真实定位与到访记录</div>`, '游村');

  S.s22 = () => wrap(`
    <div class="hdr"><h1 class="serif">话题圈子</h1><div class="sub">和同好，聊一门手艺</div><div class="bar"></div></div>
    <div class="card"><img src="${A}art_main.png" style="width:100%;height:140px;object-fit:cover;display:block"><div class="card-pad"><div style="font-size:12px;color:${C.zhu};font-weight:700">本周热门话题</div><div class="serif" style="font-size:19px;font-weight:700;margin-top:3px"># 我第一次套印的颜色</div><div style="font-size:12px;color:${C.cap};margin-top:4px">1,204 人参与 · 3,680 条讨论</div></div></div>
    <div class="sec-title" style="font-size:18px">推荐话题</div>
    <div class="card card-pad clickable" data-nav="s23"><div class="row"><div><div style="font-size:14px;font-weight:700"># 年画里的守护意象</div><div style="font-size:12px;color:${C.cap};margin-top:2px">聊聊门神的线条与寓意</div></div>${pill('862 讨论','zi')}</div></div>
    <div class="card card-pad clickable" data-nav="s23"><div class="row"><div><div style="font-size:14px;font-weight:700"># 沙燕风筝的竹骨</div><div style="font-size:12px;color:${C.cap};margin-top:2px">结构、骨架与彩绘</div></div>${pill('534 讨论','zi')}</div></div>
    <div class="card card-pad clickable" data-nav="s23"><div class="row"><div><div style="font-size:14px;font-weight:700"># 我的练习册</div><div style="font-size:12px;color:${C.cap};margin-top:2px">记录每一次动手</div></div>${pill('1,102 讨论','zi')}</div></div>
    <div class="foot">社区话题为课程原型示例，不接入真实社区服务</div>`, '会友');

  S.s23 = () => wrap(`
    <div class="hdr"><div class="hdr-row"><button class="back" data-nav="s22">${ICON.back}</button><h1 class="serif" style="font-size:26px;line-height:36px">作品细看</h1></div><div class="sub">读一读别人写下的注解</div><div class="bar"></div></div>
    <div class="card"><img src="${A}art_flower.png" style="width:100%;height:150px;object-fit:cover;display:block"><div class="card-pad"><div class="serif" style="font-size:18px;font-weight:700">花开富贵 · 套色练习</div><div style="font-size:12px;color:${C.cap};line-height:18px;margin-top:4px">红色偏暖，像年画里常见的朱砂。</div><div style="margin-top:8px">${pill('文化注解')} ${pill('套色练习','lv')}</div></div></div>
    <div class="sec-title" style="font-size:18px">讨论 · 12</div>
    <div class="card card-pad"><div style="font-size:13px;font-weight:700">小李同学</div><div style="font-size:13px;color:${C.body};line-height:19px;margin-top:4px">第二版的黄压在第一版红上，边缘有点透，很好看。</div><div style="font-size:11px;color:${C.cap};margin-top:6px">2 小时前</div></div>
    <div class="card card-pad"><div style="font-size:13px;font-weight:700">手艺爱好者</div><div style="font-size:13px;color:${C.body};line-height:19px;margin-top:4px">对版线对准了，套色才不会错位，注意十字线。</div><div style="font-size:11px;color:${C.cap};margin-top:6px">昨天</div></div>
    <div class="input" style="margin-top:2px">写下你的看法…</div>`, '会友');

  S.s24 = () => wrap(`
    <div class="hdr"><h1 class="serif">我的收藏</h1><div class="sub">把喜欢的，留在手边</div><div class="bar"></div></div>
    <div class="chips"><span class="chip on">全部</span><span class="chip">年画</span><span class="chip">风筝</span><span class="chip">工艺</span></div>
    <div class="two">
      <div class="mini clickable" data-nav="s07"><img src="${A}art_door.png" alt="门神"><div class="b">${pill('年画')}<div class="n" style="margin-top:8px">门神题材</div><div class="d">守护与祝愿</div></div></div>
      <div class="mini clickable" data-nav="s17"><img src="${A}art_kite.jpg" alt="风筝"><div class="b">${pill('风筝','gold')}<div class="n" style="margin-top:8px">沙燕风筝</div><div class="d">竹骨与春光</div></div></div>
      <div class="mini clickable" data-nav="s07"><img src="${A}art_flower.png" alt="花卉"><div class="b">${pill('年画','zi')}<div class="n" style="margin-top:8px">花卉吉祥</div><div class="d">花开富贵</div></div></div>
      <div class="mini clickable" data-nav="s10"><img src="${A}art_village.png" alt="村落"><div class="b">${pill('工艺','lv')}<div class="n" style="margin-top:8px">村落手艺</div><div class="d">过年画村</div></div></div>
    </div>
    <div class="sec-title" style="font-size:18px">收藏笔记</div>
    <div class="card card-pad"><div style="font-size:13px;color:${C.body};line-height:20px">把「图必有意，意必吉祥」这句记下来，讲给朋友听。</div></div>
    <div class="foot">收藏与笔记为课程原型示例</div>`, '会友');

  Object.assign(META, {
    s13:{name:'非遗讲堂',id:'L1-03',tab:'览遗',cap:'览遗 · L1-03 非遗讲堂'},
    s14:{name:'匠人档案',id:'L1-04',tab:'览遗',cap:'览遗 · L1-04 匠人档案'},
    s15:{name:'纹样百科',id:'L1-05',tab:'览遗',cap:'览遗 · L1-05 纹样百科'},
    s16:{name:'木版雕线',id:'L2-02',tab:'习艺',cap:'习艺 · L2-02 木版雕线'},
    s17:{name:'风筝扎制',id:'L2-03',tab:'习艺',cap:'习艺 · L2-03 风筝扎制'},
    s18:{name:'我的练习册',id:'L2-04',tab:'习艺',cap:'习艺 · L2-04 我的练习册'},
    s19:{name:'村落地图',id:'L3-03',tab:'游村',cap:'游村 · L3-03 村落地图'},
    s20:{name:'行前准备',id:'L3-04',tab:'游村',cap:'游村 · L3-04 行前准备'},
    s21:{name:'到访打卡',id:'L3-05',tab:'游村',cap:'游村 · L3-05 到访打卡'},
    s22:{name:'话题圈子',id:'L4-02',tab:'会友',cap:'会友 · L4-02 话题圈子'},
    s23:{name:'作品评论',id:'L4-03',tab:'会友',cap:'会友 · L4-03 作品评论'},
    s24:{name:'收藏夹',id:'L4-04',tab:'会友',cap:'会友 · L4-04 收藏夹'},
  });

  global.SCREENS_EXT_LOADED = true;
})(window);
