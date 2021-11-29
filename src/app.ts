/* eslint-disable no-redeclare */

// tasks 02.*
// enum Category {
//     JavaScript, CSS, HTML, TypeScript, Angular
// }

// 06.05

import { UniversityLibrarian } from './classes/university-librarian';
import { Category } from './enums';
import { Author, Book, Librarian, Logger, Magazine } from './interfaces';
import { BookRequiredFields, CreateCustomerFunctionTypeFn, PersonBook, UpdatedBook } from './types';
import {
    bookTitleTransform,
    calcTotalPages,
    checkoutBooks,
    createCustomer,
    createCustomerID,
    getAllBooks,
    getBookAuthorByIndex,
    getBookByID,
    getBooksByCategory, getBooksByCategoryPromise,
    getBookTitlesByCategory,
    getProperty,
    getTitles,
    logBookTitles, logCategorySearch,
    logFirstAvailable, logSearchResults,
    printRefBook
} from './functions';
import { Library, RefBook, Shelf, UL } from './classes/index';

const flag = true;

if (flag) {
    const modules = await import('./classes/index');
    const reader = new modules.Reader();
    reader.name = 'John';
    reader.take(getAllBooks()[0]);
    console.log(reader);
}

// 06.06

// const library: Library = new Library();
const library: Library = {
    Id: 1, name: 'Alexandria', address: 'Baker Street'
};
// interface Book {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
//     pages?: number;
//     markDamaged?: DamageLogger;
// }
//
// type Books = readonly Book[];

// function getAllBooks(): Books {
//     const books = <const>[
//         {
//             id: 1,
//             title: 'Refactoring JavaScript',
//             author: 'Evan Burchard',
//             available: true,
//             category: Category.JavaScript
//         },
//         {
//             id: 2,
//             title: 'JavaScript Testing',
//             author: 'Liang Yuxian Eugene',
//             available: false,
//             category: Category.JavaScript
//         },
//         {id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS},
//         {
//             id: 4,
//             title: 'Mastering JavaScript Object-Oriented Programming',
//             author: 'Andrea Chiarelli',
//             available: true,
//             category: Category.JavaScript
//         }
//     ];
//     return books;
// }
//
// function logFirstAvailable(books: Books = getAllBooks()): void {
//     console.log(`Number of books: ${books.length}`);
//     const available = books.find(book => book.available);
//     console.log(`First Book Available ${available?.title}`);
// }

logFirstAvailable(getAllBooks());

// const getBookTitlesByCategory = function (category: Category = Category.JavaScript): Array<string> {
//     return getAllBooks().filter(book => book.category === category).map(book => book.title);
// };
//
// const logBookTitles = function (strings: string[]): void {
//     console.log(strings);
// };

logBookTitles(getBookTitlesByCategory(Category.JavaScript));

// function getBookAuthorByIndex(index: number): [title: string, author: string] {
//     const books = getAllBooks();
//     if (index > books.length) {
//         throw Error('OutOfBoundError')!;
//     }
//     return [books[index].title, books[index].author];
// }

console.log(getBookAuthorByIndex(2));


// function calcTotalPages(): bigint {
//     return libraries.reduce((sum: bigint, lib) => {
//         return sum + BigInt(lib.avgPagesPerBook) * BigInt(lib.avgPagesPerBook);
//     }, 0n);
// }

console.log(calcTotalPages());

// 03.*
//
// function createCustomerID(name: string, id: number): string {
//     return `Customer ${name} with ID ${id}`;
// }

const myID = createCustomerID('Ann', 10);
console.log(myID);

const idGenerator: (name: string, id: number) => string = createCustomerID;

console.log(idGenerator('Ann', 10));

// function createCustomer(name: string, age?: number, city?: string): void {
//     console.log(`Name: ${name}` + `${age ? age : ''}` + `${city ? city : ''}`);
// }

createCustomer('Barry Allen');
createCustomer('Barry Allen', 28);
createCustomer('Barry Allen', 28, 'Central City');
logBookTitles(getBookTitlesByCategory(Category.JavaScript));

// function getBookByID(id: number): BookOrUndefined {
//     return getAllBooks().find(book => book.id === id);
// }

console.log(getBookByID(1));

// function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
//     const availableTitles = bookIDs.map(id => getBookByID(id)).filter(book => book.available).map(book => book.title);
//     console.log(`Available Titles: ${availableTitles}`);
//     console.log(`Customer Name: ${customer}`);
//     return availableTitles;
// }

const myBooks = checkoutBooks('Ann', 1, 2, 4);
console.log(myBooks);

