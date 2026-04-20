chrome.storage.local.get(["usage"], (result) => {
  const usage = result.usage || {};
  const report = document.getElementById("report");

  const productive = ["github.com", "leetcode.com", "stackoverflow.com"];
  const unproductive = ["youtube.com", "facebook.com", "instagram.com"];

  for (let site in usage) {
    let status = "Neutral";

    if (productive.includes(site)) status = "Productive";
    if (unproductive.includes(site)) status = "Unproductive";

    report.innerHTML += `
      <p>
        <strong>${site}</strong><br>
        ${usage[site]} sec - ${status}
      </p>
    `;
  }
});