import { MESSAGE_TYPE } from "./constants/messages.constant";
import { insertBaseDialog } from "./helpers/conversations-dialog.helper";
import { loadPromptHandler } from "./helpers/load-prompt-helper";
import { newChatDetectedHandler } from "./helpers/new-chat-detected.helper";
import { removePromptHandler } from "./helpers/remove-prompt.helper";
import { log } from "./utils/notifications.util";

let currentChatId = "";

function messageListener(message, sender, sendResponse) {
  const { type } = message;
  if (type === MESSAGE_TYPE.newChatDetected) {
    const { chatId } = message;
    currentChatId = chatId;
    log("content-script.js", message, chatId);
    if (!chatId) {
      throw new Error("No chat ID");
    }
    newChatDetectedHandler(chatId);
  }

  if (type === MESSAGE_TYPE.removePrompt) {
    const { prompt } = message;
    removePromptHandler(prompt, currentChatId);
  }

  if (type === MESSAGE_TYPE.loadPrompt) {
    const { prompt } = message;
    loadPromptHandler(prompt);
  }
}

(() => {
  log("content-script.js", "😊");
  insertBaseDialog();
  chrome.runtime.onMessage.addListener(messageListener);
})();
