var expect = require('chai').expect;
var CircularLinkedList = require('../lib/index').CircularLinkedList;
var util = require('../lib/circular-linked-list/util');
var Node = util.CircularLinkedListNode;
var invalidNodeValues = [Infinity, -Infinity, Symbol(), {}, function () { }];
var sharedTestUtils = require('./shared')(CircularLinkedList);

describe('Tests for Circular Linked List', function () {

    it('create a new node when a value is provided', function () {
        var node = new Node(1);
        sharedTestUtils.shouldBeValidNode(node);
        expect(node.getValue()).to.be.equal(1);
    });

    it('should create a new node with value as zero when value is not provided', function () {
        var node = new Node();
        sharedTestUtils.shouldBeValidNode(node);
        expect(node.getValue()).to.be.equal(0);
    });

    it('should not append node with an invalid value', function () {
        var list = new CircularLinkedList();
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

    it('properly set the head of the list', function () {
        var list = new CircularLinkedList();
        list.setHead(5);
        var node = list.getHead();
        sharedTestUtils.shouldBeValidNode(node);
        expect(node.getValue()).to.be.equal(5);
    });

    it('return correct size of the list', function () {
        var list = sharedTestUtils.create(10);
        expect(list.size()).to.be.equal(10);
    });

    it('should return the last node in the list', function () {
        var list = sharedTestUtils.create(5);
        var lastNode = list.getLast();
        sharedTestUtils.shouldBeValidNode(lastNode);
        expect(lastNode.getValue()).to.be.equal(5);
    });

    it('should return node at a valid position', function () {
        var list = sharedTestUtils.create(5);
        var node = list.nodeAt(4);
        sharedTestUtils.shouldBeValidNode(node);
        expect(node.getValue()).to.be.equal(4);
    });

    it('throw error when fetching node from an invalid position', function () {
        var list = sharedTestUtils.create(3);
        try {
            list.nodeAt(4);
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        }
    });

    it('remove node from a position', function () {
        var list = sharedTestUtils.create(4);
        var deletedValue = list.removeAt(2);
        expect(deletedValue).to.be.equal(2);
        expect(list.size()).to.be.equal(3);
        expect(list.nodeAt(2).getValue()).to.be.equal(3);
    });

    it('split a list in two circular linked lists', function () {
        var list = sharedTestUtils.create(10);
        var splits = list.split();
        expect(splits).to.be.an('array');
        expect(splits).to.have.lengthOf(2);
        expect(splits[0]).to.be.instanceof(CircularLinkedList);
        expect(splits[0].size()).to.be.equal(5);
        expect(splits[1]).to.be.instanceof(CircularLinkedList);
        expect(splits[1].size()).to.be.equal(5);
    });

    it('make a copy of list', function () {
        var list = sharedTestUtils.create(10);
        var clone = list.clone();
        for (var i = 1; i <= 10; i++) {
            expect(clone.nodeAt(i).getValue()).to.be.equal(list.nodeAt(i).getValue());
        }
    });

    it('find josephus', function () {
        var list = sharedTestUtils.create(14);
        var node = list.findJosephus(1, 2);
        sharedTestUtils.shouldBeValidNode(node);
    });

    it('return string representation of the list', function () {
        var list = sharedTestUtils.create(10);
        var str = list.toString();
        expect(str).to.be.a('string');
        expect(str).to.have.lengthOf.above(3);
    });
});