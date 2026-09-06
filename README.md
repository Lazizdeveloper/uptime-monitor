<div align="center">

# 🌐 GitOps Uptime & Infrastructure Monitor

[![Daily Healthcheck](https://github.com/Lazizdeveloper/uptime-monitor/actions/workflows/monitor.yml/badge.svg)](https://github.com/Lazizdeveloper/uptime-monitor/actions)
![Status](https://img.shields.io/badge/Status-Automated-success?style=flat-square)
![Architecture](https://img.shields.io/badge/Architecture-Serverless%20GitOps-blue?style=flat-square)

**Serverless infratuzilma va API servislari monitoring tizimi. GitHub Actions orqali avtomatik tarzda har kuni monitoring o'tkaziladi va natijalar GitOps tamoyili bo'yicha repozitoriyada qayd etiladi.**

</div>

---

### 📊 Jonli Xizmatlar Holati (Live Status)

> **Oxirgi tekshiruv vaqti:** `2026-09-06 16:15:24 (UTC+5)`

| Servis | URL | Holati | HTTP Status | Javob tezligi |
| :--- | :--- | :---: | :---: | :---: |
| **Safaar Production API** | `https://api.safaar.uz/v1/health` | 🟢 Operational | `200` | `1573ms` |
| **GitHub Public API** | `https://api.github.com` | 🟢 Operational | `200` | `20ms` |
| **Cloudflare DNS** | `https://1.1.1.1` | 🟢 Operational | `200` | `65ms` |

---

### ⚙️ Tizim Qanday Ishlaydi?

1. **Avtomatlashtirilgan tekshiruv:** GitHub Actions har kuni belgilangan vaqtda (Cron: 09:00 Toshkent vaqti) `sites.json` dagi servislarning sog'lomligini (Healthcheck) tekshiradi.
2. **GitOps Logs:** Tekshiruv natijalari, javob vaqti (latency) va status kodlari avtomatik tarzda ushbu `README.md` va `history/summary.json` ga commit qilinadi.
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
