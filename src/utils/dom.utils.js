import { CONVERSATIONS_MATCHER } from "../constants/conversations.constant";
import { myConversationFilter } from "./conversation.util";

const getConversations = () => {
  const queryElements = document.querySelectorAll(
    `[data-${CONVERSATIONS_MATCHER.dataAttr}]`
  );
  if (!queryElements?.length) {
    return [];
  }
  return Array.from(queryElements).filter(myConversationFilter);
};

export const getConversations$ = (timeout = 10_000) => {
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
