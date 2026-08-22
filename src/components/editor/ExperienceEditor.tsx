import { createId } from '../../lib/id';
import type { CompanyExperience, Role } from '../../types/resume';
import { EditorControls } from './EditorControls';
import { EditorSection } from './EditorSection';
import { Field } from './Field';
import { moveItem, updateAt } from './editorUtils';

interface ExperienceEditorProps {
  experience: CompanyExperience[];
  onChange: (experience: CompanyExperience[]) => void;
  open: boolean;
  onToggle: (id: string, open: boolean) => void;
}

function newRole(): Role {
  return {
    id: createId('role'),
    title: 'Software Engineer',
    startDate: 'Jan 2024',
    endDate: 'Present',
    highlights: ['Describe a measurable engineering impact.'],
  };
}

function newCompany(): CompanyExperience {
  return {
    id: createId('company'),
    company: 'Company Name',
    location: 'City, Country',
    roles: [newRole()],
  };
}

export function ExperienceEditor({ experience, onChange, open, onToggle }: ExperienceEditorProps) {
  const updateCompany = (companyIndex: number, updater: (company: CompanyExperience) => CompanyExperience) => {
    onChange(updateAt(experience, companyIndex, updater));
  };

  return (
    <EditorSection id="experience" title="Experience" open={open} onToggle={onToggle}>
      <div className="stack">
        {experience.map((company, companyIndex) => (
          <div className="editor-card" key={company.id}>
            <div className="editor-card__header">
              <strong>{company.company || 'Company'}</strong>
              <EditorControls
                onMoveUp={() => onChange(moveItem(experience, companyIndex, -1))}
                onMoveDown={() => onChange(moveItem(experience, companyIndex, 1))}
                onRemove={() => onChange(experience.filter((item) => item.id !== company.id))}
                disableUp={companyIndex === 0}
                disableDown={companyIndex === experience.length - 1}
              />
            </div>
            <div className="field-grid">
              <Field
                label="Company"
                value={company.company}
                onChange={(value) => updateCompany(companyIndex, (item) => ({ ...item, company: value }))}
              />
              <Field
                label="Location"
                value={company.location}
                onChange={(value) => updateCompany(companyIndex, (item) => ({ ...item, location: value }))}
              />
            </div>
            <div className="nested-stack">
              {company.roles.map((role, roleIndex) => (
                <div className="editor-card editor-card--nested" key={role.id}>
                  <div className="editor-card__header">
                    <strong>{role.title || 'Role'}</strong>
                    <EditorControls
                      onMoveUp={() =>
                        updateCompany(companyIndex, (item) => ({ ...item, roles: moveItem(item.roles, roleIndex, -1) }))
                      }
                      onMoveDown={() =>
                        updateCompany(companyIndex, (item) => ({ ...item, roles: moveItem(item.roles, roleIndex, 1) }))
                      }
                      onRemove={() =>
                        updateCompany(companyIndex, (item) => ({
                          ...item,
                          roles: item.roles.filter((roleItem) => roleItem.id !== role.id),
                        }))
                      }
                      disableUp={roleIndex === 0}
                      disableDown={roleIndex === company.roles.length - 1}
                    />
                  </div>
                  <div className="field-grid">
                    <Field
                      label="Role"
                      value={role.title}
                      onChange={(value) =>
                        updateCompany(companyIndex, (item) => ({
                          ...item,
                          roles: updateAt(item.roles, roleIndex, (roleItem) => ({ ...roleItem, title: value })),
                        }))
                      }
                    />
                    <Field
                      label="Start Date"
                      value={role.startDate}
                      onChange={(value) =>
                        updateCompany(companyIndex, (item) => ({
                          ...item,
                          roles: updateAt(item.roles, roleIndex, (roleItem) => ({ ...roleItem, startDate: value })),
                        }))
                      }
                    />
                    <Field
                      label="End Date"
                      value={role.endDate}
                      onChange={(value) =>
                        updateCompany(companyIndex, (item) => ({
                          ...item,
                          roles: updateAt(item.roles, roleIndex, (roleItem) => ({ ...roleItem, endDate: value })),
                        }))
                      }
                    />
                  </div>
                  <div className="highlight-list">
                    {role.highlights.map((highlight, highlightIndex) => (
                      <div className="highlight-row" key={`${role.id}-highlight-${highlightIndex}`}>
                        <Field
                          label={`Highlight ${highlightIndex + 1}`}
                          value={highlight}
                          onChange={(value) =>
                            updateCompany(companyIndex, (item) => ({
                              ...item,
                              roles: updateAt(item.roles, roleIndex, (roleItem) => ({
                                ...roleItem,
                                highlights: updateAt(roleItem.highlights, highlightIndex, () => value),
                              })),
                            }))
                          }
                        />
                        <EditorControls
                          onMoveUp={() =>
                            updateCompany(companyIndex, (item) => ({
                              ...item,
                              roles: updateAt(item.roles, roleIndex, (roleItem) => ({
                                ...roleItem,
                                highlights: moveItem(roleItem.highlights, highlightIndex, -1),
                              })),
                            }))
                          }
                          onMoveDown={() =>
                            updateCompany(companyIndex, (item) => ({
                              ...item,
                              roles: updateAt(item.roles, roleIndex, (roleItem) => ({
                                ...roleItem,
                                highlights: moveItem(roleItem.highlights, highlightIndex, 1),
                              })),
                            }))
                          }
                          onRemove={() =>
                            updateCompany(companyIndex, (item) => ({
                              ...item,
                              roles: updateAt(item.roles, roleIndex, (roleItem) => ({
                                ...roleItem,
                                highlights: roleItem.highlights.filter((_, index) => index !== highlightIndex),
                              })),
                            }))
                          }
                          removeLabel="Delete"
                          disableUp={highlightIndex === 0}
                          disableDown={highlightIndex === role.highlights.length - 1}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="button button--secondary"
                      onClick={() =>
                        updateCompany(companyIndex, (item) => ({
                          ...item,
                          roles: updateAt(item.roles, roleIndex, (roleItem) => ({
                            ...roleItem,
                            highlights: [...roleItem.highlights, 'Describe a measurable engineering impact.'],
                          })),
                        }))
                      }
                    >
                      + Add Highlight
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="button button--secondary"
                onClick={() => updateCompany(companyIndex, (item) => ({ ...item, roles: [...item.roles, newRole()] }))}
              >
                + Add Role
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="button button--primary" onClick={() => onChange([...experience, newCompany()])}>
          + Add Company
        </button>
      </div>
    </EditorSection>
  );
}
