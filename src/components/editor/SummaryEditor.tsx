import { EditorSection } from './EditorSection';
import { Field } from './Field';

interface SummaryEditorProps {
  summary: string;
  onChange: (summary: string) => void;
  open: boolean;
  onToggle: (id: string, open: boolean) => void;
}

export function SummaryEditor({ summary, onChange, open, onToggle }: SummaryEditorProps) {
  return (
    <EditorSection id="summary" title="Professional Summary" open={open} onToggle={onToggle}>
      <Field label="Summary" value={summary} onChange={onChange} multiline />
    </EditorSection>
  );
}
