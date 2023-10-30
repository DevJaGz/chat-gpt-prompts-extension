function Header({ title, closeCallback }) {
  return (
    <header className="px-4 pb-4 pt-5 sm:p-6 flex items-center justify-between border-b border-black/10 dark:border-white/10">
      <h4 className="font-semibold">{title}</h4>
      <button class="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={closeCallback}>
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </header>
  );
}

export default Header;
