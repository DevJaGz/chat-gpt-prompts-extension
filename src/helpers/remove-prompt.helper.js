import {
  CONVERSATION_BUTTON_CSS_CLASS,
  CONVERSATION_BUTTON_LABEL_DEFAULT,
} from "../constants/conversations.constant";
import { getConversationDataId } from "../utils/conversation.util";
import { getConversations$ } from "../utils/dom.utils";

export const removePromptHandler = async (prompt, chatId) => {
  const conversations = await getConversations$();
  if (conversations) {
    for (const $conversation of conversations) {
      const conversationDataId = getConversationDataId($conversation);
      if (
        conversationDataId === prompt.conversationDataId &&
        chatId === prompt.chatId
      ) {
        const $button = $conversation.querySelector(
          `.${CONVERSATION_BUTTON_CSS_CLASS}`
        );
        if ($button) {
          $button.textContent = CONVERSATION_BUTTON_LABEL_DEFAULT;
        }
        break;
      }
    }
  }
};
