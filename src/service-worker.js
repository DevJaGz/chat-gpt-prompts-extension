import { MESSAGE_TYPE } from "./constants/messages.constant";
import {
  BLANK_URL,
  CHAT_ID_PATTERN,
  TARGET_URL,
} from "./constants/url.constant";
import { log, notifyTabMessage } from "./utils/notifications.util";
import { initializeStorage } from "./utils/storage.util";

const getChatIdFromURL = (tabId, tab) => {
  // Get the URL of the tab
  const URL = tab?.url;
  // Check if the URL is a GTP Chat
  if (URL?.includes(TARGET_URL)) {
    // Regular expression to match the ID after "/c/"
    const regex = CHAT_ID_PATTERN;
    // Use the exec method to extract the ID
    const match = regex.exec(URL);
    // The ID is in match[1]
    const chatId = match ? match[1] : null;

    // If there is no ID, return
    if (!chatId) return;

    // Message to send to the tab
    const message = {
      type: MESSAGE_TYPE.newChatDetected,
      chatId,
    };

    // Send the message to the tab
    notifyTabMessage(tabId, message);
  }
};

function tabUpdatedListener(tabId, tab) {
  getChatIdFromURL(tabId, tab);
}

function navigationCompletedListener({ tabId, url }) {
  if (!url || url === BLANK_URL || !url.includes(TARGET_URL)) return;
  const tab = { url };
  getChatIdFromURL(tabId, tab);
}

// Listen for the `chrome.runtime.onInstalled` event.
chrome.runtime.onInstalled.addListener(() => {
  initializeStorage();
  log("service-worker Installed", "😊");
});

chrome.tabs.onUpdated.addListener(tabUpdatedListener);
chrome.webNavigation.onCompleted.addListener(navigationCompletedListener);
