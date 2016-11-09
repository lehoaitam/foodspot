export class Food {
	Id: 			number;
	Name: 			string = '';
	CategoryId: 	number = 0;
	CategoryName: 	string = '';
	Selected:		boolean = false;

	constructor(values: Object = {}) {
		(<any>Object).assign(this, values);
	}
}