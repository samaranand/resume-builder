import { forwardRef } from 'react';
import type { ResumeDocument } from '../../types/resume';
import { Achievements } from './Achievements';
import { Education } from './Education';
import { Experience } from './Experience';
import { Header } from './Header';
import { ProfessionalSummary } from './ProfessionalSummary';
import { Skills } from './Skills';

interface ResumeProps {
  resume: ResumeDocument;
}

export const Resume = forwardRef<HTMLDivElement, ResumeProps>(function Resume({ resume }, ref) {
  return (
    <article className="resume-page" ref={ref} aria-label="Resume preview">
      <Header personal={resume.personal} />
      <ProfessionalSummary summary={resume.summary} />
      <Experience experience={resume.experience} />
      <Education education={resume.education} />
      <Skills skills={resume.skills} />
      <Achievements achievements={resume.achievements} />
    </article>
  );
});
