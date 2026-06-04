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

    const renderInline = (text: string) => {
      const parts = text.split(/(`[^`]+`|\*\*.*?\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-bold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }

        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={i}
              className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-[0.9em]"
            >
              {part.slice(1, -1)}
            </code>
          );
        }

        return <span key={i}>{part}</span>;
      });
    };

    const parseTableRow = (row: string) =>
      row
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => cell.trim());

    const isTableSeparator = (line: string) =>
      /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());

    let index = 0;
    while (index < lines.length) {
      const line = lines[index] || '';

      // Render markdown table blocks
      if (line.includes('|') && index + 1 < lines.length && isTableSeparator(lines[index + 1] || '')) {
        const headerCells = parseTableRow(line);
        const rows: string[][] = [];
        index += 2;

        while (index < lines.length) {
          const nextLine = (lines[index] || '').trim();
          if (!nextLine || !nextLine.includes('|')) break;
          rows.push(parseTableRow(nextLine));
          index += 1;
        }

        formattedLines.push(
          <div
            key={`table-${formattedLines.length}`}
            className="my-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700"
          >
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {headerCells.map((cell, cellIndex) => (
                    <th
                      key={cellIndex}
                      className="px-3 py-2 text-left font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700"
                    >
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-b border-slate-100 dark:border-slate-800 last:border-b-0 ${rowIndex % 2 === 0 ? 'bg-white dark:bg-slate-900/20' : 'bg-slate-50/60 dark:bg-slate-900/40'
                      }`}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-3 py-2 align-top ${cellIndex === 1
                            ? 'text-slate-800 dark:text-slate-200 font-mono text-xs leading-6 whitespace-pre-wrap break-words'
                            : 'text-slate-700 dark:text-slate-300'
                          }`}
                      >
                        {cellIndex === 1 ? (
                          <span className="inline-block rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1">
                            {renderInline(cell)}
                          </span>
                        ) : (
                          renderInline(cell)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

        continue;
      }

      // Horizontal rule
      if (/^\s*---\s*$/.test(line)) {
        formattedLines.push(<hr key={`hr-${formattedLines.length}`} className="my-4 border-slate-200 dark:border-slate-700" />);
        index += 1;
        continue;
      }

      // Markdown headings
      const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2];
        const headingClass =
          level === 1
            ? 'text-xl font-bold'
            : level === 2
              ? 'text-lg font-semibold'
              : level === 3
                ? 'text-base font-semibold'
                : 'text-sm font-semibold';

        formattedLines.push(
          <div key={`heading-${formattedLines.length}`} className={`${headingClass} mt-4 mb-2 text-slate-900 dark:text-white`}>
            {renderInline(text)}
          </div>
        );
        index += 1;
        continue;
      }

      // Check if it's a numbered list item
      const numberedListMatch = line?.match(/^(\d+)\.\s+(.+)$/);
      if (numberedListMatch) {
        const number = numberedListMatch[1];
        const text = numberedListMatch[2];

        formattedLines.push(
          <div key={index} className="flex gap-2 mb-2">
            <span className={`font-bold ${colors.number} min-w-[1.5rem]`}>{number}.</span>
            <span className="flex-1 text-slate-700 dark:text-slate-300">{renderInline(text)}</span>
          </div>
        );
        index += 1;
        continue;
      }

      // Check if it's a bullet point
      if (line?.match(/^[•\-\*]\s+/)) {
        const text = line.replace(/^[•\-\*]\s+/, '');
        formattedLines.push(
          <div key={index} className="flex gap-2 mb-2 pl-2">
            <span className={colors.bullet}>•</span>
            <span className="flex-1 text-slate-700 dark:text-slate-300">{renderInline(text)}</span>
          </div>
        );
        index += 1;
        continue;
      }

      // Regular line with possible bold text/inline code
      if (line?.trim()) {
        formattedLines.push(
          <p key={index} className="mb-2 text-slate-700 dark:text-slate-300">
            {renderInline(line)}
          </p>
        );
      } else {
        // Empty line for spacing
        formattedLines.push(<div key={index} className="h-2"></div>);
      }

      index += 1;
    }

    return formattedLines;
  };

  return <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{formatMessage()}</div>;
}
