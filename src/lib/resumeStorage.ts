import { sampleResume } from '../data/sampleResume';
import type { ResumeDocument } from '../types/resume';
import { validateResume } from './resumeImport';

export const STORAGE_KEY = 'resume-builder:v1';

function withDefaults(value: unknown): ResumeDocument {
  const migrated =
    typeof value === 'object' && value !== null && !Array.isArray(value) && !('document' in value)
      ? { ...value, document: sampleResume.document }
      : value;
  const result = validateResume(migrated);
  return result.ok && result.resume ? result.resume : sampleResume;
}

export function loadStoredResume(storage: Storage = localStorage): ResumeDocument {
  const stored = storage.getItem(STORAGE_KEY);
  if (!stored) {
    return sampleResume;
  }

  try {
    return withDefaults(JSON.parse(stored) as unknown);
  } catch {
    return sampleResume;
  }
}

export function persistResume(resume: ResumeDocument, storage: Storage = localStorage): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(resume));
}

export function clearStoredResume(storage: Storage = localStorage): void {
  storage.removeItem(STORAGE_KEY);
}
