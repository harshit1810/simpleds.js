var sharedComponents = require('../shared');
var binaryTreeUtilities = require('./util');
var assert = binaryTreeUtilities.binaryTreeAssertion;
var Node = binaryTreeUtilities.BinaryTreeNode;
var Stack = require('../stack/stack');

module.exports = (function () {

    /**
     * check if the binary tree is empty.
     * returns boolean.
     */
    function isempty() {
        return this.getRoot() === null ? true : false;
    }
    /**
     * insert a node in the binary tree.
     * throws an error if invalid value is provided for the new node.
     * 
     * returns the added node.
     */
    function insertnode(value) {
        assert.validNodeValue(value);
        var q = [this.getRoot()];
        var _node_;
        while (q[0]) {
            _node_ = q[0];
            if (_node_.getLeft() === null) {
                _node_.setLeft(value);
                break;
            }
            if (_node_.getRight() === null) {
                _node_.setRight(value);
                break;
            }
            q.push(_node_.getLeft());
            q.push(_node_.getRight());
        }
        return;
    }
    function getHeight(node) {
        if (node === null) {
            return 0;
        }

        var leftHeight = getHeight(node.getLeft());
        var rightHeight = getHeight(node.getRight());

        return Math.max(leftHeight, rightHeight) + 1;
    }
    /**
     * calculate maximum height of tree.
     */
    function calculateheight() {
        var root = this.getRoot();
        if (root === null) {
            return 0;
        }
        return getHeight(root);
    }
    /**
     * provide different methods of traversal
     */
    function treetraversal() {
        var self = this;
        //var height = calculateheight.call(self);
        return {
            levelOrder: function () {
                var output = '';
                var q = [self.getRoot()];
                while (q[0]) {
                    var _node_ = q[0];
                    output = output.concat(_node_.getValue().toString().concat(' '));
                    q.push(_node_.getLeft());
                    q.push(_node_.getRight());
                    q.shift();
                }
                return output;
            },
            inorder: function () {
                var output = '';
                var stack = new Stack();
                var node = self.getRoot();
                while (node !== null || !stack.isEmpty()) {
                    while (node !== null) {
                        stack.push(node);
                        node = node.getLeft();
                    }
                    var popped = stack.pop();
                    output = output.concat(popped.getValue().toString()).concat(' ');
                    node = popped.getRight();
                }
                return output;
            },
            preorder: function () {
                var output = '';
                var stack = new Stack();
                var node = self.getRoot();
                stack.push(node);
                while (!stack.isEmpty()) {
                    var popped = stack.pop();
                    output = output.concat(popped.getValue().toString()).concat(' ');
                    if (popped.getRight() !== null) { stack.push(popped.getRight()); }
                    if (popped.getLeft() !== null) { stack.push(popped.getLeft()); }
                }
                return output;
            }
        };
    }
    return {
        'isEmpty': isempty,
        'insert': insertnode,
        'height': calculateheight,
        'traversal': treetraversal
    };

})();