import { getDirectUpstream } from '../../graph/traversal';
import type { PrefillDataSource } from '../types';

export const directUpstreamSource: PrefillDataSource = {
  id: 'direct-upstream',
  label: 'Direct upstream',
  getGroups: ({ data, selectedNodeId }) => {
    const upstream = getDirectUpstream(selectedNodeId, data);

    return upstream.map((nodeId) => {
      const node = data.byNodeId[nodeId];
      return {
        label: node?.name ?? nodeId,
        options: (node?.fields ?? []).map((f) => ({
          key: `node:${nodeId}.field:${f.key}`,
          label: `${node.name}.${f.key}`,
        })),
      };
    });
  },
};
