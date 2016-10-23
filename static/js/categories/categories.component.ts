import {Component, enableProdMode, OnInit, ElementRef, ViewChild, Renderer} from '@angular/core';
import {Shop} from "../shops/shop";
import {Category} from "./category";
import {ShopsService} from "../shops/shops.service";
import {CategoriesService} from "./categories.service";

//enableProdMode();

@Component({
    selector: 'categories-app',
    templateUrl: '/static/templates/backend/categories/list.html',
    providers: [CategoriesService, ShopsService, Renderer]
})

export class CategoriesComponent implements OnInit {
    errorMessage: string;
    errorAddMessage: string = "";
    newCategory: Category = new Category();

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

    private addCategoryDone(data) {
        if (data == "OK") {
            this.getCategories()

            let event = new MouseEvent('click', {bubbles: true});
            this.renderer.invokeElementMethod(this.btBackToCategories.nativeElement, 'dispatchEvent', [event]);
        } else {
            this.errorAddMessage = "There is an error when add new category. Please check your data again."
        }
    }

    removeCategory(category) {
        this.categoriesService.deleteCategoryById(category.id);
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