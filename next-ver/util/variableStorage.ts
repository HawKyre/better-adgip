interface IVariableStorage {
    variableExists(s: string): boolean;
}

class VariableStorage implements IVariableStorage {
    variableExists(s: string) {
        return false;
    }
}

let varStore = new VariableStorage();

export const getVariableStorage = () => {
    return varStore;
};
