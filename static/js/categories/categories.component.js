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
var shops_service_1 = require("../shops/shops.service");
var categories_service_1 = require("./categories.service");
//enableProdMode();
var CategoriesComponent = (function () {
    function CategoriesComponent(categoriesService, shopsService, renderer) {
        this.categoriesService = categoriesService;
        this.shopsService = shopsService;
        this.renderer = renderer;
        this.errorAddMessage = "";
        this.newCategory = new category_1.Category();
        this.shops = [];
        this.categories = [];
    }
    CategoriesComponent.prototype.ngOnInit = function () {
        this.getCategories();
        this.getShops();
    };
    CategoriesComponent.prototype.addCategory = function () {
        var _this = this;
        this.categoriesService.addCategory(this.newCategory)
            .subscribe(function (data) { return _this.addCategoryDone(data); }, function (error) { return _this.errorMessage = error; });
        this.newCategory = new category_1.Category();
    };
    CategoriesComponent.prototype.addCategoryDone = function (data) {
        if (data == "OK") {
            this.getCategories();
            var event_1 = new MouseEvent('click', { bubbles: true });
            this.renderer.invokeElementMethod(this.btBackToCategories.nativeElement, 'dispatchEvent', [event_1]);
        }
        else {
            this.errorAddMessage = "There is an error when add new category. Please check your data again.";
        }
    };
    CategoriesComponent.prototype.removeCategory = function (category) {
        this.categoriesService.deleteCategoryById(category.id);
    };
    CategoriesComponent.prototype.getShops = function () {
        var _this = this;
        this.shopsService.getAllShops()
            .subscribe(function (shops) { return _this.shops = shops; }, function (error) { return _this.errorMessage = error; });
    };
    CategoriesComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoriesService.getAllCategories()
            .subscribe(function (categories) { return _this.categories = categories; }, function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        core_1.ViewChild('btBackToCategories'), 
        __metadata('design:type', core_1.ElementRef)
    ], CategoriesComponent.prototype, "btBackToCategories", void 0);
    CategoriesComponent = __decorate([
        core_1.Component({
            selector: 'categories-app',
            templateUrl: '/static/templates/backend/categories/list.html',
            providers: [categories_service_1.CategoriesService, shops_service_1.ShopsService, core_1.Renderer]
        }), 
        __metadata('design:paramtypes', [categories_service_1.CategoriesService, shops_service_1.ShopsService, core_1.Renderer])
    ], CategoriesComponent);
    return CategoriesComponent;
}());
exports.CategoriesComponent = CategoriesComponent;
