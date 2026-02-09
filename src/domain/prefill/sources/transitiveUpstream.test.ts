import { describe, it, expect } from 'vitest';
import { transitiveUpstreamSource } from './transitiveUpstream';
import type { UiData } from '../../graph/types';

const data: UiData = {
  forms: [
    {
      nodeId: 'A',
      name: 'Form A',
      prerequisiteNodeIds: [],
      fields: [{ key: 'email', label: 'Email' }],
    },
    {
      nodeId: 'B',
      name: 'Form B',
      prerequisiteNodeIds: ['A'],
      fields: [{ key: 'id', label: 'ID' }],
    },
    { nodeId: 'D', name: 'Form D', prerequisiteNodeIds: ['B'], fields: [] },
  ],
  byNodeId: {
    A: {
      nodeId: 'A',
      name: 'Form A',
      prerequisiteNodeIds: [],
      fields: [{ key: 'email', label: 'Email' }],
    },
    B: {
      nodeId: 'B',
      name: 'Form B',
      prerequisiteNodeIds: ['A'],
      fields: [{ key: 'id', label: 'ID' }],
    },
    D: { nodeId: 'D', name: 'Form D', prerequisiteNodeIds: ['B'], fields: [] },
  },
};

describe('transitiveUpstreamSource', () => {
  it('returns groups for transitive upstream (excluding direct)', () => {
    const groups = transitiveUpstreamSource.getGroups({ data, selectedNodeId: 'D' });
    expect(groups.map((g) => g.label)).toEqual(['Form A']);
    expect(groups[0].options[0].key).toBe('node:A.field:email');
  });
});
