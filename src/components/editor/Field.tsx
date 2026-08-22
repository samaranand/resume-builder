import type { ChangeEventHandler, ReactNode } from 'react';

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  children?: ReactNode;
}

export function Field({ label, value, onChange, multiline = false, placeholder, children }: FieldProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <label className="field">
      <span>{label}</span>
      {multiline ? (
        <textarea value={value} onChange={handleChange} placeholder={placeholder} rows={4} />
      ) : (
        <input value={value} onChange={handleChange} placeholder={placeholder} />
      )}
      {children}
    </label>
  );
}
