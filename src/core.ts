import { buildSearchTree, findFromTopNode } from './tools'
import { SearchResult, Search } from './types'

export const buildSearch = (searchList: string[]): Search => {
    const searchTree = buildSearchTree(searchList)
    return {
        search: (content: string) => {
            const searchResult: SearchResult[] = []
            const contentList = content.split('')
            contentList.forEach((char, index) => {
                findFromTopNode(contentList, searchTree, index, searchResult)
            })
            return searchResult
        }
    }
}
