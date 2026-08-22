import { Fragment, type ReactNode } from 'react';

interface InlineTextProps {
  text: string;
}

function renderInlineText(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function InlineText({ text }: InlineTextProps) {
  return <>{renderInlineText(text)}</>;
}
