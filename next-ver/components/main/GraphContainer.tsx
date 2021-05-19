import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    DTree,
    getBigExampleTree,
    getExampleTree,
} from '../../decision-trees/DTree';
import {
    ContextData,
    GraphContainerProps,
    IDNodeData,
    PopupData,
} from '../../types/types';
import {
    decisionNodeContextMenu,
    resultNodeContextMenu,
} from '../../util/contextMenus';
import NodeContextMenu from './NodeContextMenu';
import TreeGraph from './TreeGraph';
import ValueUpdate from './UpdatePopup';

const GraphContainer: React.FC<GraphContainerProps> = ({
    setTree,
    tree,
    showVEMTree,
    visualizationSettings,
}) => {
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [popupData, setPopupData] = useState<PopupData>({
        visible: false,
        text: '',
        onSetValue: () => {},
    });

    useEffect(() => {
        if (popupData.visible) {
            inputRef.current.focus();
        }
    }, [popupData.visible]);

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
                items: resultNodeContextMenu(
                    data,
                    setTree,
                    popupData,
                    setPopupData
                ),
                visible: true,
                xPos: event.x + window.scrollX,
                yPos: event.y + window.scrollY,
            });
        } else if (data.type === 'DEC' || data.type === 'RND') {
            setContextData({
                items: decisionNodeContextMenu(
                    data,
                    setTree,
                    popupData,
                    setPopupData
                ),
                visible: true,
                xPos: event.x + window.scrollX,
                yPos: event.y + window.scrollY,
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
            <TreeGraph
                tree={tree}
                showNodeContextMenu={showNodeContextMenu}
                isOptimalTree={showVEMTree}
                settings={visualizationSettings}
            />
            <NodeContextMenu
                items={contextData.items}
                visible={contextData.visible}
                xPos={contextData.xPos}
                yPos={contextData.yPos}
            />
            <ValueUpdate
                popupData={popupData}
                setPopupData={setPopupData}
                inputRef={inputRef}
            />
        </div>
    );
};

export default GraphContainer;
