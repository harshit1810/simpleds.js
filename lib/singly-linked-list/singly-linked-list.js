var methods = require('./singly-linked-list-methods');

function SinglyLinkedList() {
	Object.defineProperties(this, {
		'head': { value: null, writable: true, enumerable: true }
	});
	Object.assign(SinglyLinkedList.prototype, methods);
}

module.exports.SinglyLinkedList = SinglyLinkedList;