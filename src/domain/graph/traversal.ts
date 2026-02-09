import type { UiData } from './types';

export const getDirectUpstream = (nodeId: string, g: UiData): string[] => {
  return g.byNodeId[nodeId]?.prerequisiteNodeIds ?? [];
};

export const getAllUpstream = (nodeId: string, g: UiData): string[] => {
  const visited = new Set<string>();
  const stack = [...getDirectUpstream(nodeId, g)];

  while (stack.length) {
    const cur = stack.pop()!;
    if (visited.has(cur)) continue;
    visited.add(cur);
    for (const p of getDirectUpstream(cur, g)) stack.push(p);
  }

  return [...visited];
};

export const getTransitiveUpstream = (nodeId: string, g: UiData): string[] => {
  const direct = new Set(getDirectUpstream(nodeId, g));
  return getAllUpstream(nodeId, g).filter((id) => !direct.has(id));
};
