import { SearchWordTree, SearchResult } from './types';
export declare const buildSearchTree: (searchArray: string[]) => SearchWordTree;
export declare const findFromTopNode: (contents: string[], tree: SearchWordTree, position: number, searchResult: SearchResult[]) => void;
