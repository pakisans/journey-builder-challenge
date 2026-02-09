import type { ActionBlueprintGraphResponse } from './types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const TENANT_ID = import.meta.env.VITE_TENANT_ID as string;
const BLUEPRINT_ID = import.meta.env.VITE_BLUEPRINT_ID as string;

export const getActionBlueprintGraph = async (): Promise<ActionBlueprintGraphResponse> => {
  const url = `${BASE_URL}/api/v1/${TENANT_ID}/actions/blueprints/${BLUEPRINT_ID}/graph`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Graph fetch failed: ${res.status}`);

  return res.json();
};
