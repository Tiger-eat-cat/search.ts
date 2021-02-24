import { buildSearch } from '../src/core'


describe('build search test', () => {
    it('should return SearchResult Array', () => {
        const content = 'abcd bacd'
        const expectResult = [ { start: 0, end: 2, word: 'abc' }, { start: 5, end: 7, word: 'bac' } ]
        expect(buildSearch(['abc', 'bac']).search(content)).toEqual(expectResult)
        expect(buildSearch('abc').search(content)).toEqual([{ start: 0, end: 2 }])
    })
})
