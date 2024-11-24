# Transcript Extractor

Transcript Extractor je jednoduchý Chrome doplněk, který umožňuje snadno zkopírovat transkript z Fireflies přímo do schránky. Doplněk automaticky přidá tlačítko pro stažení transkriptu přímo na stránku s transkriptem.

![image](https://github.com/user-attachments/assets/ff001029-50de-4818-937c-6326a29c1b64)

---

## Funkce

- **Automatické přidání tlačítka**: Po načtení stránky s transkriptem doplněk přidá tlačítko pro stažení vedle stávajícího tlačítka "Edit Transcript".
- **Jednoduché kopírování do schránky**: Kliknutím na tlačítko se celý transkript zkopíruje do schránky.
- Doplněk funguje na všech stránkách s transkripty Fireflies.

---

## Požadavky

- Webový prohlížeč **Google Chrome** (nebo jiný Chromium-based prohlížeč).
- Přístup k účtu Fireflies.
---

## Instalace

1. **Stažení kódu**:
   - Stáhni si nebo naklonuj tenhle repozitář:
     ```bash
     https://github.com/jakubcurik/transcript-extractor
     ```

2. **Načtení doplňku**:
   - Otevři Chrome a přejdi na `chrome://extensions`.
   - Zapni **režim vývojáře** (Developer Mode) v pravém horním rohu.
   - Klikni na **Načíst rozbalené** (Load unpacked) a vyber složku s doplňkem.

3. **Aktivace**:
   - Po načtení doplňku bude automaticky aktivní a připraven k použití.

---

## Použití

1. **Načtení stránky s transkriptem**:
   - Otevři jakýkoliv detail meetingu ve Fireflies.

2. **Stisknutí tlačítka**:
   - Po načtení transkriptu se vedle tlačítka "Edit Transcript" objeví nové tlačítko s ikonou pro stažení.

3. **Stažení transkriptu**:
   - Kliknutím na nové tlačítko se transkript zkopíruje do schránky. Obdržíž potvrzení o úspěšném zkopírování.

---

## Struktura souborů

- **manifest.json**: Konfigurace doplňku.
- **background.js**: Skript pro správu načítání transkriptů.
- **content.js**: Logika pro přidání tlačítka a manipulaci s transkripty.
