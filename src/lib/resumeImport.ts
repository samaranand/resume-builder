import type { Achievement, CompanyExperience, EducationEntry, ResumeDocument, SkillCategory } from '../types/resume';

export interface ImportResult {
  ok: boolean;
  resume?: ResumeDocument;
  error?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function validPersonal(value: unknown): boolean {
  return (
    isRecord(value) &&
    ['name', 'location', 'email', 'phone', 'linkedin', 'github'].every((key) => isString(value[key]))
  );
}

function validDocument(value: unknown): boolean {
  return isRecord(value) && isString(value.fileName);
}

function validExperience(value: unknown): value is CompanyExperience[] {
  return (
    Array.isArray(value) &&
    value.every(
      (company) =>
        isRecord(company) &&
        isString(company.id) &&
        isString(company.company) &&
        isString(company.location) &&
        Array.isArray(company.roles) &&
        company.roles.every(
          (role) =>
            isRecord(role) &&
            isString(role.id) &&
            isString(role.title) &&
            isString(role.startDate) &&
            isString(role.endDate) &&
            isStringArray(role.highlights),
        ),
    )
  );
}

function validEducation(value: unknown): value is EducationEntry[] {
  return (
    Array.isArray(value) &&
    value.every(
      (entry) =>
        isRecord(entry) &&
        isString(entry.id) &&
        isString(entry.institution) &&
        isString(entry.degree) &&
        isString(entry.startDate) &&
        isString(entry.endDate) &&
        isString(entry.gpa),
    )
  );
}

function validSkills(value: unknown): value is SkillCategory[] {
  return (
    Array.isArray(value) &&
    value.every((skill) => isRecord(skill) && isString(skill.id) && isString(skill.name) && isString(skill.value))
  );
}

function validAchievements(value: unknown): value is Achievement[] {
  return Array.isArray(value) && value.every((item) => isRecord(item) && isString(item.id) && isString(item.value));
}

export function validateResume(value: unknown): ImportResult {
  if (!isRecord(value)) {
    return { ok: false, error: 'The selected file does not contain a resume object.' };
  }

  const candidate = !('document' in value) ? { ...value, document: { fileName: 'resume' } } : value;

  if (candidate.schemaVersion !== 1) {
    return { ok: false, error: 'This resume uses an unsupported schema version.' };
  }

  if (
    !validDocument(candidate.document) ||
    !validPersonal(candidate.personal) ||
    !isString(candidate.summary) ||
    !validExperience(candidate.experience) ||
    !validEducation(candidate.education) ||
    !validSkills(candidate.skills) ||
    !validAchievements(candidate.achievements)
  ) {
    return { ok: false, error: 'This JSON file is not a valid resume export.' };
  }

  return { ok: true, resume: candidate as unknown as ResumeDocument };
}

export function parseResumeJson(json: string): ImportResult {
  try {
    return validateResume(JSON.parse(json) as unknown);
  } catch {
    return { ok: false, error: 'The selected file is not valid JSON.' };
  }
}
