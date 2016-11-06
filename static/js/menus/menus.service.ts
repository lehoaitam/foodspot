import '../global/rxjs-operators.js';

import {Injectable} from '@angular/core';
import {Menu} from './menu';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenusService {

    lastId: number = 0;
    menus: Menu[] = [];

    private menusUrl = '/backoffice/menus/data';
    private menusDeleteUrl = '/backoffice/menus/delete';

    constructor(private http: Http) {

    }

    addMenus(menu: Menu, imageInput: any): Observable<string> {
        let inputs = new FormData();
        inputs.append("Image", imageInput);
        inputs.append("Name", menu.Name);
        return this.http.put(this.menusUrl, inputs)
            .map(this.updateMenusData)
            .catch(this.handleError);
    }

    updateMenus(menu: Menu, imageInput: any): Observable<string> {
        let inputs = new FormData();
        inputs.append("Id", menu.Id);
        inputs.append("Image", imageInput);
        inputs.append("Name", menu.Name);
        return this.http.post(this.menusUrl, inputs)
            .map(this.updateMenusData)
            .catch(this.handleError);
    }

    deleteMenus(ids: any[]): Observable<string> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(ids);
        return this.http.post(this.menusDeleteUrl, body, options)
            .map(this.updateMenusData)
            .catch(this.handleError);
    }

    getAllMenus(): Observable<Menu[]> {
        return this.http.get(this.menusUrl)
            .map(this.extractMenusData)
            .catch(this.handleError);
    }

    private updateMenusData(res: Response) {
        let body = res.json();
        return body;
    }

    private extractMenusData(res: Response) {
        let body = res.json();
        let result = <Menu[]>body || { };
        return result;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
