import { useCallback } from 'react';
import { normalizeGraph } from '../../domain/graph/normalize';
import { getActionBlueprintGraph } from '../../services/actionBlueprintGraph';
import { useFetch } from '../shared/useFetch';

export const useFetchActionBlueprintGraph = () => {
  const fn = useCallback(async () => {
    const raw = await getActionBlueprintGraph();
    return normalizeGraph(raw);
  }, []);

  return useFetch(fn);
};
