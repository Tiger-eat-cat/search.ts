import { buildSearchTree, createLongPrefix, createLongSuffix, findFromTopNode, intersectionLength } from './tools'
import { SearchResult, Search } from './types'

export const buildSearch = (search: string[] | string): Search => {
    if (search instanceof Array) {
        const searchTree = buildSearchTree(search)
        return {
            search: (content: string): SearchResult[] => {
                const searchResult: SearchResult[] = []
                const contentList = content.split('')
                contentList.forEach((char, index) => {
                    findFromTopNode(contentList, searchTree, index, searchResult)
                })
                return searchResult
            }
        }
    } else {
        return buildKMPSearch(search)
    }
}

export const buildKMPSearch = (search: string): Search => {
    const partMatchTable: Map<number, number> = new Map() // pmt
    for (let i = 0; i < search.length; i++) {
        const str = search.slice(0, i + 1)
        partMatchTable.set(i, intersectionLength(createLongSuffix(str), createLongPrefix(str)))
    }
    return {
        search: (content: string): SearchResult[] => {
            // debugger
            const contentLength = content.length
            const matchLength = search.length
            const result: SearchResult[] = []
            let i = 0
            let j = 0
            const calculateMatchIndex = (currentIndex: number): void => {
                // debugger
                j = j - (currentIndex - (partMatchTable.get(currentIndex - 1) as number))
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
                        result.push({ start: i - (matchLength - 1), end: i })
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
