export class Menu {
    Id: number;
    Name: string = '';
    Image: string = '';
    ImageURL: string = '';
    Selected: boolean = false;

    constructor(values: Object = {}) {
        (<any>Object).assign(this, values);
    }
}
