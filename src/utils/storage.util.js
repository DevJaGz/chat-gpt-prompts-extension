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
  const storageData = await chrome.storage.local.get([STORAGE_KEY]);
  log("storage.util.js -- storageData", storageData[STORAGE_KEY]);
};

const setNewState = async (newState) => {
  await chrome.storage.local.set({
    [STORAGE_KEY]: newState,
  });
};

const hasCurentStatePromptName = (state, prompt) => {
  return state.prompts.some((p) => p.promptName === prompt.promptName);
};

const findPromptIndex = (state, prompt) => {
  console.log("GETTING FIND PROMPT INDEX", state, prompt);
  return state.prompts.findIndex(
    (p) =>
      p.chatId === prompt.chatId &&
      p.conversationDataId === prompt.conversationDataId
  );
};

const getCurrentState = async () => {
  const storageData = await chrome.storage.local.get([STORAGE_KEY]);
  return storageData[STORAGE_KEY];
};

export const savePrompt = (prompt) => {
  return new Promise(async (resolve) => {
    const state = await getCurrentState();
    const promptIndex = findPromptIndex(state, prompt);
    console.log("INDEX FOUND", promptIndex);
    if (promptIndex !== -1) {
      const currentPrompts = state.prompts;
      const newState = {
        ...state,
        prompts: [
          ...currentPrompts.slice(0, promptIndex),
          prompt,
          ...currentPrompts.slice(promptIndex + 1),
        ],
      };
      console.log("EDITING.....", newState);
      await setNewState(newState);
      console.log("EDITED");
      return resolve(true);
    }
    const newState = {
      ...state,
      prompts: [...state.prompts, prompt],
    };
    console.log("CREATING.....", newState);
    await setNewState(newState);
    console.log("CREATED");
    resolve(true);
  });
};

export const getPrompts = async () => {
  const state = await getCurrentState();
  return state?.prompts || [];
};

export const removePrompt = async ({
  chatId = null,
  conversationDataId = null,
} = {}) => {
  return new Promise(async (resolve) => {
    if (!chatId && !conversationDataId) {
      throw new Error("At least one of the arguments must be provided");
    }
    const state = await getCurrentState();
    const newState = {
      ...state,
      prompts: state.prompts.filter(
        (p) =>
          !(p.chatId === chatId && p.conversationDataId === conversationDataId)
      ),
    };
    await setNewState(newState);
    resolve(true);
  });
};
