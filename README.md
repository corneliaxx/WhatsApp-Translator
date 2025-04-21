# WhatsApp Text Translator

A simple Chrome extension that adds a **Translate & Insert** button to WhatsApp Web, allowing you to translate messages between customizable source and target languages on the fly using OpenAI's GPT-3.5-turbo API.

## Features

- Detects the WhatsApp Web composer and injects a button.
- Sends your text to OpenAI for translation.
- Allows customizing source and target languages by modifying the prompt in `content.js`.

## Files

- **manifest.json**: Extension manifest (Manifest V3).
- **content.js**: Main content script that handles UI injection and translation logic.

## Prerequisites

- A valid OpenAI API key with translation access.
- Google Chrome or any Chromium-based browser.
- Permissions to install unpacked extensions.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder containing `manifest.json`.
5. The **WhatsApp Text Translator** extension will appear in your toolbar.

## Usage

1. Open [WhatsApp Web](https://web.whatsapp.com/) in your browser.
2. Type a message in German in the chat composer.
3. Click the **Translate & Insert** button that appears at the bottom right.
4. The original German text will be replaced with the English translation.

## Configuration

Edit the `content.js` file and replace:

```js
const OPENAI_API_KEY = "xxx";
```

with your actual OpenAI API key:

```js
const OPENAI_API_KEY = "sk-...";
```

## Troubleshooting

- If the button does not appear, make sure you are on `https://web.whatsapp.com/` and reload the page/extension.
- Check the console for errors (press `F12`) to verify API calls and selectors.
- **Original text may not be completely removed** due to WhatsApp Web's internal handling; you might need to manually clear the German text before clicking the button.

## Contributing

Feel free to open issues or submit pull requests for bug fixes and improvements. Contributions are welcome, especially solutions that ensure the original German text is fully cleared before translation.

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.

