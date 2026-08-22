import type { Achievement } from '../../types/resume';
import { InlineText } from './InlineText';
import { Section } from './Section';

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <Section title="Achievements">
      <ul className="resume-highlights achievements-list">
        {achievements.map((achievement) => (
          <li key={achievement.id}>
            <InlineText text={achievement.value} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
