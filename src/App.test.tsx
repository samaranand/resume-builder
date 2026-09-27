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

  it('New button opens options dialog with Blank Template and Sample Template choices', () => {
    render(<App />);

    expect(screen.queryByText('Start a new resume?')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'New' }));

    expect(screen.getByText('Start a new resume?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Blank Template/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sample Template/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('selecting Blank Template loads a blank resume template', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    fireEvent.click(screen.getByRole('button', { name: /Blank Template/i }));

    await waitFor(() => {
      expect(screen.queryByText('Start a new resume?')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Resume file name')).toHaveValue('My_Resume');
    });

    await waitFor(() => {
      const stored = localStorage.getItem('resume-builder:v1');
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored!);
      expect(parsed.personal?.name).toBe('');
    });
  });

  it('selecting Sample Template resets to sample resume data', async () => {
    render(<App />);

    // First edit a field
    const fileNameInput = screen.getByLabelText('Resume file name');
    fireEvent.change(fileNameInput, { target: { value: 'My_Custom_Resume' } });
    expect(fileNameInput).toHaveValue('My_Custom_Resume');

    // Click New -> Sample Template
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    fireEvent.click(screen.getByRole('button', { name: /Sample Template/i }));

    await waitFor(() => {
      expect(screen.queryByText('Start a new resume?')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Resume file name')).toHaveValue('Samar_Anand_Zeta_4yrExp');
    });

    await waitFor(() => {
      const stored = localStorage.getItem('resume-builder:v1');
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored!);
      expect(parsed.personal?.name).toBe('Samar Anand');
    });
  });

  it('Cancel button closes the New dialog without resetting resume', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    expect(screen.getByText('Start a new resume?')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText('Start a new resume?')).not.toBeInTheDocument();
  });
});
