import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: false
}

const OVERLAY_ID = "deep-ask-mock-ai-overlay"

type ShowPayload = { query: string; answer: string }

function showResultOverlay(payload: ShowPayload) {
  const existing = document.getElementById(OVERLAY_ID)
  existing?.remove()

  const backdrop = document.createElement("div")
  backdrop.id = OVERLAY_ID
  backdrop.setAttribute("data-deep-ask", "overlay")

  Object.assign(backdrop.style, {
    position: "fixed",
    inset: "0",
    zIndex: "2147483646",
    background: "rgba(15, 23, 42, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box",
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
  } satisfies Partial<CSSStyleDeclaration>)

  const card = document.createElement("div")
  Object.assign(card.style, {
    maxWidth: "min(560px, 100%)",
    maxHeight: "min(80vh, 100%)",
    overflow: "auto",
    background: "#0f172a",
    color: "#e2e8f0",
    borderRadius: "12px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45)",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    padding: "20px 20px 16px"
  } satisfies Partial<CSSStyleDeclaration>)

  const title = document.createElement("div")
  title.textContent = "Mock AI 回复"
  Object.assign(title.style, {
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#f8fafc"
  } satisfies Partial<CSSStyleDeclaration>)

  const queryLabel = document.createElement("div")
  queryLabel.textContent = "选中文本"
  Object.assign(queryLabel.style, {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#94a3b8",
    marginBottom: "6px"
  } satisfies Partial<CSSStyleDeclaration>)

  const queryBox = document.createElement("pre")
  queryBox.textContent = payload.query || "（空选区）"
  Object.assign(queryBox.style, {
    margin: "0 0 16px",
    padding: "10px 12px",
    background: "rgba(30, 41, 59, 0.9)",
    borderRadius: "8px",
    fontSize: "13px",
    lineHeight: "1.45",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: "#cbd5e1",
    border: "1px solid rgba(51, 65, 85, 0.8)"
  } satisfies Partial<CSSStyleDeclaration>)

  const answerLabel = document.createElement("div")
  answerLabel.textContent = "回复"
  Object.assign(answerLabel.style, {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#94a3b8",
    marginBottom: "6px"
  } satisfies Partial<CSSStyleDeclaration>)

  const answerBox = document.createElement("pre")
  answerBox.textContent = payload.answer
  Object.assign(answerBox.style, {
    margin: "0 0 16px",
    padding: "10px 12px",
    background: "rgba(15, 23, 42, 0.95)",
    borderRadius: "8px",
    fontSize: "13px",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: "#e2e8f0",
    border: "1px solid rgba(51, 65, 85, 0.8)"
  } satisfies Partial<CSSStyleDeclaration>)

  const footer = document.createElement("div")
  Object.assign(footer.style, {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px"
  } satisfies Partial<CSSStyleDeclaration>)

  const closeBtn = document.createElement("button")
  closeBtn.type = "button"
  closeBtn.textContent = "关闭"
  Object.assign(closeBtn.style, {
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    fontSize: "13px",
    fontWeight: "500",
    background: "#334155",
    color: "#f1f5f9"
  } satisfies Partial<CSSStyleDeclaration>)

  const close = () => backdrop.remove()
  closeBtn.addEventListener("click", close)
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      close()
    }
  })

  footer.appendChild(closeBtn)
  card.append(title, queryLabel, queryBox, answerLabel, answerBox, footer)
  backdrop.appendChild(card)
  document.documentElement.appendChild(backdrop)
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "DEEP_ASK_SHOW_RESULT" && message.payload) {
    showResultOverlay(message.payload as ShowPayload)
    sendResponse({ ok: true })
  }
  return true
})

export {}
