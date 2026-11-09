/* =========================================================
   G4 备考 · 账号与学习档案
   - 本机账号：注册 / 登录 / 改密 / 退出
   - 一个账号最多 3 个学习档案（profile），进度各自独立
   - 密码用 PBKDF2-SHA256（12 万次迭代）加盐哈希后存 localStorage
   - 所有数据只在本浏览器，不上传任何服务器
   ========================================================= */
(function (global) {
  'use strict';

  var UK = 'g4_users_v1';       // 用户表
  var SK = 'g4_session_v1';     // 登录态
  var LEGACY = 'shsid_g4_v1';   // 旧版单档案进度键（升级时自动继承）
  var MIG = 'g4_migrated_v1';   // 旧数据已迁移标记
  var MAX_PROFILES = 3;
  var SESSION_MS = 30 * 86400000; // 登录保持 30 天
  var PBKDF2_ITER = 120000;

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

  /* ---------------- 编码 / 随机 ---------------- */
  function b64(buf) {
    var a = new Uint8Array(buf), s = '';
    for (var i = 0; i < a.length; i++) s += String.fromCharCode(a[i]);
    return btoa(s);
  }
  function unb64(s) {
    var bin = atob(s), a = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
    return a;
  }
  function randB64(n) {
    var a = new Uint8Array(n), i;
    if (global.crypto && global.crypto.getRandomValues) global.crypto.getRandomValues(a);
    else for (i = 0; i < n; i++) a[i] = Math.floor(Math.random() * 256);
    return b64(a);
  }

  /* ---------------- 密码哈希 ---------------- */
  function canWebCrypto() {
    return !!(global.crypto && global.crypto.subtle && global.crypto.subtle.importKey && global.TextEncoder);
  }
  // 仅在无 WebCrypto（极旧浏览器 / 非安全上下文）时降级
  function weakHash(pw, salt) {
    var s = salt + '|' + pw, h1 = 0x811c9dc5 >>> 0, h2 = 0x1b873593 >>> 0;
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      h1 = (h1 ^ c) >>> 0; h1 = Math.imul(h1, 16777619) >>> 0;
      h2 = (h2 + c * (i + 7)) >>> 0; h2 = ((h2 << 13) | (h2 >>> 19)) >>> 0;
    }
    return 'w' + h1.toString(16) + h2.toString(16) + '-' + s.length.toString(16);
  }
  function hashPw(pw, salt, iter) {
    if (!canWebCrypto()) return Promise.resolve({ h: weakHash(pw, salt), algo: 'weak' });
    var enc = new TextEncoder();
    return global.crypto.subtle
      .importKey('raw', enc.encode(pw), { name: 'PBKDF2' }, false, ['deriveBits'])
      .then(function (key) {
        return global.crypto.subtle.deriveBits(
          { name: 'PBKDF2', salt: unb64(salt), iterations: iter || PBKDF2_ITER, hash: 'SHA-256' },
          key, 256);
      })
      .then(function (bits) { return { h: b64(bits), algo: 'pbkdf2' }; })
      .catch(function () { return { h: weakHash(pw, salt), algo: 'weak' }; });
  }

  /* ---------------- 用户表 ---------------- */
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

  /* ---------------- 注册 / 登录 ---------------- */
  function register(login, password, display) {
    return new Promise(function (resolve, reject) {
      var u = norm(login);
      if (!validLogin(u)) return reject(new Error('账号需 3–24 位，可用字母、数字、中文或 _ @ . + -'));
      if (String(password).length < 6) return reject(new Error('密码至少 6 位'));
      if (findByLogin(u)) return reject(new Error('这个账号已经注册过了，直接登录即可'));
      var salt = randB64(16);
      hashPw(password, salt, PBKDF2_ITER).then(function (r) {
        var d = db();
        var p = newProfile('档案 1', 0);
        var rec = {
          id: uid('u_'), username: u, name: String(display || '').trim().slice(0, 20) || login,
          salt: salt, iter: PBKDF2_ITER, algo: r.algo, hash: r.h,
          createdAt: now(), lastLogin: now(), lastPid: p.id, profiles: [p]
        };
        d.users[rec.id] = rec;
        if (!saveDb(d)) return reject(new Error('浏览器存储不可用（可能是无痕模式），请换普通窗口再试'));
        migrateLegacy(p.id);
        setSession(rec.id, p.id);
        resolve(rec);
      }, reject);
    });
  }

  function login(login, password) {
    return new Promise(function (resolve, reject) {
      var rec = findByLogin(login);
      if (!rec) return reject(new Error('找不到这个账号，先注册一个吧'));
      hashPw(password, rec.salt, rec.iter).then(function (r) {
        if (r.h !== rec.hash) return reject(new Error('密码不对，再试一次'));
        var d = db(), u = d.users[rec.id];
        if (!u) return reject(new Error('账号数据已损坏，请重新注册'));
        u.lastLogin = now();
        var pid = u.lastPid, ok = false;
        u.profiles.forEach(function (p) { if (p.id === pid) ok = true; });
        if (!ok) pid = u.profiles[0].id;
        u.lastPid = pid;
        saveDb(d);
        setSession(u.id, pid);
        resolve(u);
      }, reject);
    });
  }

  function changePassword(oldPw, newPw) {
    return new Promise(function (resolve, reject) {
      var c = current();
      if (!c) return reject(new Error('请先登录'));
      if (String(newPw).length < 6) return reject(new Error('新密码至少 6 位'));
      hashPw(oldPw, c.user.salt, c.user.iter).then(function (r) {
        if (r.h !== c.user.hash) return reject(new Error('原密码不对'));
        var salt = randB64(16);
        return hashPw(newPw, salt, PBKDF2_ITER).then(function (nr) {
          var d = db(), u = d.users[c.user.id];
          u.salt = salt; u.iter = PBKDF2_ITER; u.algo = nr.algo; u.hash = nr.h;
          saveDb(d);
          resolve(true);
        });
      }).catch(reject);
    });
  }

  function logout() { del(SK); }

  /* ---------------- 档案管理 ---------------- */
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
    return true;
  }

  function addProfile(name) {
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
    return true;
  }

  function removeProfile(pid, wipe) {
    var c = current();
    if (!c) return false;
    var d = db(), u = d.users[c.user.id];
    if (u.profiles.length <= 1) throw new Error('至少要保留 1 个档案');
    var idx = -1;
    u.profiles.forEach(function (p, i) { if (p.id === pid) idx = i; });
    if (idx < 0) return false;
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
  }

  /* ---------------- 数据导入 / 导出 ---------------- */
  function exportProfile(pid) {
    var c = current();
    return {
      app: 'g4-prep', v: 1, exportedAt: new Date().toISOString(),
      profile: c ? c.profile.name : '',
      progress: readJSON(progressKey(pid), {})
    };
  }
  function importProfile(pid, obj) {
    if (!obj || typeof obj !== 'object') throw new Error('文件格式不对');
    var prog = obj.progress || obj;
    if (!prog.answers && !prog.startDate) throw new Error('这个文件里没有学习记录');
    writeJSON(progressKey(pid), prog);
    return true;
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

  var API = {
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
    register: register,
    login: login,
    logout: logout,
    changePassword: changePassword,
    switchProfile: switchProfile,
    addProfile: addProfile,
    updateProfile: updateProfile,
    removeProfile: removeProfile,
    exportProfile: exportProfile,
    importProfile: importProfile,
    initials: initials,
    esc: esc,
    pageName: pageName
  };
  global.Auth = API;

  // 页面加载即守卫：脚本放在 head 里，可在渲染前完成跳转，不会闪屏
  redirecting = guard();
  API.redirecting = redirecting;
})(window);
