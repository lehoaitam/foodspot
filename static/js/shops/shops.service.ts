import '../global/rxjs-operators.js';

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import {Shop} from "./shop";

@Injectable()
export class ShopsService {

    private shopsUrl = '/backoffice/shops/data';
    private shopsDeleteUrl = '/backoffice/shops/delete';
    
    constructor(private http: Http) {

    }

    getAllShops(): Observable<Shop[]> {
        return this.http.get(this.shopsUrl)
            .map(this.extractShopsData)
            .catch(this.handleError);
    }

    addShop(shop: Shop, imageInput: any): Observable<string> {
        let inputs = new FormData();
        inputs.append("Image", imageInput);
        inputs.append("Name", shop.Name);
        inputs.append("ActiveFlg", shop.ActiveFlg);
        inputs.append("Lat", shop.Lat);
        inputs.append("Long", shop.Long);
        return this.http.put(this.shopsUrl, inputs)
            .map(this.updateShopData)
            .catch(this.handleError);
    }

    updateShop(shop: Shop, imageInput: any): Observable<string> {
        let inputs = new FormData();
        inputs.append("Id", shop.Id);
        inputs.append("Image", imageInput);
        inputs.append("Name", shop.Name);
        inputs.append("ActiveFlg", shop.ActiveFlg);
        inputs.append("Lat", shop.Lat);
        inputs.append("Long", shop.Long);
        return this.http.post(this.shopsUrl, inputs)
            .map(this.updateShopData)
            .catch(this.handleError);
    }

    deleteShops(ids: any): Observable<string> {
		let header = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: header });
		let body = JSON.stringify(ids);
		return this.http.post(this.shopsDeleteUrl, body, options)
			.map(this.updateShopData)
			.catch(this.handleError);
	}

    private extractShopsData(res: Response) {
        let body = res.json();
        let result = <Shop[]>body || { };
        return result;
    }

    private updateShopData(res: Response) {
        return res.json();
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}