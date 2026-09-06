const fs = require('fs');
const path = require('path');

const SITES_FILE = path.join(__dirname, '..', 'sites.json');
const README_FILE = path.join(__dirname, '..', 'README.md');
const HISTORY_FILE = path.join(__dirname, '..', 'history', 'summary.json');

async function checkSite(site) {
  const urls = [site.url, site.fallbackUrl].filter(Boolean);
  let lastError = null;

  for (const url of urls) {
    const start = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: { 'User-Agent': 'GitOps-Uptime-Monitor/1.0' }
      });
      clearTimeout(timeoutId);

      const latency = Date.now() - start;
      const ok = res.status >= 200 && res.status < 400;

      return {
        name: site.name,
        url,
        status: ok ? '🟢 Operational' : '🟡 Degraded',
        statusCode: res.status,
        latency: `${latency}ms`,
        ok
      };
    } catch (err) {
      lastError = err;
    }
  }

  return {
    name: site.name,
    url: site.url,
    status: '🔴 Outage',
    statusCode: 'Error',
    latency: 'Timeout',
    ok: false
  };
}

async function run() {
  const sites = JSON.parse(fs.readFileSync(SITES_FILE, 'utf-8'));
  const results = [];

  for (const site of sites) {
    const res = await checkSite(site);
    results.push(res);
  }

  const now = new Date();
  const tashkentTime = new Date(now.getTime() + (5 * 60 * 60 * 1000))
    .toISOString()
    .replace('T', ' ')
    .substring(0, 19) + ' (UTC+5)';

  // Save to history
  let history = [];
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    } catch (_) {}
  }
  history.unshift({ checkedAt: tashkentTime, results });
  if (history.length > 50) history = history.slice(0, 50);
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

  // Generate Table
  let tableRows = results.map(r => 
    `| **${r.name}** | \`${r.url}\` | ${r.status} | \`${r.statusCode}\` | \`${r.latency}\` |`
  ).join('\n');

  const content = `<div align="center">

# 🌐 GitOps Uptime & Infrastructure Monitor

[![Daily Healthcheck](https://github.com/Lazizdeveloper/uptime-monitor/actions/workflows/monitor.yml/badge.svg)](https://github.com/Lazizdeveloper/uptime-monitor/actions)
![Status](https://img.shields.io/badge/Status-Automated-success?style=flat-square)
![Architecture](https://img.shields.io/badge/Architecture-Serverless%20GitOps-blue?style=flat-square)

**Serverless infratuzilma va API servislari monitoring tizimi. GitHub Actions orqali avtomatik tarzda har kuni monitoring o'tkaziladi va natijalar GitOps tamoyili bo'yicha repozitoriyada qayd etiladi.**

</div>

---

### 📊 Jonli Xizmatlar Holati (Live Status)

> **Oxirgi tekshiruv vaqti:** \`${tashkentTime}\`

| Servis | URL | Holati | HTTP Status | Javob tezligi |
| :--- | :--- | :---: | :---: | :---: |
${tableRows}

---

### ⚙️ Tizim Qanday Ishlaydi?

1. **Avtomatlashtirilgan tekshiruv:** GitHub Actions har kuni belgilangan vaqtda (Cron: 09:00 Toshkent vaqti) \`sites.json\` dagi servislarning sog'lomligini (Healthcheck) tekshiradi.
2. **GitOps Logs:** Tekshiruv natijalari, javob vaqti (latency) va status kodlari avtomatik tarzda ushbu \`README.md\` va \`history/summary.json\` ga commit qilinadi.
3. **Kuzatuv:** Serverlarda uzilish (outage) yoki sekinlashuv bo'lsa, commitlar tarixi orqali muammo qachon boshlanganini aniqlash mumkin.

---

### 🛠 Foydalanilgan Vositalar

* **Muhit:** GitHub Actions (Cron Scheduler)
* **Til:** Node.js (Asinxron Fetch & Latency profiler)
* **Tamoyil:** GitOps & Serverless Status Page

---
<div align="center">
  Ishlab chiquvchi: <strong><a href="https://github.com/Lazizdeveloper">Laziz Shakarov</a></strong>
</div>
`;

  fs.writeFileSync(README_FILE, content);
  console.log(`Updated README.md at ${tashkentTime}`);
}

run().catch(console.error);
/* Metric check 4 */
/* Metric check 5 */
/* Metric check 6 */
