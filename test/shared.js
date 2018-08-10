var expect = require('chai').expect;
var library = require('../lib/index');
var SinglyLinkedList = library.SinglyLinkedList;
var CircularLinkedList = library.CircularLinkedList;
var SinglyLinkedNode = require('../lib/singly-linked-list/util').LinkedListNode;
var CircularLinkedNode = require('../lib/circular-linked-list/util').CircularLinkedListNode;

function validNode(node, instanceOf) {
    expect(node).to.not.be.undefined;
    expect(node).to.have.property('setValue');
    expect(node).to.have.property('setNext');
    expect(node).to.be.an.instanceof(instanceOf);
}
function shouldBeAnError(error, errorName) {
    expect(error).to.not.be.undefined;
    expect(error).to.have.property('name');
    expect(error.name).to.equal(errorName);
    expect(error).to.have.property('message');
    expect(error.message).to.have.lengthOf.above(1);
    expect(error).to.be.an.instanceof(Error);
}
var test_cases_utils_for = {
    'SinglyLinkedList': {
        shouldBeValidNode: function (node) {
            validNode(node, SinglyLinkedNode);
        },
        shouldBeError: shouldBeAnError,
        create: function (size, startAt) {
            var list = new SinglyLinkedList();
            var i = (typeof startAt === 'undefined') ? 1 : startAt;
            var end = (typeof startAt === 'undefined') ? size : (startAt + size);
            for (var itr = i; itr <= end; itr++) {
                list.append(itr);
            }
            return list;
        }
    },
    'CircularLinkedList': {
        shouldBeValidNode: function (node) {
            validNode(node, CircularLinkedNode);
        },
        shouldBeError: shouldBeAnError,
        create: function (size, startAt) {
            var list = new CircularLinkedList();
            var i = (typeof startAt === 'undefined') ? 1 : startAt;
            var end = (typeof startAt === 'undefined') ? size : (startAt + size);
            for (var itr = i; itr <= end; itr++) {
                list.append(itr);
            }
            return list;
        }
    }
};
module.exports = function (instance) {
    return test_cases_utils_for[instance.name];
};