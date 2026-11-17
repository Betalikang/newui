/* 遗韵杨家埠 · 云服务接入层
 * 数据：课程预约（写入）+ 作品广场（写入 / 读取）+ 云端统计
 * 形式：CDN <script> 全局 WorkBuddyCloud（本项目无构建步骤）
 */
(function () {
  'use strict';

  /* 来自云服务开通结果的 publicConfig（可随前端发布） */
  var publicConfig = {
    endpoint: 'https://wbapp-dteog8wi3wmmcirwunrrsd.app.workbuddy.host',
    oauthRelayBaseUrl: 'https://www.workbuddy.cn/v2/as/genie-baas/oauth',
    publishableKey: 'wbpk_dtEOg8wI3WMmciRwUNRRSD_cSl5jwBcNtDcPdY3F0nSIYwO66SUkAns'
  };

  var client = null;
  var status = 'offline';     // offline | ready
  var lastError = '';

  function boot() {
    var factory = window.WorkBuddyCloud && window.WorkBuddyCloud.createWorkBuddyCloud;
    if (typeof factory !== 'function') {
      lastError = '云服务 SDK 未能加载（请检查网络）';
      return;
    }
    try {
      client = factory({
        endpoint: publicConfig.endpoint,
        oauthRelayBaseUrl: publicConfig.oauthRelayBaseUrl,
        publishableKey: publicConfig.publishableKey
      });
      status = 'ready';
      lastError = '';
    } catch (e) {
      lastError = '云服务初始化失败';
      console.error('[cloud] init failed:', e && e.message);
    }
  }

  function isReady() { return status === 'ready' && !!client; }
  function getError() { return lastError; }

  /* 统一把 SDK 的 {data, error} 转成「成功返回 data / 失败抛出中文原因」 */
  function unwrap(res, fallback) {
    if (res && res.error) {
      var err = new Error(friendly(res.error));
      err.code = res.error.code;
      throw err;
    }
    return res ? res.data : null;
  }

  function friendly(error) {
    var code = error && error.code;
    if (code === '42501') return '没有写入权限';
    if (code === '42P01') return '云端数据表不存在';
    if (code === '23505') return '这条记录已存在';
    if (code === '22023') return '提交内容不合法';
    if (error && /fetch|network|timeout|Failed/i.test(error.message || '')) return '网络异常，请稍后重试';
    return (error && error.message) || '云端服务暂时不可用';
  }

  function timeout(ms) {
    return new Promise(function (_, reject) {
      setTimeout(function () { reject(new Error('请求超时，请检查网络后重试')); }, ms);
    });
  }

  function race(promise, ms) { return Promise.race([promise, timeout(ms || 15000)]); }

  /* ---- 作品广场：读 ---- */
  function listWorks(limit) {
    if (!isReady()) return Promise.reject(new Error(lastError || '云服务未连接'));
    var q = client.database
      .from('yinian_works')
      .select('id, title, note, topic, cover, author, created_at')
      .order('created_at', { ascending: false })
      .order('id', { ascending: false })
      .limit(limit || 2);
    return race(q).then(function (res) { return unwrap(res) || []; });
  }

  /* ---- 作品广场：写 ---- */
  function publishWork(payload) {
    if (!isReady()) return Promise.reject(new Error(lastError || '云服务未连接'));
    var row = {
      title: String(payload.title || '').slice(0, 40),
      note: String(payload.note || '').slice(0, 240) || null,
      topic: String(payload.topic || '套色练习').slice(0, 20),
      cover: String(payload.cover || 'art_flower.png'),
      author: payload.author ? String(payload.author).slice(0, 20) : null
    };
    var q = client.database.from('yinian_works').insert(row).select();
    return race(q).then(function (res) {
      var rows = unwrap(res) || [];
      if (!rows.length) throw new Error('作品未能写入云端');
      return rows[0];
    });
  }

  /* ---- 课程预约：写（RPC，返回脱敏结果，不回传手机号） ---- */
  function bookLesson(payload) {
    if (!isReady()) return Promise.reject(new Error(lastError || '云服务未连接'));
    var q = client.database.rpc('yinian_book_lesson', {
      p_slot: String(payload.slot || ''),
      p_people: Number(payload.people) || 1,
      p_phone: String(payload.phone || '').replace(/\s/g, '')
    });
    return race(q).then(function (res) {
      var rows = unwrap(res) || [];
      if (!rows.length) throw new Error('预约未能写入云端');
      return rows[0];
    });
  }

  /* ---- 云端统计（用于界面显示云端是否真的写进去了） ---- */
  function stats() {
    if (!isReady()) return Promise.reject(new Error(lastError || '云服务未连接'));
    var q = client.database.rpc('yinian_stats');
    return race(q).then(function (res) {
      var rows = unwrap(res) || [];
      return rows[0] || { works: 0, bookings: 0 };
    });
  }

  boot();

  window.YYCloud = {
    isReady: isReady,
    getError: getError,
    listWorks: listWorks,
    publishWork: publishWork,
    bookLesson: bookLesson,
    stats: stats
  };
})();
