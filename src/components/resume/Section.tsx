import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      <div className="resume-section__content">{children}</div>
    </section>
  );
}
