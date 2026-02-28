import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CodeBlockProps {
  language?: string;
  code: string;
  filename?: string;
  className?: string;
}

export const CodeBlock = ({ language = 'bash', code, filename, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={twMerge("rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/10 font-mono text-sm relative group transition-all duration-500 hover:border-white/20", className)}>
      {/* 🌟 Creative Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out" />
      </div>

      {filename && (
        <div className="px-4 py-3 border-b border-white/5 bg-white/5 text-gray-400 text-xs flex justify-between items-center relative z-10 font-black uppercase tracking-widest italic">
          <span>{filename}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto relative z-10">
        <pre>
          <code className={clsx(`language-${language}`, "text-gray-300")}>
            {code}
          </code>
        </pre>
      </div>
      <button 
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 opacity-0 group-hover:opacity-100 transition-all z-20"
      >
        {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
      </button>
    </div>
  );
};
