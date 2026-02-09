import { describe, it, expect, vi } from 'vitest';

describe('prefill registry', () => {
  it('falls back to all sources when VITE_PREFILL_SOURCES is empty', async () => {
    vi.stubEnv('VITE_PREFILL_SOURCES', '');
    const mod = await import('./registry');
    expect(mod.getPrefillSourcesFromEnv().length).toBe(Object.keys(mod.availableSources).length);
  });

  it('selects only configured sources (comma-separated)', async () => {
    vi.stubEnv('VITE_PREFILL_SOURCES', 'global,direct-upstream');
    const mod = await import('./registry');
    const ids = mod.getPrefillSourcesFromEnv().map((s) => s.id);
    expect(new Set(ids)).toEqual(new Set(['global', 'direct-upstream']));
  });
});
