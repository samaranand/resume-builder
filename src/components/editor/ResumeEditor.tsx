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
  sections: Record<string, boolean>;
  onSectionToggle: (id: string, open: boolean) => void;
}

export function ResumeEditor({ resume, onChange, sections, onSectionToggle }: ResumeEditorProps) {
  return (
    <div className="resume-editor">
      <PersonalEditor
        personal={resume.personal}
        onChange={(personal) => onChange({ ...resume, personal })}
        open={sections.personal}
        onToggle={onSectionToggle}
      />
      <SummaryEditor
        summary={resume.summary}
        onChange={(summary) => onChange({ ...resume, summary })}
        open={sections.summary}
        onToggle={onSectionToggle}
      />
      <ExperienceEditor
        experience={resume.experience}
        onChange={(experience) => onChange({ ...resume, experience })}
        open={sections.experience}
        onToggle={onSectionToggle}
      />
      <EducationEditor
        education={resume.education}
        onChange={(education) => onChange({ ...resume, education })}
        open={sections.education}
        onToggle={onSectionToggle}
      />
      <SkillsEditor
        skills={resume.skills}
        onChange={(skills) => onChange({ ...resume, skills })}
        open={sections.skills}
        onToggle={onSectionToggle}
      />
      <AchievementsEditor
        achievements={resume.achievements}
        onChange={(achievements) => onChange({ ...resume, achievements })}
        open={sections.achievements}
        onToggle={onSectionToggle}
      />
    </div>
  );
}
