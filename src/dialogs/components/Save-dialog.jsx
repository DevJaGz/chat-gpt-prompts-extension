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

  useEffect(() => {
    runOnExtension(() => {
      getCurrentPrompts();
    });
  }, [dialogData]);

  const getCurrentPrompts = async () => {
    const currentPrompts = await getPrompts();
    setCurrentPrompts(currentPrompts);
  }

  const reset = async () => { 
    setSearchValue(null);
    setIsFormValid(false);
    console.log("RESET", searchValue)
  };

  const closeCallback = async () => { 
    reset();
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    await chrome.tabs.sendMessage(tab.id, { type: MESSAGE_TYPE.closeDialog, hasSave: false });
  };

  const saveCallback = async () => { 
    reset();
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    await chrome.tabs.sendMessage(tab.id, { type: MESSAGE_TYPE.closeDialog, hasSave: true, promptName: searchValue });
  };

  const searchCallback = (value) => {
    console.log("SEARCH CALLBACK", value)

    setSearchValue(value);
    const isPromptAlreadyCreated = currentPrompts.find(prompt => prompt?.promptName.toLowerCase() === value?.toLowerCase());
    if (value.length > 0 && !isPromptAlreadyCreated) {
      setIsFormValid(true);
      setSearchErrorLabel("");
    } else {
      setIsFormValid(false);
      isPromptAlreadyCreated ? setSearchErrorLabel("Prompt already exists"): setSearchErrorLabel("");
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
