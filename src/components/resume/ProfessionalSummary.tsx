import { Section } from './Section';
import { InlineText } from './InlineText';

interface ProfessionalSummaryProps {
  summary: string;
}

export function ProfessionalSummary({ summary }: ProfessionalSummaryProps) {
  return (
    <Section title="Professional Summary">
      <p className="summary-text">
        <InlineText text={summary} />
      </p>
    </Section>
  );
}
