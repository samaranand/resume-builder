import { useCallback, useEffect, useState } from 'react';
import { sampleResume } from '../data/sampleResume';
import { loadStoredResume, persistResume } from '../lib/resumeStorage';
import type { ResumeDocument } from '../types/resume';

export function useResume() {
  const [resume, setResume] = useState<ResumeDocument>(() => loadStoredResume());
  const [storageWarning, setStorageWarning] = useState('');

  useEffect(() => {
    try {
      persistResume(resume);
      setStorageWarning('');
    } catch {
      setStorageWarning('Local browser storage is unavailable. Changes are kept only until this tab closes.');
    }
  }, [resume]);

  const resetResume = useCallback(() => {
    setResume(sampleResume);
  }, []);

  return { resume, setResume, resetResume, storageWarning };
}
