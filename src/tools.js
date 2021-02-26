"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersectionLength = exports.createLongSuffix = exports.createLongPrefix = exports.findFromTopNode = exports.buildSearchTree = void 0;
var buildFailPointer = function (searchWordTree) {
    var _a, _b;
    var queue = [];
    queue.push.apply(queue, __spreadArray([], __read(searchWordTree.children.values())));
    while (queue.length !== 0) {
        var node = queue.shift();
        var nodeName = node.name;
        if (((_a = node.name) === null || _a === void 0 ? void 0 : _a.length) === 1) {
            node.failPointer = searchWordTree;
        }
        else {
            var parentNodeFailPointer = (_b = node.parent) === null || _b === void 0 ? void 0 : _b.failPointer;
            var parentNodeFailPointerChildren = parentNodeFailPointer === null || parentNodeFailPointer === void 0 ? void 0 : parentNodeFailPointer.children;
            if (parentNodeFailPointerChildren.has(nodeName)) {
                node.failPointer = parentNodeFailPointerChildren.get(nodeName);
            }
            else {
                node.failPointer = parentNodeFailPointer;
            }
        }
    }
};
var buildSearchTree = function (searchArray) {
    var tree = {
        children: new Map(),
        str: '',
    };
    var createNode = function (isEnd, name, prefix, parent) { return ({
        children: new Map(),
        name: name,
        str: prefix + name,
        isEnd: isEnd,
        parent: parent,
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
                var newNode = createNode(isEnd, char, node.str, node);
                node.children.set(char, newNode);
                node = node.children.get(char);
            }
        });
    });
    buildFailPointer(tree);
    return tree;
};
exports.buildSearchTree = buildSearchTree;
var findFromTopNode = function (contents, tree, position, searchResult, formatter) {
    var createMatchInfo = function (word, start, end) { return ({ word: word, start: start, end: end }); };
    var node = tree;
    for (var cursor = position; cursor < contents.length; cursor++) {
        var char = contents[cursor];
        var nodeChildren = node.children;
        if (nodeChildren.has(char)) {
            node = nodeChildren.get(char);
            // @ts-ignore
            if (node.isEnd) {
                if (formatter) {
                    formatter(searchResult, node.str, position, cursor);
                }
                else {
                    searchResult.push(createMatchInfo(node.str, position, cursor));
                }
            }
        }
        else {
            node = node.failPointer;
            break;
        }
    }
};
exports.findFromTopNode = findFromTopNode;
var createLongPrefix = function (str) {
    var prefixCollection = [];
    var length = str.length;
    if (length === 1) {
        return prefixCollection;
    }
    for (var i = 0; i < length - 1; i++) {
        prefixCollection.push(str.slice(0, i + 1));
    }
    return prefixCollection;
};
exports.createLongPrefix = createLongPrefix;
var createLongSuffix = function (str) {
    var suffixCollection = [];
    var length = str.length;
    if (length === 1) {
        return suffixCollection;
    }
    for (var i = length - 1; i > 0; i--) {
        suffixCollection.unshift(str.slice(i, length));
    }
    return suffixCollection;
};
exports.createLongSuffix = createLongSuffix;
var intersectionLength = function (arg1, arg2) {
    var result = '';
    var arrayMap = new Map();
    arg1.forEach(function (item) { return arrayMap.set(item, item); });
    for (var i = 0; i < arg2.length; i++) {
        var item = arg2[i];
        if (arrayMap.has(item) && item.length > result.length) {
            result = item;
        }
    }
    return result.length;
};
exports.intersectionLength = intersectionLength;
