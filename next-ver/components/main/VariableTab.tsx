import { AnimationControls, motion } from 'framer-motion';

interface VariableTabProps {
    varTabControl: AnimationControls;
}

const VariableTab: React.FC<VariableTabProps> = ({ varTabControl }) => {
    return (
        <motion.div
            initial={{ x: '24rem' }}
            animate={varTabControl}
            className="fixed top-0 right-0 h-screen w-96 bg-red-100"
        >
            <h2> Variables!</h2>
        </motion.div>
    );
};

export default VariableTab;
