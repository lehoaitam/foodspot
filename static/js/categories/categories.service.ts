import '../global/rxjs-operators.js';

import {Injectable} from '@angular/core';
import {Category} from './category';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriesService {

    lastId: number = 0;
    categories: Category[] = [];

    private categoriesUrl = '/backoffice/categories-data';

    constructor(private http: Http) {

    }

    // Simulate POST /categories
    addCategory(category: Category): Observable<string> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(category);
        return this.http.put(this.categoriesUrl, body, options)
            .map(this.addCategoriesData)
            .catch(this.handleError);
    }

    // Simulate DELETE /categories/:id
    deleteCategoryById(id: number): CategoriesService {
        this.categories = this.categories
            .filter(category => category.Id !== id);
        return this;
    }

    // Simulate PUT /categories/:id
    updateCategoryById(id: number, values: Object = {}): Category {
        let category = this.getCategoryById(id);
        if (!category) {
            return null;
        }
        (<any>Object).assign(category, values);
        return category;
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get(this.categoriesUrl)
            .map(this.extractCategoriesData)
            .catch(this.handleError);
    }

    // Simulate GET /categories/:id
    getCategoryById(id: number): Category {
        return this.categories
            .filter(category => category.Id === id)
            .pop();
    }

    private addCategoriesData(res: Response) {
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
