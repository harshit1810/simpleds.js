var methods = require('./binary-tree-methods');
var sharedComponents = require('../shared');
var BinaryTreeNode = require('./util').BinaryTreeNode;

function BinaryTree() {
    Object.assign(this, sharedComponents.makeGetterSetter('Root', sharedComponents.NEW_NODE_DEFAULT_REFERENCE, BinaryTreeNode.getValidNode));
    Object.assign(BinaryTree.prototype, methods);
}

module.exports.BinaryTree = BinaryTree;