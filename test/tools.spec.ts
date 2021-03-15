import { buildSearchTree, createLongPrefix, createLongSuffix, intersectionLength } from '../src/tools'

describe('tools test', () => {
    it('should return search-words-tree with rightly attributes nodes', () => {
        const tree = buildSearchTree(['she', 'he', 'her'])
        const { children } = tree
        expect(children.has('s') && children.has('h')).toBeTruthy()
        expect(children.size).toBe(2)
        expect(children.get('s')?.children.has('h') && children.get('s')?.children.size === 1).toBeTruthy()
        expect(children.get('s')?.children.get('h')?.children.has('e')).toBeTruthy()
        expect(children.get('s')?.children.get('h')?.children.get('e')?.isEnd).toBeTruthy()
        expect(children.get('h')?.children.get('e')?.isEnd).toBeTruthy()
        expect(children.get('h')?.children.get('e')?.children.get('r')?.isEnd).toBeTruthy()
        expect(children.get('s')?.failPointer).toEqual(tree)
        expect(children.get('h')?.failPointer).toEqual(tree)
        expect(children.get('h')?.children.get('e')?.failPointer).toEqual(tree)
        expect(children.get('h')?.children.get('e')?.children.get('r')?.failPointer).toEqual(tree)
        expect(children.get('s')?.children.get('h')?.failPointer).toEqual(children.get('h'))
        expect(children.get('s')?.children.get('h')?.children.get('e')?.failPointer).toEqual(children.get('h')?.children.get('e'))
    })
    it('should return rightly words prefix array', () => {
        const result = createLongPrefix('hello')
        expect(result).toEqual(['h', 'he', 'hel', 'hell'])
    })
    it('should return rightly words suffix array', () => {
        const result = createLongSuffix('hello')
        expect(result).toEqual(['ello', 'llo', 'lo', 'o'])
    })
    it('should return longest length between suffix and prefix array', () => {
        expect(intersectionLength(createLongSuffix('hello'), createLongPrefix('hello'))).toBe(0)
        expect(intersectionLength(createLongSuffix('babab'), createLongPrefix('babab'))).toBe(3)
    })
})
