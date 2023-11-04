
import Prompt from "./Prompt";

function Prompts({ prompts, updatePromptsCallback}) {
  console.log('PROMPT INITIALIZED')



  return (
    <ul className="mt-6 flex flex-col gap-2 pb-8 max-h-[300px] overflow-y-auto overflow-x-hidden">
      {
        prompts.map((prompt, index) => (
          <li className="pr-2 animate-fade-left animate-duration-500" key={index}>
            <Prompt prompt={prompt} updatePromptsCallback={updatePromptsCallback} />
          </li>
        ))
      }
    </ul>
  );
}

export default Prompts;
