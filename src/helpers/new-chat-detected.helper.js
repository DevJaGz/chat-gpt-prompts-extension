import {
  CONVERSATIONS_MATCHER,
  CONVERSATION_BUTTON_CSS_CLASS,
  CONVERSATION_BUTTON_LABEL_DEFAULT,
  CONVERSATION_BUTTON_LABEL_SAVED,
  USER_PROMPT_MATCHER,
} from "../constants/conversations.constant";
import { MESSAGE_TYPE } from "../constants/messages.constant";
import {
  getConversationDataId,
  myConversationFilter,
} from "../utils/conversation.util";
import { getPrompts, savePrompt } from "../utils/storage.util";
import { savePromptDialog } from "./conversations-dialog.helper";

let currentChatId = "";

const link = document.createElement("link");
link.href = chrome.runtime.getURL("assets/index.css");
link.type = "text/css";
link.rel = "stylesheet";
document.head.appendChild(link);

const conversationFilter = ($conversation) => {
  const value = $conversation.getAttribute(
    `data-${CONVERSATIONS_MATCHER.dataAttr}`
  );
  return value?.includes(CONVERSATIONS_MATCHER.dataValue);
};

const getConversations = () => {
  const queryElements = document.querySelectorAll(
    `[data-${CONVERSATIONS_MATCHER.dataAttr}]`
  );
  if (!queryElements?.length) {
    return [];
  }
  return Array.from(queryElements).filter(myConversationFilter);
};

const getConversations$ = (timeout = 10_000) => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const conversations = getConversations();
      if (!conversations?.length) {
        return;
      }
      clearInterval(interval);
      resolve(conversations);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      resolve(null);
    }, timeout);
  });
};

const extractUserPrompt = ($conversation) => {
  return $conversation.querySelector(USER_PROMPT_MATCHER.attr)?.textContent;
};

const hasConversationButton = ($conversation) => {
  return Boolean(
    $conversation.querySelector(`.${CONVERSATION_BUTTON_CSS_CLASS}`)
  );
};

const handleButtonCreation = (
  $conversation,
  conversationDataId,
  isPromptSaved
) => {
  const $button = document.createElement("button");
  $button.textContent = isPromptSaved
    ? CONVERSATION_BUTTON_LABEL_SAVED
    : CONVERSATION_BUTTON_LABEL_DEFAULT;
  $button.classList.add(CONVERSATION_BUTTON_CSS_CLASS);
  const clickHandler = () => {
    const userPrompt = extractUserPrompt($conversation);
    const dialogMessage = {
      type: MESSAGE_TYPE.showDialogToSaveConversation,
      chatId: currentChatId,
      conversationDataId,
      userPrompt,
    };
    savePromptDialog(dialogMessage, async ({ hasSave, promptName }) => {
      const messageToSave = {
        chatId: currentChatId,
        userPrompt,
        promptName: promptName.trim(),
        conversationDataId,
        createdDate: new Date().toISOString(),
      };
      if (hasSave) {
        const isPromptSaved = await savePrompt(messageToSave);
        if (isPromptSaved) {
          $button.textContent = CONVERSATION_BUTTON_LABEL_SAVED;
        }
        return;
      }
      console.log("Cancel saving");
    });
  };
  $button.addEventListener("click", clickHandler);
  return $button;
};

const drawConversationButton = async ($conversation) => {
  if (hasConversationButton($conversation)) {
    return;
  }
  const conversationDataId = getConversationDataId($conversation);
  const currentPrompts = await getPrompts();
  const isPromptSaved = currentPrompts.some(
    (prompt) =>
      prompt.chatId === currentChatId &&
      prompt.conversationDataId === conversationDataId
  );
  const $button = handleButtonCreation(
    $conversation,
    conversationDataId,
    isPromptSaved
  );
  $conversation.appendChild($button);
};

export const newChatDetectedHandler = async (chatId) => {
  currentChatId = chatId;
  const conversations = await getConversations$();
  if (conversations === null) {
    console.error("Could not find conversations");
    return;
  }
  for (const conversation$ of conversations) {
    drawConversationButton(conversation$);
  }
};
