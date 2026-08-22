import type { EducationEntry } from '../../types/resume';
import { Section } from './Section';

interface EducationProps {
  education: EducationEntry[];
}

export function Education({ education }: EducationProps) {
  return (
    <Section title="Education">
      <div className="education-list">
        {education.map((entry) => (
          <div className="education-entry" key={entry.id}>
            <div className="resume-row education-row">
              <strong>{entry.institution}</strong>
              <span>
                {entry.startDate} – {entry.endDate}
              </span>
            </div>
            <div className="resume-row education-row">
              <em>{entry.degree}</em>
              <span>{entry.gpa}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
