import { describe, it, expect } from 'vitest';
import { initialState, reducer } from './store';
import type { State } from './store';

describe('store reducer', () => {
  it('togglePrefill sets enabled flag per node', () => {
    const s1 = reducer(initialState, {
      type: 'togglePrefill',
      nodeId: 'nodeA',
      enabled: false,
    });

    expect(s1.prefillEnabled['nodeA']).toBe(false);

    const s2 = reducer(s1, {
      type: 'togglePrefill',
      nodeId: 'nodeA',
      enabled: true,
    });

    expect(s2.prefillEnabled['nodeA']).toBe(true);
  });

  it('setMapping writes mapping for selected node + field and closes modal', () => {
    const base: State = {
      ...initialState,
      selectedNodeId: 'nodeA',
    };

    const s1 = reducer(base, {
      type: 'setMapping',
      nodeId: 'nodeA',
      fieldKey: 'email',
      sourceKey: 'node:nodeB.field:id',
    });

    expect(s1.mappings['nodeA']?.['email']).toBe('node:nodeB.field:id');
  });

  it('clearMapping sets mapping to null only for that field (keeps other fields)', () => {
    const base: State = {
      ...initialState,
      mappings: {
        nodeA: {
          email: 'node:nodeB.field:id',
          name: 'global:user.id',
        },
      },
    };

    const s1 = reducer(base, { type: 'clearMapping', nodeId: 'nodeA', fieldKey: 'email' });

    expect(s1.mappings['nodeA']?.['email']).toBe(null);
    expect(s1.mappings['nodeA']?.['name']).toBe('global:user.id');
  });
});
