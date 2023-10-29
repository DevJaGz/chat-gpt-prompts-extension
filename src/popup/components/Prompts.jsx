import Prompt from "./Prompt";

function Prompts() {
  return (
    <ul className="mt-6 flex flex-col gap-2 pb-8 max-h-[300px] overflow-y-auto">
      <li className="pr-2">
        <Prompt />
      </li>
      <li className="pr-2">
        <Prompt />
      </li>{" "}
      <li className="pr-2">
        <Prompt />
      </li>{" "}
      <li className="pr-2">
        <Prompt />
      </li>{" "}
      <li className="pr-2">
        <Prompt />
      </li>{" "}
      <li className="pr-2">
        <Prompt />
      </li>{" "}
      <li className="pr-2">
        <Prompt />
      </li>{" "}
      <li className="pr-2">
        <Prompt />
      </li>{" "}
      <li className="pr-2">
        <Prompt />
      </li>
    </ul>
  );
}

export default Prompts;
