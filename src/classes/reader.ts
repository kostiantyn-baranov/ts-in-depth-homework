import { Book } from '../interfaces';

export const Reader = class {
    constructor(public name: string = '', public books: Book[] = []) {
    }
    
    take(book: Book): void {
        this.books.push(book);
    }
};