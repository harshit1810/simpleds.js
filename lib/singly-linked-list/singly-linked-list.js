var methods = require('./singly-linked-list-methods');
var sharedComponents = require('../shared');
var LinkedListNode = require('./util').LinkedListNode;
function SinglyLinkedList() {
	// Object.defineProperty(this, {
	// 	'head': { value: null, writable: true, enumerable: true }
	// });

	Object.assign(this, sharedComponents.makeGetterSetter('Head', sharedComponents.NEW_NODE_DEFAULT_REFERENCE, LinkedListNode.getValidNode));
	Object.assign(SinglyLinkedList.prototype, methods);
}

module.exports.SinglyLinkedList = SinglyLinkedList;