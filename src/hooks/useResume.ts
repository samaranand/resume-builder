import { useCallback, useEffect, useState } from 'react';
import { blankResume } from '../data/blankResume';
import { sampleResume } from '../data/sampleResume';
import { clearStoredResume, loadStoredResume, persistResume } from '../lib/resumeStorage';
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

  const resetResume = useCallback((template: 'blank' | 'sample' = 'blank') => {
    clearStoredResume();
    const templateData = template === 'sample' ? sampleResume : blankResume;
    const freshData = JSON.parse(JSON.stringify(templateData)) as ResumeDocument;
    setResume(freshData);
  }, []);

  return { resume, setResume, resetResume, storageWarning };
}
