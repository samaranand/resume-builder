import { EditorSection } from './EditorSection';
import { Field } from './Field';

interface SummaryEditorProps {
  summary: string;
  onChange: (summary: string) => void;
}

export function SummaryEditor({ summary, onChange }: SummaryEditorProps) {
  return (
    <EditorSection title="Professional Summary">
      <Field label="Summary" value={summary} onChange={onChange} multiline />
    </EditorSection>
  );
}
