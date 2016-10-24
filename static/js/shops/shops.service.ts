import '../global/rxjs-operators.js';

import {Injectable} from '@angular/core';
import {Shop} from "./shop";
import {Http, Response} from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShopsService {

    private shopsUrl = '/backoffice/shops/data';

    constructor(private http: Http) {

    }

    getAllShops(): Observable<Shop[]> {
        return this.http.get(this.shopsUrl)
            .map(this.extractShopsData)
            .catch(this.handleError);
    }

    private extractShopsData(res: Response) {
        let body = res.json();
        let result = <Shop[]>body || { };
        return result;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}