"use client";

import { ReactNode } from "react";

type MarkdownRendererProps = {
  content: string;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown to JSX converter for basic formatting
  const renderMarkdown = (text: string): ReactNode[] => {
    const lines = text.trim().split('\n');
    const elements: ReactNode[] = [];
    let currentIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={currentIndex++} className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={currentIndex++} className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={currentIndex++} className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4">
            {line.slice(4)}
          </h3>
        );
      }
      // Code blocks
      else if (line.startsWith('```')) {
        const language = line.slice(3);
        const codeLines: string[] = [];
        i++; // Skip the opening ```
        
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        
        elements.push(
          <div key={currentIndex++} className="my-4">
            {language && (
              <div className="bg-gray-800 text-gray-200 px-3 py-1 text-sm rounded-t-lg font-mono">
                {language}
              </div>
            )}
            <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto ${language ? 'rounded-b-lg' : 'rounded-lg'}`}>
              <code>{codeLines.join('\n')}</code>
            </pre>
          </div>
        );
      }
      // Lists
      else if (line.startsWith('- ')) {
        const listItems: string[] = [line.slice(2)];
        i++;
        
        while (i < lines.length && lines[i].startsWith('- ')) {
          listItems.push(lines[i].slice(2));
          i++;
        }
        i--; // Back up one since the loop will increment
        
        elements.push(
          <ul key={currentIndex++} className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 my-4 ml-4">
            {listItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      }
      // Regular paragraphs
      else if (line.trim() !== '') {
        // Handle inline code
        const processInlineCode = (text: string) => {
          const parts = text.split('`');
          return parts.map((part, idx) => 
            idx % 2 === 1 ? (
              <code key={idx} className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
                {part}
              </code>
            ) : part
          );
        };

        // Handle bold text
        const processBold = (elements: ReactNode[]) => {
          return elements.map((element, idx) => {
            if (typeof element === 'string') {
              const parts = element.split('**');
              return parts.map((part, partIdx) => 
                partIdx % 2 === 1 ? (
                  <strong key={`${idx}-${partIdx}`} className="font-semibold text-gray-900 dark:text-white">
                    {part}
                  </strong>
                ) : part
              );
            }
            return element;
          }).flat();
        };

        const processed = processBold(processInlineCode(line));
        
        elements.push(
          <p key={currentIndex++} className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {processed}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div className="prose prose-lg max-w-none">
      {renderMarkdown(content)}
    </div>
  );
}