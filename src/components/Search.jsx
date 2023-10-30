function Search({ label = "Search for a Prompt" }) {
  
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <form className="flex flex-col gap-1 animate-fade-right animate-duration-500 ">
      <label htmlFor="search">{label}</label>
      <input
        autoFocus
        id="search"
        type="text"
        placeholder="Name for your prompt"
        onChange={handleChange}
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


