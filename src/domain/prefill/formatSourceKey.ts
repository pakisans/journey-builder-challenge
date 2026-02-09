import type { UiData } from '../graph/types';

export const formatSourceKey = (sourceKey: string, data: UiData): string => {
  if (sourceKey.startsWith('global:')) {
    return sourceKey.replace('global:', '');
  }

  const match = sourceKey.match(/^node:(.+)\.field:(.+)$/);
  if (!match) {
    return sourceKey;
  }

  const [, nodeId, fieldKey] = match;
  const node = data.byNodeId[nodeId];

  return `${node?.name ?? nodeId}.${fieldKey}`;
};
