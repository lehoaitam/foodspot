import {Component, enableProdMode, OnInit, ElementRef, ViewChild, Renderer} from '@angular/core';
import {Shop} from "../shops/shop";
import {Category} from "./category";
import {ShopsService} from "../shops/shops.service";
import {CategoriesService} from "./categories.service";

/// <reference path="../../node_modules/jquery.d.ts" />

//enableProdMode();

@Component({
    selector: 'categories-app',
    templateUrl: '/static/templates/backend/categories/list.html',
    providers: [CategoriesService, ShopsService, Renderer]
})

export class CategoriesComponent implements OnInit {
    errorMessage: string;
    errorAddMessage: string = "";
    errorUpdateMessage: string = "";

    newCategory: Category = new Category();
    editCategory: Category = new Category();

    displayMode: number = 0;

    shops: Shop[] = [];
    categories: Category[] = [];

    @ViewChild('btBackToCategories') btBackToCategories:ElementRef;

    ngOnInit() {
        this.getCategories();
        this.getShops();
    }

    constructor(private categoriesService: CategoriesService, private shopsService: ShopsService, private renderer:Renderer) {
    }

    addCategory() {
        this.categoriesService.addCategory(this.newCategory)
            .subscribe(
                data => this.addCategoryDone(data),
                error =>  this.errorMessage = <any>error);
        this.newCategory = new Category();
    }

    showAddCategory() {
        this.newCategory = new Category();
        if (this.shops.length > 0) {
            this.newCategory.ShopId = this.shops[0].Id;
        }
        this.displayMode = 1;
    }

    updateCategory() {
        this.categoriesService.updateCategory(this.editCategory)
            .subscribe(
                data => this.updateCategoryDone(data),
                error =>  this.errorMessage = <any>error);
        this.editCategory = new Category();
    }

    showUpdateCategory(category) {
        this.editCategory = category;
        this.displayMode = 2;
    }

    returnCategories() {
        this.displayMode = 0;
    }

    deleteCategories() {
        var selectedRows = [];
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].Selected) {
                selectedRows.push(this.categories[i].Id);
            }
        }
        if (selectedRows.length > 0) {
            this.categoriesService.deleteCategories(selectedRows)
                .subscribe(
                    data => this.deleteCategoriesDone(data),
                    error =>  this.errorMessage = <any>error);
        } else {
            //nothing
        }
    }

    private addCategoryDone(data) {
        if (data == "OK") {
            this.getCategories()

            this.returnCategories();
        } else {
            this.errorAddMessage = "There is an error when add new category. Please check your data again."
        }
    }

    private updateCategoryDone(data) {
        if (data == "OK") {
            this.getCategories()

            this.returnCategories();
        } else {
            this.errorAddMessage = "There is an error when update category. Please check your data again."
        }
    }

    private deleteCategoriesDone(data) {
        if (data == "OK") {
            this.getCategories()
        } else {
            this.errorAddMessage = "There is an error when delete categories. Please check your data again."
        }
    }

    getShops() {
        this.shopsService.getAllShops()
            .subscribe(
                shops => this.shops = shops,
                error =>  this.errorMessage = <any>error);
    }

    getCategories() {
        this.categoriesService.getAllCategories()
            .subscribe(
                categories => this.categories = categories,
                error =>  this.errorMessage = <any>error);
    }
}