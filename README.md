# 🛡️ Aegis Command Center

**An ARI.Software Module for Orchestrating Local Autonomous AI Agents.**

[![Aegis Command Center Interface](https://raw.githubusercontent.com/sanYsan0/Practice-for-Hackathon/main/assets/aegis_preview.png)](https://github.com/sanYsan0/Practice-for-Hackathon)

## 🚀 The Vision

ARI is the ultimate hyper-personal workspace, but what happens when you want your workspace to *work for you*? 

**Aegis Command Center** transforms your ARI installation into a localized AI control room. Instead of just managing static notes and tasks, Aegis allows you to spawn, monitor, and orchestrate a swarm of specialized, autonomous AI agents (Coders, Web Scrapers, Data Analysts) directly from your dashboard.

No more runaway API costs. No more losing track of what your autonomous agents are doing in the background. Aegis provides total visibility and control over your local AI fleet.

## ✨ Key Features

- **🧠 Specialized Agent Swarms:** Spawn agents with customized roles (Web Scraper, Senior Developer, Deep Researcher).
- **📊 Real-Time Fleet Telemetry:** Monitor exact token burn, CPU usage, and memory consumption for every active agent in your workspace.
- **💻 Integrated Terminal:** A fluid, built-in terminal stream to monitor exactly what your agents are executing locally.
- **🎨 Hyper-Fluid UI:** Built with Framer Motion and Tailwind CSS to seamlessly match ARI's high-end, dark-mode aesthetic.
- **🔒 Secure & Self-Hosted:** Data stays in your local PostgreSQL `ari` database. No third-party servers tracking your agent prompts.

## 🛠️ Installation (For Judges & Users)

Aegis is a true "plug-and-play" ARI module. 

1. Ensure you have [ARI.Software](https://ari.software/docs/installation) installed locally.
2. Clone this repository or download the `aegis-command-center` folder.
3. Drag and drop the `aegis-command-center` folder into your `ARI/modules-custom/` directory.
4. Restart your ARI server:
   ```bash
   ./ari start
   ```
5. The ARI framework will automatically detect the `module.json`, initialize the database schemas (tracking your fleet), and inject the **Aegis Command** interface into your sidebar!

## 🧩 Built With
- **Next.js & React 19** (ARI Standard)
- **Tailwind CSS & Framer Motion** (For that buttery-smooth UI)
- **PostgreSQL / Drizzle** (For persistent agent logging)
- **Lucide Icons**

---
*Built for the ARI.Software Hackathon (Toronto Tech Week 2026).*