import { SearchWordTree, WordNode, SearchResult, Formatter } from './types'

export const buildSearchTree = (searchArray: string[]): SearchWordTree => {
    const tree: SearchWordTree = {
        children: new Map(),
        str: '',
    }
    const createNode = (isEnd: boolean, name: string, prefix: string): WordNode => ({
        children: new Map(),
        name,
        str: prefix + name,
        isEnd,
    })
    searchArray.forEach(word => {
        const charList: string[] = word.split('')
        let node: SearchWordTree | WordNode = tree
        charList.forEach((char, index) => {
            if (node.children.has(char)) {
                node = node.children.get(char) as WordNode
            } else {
                const isEnd: boolean = index === word.length - 1
                const newNode: WordNode = createNode(isEnd, char, node.str)
                node.children.set(char, newNode)
                node = node.children.get(char) as WordNode
            }
        })
    })
    return tree
}

export const findFromTopNode = (contents: string[], tree: SearchWordTree, position: number, searchResult: SearchResult[], formatter?: Formatter): void => {
    const createMatchInfo = (word: string, start: number, end: number): SearchResult => ({ word, start, end })
    let node: WordNode | SearchWordTree = tree
    for (let cursor = position; cursor < contents.length; cursor++) {
        const char: string = contents[cursor]
        const nodeChildren: Map<string, WordNode> = node.children
        if (nodeChildren.has(char)) {
            node = nodeChildren.get(char) as WordNode
            // @ts-ignore
            if (node.isEnd) {
                if (formatter) {
                    formatter(searchResult, node.str, position, cursor)
                } else {
                    searchResult.push(createMatchInfo(node.str, position, cursor))
                }
            }
        } else {
            break
        }
    }
}


export const createLongPrefix = (str: string): string[] => {
    const prefixCollection: string[] = []
    const length: number = str.length
    if (length === 1) {
        return prefixCollection
    }
    for (let i = 0; i < length - 1; i++) {
        prefixCollection.push(str.slice(0, i + 1))
    }
    return prefixCollection
}

export const createLongSuffix = (str: string): string[] => {
    const suffixCollection: string[] = []
    const length: number = str.length
    if (length === 1) {
        return suffixCollection
    }
    for (let i = length - 1; i > 0; i--) {
        suffixCollection.unshift(str.slice(i, length))
    }
    return suffixCollection
}

export const intersectionLength = (arg1: string[], arg2: string[]): number => {
    let result = ''
    const arrayMap: Map<string, string> = new Map()
    arg1.forEach(item => arrayMap.set(item, item))
    for (let i = 0; i < arg2.length; i++) {
        const item = arg2[i]
        if (arrayMap.has(item) && item.length > result.length) {
            result = item
        }
    }
    return result.length
}
