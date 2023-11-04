import { CONVERSATIONS_MATCHER } from "../constants/conversations.constant";

export const getConversationDataId = ($conversation) => {
  return $conversation.getAttribute(`data-${CONVERSATIONS_MATCHER.dataAttr}`);
};

export const isConversationEven = (dataTestidValue) => {
  const regex = new RegExp(CONVERSATIONS_MATCHER.dataValue + "-(\\d+)");
  const match = regex.exec(dataTestidValue);
  const number = Number(match ? match[1] : 0);
  return number % 2 === 0;
};

export const myConversationFilter = ($conversation) => {
  const value = $conversation.getAttribute(
    `data-${CONVERSATIONS_MATCHER.dataAttr}`
  );
  return (
    value?.includes(CONVERSATIONS_MATCHER.dataValue) &&
    isConversationEven(value)
  );
};
