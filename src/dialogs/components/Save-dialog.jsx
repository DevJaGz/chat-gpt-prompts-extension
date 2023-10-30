import Search from "../../components/Search";
import Header from "./Header";

function SaveDialog({ closeCallback, saveCallback, userPromptMessage, searchCallback, initialSearchValue }) {
  return (
    <div class="bg-primary-900 text-primary-100 h-full flex flex-col">
      <Header title="Save Prompt" closeCallback={closeCallback} />
      <div className="bottom-overlay-900">
        <p className="line-clamp-3 max-h-[6rem] p-4 text-primary-500">{userPromptMessage}</p>
      </div>
      <div className="p-4">
        <Search label="Name for the prompt" searchCallback={searchCallback} initialValue={initialSearchValue} />
      </div>
      <div className="px-4 pb-4 flex justify-end items-end flex-1">
        <div className="flex gap-4 items-center">
          <button className="default-btn" onClick={closeCallback}>Cancel</button>
          <button className="confirmation-btn" onClick={saveCallback}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default SaveDialog;
