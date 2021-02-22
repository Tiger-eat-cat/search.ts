"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSearch = void 0;
var tools_1 = require("./tools");
var buildSearch = function (searchList) {
    var searchTree = tools_1.buildSearchTree(searchList);
    return {
        search: function (content) {
            var searchResult = [];
            var contentList = content.split('');
            contentList.forEach(function (char, index) {
                tools_1.findFromTopNode(contentList, searchTree, index, searchResult);
            });
            return searchResult;
        }
    };
};
exports.buildSearch = buildSearch;
