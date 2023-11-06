export const log = (message, ...args) => {
  // console.log(`[${message}]`, ...args);
};

export const notifyTabMessage = (tabId, message) => {
  chrome.tabs.sendMessage(tabId, message);
};

export const notifyMessage = (message) => {
  const extensionId = chrome.runtime.id;
  chrome.runtime.sendMessage(extensionId, message);
};
