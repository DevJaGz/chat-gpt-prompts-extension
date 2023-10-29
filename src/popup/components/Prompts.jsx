import { log } from "../../utils/notifications.util";
import { runOnExtension } from "../../utils/production.util";
import Prompt from "./Prompt";

function Prompts() {

  runOnExtension(() => {
    // Add a listener for changes in storage
    chrome.storage.onChanged.addListener(function(changes, areaName) {
      console.log("Changes in storage: ", changes, 'AreaName',areaName);
    });
  })

  return (
    <ul className="mt-6 flex flex-col gap-2 pb-8 max-h-[300px] overflow-y-auto ">
      <li className="pr-2 animate-fade-left animate-duration-500">
        <Prompt />
      </li>
      <li className="pr-2 animate-fade-left animate-duration-500 animate-delay-[50ms]">
        <Prompt />
      </li>{" "}
      <li className="pr-2 animate-fade-left animate-duration-500 animate-delay-100">
        <Prompt />
      </li>{" "}
      <li className="pr-2 animate-fade-left animate-duration-500 animate-delay-150">
        <Prompt />
      </li>{" "}
      <li className="pr-2 animate-fade-left animate-duration-500 animate-delay-200">
        <Prompt />
      </li>{" "}
      <li className="pr-2 animate-fade-left animate-duration-500 animate-delay-[250ms]">
        <Prompt />
      </li>{" "}
      <li className="pr-2 animate-fade-left animate-duration-500 animate-delay-300">
        <Prompt />
      </li>{" "}
      <li className="pr-2 animate-fade-left animate-duration-500 animate-delay-[350ms]">
        <Prompt />
      </li>{" "}
      <li className="pr-2 animate-fade-left animate-duration-500 animate-delay-400">
        <Prompt />
      </li>
    </ul>
  );
}

export default Prompts;
