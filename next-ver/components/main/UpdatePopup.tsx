import React, { useRef } from 'react';
import { PopupData } from '../../types/types';

interface ValueUpdateProps {
    popupData: PopupData;
    setPopupData: React.Dispatch<React.SetStateAction<PopupData>>;
    inputRef: React.MutableRefObject<HTMLInputElement>;
}

const ValueUpdate: React.FC<ValueUpdateProps> = ({
    popupData,
    setPopupData,
    inputRef,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPopupData((p) => {
            return {
                text: e.target.value,
                visible: true,
                onSetValue: p.onSetValue,
            };
        });
    };

    const acceptValue = () => {
        popupData.onSetValue(popupData.text);
        setPopupData((x) => {
            return {
                visible: false,
                text: x.text,
                onSetValue: () => {},
            };
        });
    };

    const cancelValue = () => {
        setPopupData((x) => {
            return {
                visible: false,
                text: '',
                onSetValue: () => {},
            };
        });
    };

    return (
        <>
            {popupData.visible && (
                <>
                    <div className="fixed h-screen w-screen top-0 right-0 z-30 bg-black opacity-20"></div>
                    <div className="fixed top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 z-40 p-4 bg-white rounded flex flex-col">
                        <p>Nuevo valor: </p>
                        <input
                            className="mt-2 py-1 px-2 border-b-2 border-gray-400 focus:rounded focus:bg-gray-100"
                            ref={inputRef}
                            type="text"
                            placeholder="Valor..."
                            value={popupData.text}
                            onChange={handleChange}
                            onKeyUp={(
                                e: React.KeyboardEvent<HTMLInputElement>
                            ) => {
                                if (e.key === 'Enter') {
                                    acceptValue();
                                }
                            }}
                        />
                        <div className="mt-4 flex flex-row justify-center items-center">
                            <button
                                className="mr-4 py-1 px-2 transition-all bg-green-500 rounded border-2 border-green-500 focus:bg-white"
                                onClick={acceptValue}
                            >
                                Aceptar
                            </button>
                            <button
                                className="py-1 px-2 transition-all bg-red-500 rounded border-2 border-red-500 focus:bg-white"
                                onClick={cancelValue}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ValueUpdate;
