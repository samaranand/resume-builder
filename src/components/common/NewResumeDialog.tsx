interface NewResumeDialogProps {
  open: boolean;
  onSelectBlank: () => void;
  onSelectSample: () => void;
  onCancel: () => void;
}

export function NewResumeDialog({ open, onSelectBlank, onSelectSample, onCancel }: NewResumeDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="dialog-backdrop" role="presentation">
      <div className="dialog new-resume-dialog" role="dialog" aria-modal="true" aria-labelledby="new-dialog-title">
        <h2 id="new-dialog-title">Start a new resume?</h2>
        <p>Choose how you would like to start your new resume:</p>
        <div className="dialog-options">
          <button type="button" className="button button--secondary option-button" onClick={onSelectBlank}>
            <strong>Blank Template</strong>
            <span>Start with a fresh, empty template to fill out your details from scratch.</span>
          </button>
          <button type="button" className="button button--secondary option-button" onClick={onSelectSample}>
            <strong>Sample Template</strong>
            <span>Start with a pre-filled sample resume to use as a reference guide.</span>
          </button>
        </div>
        <div className="dialog-actions" style={{ marginTop: '14px' }}>
          <button type="button" className="button button--secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
