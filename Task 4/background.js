let currentSite = "";
let startTime = Date.now();

chrome.tabs.onActivated.addListener(() => {
  trackTime();
});

chrome.tabs.onUpdated.addListener(() => {
  trackTime();
});

function trackTime() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0] || !tabs[0].url) return;

    const url = new URL(tabs[0].url);
    const hostname = url.hostname;

    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000);

    chrome.storage.local.get(["usage"], (result) => {
      let usage = result.usage || {};

      if (currentSite) {
        usage[currentSite] = (usage[currentSite] || 0) + timeSpent;
      }

      chrome.storage.local.set({ usage });
    });

    currentSite = hostname;
    startTime = Date.now();
  });
}