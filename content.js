(async function() {
  const OPENAI_API_KEY = "xxx";

  // Robustes Warten auf den Composer, fallback auf beide Selektoren
  async function waitForComposer() {
    const selectors = [
      'div[contenteditable="true"][data-tab="10"]',
      'div[contenteditable="true"][role="textbox"][dir="auto"]'
    ];
    return new Promise(resolve => {
      const iv = setInterval(() => {
        for (const sel of selectors) {
          const cmp = document.querySelector(sel);
          if (cmp) {
            clearInterval(iv);
            return resolve(cmp);
          }
        }
      }, 200);
    });
  }

  // Übersetzung
  async function translateWithGPT(text) {
    const prompt = `
Translate the following German text into English.
Preserve line breaks.
Return only the English translation. No quotes, no explanation.

${text}
`;
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a strict German-to-English translator. Only return the English translation." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2
      })
    });
    const j = await res.json();
    return j.choices?.[0]?.message?.content.trim() || "";
  }

  // Content ersetzen
  function replaceComposerContent(composer, eng) {
    composer.focus();
    const sel = window.getSelection();
    sel.removeAllRanges();
    const rg = document.createRange();
    rg.selectNodeContents(composer);
    sel.addRange(rg);
    document.execCommand("delete");
    // Zeilenumbruch erhalten
    eng.split(/\r?\n/).forEach((line, i, arr) => {
      document.execCommand("insertText", false, line);
      if (i < arr.length - 1) document.execCommand("insertHTML", false, "<br>");
    });
    // Letzte leere Zeile
    document.execCommand("insertHTML", false, "<div><br></div>");
    composer.dispatchEvent(new InputEvent("input", { bubbles: true }));
  }

  // Haupt
  const composer = await waitForComposer();

  const btn = document.createElement("button");
  btn.innerText = "Translate & Insert";
  Object.assign(btn.style, {
    position: "absolute",
    bottom: "60px",
    right: "80px",
    zIndex: 9999,
    padding: "8px 12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  });

  btn.onclick = async () => {
    const german = composer.innerText.trim();
    if (!german) return alert("No text to translate found.");
    btn.disabled = true;
    btn.innerText = "Translating...";
    try {
      const eng = await translateWithGPT(german);
      replaceComposerContent(composer, eng);
    } catch (e) {
      console.error(e);
      alert("Translation failed:\n" + e.message);
    } finally {
      btn.disabled = false;
      btn.innerText = "Translate & Insert";
    }
  };

  document.body.appendChild(btn);
})();
