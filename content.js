console.log("Content script loaded.");

function addDownloadButton() {
    const editTranscriptButton = document.querySelector('[aria-label="edit-transcript"]');
    
    if (!editTranscriptButton) {
        console.log("Edit transcript button not found.");
        return;
    }

    if (document.getElementById("transcript-download-btn")) {
        console.log("Download button already exists.");
        return;
    }

    // Vytvoření tlačítka
    const downloadButton = document.createElement("button");
    downloadButton.id = "transcript-download-btn";
    downloadButton.setAttribute("aria-label", "download-transcript");
    downloadButton.className = "sc-ab2bc805-1 CzHqv defaultNeutral sm single";
    downloadButton.innerHTML = `  
        <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 24 24" id="Copy-Paste-1--Streamline-Streamline-3.0" height="18" width="18">
            <desc>Copy Paste 1 Streamline Icon: https://streamlinehq.com</desc>
            <defs></defs>
            <title>copy-paste-1</title>
            <path d="M8.708333333333332 20.625h-7.333333333333333a0.9166666666666666 0.9166666666666666 0 0 1 -0.9166666666666666 -0.9166666666666666v-15.583333333333332a0.9166666666666666 0.9166666666666666 0 0 1 0.9166666666666666 -0.9166666666666666h3.6666666666666665" fill="none" stroke="#475467" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <path d="M12.375 3.208333333333333h3.6666666666666665a0.9166666666666666 0.9166666666666666 0 0 1 0.9166666666666666 0.9166666666666666V7.333333333333333" fill="none" stroke="#475467" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <path d="M10.541666666666666 2.2916666666666665a1.8333333333333333 1.8333333333333333 0 0 0 -3.6666666666666665 0h-1.8333333333333333v2.75h7.333333333333333v-2.75Z" fill="none" stroke="#475467" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <path d="M20.625 20.625a0.9166666666666666 0.9166666666666666 0 0 1 -0.9166666666666666 0.9166666666666666h-8.25a0.9166666666666666 0.9166666666666666 0 0 1 -0.9166666666666666 -0.9166666666666666V10.083333333333332a0.9166666666666666 0.9166666666666666 0 0 1 0.9166666666666666 -0.9166666666666666h6.4955a0.9166666666666666 0.9166666666666666 0 0 1 0.6480833333333332 0.2685833333333333l1.7545 1.7545a0.9166666666666666 0.9166666666666666 0 0 1 0.2685833333333333 0.6480833333333332Z" fill="none" stroke="#475467" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <path d="m13.291666666666666 13.29075 4.583333333333333 0" fill="none" stroke="#475467" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <path d="m13.291666666666666 16.04075 4.583333333333333 0" fill="none" stroke="#475467" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
    `;

    // Přidání akce pro tlačítko
    downloadButton.addEventListener("click", () => {
        console.log("Download button clicked.");
        const transcriptSection = document.querySelector('[class*="transcriptContent"]');
        if (!transcriptSection) {
            console.error("Transcript section not found.");
            alert("Transkript nebyl nalezen.");
            return;
        }

        const transcriptData = [];
        transcriptSection.querySelectorAll('[class*="paragraph-root"]').forEach(paragraph => {
            const speaker = paragraph.querySelector('[class*="name"]')?.innerText.trim() || "Unknown";
            const time = paragraph.querySelector('[class*="hpStnn"]')?.innerText.trim() || "Unknown time";
            const sentences = Array.from(paragraph.querySelectorAll('[class*="transcript-sentence"] span')).map(
                span => span.innerText.trim()
            ).join(" ");
            
            transcriptData.push(`${speaker} (${time}): ${sentences}`);
        });

        const transcriptText = transcriptData.join("\n\n");
        navigator.clipboard.writeText(transcriptText).then(() => {
            console.log("Transcript copied to clipboard.");
            alert("Transkript byl zkopírován do schránky.");
        }).catch(err => {
            console.error("Failed to copy transcript:", err);
            alert("Nepodařilo se zkopírovat transkript.");
        });
    });

    // Přidání tlačítka na stránku
    editTranscriptButton.parentNode.insertBefore(downloadButton, editTranscriptButton);
    console.log("Download button added to the page.");
}

// Funkce pro pozorování změn na stránce
function observePageChanges() {
    const observer = new MutationObserver(() => {
        console.log("Page content changed. Attempting to add button...");
        addDownloadButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    console.log("Observer initialized.");
}

// Spustit přidání tlačítka a pozorovatele
addDownloadButton();
observePageChanges();
