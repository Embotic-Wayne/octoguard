# 🐙 OctoGuard – AI-Powered Phishing & Scam Detector

OctoGuard is a browser extension + backend service that helps non-technical users detect **phishing links** and **scam messages** in one click. It analyzes URLs and text, returns a **risk score**, and explains why something looks suspicious, inspired by the intelligent multitasking spirit of an octopus.

> Built for Octopus Hackathon – coding with purpose and tentacles-wide creativity.

---

## 🚀 Features

- 🔍 Analyze the **current tab URL** directly from the browser extension
- 🧪 Paste **suspicious links or messages** for instant analysis
- 🧠 **Heuristic-based risk scoring** (URL length, keywords, suspicious characters, urgency, etc.)
- 🟢 Risk labels: `safe`, `suspicious`, `phishy`
- 📋 Human-readable **reasons and explanations** for each decision
- 🌐 Simple **Node.js + Express backend** that can later be extended with real AI (OpenAI)

---

## 🧱 Architecture

- **Frontend:** Chrome Extension (Manifest V3) with a popup UI
- **Backend:** Node.js + Express REST API (`/analyze`)
- **Communication:** Extension sends POST requests to `http://localhost:4000/analyze`
- **Extensibility:** Ready for integration with OpenAI or other ML models

---

## 🛠 Tech Stack

- **Backend**
  - Node.js
  - Express
  - CORS
  - dotenv
  - (Optional) OpenAI SDK for AI-powered analysis

- **Frontend (Extension)**
  - Chrome Extension (Manifest V3)
  - HTML, CSS, JavaScript

---

## 🧩 Backend Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/Embotic-Wayne/octoguard.git
   cd octoguard/backend
