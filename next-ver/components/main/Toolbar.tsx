import { FaCalculator, FaClipboardList, FaCog } from 'react-icons/fa';
import { AnimationControls, motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { ToolbarProps } from '../../types/types';

const Toolbar: React.FC<ToolbarProps> = ({
    varTabControl,
    visTabControl,
    tree,
    showVEMTree,
    setShowVEMTree,
}) => {
    const showToolbarControls = useAnimation();
    const clipboardControl = useAnimation();
    const calculatorControl = useAnimation();
    const [rightTabState, setRightTabState] = useState<AnimationControls>();

    const handleAnimation = (e) => {
        if (e._reactName === 'onMouseEnter') {
            showToolbarControls.start({
                y: -30,
            });
        } else if (e._reactName === 'onMouseLeave') {
            showToolbarControls.start({
                y: 100,
            });
        }
    };

    const handleRightTabAnimation = (animControl: AnimationControls) => {
        if (rightTabState) {
            if (rightTabState === animControl) {
                rightTabState.start({
                    x: '32rem',
                    transition: {
                        duration: 0.3,
                    },
                });
                setRightTabState(undefined);
                return;
            } else {
                rightTabState.start({
                    x: '32rem',
                    transition: {
                        duration: 0.3,
                    },
                });
            }
        }

        animControl.start({
            x: 0,
            transition: {
                duration: 0.3,
            },
        });
        setRightTabState(animControl);
    };

    const handleCalculate = () => {
        if (tree.isValidTree()) {
            calculatorControl.start({
                color: !showVEMTree ? '#6EE7B7' : '#000',
                transition: {
                    duration: 0.3,
                },
            });
            setShowVEMTree((x) => !x);
            console.log(showVEMTree);
        } else {
            console.error('Tree is not valid.');
        }
    };

    return (
        <div className="absolute top-0 h-screen w-screen z-10 pointer-events-none">
            <motion.div
                initial={{ y: 100, x: '50%' }}
                animate={showToolbarControls}
                className="fixed bottom-0 h-auto right-2/4 inline-flex flex-row justify-center bg-white rounded border-2 p-3 filter drop-shadow-lg z-20 pointer-events-auto"
                onMouseEnter={handleAnimation}
                onMouseLeave={handleAnimation}
            >
                <motion.div animate={calculatorControl}>
                    <FaCalculator
                        className="cursor-pointer mr-4 text-5xl filter drop-shadow-icon"
                        onClick={handleCalculate}
                    />
                </motion.div>
                <FaCog
                    onClick={() => handleRightTabAnimation(visTabControl)}
                    className="cursor-pointer mr-4 text-5xl filter drop-shadow-icon"
                />
                <motion.div animate={clipboardControl}>
                    <FaClipboardList
                        onClick={() => handleRightTabAnimation(varTabControl)}
                        className={`cursor-pointer text-5xl filter drop-shadow-icon`}
                    />
                </motion.div>
            </motion.div>
            <div
                style={{ zIndex: -1 }}
                className="fixed w-screen bottom-0 h-32 z-20 pointer-events-auto"
                onMouseEnter={handleAnimation}
                onMouseLeave={handleAnimation}
            ></div>
        </div>
    );
};

export default Toolbar;
