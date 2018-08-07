var sharedComponents = require('../shared');

function LinkedListNode(nodeValue) {
    assertions.validNodeValue(nodeValue);
    sharedComponents.Node.call(this, nodeValue);
    Object.assign(this, sharedComponents.makeGetterSetter('Next', sharedComponents.NEW_NODE_DEFAULT_REFERENCE, assertions.validNodeValue));
}
LinkedListNode.getValidNode = function (value) {
    return (value instanceof LinkedListNode || value === null) ? value : new LinkedListNode(value);
};
module.exports.ERROR_NAME = 'LinkedListError';
module.exports.assertions = assertions = (function () {
    var ERR_MSG_INVALID_NODE = 'Invalid node';
    var ERR_MSG_INVALID_NODE_VALUE = 'Invalid node value';
    var ERR_MSG_LIST_EMPTY = 'List is empty';
    var ERR_MSG_INVALID_POSITION = 'Invalid number';
    var ERR_MSG_NOT_ENOUGH_NODE = 'Not enough nodes';
    var ERR_MSG_VALUE_OUT_OF_BOUNDS = 'Value out of bounds';
    var invalidStrictEqualities = [Infinity, -Infinity, null, true, false];
    var invalidTypeofEqualities = ['undefined', 'symbol', 'function', 'object'];
    var validTypeof = ['number', 'string'];
    function getError(message) {
        var e = Error(message);
        e.name = module.exports.ERROR_NAME;
        return e;
    }
    return {
        underflow: function (list) {
            if (list.size() === 0) {
                throw getError(ERR_MSG_LIST_EMPTY);
            }
            return;
        },
        invalidNode: function (node) {
            if (!(node instanceof Node)) {
                throw getError(ERR_MSG_INVALID_NODE);
            }
            return;
        },
        validNodeValue: function (value) {
            if (value instanceof LinkedListNode || value === null) {
                return;
            }
            if (matchesStrict(invalidStrictEqualities, value)) {
                throw getError(ERR_MSG_INVALID_NODE_VALUE);
            }
            if (matchesTypeof(invalidTypeofEqualities, value)) {
                throw getError(ERR_MSG_INVALID_NODE_VALUE);
            }
            if (!matchesTypeof(validTypeof, value)) {
                throw getError(se.ERR_MSG_INVALID_NODE_VALUE);
            }
            return;
        },
        notEnoughNodes: function (list, minimumNodes) {
            if (list.size() < minimumNodes) {
                throw getError(ERR_MSG_NOT_ENOUGH_NODE);
            }
            return;
        },
        validPosition: function (list, positionInList) {
            if (typeof positionInList !== 'number' || parseInt(positionInList) < 1) {
                throw getError(ERR_MSG_INVALID_POSITION);
            }
            return;
        },
        withinBounds: function (list, positionInList) {
            if (typeof positionInList !== 'number' || parseInt(positionInList) > list.size()) {
                throw getError(ERR_MSG_VALUE_OUT_OF_BOUNDS);
            }
            return;
        }
    };
    function matchesTypeof(typeChecks, value) {
        var satisfies = false;
        for (var index in typeChecks) {
            if (typeof value === typeChecks[index]) {
                satisfies = true; break;
            }
        }
        return satisfies;
    }
    function matchesStrict(strictEqualities, value) {
        var satisfies = false;
        for (var equality in strictEqualities) {
            if (value === strictEqualities[equality]) {
                satisfies = true; break;
            }
        }
        return satisfies;
    }
    function matchesInstance(instances, value) {
        var satisfies = false;
        for (var i in instances) {
            if (typeof value === 'object' && value instanceof instances[i]) {
                satisfies = true; break;
            }
        }
        return satisfies;
    }
})();
module.exports.LinkedListNode = LinkedListNode;