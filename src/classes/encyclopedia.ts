import { ReferenceItem } from './reference-item';
import { positiveInteger } from '../decorators';

export default class Encyclopedia extends ReferenceItem {
    private _copies: number;
    constructor(public edition: number, title: string, year: number, id: number) {
        super(title, year, id);
    }
    
    printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }
    
    printCitation(): void {
        console.log(`Title ${this.title} - ${this.year}`);
    }
    
    get copies(): number {
        return this._copies;
    }
    
    @positiveInteger
    set copies(value: number) {
        this._copies = value;
    }
}