import React, { useState } from 'react';

const CopyToClipboardButton = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  // This function is triggered when the button is clicked
  const handleCopyClick = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2s
      })
      .catch((err) => {
        console.error('Failed to copy text:', err);
      });
  };

  return (
    <button
      onClick={handleCopyClick}
    >
      {isCopied ? (
        <>
         
          <svg className="w-4 h-4 ml-2 -mr-1 inline-block" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </>
      ) : (
        <>
         
          <svg className="w-4 h-4 ml-2 -mr-1 inline-block" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2v1"></path>
          </svg>
        </>
      )}
    </button>
  );
};

export default CopyToClipboardButton;
