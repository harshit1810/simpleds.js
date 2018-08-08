var circularLinkedListUtilities = require('./util.js');
var sharedUtilities = require('../shared');
var assert = circularLinkedListUtilities.circularListAssertion;
var Node = circularLinkedListUtilities.CircularLinkedListNode;

/**
 * checks if the list is empty.
 * returns a boolean.
 */
function is_empty() {
    return this.size() === 0 ? true : false;
}
/**
 * returns the size of the list.
 */
function get_size() {
    var head = this.getHead();
    if (head === null) {
        return 0;
    }
    if (head.getNext() === null) {
        return 1;
    }
    head.isHead = true; // mark the node as head for identification
    var nodes = 1;
    while (head.getNext() !== null && !('isHead' in head.getNext())) {
        head = head.getNext();
        nodes += 1;
    }
    return nodes;
}
/**
 * returns a string representation of the list.
 */
function to_string() {
    var node = this.getHead();
    node.isHead = true;
    var output = '';
    while (!node.getNext().isHead) {
        output = output.concat(node.getValue().toString()).concat(' -> ');
        node = node.getNext();
    }
    output = output.concat(' null');
    return output;
}
/**
 * returns the node at a particular position.
 * 
 * @param {number} position starting from 1.
 * throws an error if an invalid position is provided. * 
 */
function node_at(position) {
    assert.validPosition(this, position);
    assert.withinBounds(this, position);
    var node = this.getHead();
    var count = 1;
    while (count < position) {
        node = node.getNext();
        count += 1;
    }
    return node;
}
/**
 * returns the last node in the list.
 * returns undefined if the list is empty.
 * ie. the node before head.
 */
function get_last_node() {
    var currentSize = this.size();
    return this.nodeAt(currentSize);
}
/**
 * add a node to the end of the list.
 * 
 * @param {number} value 
 * throws an error if the value provided for the new node is invalid.
 * returns the added node.
 */
function append_node(value) {
    var newNode = Node.getValidNode(value);
    var currentSize = this.size();
    if (currentSize === 0) {
        this.setHead(newNode);
        return this.getHead();
    }
    var currentNode = this.nodeAt(currentSize);
    newNode.setNext(this.getHead());
    currentNode.setNext(newNode);
    return newNode;
}
/**
 * Delete a node at a specified position.
 * 
 * @param {number} position starts from 1.
 * throws an error if invalid position is provided.
 * throws an error if list is empty.
 * returns the value of deleted node.
 */
function remove_at(position) {
    assert.underflow(this);
    assert.validPosition(this, position);
    assert.withinBounds(this, position);
    var current = this.getHead();
    var previous = this.getHead();
    var count = 1;
    while (count < position) {
        previous = current;
        current = current.getNext();
        count += 1;
    }
    var value = current.getValue();
    previous.setNext(current.getNext());
    current.setNext(null);
    return value;
}
/**
 * Split the list in two separate lists.
 * throws an error if the list is empty.
 * returns an array containing the two created lists.
 */
function split_in_half() {
    assert.underflow(this);
    var head = this.getHead();
    var currentSize = this.size();
    var mid = Math.ceil(currentSize / 2);
    var firstHalf = getListSegment.call(this, 1, mid);
    var secondHalf = getListSegment.call(this, mid + 1, currentSize);
    return [firstHalf, secondHalf];
    function getListSegment(pos1, pos2) {
        var _list_ = new (Object.getPrototypeOf(this)).constructor();
        if (pos1 > pos2) {
            return _list_;
        }
        var startNode = this.nodeAt(pos1);
        var count = pos1;
        while (count <= pos2) {
            _list_.append(new Node(startNode.getValue()));
            startNode = startNode.getNext();
            count += 1;
        }
        return _list_;
    }
}
module.exports = {
    isEmpty: is_empty,
    size: get_size,
    getLast: get_last_node,
    nodeAt: node_at,
    append: append_node,
    toString: to_string,
    removeAt: remove_at,
    split: split_in_half
};