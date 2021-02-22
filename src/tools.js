"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFromTopNode = exports.buildSearchTree = void 0;
var buildSearchTree = function (searchArray) {
    var tree = {
        children: new Map(),
        str: '',
    };
    var createNode = function (isEnd, name, prefix) { return ({
        children: new Map(),
        name: name,
        str: prefix + name,
        isEnd: isEnd,
    }); };
    searchArray.forEach(function (word) {
        var charList = word.split('');
        var node = tree;
        charList.forEach(function (char, index) {
            if (node.children.has(char)) {
                node = node.children.get(char);
            }
            else {
                var isEnd = index === word.length - 1;
                var newNode = createNode(isEnd, char, node.str);
                node.children.set(char, newNode);
                node = node.children.get(char);
            }
        });
    });
    return tree;
};
exports.buildSearchTree = buildSearchTree;
var findFromTopNode = function (contents, tree, position, searchResult) {
    var createMatchInfo = function (word, start, end) { return ({ word: word, start: start, end: end }); };
    var node = tree;
    for (var cursor = position; cursor < contents.length; cursor++) {
        var char = contents[cursor];
        var nodeChildren = node.children;
        if (nodeChildren.has(char)) {
            var target = nodeChildren.get(char);
            if (target.isEnd) {
                searchResult.push(createMatchInfo(node.str, position, cursor));
            }
            node = target;
        }
        else {
            break;
        }
    }
};
exports.findFromTopNode = findFromTopNode;
