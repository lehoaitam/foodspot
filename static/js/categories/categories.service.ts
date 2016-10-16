import '../global/rxjs-operators.js';

import {Injectable} from '@angular/core';
import {Category} from './category';
import {Http, Response} from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriesService {

    lastId: number = 0;
    categories: Category[] = [];

    private url = '/backoffice/categories-data';

    constructor(private http: Http) {

    }

    // Simulate POST /categories
    addCategory(category: Category): CategoriesService {
        if (!category.Id) {
            category.Id = ++this.lastId;
        }
        this.categories.push(category);
        return this;
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
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // Simulate GET /categories/:id
    getCategoryById(id: number): Category {
        return this.categories
            .filter(category => category.Id === id)
            .pop();
    }

    private extractData(res: Response) {
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
