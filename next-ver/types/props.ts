export interface ContextElement {
    title: string;
    onClick: () => void;
}

export interface ContextProps {
    items: ContextElement[];
    visible: boolean;
    xPos: number;
    yPos: number;
}
