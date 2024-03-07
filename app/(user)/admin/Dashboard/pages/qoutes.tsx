import React, { useState, useRef } from 'react';

const Snippet: React.FC = () => {
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
            <div className='p-2 flex flex-col border h-56 bg-gray-800 rounded-md'>
                <div className='relative p-1'>
                    <span className='font-bold text-white'>Cover Letter</span>
                    <button
                        className="absolute top-0 right-0 text-white font-semibold rounded copy-button shadow-2xl hover:opacity-80"
                        onClick={handleCopyClick1}
                    >
                        Copy
                    </button>
                    {isCopied1 && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white font-semibold py-1 px-4 rounded">
                            Copied!
                        </div>
                    )}
                </div>
                <div className="bg-slate-500 p-6 rounded-lg shadow-lg overflow-auto text-white">
                    <pre className="overflow-x-auto" ref={codeRef1}>
                        <code id="codeSnippet1" className="text-white">
                            Dear Hiring Manager,<br/> <br/>
                            I trust this message finds you in good health.<br/>
                            I am writing to express my genuine interest in the <br/>
                            frontend software engineer () position at your company, <br/> 
                            as posted on indeed. I am optimistic that there <br/>
                            is an available position. <br/>
                            As an international candidate with a strong  <br/>
                            background in software development, <br/>
                            I am excited about the prospect of contributing my  <br/>
                            expertise to your esteemed organization. <br/>
                            Having honed my skills in web development in  <br/>
                            my home country, <br/>
                            I am eager to explore new horizons and embrace fresh  <br/>
                            challenges in a foreign environment. <br/>
                            Thank you for considering my application. <br/>
                            I am excited about the opportunity to contribute to  <br/>
                            your company and am available for an interview at  <br/>
                            your earliest convenience. <br/>
                            Please feel free to contact me using the information  <br/>
                            provided below in my resume to schedule a  <br/>
                            time for us to speak.
                        </code>
                    </pre>
                </div>
            </div>
            <div className='p-2 flex flex-col border h-56 bg-gray-800 rounded-md'>
                <div className='relative flex justify-between p-1'>
                    <span className='font-bold'>Summary</span>
                    <button
                        className="relative text-white font-semibold rounded copy-button shadow-2xl hover:opacity-80"
                        onClick={handleCopyClick2}
                    >
                        Copy
                    </button>
                    {isCopied2 && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white font-semibold py-1 px-4 rounded">
                            Copied!
                        </div>
                    )}
                </div>
                <div className="bg-slate-500 p-6 rounded-lg shadow-lg max-full overflow-auto">
                    <pre className="overflow-x-auto" ref={codeRef2}>
                        <code id="codeSnippet2" className="text-white">
                            I am based in the Philippines and eager to pursue  <br/>remotework opportunities.
                        </code>
                    </pre>
                </div>
            </div>
            <div className='p-2 flex flex-col border h-56 bg-gray-800 rounded-md'>
                <div className='relative flex justify-between p-1'>
                    <span className='font-bold'>SadBhoyzsx</span>
                    <button
                        className="relative text-white font-semibold rounded copy-button shadow-2xl hover:opacity-80"
                        onClick={handleCopyClick2}
                    >
                        Copy
                    </button>
                    {isCopied2 && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white font-semibold py-1 px-4 rounded">
                            Copied!
                        </div>
                    )}
                </div>
                <div className="bg-slate-500 p-6 rounded-lg shadow-lg max-full overflow-auto">
                    <pre className="overflow-x-auto" ref={codeRef2}>
                        <code id="codeSnippet2" className="text-white">
                            When nothing goes right, go left
                        </code>
                    </pre>
                </div>
            </div>
            <div className='p-2 flex flex-col border h-56 bg-gray-800 rounded-md'>
                <div className='relative flex justify-between p-1'>
                    <span className='font-bold'>Lubhug</span>
                    <button
                        className="relative text-white font-semibold rounded copy-button shadow-2xl hover:opacity-80"
                        onClick={handleCopyClick2}
                    >
                        Copy
                    </button>
                    {isCopied2 && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white font-semibold py-1 px-4 rounded">
                            Copied!
                        </div>
                    )}
                </div>
                <div className="bg-slate-500 p-6 rounded-lg shadow-lg max-full overflow-auto">
                    <pre className="overflow-x-auto" ref={codeRef2}>
                        <code id="codeSnippet2" className="text-white">
                           Don't love me for fun girl, let me the one girl
                        </code>
                    </pre>
                </div>
            </div>
            
        </div>
        </>
    );
};

export default Snippet;
