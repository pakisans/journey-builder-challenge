import FormNodes from './components/nodes/FormNodes';
import NodeDetails from './components/nodes/NodeDetails';
import { useFetchActionBlueprintGraph } from './hooks/api/useFetchActionBlueprintGraph';

const App = () => {
  const { data, loading, error } = useFetchActionBlueprintGraph();
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }
  if (!data) return null;
  return (
    <main className="p-4 mt-10">
      <div className="flex gap-4">
        <section className="flex-1 border border-rounded">
          <FormNodes data={data} />
        </section>
        <section className="flex-1 border border-rounded">
          <NodeDetails data={data} />
        </section>
      </div>
    </main>
  );
};

export default App;
