import { buildSearch, treeDepthFirstSearch, treeBreadthFirstSearch } from '../src/core'
import { Formatter } from '../src/types'

const content = 'abcd bacd'
const expectResult = [ { start: 0, end: 2, word: 'abc' }, { start: 5, end: 7, word: 'bac' } ]

describe('build search test', () => {
    it('should return SearchResult Array', () => {
        expect(buildSearch(['abc', 'bac']).search(content)).toEqual(expectResult)
        expect(buildSearch('abc').search(content)).toEqual([{ start: 0, end: 2 }])
    })
    it('test formatter func', () => {
        const formatter: Formatter = (result, word) => {
            result.push({ name: word })
        }
        const formatter2: Formatter = (result, word, start, end) => {
            result.push({ start, end, name: word })
        }
        expect(buildSearch(['abc', 'bc', 'bac']).search(content, formatter)).toEqual([ { name: 'abc' }, { name: 'bc' }, { name: 'bac' } ])
        expect(buildSearch('abc').search(content, formatter2)).toEqual([{ start: 0, end: 2, name: 'abc' }])
    })
})


interface TestTreeNode {
    id?: number;
    children?: TestTreeNode[];
    [key: string]: any
}

describe('dfs test', () => {
    it('should return target node use custom key', () => {
        const tree: TestTreeNode = {
            key: 123,
            child: [{ key: 345 }, { key: 334, child: [{ key: 221 }, { key: 232 }] }]
        }
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.key === 221, 'key', 'child')?.key).toBe(221)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.key === 333, 'key', 'child')).toBeNull()
    })
    it('should return target node use default key', () => {
        const tree: TestTreeNode = {
            id: 123,
            children: [{ id: 345 }, { id: 334, children: [{ id: 221 }, { id: 232 }] }]
        }
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 221)?.id).toBe(221)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 333)).toBeNull()
    })
})


describe('bfs test', () => {
    it('should return target node use custom key', () => {
        const tree: TestTreeNode = {
            key: 123,
            child: [{ key: 345 }, { key: 334, child: [{ key: 221 }, { key: 232 }] }]
        }
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.key === 232, 'key', 'child')?.key).toBe(232)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.key === 333, 'key', 'child')).toBeNull()
    })
    it('should return target node use default key', () => {
        const tree: TestTreeNode = {
            id: 123,
            children: [{ id: 345 }, { id: 334, children: [{ id: 221 }, { id: 232 }] }]
        }
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 221)?.id).toBe(221)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 333)).toBeNull()
    })
})
