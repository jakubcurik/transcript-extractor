if (!window.transcriptExtractor) {
    window.transcriptExtractor = true;

    // Najít kontejner transkriptu podle jeho třídy
    const transcriptSection = document.querySelector('[class*="transcriptContent"]');
    if (transcriptSection) {
        const transcriptData = [];
        let currentEntry = null;

        // Najít všechny bloky s mluvčími a větami
        transcriptSection.querySelectorAll('[class*="paragraph-root"]').forEach(paragraph => {
            const speakerElement = paragraph.querySelector('[class*="name"]');
            const timeElement = paragraph.querySelector('[class*="hpStnn"]');
            const sentenceElements = paragraph.querySelectorAll('[class*="transcript-sentence"] span');

            if (speakerElement) {
                if (currentEntry && currentEntry.content.trim()) {
                    transcriptData.push(currentEntry); // Uložit předchozí blok
                }

                // Vytvoření nového záznamu pro aktuálního mluvčího
                currentEntry = {
                    speaker: speakerElement.innerText.trim(),
                    time: timeElement ? timeElement.innerText.trim() : "",
                    content: ""
                };
            }

            if (currentEntry) {
                // Přidání vět, vyhýbání se duplicitám
                sentenceElements.forEach(sentence => {
                    const sentenceText = sentence.innerText.trim();
                    if (sentenceText && !currentEntry.content.includes(sentenceText)) {
                        currentEntry.content += sentenceText + " ";
                    }
                });
            }
        });

        // Uložit poslední záznam
        if (currentEntry && currentEntry.content.trim()) {
            transcriptData.push(currentEntry);
        }

        // Formátování textu
        const formattedText = transcriptData.map(item =>
            `${item.speaker} (${item.time}): ${item.content.trim()}`
        ).join('\n\n');

        // Odeslání výsledku přes zprávu
        chrome.runtime.sendMessage({ action: "copyText", data: formattedText });
    } else {
        console.error("Žádný transkript nebyl nalezen.");
        chrome.runtime.sendMessage({ action: "copyText", data: null });
    }
}
// 