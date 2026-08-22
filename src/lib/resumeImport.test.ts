import { describe, expect, it } from 'vitest';
import { sampleResume } from '../data/sampleResume';
import { getResumeJson } from './resumeExport';
import { parseResumeJson } from './resumeImport';

describe('resume import', () => {
  it('accepts a valid exported resume', () => {
    const result = parseResumeJson(getResumeJson(sampleResume));

    expect(result.ok).toBe(true);
    expect(result.resume?.schemaVersion).toBe(1);
    expect(result.resume?.experience[1].roles).toHaveLength(2);
  });

  it('rejects invalid JSON', () => {
    const result = parseResumeJson('{bad json');

    expect(result.ok).toBe(false);
    expect(result.error).toBe('The selected file is not valid JSON.');
  });

  it('rejects unsupported schema versions', () => {
    const result = parseResumeJson(JSON.stringify({ ...sampleResume, schemaVersion: 2 }));

    expect(result.ok).toBe(false);
    expect(result.error).toBe('This resume uses an unsupported schema version.');
  });
});
