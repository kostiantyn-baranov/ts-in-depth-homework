/* eslint-disable no-redeclare */

import { Book, Books, Category, LibMgrCallback } from './interfaces';
import { BookOrUndefined, BookProperties } from './types';

export function getAllBooks(): Books {
    const books = <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.JavaScript
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
            category: Category.JavaScript
        },
        {id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS},
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.JavaScript
        }
    ];
    return books;
}

export function logFirstAvailable(books: Books = getAllBooks()): void {
    console.log(`Number of books: ${books.length}`);
    const available = books.find(book => book.available);
    console.log(`First Book Available ${available?.title}`);
}

export const getBookTitlesByCategory = function (category: Category = Category.JavaScript): Array<string> {
    return getAllBooks().filter(book => book.category === category).map(book => book.title);
};

export const logBookTitles = function (strings: string[]): void {
    console.log(strings);
};

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    if (index > books.length) {
        throw Error('OutOfBoundError')!;
    }
    return [books[index].title, books[index].author];
}

const libraries = [
    {lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250},
    {lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300},
    {lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280}
];

export function calcTotalPages(): bigint {
    return libraries.reduce((sum: bigint, lib) => {
        return sum + BigInt(lib.avgPagesPerBook) * BigInt(lib.avgPagesPerBook);
    }, 0n);
}


export function createCustomerID(name: string, id: number): string {
    return `Customer ${name} with ID ${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Name: ${name}` + `${age ? age : ''}` + `${city ? city : ''}`);
}

export function getBookByID(id: number): BookOrUndefined {
    return getAllBooks().find(book => book.id === id);
}

export function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    const availableTitles = bookIDs.map(id => getBookByID(id)).filter(book => book.available).map(book => book.title);
    console.log(`Available Titles: ${availableTitles}`);
    console.log(`Customer Name: ${customer}`);
    return availableTitles;
}

export function getTitles(author: string): Books;
export function getTitles(available: boolean): Books;
export function getTitles(id: number, available: boolean): Books;
export function getTitles(...args: any[]): Books {
    const books = getAllBooks();
    if (args.length === 1) {
        const [arg] = args;
        if (typeof arg === 'string') {
            return books.filter(book => book.author == arg);
        } else if (typeof arg === 'boolean') {
            return books.filter(book => book.available == arg);
        }
    } else if (args.length === 2) {
        const [id, available] = args;
        if (typeof id === 'number' && typeof available === 'boolean') {
            return books.filter(book => book.available == available && book.id === id);
        }
    }
    return books;
}

export function assertStringValue(val: any): asserts val is string {
    if (typeof val !== 'string') {
        throw Error('value should have been a string');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join(' ');
}


export function printBook(book: Book): void {
    console.log(`Title ${book.title} by ${book.author}`);
}

// export function getProperty(book: Book, property: BookProperties): any {
//     if (typeof book[property] === 'function') {
//         return book[property]['name'];
//     }
//     return book[property];
// }

export function getProperty<TObject, TKey extends keyof TObject>(object: TObject, property: TKey): TObject[TKey] | string {
    if (typeof object[property] === 'function') {
        return object[property]['name'];
    }
    return object[property];
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not instance of RefBook');
    }
}

import RefBook from './classes/encyclopedia';

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}


export function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
}

export function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T
) {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    });
}

export function getBooksByCategory(category: Category, callback: LibMgrCallback<string>) {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No Books Found');
            }
        } catch (err) {
            callback(err, []);
        }
    }, 2000);
}

export function logCategorySearch(err: Error, titles: string[]): void {
    if (err) {
        console.log(err);
    } else {
        console.log(titles);
    }
}


export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No Books Found');
            }
        }, 2000);
    });
}

export async function logSearchResults(category: Category): Promise<void> {
    const result = await getBooksByCategoryPromise(category);
    console.log(result);
}