import { useAnimation } from 'framer-motion';
import { useState } from 'react';
import { DTree, getExampleTree } from '../../decision-trees/DTree';
import GraphContainer from './GraphContainer';
import Toolbar from './Toolbar';
import VariableTab from './VariableTab';

const ADGIP = () => {
    const variableTabControl = useAnimation();
    const [tree, setTree] = useState<DTree>(getExampleTree());
    const [showVEMTree, setShowVEMTree] = useState(false);

    return (
        <div>
            <GraphContainer
                tree={tree}
                setTree={setTree}
                showVEMTree={showVEMTree}
            />
            <Toolbar
                varTabControl={variableTabControl}
                tree={tree}
                setShowVEMTree={setShowVEMTree}
                showVEMTree={showVEMTree}
            />
            <VariableTab varTabControl={variableTabControl} />
        </div>
    );
};

export default ADGIP;
