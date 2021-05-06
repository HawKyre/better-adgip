import { ContextProps } from '../../types/props';

const NodeContextMenu: React.FC<ContextProps> = ({
    items,
    visible,
    xPos,
    yPos,
}) => {
    return (
        <div
            className={`absolute bg-white w-80 border border-gray-300 filter drop-shadow flex flex-col z-60 ${
                !visible && 'hidden'
            }`}
            style={{ top: yPos, left: xPos }}
        >
            {visible &&
                items.map((i) => (
                    <button
                        className="p-1 pl-2 text-left hover:bg-gray-100"
                        key={i.title}
                        onClick={i.onClick}
                    >
                        {i.title}
                    </button>
                ))}
        </div>
    );
};

export default NodeContextMenu;
