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
    const messageListener = (data) => {
      console.log("MESSAGE LISTENER", data);
      const { type, userPrompt } = data;
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


  const closeCallback = () => { 
    setModalType("other");
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
