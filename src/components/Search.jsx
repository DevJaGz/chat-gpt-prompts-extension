function Search({ label = "Search for a Prompt", searchCallback, initialValue}) {
  const initialSearchValue = initialValue || "";

  return (
    <form className="flex flex-col gap-1 animate-fade-right animate-duration-500 ">
      <label htmlFor="search">{label}</label>
      <input
        autoFocus
        id="search"
        type="text"
        placeholder="Name"
        value={initialSearchValue}
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
    </form>
  );
}

export default Search;


