import Prompts from "./Prompts";
import Search from "./Search";

function Main() {
  return (
    <main className="p-2 bg-primary-700">
      <Search />
      <section className="bottom-overlay-700">
        <Prompts />
      </section>
    </main>
  );
}

export default Main;
