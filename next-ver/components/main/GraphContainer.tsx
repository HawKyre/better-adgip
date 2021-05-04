import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    DTree,
    getBigExampleTree,
    getExampleTree,
} from '../../decision-trees/DTree';
import { ContextElement } from '../../types/props';
import { IDNode, IDNodeData } from '../../types/types';
import {
    decisionNodeContextMenu,
    resultNodeContextMenu,
} from '../../util/contextMenus';
import NodeContextMenu from './NodeContextMenu';
import TreeGraph from './TreeGraph';

interface GraphContainerProps {}

interface ContextData {
    items: ContextElement[];
    visible: boolean;
    xPos: number;
    yPos: number;
}

const GraphContainer: React.FC<GraphContainerProps> = () => {
    const [tree, setTree] = useState<DTree>(getExampleTree());

    const [contextData, setContextData] = useState<ContextData>({
        items: [],
        visible: false,
        xPos: 0,
        yPos: 0,
    });

    const showNodeContextMenu = (
        event: MouseEvent,
        { data }: { data: IDNodeData }
    ) => {
        event.preventDefault();

        if (data.type === 'RES') {
            setContextData({
                items: resultNodeContextMenu(data, setTree),
                visible: true,
                xPos: event.x + window.scrollX,
                yPos: event.y + window.scrollY,
            });
        } else if (data.type === 'DEC' || data.type === 'RND') {
            setContextData({
                items: decisionNodeContextMenu(data, setTree),
                visible: true,
                xPos: event.x,
                yPos: event.y,
            });
        }
    };

    // With help from https://www.pluralsight.com/guides/how-to-create-a-right-click-menu-using-react

    const handleClick = useCallback(() => {
        contextData.visible &&
            setContextData({
                items: [],
                visible: false,
                xPos: 0,
                yPos: 0,
            });
    }, [contextData.visible]);

    useEffect(() => {
        document.addEventListener('click', handleClick);
    });

    return (
        <div className="">
            <TreeGraph tree={tree} showNodeContextMenu={showNodeContextMenu} />
            <NodeContextMenu
                items={contextData.items}
                visible={contextData.visible}
                xPos={contextData.xPos}
                yPos={contextData.yPos}
            />
        </div>
    );
};

export default GraphContainer;
