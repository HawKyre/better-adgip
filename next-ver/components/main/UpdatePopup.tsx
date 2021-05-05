import React, { useRef } from 'react';
import { PopupData } from '../../types/types';

interface ValueUpdateProps {
    popupData: PopupData;
    setPopupData: React.Dispatch<React.SetStateAction<PopupData>>;
}

const ValueUpdate: React.FC<ValueUpdateProps> = ({
    popupData,
    setPopupData,
}) => {
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPopupData((p) => {
            return {
                text: e.target.value,
                visible: true,
                onSetValue: p.onSetValue,
            };
        });
    };
    return (
        <>
            {popupData.visible && (
                <>
                    <div className="fixed h-screen w-screen top-0 right-0 z-30 bg-black opacity-20"></div>
                    <div className="fixed top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 z-40 p-2 bg-white rounded flex flex-col">
                        <p>Nuevo valor: </p>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Valor..."
                            value={popupData.text}
                            onChange={handleChange}
                        />
                        <button
                            onClick={() => {
                                popupData.onSetValue(popupData.text);
                                setPopupData((x) => {
                                    return {
                                        visible: false,
                                        text: x.text,
                                        onSetValue: () => {},
                                    };
                                });
                            }}
                        >
                            Aceptar
                        </button>
                        <button
                            onClick={() => {
                                setPopupData((x) => {
                                    return {
                                        visible: false,
                                        text: '#CANCELLED#',
                                        onSetValue: () => {},
                                    };
                                });
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default ValueUpdate;
