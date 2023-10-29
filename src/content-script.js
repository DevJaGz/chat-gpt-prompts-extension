import { MESSAGE_TYPE } from "./constants/messages.constant";
import { log } from "./utils/notifications.util";

function messageListener(message, sender, sendResponse) {
  const { type, chatId } = message;
  if (type === MESSAGE_TYPE.NewChatDetected) {
    log("content-script.js", "😊", message, chatId);
  }
}

(() => {
  log("content-script.js", "😊");
  chrome.runtime.onMessage.addListener(messageListener);
})();
