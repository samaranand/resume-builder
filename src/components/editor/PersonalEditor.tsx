import type { PersonalInfo } from '../../types/resume';
import { EditorSection } from './EditorSection';
import { Field } from './Field';

interface PersonalEditorProps {
  personal: PersonalInfo;
  onChange: (personal: PersonalInfo) => void;
}

export function PersonalEditor({ personal, onChange }: PersonalEditorProps) {
  const update = (key: keyof PersonalInfo, value: string) => onChange({ ...personal, [key]: value });

  return (
    <EditorSection title="Personal Information">
      <div className="field-grid">
        <Field label="Name" value={personal.name} onChange={(value) => update('name', value)} />
        <Field label="Location" value={personal.location} onChange={(value) => update('location', value)} />
        <Field label="Email" value={personal.email} onChange={(value) => update('email', value)} />
        <Field label="Phone" value={personal.phone} onChange={(value) => update('phone', value)} />
        <Field label="LinkedIn" value={personal.linkedin} onChange={(value) => update('linkedin', value)} />
        <Field label="GitHub" value={personal.github} onChange={(value) => update('github', value)} />
      </div>
    </EditorSection>
  );
}
