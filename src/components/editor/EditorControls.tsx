interface EditorControlsProps {
  onAdd?: () => void;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  addLabel?: string;
  removeLabel?: string;
  disableUp?: boolean;
  disableDown?: boolean;
}

export function EditorControls({
  onAdd,
  onRemove,
  onMoveUp,
  onMoveDown,
  addLabel = 'Add',
  removeLabel = 'Remove',
  disableUp = false,
  disableDown = false,
}: EditorControlsProps) {
  return (
    <div className="editor-controls">
      {onAdd ? (
        <button type="button" className="button button--secondary" onClick={onAdd}>
          + {addLabel}
        </button>
      ) : null}
      {onMoveUp ? (
        <button type="button" className="icon-button" onClick={onMoveUp} disabled={disableUp} aria-label="Move up">
          ↑
        </button>
      ) : null}
      {onMoveDown ? (
        <button type="button" className="icon-button" onClick={onMoveDown} disabled={disableDown} aria-label="Move down">
          ↓
        </button>
      ) : null}
      {onRemove ? (
        <button type="button" className="button button--danger" onClick={onRemove}>
          {removeLabel}
        </button>
      ) : null}
    </div>
  );
}
