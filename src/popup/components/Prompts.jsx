import { useState } from "react";
import { log } from "../../utils/notifications.util";
import { runOnExtension } from "../../utils/production.util";
import Prompt from "./Prompt";
import { getPrompts } from "../../utils/storage.util";
import { useEffect } from "react";

function Prompts() {
  console.log('PROMPT INITIALIZED')
  const [prompts, setPrompts] = useState([])

  runOnExtension(() => {
    useEffect(async () => {
      const currentPrompts = await getPrompts();
      setPrompts(currentPrompts || []);
    }, [])
  })


  return (
    <ul className="mt-6 flex flex-col gap-2 pb-8 max-h-[300px] overflow-y-auto overflow-x-hidden">
      {
        prompts.map((prompt, index) => (
          <li className="pr-2 animate-fade-left animate-duration-500" key={index}>
            <Prompt prompt={prompt} />
          </li>
        ))
      }
    </ul>
  );
}

export default Prompts;
