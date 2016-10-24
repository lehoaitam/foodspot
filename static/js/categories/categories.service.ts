import '../global/rxjs-operators.js';

import {Injectable} from '@angular/core';
import {Category} from './category';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriesService {

    lastId: number = 0;
    categories: Category[] = [];

    private categoriesUrl = '/backoffice/categories/data';
    private categoriesDeleteUrl = '/backoffice/categories/delete';

    constructor(private http: Http) {

    }

    addCategory(category: Category): Observable<string> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(category);
        return this.http.put(this.categoriesUrl, body, options)
            .map(this.updateCategoriesData)
            .catch(this.handleError);
    }

    updateCategory(category: Category): Observable<string> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(category);
        return this.http.post(this.categoriesUrl, body, options)
            .map(this.updateCategoriesData)
            .catch(this.handleError);
    }

    deleteCategories(ids: any[]): Observable<string> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(ids);
        return this.http.post(this.categoriesDeleteUrl, body, options)
            .map(this.updateCategoriesData)
            .catch(this.handleError);
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get(this.categoriesUrl)
            .map(this.extractCategoriesData)
            .catch(this.handleError);
    }

    private updateCategoriesData(res: Response) {
        let body = res.json();
        return body;
    }

    private extractCategoriesData(res: Response) {
        let body = res.json();
        let result = <Category[]>body || { };
        return result;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
