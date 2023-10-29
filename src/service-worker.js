import { log } from "./utils/notifications.util";
log("service-worker", "😊");
// Listen for the `chrome.runtime.onInstalled` event.
chrome.runtime.onInstalled.addListener(() => {
  // Get the extension's ID.
  const extensionId = chrome.runtime.id;
  log("service-worker - onInstalled - extensionId", extensionId);
  // Use the `chrome.storage` API to retrieve all data stored for the extension.
  chrome.storage.local.get("dummy", (data) => {
    // Initialize the extension with the stored data.
    // ...
    console.log("service-worker - local storage", data);
  });
});
