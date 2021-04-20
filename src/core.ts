import { buildSearchTree, createLongPrefix, createLongSuffix, intersectionLength } from './tools'
import { Search, Formatter, SearchTreeNode } from './types'

export const buildSearch = (search: string[] | string): Search => {
    if (search instanceof Array) {
        const searchTree = buildSearchTree(search)
        return {
            search: (content: string, formatter?: Formatter): unknown[] => {
                const createMatchInfo = (word: string, start: number, end: number): unknown => ({ word, start, end })
                const searchResult: unknown[] = []
                const contentList = content.split('')
                let node: SearchTreeNode = searchTree
                for (let i = 0; i < contentList.length; i++) {
                    const char: string = content[i]
                    const nodeChildren: Map<string, SearchTreeNode> = node.children
                    if (nodeChildren.has(char)) {
                        node = nodeChildren.get(char) as SearchTreeNode
                        while (node.isEnd) {
                            const start = (i + 1) - node.length
                            const name: string = content.slice(start, i + 1)
                            if (formatter) {
                                formatter(searchResult, name, start, i)
                            } else {
                                searchResult.push(createMatchInfo(name, start, i))
                            }
                            node = node.failPointer as SearchTreeNode
                        }
                    } else {
                        node = (node.failPointer || searchTree) as SearchTreeNode
                    }
                }
                return searchResult
            }
        }
    } else {
        return buildKMPSearch(search)
    }
}

export const buildKMPSearch = (search: string): Search => {
    const partialMatchTable: Map<number, number> = new Map() // pmt
    for (let i = 0; i < search.length; i++) {
        const str = search.slice(0, i + 1)
        partialMatchTable.set(i, intersectionLength(createLongSuffix(str), createLongPrefix(str)))
    }
    return {
        search: (content: string, formatter?: Formatter): unknown[] => {
            // debugger
            const contentLength = content.length
            const matchLength = search.length
            const result: unknown[] = []
            let i = 0
            let j = 0
            const calculateMatchIndex = (currentIndex: number): void => {
                // debugger
                j = j - (currentIndex - (partialMatchTable.get(currentIndex - 1) as number))
            }
            while (i < contentLength) {
                if (content[i] !== search[j]) { // 如果当前不匹配
                    if (j !== 0) { // 如果匹配字符串索引当前位置不是0，利用pmt重新移动索引
                        calculateMatchIndex(j)
                    } else {
                        i++
                    }
                } else {
                    if (j === matchLength - 1) { // 如果匹配到匹配字符串最后一位，说明成功匹配到一次，重置匹配字符串索引至开始位置，继续向下文本字符串索引
                        if (formatter) {
                            formatter(result, search, i - (matchLength - 1), i)
                        } else {
                            result.push({ start: i - (matchLength - 1), end: i })
                        }
                        i++
                        j = 0
                    } else {
                        i++
                        j++
                    }
                }
            }
            return result
        }
    }
}
