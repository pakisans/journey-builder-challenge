import { useCallback, useState } from 'react';
import type { UiData } from '../../domain/graph/types';
import { formatSourceKey } from '../../domain/prefill/formatSourceKey';
import { actions } from '../../state/store';
import { useStore } from '../../state/useStore';
import NodeMappingModal from './NodeMappingModal';

const NodeDetails = ({ data }: { data: UiData }) => {
  const { state, dispatch } = useStore();
  const nodeId = state.selectedNodeId;
  const [modalFieldKey, setModalFieldKey] = useState<string | null>(null);

  const openForField = useCallback((fk: string) => setModalFieldKey(fk), []);
  const closeModal = useCallback(() => setModalFieldKey(null), []);

  const modalOpen = modalFieldKey !== null;

  if (!nodeId) {
    return <div className="p-4 text-gray-500">Select a form to configure prefill.</div>;
  }

  const node = data.byNodeId[nodeId];
  if (!node) return <div className="p-4 text-red-600">Selected form not found.</div>;

  const enabled = state.prefillEnabled[nodeId] ?? true;
  const nodeMappings = state.mappings[nodeId] ?? {};

  return (
    <div className="p-2 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">Prefill</div>
          <div className="text-sm text-gray-500">Prefill fields for this form</div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => dispatch(actions.togglePrefill(nodeId, e.target.checked))}
          />
          Enabled
        </label>
      </div>

      <div className="space-y-2">
        {node.fields.map((f) => {
          const mapping = nodeMappings[f.key] ?? null;

          if (!mapping) {
            return (
              <button
                type="button"
                key={`prefill-panel-btn-${f.key}`}
                disabled={!enabled}
                onClick={() => openForField(f.key)}
                className={`w-full text-left border p-2 rounded ${
                  enabled ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-sm font-medium">{f.key}</div>
                <div className="text-xs text-gray-500">No prefill configured</div>
              </button>
            );
          }

          return (
            <div
              key={`prefill-panel-format-${f.key}`}
              className="border p-2 rounded flex items-center justify-between"
            >
              <div className="text-sm">
                <span className="font-medium">{f.key}:</span>{' '}
                <span className="text-gray-700">{formatSourceKey(mapping, data)}</span>
              </div>

              <button
                className="text-sm border rounded px-2 py-1 hover:bg-gray-50"
                onClick={() => dispatch(actions.clearMapping(nodeId, f.key))}
              >
                X
              </button>
            </div>
          );
        })}
      </div>

      <NodeMappingModal
        data={data}
        nodeId={nodeId}
        fieldKey={modalFieldKey}
        open={modalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default NodeDetails;
