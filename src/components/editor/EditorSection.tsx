import type { ReactNode } from 'react';

interface EditorSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function EditorSection({ title, children, defaultOpen = true }: EditorSectionProps) {
  return (
    <details className="editor-section" open={defaultOpen}>
      <summary>{title}</summary>
      <div className="editor-section__body">{children}</div>
    </details>
  );
}
