import { describe, it, expect } from 'vitest';
import { globalSource } from './global';

describe('globalSource', () => {
  it('returns stable global groups', () => {
    const groups = globalSource.getGroups({
      data: { forms: [], byNodeId: {} },
      selectedNodeId: 'x',
    });
    expect(groups[0].label).toBe('User');
    expect(groups[0].options[0].key).toContain('global:');
  });
});
