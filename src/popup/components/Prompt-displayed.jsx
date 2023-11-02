import { useEffect } from "react";
import { useState } from "react";

function PromptDisplayed({ prompt }){

  const { userPrompt } = prompt;

  const maxCharsForPreviewPrompt = 100;
  const [promptPreview, setPromptPreview] = useState("");
  const [needPromptPreview, setNeedPromptPreview] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userPrompt.length <= maxCharsForPreviewPrompt) {
      setNeedPromptPreview(false);
      return;
    }
    setNeedPromptPreview(true);
    const preview = userPrompt.slice(0, 100);
    setPromptPreview(preview);
  }, [userPrompt]);

  const handleToggle = () => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 0);
  };

  const promptDisplayed = needPromptPreview ? (
    <details open={isOpen}>
      <summary onClick={handleToggle} className="text-primary-500 cursor-pointer">
        {isOpen ? 'Complete Prompt:' : promptPreview} {isOpen ? '' : <strong className="left-overlay-800">(👆 Click to expand )</strong>}
      </summary>
      <p className={`text-base mb-2`}>{userPrompt}</p>
    </details>
  ) : (
    <p className="text-base my-2">{userPrompt}</p>
  );

  return promptDisplayed
}

export default PromptDisplayed;