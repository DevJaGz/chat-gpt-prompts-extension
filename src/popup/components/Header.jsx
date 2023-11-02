function Header() {

  return (
    <header className="flex items-center gap-2 p-2 bg-primary-900 ">
      <img src="/icons/32.png" width="32" height="32" alt="logo" className="animate-fade-right animate-duration-500" />
      <h1 className="font-semibold animate-fade-right animate-duration-500">Chat GPT Prompts</h1>
    </header>
  );
}

export default Header;
