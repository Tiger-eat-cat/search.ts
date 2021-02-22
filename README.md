# search.ts
Searches for the target string in the string

# How To Use
```
npm install search.ts

import { buildSearch } from 'search.ts'

const article = 'She is a so beautiful girl.'
const searcher = buildSearch(['She', 'he', 'girl', 'beautiful'])
console.log(searcher.search(article))
```
