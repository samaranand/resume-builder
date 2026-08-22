import type { ReactNode } from 'react';

interface EditorSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  open: boolean;
  onToggle: (id: string, open: boolean) => void;
}

export function EditorSection({ id, title, children, open, onToggle }: EditorSectionProps) {
  return (
    <details className="editor-section" open={open} onToggle={(event) => onToggle(id, event.currentTarget.open)}>
      <summary>{title}</summary>
      <div className="editor-section__body">{children}</div>
    </details>
  );
}
