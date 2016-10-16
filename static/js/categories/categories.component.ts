import {Component, enableProdMode, OnInit} from '@angular/core';
import {Category} from "./category";
import {CategoriesService} from "./categories.service";

//enableProdMode();

@Component({
    selector: 'categories-app',
    templateUrl: '/static/templates/backend/categories/list.html',
    providers: [CategoriesService]
})

export class CategoriesComponent implements OnInit {
    errorMessage: string;
    newCategory: Category = new Category();

    categories: Category[] = [];

    ngOnInit() { this.getCategories(); }

    constructor(private categoriesService: CategoriesService) {
        this.categoriesService.addCategory(new Category());
    }

    addCategory() {
        this.categoriesService.addCategory(this.newCategory);
        this.newCategory = new Category();
    }

    removeCategory(category) {
        this.categoriesService.deleteCategoryById(category.id);
    }

    getCategories() {
        this.categoriesService.getAllCategories()
            .subscribe(
                categories => this.categories = categories,
                error =>  this.errorMessage = <any>error);
    }
}