import { useEffect } from "react";
import { MESSAGE_TYPE } from "../../constants/messages.constant";
import { runOnExtension } from "../../utils/production.util";
import { useState } from "react";
import SaveDialog from "./Save-dialog";

function App() {
  const [modalType, setModalType] = useState("");
  const [userPromptMessage, setUserPromptMessage] = useState("");
  const [searchValue, setSearchValue] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    console.log("USE EFFECT REACT", modalType);
    const messageListener = (message, sender, sendResponse) => {
      console.log("MESSAGE LISTENER", message);
      const { type, userPrompt } = message;
      if (type === MESSAGE_TYPE.showDialogToSaveConversation) {
        setModalType("save");
        setUserPromptMessage(userPrompt);
      }

      if (type === MESSAGE_TYPE.resetDialog) {
        reset();
      }
    };
    runOnExtension(() => {
      chrome.runtime.onMessage.addListener(messageListener);
    });
    // Cleanup the listener when the component unmounts
    return () => {
      console.log("CLEAN UP REACT", modalType);
      runOnExtension(() => {
        chrome.runtime.onMessage.removeListener(messageListener);
      });
    };
  }, []);


  const reset = async () => { 
    setModalType("");
    setUserPromptMessage("");
    setSearchValue(null);
    setIsFormValid(false);
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
    if (value.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    setSearchValue(value);
  }

  if (modalType === "save") {
    return (
      <>
      <div className="fixed inset-0 text-base h-full">
            <SaveDialog closeCallback={closeCallback} saveCallback={saveCallback} searchCallback={searchCallback} initialSearchValue={searchValue} userPromptMessage={userPromptMessage}  isFormValid={isFormValid} />
      </div>
      </>
    );
  }
  return;
}

export default App;
