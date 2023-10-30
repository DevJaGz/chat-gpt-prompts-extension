import { MESSAGE_TYPE } from "./constants/messages.constant";
import { insertBaseDialog } from "./helpers/conversations-dialog.helper";
import { newChatDetectedHandler } from "./helpers/new-chat-detected.helper";
import { log } from "./utils/notifications.util";

function messageListener(message, sender, sendResponse) {
  const { type, chatId } = message;
  if (type === MESSAGE_TYPE.newChatDetected) {
    log("content-script.js", message, chatId);
    if (!chatId) {
      throw new Error("No chat ID");
    }
    newChatDetectedHandler(chatId);
  }
}

(() => {
  log("content-script.js", "😊");
  const iFrame = document.createElement("iframe");
  const section = document.createElement("section");
  iFrame.src = chrome.runtime.getURL("src/dialogs/index.html");
  section.classList.add("gptp-dialog");
  iFrame.classList.add("gptp-dialog-iframe");
  iFrame.allowtransparency = "true";
  iFrame.sandbox = "allow-same-origin allow-scripts";
  section.appendChild(iFrame);
  document.body.insertBefore(section, document.body.firstChild);

  chrome.runtime.onMessage.addListener(messageListener);
})();
