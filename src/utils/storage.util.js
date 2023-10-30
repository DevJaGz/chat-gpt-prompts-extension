import { STORAGE_KEY } from "../constants/conversations.constant";
import { log } from "./notifications.util";

let initialized = false;

export const initializeStorage = async () => {
  console.log("initializeStorage", initialized);
  if (initialized) {
    return;
  }
  initialized = true;
  await chrome.storage.local.set({
    [STORAGE_KEY]: {
      prompts: [],
    },
  });
  log("storage.util.js", "initialized");
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    console.log("STORAGE_KEY result", result[STORAGE_KEY]);
  });
};

const setNewState = async (state) => {
  await chrome.storage.local.set({
    [STORAGE_KEY]: state,
  });
};

export const savePrompt = (prompt) => {
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    const state = result[STORAGE_KEY];
    const newState = {
      ...state,
      prompts: [...state.prompts, prompt],
    };
    console.log("savePrompt", newState);
    // setNewState(newState);
  });
};

export const getConversations = () => {
  chrome.storage.get([STORAGE_KEY], (result) => {
    log("storage.util.js", result);
  });
};
