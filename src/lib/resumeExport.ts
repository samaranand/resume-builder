import type { ResumeDocument } from '../types/resume';

export function getResumeJson(resume: ResumeDocument): string {
  return `${JSON.stringify(resume, null, 2)}\n`;
}

export function getExportFileName(resume: ResumeDocument): string {
  const fileName = resume.document.fileName.trim() || resume.personal.name || 'resume';
  const safeName = fileName.replace(/[^\w.-]+/g, '-').replace(/(^-|-$)/g, '');
  return `${safeName || 'resume'}.json`;
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
