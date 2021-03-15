# search.ts
Searches for the target string in the string.
Use the Aho-Corasick automaton when search many words.
Use the KMP when search single word.

# How To Use
```
npm install search.ts

import { buildSearch } from 'search.ts'

// when you want to search many words
const article = 'She is a so beautiful girl.'
const searcher = buildSearch(['She', 'he', 'girl', 'beautiful'])
console.log(searcher.search(article))
/*
* [
*   0: {word: "She", start: 0, end: 2}
*   1: {word: "he", start: 1, end: 2}
*   2: {word: "beautiful", start: 12, end: 20}
*   3: {word: "girl", start: 22, end: 25}
* ]
*/
// when you want to search single word
const kmpSearcher = buildSearch('She')
console.log(searcher.search(article))
/*
* [
*   0: {start: 0, end: 2}
* ]
*/
```
# Document
### API
- **buildSearch**
   - buildSearch(searchStr: string | string[]): **Search** (it will build a match-words-tree and returns an object with search func.)
      - searchStr: The string what you want to find. Can be single word or word array.
      - Search: An object with search function.

- **search** 
   - search(content: string, formatter?: **Formatter**): **SearchResult** []
      - content: The original string.
      - formatter: The custom function. Please refer to the documentation for details.
      - SearchResult: The search result array. You can pass function 'formatter' to change its structure.

- **formatter** (You can pass this function to customize search result)
   - formatter(result: [], word: string, start: number, end: number): void
      - result: The function 'search' return
      - word: Matched word
      - start: Matched word start index in content
      - end: Matched word end index in content
      
### Attribute
    SearchResult {
        word?: string,
        start?: number,
        end?: number,
    }
    
    Formatter = (result: SearchResult[], word: string, start: number, end: number) => void
    
    Search {
        search(content: string, formatter?: Formatter): SearchResult[]
    }
