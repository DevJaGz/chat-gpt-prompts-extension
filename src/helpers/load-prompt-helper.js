import { TEXTAREA_MATCHER } from "../constants/conversations.constant";

export const loadPromptHandler = (prompt) => {
  const activeElement = document.activeElement;
  const textarea =
    activeElement?.tagName === "TEXTAREA"
      ? activeElement
      : document.getElementById(TEXTAREA_MATCHER.id);

  if (textarea) {
    const cursorPosition = textarea.selectionStart;
    const currentText = textarea.value;
    const text = prompt.userPrompt;
    // Insert text at the cursor position
    const updatedText =
      currentText.slice(0, cursorPosition) +
      text +
      currentText.slice(cursorPosition);
    // Update the textarea's value
    textarea.value = updatedText;

    // Set the textarea's height based on the content
    textarea.style.minHeight = textarea.scrollHeight + "px";
  }
};
