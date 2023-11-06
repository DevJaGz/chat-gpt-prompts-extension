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
    textarea.innerText = updatedText;

    // Set the textarea's height based on the content
    textarea.style.minHeight = textarea.scrollHeight + "px";
    // Simulate a spacebar press
    // setTimeout(() => {
    //   const spaceKeyEvent = new KeyboardEvent("keydown", { key: " " });
    //   textarea.focus();
    //   textarea.dispatchEvent(spaceKeyEvent);
    //   const nextSiblingElement = textarea.nextElementSibling;
    //   if (nextSiblingElement.tagName === "BUTTON") {
    //     nextSiblingElement.style.background = "rgb(25, 195, 125)";
    //     nextSiblingElement.style.color = "white";
    //     nextSiblingElement.disabled = false;
    //   }
    // }, 0);
  }
};
