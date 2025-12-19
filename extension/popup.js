const backendUrl = "http://localhost:4000/analyze";

function renderResult(data) {
  const resultDiv = document.getElementById("result");
  if (data.error) {
    resultDiv.innerHTML = `<p style="color:red;">Error: ${data.error}</p>`;
    return;
  }

  let riskClass = "risk-safe";
  if (data.label === "suspicious") riskClass = "risk-suspicious";
  if (data.label === "phishy") riskClass = "risk-phishy";

  resultDiv.innerHTML = `
    <p><strong>Label:</strong> <span class="${riskClass}">${
    data.label
  }</span></p>
    <p><strong>Score:</strong> ${data.score}</p>
    <p><strong>Reasons:</strong> ${data.reasons.join(", ") || "N/A"}</p>
    <p><strong>Explanation:</strong> ${data.explanation}</p>
  `;
}

document.getElementById("analyze-tab").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;

  const res = await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();
  renderResult(data);
});

document.getElementById("analyze-text").addEventListener("click", async () => {
  const text = document.getElementById("input-text").value.trim();
  if (!text) return;

  // Simple guess: if it looks like a URL, treat as URL, otherwise message
  const looksLikeUrl =
    text.startsWith("http://") || text.startsWith("https://");

  const body = looksLikeUrl ? { url: text } : { message: text };

  const res = await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  renderResult(data);
});
