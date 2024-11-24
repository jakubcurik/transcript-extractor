chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && tab.url.includes("app.fireflies.ai/view")) {
        chrome.scripting.executeScript({
            target: { tabId },
            files: ["content.js"]
        });
        console.log("Content script injected into tab:", tabId);
    }
});
