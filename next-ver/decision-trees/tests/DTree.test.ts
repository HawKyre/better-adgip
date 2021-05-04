const {
    DTree,
    DNode,
    DecisionNode,
    RandomNode,
    ResultNode,
} = require('../DTree');

test('Create an empty tree', () => {
    const tree = new DTree();
    expect(tree.getTreeData()).toStrictEqual({
        name: 'root',
        nodeID: 0,
        value: 0,
        probability: -1,
        children: [],
    });
});

test('Create a small tree', () => {
    const tree: typeof DTree = new DTree();
    for (let i = 0; i < 3; i++) {
        let n = new ResultNode('Rand' + i, i * 10 + 10);
        tree.insertNode(0, n);
    }
    // console.log(tree.getTreeData());
    expect(tree.getTreeData()).toStrictEqual({
        name: 'root',
        nodeID: 0,
        value: 0,
        probability: -1,
        children: [
            { name: 'Rand0', nodeID: 1, value: 10, probability: -1 },
            { name: 'Rand1', nodeID: 2, value: 20, probability: -1 },
            { name: 'Rand2', nodeID: 3, value: 30, probability: -1 },
        ],
    });
});

test('Verify large children count', () => {
    const tree: typeof DTree = new DTree();
    for (let i = 0; i < 200; i++) {
        let n = new ResultNode('Rand' + i, i * 10 + 10);
        tree.insertNode(0, n);
    }
    // console.log(tree.getTreeData().children.size);
    expect(tree.getTreeData().children.length).toBe(200);
});

test('Adding nested children', () => {
    const tree: typeof DTree = new DTree();
    for (let i = 0; i < 3; i++) {
        let n = new DecisionNode('Rand' + i, i * 10 + 10);
        tree.insertNode(0, n);
    }

    for (let i = 1; i <= 3; i++) {
        let n = new ResultNode('Rand' + i, i * 21);
        tree.insertNode(i, n);
    }
    // console.log(JSON.stringify(tree.getTreeData(), null, 2));

    expect(
        tree.getTreeData().children.every((x) => x.children.length == 1)
    ).toBe(true);
});

test("Can't add children to result nodes", () => {
    const tree: typeof DTree = new DTree();
    let n = new ResultNode('Node', 10);
    tree.insertNode(0, n);
    let n2 = new ResultNode('Node', 10);
    expect(() => tree.insertNode(1, n2)).toThrow(
        "You can't add children to result nodes. Convert them to other type instead."
    );
});
