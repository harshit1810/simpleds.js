var SinglyLinkedNode = require('../lib/singly-linked-list/util').LinkedListNode;
var CircularLinkedNode = require('../lib/circular-linked-list/util').CircularLinkedListNode;

module.exports = function (expect) {
    return {
        shouldBeValidNode: function (node) {
            expect(node).to.not.be.undefined;
            expect(node).to.have.property('setValue');
            expect(node).to.have.property('setNext');
        },
        shouldBeValidSinglyLinkedNode: function (node) {
            this.shouldBeValidNode(node);
            expect(node).to.be.an.instanceof(SinglyLinkedNode);
        },
        shouldBeValidCircularLinkedNode: function (node) {
            this.shouldBeValidNode(node);
            expect(node).to.be.an.instanceof(CircularLinkedNode);
        },
        shouldBeError: function(error, errorName) {
            expect(error).to.not.be.undefined;
            expect(error).to.have.property('name');
            expect(error).to.have.property('message');
            expect(error.name).to.equal(errorName);
            expect(error.message).to.have.lengthOf.above(1);
            expect(error).to.be.an.instanceof(Error);
        }
    };
};