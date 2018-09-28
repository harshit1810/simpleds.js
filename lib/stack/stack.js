var utils = require('./util');
var methods = require('./stack-methods');
var sharedComponents = require('../shared');
function Stack() {
    /**
     * use an array to store stack elements.
     * pushed elements go to the end of the array.
     */
    Object.assign(this, sharedComponents.makeGetterSetter('Elements', [], null, false));
    Object.assign(this, sharedComponents.makeGetterSetter('Top', -1, utils.getValidStackElement));
    Object.assign(Stack.prototype, methods);
}
module.exports = Stack;