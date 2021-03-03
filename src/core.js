"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildKMPSearch = exports.buildSearch = void 0;
var tools_1 = require("./tools");
var buildSearch = function (search) {
    if (search instanceof Array) {
        var searchTree_1 = tools_1.buildSearchTree(search);
        return {
            search: function (content, formatter) {
                var searchResult = [];
                var contentList = content.split('');
                contentList.forEach(function (char, index) {
                    tools_1.findFromTopNode(contentList, searchTree_1, index, searchResult, formatter);
                });
                return searchResult;
            }
        };
    }
    else {
        return exports.buildKMPSearch(search);
    }
};
exports.buildSearch = buildSearch;
var buildKMPSearch = function (search) {
    var partialMatchTable = new Map(); // pmt
    for (var i = 0; i < search.length; i++) {
        var str = search.slice(0, i + 1);
        partialMatchTable.set(i, tools_1.intersectionLength(tools_1.createLongSuffix(str), tools_1.createLongPrefix(str)));
    }
    return {
        search: function (content, formatter) {
            // debugger
            var contentLength = content.length;
            var matchLength = search.length;
            var result = [];
            var i = 0;
            var j = 0;
            var calculateMatchIndex = function (currentIndex) {
                // debugger
                j = j - (currentIndex - partialMatchTable.get(currentIndex - 1));
            };
            while (i < contentLength) {
                if (content[i] !== search[j]) { // 如果当前不匹配
                    if (j !== 0) { // 如果匹配字符串索引当前位置不是0，利用pmt重新移动索引
                        calculateMatchIndex(j);
                    }
                    else {
                        i++;
                    }
                }
                else {
                    if (j === matchLength - 1) { // 如果匹配到匹配字符串最后一位，说明成功匹配到一次，重置匹配字符串索引至开始位置，继续向下文本字符串索引
                        if (formatter) {
                            formatter(result, search, i - (matchLength - 1), i);
                        }
                        else {
                            result.push({ start: i - (matchLength - 1), end: i });
                        }
                        i++;
                        j = 0;
                    }
                    else {
                        i++;
                        j++;
                    }
                }
            }
            return result;
        }
    };
};
exports.buildKMPSearch = buildKMPSearch;
