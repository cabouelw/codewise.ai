import React from 'react';

interface FormattedMessageProps {
  content: string;
  accentColor?: string;
}

/**
 * FormattedMessage component - Renders AI chat messages with rich formatting
 * Supports:
 * - **Bold text** using **text** syntax
 * - Numbered lists (1. Item, 2. Item, etc.)
 * - Bullet points (•, -, * at start of line)
 * - Line breaks and spacing
 * - Emojis
 */
export default function FormattedMessage({ content, accentColor = 'green' }: FormattedMessageProps) {
  const formatMessage = () => {
    // Split into lines for better processing
    const lines = content?.split('\n') || [content];
    const formattedLines: React.ReactElement[] = [];

    // Color classes based on accent color
    const colorClasses = {
      green: {
        number: 'text-green-600 dark:text-green-400',
        bullet: 'text-green-600 dark:text-green-400',
      },
      blue: {
        number: 'text-blue-600 dark:text-blue-400',
        bullet: 'text-blue-600 dark:text-blue-400',
      },
      purple: {
        number: 'text-purple-600 dark:text-purple-400',
        bullet: 'text-purple-600 dark:text-purple-400',
      },
      orange: {
        number: 'text-orange-600 dark:text-orange-400',
        bullet: 'text-orange-600 dark:text-orange-400',
      },
    };

    const colors = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.green;

    lines.forEach((line, index) => {
      // Check if it's a numbered list item
      const numberedListMatch = line?.match(/^(\d+)\.\s+(.+)$/);
      if (numberedListMatch) {
        const number = numberedListMatch[1];
        const text = numberedListMatch[2];

        // Process bold text within the list item
        const parts = text.split(/(\*\*.*?\*\*)/g);
        formattedLines.push(
          <div key={index} className="flex gap-2 mb-2">
            <span className={`font-bold ${colors.number} min-w-[1.5rem]`}>{number}.</span>
            <span className="flex-1">
              {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={i} className="font-bold text-slate-900 dark:text-white">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={i}>{part}</span>;
              })}
            </span>
          </div>
        );
        return;
      }

      // Check if it's a bullet point
      if (line?.match(/^[•\-\*]\s+/)) {
        const text = line.replace(/^[•\-\*]\s+/, '');
        const parts = text.split(/(\*\*.*?\*\*)/g);
        formattedLines.push(
          <div key={index} className="flex gap-2 mb-2 pl-2">
            <span className={colors.bullet}>•</span>
            <span className="flex-1">
              {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={i} className="font-bold text-slate-900 dark:text-white">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={i}>{part}</span>;
              })}
            </span>
          </div>
        );
        return;
      }

      // Regular line with possible bold text
      if (line?.trim()) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        formattedLines.push(
          <p key={index} className="mb-2">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={i} className="font-bold text-slate-900 dark:text-white">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        );
      } else {
        // Empty line for spacing
        formattedLines.push(<div key={index} className="h-2"></div>);
      }
    });

    return formattedLines;
  };

  return <div className="text-sm leading-relaxed">{formatMessage()}</div>;
}
