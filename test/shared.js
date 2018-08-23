var expect = require('chai').expect;
var library = require('../lib/index');
var SinglyLinkedList = library.SinglyLinkedList;
var CircularLinkedList = library.CircularLinkedList;
var BinaryTree = library.BinaryTree;
var SinglyLinkedNode = require('../lib/singly-linked-list/util').LinkedListNode;
var CircularLinkedNode = require('../lib/circular-linked-list/util').CircularLinkedListNode;
var BinaryTreeNode = require('../lib/binary-tree/util').BinaryTreeNode;

function validNode() {
    expect(arguments[1]).to.not.be.undefined;
    expect(arguments[1]).to.be.an.instanceof(arguments[0]);
    var properties = Array.prototype.slice.call(arguments, 2);
    var i = 0;
    for (i = 0; i < properties.length; i++) {
        expect(arguments[1]).to.have.property(properties[i]);
    }
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
            validNode(SinglyLinkedNode, node, 'setValue', 'getValue', 'setNext', 'getNext');
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
            validNode(CircularLinkedNode, node, 'setValue', 'getValue', 'setNext', 'getNext');
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
    },
    'BinaryTree': {
        shouldBeValidNode: function (node) {
            validNode(BinaryTreeNode, node, 'setLeft', 'setRight', 'getLeft', 'getRight');
        },
        shouldBeError: shouldBeAnError
    }
};
module.exports = function (instance) {
    return test_cases_utils_for[instance.name];
};