import { useEffect } from "react";
import { MESSAGE_TYPE } from "../../constants/messages.constant";
import { runOnExtension } from "../../utils/production.util";
import { useState } from "react";
import SaveDialog from "./Save-dialog";

function App() {
  const [modalType, setModalType] = useState("");
  const [dialogData, setDialogData] = useState(null);
  
  useEffect(() => {
    const messageListener = (message, sender, sendResponse) => {
      const { type } = message;
      if (type === MESSAGE_TYPE.showDialogToSaveConversation) {
        setModalType("save");
        setDialogData(message);
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
      runOnExtension(() => {
        chrome.runtime.onMessage.removeListener(messageListener);
      });
    };
  }, []);


  const reset = async () => { 
    setModalType("");
  };


  if (modalType === "save") {
    return (
      <>
      <div className="fixed inset-0 text-base h-full">
            <SaveDialog dialogData={dialogData} resetCallback={reset} />
      </div>
      </>
    );
  }
  return <></>;
}

export default App;
