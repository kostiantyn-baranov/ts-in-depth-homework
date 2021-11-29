// /* eslint-disable no-redeclare */
//
// import * as Interfaces from './interfaces';
//
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
// class UniversityLibrarian implements Interfaces.Librarian {
//     department: string;
//     email: string;
//     name: string;
//
//     assistCustomer(custName: string): void {
//         console.log(`${this.name} is assisting ${custName}`);
//     }
// }
// export {ReferenceItem}