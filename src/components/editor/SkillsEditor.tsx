import { createId } from '../../lib/id';
import type { SkillCategory } from '../../types/resume';
import { EditorControls } from './EditorControls';
import { EditorSection } from './EditorSection';
import { Field } from './Field';
import { moveItem, updateAt } from './editorUtils';

interface SkillsEditorProps {
  skills: SkillCategory[];
  onChange: (skills: SkillCategory[]) => void;
}

function newSkill(): SkillCategory {
  return { id: createId('skill'), name: 'Category', value: 'Skill one, Skill two' };
}

export function SkillsEditor({ skills, onChange }: SkillsEditorProps) {
  return (
    <EditorSection title="Skills">
      <div className="stack">
        {skills.map((skill, index) => (
          <div className="editor-card" key={skill.id}>
            <div className="editor-card__header">
              <strong>{skill.name || 'Skill Category'}</strong>
              <EditorControls
                onMoveUp={() => onChange(moveItem(skills, index, -1))}
                onMoveDown={() => onChange(moveItem(skills, index, 1))}
                onRemove={() => onChange(skills.filter((item) => item.id !== skill.id))}
                disableUp={index === 0}
                disableDown={index === skills.length - 1}
              />
            </div>
            <div className="field-grid">
              <Field label="Category" value={skill.name} onChange={(value) => onChange(updateAt(skills, index, (item) => ({ ...item, name: value })))} />
              <Field label="Skills" value={skill.value} onChange={(value) => onChange(updateAt(skills, index, (item) => ({ ...item, value }))) } />
            </div>
          </div>
        ))}
        <button type="button" className="button button--primary" onClick={() => onChange([...skills, newSkill()])}>
          + Add Category
        </button>
      </div>
    </EditorSection>
  );
}
