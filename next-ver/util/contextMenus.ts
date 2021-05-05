import { DTree, RandomNode, ResultNode } from '../decision-trees/DTree';
import { IDNodeData, PopupData } from '../types/types';

const probabilityOnClick = (
    setTree: React.Dispatch<React.SetStateAction<DTree>>,
    data: IDNodeData,
    setPopupData: React.Dispatch<React.SetStateAction<PopupData>>
) => {
    const onSetValue = (n: string) => {
        if (!n || n === '') return;

        let probValue = parseFloat(n);
        if (!probValue || probValue < 0 || probValue > 1) return;

        setTree((t) => {
            const newTree: DTree = Object.assign(
                Object.create(Object.getPrototypeOf(t)),
                t
            );
            newTree.updateNode(data.nodeID, {
                probability: probValue,
            });
            return newTree;
        });
    };

    setPopupData({
        text: '',
        visible: true,
        onSetValue: onSetValue,
    });
};

const valueOnClick = (
    setTree: React.Dispatch<React.SetStateAction<DTree>>,
    data: IDNodeData,
    setPopupData: React.Dispatch<React.SetStateAction<PopupData>>
) => {
    const onSetValue = (n: string) => {
        if (!n || n === '') return;

        let numValue = parseFloat(n);
        if (!numValue) return;

        setTree((t) => {
            const newTree: DTree = Object.assign(
                Object.create(Object.getPrototypeOf(t)),
                t
            );
            newTree.updateNode(data.nodeID, {
                value: numValue,
            });
            return newTree;
        });
    };

    setPopupData({
        text: '',
        visible: true,
        onSetValue: onSetValue,
    });
};

const textOnClick = (
    setTree: React.Dispatch<React.SetStateAction<DTree>>,
    data: IDNodeData,
    setPopupData: React.Dispatch<React.SetStateAction<PopupData>>
) => {
    const onSetValue = (n: string) => {
        if (!n || n === '') return;

        setTree((t) => {
            const newTree: DTree = Object.assign(
                Object.create(Object.getPrototypeOf(t)),
                t
            );
            newTree.updateNode(data.nodeID, {
                label: n,
            });
            return newTree;
        });
    };

    setPopupData({
        text: '',
        visible: true,
        onSetValue: onSetValue,
    });
};

const eraseOnClick = (
    setTree: React.Dispatch<React.SetStateAction<DTree>>,
    data: IDNodeData
) => {
    // Confirmation dialog
    // Erase node
    setTree((t) => {
        const newTree: DTree = Object.assign(
            Object.create(Object.getPrototypeOf(t)),
            t
        );

        console.log(newTree);

        newTree.deleteNode(data.nodeID);
        return newTree;
    });
};

const addBranchTab = (
    setTree: React.Dispatch<React.SetStateAction<DTree>>,
    data: IDNodeData
) => {
    setTree((t) => {
        const newTree: DTree = Object.assign(
            Object.create(Object.getPrototypeOf(t)),
            t
        );

        console.log(newTree);

        newTree.insertNode(data.nodeID, new ResultNode(''));
        return newTree;
    });
};

const createRandomOnClick = (
    setTree: React.Dispatch<React.SetStateAction<DTree>>,
    data: IDNodeData
) => {
    setTree((t) => {
        const newTree: DTree = Object.assign(
            Object.create(Object.getPrototypeOf(t)),
            t
        );

        console.log(newTree);

        newTree.switchNodeType(data.nodeID, 'RND');
        return newTree;
    });
};

const createDecisionOnClick = (
    setTree: React.Dispatch<React.SetStateAction<DTree>>,
    data: IDNodeData
) => {
    setTree((t) => {
        const newTree: DTree = Object.assign(
            Object.create(Object.getPrototypeOf(t)),
            t
        );

        console.log(t);

        newTree.switchNodeType(data.nodeID, 'DEC');
        return newTree;
    });
};

export const resultNodeContextMenu = (
    data: IDNodeData,
    setTree: React.Dispatch<React.SetStateAction<DTree>>,
    popupData: PopupData,
    setPopupData: React.Dispatch<React.SetStateAction<PopupData>>
) => {
    let menu = [
        {
            title: '🟨 Crear un nodo de decisión',
            onClick: () => createDecisionOnClick(setTree, data),
        },
        {
            title: '🟢 Crear un nodo de azar',
            onClick: () => createRandomOnClick(setTree, data),
        },
        {
            title: '🖊 Cambiar el texto',
            onClick: () => textOnClick(setTree, data, setPopupData),
        },
        {
            title: '💲 Cambiar el valor',
            onClick: () => valueOnClick(setTree, data, setPopupData),
        },
        {
            title: '❌ Eliminar',
            onClick: () => eraseOnClick(setTree, data),
        },
    ];

    console.log(data);

    if (data.isParentRandomNode) {
        menu.splice(3, 0, {
            title: '🗻 Asignar probabilidad',
            onClick: () => probabilityOnClick(setTree, data, setPopupData),
        });
    }

    return menu;
};

export const decisionNodeContextMenu = (
    data: IDNodeData,
    setTree: React.Dispatch<React.SetStateAction<DTree>>,
    popupData: PopupData,
    setPopupData: React.Dispatch<React.SetStateAction<PopupData>>
) => {
    let menu = [
        {
            title: '📈 Añadir rama',
            onClick: () => addBranchTab(setTree, data),
        },
        {
            title: '🖊 Cambiar el texto',
            onClick: () => textOnClick(setTree, data, setPopupData),
        },
        {
            title: '💲 Cambiar el valor',
            onClick: () => valueOnClick(setTree, data, setPopupData),
        },
        {
            title: '❌ Eliminar',
            onClick: () => eraseOnClick(setTree, data),
        },
    ];

    if (data.isParentRandomNode) {
        menu.splice(3, 0, {
            title: '🗻 Asignar probabilidad',
            onClick: () => probabilityOnClick(setTree, data, setPopupData),
        });
    }

    return menu;
};
