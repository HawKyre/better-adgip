import { RGBColor } from 'd3-color';
import { AnimationControls } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { DNode, DTree } from '../decision-trees/DTree';
import { ContextElement } from './props';

export interface IDNodeData {
    type: string;

    value: number;

    label: string;

    probability: number | undefined;

    children: IDNodeData[];

    isParentRandomNode: boolean;

    nodeID: number;

    isBranchGood?: boolean;

    expectedValue?: number;
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

    // Unique ID for the node
    nodeID: number;

    getChildren: () => DNode[];

    setChildren: (ch: DNode[]) => void;

    getValue: () => number;

    setValue: (arg0: number) => void;

    addChild: (parentID: number, n: DNode) => boolean;

    removeChild: (nodeID: number) => boolean;

    getOptimalTree: () => IDNodeData;

    getChildrenData: () => IDNodeData;

    isValidTree: () => boolean;
}

export interface GraphContainerProps {
    tree: DTree;
    setTree: Dispatch<SetStateAction<DTree>>;
    showVEMTree: boolean;
    visualizationSettings: VisualizationSettings;
}

export interface ContextData {
    items: ContextElement[];
    visible: boolean;
    xPos: number;
    yPos: number;
}

export interface PopupData {
    visible: boolean;
    text: string;
    onSetValue: (n: any) => void;
}

export interface ToolbarProps {
    varTabControl: AnimationControls;
    visTabControl: AnimationControls;
    tree: DTree;
    showVEMTree: boolean;
    setShowVEMTree: Dispatch<SetStateAction<boolean>>;
}

export interface StrokeOptions {
    width: number;
    color: RGBColor;
}

export interface VisualizationSettings {
    [state: string]: number | StrokeOptions;
    rootDx: number;
    rootDy: number;
    spacing: number;
    widthScale: number;
    diagonalPercent: number;
    nodeScale: number;
    fontSize: number;
    normalStroke: StrokeOptions;
    goodPathStroke: StrokeOptions;
    badPathStroke: StrokeOptions;
}

export interface VisualizationOptionsProps {
    visTabOptions: AnimationControls;
    vs: VisualizationSettings;
    setVS: Dispatch<SetStateAction<VisualizationSettings>>;
}
