import Search from "../../components/Search";
import Header from "./Header";

function SaveDialog({ closeCallback, userPromptLabel }) {
  return (
    <div class="bg-primary-900 text-primary-100 h-full">
      <Header title="Save Prompt" closeCallback={closeCallback} />
      <div className="bottom-overlay-900">
        <p className="line-clamp-3 max-h-[6rem] p-4">{userPromptLabel}</p>
      </div>
      <div className="p-4">
        <Search label="Name for the prompt" />
      </div>
      <div className="px-4 pb-2 grid place-items-end">
        <div className="flex gap-4 items-center">
          <button className="default-btn">Cancel</button>
          <button className="confirmation-btn">Save</button>
        </div>
      </div>
    </div>
  );
}

export default SaveDialog;
