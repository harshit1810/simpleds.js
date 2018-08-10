var expect = require('chai').expect;
var SinglyLinkedList = require('../lib/index').SinglyLinkedList;
var util = require('../lib/singly-linked-list/util');
var Node = util.LinkedListNode;
var invalidNodeValues = [Infinity, -Infinity, Symbol(), {}, function () { }];
var sharedTestUtils = require('./shared')(SinglyLinkedList);

describe('Tests for Singly Linked List', function () {

    it('create a new node when a value is provided', function () {
        var node = new Node(1);
        expect(node).to.not.be.undefined;
        expect(node).to.be.an.instanceof(Node);
        node = Node.getValidNode(1);
        expect(node).to.not.be.undefined;
        expect(node).to.be.an.instanceof(Node);
    });

    it('create a new node with value as zero when value is not provided', function () {
        var node = new Node();
        sharedTestUtils.shouldBeValidNode(node);
        expect(node.getValue()).to.be.equal(0);
    });

    it('create a new linked list', function () {
        var list = new SinglyLinkedList();
        expect(list).to.not.be.undefined;
        expect(list).to.be.an.instanceof(SinglyLinkedList);
    });

    it('new list should be empty', function () {
        var list = new SinglyLinkedList();
        expect(list.isEmpty()).to.equal(true);
    });

    it('head of new list should be null', function () {
        var list = new SinglyLinkedList();
        expect(list.getHead()).to.equal(null);
    });

    it('add valid node to end of list', function () {
        var list = sharedTestUtils.create(1);
        var addedNode = list.append(1);
        sharedTestUtils.shouldBeValidNode(addedNode);
        addedNode = list.append('A');
        sharedTestUtils.shouldBeValidNode(addedNode);
    });

    it('should not append node with an invalid value', function () {
        var list = new SinglyLinkedList();
        var passed = false;
        try {
            for (var value of invalidNodeValues) {
                list.append(value);
            }
            passed = true;
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        } finally {
            expect(passed).to.be.false;
        }
    });

    it('should fetch correct node from given position', function () {
        var list = sharedTestUtils.create(9);
        var node = list.nodeAt(7);
        sharedTestUtils.shouldBeValidNode(node);
        expect(node.getValue()).to.equal(7);
    });

    it('should throw an error if invalid position provided', function () {
        var list = sharedTestUtils.create(2);
        try {
            list.nodeAt(null);
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('return undefined when fetching last node of new list', function () {
        var list = new SinglyLinkedList();
        expect(list.getLastNode()).to.be.undefined;
    });

    it('return correct node when fetching last node of non-empty list', function () {
        var list = new SinglyLinkedList();
        list.append(1);
        list.append(4);
        list.append(3);
        list.append(2);
        var last = list.getLastNode();
        sharedTestUtils.shouldBeValidNode(last);
        expect(last.getValue()).to.equal(2);
    });

    it('remove first node from a non-empty list and return the value of the removed node', function () {
        var list = new SinglyLinkedList();
        list.append(1);
        list.append(4);
        var removedValue = list.shift();
        expect(removedValue).to.equal(1);
    });

    it('throw error when removing first node from an empty list', function () {
        var list = new SinglyLinkedList();
        try {
            list.shift();
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('add a valid node to the beginning of the list', function () {
        var list = new SinglyLinkedList();
        var node = list.unshift(1);
        sharedTestUtils.shouldBeValidNode(node);
    });

    it('throw error if adding a invalid node value to the beginning of the list', function () {
        var list = new SinglyLinkedList();
        var errorCount = 0;
        for (var value of invalidNodeValues) {
            try {
                list.unshift(value);
            } catch (error) {
                errorCount += 1;
            } finally {
                continue;
            }
        }
        expect(errorCount).to.equal(invalidNodeValues.length);
    });

    it('remove the last node from the list', function () {
        var list = sharedTestUtils.create(5);
        var popped = list.pop();
        expect(popped).to.equal(5);
        expect(list.size()).to.equal(4);
    });

    it('throw error if popping on an empty list', function () {
        var list = new SinglyLinkedList();
        try {
            list.pop();
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('should insert a node at specified position', function () {
        var list = new SinglyLinkedList();
        list.append(2);
        list.append(4);
        list.append(6);
        var addedNode = list.insertAt(3, 0);
        sharedTestUtils.shouldBeValidNode(addedNode);
        var node = list.nodeAt(3);
        sharedTestUtils.shouldBeValidNode(node);
        expect(node.getValue()).to.equal(0);
    });

    it('throw error when inserting at an invalid position', function () {
        var list = new SinglyLinkedList();
        try {
            list.insertAt(1, 1);
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('throw error when inserting an invalid value at an valid position', function () {
        var list = new SinglyLinkedList();
        list.append(8);
        list.append(7);
        try {
            list.insertAt(2, new Number());
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('remove a node from specified position and return its value', function () {
        var list = sharedTestUtils.create(5, 10);
        var deleted = list.removeAt(6);
        expect(deleted).to.equal(15);
    });

    it('throw error when removing a node from an invalid position', function () {
        var list = new SinglyLinkedList();
        try {
            list.removeAt(5);
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('reverse the list', function () {
        var list = sharedTestUtils.create(8);
        expect(list.reverse()).to.be.instanceof(SinglyLinkedList);
        expect(list.size()).to.be.equal(8);
    });

    it('reverse a list of 5 nodes from 3rd to 5th node', function () {
        var list = sharedTestUtils.create(5);
        expect(list.reverse(3, 5)).to.be.instanceof(SinglyLinkedList);
        expect(list.size()).to.be.equal(3);
        expect(list.nodeAt(1).getValue()).to.be.equal(5);
        expect(list.nodeAt(3).getValue()).to.be.equal(3);
    });

    it('should not detect loop in the list', function () {
        var list = sharedTestUtils.create(9);
        var loop = list.isLooped();
        expect(loop).to.be.false;
    });

    it('return undefined when end position is lower than start position', function () {
        var list = sharedTestUtils.create(10);
        expect(list.createLoop(5, 3)).to.be.undefined;
    });

    it('introducing a loop should throw error when supplying invalid arguments ', function () {
        var list = sharedTestUtils.create(10);
        try {
            list.createLoop(0, 3);
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('introduce a loop in the list from last node to 5th node', function () {
        insertLoopInList(5);
    });

    it('successfully detect loop after introducing', function () {
        var list = insertLoopInList(5);
        sharedTestUtils.shouldBeValidNode(list.isLooped());
    });

    it('introduce a loop and then remove it', function () {
        var list = insertLoopInList(5);
        list.removeLoop();
        expect(list.isLooped()).to.be.false;
    });

    it('identify list as not palindrome', function () {
        var list = new SinglyLinkedList();
        for (var i = 1; i <= 3; i++) {
            list.append(i);
        }
        expect(list.isPalindrome()).to.be.false;
    });

    it('identify list as palindrome', function () {
        var list = new SinglyLinkedList();
        expect(list.isPalindrome()).to.be.true;
        list.append(1);
        expect(list.isPalindrome()).to.be.true;
        list.append(2);
        list.append(3);
        list.append(2);
        list.append(1);
        expect(list.isPalindrome()).to.be.true;
    });

    it('get correct node from the end', function () {
        var list = sharedTestUtils.create(3);
        var fromEnd = list.findFromEnd(1);
        sharedTestUtils.shouldBeValidNode(fromEnd);
        expect(fromEnd.getValue()).to.be.equal(3);
        fromEnd = list.findFromEnd(3);
        sharedTestUtils.shouldBeValidNode(fromEnd);
        expect(fromEnd.getValue()).to.be.equal(1);
    });

    it('throw an error if provided an invalid position while finding node from end', function () {
        var list = sharedTestUtils.create(3);
        try {
            list.findFromEnd(0);
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('throw an error if provided an invalid position while finding node from end', function () {
        var list = sharedTestUtils.create(3);
        try {
            list.findFromEnd(5);
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('list should not be sorted', function () {
        var list = new SinglyLinkedList();
        for (var i = 3; i >= 0; i--) {
            list.append(i);
        }
        expect(list.isSorted()).to.be.false;
    });

    it('throw an error when trying to sort empty list', function () {
        var list = new SinglyLinkedList();
        try {
            list.sort();
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('sort the list in ascending order', function () {
        var list = new SinglyLinkedList();
        for (var i = 10; i >= 0; i--) {
            list.append(i);
        }
        list.sort();
        expect(list).to.be.instanceof(SinglyLinkedList);
        expect(list.isSorted()).to.be.true;
    });

    it('swap values of two nodes', function () {
        var list = sharedTestUtils.create(5);
        list.swap(3, 4);
        expect(list.nodeAt(3).getValue()).to.be.equal(4);
        expect(list.nodeAt(4).getValue()).to.be.equal(3);
    });

    it('throw an error when swapping values at invalid positions', function () {
        var list = sharedTestUtils.create(5);
        try {
            list.swap(0, 4);
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('throw an error when swapping values at invalid positions', function () {
        var list = sharedTestUtils.create(5);
        try {
            list.swap(3, 11);
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('remove duplicates from the list', function () {
        var list = new SinglyLinkedList();
        list.removeDuplicates();
        expect(list).to.be.instanceof(SinglyLinkedList);
        list.append(1);
        list.append(2);
        list.append(3);
        list.append(3);
        list.append(1);
        list.removeDuplicates();
        expect(list).to.be.instanceof(SinglyLinkedList);
        expect(list.size()).to.be.equal(3);
    });

    it('throw an error when trying to rotate list by invalid places', function () {
        var list = sharedTestUtils.create(5);
        try {
            list.rotate(6);
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('rotate list in counter clockwise direction by 2 places', function () {
        var list = sharedTestUtils.create(10);
        list.rotate(2);
        expect(list).to.be.instanceof(SinglyLinkedList);
        expect(list.nodeAt(1).getValue()).to.be.equal(3);
        expect(list.nodeAt(8).getValue()).to.be.equal(10);
    });

    it('return string representation of the list', function () {
        var list = sharedTestUtils.create(10);
        var str = list.toString();
        expect(str).to.be.a('string');
        expect(str).to.have.lengthOf.above(3);
    });
});
function insertLoopInList(index) {
    var list = sharedTestUtils.create(10);
    var looped = list.createLoop(index, list.size());
    expect(looped).to.be.instanceof(SinglyLinkedList);
    var lastNode = looped.nodeAt(10);
    sharedTestUtils.shouldBeValidNode(lastNode);
    expect(lastNode.getNext()).to.be.equal(list.nodeAt(5));
    return list;
}