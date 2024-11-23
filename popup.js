document.getElementById("extract").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                files: ["content.js"]
            },
            () => {
                console.log("Content script injected.");
            }
        );
    });
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "copyText") {
        const resultDiv = document.getElementById("result");

        if (message.data) {
            // Uložit do schránky
            navigator.clipboard.writeText(message.data)
                .then(() => {
                    resultDiv.textContent = "Text byl úspěšně zkopírován do schránky!";
                })
                .catch(err => {
                    console.error("Failed to copy:", err);
                    resultDiv.textContent = "Nepodařilo se zkopírovat text do schránky.";
                });
        } else {
            resultDiv.textContent = "Žádný transkript nebyl nalezen.";
        }
    }
});
