import { DTree, RandomNode, ResultNode } from '../decision-trees/DTree';
import { IDNodeData } from '../types/types';

export const resultNodeContextMenu = (
    data: IDNodeData,
    setTree: React.Dispatch<React.SetStateAction<DTree>>
) => {
    let menu = [
        {
            title: '🟨 Crear un nodo de decisión',
            onClick: () => {
                setTree((t) => {
                    const newTree: DTree = Object.assign(
                        Object.create(Object.getPrototypeOf(t)),
                        t
                    );

                    console.log(t);

                    newTree.switchNodeType(data.nodeID, 'DEC');
                    return newTree;
                });
            },
        },
        {
            title: '🟢 Crear un nodo de azar',
            onClick: () => {
                setTree((t) => {
                    const newTree: DTree = Object.assign(
                        Object.create(Object.getPrototypeOf(t)),
                        t
                    );

                    console.log(newTree);

                    newTree.switchNodeType(data.nodeID, 'RND');
                    return newTree;
                });
            },
        },
        { title: '💲 Cambiar el valor', onClick: () => {} },
        {
            title: '❌ Eliminar',
            onClick: () => {
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
            },
        },
    ];

    console.log(data);

    if (data.isParentRandomNode) {
        menu.splice(3, 0, {
            title: '🗻 Asignar probabilidad',
            onClick: () => {},
        });
    }

    return menu;
};

export const decisionNodeContextMenu = (
    data: IDNodeData,
    setTree: React.Dispatch<React.SetStateAction<DTree>>
) => {
    let menu = [
        {
            title: '📈 Añadir rama',
            onClick: () => {
                setTree((t) => {
                    const newTree: DTree = Object.assign(
                        Object.create(Object.getPrototypeOf(t)),
                        t
                    );

                    console.log(newTree);

                    newTree.insertNode(data.nodeID, new ResultNode(''));
                    return newTree;
                });
            },
        },
        { title: '🖊 Cambiar el texto', onClick: () => {} },
        { title: '💲 Cambiar el valor', onClick: () => {} },
        {
            title: '❌ Eliminar',
            onClick: () => {
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
            },
        },
    ];

    if (data.isParentRandomNode) {
        menu.splice(3, 0, {
            title: '🗻 Asignar probabilidad',
            onClick: () => {},
        });
    }

    return menu;
};
