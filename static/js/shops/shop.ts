export class Shop {
    Id:         number;
    Name:       string = '';
    Image: 		string = '';
    ImageURL: 	string = '';
    Lat:        number = 0;
    Long:       number = 0;
	ActiveFlg:	boolean = true;
    Selected:   boolean = false;

    constructor(values: Object = {}) {
        (<any>Object).assign(this, values);
    }
}