import { describe, expect, it } from 'vitest';
import { sampleResume } from '../data/sampleResume';
import { getExportFileName, getResumeJson } from './resumeExport';

describe('resume export', () => {
  it('serializes a complete readable JSON structure', () => {
    const json = getResumeJson(sampleResume);
    const parsed = JSON.parse(json);

    expect(json).toContain('\n  "schemaVersion": 1');
    expect(parsed).toMatchObject({
      schemaVersion: 1,
      personal: expect.any(Object),
      summary: expect.any(String),
      experience: expect.any(Array),
      education: expect.any(Array),
      skills: expect.any(Array),
      achievements: expect.any(Array),
    });
  });

  it('creates a stable filename from the resume name', () => {
    expect(getExportFileName(sampleResume)).toBe('samar-anand-resume.json');
  });
});
