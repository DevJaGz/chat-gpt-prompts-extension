import { DIALOG_ID } from "../constants/conversations.constant";
import { MESSAGE_TYPE } from "../constants/messages.constant";

let isBaseDialogInserted = false;
let $dialog = null;
let $iFrame = null;
let currentCallback = () => {};
let isBussy = false;
const $body = document.body;

const closeDialog = () => {
  $dialog.classList.remove("gptp-dialog--show");
  $body.classList.remove("gptp-dialog-open");
};

const openDialog = () => {
  $dialog.classList.add("gptp-dialog--show");
  setTimeout(() => {
    $body.classList.add("gptp-dialog-open");
  }, 0);
};

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
    const { type, ...rest } = request;
    if (type === MESSAGE_TYPE.closeDialog) {
      closeDialog();
      currentCallback(rest);
      isBussy = false;
    }
  });
};

const saveDialog = async (message) => {
  openDialog();
  await chrome.runtime.sendMessage(message);
};

export const savePromptDialog = async (message, callback) => {
  if (isBussy) {
    await chrome.runtime.sendMessage({ type: MESSAGE_TYPE.resetDialog });
    closeDialog();
  }
  isBussy = true;
  currentCallback = callback;
  saveDialog(message);
};