// function getTitles(author: string): Books;
// function getTitles(available: boolean): Books;
// function getTitles(id: number, available: boolean): Books;
// function getTitles(...args: any[]): Books {
//     const books = getAllBooks();
//     if (args.length === 1) {
//         const [arg] = args;
//         if (typeof arg === 'string') {
//             return books.filter(book => book.author == arg);
//         } else if (typeof arg === 'boolean') {
//             return books.filter(book => book.available == arg);
//         }
//     } else if (args.length === 2) {
//         const [id, available] = args;
//         if (typeof id === 'number' && typeof available === 'boolean') {
//             return books.filter(book => book.available == available && book.id === id);
//         }
//     }
//     return books;
// }

const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);

// function assertStringValue(val: any): asserts val is string {
//     if (typeof val !== 'string') {
//         throw Error('value should have been a string');
//     }
// }
//
// function bookTitleTransform(title: any): string {
//     assertStringValue(title);
//     return [...title].reverse().join(' ');
// }

bookTitleTransform('New Title');
bookTitleTransform(1000n);

// 04.*

// function printBook(book: Book): void {
//     console.log(`Title ${book.title} by ${book.author}`);
// }

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients', author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: reason => console.log(`Damaged: ${reason}`)
};

myBook.markDamaged('missing back cover');

// interface DamageLogger {
//     (reason: string): void;
// }

// const logDamage: DamageLogger = reason => console.log(`Log the damage: ${reason}`);
const logDamage: Logger = reason => console.log(`Log the damage: ${reason}`);

logDamage('missing back cover');

// interface Person {
//     name: string;
//     email: string;
// }
//
// interface Author extends Person {
//     numBooksPublished: number;
// }
//
// interface Librarian extends Person {
//     department: string;
//     assistCustomer: (custName: string) => void;
// }

const favoriteAuthor: Author = {
    name: 'King',
    email: 'King@mail.com',
    numBooksPublished: 2
};

// const favoriteLibrarian: Librarian = {
//     name: 'King Libr',
//     email: 'KingLibr@mail.com',
//     department: 'Fiction',
//     assistCustomer: custName => console.log(custName)
// }

const offer: any = {
    book: {
        title: 'Essential TypeScript'
    }
};

console.log(offer?.magazine);
console.log(offer?.magazine?.getTitle());
console.log(offer.book?.getTitle());
console.log(offer.book?.authors[0]);

// type BookProperties = keyof Book;

// function getProperty(book: Book, property: BookProperties): any {
//     if (typeof book[property] === 'function') {
//         return book[property]['name'];
//     }
//     return book[property];
// }

console.log(getProperty(getAllBooks()[0], 'title'));
console.log(getProperty(getAllBooks()[0], 'markDamaged'));
// console.log(getProperty(getAllBooks()[0], 'isbn')); not compiling if use BookProperties


// 05.*


// abstract class ReferenceItem {
//     private _publisher: string;
//     readonly #id: number;
//
//     static readonly department = 'Fantasy';
//
//     // title: string;
//     // year: number;
//     // protected constructor(newTitle: string, newYear: number) {
//     //     console.log('Creating a new ReferenceItem...');
//     //     this.title = newTitle;
//     //     this.year = newYear;
//     // }
//
//     protected constructor(public title: string, protected year: number, id: number) {
//         console.log('Creating a new ReferenceItem...');
//         this.#id = id;
//     }
//
//     printItem(): void {
//         console.log(`${this.title} was published in ${this.year} with department: ${ReferenceItem.department}`);
//     }
//
//     get publisher(): string {
//         return this._publisher.toUpperCase();
//     }
//
//     set publisher(value: string) {
//         this._publisher = value;
//     }
//
//     getID(): number {
//         return this.#id;
//     }
//
//     abstract printCitation(): void;
// }

// const ref: ReferenceItem = new ReferenceItem('LoR', 2000, 1245);
// ref.printItem();
// ref.publisher = 'Manning';
// console.log(ref.getID())

// class Encyclopedia extends ReferenceItem {
//     constructor(public edition: number, title: string, year: number, id: number) {
//         super(title, year, id);
//     }
//
//     printItem() {
//         super.printItem();
//         console.log(`Edition: ${this.edition} (${this.year})`);
//     }
//
//     printCitation(): void {
//         console.log(`Title ${this.title} - ${this.year}`);
//     }
// }

// const refBook: Encyclopedia = new Encyclopedia(2, 'LoR', 2000, 1245);
const refBook: RefBook = new RefBook(2, 'LoR', 2000, 1245);
refBook.printCitation();
printRefBook(refBook);

