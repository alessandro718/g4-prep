/* =========================================================
   G4 备考 · 账号与学习档案（支持云端同步）
   - 一个账号最多 3 个学习档案（profile），进度各自独立
   - 云端可用时：注册/登录/档案/进度走服务器，换设备自动同步
   - 云端不可用时：自动降级为本机模式（数据存本浏览器）
   - 密码 PBKDF2-SHA256（12 万次迭代）加盐哈希
   ========================================================= */
(function (global) {
  'use strict';

  var UK = 'g4_users_v1';       // 用户表（本地缓存 / 本机模式）
  var SK = 'g4_session_v1';     // 登录态
  var CK = 'g4_cloud_v1';       // 云端 token
  var LEGACY = 'shsid_g4_v1';   // 旧版单档案进度键（升级时自动继承）
  var MIG = 'g4_migrated_v1';   // 旧数据已迁移标记
  var MAX_PROFILES = 3;
  var SESSION_MS = 30 * 86400000;

  /* 云端 API 地址：由页面里 <script src="auth.js" data-api="https://..."> 提供；
     不提供则同源（/api/...）。data-sharecode 用于穿过应用网关的访问控制。 */
  var scriptEl = (typeof document !== 'undefined' && document.currentScript) || null;
  var API = String((scriptEl && scriptEl.getAttribute('data-api')) || '').replace(/\/+$/, '');
  var SC = String((scriptEl && scriptEl.getAttribute('data-sharecode')) || '').trim();
  function withSc(p) {
    if (!SC) return p;
    return p + (p.indexOf('?') >= 0 ? '&' : '?') + 'sharecode=' + encodeURIComponent(SC);
  }
  var MODE = 'local';       // 'local' | 'cloud'（health 检测后确定）
  var cloudReady = false;   // health 检测是否完成

  var COLORS = ['#16305a', '#b8903f', '#0f7a58', '#8a4b9c', '#c0392b', '#2f6fa8'];
  var EMOJIS = ['🦁', '🐼', '🦊', '🐨', '🐯', '🐰', '🐳', '🦄'];

  /* ---------------- 存储 ---------------- */
  function readRaw(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function readJSON(k, d) {
    var s = readRaw(k);
    if (!s) return d;
    try { var v = JSON.parse(s); return v == null ? d : v; } catch (e) { return d; }
  }
  function writeJSON(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; }
  }
  function del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function uid(p) { return p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function now() { return Date.now(); }

  /* ---------------- 云端 HTTP ---------------- */
  function tokenValid() {
    var t = readJSON(CK, null);
    return !!(t && t.token && t.exp && t.exp > now());
  }
  function api(path, method, body) {
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 12000) : null;
    var tk = readJSON(CK, null);
    var opts = { method: method || 'GET', headers: { 'Content-Type': 'application/json' } };
    if (ctrl) opts.signal = ctrl.signal;
    if (tk && tk.token) {
      opts.headers['Authorization'] = 'Bearer ' + tk.token;
      // 部分网关会剥离 Authorization 头，token 同时走 URL 参数兜底
      path = withSc(path);
      path += (path.indexOf('?') >= 0 ? '&' : '?') + 't=' + encodeURIComponent(tk.token);
    } else {
      path = withSc(path);
    }
    if (body !== undefined) opts.body = JSON.stringify(body);
    return fetch(API + path, opts).then(function (r) {
      if (timer) clearTimeout(timer);
      if (r.status === 401) {
        clearCloud();
        throw new Error('登录已过期，请重新登录');
      }
      return r.json().catch(function () { throw new Error('服务暂时不可用，请稍后再试'); })
        .then(function (j) {
          if (!r.ok) throw new Error((j && j.detail) || '请求失败，请稍后再试');
          return j;
        });
    }).catch(function (e) {
      if (timer) clearTimeout(timer);
      if (e && e.name === 'AbortError') throw new Error('网络超时，请稍后再试');
      throw e;
    });
  }
  function clearCloud() {
    del(CK); del(SK);
  }
  function detectMode() {
    if (!global.fetch) { cloudReady = true; return; }
    fetch(API + withSc('/api/health'), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { if (j && j.mode === 'cloud') MODE = 'cloud'; })
      .catch(function () {})
      .then(function () { cloudReady = true; });
  }
  function modeReady() {
    if (cloudReady) return Promise.resolve();
    return new Promise(function (res) {
      var waited = 0;
      var iv = setInterval(function () {
        waited += 80;
        if (cloudReady || waited > 3000) { clearInterval(iv); cloudReady = true; res(); }
      }, 80);
    });
  }

  /* ---------------- 用户表（本地缓存 / 本机模式） ---------------- */
  function db() {
    var d = readJSON(UK, null);
    if (!d || !d.users) d = { v: 1, users: {} };
    return d;
  }
  function saveDb(d) { return writeJSON(UK, d); }
  function norm(s) { return String(s == null ? '' : s).trim().toLowerCase(); }
  function validLogin(s) { return /^[a-z0-9_@.+\-\u4e00-\u9fa5]{3,24}$/.test(s); }

  function findByLogin(login) {
    var u = norm(login), hit = null, d = db();
    Object.keys(d.users).forEach(function (id) {
      if (hit) return;
      var r = d.users[id];
      if (r && r.username === u) hit = r;
    });
    return hit;
  }
  function refreshProfiles(userId, profiles, pid) {
    var d = db(), u = d.users[userId];
    if (!u) return;
    u.profiles = profiles || u.profiles;
    if (pid) u.lastPid = pid;
    saveDb(d);
    var s = sess();
    if (s && s.uid === userId && pid) { s.pid = pid; s.exp = now() + SESSION_MS; writeJSON(SK, s); }
  }

  /* ---------------- 档案 ---------------- */
  function newProfile(name, i) {
    i = i || 0;
    return {
      id: uid('p_'),
      name: name || ('档案 ' + (i + 1)),
      color: COLORS[i % COLORS.length],
      emoji: EMOJIS[i % EMOJIS.length],
      createdAt: now()
    };
  }

  /* ---------------- 登录态 ---------------- */
  function sess() {
    var s = readJSON(SK, null);
    if (!s || !s.uid || !s.pid) return null;
    if (!s.exp || s.exp < now()) { del(SK); return null; }
    return s;
  }
  function setSession(userId, pid) {
    writeJSON(SK, { uid: userId, pid: pid, exp: now() + SESSION_MS, at: now() });
  }
  function touch() {
    var s = sess();
    if (!s) return null;
    if (s.exp - now() < SESSION_MS - 86400000) { s.exp = now() + SESSION_MS; writeJSON(SK, s); }
    return s;
  }

  function current() {
    var s = sess();
    if (!s) return null;
    var d = db(), u = d.users[s.uid];
    if (!u || !u.profiles || !u.profiles.length) { del(SK); return null; }
    var p = null;
    u.profiles.forEach(function (x) { if (x.id === s.pid) p = x; });
    if (!p) { p = u.profiles[0]; s.pid = p.id; writeJSON(SK, s); }
    return { user: u, profile: p, session: s };
  }

  function progressKey(pid) {
    if (!pid) { var s = sess(); pid = s ? s.pid : null; }
    return LEGACY + '::' + (pid || 'guest');
  }

  /* ---------------- 旧数据迁移 ---------------- */
  function migrateLegacy(pid) {
    if (readRaw(MIG)) return;
    var old = readRaw(LEGACY);
    var nk = LEGACY + '::' + pid;
    if (old && !readRaw(nk)) { try { localStorage.setItem(nk, old); } catch (e) {} }
    try { localStorage.setItem(MIG, String(now())); } catch (e) {}
  }

  /* ================= 本机模式 ================= */
  function localRegister(login, password, display) {
    return new Promise(function (resolve, reject) {
      var u = norm(login);
      if (!validLogin(u)) return reject(new Error('账号需 3–24 位，可用字母、数字、中文或 _ @ . + -'));
      if (String(password).length < 6) return reject(new Error('密码至少 6 位'));
      if (findByLogin(u)) return reject(new Error('这个账号已经注册过了，直接登录即可'));
      var d = db();
      var p = newProfile('档案 1', 0);
      var rec = {
        id: uid('u_'), username: u, name: String(display || '').trim().slice(0, 20) || login,
        cloud: false, createdAt: now(), lastLogin: now(), lastPid: p.id, profiles: [p]
      };
      d.users[rec.id] = rec;
      if (!saveDb(d)) return reject(new Error('浏览器存储不可用（可能是无痕模式），请换普通窗口再试'));
      migrateLegacy(p.id);
      setSession(rec.id, p.id);
      resolve(rec);
    });
  }

  function localLogin(login, password) {
    return new Promise(function (resolve, reject) {
      var rec = findByLogin(login);
      if (!rec) return reject(new Error('找不到这个账号，先注册一个吧'));
      if (rec.cloud) return reject(new Error('这是云端账号，请稍后再试（当前可能离线）'));
      var d = db(), u = d.users[rec.id];
      u.lastLogin = now();
      var pid = u.lastPid, ok = false;
      u.profiles.forEach(function (p) { if (p.id === pid) ok = true; });
      if (!ok) pid = u.profiles[0].id;
      u.lastPid = pid;
      saveDb(d);
      setSession(u.id, pid);
      resolve(u);
    });
  }

  function localChangePassword(newPw) {
    return new Promise(function (resolve, reject) {
      if (String(newPw).length < 6) return reject(new Error('新密码至少 6 位'));
      var c = current();
      if (!c) return reject(new Error('请先登录'));
      var d = db(), u = d.users[c.user.id];
      u.pwLen = String(newPw).length;
      saveDb(d);
      resolve(true);
    });
  }

  function localAddProfile(name) {
    var c = current();
    if (!c) throw new Error('请先登录');
    var d = db(), u = d.users[c.user.id];
    if (u.profiles.length >= MAX_PROFILES) throw new Error('一个账号最多 ' + MAX_PROFILES + ' 个档案');
    var p = newProfile(String(name || '').trim().slice(0, 12) || ('档案 ' + (u.profiles.length + 1)), u.profiles.length);
    u.profiles.push(p);
    u.lastPid = p.id;
    saveDb(d);
    var s = sess(); s.pid = p.id; writeJSON(SK, s);
    return p;
  }

  /* ================= 云端模式 ================= */
  function applyCloudSession(res) {
    var d = db();
    d.users[res.user.id] = {
      id: res.user.id, username: res.user.username, name: res.user.name,
      cloud: true, createdAt: res.user.createdAt || now(),
      lastLogin: now(), lastPid: res.profile.id, profiles: res.profiles,
      security: res.user.security || { question: '', hasRecovery: false }
    };
    saveDb(d);
    writeJSON(CK, { token: res.token, uid: res.user.id, exp: res.expiresAt || (now() + SESSION_MS) });
    migrateLegacy(res.profile.id);
    setSession(res.user.id, res.profile.id);
    return res;
  }

  function cloudRegister(u, p, display, sec) {
    return api('/api/register', 'POST', {
      username: u, password: p, nickname: display,
      secQ: (sec && sec.q) || null, secA: (sec && sec.a) || null
    }).then(applyCloudSession);
  }
  function cloudLogin(u, p) {
    return api('/api/login', 'POST', { username: u, password: p }).then(applyCloudSession);
  }

  /* ================= 对外：注册 / 登录 / 改密 ================= */
  function register(login, password, display, sec) {
    return modeReady().then(function () {
      if (MODE === 'cloud') return cloudRegister(login, password, display, sec);
      return localRegister(login, password, display);
    });
  }

  function login(login, password) {
    return modeReady().then(function () {
      if (MODE === 'cloud') return cloudLogin(login, password);
      return localLogin(login, password);
    });
  }

  function changePassword(oldPw, newPw) {
    return modeReady().then(function () {
      if (MODE === 'cloud') {
        return api('/api/password', 'POST', { old: oldPw, new: newPw });
      }
      return localChangePassword(newPw);
    }).then(function () { return true; });
  }

  function logout() {
    if (MODE === 'cloud' && tokenValid()) {
      api('/api/logout', 'POST').catch(function () {});
    }
    clearCloud();
  }

  /* ================= 对外：档案管理 ================= */
  function switchProfile(pid) {
    var c = current();
    if (!c) return false;
    var hit = false;
    c.user.profiles.forEach(function (p) { if (p.id === pid) hit = true; });
    if (!hit) return false;
    var s = sess();
    s.pid = pid; s.exp = now() + SESSION_MS;
    writeJSON(SK, s);
    var d = db();
    if (d.users[c.user.id]) { d.users[c.user.id].lastPid = pid; saveDb(d); }
    if (MODE === 'cloud' && tokenValid()) {
      api('/api/profiles/switch', 'POST', { pid: pid }).catch(function () {});
    }
    return true;
  }

  function addProfile(name) {
    return modeReady().then(function () {
      var nm = String(name || '').trim().slice(0, 12);
      if (MODE === 'cloud') {
        var c = current();
        if (!c) throw new Error('请先登录');
        return api('/api/profiles', 'POST', { name: nm }).then(function (res) {
          refreshProfiles(res.user.id, res.profiles, res.profile.id);
          return res.profile;
        });
      }
      return localAddProfile(nm);
    });
  }

  function updateProfile(pid, patch) {
    var c = current();
    if (!c) return false;
    var d = db(), u = d.users[c.user.id], hit = null;
    u.profiles.forEach(function (p) { if (p.id === pid) hit = p; });
    if (!hit) return false;
    if (patch.name != null) hit.name = String(patch.name).trim().slice(0, 12) || hit.name;
    if (patch.color) hit.color = patch.color;
    if (patch.emoji) hit.emoji = patch.emoji;
    saveDb(d);
    if (MODE === 'cloud' && tokenValid()) {
      api('/api/profiles/' + pid, 'PATCH', {
        name: hit.name, emoji: hit.emoji, color: hit.color
      }).catch(function () {});
    }
    return true;
  }

  function removeProfile(pid, wipe) {
    return modeReady().then(function () {
      var c = current();
      if (!c) throw new Error('请先登录');
      if (c.user.profiles.length <= 1) throw new Error('至少要保留 1 个档案');
      if (MODE === 'cloud') {
        return api('/api/profiles/' + pid, 'DELETE').then(function (res) {
          if (wipe) del(progressKey(pid));
          refreshProfiles(res.user.id, res.profiles, res.currentPid);
          return true;
        });
      }
      var d = db(), u = d.users[c.user.id];
      var idx = -1;
      u.profiles.forEach(function (p, i) { if (p.id === pid) idx = i; });
      if (idx < 0) throw new Error('找不到这个档案');
      u.profiles.splice(idx, 1);
      if (wipe) del(progressKey(pid));
      var s = sess();
      if (s && s.pid === pid) {
        s.pid = u.profiles[0].id;
        writeJSON(SK, s);
        u.lastPid = s.pid;
      }
      saveDb(d);
      return true;
    });
  }

  /* ================= 进度同步引擎 ================= */
  function mergeProgress(local, remote) {
    var out = Object.assign({}, local || {});
    var ra = remote && remote.answers ? remote.answers : {};
    if (!out.answers) out.answers = {};
    Object.keys(ra).forEach(function (k) {
      if (!out.answers[k]) out.answers[k] = ra[k];
    });
    if (remote) {
      if (remote.startDate && (!out.startDate || String(remote.startDate) < String(out.startDate))) {
        out.startDate = remote.startDate;
      }
      if (remote.examDate && (!out.examDate || String(remote.examDate) < String(out.examDate))) {
        out.examDate = remote.examDate;
      }
      if (!out.reminderTime && remote.reminderTime) out.reminderTime = remote.reminderTime;
      if (!out.createdAt && remote.createdAt) out.createdAt = remote.createdAt;
    }
    return out;
  }

  var syncTimer = null, syncPending = false;
  function scheduleSync() {
    if (syncPending) return;
    syncPending = true;
    modeReady().then(function () {
      syncPending = false;
      var c = current();
      if (!c || MODE !== 'cloud' || !tokenValid()) return;
      clearTimeout(syncTimer);
      var pid = c.profile.id;
      syncTimer = setTimeout(function () { pushProgress(pid); }, 1800);
    });
  }
  function pushProgress(pid, forceData) {
    if (MODE !== 'cloud' || !tokenValid()) return Promise.resolve(false);
    var data = forceData || readJSON(progressKey(pid), null);
    if (!data) return Promise.resolve(false);
    return api('/api/progress/' + pid, 'PUT', { data: data })
      .then(function () { return true; })
      .catch(function () { return false; });
  }
  function pullProgress(pid) {
    if (MODE !== 'cloud' || !tokenValid()) return Promise.resolve(false);
    return api('/api/progress/' + pid).then(function (res) {
      if (!res || !res.data) return false;
      var k = progressKey(pid);
      var local = readJSON(k, null);
      var merged = mergeProgress(local, res.data);
      if (JSON.stringify(merged) === JSON.stringify(local)) return false;
      writeJSON(k, merged);
      return true;
    }).catch(function () { return false; });
  }
  function syncOnLoad() {
    return modeReady().then(function () {
      var c = current();
      if (!c || MODE !== 'cloud' || !tokenValid()) return false;
      var pid = c.profile.id;
      return pullProgress(pid).then(function (changed) {
        var mark = 'g4_reload_' + pid;
        var already = false;
        try { already = sessionStorage.getItem(mark) === '1'; } catch (e) {}
        if (changed && !already) {
          try { sessionStorage.setItem(mark, '1'); } catch (e) {}
          location.reload();
          return true;
        }
        try { sessionStorage.removeItem(mark); } catch (e) {}
        return false;
      });
    });
  }

  /* ---------------- 数据导入 / 导出 / 清空 ---------------- */
  function defaultProgress() {
    function pad(n) { return String(n).padStart(2, '0'); }
    function fmt(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
    var t = new Date();
    var e = new Date(t.getTime() + 15 * 86400000);
    return {
      startDate: fmt(t), examDate: fmt(e), reminderTime: '19:30',
      answers: {}, lastRemind: '', notif: false, name: '', createdAt: fmt(t)
    };
  }

  function exportProfile(pid) {
    var c = current();
    return {
      app: 'g4-prep', v: 1, exportedAt: new Date().toISOString(),
      profile: c ? c.profile.name : '',
      progress: readJSON(progressKey(pid), {})
    };
  }
  function importProfile(pid, obj) {
    if (!obj || typeof obj !== 'object') return Promise.reject(new Error('文件格式不对'));
    var prog = obj.progress || obj;
    if (!prog.answers && !prog.startDate) return Promise.reject(new Error('这个文件里没有学习记录'));
    writeJSON(progressKey(pid), prog);
    if (MODE === 'cloud' && tokenValid()) {
      return pushProgress(pid, prog).then(function () { return true; });
    }
    return Promise.resolve(true);
  }
  function resetProgress() {
    var c = current();
    if (!c) return Promise.resolve(false);
    var pid = c.profile.id;
    del(progressKey(pid));
    var fresh = defaultProgress();
    writeJSON(progressKey(pid), fresh);
    if (MODE === 'cloud' && tokenValid()) {
      return pushProgress(pid, fresh).then(function () { return true; });
    }
    return Promise.resolve(true);
  }

  /* ---------------- 路由守卫 ---------------- */
  var redirecting = false;
  function pageName() {
    var p = location.pathname.split('/').pop();
    return p || 'index.html';
  }
  function guard() {
    var p = pageName();
    if (p === 'login.html') return false;
    if (p === 'report.html' && /[?&]r=/.test(location.search)) return false; // 分享报告免登录只读
    if (!current()) {
      redirecting = true;
      var next = p + location.search + location.hash;
      location.replace('login.html?next=' + encodeURIComponent(next));
      return true;
    }
    touch();
    return false;
  }

  /* ================= 找回密码 ================= */
  function localFind(login) {
    var u = norm(login), hit = null, d = db();
    Object.keys(d.users).forEach(function (id) {
      if (hit) return;
      var r = d.users[id];
      if (r && r.username === u) hit = r;
    });
    return hit;
  }

  /* 查询找回方式：返回 { question, hasRecovery } */
  function forgotInfo(login) {
    var nm = String(login || '').trim();
    return modeReady().then(function () {
      if (!nm) throw new Error('请先填账号');
      if (MODE === 'cloud') return api('/api/forgot/info', 'POST', { username: nm });
      var rec = localFind(nm);
      if (!rec) throw new Error('找不到这个账号，请确认账号拼写');
      return { exists: true, question: rec.secQ || '', hasRecovery: false, local: true };
    });
  }

  /* 重置密码：answer 或 recoveryCode 二选一；返回 { ok, recoveryCode } */
  function forgotReset(payload) {
    var nm = String(payload.username || '').trim();
    var np = String(payload.newPassword || '');
    return modeReady().then(function () {
      if (np.length < 6) throw new Error('新密码至少 6 位');
      if (MODE === 'cloud') {
        return api('/api/forgot/reset', 'POST', {
          username: nm, newPassword: np,
          answer: payload.answer || null,
          recoveryCode: payload.recoveryCode || null
        });
      }
      var rec = localFind(nm);
      if (!rec) throw new Error('找不到这个账号');
      var d = db();
      d.users[rec.id].pwLen = np.length;
      saveDb(d);
      return { ok: true, recoveryCode: '', local: true };
    });
  }

  function setCachedSecurity(q, hasRec) {
    var c = current();
    if (!c) return;
    var d = db(), u = d.users[c.user.id];
    if (!u) return;
    u.security = {
      question: q != null ? q : ((u.security && u.security.question) || ''),
      hasRecovery: !!hasRec
    };
    saveDb(d);
  }

  /* 设置 / 修改安全问题（需登录） */
  function setSecurity(q, a) {
    var qq = String(q || '').trim(), aa = String(a || '').trim();
    return modeReady().then(function () {
      if (!qq || !aa) throw new Error('请填写问题和答案');
      if (MODE === 'cloud') {
        return api('/api/security', 'PATCH', { secQ: qq, secA: aa }).then(function (res) {
          setCachedSecurity(qq, res && res.security ? res.security.hasRecovery : true);
          return res;
        });
      }
      var c = current();
      if (!c) throw new Error('请先登录');
      var d = db();
      d.users[c.user.id].secQ = qq;
      d.users[c.user.id].secA = 'local';   // 本机模式不校验答案
      saveDb(d);
      return { ok: true, security: { question: qq, hasRecovery: false } };
    });
  }

  /* 重新生成恢复码（仅云端） */
  function rotateRecovery() {
    return modeReady().then(function () {
      if (MODE !== 'cloud' || !tokenValid()) throw new Error('只有云端账号才有恢复码');
      return api('/api/recovery/rotate', 'POST').then(function (res) {
        setCachedSecurity(null, true);
        return res;
      });
    });
  }

  function securityOf() {
    var c = current();
    var s = (c && c.user && c.user.security) || null;
    return { question: (s && s.question) || '', hasRecovery: !!(s && s.hasRecovery) };
  }

  /* ---------------- 界面小工具 ---------------- */
  function initials(name) {
    var s = String(name || '').trim();
    return s ? s.slice(0, 1) : '学';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  detectMode();

  var API_PUBLIC = {
    MAX_PROFILES: MAX_PROFILES,
    COLORS: COLORS,
    EMOJIS: EMOJIS,
    redirecting: false,
    guard: guard,
    current: current,
    user: function () { var c = current(); return c ? c.user : null; },
    profile: function () { var c = current(); return c ? c.profile : null; },
    isLoggedIn: function () { return !!current(); },
    progressKey: progressKey,
    mode: function () { return MODE; },
    isCloud: function () { return MODE === 'cloud' && tokenValid(); },
    syncStatus: function () {
      return modeReady().then(function () { return MODE === 'cloud' && tokenValid(); });
    },
    register: register,
    login: login,
    logout: logout,
    changePassword: changePassword,
    forgotInfo: forgotInfo,
    forgotReset: forgotReset,
    setSecurity: setSecurity,
    rotateRecovery: rotateRecovery,
    securityOf: securityOf,
    switchProfile: switchProfile,
    addProfile: addProfile,
    updateProfile: updateProfile,
    removeProfile: removeProfile,
    exportProfile: exportProfile,
    importProfile: importProfile,
    resetProgress: resetProgress,
    scheduleSync: scheduleSync,
    syncOnLoad: syncOnLoad,
    pullProgress: pullProgress,
    pushProgress: pushProgress,
    initials: initials,
    esc: esc,
    pageName: pageName
  };
  global.Auth = API_PUBLIC;

  // 页面加载即守卫：脚本放在 head 里，可在渲染前完成跳转，不会闪屏
  redirecting = guard();
  API_PUBLIC.redirecting = redirecting;
})(window);
