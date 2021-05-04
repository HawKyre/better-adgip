import { useAnimation } from 'framer-motion';
import { useState } from 'react';
import GraphContainer from './GraphContainer';
import Toolbar from './Toolbar';
import VariableTab from './VariableTab';

const ADGIP = () => {
    const variableTabControl = useAnimation();

    return (
        <div>
            <GraphContainer />
            <Toolbar varTabControl={variableTabControl} />
            <VariableTab varTabControl={variableTabControl} />
        </div>
    );
};

export default ADGIP;
