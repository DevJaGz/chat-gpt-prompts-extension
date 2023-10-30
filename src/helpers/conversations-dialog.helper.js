import { DIALOG_ID } from "../constants/conversations.constant";

const isBaseDialogInserted = false;
let $dialog = null;

export const insertBaseDialog = () => {
  if (isBaseDialogInserted) return;
  const $reference = document.querySelector("body");
  $dialog = document.createElement("div");
  $dialog.classList.add("gptp-dialog-container");

  $dialog.innerHTML = `
  <div 
  class="fixed inset-0 bg-gray-300/70 dark:bg-gray-600/70"
  style="pointer-events: auto;">
  <div class="grid-cols-[10px_1fr_10px] grid h-full w-full grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)] md:grid-rows-[minmax(20px,_1fr)_auto_minmax(20px,_1fr)] overflow-y-auto">
    <div
      role="dialog"
      id="radix-:r25:"
      aria-describedby="radix-:r27:"
      aria-labelledby="radix-:r26:"
      class="relative col-auto col-start-2 row-auto row-start-2 w-full rounded-lg text-left shadow-xl transition-all left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 md:max-w-[680px]"
      tabindex="-1"
      style="pointer-events: auto;"
    >
      <div class="px-4 pb-4 pt-5 sm:p-6 flex items-center justify-between border-b border-black/10 dark:border-white/10">
        <div class="flex">
          <div class="flex items-center">
            <div class="flex flex-col gap-1 text-center sm:text-left">
              <h2
                id="radix-:r26:"
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
              >
                Settings
              </h2>
            </div>
          </div>
        </div>
        <button id="gptp-close-dialog-btn" class="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div  class="p-4 sm:p-6 sm:pt-4">
        <section id="${DIALOG_ID}"></section>
      </div>
    </div>
  </div>
</div>
  <script>
    const $dialog = document.querySelector(".gptp-dialog-container");
    const $closeButton = document.querySelector("#gptp-close-dialog-btn");
    const closeHandler = () => {
      $dialog.classList.remove("gptp-show");
    };
    $closeButton.addEventListener("click", closeHandler);
  </script>
  `;
  $reference.appendChild($dialog);
  console.log("Dialog inserted", $dialog);
};

const saveDialog = (message) => {
  console.log("Saving dialog...", message, $dialog);
  if (!$dialog) {
    throw new Error("$dialog not found");
  }
  const $dialogContainer = $dialog.querySelector(`#${DIALOG_ID}`);
  $dialogContainer.innerHTML = `
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-1">
      <label for="gptp-conversation-name" class="text-sm font-medium text-gray-700 dark:text-gray-200">Conversation Name</label>
      <input type="text" id="gptp-conversation-name" name="gptp-conversation-name" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200">
    </div>
    <div class="flex flex-col gap-1">
      <label for="gptp-conversation-description" class="text-sm font-medium text-gray-700 dark:text-gray-200">Conversation Description</label>
      <textarea id="gptp-conversation-description" name="gptp-conversation-description" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200"></textarea>
    </div>
    <div class="flex flex-col gap-1">
      <label for="gptp-conversation-message" class="text-sm font-medium text-gray-700 dark:text-gray-200">Conversation Message</label>
      <textarea id="gptp-conversation-message" name="gptp-conversation-message" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200">${JSON.stringify(
        message
      )}</textarea>
    </div>
    <div class="flex flex-col gap-1">
      <label for="gptp-conversation-tags" class="text-sm font-medium text-gray-700 dark:text-gray-200">Conversation Tags</label>
      <input type="text" id="gptp-conversation-tags" name="gptp-conversation-tags" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200">
    </div>
    <div class="flex flex-col gap-1">
      <label for="gptp-conversation-category" class="
  `;
  $dialog.classList.add("gptp-show");
};

export const showSaveConversationDialog = (message) => {
  saveDialog(message);
};
