function Search({ label = "Search for a Prompt", searchCallback, initialValue, errorLabel}) {
 const currentValue = initialValue || "";
 const currentErrorLabel = errorLabel || "";
  return (
    <form className="flex flex-col gap-1 animate-fade-right animate-duration-500 relative">
      <label htmlFor="search">{label}</label>
      <input
        autoFocus
        id="search"
        type="text"
        placeholder="Name"
        value={currentValue}
        onChange={e => searchCallback(e.target.value)}
        className="
        p-2 
        rounded-none 
        border-b-[2px]
        border-b-primary-500
        bg-transparent 
        focus:outline-none 
        focus:ring-0
        focus:border-accent-green-500 "
      />
      {currentErrorLabel && <p className="text-accent-red-400 text-sm absolute left-0 -bottom-6 animate-rotate-y animate-once animate-duration-700 animate-ease-in-out">{currentErrorLabel}</p>}
    </form>
  );
}

export default Search;


