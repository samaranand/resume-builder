import { sampleResume } from '../data/sampleResume';
import type { ResumeDocument } from '../types/resume';
import { parseResumeJson } from './resumeImport';

export const STORAGE_KEY = 'resume-builder:v1';

export function loadStoredResume(storage: Storage = localStorage): ResumeDocument {
  const stored = storage.getItem(STORAGE_KEY);
  if (!stored) {
    return sampleResume;
  }

  const result = parseResumeJson(stored);
  return result.ok && result.resume ? result.resume : sampleResume;
}

export function persistResume(resume: ResumeDocument, storage: Storage = localStorage): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(resume));
}

export function clearStoredResume(storage: Storage = localStorage): void {
  storage.removeItem(STORAGE_KEY);
}
