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
                validator(newValue);
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
module.exports.NEW_NODE_DEFAULT_REFERENCE = NEW_NODE_DEFAULT_REFERENCE = null;
module.exports.Node = Node;