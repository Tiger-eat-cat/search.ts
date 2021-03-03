export interface SearchTreeNode {
    isEnd?: boolean,
    name?: string,
    children: Map<string, SearchTreeNode>,
    str: string,
    failPointer?: SearchTreeNode,
    parent?: SearchTreeNode
}

export interface SearchResult {
    word?: string,
    start?: number,
    end?: number,
}

export type Formatter = (result: unknown[], word: string, start: number, end: number) => void

export interface Search {
    search(content: string, formatter?: Formatter): unknown[] | SearchResult[]
}
