import { SearchTreeNode, SearchResult, Formatter } from './types'

const buildFailPointer = (searchWordTree: SearchTreeNode) => {
    const queue: SearchTreeNode[] = []
    queue.push(...searchWordTree.children.values())
    while (queue.length !== 0) {
        const node = queue.shift() as SearchTreeNode
        const nodeName = node.name as string
        const nodeStr = node.str as string
        queue.push(...node.children.values())
        if (nodeStr?.length === 1) {
            node.failPointer = searchWordTree
        } else {
            const parentNodeFailPointer = node.parent?.failPointer
            const parentNodeFailPointerChildren = parentNodeFailPointer?.children as Map<string, SearchTreeNode>
            if (parentNodeFailPointerChildren.has(nodeName)) {
                node.failPointer = parentNodeFailPointerChildren.get(nodeName)
            } else {
                node.failPointer = parentNodeFailPointer
            }
        }
    }
}

export const buildSearchTree = (searchArray: string[]): SearchTreeNode => {
    const tree: SearchTreeNode = {
        children: new Map(),
        str: '',
    }
    const createNode = (isEnd: boolean, name: string, prefix: string, parent: SearchTreeNode): SearchTreeNode => ({
        children: new Map(),
        name,
        str: prefix + name,
        isEnd,
        parent,
    })
    searchArray.forEach(word => {
        const charList: string[] = word.split('')
        let node: SearchTreeNode = tree
        charList.forEach((char, index) => {
            if (node.children.has(char)) {
                node = node.children.get(char) as SearchTreeNode
            } else {
                const isEnd: boolean = index === word.length - 1
                const newNode: SearchTreeNode = createNode(isEnd, char, node.str, node)
                node.children.set(char, newNode)
                node = node.children.get(char) as SearchTreeNode
            }
        })
    })
    buildFailPointer(tree)
    return tree
}

export const findFromTopNode = (contents: string[], tree: SearchTreeNode, position: number, searchResult: SearchResult[], formatter?: Formatter): void => {
    const createMatchInfo = (word: string, start: number, end: number): SearchResult => ({ word, start, end })
    let node: SearchTreeNode = tree
    for (let cursor = position; cursor < contents.length; cursor++) {
        const char: string = contents[cursor]
        const nodeChildren: Map<string, SearchTreeNode> = node.children
        if (nodeChildren.has(char)) {
            node = nodeChildren.get(char) as SearchTreeNode
            // @ts-ignore
            if (node.isEnd) {
                if (formatter) {
                    formatter(searchResult, node.str, position, cursor)
                } else {
                    searchResult.push(createMatchInfo(node.str, position, cursor))
                }
            }
        } else {
            node = node.failPointer as SearchTreeNode
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
