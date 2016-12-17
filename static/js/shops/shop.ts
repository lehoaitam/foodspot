export class Shop {
    Id:         number;
    Name:       string = '';
    Image: 		string = '';
    ImageURL: 	string = '';
    Lat:        number = 10.0309641; // Lat, Long của CTU
    Long:       number = 105.7667154;
	ActiveFlg:	boolean = true;
    Selected:   boolean = false;

    constructor(values: Object = {}) {
        (<any>Object).assign(this, values);
    }
}