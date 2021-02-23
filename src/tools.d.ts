import { SearchWordTree, SearchResult } from './types';
export declare const buildSearchTree: (searchArray: string[]) => SearchWordTree;
export declare const findFromTopNode: (contents: string[], tree: SearchWordTree, position: number, searchResult: SearchResult[]) => void;
export declare const createLongPrefix: (str: string) => string[];
export declare const createLongSuffix: (str: string) => string[];
export declare const intersectionLength: (arg1: string[], arg2: string[]) => number;
