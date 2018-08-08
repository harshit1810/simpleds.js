var linkedListUtilities = require('./util.js');
var sharedUtilities = require('../shared');

var assert = linkedListUtilities.singlyListAssertion;
var LinkedListNode = linkedListUtilities.LinkedListNode;
var duplicate = sharedUtilities.clone;

module.exports = {
    /**
     * returns a boolean indicating the emptiness of list.
     */
    isEmpty: function () {
        if (this.size() === 0) {
            return true;
        }
        return false;
    },
    /**
     * returns the current size of the list.
     */
    size: function () {
        var node = this.getHead();
        var count = 0;
        while (node !== null) {
            count += 1;
            node = node.getNext();
        }
        return count;
    },
    /**
     * returns the last node in the list.
     * returns undefined if list is empty.
     */
    getLastNode: function () {
        var currentSize = this.size();
        if (currentSize === 0) {
            return;
        }
        return this.nodeAt(currentSize);
    },
    /**
     * fetch a node from the specified position.
     * 
     * @param {number} position starting from 1.
     * receives a argument (which should be >= 1) corresponding to the position of the node which you want to retreive.
     * returns undefined if invalid position is provided.
     * returns the node, if found.
     */
    nodeAt: function (position) {
        assert.validPosition(this, position);
        position = parseInt(position);
        var node = this.getHead();
        var pos = 1;
        while (position > pos) {
            pos += 1;
            node = node.getNext();
        }
        return node;
    },
    /**
     * adds a node to the end of list.
     * 
     * @param {value} newValue 
     * receives a value for the node which is to be appended to the list.
     * throws an error if the value provided for the new node is invalid.
     * returns the appended LinkedListNode.
     */
    append: function (newValue) {
        var newNode = LinkedListNode.getValidNode(newValue);
        if (this.size() === 0) {
            this.setHead(newNode);
            return this.getHead();
        }
        var lastNode = this.getLastNode();
        lastNode.setNext(newNode);
        return newNode;
    },
    /**
     * removes the first node in the list.
     * throws an error if the list is already empty.
     * returns the deleted node's value, if successful.
     */
    shift: function () {
        assert.underflow(this);
        var result = this.getHead().getValue();
        var newHead = this.getHead().getNext();
        this.getHead().setNext(null);
        this.setHead(newHead);
        return result;
    },
    /**
     * add a node to the starting of the list.
     * 
     * @param {value} value 
     * throws an error if the value provided for the new node is invalid.
     * returns the added node, if successful.
     */
    unshift: function (value) {
        var newNode = LinkedListNode.getValidNode(value);
        newNode.setNext(this.getHead());
        this.setHead(newNode);
        return this.getHead();
    },
    /**
     * remove the last node of the list.
     * throws error if the list is empty.
     * returns the value of the removed node, if successful.
     */
    pop: function () {
        assert.underflow(this);
        var currentSize = this.size();
        if (currentSize === 1) {
            var val = this.getHead().getValue();
            this.setHead(null);
            return val;
        }
        var returnValue = this.getLastNode().getValue();
        var node = this.nodeAt(currentSize - 1);
        node.setNext(null);
        return returnValue;
    },
    /**
     * insert a node at a specified position.
     * 
     * @param {number} position 
     * @param {value} value 
     * throws an error if an invalid position is provided as the first argument.
     * throws an error if the value provided for the new node is invalid.
     * returns the newly added node, if successful.
     */
    insertAt: function (position, value) {
        assert.validPosition(this, position);
        assert.withinBounds(this, position);
        value = parseInt(value);
        var newNode = LinkedListNode.getValidNode(value);
        if (position === 1) {
            this.unshift(newNode);
            return this.getHead();
        }
        var previous = this.nodeAt(position - 1);
        newNode.setNext(previous.getNext());
        previous.setNext(newNode);
        return newNode;
    },
    /**
     * remove a node from specified position.
     * 
     * @param {number} position 
     * throws an error if invalid position is provided as argument.
     * returns the value of the deleted node, if successful.
     */
    removeAt: function (position) {
        assert.validPosition(this, position);
        assert.withinBounds(this, position);
        if (position === 1) {
            return this.shift();
        }
        if (position === this.size()) {
            return this.pop();
        }
        var tbd = this.nodeAt(position);
        var prev = this.nodeAt(position - 1);
        var next = this.nodeAt(position + 1);

        prev.setNext(next);
        tbd.setNext(null);
        return tbd.getValue();
    },
    /**
     * reverse the list. 
     * 
     * @param {number} from defaults to 1.
     * @param {number} to defaults to the size of list.
     * throws an error if first argument is invalid.
     * throws an error if the list has lesser number of nodes than the second argument.
     * modifies and returns the list.
     */
    reverse: function (from, to) {

        var _to = typeof to === 'undefined' ? this.size() : to;
        var _from = typeof from === 'undefined' ? 1 : from;
        assert.validPosition(this, _from);
        assert.withinBounds(this, _from);
        assert.validPosition(this, _to);
        assert.withinBounds(this, _to);
        assert.notEnoughNodes(this, parseInt(_to));
        var startFrom = this.nodeAt(_from);
        var counter = 0;
        var numOfSteps = (_to - _from) + 1;
        //var currentNode = duplicate(startFrom);
        var nextNode = null;
        var _node_;	//temporary variable

        while (counter < numOfSteps) {
            _node_ = new LinkedListNode(startFrom.getValue());
            _node_.setNext(nextNode);
            nextNode = _node_;
            startFrom = startFrom.getNext();
            counter += 1;
        }
        this.setHead(nextNode);
        return this;
    },
    /**
     * detect loop in the list.
     * returns a node which should be inside the loop.
     * returns false if no loop is found.
     */
    isLooped: function () {
        var slowPointer = this.getHead();
        var fastPointer = this.getHead();
        var foundLoop = false;
        while (slowPointer.getNext() != null && fastPointer.getNext() != null && fastPointer.getNext().getNext() != null) {
            slowPointer = slowPointer.getNext();
            fastPointer = fastPointer.getNext().getNext();
            if (slowPointer == fastPointer) {
                foundLoop = true;
                break;
            }
        }
        return foundLoop ? slowPointer : false;
    },
    /**
     * introduce a loop in the list .
     * 
     * @param {number} position1 starting from 1.
     * @param {number} position2 starting from 1.
     * LinkedListNode at 'position2' will point to the LinkedListNode at 'position1' .
     * 'position2' should be greater than 'position1'.
     * throws an error if either of the arguments in invalid.
     * returns undefined if 'position2' is lesser than 'loopEndPosition'.
     * this will modify the existing list.
     * returns the list.
     */
    createLoop: function (position1, position2) {
        assert.validPosition(this, position1);
        assert.withinBounds(this, position1);
        assert.validPosition(this, position2);
        assert.withinBounds(this, position2);
        if (position2 < position1) {
            return;
        }
        this.nodeAt(position2).setNext(this.nodeAt(position1));
        return this;
    },
    /**
     * remove the loop in the linked list.
     * returns undefined if loop is not found.
     * returns the list after removing the loop.
     */
    removeLoop: function () {
        var list = this;
        var anodeInLoop = list.isLooped();
        if (typeof anodeInLoop === 'boolean' && !anodeInLoop) {
            return;
        }
        var node = list.getHead();
        var _node_;
        while (node != null) {
            _node_ = duplicate(anodeInLoop);
            while (_node_.getNext() != node && _node_.getNext() != anodeInLoop) {
                _node_ = _node_.getNext();

            }
            if (_node_.getNext() == node) {
                _node_.setNext(null);
                break;
            }
            node = node.getNext();
        }
        return list;
    },
    /**
     * check if the list is palindrome or not.
     * returns a boolean.
     */
    isPalindrome: function () {
        var currentSize = this.size();
        if (currentSize === 0 || currentSize === 1 || (currentSize === 2 && this.getHead().getValue() === this.getHead().getNext().getValue())) {
            return true;
        }
        var list = this;
        var mid = Math.floor(currentSize / 2);
        var isPalindrome = true;
        var _temp_ = new (Object.getPrototypeOf(this)).constructor();
        _temp_.setHead(list.getHead());
        //var reversedHalf = (list.reverse.call(duplicate(list), 1, mid)).getHead();
        var reversedHalf = (_temp_.reverse.call(_temp_, 1, mid)).getHead();
        var secondHalf = list.nodeAt((currentSize % 2 === 0) ? mid + 1 : mid + 2);
        var counter = 0;

        while (counter < mid) {
            if (reversedHalf.getValue() == secondHalf.getValue()) {
                reversedHalf = reversedHalf.getNext();
                secondHalf = secondHalf.getNext();
                counter += 1;
            } else {
                isPalindrome = false;
                break;
            }
        }
        return isPalindrome;
    },
    /**
     * Find nth node from end of the linked list. Assuming index starts from 1.
     * 
     * @param {number} position starting from 1.
     * throws an error if position is invalid.
     * returns the node, if found.
     */
    findFromEnd: function (position) {
        assert.validPosition(this, position);
        assert.withinBounds(this, position);
        return this.nodeAt((this.size() - position) + 1);
    },
    /**
     * check if the list is sorted.
     * checks the order of the list depending on the argument provided.
     * 
     * @param {number} order defaults to 1.
     * 1 for ascending ; -1 for descending;
     * returns boolean.
     */
    isSorted: function (order) {
        if (this.size() < 2) {
            return true;
        }
        var order = (typeof order === 'undefined') ? 1 : order;
        var isSorted = true;
        var node = this.getHead();
        while (node.getNext() != null) {
            if ((order == 1 && node.getValue() > node.getNext().getValue()) || (order == -1 && node.getValue() < node.getNext().getValue())) {
                isSorted = false;
                break;
            }
            node = node.getNext();
        }
        return isSorted;
    },
    // extracts and returns a part of list from and to provided positions.
    getPart: function (from, to) {
        assert.underflow(this);
        var currentSize = this.size();
        if (from > to || from < 1 || to > currentSize) {
            console.log(ERR_INVALID_RANGE); return;
        }
        var count = 0;
        var node = duplicate(this.nodeAt(from));

        var newList = new List(to - (from - 1));
        newList.setHead(node);

        while (from < to) {
            node = node.getNext();
            from += 1;
        }
        node.setNext(null);
        return newlist;
    },
    /**
     * swap values of any two nodes.
     * 
     * @param {number} position1 starts from 1.
     * @param {number} position2 starts from 1.
     * throws an error if either of the arguments is invalid.
     * does not return.
     */
    swap: function (position1, position2) {
        assert.validPosition(this, position1);
        assert.withinBounds(this, position1);
        assert.validPosition(this, position2);
        assert.withinBounds(this, position2);
        var firstNode = this.nodeAt(position1);
        var secondNode = this.nodeAt(position2);
        var hold = firstNode.getValue();
        firstNode.setValue(secondNode.getValue());
        secondNode.setValue(hold);
    },
    /**
     * sort the list.
     * sorts in ascending order by default.
     * modifies the exisiting list.
     * 
     * throws an error if list is empty.
     * returns sorted list if successful.
     * note : uses quick sort.
     */
    sort: function () {
        assert.underflow(this);
        if (this.size() < 2) {
            return this;
        }
        function makePartition(list, lowIndex, highIndex) {
            var pivotNode = list.nodeAt(highIndex);
            var partitionIndex = lowIndex;
            var node;

            for (var i = lowIndex; i <= highIndex - 1; i++) {
                node = list.nodeAt(i);
                if (node.getValue() < pivotNode.getValue()) {
                    list.swap(i, partitionIndex);
                    partitionIndex += 1;
                }
            }
            list.swap(partitionIndex, highIndex);
            return partitionIndex;
        }
        function sort(list, startIndex, endIndex) {
            if (startIndex >= endIndex) {
                return;
            }
            var pivotIndex = makePartition(list, startIndex, endIndex);
            sort(list, startIndex, pivotIndex - 1);
            sort(list, pivotIndex + 1, endIndex);
        }
        sort(this, 1, this.size());
        return this;
    },
    /**
     * remove duplicate nodes.
     * does not return.
     * modifies existing list.
     */
    removeDuplicates: function () {
        if (this.size() < 2) {
            return;
        }
        var node = this.getHead();
        var previous;
        var position = 1;
        var hash = {};

        while (node != null) {
            if (!hash.hasOwnProperty(node.getValue())) {
                hash[node.getValue()] = position;
                previous = node;
                node = node.getNext();
            } else {
                previous.setNext(node.getNext());
                node = previous.getNext();
            }
            position += 1;
        }
    },
    /**
     * Rotate the list in a counter clockwise direction by specified places.
     * 
     * @param {number} places 
     * throws an error if supplied argument is greater than the size of list.
     * does not return.
     * modifies existing list.
     */
    rotate: function (places) {
        assert.withinBounds(this, parseInt(places));
        var ll = this;
        var newhead = ll.getHead();
        var count = 0;
        var node;
        if (places > ll.size) {
            return;
        }
        while (count < places && newhead != null) {
            count++;
            node = newhead;
            newhead = newhead.getNext();
        }
        var last = ll.getLastNode();
        last.setNext(ll.getHead());

        while (last.getNext() != newhead) {
            last = last.getNext();
        }
        last.setNext(null);
        ll.setHead(newhead);
    },
    /**
     * return a string representation of the list
     */
    toString: function () {
        var node = this.getHead();
        var output = '';
        while (node != null) {
            output = output.concat(node.getValue().toString()).concat(' -> ');
            node = node.getNext();
        }
        return output.concat('null');
    }
};