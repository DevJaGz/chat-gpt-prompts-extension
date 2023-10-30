import { useEffect } from "react";
import { MESSAGE_TYPE } from "../../constants/messages.constant";
import { runOnExtension } from "../../utils/production.util";
import { useState } from "react";
import SaveDialog from "./Save-dialog";

function App() {
  const [modalType, setModalType] = useState("other");

  useEffect(() => {
    console.log("USE EFFECT REACT", modalType);
    const messageListener = (message) => {
      const { type } = message;
      if (type === MESSAGE_TYPE.showDialogToSaveConversation) {
        setModalType("save");
        console.log("Modal type change to save");
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

  if (modalType === "save") {
    return (
      <>
      <div className="fixed inset-0 text-base h-full">
            <SaveDialog />
      </div>
      </>
    );
  }
  return;
}

export default App;
