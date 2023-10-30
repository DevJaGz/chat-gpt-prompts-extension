import { useEffect } from "react";
import { MESSAGE_TYPE } from "../../constants/messages.constant";
import { runOnExtension } from "../../utils/production.util";
import { useState } from "react";
import SaveDialog from "./Save-dialog";

function App() {
  const [modalType, setModalType] = useState("other");
  const [userPromptLabel, setUserPromptLabel] = useState("");

  useEffect(() => {
    console.log("USE EFFECT REACT", modalType);
    const messageListener = (message, sender, sendResponse) => {
      console.log("MESSAGE LISTENER", message);
      const { type, userPrompt } = message;
      if (type === MESSAGE_TYPE.showDialogToSaveConversation) {
        setModalType("save");
        setUserPromptLabel(userPrompt);
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


  const close = async () => { 
    setModalType("other");
    setUserPromptLabel("");
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    await chrome.tabs.sendMessage(tab.id, { type: MESSAGE_TYPE.closeDialog });
  };

  const closeCallback = () => { 
    close();
  };

  if (modalType === "save") {
    return (
      <>
      <div className="fixed inset-0 text-base h-full">
            <SaveDialog closeCallback={closeCallback} userPromptLabel={userPromptLabel} />
      </div>
      </>
    );
  }
  return;
}

export default App;
