import '../global/rxjs-operators.js';

import {Injectable} from '@angular/core';
import {MenuDetail} from './menu-detail';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuDetailsService {
    private menuDetailsUrl = '/backoffice/menu-details/data/';
    private menuDetailsDeleteUrl = '/backoffice/menu-details/delete';

    constructor(private http: Http) {

    }

    updateMenuDetails(menus: MenuDetail[], id, canvasWidth: number, canvasHeight: number): Observable<string> {
        //convert to percent location
        for (var i = 0; i < menus.length; i++) {
            menus[i].Left = (menus[i].Left / canvasWidth) * 100.0;
            menus[i].Top = (menus[i].Top / canvasHeight) * 100.0;
            menus[i].Width = (menus[i].Width / canvasWidth) * 100.0;
            menus[i].Height = (menus[i].Height / canvasHeight) * 100.0;
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(menus);
        return this.http.post(this.menuDetailsUrl + id, body, options)
            .map(this.updateMenuDetailsData)
            .catch(this.handleError);
    }

    getMenuDetails(id): Observable<MenuDetail[]> {
        return this.http.get(this.menuDetailsUrl + id)
            .map(this.extractMenuDetailsData)
            .catch(this.handleError);
    }

    deleteMenuDetails(id) : Observable<string> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(id);
        return this.http.post(this.menuDetailsDeleteUrl, body, options)
            .map(this.updateMenuDetailsData)
            .catch(this.handleError);
    }

    private extractMenuDetailsData(res: Response) {
        let body = res.json();
        let result = <MenuDetail[]>body || [];
        return result;
    }

    private updateMenuDetailsData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
