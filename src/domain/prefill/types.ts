import type { UiData } from '../graph/types';

export type PrefillSourceKey = string;

export type PrefillOption = { key: PrefillSourceKey; label: string };

export type PrefillGroup = { label: string; options: PrefillOption[] };

export type PrefillDataSource = {
  id: string;
  label: string;
  getGroups(ctx: { data: UiData; selectedNodeId: string }): PrefillGroup[];
};
