import type { ResumeDocument } from '../types/resume';

/**
 * Blank resume template used when the user starts a fresh resume.
 * All fields are empty so the user can fill in their own information.
 * One placeholder entry is kept per section so the editor scaffolding
 * (section headers, add-buttons, etc.) is immediately visible.
 */
export const blankResume: ResumeDocument = {
  schemaVersion: 1,
  document: {
    fileName: 'My_Resume',
  },
  personal: {
    name: '',
    location: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [
    {
      id: 'company-1',
      company: '',
      location: '',
      roles: [
        {
          id: 'role-1',
          title: '',
          startDate: '',
          endDate: '',
          highlights: [''],
        },
      ],
    },
  ],
  education: [
    {
      id: 'education-1',
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      gpa: '',
    },
  ],
  skills: [
    { id: 'skill-1', name: '', value: '' },
  ],
  achievements: [
    { id: 'achievement-1', value: '' },
  ],
};
