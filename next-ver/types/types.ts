import { DNode } from '../decision-trees/DTree';

export interface IDNodeData extends IDNode {
    type: string;
}

export type NodeData = d3.HierarchyPointNode<IDNodeData>;

export interface IDNode {
    // Represents the value that the person will receive by going through this node.
    // Negative values represent costs.
    value: number;

    // The label of the closest left edge of the node
    label: string;

    // If (parent typeof RandomNode), this value represents the chance of going to this node
    // Otherwise, this value will be undefined
    probability: number | undefined;

    // The children of the node
    children: DNode[];

    // Whether the parent is a random node
    isParentRandomNode: boolean;

    // Represents the value to be obtained by choosing the optimum path through the children
    expectedValue: number;

    // Unique ID for the node
    nodeID: number;

    getChildren: () => DNode[];

    setChildren: (ch: DNode[]) => void;

    getValue: () => number;

    setValue: (arg0: number) => void;

    addChild: (parentID: number, n: DNode) => boolean;

    removeChild: (nodeID: number) => boolean;

    calculate: () => number;

    getChildrenData: (isParentRandom: boolean) => object;
}
