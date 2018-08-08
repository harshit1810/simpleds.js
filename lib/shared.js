/**
 * constructor for basic node.
 * data structures extend this while setting up a node for use.
 * 
 * @param {*} nodeValue 
 * returns a Node instance having getter and setter function for a hidden node value.
 */
function Node(nodeValue) {
    Object.assign(this, makeGetterSetter('Value', nodeValue));
}

/**
 * creates a private property and gives public getter and setter methods.
 * 
 * @param {string} propertyName 
 * @param {any} propertyValue 
 * @param {function} validator to be applied before setting the value; 
 */
function makeGetterSetter(propertyName, propertyValue, validator) {
    propertyName = propertyName.toString().trim();
    return (function () {
        var x = propertyValue;
        var returnObj = {};
        /**
         * getter
         */
        returnObj['get'.concat(propertyName)] = function () {
            return x;
        };
        /**
         * setter
         */
        returnObj['set'.concat(propertyName)] = function (newValue) {
            if (validator && typeof validator === 'function') {
                newValue = validator(newValue);
            }
            x = newValue;
        };
        return returnObj;
    })();
}

module.exports.clone = function (input) {
    var newObject = Object.create(Object.getPrototypeOf(input));
    return Object.assign(newObject, input);
}
module.exports.makeGetterSetter = makeGetterSetter;

module.exports.SET_DEFAULT_NODE_VALUE = SET_DEFAULT_NODE_VALUE = true;
module.exports.NEW_NODE_DEFAULT_VALUE = NEW_NODE_DEFAULT_VALUE = 0;
module.exports.NEW_NODE_DEFAULT_REFERENCE = null;
module.exports.NODE_ARGS_INTERCEPTOR = function () {
    if (typeof this[0] === 'undefined' && typeof SET_DEFAULT_NODE_VALUE === 'boolean' && SET_DEFAULT_NODE_VALUE === true) {
        this[0] = NEW_NODE_DEFAULT_VALUE;
    }
};

module.exports.Node = Node;