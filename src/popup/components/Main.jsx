import { useState } from "react";
import Prompts from "./Prompts";
import Search from "./Search";
import { runOnExtension } from "../../utils/production.util";
import { getPrompts } from "../../utils/storage.util";
import { useEffect } from "react";

function Main() {
  const [prompts, setPrompts] = useState([])

  runOnExtension(() => {
    useEffect(async () => {
      updatePrompts( );
    }, [])
  })


  const updatePrompts = async () => {
    const currentPrompts = await getPrompts();
    setPrompts(currentPrompts || []);
  }

  if (prompts?.length === 0) return (
    <main className="p-2 bg-primary-700 animate-fade-left animate-duration-500">
        <img src="/images/empty.gif" alt="Empty GIF" width={208}  className="w-52 object-contain mx-auto my-0"  />
        <div className="flex flex-col items-center justify-center h-full mt-4 mb-6">
          <h1 className="text-lg text-primary-50">No prompts yet</h1>
          <p className="text-primary-300">Save a prompt to get started</p>
        </div>
    </main>
  )

  return (
    <main className="p-2 bg-primary-700">
      <Search />
      <section className="bottom-overlay-700 overflow-x-hidden">
        <Prompts prompts={prompts} updatePromptsCallback={updatePrompts} />
      </section>
    </main>
  );
}

export default Main;
