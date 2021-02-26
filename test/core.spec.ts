import { buildSearch } from '../src/core'
import { Formatter } from '../src/types'

const content = 'abcd bacd'
const expectResult = [ { start: 0, end: 2, word: 'abc' }, { start: 5, end: 7, word: 'bac' } ]

describe('build search test', () => {
    it('should return SearchResult Array', () => {
        expect(buildSearch(['abc', 'bac']).search(content)).toEqual(expectResult)
        expect(buildSearch('abc').search(content)).toEqual([{ start: 0, end: 2 }])
    })
    it('test formatter func', () => {
        const formatter: Formatter = (result, word, start, end) => {
            result.push({ word, start, end })
        }
        const formatter2: Formatter = (result, word, start, end) => {
            result.push({ start, end })
        }
        expect(buildSearch(['abc', 'bac']).search(content, formatter)).toEqual(expectResult)
        expect(buildSearch('abc').search(content, formatter2)).toEqual([{ start: 0, end: 2 }])
    })
})
