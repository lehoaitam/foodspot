export class Category {
    Id: number;
    Name: string = '';
    ShopName: string = '';

    constructor(values: Object = {}) {
        (<any>Object).assign(this, values);
    }
}
