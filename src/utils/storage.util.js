import { STORAGE_KEY } from "../constants/conversations.constant";
import { log } from "./notifications.util";

export const setConversation = (conversation) => {
  const data = {
    [STORAGE_KEY]: {
      conversations: {},
    },
  };
  log("storage.util.js", "setConversation", conversation);
};

export const getConversations = () => {
  chrome.storage.get([STORAGE_KEY], (result) => {
    log("storage.util.js", result);
  });
};
