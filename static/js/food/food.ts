export class Food {
	Id: 			number;
	Name: 			string = '';
	Description:	string = '';
	Price:			number = 0;
    Image: 			string = '';
    ImageURL: 		string = '';
	ActiveFlg:		boolean = true;
	CategoryId: 	number = 0;
	CategoryName: 	string = '';
	Selected:		boolean = false;

	constructor(values: Object = {}) {
		(<any>Object).assign(this, values);
	}
}