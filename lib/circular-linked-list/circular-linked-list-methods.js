var circularLinkedListUtilities = require('./util.js');
var sharedUtilities = require('../shared');
var assert = circularLinkedListUtilities.circularListAssertion;
var Node = circularLinkedListUtilities.CircularLinkedListNode;


module.exports = (function () {

    /**
     * checks if the list is empty.
     * returns a boolean.
     */
    function isempty() {
        return getsize.call(this) === 0 ? true : false;
    }
    /**
     * returns the size of the list.
     */
    function getsize() {
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
    function stringify() {
        var node = this.getHead();
        node.isHead = true;
        var output = '';
        do {
            output = output.concat(node.getValue().toString()).concat(' -> ');
            node = node.getNext();
        } while (!node.isHead);
        output = output.concat(' null');
        return output;
    }
    /**
     * returns the node at a particular position.
     * 
     * @param {number} position starting from 1.
     * throws an error if an invalid position is provided. * 
     */
    function getnodeat(position) {
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
    function getlastnode() {
        var currentSize = getsize.call(this);
        return getnodeat.call(this, currentSize);
    }
    /**
     * add a node to the end of the list.
     * 
     * @param {number} value 
     * throws an error if the value provided for the new node is invalid.
     * returns the added node.
     */
    function appendnode(value) {
        var newNode = Node.getValidNode(value);
        var currentSize = getsize.call(this);
        if (currentSize === 0) {
            this.setHead(newNode);
            return this.getHead();
        }
        var currentNode = getnodeat.call(this, currentSize);
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
    function removenodeat(position) {
        assert.underflow(this);
        assert.validPosition(this, position);
        assert.withinBounds(this, position);
        var current = this.getHead();
        var previous = position === 1 ? getnodeat.call(this, getsize.call(this)) : this.getHead();
        var count = 1;
        while (count < position) {
            previous = current;
            current = current.getNext();
            count += 1;
        }
        var value = current.getValue();
        previous.setNext(current.getNext());
        current.setNext(null);
        if (position === 1) {
            this.setHead(previous.getNext());
        }
        return value;
    }
    /**
     * Split the list in two separate lists.
     * throws an error if the list is empty.
     * returns an array containing the two created lists.
     */
    function splitintwo() {
        assert.underflow(this);
        var head = this.getHead();
        var currentSize = getsize.call(this);
        var mid = Math.ceil(currentSize / 2);
        var firstHalf = getListSegment.call(this, 1, mid);
        var secondHalf = getListSegment.call(this, mid + 1, currentSize);
        return [firstHalf, secondHalf];
        function getListSegment(pos1, pos2) {
            var _list_ = new (Object.getPrototypeOf(this)).constructor();
            if (pos1 > pos2) {
                return _list_;
            }
            var startNode = getnodeat.call(this, pos1);
            var count = pos1;
            while (count <= pos2) {
                appendnode.call(_list_, new Node(startNode.getValue()));
                startNode = startNode.getNext();
                count += 1;
            }
            return _list_;
        }
    }
    /**
     * returns a copy of the list.
     */
    function duplicate() {
        var head = this.getHead();
        var _list_ = new (Object.getPrototypeOf(this)).constructor();
        head.isHead = true; // mark the node as head for identification
        do {
            appendnode.call(_list_, new Node(head.getValue()));
            head = head.getNext();
        } while (!head.isHead);
        return _list_;
    }
    /**
     * There are n people standing in a circle waiting to be executed. 
     * The counting out begins at some point in the circle and proceeds around the circle in a fixed direction. 
     * In each step, a certain number of people are skipped and the next person is executed. 
     * The elimination proceeds around the circle (which is becoming smaller and smaller as the executed people are removed), 
     * until only the last person remains, who is given freedom.
     * 
     * Does not modify the existing list.
     * 
     * @param {number} start 
     * @param {number} skip 
     * throws an error if the list does not have enough nodes to perform task.
     * returns the last remaining node, id successful.
     */
    function findingjosephus(start, skip) {
        assert.notEnoughNodes(this, this.length + parseInt(skip));
        var _list_ = duplicate.call(this);
        var head = _list_.getHead();
        var remainingNodes = getsize.call(_list_);

        function x(headPosition, remainingNodes) {
            if (remainingNodes === 1) {
                return getnodeat.call(this, remainingNodes);
            }
            removenodeat.call(this, (headPosition + skip) > remainingNodes ? (headPosition + skip) % remainingNodes : (headPosition + skip));
            remainingNodes -= 1;
            if (headPosition > remainingNodes) {
                headPosition = headPosition % remainingNodes;
            } else if (headPosition < remainingNodes) {
                headPosition = headPosition + 1;
            }
            return x.call(this, headPosition, remainingNodes);
        }
        return x.call(_list_, 1, remainingNodes);
    }

    return {
        isEmpty: isempty,
        size: getsize,
        getLast: getlastnode,
        nodeAt: getnodeat,
        append: appendnode,
        toString: stringify,
        removeAt: removenodeat,
        split: splitintwo,
        clone: duplicate,
        findJosephus: findingjosephus
    };

})();