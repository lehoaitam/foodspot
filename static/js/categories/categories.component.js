"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var category_1 = require("./category");
var categories_service_1 = require("./categories.service");
//enableProdMode();
var CategoriesComponent = (function () {
    function CategoriesComponent(categoriesService) {
        this.categoriesService = categoriesService;
        this.newCategory = new category_1.Category();
        this.categories = [];
        this.categoriesService.addCategory(new category_1.Category());
    }
    CategoriesComponent.prototype.ngOnInit = function () { this.getCategories(); };
    CategoriesComponent.prototype.addCategory = function () {
        this.categoriesService.addCategory(this.newCategory);
        this.newCategory = new category_1.Category();
    };
    CategoriesComponent.prototype.removeCategory = function (category) {
        this.categoriesService.deleteCategoryById(category.id);
    };
    CategoriesComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoriesService.getAllCategories()
            .subscribe(function (categories) { return _this.categories = categories; }, function (error) { return _this.errorMessage = error; });
    };
    CategoriesComponent = __decorate([
        core_1.Component({
            selector: 'categories-app',
            templateUrl: '/static/templates/backend/categories/list.html',
            providers: [categories_service_1.CategoriesService]
        }), 
        __metadata('design:paramtypes', [categories_service_1.CategoriesService])
    ], CategoriesComponent);
    return CategoriesComponent;
}());
exports.CategoriesComponent = CategoriesComponent;
