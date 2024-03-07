import React, { useState, useRef } from 'react';

const Resume: React.FC = () => {
    const codeRef1 = useRef<HTMLPreElement>(null);
    const codeRef2 = useRef<HTMLPreElement>(null);
    const [isCopied1, setIsCopied1] = useState(false);
    const [isCopied2, setIsCopied2] = useState(false);

    const handleCopyClick1 = () => {
        copyToClipboard(codeRef1, setIsCopied1);
    };

    const handleCopyClick2 = () => {
        copyToClipboard(codeRef2, setIsCopied2);
    };

    const copyToClipboard = (ref: React.RefObject<HTMLPreElement>, setIsCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (ref.current) {
            const textArea = document.createElement('textarea');
            textArea.value = ref.current.innerText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    };

    return (
        <>
        <div className='flex flex-cols gap-4 w-full overflow-auto'>
            <div className='p-2 flex flex-col border h-auto bg-slate-500 rounded-md'>
                <div className='relative flex justify-between p-1'>
                    <span className='font-bold'>Passing all columns</span>
                    <button
                        className="relative text-white font-semibold rounded copy-button shadow-2xl hover:opacity-80"
                        onClick={handleCopyClick1}
                    >
                        Copy
                    </button>
                    {isCopied1 && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 font-semibold py-1 px-4 rounded">
                            Copied!
                        </div>
                    )}
                </div>
                <div className=" bg-gray-800 p-4 rounded-lg shadow-lg max-h-screen overflow-y-auto">
                    <pre className="overflow-x-auto" ref={codeRef1}>
                        <code id="codeSnippet1" className="text-white">
                            {`const columnsDefault = userKeys.map((key) => key);\ninitialVisibleColumns = columnsDefault; `}
                        </code>
                    </pre>
                </div>
            </div> 
        </div>
        </>
    );
};

export default Resume;
