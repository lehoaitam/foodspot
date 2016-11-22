export class MenuDetail {
    Id: number;
    Name: string = '';
    Left: number = 0;
    Top: number = 0;
    Width: number = 0;
    Height: number = 0;
    ImageURL: string = '';
    Selected: boolean = false;

    constructor(values: Object = {}) {
        (<any>Object).assign(this, values);
    }
}
