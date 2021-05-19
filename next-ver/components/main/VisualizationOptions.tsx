import { rgb, RGBColor } from 'd3-color';
import { AnimationControls, motion } from 'framer-motion';
import React, { useState } from 'react';
import {
    StrokeOptions,
    VisualizationOptionsProps,
    VisualizationSettings,
} from '../../types/types';

const VisualizationOptions: React.FC<VisualizationOptionsProps> = ({
    visTabOptions,
    vs,
    setVS,
}) => {
    const [selectedColor, setSelectedColor] = useState('normalStroke');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        if (typeof vs[name] === 'number') {
            const valueNum = parseFloat(value);
            if (valueNum) {
                setVS((x) => {
                    return { ...x, [name]: valueNum };
                });
            }
        }
    };

    const handleColorPropertiesChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        if (name === 'color') {
            setVS((x) => {
                let col: RGBColor = rgb(value);

                return {
                    ...x,
                    [selectedColor]: {
                        color: col,
                        width: x[selectedColor].width,
                    },
                };
            });
        } else if (name === 'opacity') {
            setVS((x) => {
                let col: RGBColor = x[selectedColor].color;
                col.opacity = value;
                return {
                    ...x,
                    [selectedColor]: {
                        color: col,
                        width: x[selectedColor].width,
                    },
                };
            });
        } else if (name === 'width') {
            setVS((x) => {
                return {
                    ...x,
                    [selectedColor]: {
                        color: x[selectedColor].color,
                        width: value,
                    },
                };
            });
        }
    };

    const handleFontSize = (e: React.MouseEventHandler<HTMLButtonElement>) => {
        const name = e.currentTarget.name;

        switch (name) {
            case 'small':
                setVS((x) => {
                    return { ...x, fontSize: 12 };
                });
                break;
            case 'medium':
                setVS((x) => {
                    return { ...x, fontSize: 14 };
                });
                break;
            case 'large':
                setVS((x) => {
                    return { ...x, fontSize: 16 };
                });
                break;
        }
    };

    return (
        <div>
            return (
            <motion.div
                initial={{ x: '24rem' }}
                animate={visTabOptions}
                className="fixed top-0 right-0 h-screen w-120  shadow-2xl px-10"
            >
                <h2 className="h-auto text-4xl flex items-center justify-center my-6 col-span-2">
                    Visualization options
                </h2>
                <hr className="bg-gray-200 my-8" />
                <div className="grid grid-cols-2 mb-4">
                    <p className="col-start-1 flex flex-row items-center">
                        Vertical distance
                    </p>
                    <div className="col-start-2 flex flex-row items-center justify-end">
                        <input
                            name="rootDx"
                            className="w-36"
                            type="range"
                            min="40"
                            max="500"
                            onChange={handleChange}
                            value={vs.rootDx}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 mb-4">
                    <p className="col-start-1 flex flex-row items-center">
                        Horizontal distance
                    </p>
                    <div className="col-start-2 flex flex-row items-center justify-end">
                        <input
                            name="rootDy"
                            className="w-36"
                            type="range"
                            min="280"
                            max="500"
                            onChange={handleChange}
                            value={vs.rootDy}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 mb-4">
                    <p className="col-start-1 flex flex-row items-center">
                        Node size
                    </p>
                    <div className="col-start-2 flex flex-row items-center justify-end">
                        <input
                            name="nodeScale"
                            className="w-36"
                            type="range"
                            min="0.2"
                            max="2"
                            step="0.05"
                            onChange={handleChange}
                            value={vs.nodeScale}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 mb-4">
                    <p className="col-start-1 flex flex-row items-center">
                        Diagonal line breaking point
                    </p>
                    <div className="col-start-2 flex flex-row items-center justify-end">
                        <input
                            name="diagonalPercent"
                            className="w-36"
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            onChange={handleChange}
                            value={vs.diagonalPercent}
                        />
                    </div>
                </div>
                <hr className="bg-gray-200 my-8" />
                <nav className="flex flex-row justify-around items-center list-none mb-8">
                    <li
                        onClick={() => {
                            setSelectedColor('normalStroke');
                        }}
                        className={`${
                            selectedColor === 'normalStroke' || 'text-gray-200'
                        } cursor-pointer`}
                    >
                        Normal
                    </li>
                    <li
                        onClick={() => {
                            setSelectedColor('goodPathStroke');
                        }}
                        className={`${
                            selectedColor === 'goodPathStroke' ||
                            'text-gray-200'
                        } cursor-pointer`}
                    >
                        Good path
                    </li>
                    <li
                        onClick={() => {
                            setSelectedColor('badPathStroke');
                        }}
                        className={`${
                            selectedColor === 'badPathStroke' || 'text-gray-200'
                        } cursor-pointer`}
                    >
                        Bad path
                    </li>
                </nav>
                <div className="grid grid-cols-2 mb-4">
                    <p className="col-start-1 flex flex-row items-center">
                        Color
                    </p>
                    <div className="col-start-2 flex flex-row items-center justify-end">
                        <input
                            name="color"
                            type="color"
                            className="w-36"
                            onChange={handleColorPropertiesChange}
                            value={vs[selectedColor].color.formatRgb()}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 mb-4">
                    <p className="col-start-1 flex flex-row items-center">
                        Opacity
                    </p>
                    <div className="col-start-2 flex flex-row items-center justify-end">
                        <input
                            name="opacity"
                            className="w-36"
                            type="range"
                            min="0.05"
                            max="1"
                            step="0.05"
                            onChange={handleColorPropertiesChange}
                            value={vs[selectedColor].color.opacity}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 mb-4">
                    <p className="col-start-1 flex flex-row items-center">
                        Width
                    </p>
                    <div className="col-start-2 flex flex-row items-center justify-end">
                        <input
                            name="width"
                            className="w-36"
                            type="range"
                            min="0.5"
                            max="5"
                            step="0.1"
                            onChange={handleColorPropertiesChange}
                            value={vs[selectedColor].width}
                        />
                    </div>
                </div>
                <hr className="bg-gray-200 my-8" />
                <div className="grid grid-cols-2 mb-4">
                    <p className="col-start-1 flex flex-row items-center">
                        Font size
                    </p>
                    <div className="col-start-2 flex flex-row items-center justify-end">
                        <button
                            className={`text-xs ${
                                vs.fontSize === 12 || 'text-gray-200'
                            }`}
                            onClick={handleFontSize}
                            name="small"
                        >
                            Small
                        </button>
                        <p className="mx-4">·</p>
                        <button
                            className={`text-sm ${
                                vs.fontSize === 14 || 'text-gray-200'
                            }`}
                            onClick={handleFontSize}
                            name="medium"
                        >
                            Medium
                        </button>
                        <p className="mx-4">·</p>
                        <button
                            className={`text-base ${
                                vs.fontSize === 16 || 'text-gray-200'
                            }`}
                            onClick={handleFontSize}
                            name="large"
                        >
                            Large
                        </button>
                    </div>
                </div>
            </motion.div>
            );
        </div>
    );
};

export default VisualizationOptions;
