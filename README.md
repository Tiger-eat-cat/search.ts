# search.ts
Searches for the target string in the string

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
const kmpSearcher = buildSearch(She)
console.log(searcher.search(article))
/*
* [
*   0: {start: 0, end: 2}
* ]
*/
```
