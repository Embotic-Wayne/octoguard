// backend/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple heuristic-based phishing analysis
app.post("/analyze", async (req, res) => {
  const { url, message } = req.body;

  if (!url && !message) {
    return res.status(400).json({ error: "url or message is required" });
  }

  let score = 0;
  const reasons = [];

  if (url) {
    if (url.length > 80) {
      score += 20;
      reasons.push("Long URL length");
    }
    if (url.includes("@") || url.includes("xn--")) {
      score += 20;
      reasons.push("Suspicious URL characters");
    }
    if (/(login|verify|reset|account)/i.test(url)) {
      score += 20;
      reasons.push("Sensitive keywords in URL");
    }
  }

  if (message) {
    if (/(password|bank|urgent|verify|click now|gift card)/i.test(message)) {
      score += 25;
      reasons.push("Urgent or sensitive language in message");
    }
  }

  if (score > 100) score = 100;

  let label = "safe";
  if (score >= 70) label = "phishy";
  else if (score >= 40) label = "suspicious";

  return res.json({
    url: url || null,
    message: message || null,
    score,
    label,
    reasons,
    explanation: "Heuristic-only analysis for now.",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`OctoGuard backend running on http://localhost:${PORT}`);
});
