import type { ResumeDocument } from '../../types/resume';
import { AchievementsEditor } from './AchievementsEditor';
import { EducationEditor } from './EducationEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { PersonalEditor } from './PersonalEditor';
import { SkillsEditor } from './SkillsEditor';
import { SummaryEditor } from './SummaryEditor';

interface ResumeEditorProps {
  resume: ResumeDocument;
  onChange: (resume: ResumeDocument) => void;
}

export function ResumeEditor({ resume, onChange }: ResumeEditorProps) {
  return (
    <div className="resume-editor">
      <PersonalEditor personal={resume.personal} onChange={(personal) => onChange({ ...resume, personal })} />
      <SummaryEditor summary={resume.summary} onChange={(summary) => onChange({ ...resume, summary })} />
      <ExperienceEditor experience={resume.experience} onChange={(experience) => onChange({ ...resume, experience })} />
      <EducationEditor education={resume.education} onChange={(education) => onChange({ ...resume, education })} />
      <SkillsEditor skills={resume.skills} onChange={(skills) => onChange({ ...resume, skills })} />
      <AchievementsEditor achievements={resume.achievements} onChange={(achievements) => onChange({ ...resume, achievements })} />
    </div>
  );
}
