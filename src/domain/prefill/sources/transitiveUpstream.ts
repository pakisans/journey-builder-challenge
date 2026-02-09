import { getTransitiveUpstream } from '../../graph/traversal';
import type { PrefillDataSource } from '../types';

export const transitiveUpstreamSource: PrefillDataSource = {
  id: 'transitive-upstream',
  label: 'Transitive upstream',
  getGroups: ({ data, selectedNodeId }) => {
    const upstream = getTransitiveUpstream(selectedNodeId, data);

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
