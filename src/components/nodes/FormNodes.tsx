import type { UiData } from '../../domain/graph/types';
import { actions } from '../../state/store';
import { useStore } from '../../state/useStore';

const FormNodes = ({ data }: { data: UiData }) => {
  const { state, dispatch } = useStore();

  return (
    <div className="flex flex-col gap-2">
      {data.forms
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item, index) => {
          const selected = state.selectedNodeId === item.nodeId;

          return (
            <button
              onClick={() => dispatch(actions.selectNode(item.nodeId))}
              className={`w-full text-left flex flex-col p-2 border ${selected ? 'bg-gray-100 border-gray-400' : 'hover:bg-gray-50'}`}
              key={`form-node-${index}`}
            >
              <span className="font-bold">{item.name}</span>
              <span className="text-xs text-gray">{item.nodeId}</span>
            </button>
          );
        })}
    </div>
  );
};

export default FormNodes;
