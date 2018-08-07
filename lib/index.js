var LinkedList = require('./singly-linked-list/singly-linked-list');

var list = [LinkedList];
module.exports = (function (modules) {
    var exported = {};
    for (var module of modules) {
        if (typeof module === 'object' && Object.keys(module).length > 0) {
            for (var key in module) {
                exported[key] = module[key];
            }
        }
    }
    return exported;
}).apply(this, [list]);
