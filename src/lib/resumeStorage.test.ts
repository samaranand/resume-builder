import { beforeEach, describe, expect, it } from 'vitest';
import { sampleResume } from '../data/sampleResume';
import { loadStoredResume, persistResume, STORAGE_KEY } from './resumeStorage';

describe('resume storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads the initial sample resume when storage is empty', () => {
    expect(loadStoredResume().personal.name).toBe(sampleResume.personal.name);
  });

  it('persists and reloads resume data', () => {
    persistResume({ ...sampleResume, summary: 'Updated summary' });

    expect(loadStoredResume().summary).toBe('Updated summary');
  });

  it('falls back gracefully when localStorage contains malformed data', () => {
    localStorage.setItem(STORAGE_KEY, '{bad json');

    expect(loadStoredResume().personal.name).toBe(sampleResume.personal.name);
  });
});
