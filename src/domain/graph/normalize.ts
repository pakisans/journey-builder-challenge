import type { ActionBlueprintGraphResponse } from '../../services/types';
import type { UiData } from './types';

export const normalizeGraph = (payload: ActionBlueprintGraphResponse): UiData => {
  const formsById = new Map((payload.forms ?? []).map((f) => [f.id, f]));

  const uiForms = (payload.nodes ?? [])
    .filter((n) => n.type === 'form')
    .map((n) => {
      const def = formsById.get(n.data.component_id);
      const props = def?.field_schema.properties ?? {};

      const fields = Object.entries(props)
        .filter(([key]) => key !== 'button')
        .map(([key, meta]) => ({
          key,
          label: meta.title ?? key,
          avantosType: meta.avantos_type,
        }));

      return {
        nodeId: n.id,
        name: n.data.name,
        prerequisiteNodeIds: n.data.prerequisites ?? [],
        fields,
      };
    });

  return {
    forms: uiForms,
    byNodeId: Object.fromEntries(uiForms.map((f) => [f.nodeId, f])),
  };
};
