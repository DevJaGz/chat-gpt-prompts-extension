import Search from "../../components/Search";

function SaveDialog() {
  return (
    <div class="p-4 sm:p-6 sm:pt-4 bg-primary-700 text-primary-100 h-full">
      <Search label="Name for the prompt" />
    </div>
  );
}

export default SaveDialog;