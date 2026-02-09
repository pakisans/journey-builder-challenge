import { directUpstreamSource } from './sources/directUpstream';
import { globalSource } from './sources/global';
import { staticSource } from './sources/static';
import { transitiveUpstreamSource } from './sources/transitiveUpstream';
import type { PrefillDataSource } from './types';

export const availableSources: Record<string, PrefillDataSource> = {
  global: globalSource,
  'direct-upstream': directUpstreamSource,
  'transitive-upstream': transitiveUpstreamSource,
  static: staticSource,
};

export const getPrefillSourcesFromEnv = (): PrefillDataSource[] => {
  const raw = (import.meta.env.VITE_PREFILL_SOURCES as string | undefined)?.trim();

  if (!raw) return Object.values(availableSources);

  const ids = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const chosen = ids.map((id) => availableSources[id]).filter(Boolean);
  return chosen.length ? chosen : Object.values(availableSources);
};
