import type { CompanyExperience } from '../../types/resume';
import { InlineText } from './InlineText';
import { Section } from './Section';

interface ExperienceProps {
  experience: CompanyExperience[];
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <Section title="Experience">
      <div className="experience-list">
        {experience.map((company) => (
          <div className="experience-company" key={company.id}>
            <div className="resume-row company-row">
              <strong>{company.company}</strong>
              <em>{company.location}</em>
            </div>
            {company.roles.map((role) => (
              <div className="role-block" key={role.id}>
                <div className="resume-row role-row">
                  <strong>{role.title}</strong>
                  <em>
                    {role.startDate} – {role.endDate}
                  </em>
                </div>
                <ul className="resume-highlights">
                  {role.highlights.map((highlight, index) => (
                    <li key={`${role.id}-${index}`}>
                      <InlineText text={highlight} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
