import { rgb } from 'd3-color';
import { useAnimation } from 'framer-motion';
import { useState } from 'react';
import { DTree, getExampleTree } from '../../decision-trees/DTree';
import { VisualizationSettings } from '../../types/types';
import GraphContainer from './GraphContainer';
import Toolbar from './Toolbar';
import VariableTab from './VariableTab';
import VisualizationOptions from './VisualizationOptions';

const ADGIP = () => {
    const variableTabControl = useAnimation();
    const visualizationOptionsTabControl = useAnimation();
    const [tree, setTree] = useState<DTree>(getExampleTree());
    const [showVEMTree, setShowVEMTree] = useState(false);
    const [visualizationSettings, setVS] = useState<VisualizationSettings>({
        badPathStroke: {
            color: rgb(0, 0, 0, 0.1),
            width: 2,
        },
        diagonalPercent: 0.2,
        fontSize: 14, // Only 12, 14 or 16.
        nodeScale: 1,
        rootDx: 95,
        rootDy: 400,
        spacing: 1, // Don't modify
        widthScale: 0.5, // Don't modify
        goodPathStroke: {
            color: rgb(0, 0, 0, 1),
            width: 2,
        },
        normalStroke: {
            color: rgb(0, 0, 0, 0.4),
            width: 2,
        },
    });

    return (
        <div>
            <GraphContainer
                tree={tree}
                setTree={setTree}
                showVEMTree={showVEMTree}
                visualizationSettings={visualizationSettings}
            />
            <Toolbar
                varTabControl={variableTabControl}
                visTabControl={visualizationOptionsTabControl}
                tree={tree}
                setShowVEMTree={setShowVEMTree}
                showVEMTree={showVEMTree}
            />
            <VariableTab varTabControl={variableTabControl} />
            <VisualizationOptions
                visTabOptions={visualizationOptionsTabControl}
                vs={visualizationSettings}
                setVS={setVS}
            />
        </div>
    );
};

export default ADGIP;
