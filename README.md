# DeepAsk

**Turn passive browsing into active thinking.**

DeepAsk is an AI-native Chrome extension that lets you analyze any text on the web — instantly, inline, and without breaking your flow.

Instead of copy-pasting into ChatGPT or Claude, you can:

> Select → Right-click → Think deeper

---

## ✨ What It Does

- 🔍 **Inline AI Reasoning**  
  Instantly analyze selected text directly within the page

- ⚡ **Zero Context Switching**  
  No tab switching, no copy-paste — AI is embedded into your browsing flow

- 🧠 **Context-aware analysis**  
  Designed to break down arguments, assumptions, and hidden dynamics in online content

- 🧩 **Built from scratch**  
  End-to-end Chrome extension architecture (selection → background → content → DOM)

---

## 🧪 Demo

<!-- Add a gif here -->
![demo](./assets/demo.gif)

---

## 🚀 Usage

1. Select any text on a webpage  
2. Right-click → **DeepAsk**  
3. View AI-generated insights directly below the selected content  

---

## ⚙️ Installation

### From Source

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

Then:

Open Chrome → chrome://extensions/
Enable Developer mode
Click Load unpacked
Select the project folder

🏗️ System Design

DeepAsk is built from scratch using Chrome Extension (Manifest V3), with an event-driven architecture:

User Selection
   ↓
Context Menu (background / service worker)
   ↓
AI Request Layer (mock → real API)
   ↓
Response Handling
   ↓
Content Script Injection
   ↓
Inline DOM Rendering
Key Components
background / service worker
Handles context menu events
Sends selected text to AI pipeline
content script
Captures selection position
Injects UI into DOM
Renders responses inline
manifest.json
Defines extension lifecycle and permissions
💡 Why I Built This

The current way we use AI is disconnected from context:

You read something interesting
You copy it
You paste it into another tool
You lose your flow

This friction reduces how often we actually think deeply.

DeepAsk removes that friction.

AI becomes part of your cognition loop — not a separate destination.

🧠 Engineering Focus

This project explores:

Event-driven browser architectures
Real-time DOM injection across arbitrary webpages
Integrating AI inference into user workflows
Designing AI as a context-aware system, not just an API call
🔐 Privacy
API keys stored locally in browser
Text sent directly to AI provider
No intermediate servers
No analytics or tracking
🛠️ Roadmap
 Token / cost tracking (per request)
 Streaming response UI
 Multi-model support
 Prompt customization
📌 Notes

This project is implemented independently from scratch, inspired by existing AI browser tools, with a focus on understanding:

Chrome extension architecture
AI-native product design
Context-aware interaction systems
