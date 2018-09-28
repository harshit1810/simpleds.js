var stackUtilities = require('./util');
var assert = stackUtilities.stackAssertions;
module.exports = (function () {
    /**
     * check for the emptiness of stack.
     * @returns {boolean}
     */
    function isempty() {
        return getSize.call(this) === 0;
    }
    /**
     * find the size of stack.
     * @returns {number}
     */
    function getSize() {
        return this.getElements().length;
    }
    /**
     * remove all elements from the stack.
     * @returns {number} size of stack.
     */
    function clearTheStack() {
        var self = this;
        self.getElements().splice(0, getSize.call(self));
        return getSize.call(self);
    }
    /**
     * insert an element in the stack.
     * throws an error if value provided is invalid.
     * @param {*} value 
     * @returns {number} size of stack.
     */
    function push(value) {
        var newValue = stackUtilities.getValidStackElement(value);
        this.getElements().push(newValue);
        var newTop = this.getTop() + 1;
        this.setTop(newTop);
        return getSize.call(this);
    }
    /**
     *  remove an element off the top of stack.
     *  throws an error if the stack is empty.
     *  @returns {*} popped element.
     */
    function pop() {
        assert.notEmpty(this);
        var size = getSize.call(this);
        var popped = this.getElements().splice(size - 1, 1)[0];
        return popped;
    }
    /**
     * @returns {*} the topmost element of the stack.
     */
    function peek() {
        var top = this.getTop();
        return this.getElements()[top];
    }
    return {
        'isEmpty': isempty,
        'push': push,
        'pop': pop,
        'peek': peek,
        'clear': clearTheStack,
        'size': getSize
    };
})();