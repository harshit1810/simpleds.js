var methods = require('./circular-linked-list-methods');
var sharedComponents = require('../shared');
var CircularLinkedListNode = require('./util').CircularLinkedListNode;
function CircularLinkedList() {
    // Object.defineProperties(this, {
    //     'head': { value: null, writable: true, enumerable: true }
    // });
    Object.assign(this, sharedComponents.makeGetterSetter('Head', sharedComponents.NEW_NODE_DEFAULT_REFERENCE, CircularLinkedListNode.getValidNode));
    Object.assign(CircularLinkedList.prototype, methods);
}

module.exports.CircularLinkedList = CircularLinkedList;