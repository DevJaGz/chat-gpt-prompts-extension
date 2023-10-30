import { DIALOG_ID } from "../constants/conversations.constant";
import { MESSAGE_TYPE } from "../constants/messages.constant";

let isBaseDialogInserted = false;
let $dialog = null;
let $iFrame = null;

export const insertBaseDialog = () => {
  if (isBaseDialogInserted) {
    return;
  }
  isBaseDialogInserted = true;
  const iFrame = document.createElement("iframe");
  const section = document.createElement("section");
  iFrame.src = chrome.runtime.getURL("src/dialogs/index.html");
  section.classList.add("gptp-dialog");
  iFrame.classList.add("gptp-dialog-iframe");
  iFrame.allowtransparency = "true";
  iFrame.sandbox = "allow-same-origin allow-scripts";
  section.appendChild(iFrame);
  $dialog = section;
  $iFrame = iFrame;
  document.body.insertBefore(section, document.body.firstChild);
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log("request", request);
    const { type } = request;
    if (type === MESSAGE_TYPE.closeDialog) {
      console.log("closeDialog");
      $dialog.classList.remove("gptp-dialog--show");
    }
  });
};

const saveDialog = async (message) => {
  $dialog.classList.add("gptp-dialog--show");
  await chrome.runtime.sendMessage(message);
};

export const showSaveConversationDialog = (message) => {
  saveDialog(message);
};
