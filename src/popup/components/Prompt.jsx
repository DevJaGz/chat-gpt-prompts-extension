function Prompt() {
  return (
    <div className="rounded py-2 px-3 bg-primary-800">
      <header className="flex justify-between items-center flex-nowrap gap-1">
        <h4 className=" font-bold text-ellipsis overflow-hidden whitespace-nowrap max-w-xs text-primary-50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatibus.
        </h4>
        <small className="text-primary-500 text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px] rtl">
          10/01/2023
        </small>
      </header>
      <details className="max-h-32">
        <summary>Click here to see the prompt</summary>
        <p className="text-base">Collapsible content...</p>
      </details>
      <footer className="mt-4 flex gap-4">
        <button className="confirmation-btn text-sm">Load to Chat</button>
        <button className="default-btn text-sm">Edit</button>
        <button className="ml-auto default-btn text-sm">Save</button>
      </footer>
    </div>
  );
}

export default Prompt;
