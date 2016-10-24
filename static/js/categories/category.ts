export class Category {
    Id: number;
    Name: string = '';
    ShopId: number = 0;
    ShopName: string = '';
    Selected: boolean = false;

    constructor(values: Object = {}) {
        (<any>Object).assign(this, values);
    }
}
