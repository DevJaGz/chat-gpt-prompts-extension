import { MESSAGE_TYPE } from "../../constants/messages.constant";
import { defaultDateFormat } from "../../utils/dates.util";
import { notifyMessage } from "../../utils/notifications.util";
import { removePrompt } from "../../utils/storage.util";
import PromptDisplayed from "./Prompt-displayed";

function Prompt({ prompt, updatePromptsCallback }) {

  const { chatId, conversationDataId, promptName, createdDate } = prompt;
  const id = `${promptName}-${chatId}-${conversationDataId}`;

  const removePromptFromStorage = async () => {
    console.log("removePrompt", prompt);
    const isRemoved = await removePrompt({ chatId, conversationDataId });
    if (isRemoved){
      updatePromptsCallback();
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      if (tab){
        await chrome.tabs.sendMessage(tab.id, { type: MESSAGE_TYPE.removePrompt, prompt });
      }
    }
  }

  return (
    <div className="rounded py-2 px-3 bg-primary-800" id={id}>
      <header className="flex justify-between items-center flex-nowrap gap-1">
        <h4 className=" font-bold text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px] text-primary-50">
          {promptName}
        </h4>
        <small className="text-primary-500 text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px] rtl">
          {defaultDateFormat(createdDate)}
        </small>
      </header>
      <PromptDisplayed prompt={prompt} />
      <footer className="mt-4 flex gap-4">
        <button className="confirmation-btn text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-prompt"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 7l5 5l-5 5"></path>
            <path d="M13 17l6 0"></path>
          </svg>
        </button>
        {/* <button className="default-btn text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-pencil"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
            <path d="M13.5 6.5l4 4"></path>
          </svg>
        </button> */}
        <button className="ml-auto reject-btn text-sm" onClick={removePromptFromStorage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trash"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7l16 0"></path>
            <path d="M10 11l0 6"></path>
            <path d="M14 11l0 6"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
          </svg>
        </button>
      </footer>
    </div>
  );
}

export default Prompt;
