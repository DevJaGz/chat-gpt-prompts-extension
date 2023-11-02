import {
  CONVERSATIONS_MATCHER,
  CONVERSATION_BUTTON_CSS_CLASS,
  CONVERSATION_BUTTON_LABEL,
  USER_PROMPT_MATCHER,
} from "../constants/conversations.constant";
import { MESSAGE_TYPE } from "../constants/messages.constant";
import { savePrompt } from "../utils/storage.util";
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

const isConversationEven = (dataTestidValue) => {
  const regex = new RegExp(CONVERSATIONS_MATCHER.dataValue + "-(\\d+)");
  const match = regex.exec(dataTestidValue);
  const number = Number(match ? match[1] : 0);
  return number % 2 === 0;
};

const myConversationFilter = ($conversation) => {
  const value = $conversation.getAttribute(
    `data-${CONVERSATIONS_MATCHER.dataAttr}`
  );
  return (
    value?.includes(CONVERSATIONS_MATCHER.dataValue) &&
    isConversationEven(value)
  );
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

const createButton = (label, { clickHandler } = {}) => {
  const $button = document.createElement("button");
  $button.textContent = label;
  $button.classList.add(CONVERSATION_BUTTON_CSS_CLASS);
  if (clickHandler) {
    $button.addEventListener("click", clickHandler);
  }
  return $button;
};

const extractUserPrompt = ($conversation) => {
  return $conversation.querySelector(USER_PROMPT_MATCHER.attr)?.textContent;
};

const hasConversationButton = ($conversation) => {
  return Boolean(
    $conversation.querySelector(`.${CONVERSATION_BUTTON_CSS_CLASS}`)
  );
};

const getConversationDataId = ($conversation) => {
  return $conversation.getAttribute(`data-${CONVERSATIONS_MATCHER.dataAttr}`);
};

const drawConversationButtons = ($conversation) => {
  if (hasConversationButton($conversation)) {
    return;
  }
  const userPrompt = extractUserPrompt($conversation);
  if (!userPrompt) {
    console.error("Could not find user prompt");
    return;
  }
  const clickHandler = () => {
    const dialogMessage = {
      type: MESSAGE_TYPE.showDialogToSaveConversation,
      chatId: currentChatId,
      userPrompt,
    };
    savePromptDialog(dialogMessage, async ({ hasSave, promptName }) => {
      const messageToSave = {
        chatId: currentChatId,
        userPrompt,
        promptName,
        conversationDataId: getConversationDataId($conversation),
        createdDate: new Date().toISOString(),
      };
      if (hasSave) {
        const isPromptSaved = await savePrompt(messageToSave);
        if (isPromptSaved) {
          console.log("Prompt saved");
        }
        return;
      }
      console.log("Cancel saving");
    });
  };
  const $button = createButton(CONVERSATION_BUTTON_LABEL, { clickHandler });
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
    drawConversationButtons(conversation$);
  }
};
