import { describe, expect, it } from 'vitest';
import { sampleResume } from '../../data/sampleResume';
import { moveItem, updateAt } from './editorUtils';

describe('editor list operations', () => {
  it('moves companies up and down', () => {
    const moved = moveItem(sampleResume.experience, 1, -1);

    expect(moved[0].company).toBe(sampleResume.experience[1].company);
  });

  it('supports multiple roles within a company', () => {
    expect(sampleResume.experience[1].roles).toHaveLength(2);
  });

  it('updates skill categories without changing list shape', () => {
    const updated = updateAt(sampleResume.skills, 0, (skill) => ({ ...skill, value: 'Java, Go' }));

    expect(updated).toHaveLength(sampleResume.skills.length);
    expect(updated[0].value).toBe('Java, Go');
  });

  it('removes experience highlights', () => {
    const role = sampleResume.experience[0].roles[0];
    const updatedHighlights = role.highlights.filter((_, index) => index !== 0);

    expect(updatedHighlights).toHaveLength(role.highlights.length - 1);
  });
});
