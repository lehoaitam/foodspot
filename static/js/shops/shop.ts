export class Shop {
    Id: number;
    Name: string = '';

    constructor(values: Object = {}) {
        (<any>Object).assign(this, values);
    }
}