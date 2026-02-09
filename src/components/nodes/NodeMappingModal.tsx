import type { UiData } from '../../domain/graph/types';
import Modal from '../shared/Modal';
import { actions } from '../../state/store';
import { useStore } from '../../state/useStore';
import { getPrefillSourcesFromEnv } from '../../domain/prefill/registry';

type Props = {
  data: UiData;
  nodeId: string;
  fieldKey: string | null;
  open: boolean;
  onClose: () => void;
};

const NodeMappingModal = ({ data, nodeId, fieldKey, open, onClose }: Props) => {
  const { dispatch } = useStore();

  if (!open || !fieldKey) return null;

  const ctx = { data, selectedNodeId: nodeId };
  const sources = getPrefillSourcesFromEnv();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Select data element to map"
      description={`Target field: ${fieldKey}`}
    >
      <div className="space-y-4">
        {sources.map((source) => {
          const groups = source.getGroups(ctx);

          return (
            <div key={`prefill-source-${source.id}`} className="space-y-2">
              <div className="text-xs font-semibold uppercase text-gray-500">{source.label}</div>

              {groups.length == 0 ? (
                <div className="text-sm text-gray-500">No available fields for this source.</div>
              ) : (
                groups.map((g) => (
                  <div key={`prefill-group-${source.id}-${g.label}`} className="border rounded p-2">
                    <div className="text-sm font-medium mb-2">{g.label}</div>

                    <div className="space-y-1">
                      {g.options.map((opt) => (
                        <button
                          key={`prefill-opt-${opt.key}`}
                          className="w-full text-left px-2 py-1 rounded hover:bg-gray-50 border"
                          type="button"
                          onClick={() => {
                            dispatch(actions.setMapping(nodeId, fieldKey, opt.key));
                            onClose();
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default NodeMappingModal;
