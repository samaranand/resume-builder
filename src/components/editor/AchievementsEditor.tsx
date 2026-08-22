import { createId } from '../../lib/id';
import type { Achievement } from '../../types/resume';
import { EditorControls } from './EditorControls';
import { EditorSection } from './EditorSection';
import { Field } from './Field';
import { moveItem, updateAt } from './editorUtils';

interface AchievementsEditorProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
  open: boolean;
  onToggle: (id: string, open: boolean) => void;
}

function newAchievement(): Achievement {
  return { id: createId('achievement'), value: 'Describe the achievement.' };
}

export function AchievementsEditor({ achievements, onChange, open, onToggle }: AchievementsEditorProps) {
  return (
    <EditorSection id="achievements" title="Achievements" open={open} onToggle={onToggle}>
      <div className="stack">
        {achievements.map((achievement, index) => (
          <div className="highlight-row" key={achievement.id}>
            <Field
              label={`Achievement ${index + 1}`}
              value={achievement.value}
              onChange={(value) => onChange(updateAt(achievements, index, (item) => ({ ...item, value })))}
            />
            <EditorControls
              onMoveUp={() => onChange(moveItem(achievements, index, -1))}
              onMoveDown={() => onChange(moveItem(achievements, index, 1))}
              onRemove={() => onChange(achievements.filter((item) => item.id !== achievement.id))}
              removeLabel="Delete"
              disableUp={index === 0}
              disableDown={index === achievements.length - 1}
            />
          </div>
        ))}
        <button type="button" className="button button--primary" onClick={() => onChange([...achievements, newAchievement()])}>
          + Add Achievement
        </button>
      </div>
    </EditorSection>
  );
}
