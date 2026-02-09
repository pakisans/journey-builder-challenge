import { createContext, type Dispatch } from 'react';

export type PrefillSourceKey = string;
export type PrefillMappings = Record<string, Record<string, PrefillSourceKey | null>>;

export type State = {
  selectedNodeId: string | null;
  mappings: PrefillMappings;
  prefillEnabled: Record<string, boolean>;
};

export type Action =
  | { type: 'selectNode'; nodeId: string }
  | { type: 'togglePrefill'; nodeId: string; enabled: boolean }
  | { type: 'setMapping'; nodeId: string; fieldKey: string; sourceKey: PrefillSourceKey }
  | { type: 'clearMapping'; nodeId: string; fieldKey: string };

export const initialState: State = {
  selectedNodeId: null,
  mappings: {},
  prefillEnabled: {},
};

export const actions = {
  selectNode: (nodeId: string): Action => ({ type: 'selectNode', nodeId }),
  togglePrefill: (nodeId: string, enabled: boolean): Action => ({
    type: 'togglePrefill',
    nodeId,
    enabled,
  }),
  setMapping: (nodeId: string, fieldKey: string, sourceKey: PrefillSourceKey): Action => ({
    type: 'setMapping',
    nodeId,
    fieldKey,
    sourceKey,
  }),
  clearMapping: (nodeId: string, fieldKey: string): Action => ({
    type: 'clearMapping',
    nodeId,
    fieldKey,
  }),
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'selectNode': {
      const enabled = state.prefillEnabled[action.nodeId] ?? true;
      return {
        ...state,
        selectedNodeId: action.nodeId,
        prefillEnabled: { ...state.prefillEnabled, [action.nodeId]: enabled },
      };
    }
    case 'togglePrefill':
      return {
        ...state,
        prefillEnabled: { ...state.prefillEnabled, [action.nodeId]: action.enabled },
      };

    case 'setMapping': {
      const nodeMappings = state.mappings[action.nodeId] ?? {};
      return {
        ...state,
        mappings: {
          ...state.mappings,
          [action.nodeId]: { ...nodeMappings, [action.fieldKey]: action.sourceKey },
        },
      };
    }

    case 'clearMapping': {
      const nodeMappings = state.mappings[action.nodeId] ?? {};
      return {
        ...state,
        mappings: {
          ...state.mappings,
          [action.nodeId]: { ...nodeMappings, [action.fieldKey]: null },
        },
      };
    }

    default:
      return state;
  }
};

export const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);
