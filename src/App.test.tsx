import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the default resume and required controls', () => {
    render(<App />);

    expect(screen.getByLabelText('Resume file name')).toHaveValue('Samar_Anand_Zeta_4yrExp');
    expect(screen.getByRole('button', { name: 'Export JSON' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download PDF' })).toBeInTheDocument();
    expect(screen.getAllByText('Professional Summary').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Experience').length).toBeGreaterThan(0);
  });

  it('persists view mode and collapsed editor sections locally', async () => {
    const { container } = render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'PDF only' }));
    expect(localStorage.getItem('resume-builder:view-mode:v1')).toBe('preview');

    const summary = container.querySelectorAll('details')[1];
    expect(summary).toBeInTheDocument();
    summary.open = false;
    fireEvent(summary, new Event('toggle', { bubbles: true }));

    await waitFor(() => {
      const storedSections = JSON.parse(localStorage.getItem('resume-builder:editor-sections:v1') ?? '{}');
      expect(storedSections.summary).toBe(false);
    });
  });
});
