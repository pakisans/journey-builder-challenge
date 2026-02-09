export type UiField = {
  key: string;
  label: string;
  avantosType?: string;
};

export type UiFormNode = {
  nodeId: string;
  name: string;
  prerequisiteNodeIds: string[];
  fields: UiField[];
};

export type UiData = {
  forms: UiFormNode[];
  byNodeId: Record<string, UiFormNode>;
};
