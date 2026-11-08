/* =========================================================
   G4 15天备考 · 站点核心
   纯前端：进度存 localStorage，无后端、无账号
   ========================================================= */
(function (global) {
  'use strict';

  var DAYS = global.DAYS || [];
  var SUBJ = { eng: '英语', math: '数学', chi: '语文' };
  var DB = 'shsid_g4_v1';          // 与旧版一致，升级不丢进度
  var TOTAL_DAYS = 15;

  /* ---------- 基础工具 ---------- */
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var fmtD = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var parseD = function (s) { var p = String(s).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); };
  var addDays = function (s, n) { var d = parseD(s); d.setDate(d.getDate() + n); return fmtD(d); };
  var diffDays = function (a, b) { return Math.round((parseD(b) - parseD(a)) / 86400000); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ---------- 存储 ---------- */
  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(DB) || '{}') || {}; } catch (e) { s = {}; }
    var t = fmtD(new Date());
    var base = {
      startDate: t, examDate: addDays(t, TOTAL_DAYS), reminderTime: '19:30',
      answers: {}, lastRemind: '', notif: false, name: '', createdAt: t
    };
    return Object.assign(base, s);
  }
  var S = load();
  function save() { try { localStorage.setItem(DB, JSON.stringify(S)); } catch (e) {} }

  /* ---------- 进度计算 ---------- */
  function todayIdx() {
    var n = diffDays(S.startDate, fmtD(new Date())) + 1;
    return clamp(n, 1, TOTAL_DAYS);
  }
  function dayNo(d) { return +String(d).split('-')[0]; }
  function isOutput(a) { return !!(a && a.v === 'done'); }

  function dayScore(d) {
    var day = DAYS[d - 1];
    if (!day) return { ok: 0, all: 0, ans: 0, pct: 0 };
    var ok = 0, ans = 0;
    day.questions.forEach(function (q, i) {
      var a = S.answers[d + '-' + i];
      if (a && !isOutput(a)) { ans++; if (a.ok) ok++; }
    });
    return { ok: ok, all: day.questions.length, ans: ans, pct: ans ? Math.round(ok / ans * 100) : 0 };
  }
  function dayDone(d) {
    var day = DAYS[d - 1];
    if (!day) return false;
    return day.questions.every(function (q, i) { return !!S.answers[d + '-' + i]; });
  }
  function totalStats() {
    var ok = 0, ans = 0, all = 0, done = 0;
    DAYS.forEach(function (d) {
      all += d.questions.length;
      var s = dayScore(d.day);
      ok += s.ok; ans += s.ans;
      if (dayDone(d.day)) done++;
    });
    return { ok: ok, ans: ans, all: all, done: done, pct: ans ? Math.round(ok / ans * 100) : 0 };
  }
  function subjectStats() {
    var map = { eng: [0, 0], math: [0, 0], chi: [0, 0] };
    DAYS.forEach(function (day) {
      day.questions.forEach(function (q, i) {
        var a = S.answers[day.day + '-' + i];
        if (!a || isOutput(a)) return;
        if (!map[q.subject]) map[q.subject] = [0, 0];
        map[q.subject][1]++;
        if (a.ok) map[q.subject][0]++;
      });
    });
    return map;
  }
  function skillStats() {
    var map = {};
    DAYS.forEach(function (day) {
      day.questions.forEach(function (q, i) {
        var a = S.answers[day.day + '-' + i];
        if (!a || isOutput(a)) return;
        var k = SUBJ[q.subject] + '·' + (q.skill || '综合');
        if (!map[k]) map[k] = { ok: 0, all: 0, subj: q.subject };
        map[k].all++; if (a.ok) map[k].ok++;
      });
    });
    return map;
  }
  function wrongItems() {
    var items = [];
    DAYS.forEach(function (day) {
      day.questions.forEach(function (q, i) {
        var a = S.answers[day.day + '-' + i];
        if (a && !a.ok) items.push({ day: day.day, i: i, q: q, a: a });
      });
    });
    return items;
  }
  function streak() {
    var c = 0;
    for (var d = todayIdx(); d >= 1; d--) {
      if (dayDone(d)) c++; else break;
    }
    return c;
  }

  /* ---------- 图标 ---------- */
  var IC = {
    home: '<svg viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>',
    plan: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
    quiz: '<svg viewBox="0 0 24 24"><path d="M6 3.5h9l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"/><path d="M14.5 3.5v4.5H19M8.5 12h7M8.5 16h4"/></svg>',
    wrong: '<svg viewBox="0 0 24 24"><path d="M12 3.6 21 19.4H3z"/><path d="M12 9.5v4.2M12 16.6v.1"/></svg>',
    report: '<svg viewBox="0 0 24 24"><path d="M4 20V9M10 20V4M16 20v-7M22 20H2"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 10.6v5.6M12 7.6v.1"/></svg>',
    back: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M15 5l-7 7 7 7"/></svg>',
    share: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 16V4M8 8l4-4 4 4M5 14v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"/></svg>'
  };

  /* ---------- 导航 ---------- */
  var NAV = [
    { key: 'home', href: 'index.html', label: '首页', tab: '首页' },
    { key: 'plan', href: 'plan.html', label: '15 天计划', tab: '15天' },
    { key: 'quiz', href: 'quiz.html', label: '今日练习', tab: '' },
    { key: 'wrong', href: 'wrong.html', label: '错题本', tab: '错题' },
    { key: 'report', href: 'report.html', label: '学习报告', tab: '报告' },
    { key: 'info', href: 'info.html', label: '资料与设置', tab: '资料' }
  ];

  function countdown() {
    var left = diffDays(fmtD(new Date()), S.examDate);
    return left < 0 ? 0 : left;
  }

  function renderChrome(active) {
    var head = document.getElementById('site-head');
    if (head) {
      var links = NAV.filter(function (n) { return n.key !== 'quiz'; }).map(function (n) {
        return '<a href="' + n.href + '" class="' + (n.key === active ? 'on' : '') + '">' + n.label + '</a>';
      }).join('');
      head.innerHTML =
        '<div class="wrap">' +
          '<a class="logo" href="index.html">G4 <b>15 天备考</b></a>' +
          '<nav class="site-nav">' + links + '</nav>' +
          '<div class="head-right">' +
            '<span class="cd-chip">距考试 <b>' + countdown() + '</b> 天</span>' +
            '<a class="btn sm head-cta" href="quiz.html?day=' + todayIdx() + '">开始今天</a>' +
          '</div>' +
        '</div>';
    }
    var tab = document.getElementById('site-tabbar');
    if (tab) {
      var items = [
        ['home', 'index.html', '首页', IC.home],
        ['plan', 'plan.html', '15天', IC.plan],
        ['wrong', 'wrong.html', '错题', IC.wrong],
        ['report', 'report.html', '报告', IC.report],
        ['info', 'info.html', '资料', IC.info]
      ];
      tab.innerHTML = items.map(function (it) {
        return '<a href="' + it[1] + '" class="' + (it[0] === active ? 'on' : '') + '">' + it[3] + '<span>' + it[2] + '</span></a>';
      }).join('');
    }
    var y = document.getElementById('foot-year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- 提示 ---------- */
  var toastTimer = null;
  function toast(msg) {
    var old = document.querySelector('.toast');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.style.transition = '.3s'; t.style.opacity = '0';
      setTimeout(function () { t.remove(); }, 320);
    }, 2400);
  }

  /* ---------- 日历导出 ---------- */
  function icsLines(neutral) {
    var title = (neutral === false ? 'G4 备考' : 'G4 15天备考');
    var lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//G4 15Day Prep//CN',
      'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'X-WR-CALNAME:' + title + ' · 每日练习',
      'X-WR-TIMEZONE:Asia/Shanghai'
    ];
    var stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    var hm = String(S.reminderTime || '19:30').split(':');
    var hh = +hm[0], mm = +hm[1];
    DAYS.forEach(function (d) {
      var date = addDays(S.startDate, d.day - 1).replace(/-/g, '');
      var em = mm + 40, eh = hh;
      if (em >= 60) { eh += 1; em -= 60; }
      var desc = '今天 ' + d.questions.length + ' 题（英语/数学/语文）+ 1 个输出任务，约 ' + d.minutes +
        ' 分钟。\\n重点：' + d.focus.join('、') + '\\n做完记得看错题。';
      lines.push('BEGIN:VEVENT');
      lines.push('UID:g4prep-' + d.day + '-' + date + '@local');
      lines.push('DTSTAMP:' + stamp);
      lines.push('DTSTART:' + date + 'T' + pad(hh) + pad(mm) + '00');
      lines.push('DTEND:' + date + 'T' + pad(eh % 24) + pad(em) + '00');
      lines.push('SUMMARY:' + title + ' · Day ' + d.day + '｜' + d.title);
      lines.push('DESCRIPTION:' + desc.replace(/,/g, '\\,'));
      lines.push('LOCATION:书桌前');
      lines.push('BEGIN:VALARM');
      lines.push('TRIGGER:-PT5M');
      lines.push('ACTION:DISPLAY');
      lines.push('DESCRIPTION:还有 5 分钟开始今天的练习');
      lines.push('END:VALARM');
      lines.push('END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    return lines;
  }

  function exportICS() {
    var lines = icsLines();
    var blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'G4-15天备考-提醒.ics';
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    toast('日历文件已下载：用手机「日历」打开即可导入 15 天提醒');
  }

  /* ---------- 通知 ---------- */
  function notifState() {
    if (!('Notification' in window)) return 'unsupported';
    if (Notification.permission === 'granted' && S.notif) return 'on';
    if (Notification.permission === 'denied') return 'denied';
    return 'off';
  }
  function enableNotif() {
    if (!('Notification' in window)) { toast('当前浏览器不支持系统通知，请用「导出日历」'); return; }
    Notification.requestPermission().then(function (p) {
      S.notif = (p === 'granted'); save();
      toast(p === 'granted' ? '已开启：页面打开时到点提醒' : '未授权通知，可改用日历提醒');
      setTimeout(function () { location.reload(); }, 800);
    });
  }
  function checkReminder() {
    if (!S.reminderTime) return;
    var now = new Date();
    var hm = pad(now.getHours()) + ':' + pad(now.getMinutes());
    if (hm !== S.reminderTime) return;
    if (S.lastRemind === fmtD(now)) return;
    S.lastRemind = fmtD(now); save();
    var d = todayIdx(), day = DAYS[d - 1];
    if (!day) return;
    if (S.notif && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('第 ' + d + ' 天 · ' + day.title, {
          body: '今天 ' + day.questions.length + ' 题，约 ' + day.minutes + ' 分钟。点开开始。',
          tag: 'g4-prep', icon: 'assets/img/icon-192.png'
        });
      } catch (e) {}
    }
    if (document.body.getAttribute('data-page') !== 'quiz') {
      toast('该做今天的题了：第 ' + d + ' 天 · ' + day.title);
    }
  }
  function startReminder() {
    setInterval(checkReminder, 20000);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) checkReminder();
    });
  }

  /* ---------- 分享编码（家长报告） ---------- */
  function b64enc(str) {
    return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64dec(str) {
    var s = str.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    return decodeURIComponent(escape(atob(s)));
  }
  function reportPayload() {
    var t = totalStats(), sub = subjectStats();
    var days = [];
    for (var i = 1; i <= TOTAL_DAYS; i++) {
      var s = dayScore(i);
      days.push(s.ans ? [s.ok, s.ans] : [0, 0]);
    }
    var weak = [];
    var sk = skillStats();
    Object.keys(sk).sort(function (a, b) {
      var ra = sk[a].all >= 2 ? sk[a].ok / sk[a].all : 2, rb = sk[b].all >= 2 ? sk[b].ok / sk[b].all : 2;
      return ra - rb;
    }).forEach(function (k) {
      if (sk[k].all >= 2 && sk[k].ok / sk[k].all < 0.7 && weak.length < 4) weak.push(k);
    });
    return {
      v: 1,
      n: S.name || '',
      d: days,
      s: [sub.eng[0], sub.eng[1], sub.math[0], sub.math[1], sub.chi[0], sub.chi[1]],
      w: weak,
      t: fmtD(new Date())
    };
  }
  function encodeReport() { return b64enc(JSON.stringify(reportPayload())); }
  function decodeReport(str) {
    try { var o = JSON.parse(b64dec(str)); return (o && o.v === 1) ? o : null; } catch (e) { return null; }
  }
  function shareReport() {
    var code = encodeReport();
    var url = location.origin + location.pathname.replace(/[^/]*$/, '') + 'report.html?r=' + code;
    if (navigator.share) {
      navigator.share({ title: '学习报告', text: '这是孩子最近 15 天备考的正确率报告：', url: url })
        .catch(function () { copy(url); });
    } else { copy(url); }
    return url;
  }
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('报告链接已复制，可发给家长查看'); },
        function () { fallbackCopy(text); });
    } else { fallbackCopy(text); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;top:-999px;opacity:0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('报告链接已复制，可发给家长查看'); }
    catch (e) { prompt('复制下面的链接发给家长：', text); }
    ta.remove();
  }

  /* ---------- 导出 ---------- */
  global.App = {
    DAYS: DAYS, SUBJ: SUBJ, S: S, DB: DB, TOTAL_DAYS: TOTAL_DAYS,
    pad: pad, fmtD: fmtD, parseD: parseD, addDays: addDays, diffDays: diffDays, esc: esc, clamp: clamp,
    save: save, reload: function () { S = load(); global.App.S = S; },
    todayIdx: todayIdx, dayScore: dayScore, dayDone: dayDone, totalStats: totalStats,
    subjectStats: subjectStats, skillStats: skillStats, wrongItems: wrongItems, streak: streak,
    countdown: countdown, renderChrome: renderChrome, toast: toast,
    exportICS: exportICS, enableNotif: enableNotif, notifState: notifState,
    startReminder: startReminder, checkReminder: checkReminder,
    encodeReport: encodeReport, decodeReport: decodeReport, shareReport: shareReport,
    copy: copy, reportPayload: reportPayload, IC: IC, NAV: NAV
  };

  if (document.readyState !== 'loading') { ready(); }
  else document.addEventListener('DOMContentLoaded', ready);

  function ready() {
    var page = document.body.getAttribute('data-page') || '';
    renderChrome(page);
    startReminder();
  }
})(window);
