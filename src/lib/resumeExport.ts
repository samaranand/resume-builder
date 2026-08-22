import type { ResumeDocument } from '../types/resume';

export function getResumeJson(resume: ResumeDocument): string {
  return `${JSON.stringify(resume, null, 2)}\n`;
}

export function getExportFileName(resume: ResumeDocument): string {
  const name = resume.personal.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `${name || 'resume'}-resume.json`;
}

export function downloadResumeJson(resume: ResumeDocument): void {
  const blob = new Blob([getResumeJson(resume)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = getExportFileName(resume);
  anchor.click();
  URL.revokeObjectURL(url);
}