// // way to do super.super.super
// const p1 = Object.getPrototypeOf(refBook);
// const p2 = Object.getPrototypeOf(p1);
//

// some cool things to do with classes
// let NewsPaper = class extends ReferenceItem {
//     printCitation(): void {
//
//     }
// }
//
// class Novel extends class {title: string} {
//     mainCharacter: string;
// }

////

// class UniversityLibrarian implements Librarian {
//     department: string;
//     email: string;
//     name: string;
//
//     assistCustomer(custName: string): void {
//         console.log(`${this.name} is assisting ${custName}`);
//     }
// }

const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
favoriteLibrarian.name = 'Gandalf';
favoriteLibrarian.assistCustomer('MS');

printRefBook(favoriteLibrarian);
//
// type PersonBook = Person & Book;
// type BookOrUndefined = Book | undefined;

const pBook: PersonBook = {
    author: 'Tolkien',
    available: false,
    category: Category.Angular,
    id: 0,
    title: 'Frodo',
    name: 'Frodo',
    email: 'frodo@mail.com'
};

// 07.01

const inventory: Book[] = [
    {id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software},
    {id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software},
    {id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software},
    {id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software}
];

// console.log(purge(inventory));
// console.log(purge([1, 2, 3, 5, 6]));

// 07.02
const bookShelf: Shelf<Book> = new Shelf<Book>();
bookShelf.items = inventory;

console.log(bookShelf.getFirst().title);

const magazines: Magazine[] = [
    {title: 'Programming Language Monthly', publisher: 'Code Mags'},
    {title: 'Literary Fiction Quarterly', publisher: 'College Press'},
    {title: 'Five Points', publisher: 'GSU'}
];

const magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();
magazineShelf.items = magazines;

console.log(magazineShelf.getFirst());
magazineShelf.printTitles();
console.log(magazineShelf.find('Five Points'));

getProperty(magazineShelf.getFirst(), 'title');
// getProperty(magazineShelf.getFirst(), 'id'); // not compiling since its not property of ShelfItem

// 07.04

const bookRequiredFields: BookRequiredFields = {
    id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software,
    pages: 200, markDamaged: null
};

const updatedBook: UpdatedBook = {};

let params: Parameters<CreateCustomerFunctionTypeFn> = ['Josh'];
createCustomer(...params);

// 08.01
const favoriteLibrarian1: UniversityLibrarian = new UL.UniversityLibrarian();
const props = Object.getPrototypeOf(favoriteLibrarian1);
props.assistCustomer2 = function () {
};

// 08.02
const favoriteLibrarian2: UniversityLibrarian = new UL.UniversityLibrarian();
favoriteLibrarian2.name = 'Anna';
favoriteLibrarian2['printLibrarian']();

// 08.03

const favoriteLibrarian3: UniversityLibrarian = new UL.UniversityLibrarian();
favoriteLibrarian3.assistFaculty = null;
favoriteLibrarian3.assistFaculty = null;

// 08.04
const encyclopedia: RefBook = new RefBook(2, 'LoR', 2000, 1245);

// 08.05
const favoriteLibrarian4: UniversityLibrarian = new UL.UniversityLibrarian();
favoriteLibrarian4.name = 'Anna';
favoriteLibrarian4.assistCustomer('Boris');

// 08.06
const favoriteLibrarian5: UniversityLibrarian = new UL.UniversityLibrarian();
favoriteLibrarian5.name = 'Anna';
favoriteLibrarian5.assistCustomer('Boris');

// 08.07
const encyclopedia7: RefBook = new RefBook(2, 'LoR', 2000, 1245);
encyclopedia7.copies = -10;
encyclopedia7.copies = 0;
encyclopedia7.copies = 4.5;
encyclopedia7.copies = 5;
console.log(encyclopedia7);

// 09.01
console.log('Begin');
getBooksByCategory(Category.JavaScript, logCategorySearch);
getBooksByCategory(Category.Software, logCategorySearch);
console.log('End');

// 09.02

getBooksByCategoryPromise(Category.JavaScript)
    .then(resolve => {
        console.log(resolve);
        return resolve.length;
    }).then(resolve => console.log(resolve))
    .catch(reject => console.log(reject));
getBooksByCategoryPromise(Category.Software).then(resolve => console.log(resolve)).catch(reject => console.log(reject));

// 09.03
console.log('Begin');
logSearchResults(Category.JavaScript).catch(err => console.log(err));
console.log('End');