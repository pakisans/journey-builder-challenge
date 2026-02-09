export type GraphNode = {
  id: string;
  type: 'form' | string;
  data: {
    name: string;
    component_id: string;
    prerequisites: string[];
    input_mapping?: Record<string, unknown>;
  };
};

export type FormDefinition = {
  id: string;
  field_schema: {
    properties: Record<
      string,
      {
        title?: string;
        avantos_type?: string;
        type?: string;
        format?: string;
      }
    >;
  };
};

export type ActionBlueprintGraphResponse = {
  id?: string;
  blueprint_id?: string;
  blueprint_name?: string;
  nodes: GraphNode[] | null;
  forms: FormDefinition[] | null;
  edges: { source: string; target: string }[] | null;
};
