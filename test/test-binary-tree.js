var expect = require('chai').expect;
var BinaryTree = require('../lib/index').BinaryTree;
var util = require('../lib/binary-tree/util');
var Node = util.BinaryTreeNode;
var invalidNodeValues = [Infinity, -Infinity, Symbol(), {}, function () { }];
var sharedTestUtils = require('./shared')(BinaryTree);

describe('Tests for Binary Tree', function () {

    it('create a binary tree node', function () {
        sharedTestUtils.shouldBeValidNode(new Node());
    });

    it('should not create node with an invalid value', function () {
        var passed = false;
        try {
            for (var value in invalidNodeValues) {
                new Node(invalidNodeValues[value]);
            }
            passed = true;
        } catch (error) {
            sharedTestUtils.shouldBeError(error, util.ERROR_NAME);
        } finally {
            expect(passed).to.be.false;
        }
    });

    it('create new binary tree', function () {
        var tree = new BinaryTree();
        expect(tree).to.not.be.undefined;
        expect(tree).to.be.an.instanceof(BinaryTree);
        expect(tree.getRoot()).to.be.equal(null);
    });

    it('should set the root node of the tree', function () {
        var tree = new BinaryTree();
        expect(tree).to.not.be.undefined;
        expect(tree).to.be.an.instanceof(BinaryTree);
        expect(tree.getRoot()).to.be.equal(null);

        tree.setRoot(new Node(1));
        expect(tree.getRoot()).to.not.be.undefined;
        sharedTestUtils.shouldBeValidNode(tree.getRoot());
        expect(tree.getRoot().getValue()).to.be.equal(1);
    });

    it('height should be 1', function () {
        var tree = new BinaryTree();
        tree.setRoot(1);
        expect(tree.height()).to.not.be.lessThan(1);
        expect(tree.height()).to.be.equal(1);
    });

    it('insert a node', function () {
        var tree = new BinaryTree();
        tree.setRoot(4);
        var root = tree.getRoot();
        root.setLeft(3);
        tree.insert(9);
        expect(tree.traversal().levelOrder().split(/\s*/).join('')).to.be.equal('439');
    });

    it('print level order traversal', function () {
        var tree = new BinaryTree();
        tree.setRoot(4);
        var root = tree.getRoot();
        root.setLeft(3);
        root.setRight(5);
        expect(tree.traversal().levelOrder().split(/\s*/).join('')).to.be.equal('435');
    });

    it('print inorder traversal', function () {
        var tree = new BinaryTree();
        tree.setRoot(1);
        var root = tree.getRoot();
        root.setLeft(2);
        root.setRight(3);
        root.getLeft().setLeft(4);
        root.getLeft().setRight(5);
        expect(tree.traversal().inorder().replace(/\s*/g, '')).to.be.equal('42513');
    });

    it('print preorder traversal', function () {
        var tree = new BinaryTree();
        tree.setRoot(1);
        var root = tree.getRoot();
        root.setLeft(2);
        root.setRight(3);
        root.getLeft().setLeft(4);
        root.getLeft().setRight(5);
        expect(tree.traversal().preorder().replace(/\s*/g, '')).to.be.equal('12453');
    });
});