var sharedComponents = require('../shared');
module.exports.ERROR_NAME = 'StackError';
module.exports.getValidStackElement = function (value) {
    stackAssertions.validElement(value);
    if (typeof value === 'string') {
        value = value.trim();
    }
    return value;
};
module.exports.stackAssertions = stackAssertions = (function () {
    var ERR_MSG_STACK_EMPTY = 'Stack Is Empty';
    var ERR_MSG_STACK_INVALID_VALUE = 'Invalid Value';
    function getError(message) {
        var e = Error(message);
        e.name = module.exports.ERROR_NAME;
        return e;
    }
    return {
        validElement: function (value) {
            if (!sharedComponents.isValidStackElement(value)) {
                throw getError(ERR_MSG_STACK_INVALID_VALUE);
            }
            return;
        },
        notEmpty: function (stack) {
            if (stack.isEmpty()) {
                throw getError(ERR_MSG_STACK_EMPTY);
            }
            return;
        }
    };
})();