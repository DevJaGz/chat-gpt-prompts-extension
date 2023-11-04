import { useEffect } from "react";
import { useState } from "react";

function PromptDisplayed({ prompt }){

  const { userPrompt } = prompt;

  const maxCharsForPreviewPrompt = 100;
  const [promptPreview, setPromptPreview] = useState("");
  const [needPromptPreview, setNeedPromptPreview] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userPrompt?.length <= maxCharsForPreviewPrompt) {
      setNeedPromptPreview(false);
      return;
    }
    setNeedPromptPreview(true);
    const preview = userPrompt?.slice(0, 100);
    setPromptPreview(preview);
  }, [userPrompt]);

  const handleToggle = () => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 0);
  };

  const summaryDisplayedClosed = <>
      <span className="animate-duration-500 animate-fade-up ">
        <span>{promptPreview}</span>
        <strong className="left-overlay-800"> (👆 Click to expand ) </strong>
      </span>
  </>

  const summaryDisplayedOpened = <>
  <span className="animate-duration-500 animate-fade-down">
    Complete Prompt:
  </span>
  </>

  const summaryDisplayed = needPromptPreview && isOpen ? summaryDisplayedOpened : summaryDisplayedClosed;

  const promptDisplayed = needPromptPreview ? (
    <details open={isOpen} className="max-w-full overflow-auto">
      <summary onClick={handleToggle} className="text-primary-500 cursor-pointer max-w-full  break-words">
          {summaryDisplayed}
      </summary>
      <p className={`max-w-full whitespace-pre-wrap break-words text-base mb-2 animate-duration-500 ${isOpen ? 'animate-fade-right':'animate-fade-up'}`}>{userPrompt}</p>
    </details>
  ) : (
    <p className="text-base my-2">{userPrompt}</p>
  );

  return promptDisplayed
}

export default PromptDisplayed;