export interface INodeMainRubric {
  id: string;
  nodes: {
    id: string;
    name: string;
    mainImageSrc?: string;
  }[];
}
