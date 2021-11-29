import { Category } from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: DamageLogger;
}

type Books = readonly Book[];

interface DamageLogger {
    (reason: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

export interface Magazine {
    title: string;
    publisher: string;
}

export interface ShelfItem {
    title: string;
}

export interface LibMgrCallback<T> {
    (err: Error, titles: T[]): void;
}

export { Book, Books, DamageLogger as Logger, Person, Author, Librarian, Category };