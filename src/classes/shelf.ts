import { ShelfItem } from '../interfaces';

export class Shelf<T extends ShelfItem> {
    items: T[] = [];
    
    add(element: T): void {
        this.items.push(element);
    }
    
    getFirst(): T {
        return this.items[0];
    }
    
    find(title: string): T {
        return this.items.find(item => item.title === title);
    }
    
    printTitles(): void {
        this.items.forEach(item => console.log(item.title));
    }
}