import { useState } from "react";
import Search from "../../components/Search";
import Header from "./Header";
import { useEffect } from "react";
import { runOnExtension } from "../../utils/production.util";
import { getPrompts } from '../../utils/storage.util';
import { MESSAGE_TYPE } from "../../constants/messages.constant";

function SaveDialog({ dialogData }) {
  console.log("SAVE DIALOG", dialogData)
  const [currentPrompts, setCurrentPrompts] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [searchErrorLabel, setSearchErrorLabel] = useState('');
  let wasPromptEdited = false;

  useEffect(() => {
    runOnExtension(() => {
      getCurrentPrompts();
    });
  }, [dialogData]);

  const userPromptAlreadySavedMatchFn = prompt => prompt?.conversationDataId === dialogData.conversationDataId && prompt?.chatId === dialogData.chatId

  const getCurrentPrompts = async () => {
    const currentPrompts = await getPrompts();
    setCurrentPrompts(currentPrompts);
    console.log("CURRENT PROMPTS", currentPrompts)
    console.log("dialogData", dialogData)
    const userPromptAlreadySaved = currentPrompts.find(userPromptAlreadySavedMatchFn);
    if (userPromptAlreadySaved) {
      console.log("EDIT MODE", userPromptAlreadySaved)
      const { promptName } = userPromptAlreadySaved;
      setSearchValue(promptName);
      searchCallback(promptName);
      wasPromptEdited = true;
    }
  }

  const reset = async () => { 
    setSearchValue(null);
    setIsFormValid(false);
    setSearchErrorLabel("");
  };

  const closeCallback = async () => { 
    reset();
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    await chrome.tabs.sendMessage(tab.id, { type: MESSAGE_TYPE.closeDialog, hasSave: false });
  };

  const saveCallback = async () => { 
    reset();
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    await chrome.tabs.sendMessage(tab.id, { type: MESSAGE_TYPE.closeDialog, hasSave: true, promptName: searchValue, wasPromptEdited  });
  };

  const searchCallback = (value) => {
    console.log("SEARCH CALLBACK", value)

    setSearchValue(value);
    // If userPromptAlreadySavedMatchFn return true means the Prompt is already saved so its PromptName can be same as the current value
    const isPromptNameAlreadyCreated = currentPrompts.some(prompt => !userPromptAlreadySavedMatchFn(prompt) && prompt?.promptName === value);
    if (value?.length > 0 && !isPromptNameAlreadyCreated) {
      setIsFormValid(true);
      setSearchErrorLabel("");
      console.log("VALID")
    } else {
      setIsFormValid(false);
      console.log("INVALID")
      isPromptNameAlreadyCreated ? setSearchErrorLabel("Prompt already exists"): setSearchErrorLabel("");
    }

  }

  return (
    <div class="bg-primary-900 text-primary-100 h-full flex flex-col">
      <Header title="Save Prompt" closeCallback={closeCallback} />
      <div className="bottom-overlay-900">
        <p className="line-clamp-3 max-h-[6rem] p-4 text-primary-500">{dialogData.userPrompt}</p>
      </div>
      <div className="p-4">
        <Search label="Name for the prompt" searchCallback={searchCallback} initialValue={searchValue} errorLabel={searchErrorLabel}  />
      </div>
      <div className="px-4 pb-4 flex justify-end items-end flex-1">
        <div className="flex gap-4 items-center">
          <button className="default-btn" onClick={closeCallback}>Cancel</button>
          <button className="confirmation-btn" onClick={saveCallback} disabled={!isFormValid}>{isFormValid} Save</button>
        </div>
      </div>
    </div>
  );
}

export default SaveDialog;
