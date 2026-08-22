import { createId } from '../../lib/id';
import type { EducationEntry } from '../../types/resume';
import { EditorControls } from './EditorControls';
import { EditorSection } from './EditorSection';
import { Field } from './Field';
import { moveItem, updateAt } from './editorUtils';

interface EducationEditorProps {
  education: EducationEntry[];
  onChange: (education: EducationEntry[]) => void;
  open: boolean;
  onToggle: (id: string, open: boolean) => void;
}

function newEducation(): EducationEntry {
  return {
    id: createId('education'),
    institution: 'Institution Name',
    degree: 'Degree',
    startDate: 'Aug 2018',
    endDate: 'May 2022',
    gpa: 'GPA: 0.00/10.0',
  };
}

export function EducationEditor({ education, onChange, open, onToggle }: EducationEditorProps) {
  return (
    <EditorSection id="education" title="Education" open={open} onToggle={onToggle}>
      <div className="stack">
        {education.map((entry, index) => (
          <div className="editor-card" key={entry.id}>
            <div className="editor-card__header">
              <strong>{entry.institution || 'Education'}</strong>
              <EditorControls
                onMoveUp={() => onChange(moveItem(education, index, -1))}
                onMoveDown={() => onChange(moveItem(education, index, 1))}
                onRemove={() => onChange(education.filter((item) => item.id !== entry.id))}
                disableUp={index === 0}
                disableDown={index === education.length - 1}
              />
            </div>
            <div className="field-grid">
              <Field
                label="Institution"
                value={entry.institution}
                onChange={(value) => onChange(updateAt(education, index, (item) => ({ ...item, institution: value })))}
              />
              <Field label="Degree" value={entry.degree} onChange={(value) => onChange(updateAt(education, index, (item) => ({ ...item, degree: value })))} />
              <Field
                label="Start Date"
                value={entry.startDate}
                onChange={(value) => onChange(updateAt(education, index, (item) => ({ ...item, startDate: value })))}
              />
              <Field
                label="End Date"
                value={entry.endDate}
                onChange={(value) => onChange(updateAt(education, index, (item) => ({ ...item, endDate: value })))}
              />
              <Field label="GPA/Score" value={entry.gpa} onChange={(value) => onChange(updateAt(education, index, (item) => ({ ...item, gpa: value })))} />
            </div>
          </div>
        ))}
        <button type="button" className="button button--primary" onClick={() => onChange([...education, newEducation()])}>
          + Add Education
        </button>
      </div>
    </EditorSection>
  );
}
