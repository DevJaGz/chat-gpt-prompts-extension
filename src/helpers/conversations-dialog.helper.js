const saveDialog = (message) => {
  const $reference = document.querySelector("body");
  const $dialog = document.createElement("div");
  $dialog.classList.add("gptp-dialog-container");
  $dialog.innerHTML = `
  <div
  data-state="open"
  class="fixed inset-0 bg-gray-300/70 dark:bg-gray-600/70"
  style="pointer-events: auto;">
  <div class="grid-cols-[10px_1fr_10px] grid h-full w-full grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)] md:grid-rows-[minmax(20px,_1fr)_auto_minmax(20px,_1fr)] overflow-y-auto">
    <div
      role="dialog"
      id="radix-:r25:"
      aria-describedby="radix-:r27:"
      aria-labelledby="radix-:r26:"
      data-state="open"
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
        <button class="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
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
      <div class="p-4 sm:p-6 sm:pt-4"></div>
    </div>
  </div>
</div>
  `;
  $reference.appendChild($dialog);
};

export const showSaveConversationDialog = (message) => {
  saveDialog(message);
};
