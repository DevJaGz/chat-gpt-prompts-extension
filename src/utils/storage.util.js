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

const getCurrentState = async () => {
  const storageData = await chrome.storage.local.get([STORAGE_KEY]);
  return storageData[STORAGE_KEY];
};

export const savePrompt = (prompt) => {
  return new Promise(async (resolve) => {
    const state = await getCurrentState();
    if (hasCurentStatePromptName(state, prompt)) {
      const newState = {
        ...state,
        prompts: state.prompts.map((p) => {
          if (p.promptName === prompt.promptName) {
            return prompt;
          }
          return p;
        }),
      };
      console.log("Prompt overwritten", newState);
      await setNewState(newState);
      return resolve(true);
    }
    const newState = {
      ...state,
      prompts: [...state.prompts, prompt],
    };
    console.log("Prompt Saved", newState);
    await setNewState(newState);
    resolve(true);
  });
};

export const getPrompts = async ({
  prompName = null,
  chatId = null,
  conversationDataId = null,
} = {}) => {
  const state = await getCurrentState();
  return state?.prompts?.filter(
    (p) =>
      (!prompName || p.promptName === prompName) &&
      (!chatId || p.chatId === chatId) &&
      (!conversationDataId || p.conversationDataId === conversationDataId)
  );
};

export const removePrompt = async ({
  prompName = null,
  chatId = null,
  conversationDataId = null,
} = {}) => {
  return new Promise(async () => {
    if (!prompName && !chatId && !conversationDataId) {
      throw new Error("At least one of the arguments must be provided");
    }
    const state = await getCurrentState();
    const newState = {
      ...state,
      prompts: state.prompts.filter(
        (p) =>
          (!prompName || p.promptName !== prompName) &&
          (!chatId || p.chatId !== chatId) &&
          (!conversationDataId || p.conversationDataId !== conversationDataId)
      ),
    };
    await setNewState(newState);
    resolve(true);
  });
};
