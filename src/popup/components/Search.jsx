function Search() {
  
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <form className="flex flex-col gap-1">
      <label htmlFor="search">Search for a Prompt</label>
      <input
        autoFocus
        id="search"
        type="text"
        placeholder="Use keywords like 'greeting' or 'joke'"
        onChange={handleChange}
        className="
        p-2 
        rounded-none 
        border-b-[2px]
        border-b-primary-500
        bg-primary-700 
        focus:outline-none 
        focus:ring-0
        focus:border-accent-green-500 "
      />
    </form>
  );
}

export default Search;


