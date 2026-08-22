export interface ResumeDocument {
  schemaVersion: 1;
  personal: PersonalInfo;
  summary: string;
  experience: CompanyExperience[];
  education: EducationEntry[];
  skills: SkillCategory[];
  achievements: Achievement[];
}

export interface PersonalInfo {
  name: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface CompanyExperience {
  id: string;
  company: string;
  location: string;
  roles: Role[];
}

export interface Role {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  value: string;
}

export interface Achievement {
  id: string;
  value: string;
}
