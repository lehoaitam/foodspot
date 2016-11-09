import '../global/rxjs-operators.js';

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {Food} from './food';

@Injectable()
export class FoodService {
	lasId: number = 0;
	foods: Food[] = [];

	private foodUrl = '/backoffice/foods/data';
	private foodDeleteUrl = '/backoffice/foods/delete';

	constructor(private http: Http) { }

	addFood(food: Food): Observable<string> {
		let header = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: header });
		let body = JSON.stringify(food);
		return this.http.put(this.foodUrl, body, options)
			.map(this.updateFoodData)
			.catch(this.handleError);
	}

	updateFood(food: Food): Observable<string> {
		let header = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: header });
		let body = JSON.stringify(food);
		return this.http.post(this.foodUrl, body, options)
			.map(this.updateFoodData)
			.catch(this.handleError);
	}

	deleteFoods(ids: any): Observable<string> {
		let header = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: header });
		let body = JSON.stringify(ids);
		return this.http.post(this.foodDeleteUrl, body, options)
			.map(this.updateFoodData)
			.catch(this.handleError);
	}

	getAllFoods(): Observable<Food[]> {
		return this.http.get(this.foodUrl)
			.map(this.extractFoodData)
			.catch(this.handleError);
	}

	private updateFoodData(res: Response) {
		return res.json();
	}

	private extractFoodData(res: Response) {
		let body = res.json();
		let result = <Food[]>body || { };
		return result;
	}

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);

	}
}