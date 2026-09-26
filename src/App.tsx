import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ConfirmDialog } from './components/common/ConfirmDialog';
import { NewResumeDialog } from './components/common/NewResumeDialog';
import { ResumeEditor } from './components/editor/ResumeEditor';
import { Resume } from './components/resume/Resume';
import { sampleResume } from './data/sampleResume';
import { useA4Overflow } from './hooks/useA4Overflow';
import { useResume } from './hooks/useResume';
import { downloadResumeJson } from './lib/resumeExport';
import { parseResumeJson } from './lib/resumeImport';
import type { ResumeDocument } from './types/resume';
import './styles/app.css';
import './styles/resume.css';
import './styles/print.css';

type ViewMode = 'editor' | 'split' | 'preview';

const VIEW_MODE_KEY = 'resume-builder:view-mode:v1';
const SECTION_STATE_KEY = 'resume-builder:editor-sections:v1';
const DEFAULT_SECTIONS = {
  personal: true,
  summary: true,
  experience: true,
  education: true,
  skills: true,
  achievements: true,
};

function loadViewMode(): ViewMode {
  const stored = localStorage.getItem(VIEW_MODE_KEY);
  return stored === 'editor' || stored === 'preview' || stored === 'split' ? stored : 'split';
}

function loadSectionState() {
  try {
    const stored = localStorage.getItem(SECTION_STATE_KEY);
    if (!stored) {
      return DEFAULT_SECTIONS;
    }
    const parsed = JSON.parse(stored) as Partial<Record<keyof typeof DEFAULT_SECTIONS, boolean>>;
    return { ...DEFAULT_SECTIONS, ...parsed };
  } catch {
    return DEFAULT_SECTIONS;
  }
}

export default function App() {
  const { resume, setResume, resetResume, storageWarning } = useResume();
  const [importError, setImportError] = useState('');
  const [pendingImport, setPendingImport] = useState<ResumeDocument | null>(null);
  const [confirmNewOpen, setConfirmNewOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(loadViewMode);
  const [sections, setSections] = useState(loadSectionState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const resumeRef = useRef<HTMLDivElement | null>(null);
  const exceedsPage = useA4Overflow(resumeRef, resume);

  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem(SECTION_STATE_KEY, JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    document.title = `${resume.document.fileName || 'resume'} · Resume Builder`;
  }, [resume.document.fileName]);

  const updateDocumentFileName = (fileName: string) => {
    setResume({ ...resume, document: { ...resume.document, fileName } });
  };

  const updateSection = (id: string, open: boolean) => {
    setSections((current) => ({ ...current, [id]: open }));
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    setImportError('');

    if (!file) {
      return;
    }

    const text = await file.text();
    const result = parseResumeJson(text);
    if (!result.ok || !result.resume) {
      setImportError(result.error ?? 'Unable to import this resume.');
      return;
    }

    setPendingImport(result.resume);
  };

  const replaceResume = (nextResume: ResumeDocument) => {
    setResume(nextResume);
    setPendingImport(null);
    setImportError('');
  };

  return (
    <div className={`app-shell app-shell--${viewMode}`}>
      <header className="top-toolbar">
        <div className="toolbar-brand">
          <h1>Resume Builder</h1>
          <label className="filename-field">
            <span>File name</span>
            <input
              value={resume.document.fileName}
              onChange={(event) => updateDocumentFileName(event.target.value)}
              placeholder="Samar_Anand_Resume"
              aria-label="Resume file name"
            />
          </label>
        </div>
        <div className="toolbar-center">
          <div className="view-switcher" aria-label="View mode">
            <button type="button" className={viewMode === 'editor' ? 'is-active' : ''} onClick={() => setViewMode('editor')}>
              Editor
            </button>
            <button type="button" className={viewMode === 'split' ? 'is-active' : ''} onClick={() => setViewMode('split')}>
              Editor + PDF
            </button>
            <button type="button" className={viewMode === 'preview' ? 'is-active' : ''} onClick={() => setViewMode('preview')}>
              PDF only
            </button>
          </div>
          <div className="toolbar-actions">
          <button type="button" className="button button--secondary" onClick={() => setConfirmNewOpen(true)}>
            New
          </button>
          <button type="button" className="button button--secondary" onClick={() => fileInputRef.current?.click()}>
            Import JSON
          </button>
          <button type="button" className="button button--secondary" onClick={() => downloadResumeJson(resume)}>
            Export JSON
          </button>
          <button type="button" className="button button--primary" onClick={() => window.print()}>
            Download PDF
          </button>
          <input ref={fileInputRef} className="visually-hidden" type="file" accept="application/json,.json" onChange={handleImport} />
          </div>
        </div>
        <div className="toolbar-status">
          <span>{storageWarning || 'Saved locally'}</span>
          <span>Your data never leaves this browser.</span>
        </div>
      </header>

      {importError ? <div className="app-alert">{importError}</div> : null}

      <main className="workspace">
        <section className="editor-pane" aria-label="Resume editor">
          <ResumeEditor resume={resume} onChange={setResume} sections={sections} onSectionToggle={updateSection} />
        </section>
        <section className="preview-pane" aria-label="Resume preview">
          <div className={`page-status ${exceedsPage ? 'page-status--error' : 'page-status--ok'}`}>
            {exceedsPage ? 'Resume exceeds one A4 page.' : '✓ Fits on one page'}
          </div>
          <div className="preview-stage">
            <Resume resume={resume} ref={resumeRef} />
          </div>
        </section>
      </main>

      <ConfirmDialog
        open={Boolean(pendingImport)}
        title="Replace current resume?"
        message="Importing this JSON file will replace the resume currently saved in this browser."
        confirmLabel="Import JSON"
        onConfirm={() => {
          if (pendingImport) {
            replaceResume(pendingImport);
          }
        }}
        onCancel={() => setPendingImport(null)}
      />

      <NewResumeDialog
        open={confirmNewOpen}
        onSelectBlank={() => {
          resetResume('blank');
          setConfirmNewOpen(false);
        }}
        onSelectSample={() => {
          resetResume('sample');
          setConfirmNewOpen(false);
        }}
        onCancel={() => setConfirmNewOpen(false)}
      />

      <template data-fixture="sample-resume">{JSON.stringify(sampleResume)}</template>
    </div>
  );
}
