import type { SkillCategory } from '../../types/resume';
import { Section } from './Section';

interface SkillsProps {
  skills: SkillCategory[];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <Section title="Skills">
      <div className="skills-list">
        {skills.map((skill) => (
          <p className="skill-line" key={skill.id}>
            <strong>{skill.name}:</strong> {skill.value}
          </p>
        ))}
      </div>
    </Section>
  );
}
