import { SearchTreeNode, SearchResult, Formatter } from './types';
export declare const buildSearchTree: (searchArray: string[]) => SearchTreeNode;
export declare const findFromTopNode: (contents: string[], tree: SearchTreeNode, position: number, searchResult: SearchResult[], formatter?: Formatter | undefined) => void;
export declare const createLongPrefix: (str: string) => string[];
export declare const createLongSuffix: (str: string) => string[];
export declare const intersectionLength: (arg1: string[], arg2: string[]) => number;
