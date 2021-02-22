import { SearchWordTree, WordNode, SearchResult } from './types'

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

export const findFromTopNode = (contents: string[], tree: SearchWordTree, position: number, searchResult: SearchResult[]): void => {
    const createMatchInfo = (word: string, start: number, end: number): SearchResult => ({ word, start, end })
    let node: WordNode | SearchWordTree = tree
    for (let cursor = position; cursor < contents.length; cursor++) {
        const char: string = contents[cursor]
        const nodeChildren: Map<string, WordNode> = node.children
        if (nodeChildren.has(char)) {
            node = nodeChildren.get(char) as WordNode
            // @ts-ignore
            if (node.isEnd) {
                searchResult.push(createMatchInfo(node.str, position, cursor))
            }
        } else {
            break
        }
    }
}
