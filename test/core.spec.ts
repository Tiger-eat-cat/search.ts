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
            key: 1,
            child: [{ key: 2 }, { key: 3, child: [{ key: 4 }, { key: 5 }] }]
        }
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.key === 5, 'child')?.key).toBe(5)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.key === 333, 'child')).toBeNull()
    })
    it('should return target node use default key', () => {
        const tree: TestTreeNode = {
            id: 1,
            children: [{ id: 2 }, { id: 3, children: [{ id: 4 }, { id: 5 }] }]
        }
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 4)?.id).toBe(4)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 6)).toBeNull()
    })
    it('should return target node when use tree array', () => {
        const tree: TestTreeNode = [
            {
                id: 1,
                children: [{ id: 2 }, { id: 3, children: [{ id: 4 }, { id: 5 }] }]
            },
            {
                id: 6,
                children: [{ id: 7 }, { id: 8, children: [{ id: 9 }, { id: 10 }] }]
            },
        ]
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 1)?.id).toBe(1)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 2)?.id).toBe(2)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 3)?.id).toBe(3)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 4)?.id).toBe(4)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 5)?.id).toBe(5)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 6)?.id).toBe(6)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 7)?.id).toBe(7)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 8)?.id).toBe(8)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 9)?.id).toBe(9)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 10)?.id).toBe(10)
        expect(treeDepthFirstSearch(tree, (node: TestTreeNode) => node.id === 11)).toBeNull()
    })
})


describe('bfs test', () => {
    it('should return target node use custom key', () => {
        const tree: TestTreeNode = {
            key: 1,
            child: [{ key: 2 }, { key: 3, child: [{ key: 4 }, { key: 5 }] }]
        }
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.key === 1, 'child')?.key).toBe(1)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.key === 3, 'child')?.key).toBe(3)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.key === 5, 'child')?.key).toBe(5)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.key === 6, 'child')).toBeNull()
    })
    it('should return target node use default key', () => {
        const tree: TestTreeNode = {
            id: 1,
            children: [{ id: 2 }, { id: 3, children: [{ id: 4 }, { id: 5 }] }]
        }
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 1)?.id).toBe(1)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 2)?.id).toBe(2)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 3)?.id).toBe(3)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 5)?.id).toBe(5)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 333)).toBeNull()
    })
    it('should return target node when use tree array', () => {
        const tree: TestTreeNode = [
            {
                id: 1,
                children: [{ id: 3 }, { id: 5, children: [{ id: 7 }, { id: 8 }] }]
            },
            {
                id: 2,
                children: [{ id: 4 }, { id: 6, children: [{ id: 9 }, { id: 10 }] }]
            },
        ]
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 1)?.id).toBe(1)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 2)?.id).toBe(2)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 3)?.id).toBe(3)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 4)?.id).toBe(4)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 5)?.id).toBe(5)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 6)?.id).toBe(6)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 7)?.id).toBe(7)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 8)?.id).toBe(8)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 9)?.id).toBe(9)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 10)?.id).toBe(10)
        expect(treeBreadthFirstSearch(tree, (node: TestTreeNode) => node.id === 11)).toBeNull()
    })
})
