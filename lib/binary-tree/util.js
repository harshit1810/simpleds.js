var sharedComponents = require('../shared');

function BinaryTreeNode() {
    sharedComponents.NODE_ARGS_INTERCEPTOR.call(arguments);
    binaryTreeAssertion.validNodeValue(arguments[0]);
    sharedComponents.Node.call(this, arguments[0]);
    Object.assign(this,
        sharedComponents.makeGetterSetter(
            'Left',
            sharedComponents.NEW_NODE_DEFAULT_REFERENCE,
            BinaryTreeNode.getValidNode
            // binaryTreeAssertion.validNodeValue
        ), sharedComponents.makeGetterSetter(
            'Right',
            sharedComponents.NEW_NODE_DEFAULT_REFERENCE,
            BinaryTreeNode.getValidNode
            // binaryTreeAssertion.validNodeValue
        )
    );
}
BinaryTreeNode.getValidNode = function (value) {
    return (value instanceof BinaryTreeNode || value === null) ? value : new BinaryTreeNode(value);
};




module.exports.ERROR_NAME = 'BinaryTreeError';
module.exports.BinaryTreeNode = BinaryTreeNode;
module.exports.binaryTreeAssertion = binaryTreeAssertion = (function () {
    var ERR_MSG_TREE_EMPTY = '';
    var ERR_MSG_INVALID_NODE_VALUE = 'Invalid Node Value';
    function getError(message) {
        var e = Error(message);
        e.name = module.exports.ERROR_NAME;
        return e;
    }
    return {
        hasRoot: function (tree) {

        },
        validNodeValue: function (value) {
            var isValid = sharedComponents.isValidNode(value, BinaryTreeNode);
            if (isValid) {
                return value;
            }
            throw getError(ERR_MSG_INVALID_NODE_VALUE);
        }
    };
})();