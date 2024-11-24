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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 24 24" id="Download-Thick-Bottom--Streamline-Streamline-3.0" height="18" width="18">
            <desc>Download Thick Bottom Streamline Icon: https://streamlinehq.com</desc>
            <defs></defs>
            <title>download-thick-bottom</title>
            <path d="M5.041666666666666 10.541666666666666c-0.2520833333333333 0 -0.3125833333333333 0.14575 -0.13383333333333333 0.32449999999999996l5.767666666666666 5.768583333333333a0.4583333333333333 0.4583333333333333 0 0 0 0.6499166666666666 0l5.785083333333333 -5.752083333333333c0.18333333333333335 -0.17691666666666667 0.11916666666666667 -0.3235833333333333 -0.13291666666666666 -0.32541666666666663L14.208333333333332 10.541666666666666v-9.166666666666666a0.9166666666666666 0.9166666666666666 0 0 0 -0.9166666666666666 -0.9166666666666666h-4.583333333333333a0.9166666666666666 0.9166666666666666 0 0 0 -0.9166666666666666 0.9166666666666666V10.083333333333332a0.4583333333333333 0.4583333333333333 0 0 1 -0.4583333333333333 0.4583333333333333Z" fill="none" stroke="#475467" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <path d="M21.541666666666664 16.958333333333332v3.6666666666666665a0.9166666666666666 0.9166666666666666 0 0 1 -0.9166666666666666 0.9166666666666666h-19.25a0.9166666666666666 0.9166666666666666 0 0 1 -0.9166666666666666 -0.9166666666666666v-3.6666666666666665" fill="none" stroke="#475467" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
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
