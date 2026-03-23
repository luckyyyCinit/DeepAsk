/** Service worker: 右键菜单 → Mock AI → 通知页面脚本展示结果 */

const MENU_ID = "deep-ask-mock-ai"

function mockAiReply(selectedText: string): string {
  const preview =
    selectedText.length > 200 ? `${selectedText.slice(0, 200)}…` : selectedText
  return [
    "【Mock AI】",
    "",
    `你选中的内容（${selectedText.length} 字）：`,
    preview,
    "",
    "这是一条本地模拟回复，未调用真实 API。后续可在此接入真实模型。"
  ].join("\n")
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: "发给 Mock AI",
      contexts: ["selection"]
    })
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MENU_ID || tab?.id == null) {
    return
  }

  const selection = (info.selectionText ?? "").trim()
  const answer = mockAiReply(selection)

  try {
    await chrome.tabs.sendMessage(tab.id, {
      type: "DEEP_ASK_SHOW_RESULT",
      payload: { query: selection, answer }
    })
  } catch {
    // 页面可能尚未注入 content script（例如刚装扩展未刷新），忽略或由用户刷新后再试
  }
})

export {}
