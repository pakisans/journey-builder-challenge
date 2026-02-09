import { describe, it, expect } from 'vitest';
import type { UiData } from './types';
import { getDirectUpstream, getAllUpstream, getTransitiveUpstream } from './traversal';

const data: UiData = {
  forms: [
    { nodeId: 'A', name: 'Form A', prerequisiteNodeIds: [], fields: [] },
    { nodeId: 'B', name: 'Form B', prerequisiteNodeIds: ['A'], fields: [] },
    { nodeId: 'D', name: 'Form D', prerequisiteNodeIds: ['B'], fields: [] },
  ],
  byNodeId: {
    A: { nodeId: 'A', name: 'Form A', prerequisiteNodeIds: [], fields: [] },
    B: { nodeId: 'B', name: 'Form B', prerequisiteNodeIds: ['A'], fields: [] },
    D: { nodeId: 'D', name: 'Form D', prerequisiteNodeIds: ['B'], fields: [] },
  },
};

describe('graph traversal', () => {
  it('getDirectUpstream returns prerequisites', () => {
    expect(getDirectUpstream('D', data)).toEqual(['B']);
  });

  it('getAllUpstream returns all upstream nodes', () => {
    expect(new Set(getAllUpstream('D', data))).toEqual(new Set(['B', 'A']));
  });

  it('getTransitiveUpstream excludes direct upstream', () => {
    expect(getTransitiveUpstream('D', data)).toEqual(['A']);
  });
});
