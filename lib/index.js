var SinglyLinkedList = require('./singly-linked-list/singly-linked-list');
var CircularLinkedList = require('./circular-linked-list/circular-linked-list');

var list = [SinglyLinkedList, CircularLinkedList];
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
