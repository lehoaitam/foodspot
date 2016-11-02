/// <reference path="../jquery/jquery.d.ts" />
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
var CategoriesComponent = (function () {
    function CategoriesComponent(categoriesService, shopsService, renderer) {
        this.categoriesService = categoriesService;
        this.shopsService = shopsService;
        this.renderer = renderer;
        this.errorAddMessage = "";
        this.errorUpdateMessage = "";
        this.newCategory = new category_1.Category();
        this.editCategory = new category_1.Category();
        this.displayMode = 0;
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
    CategoriesComponent.prototype.showAddCategory = function () {
        this.newCategory = new category_1.Category();
        if (this.shops.length > 0) {
            this.newCategory.ShopId = this.shops[0].Id;
        }
        this.displayMode = 1;
    };
    CategoriesComponent.prototype.updateCategory = function () {
        var _this = this;
        this.categoriesService.updateCategory(this.editCategory)
            .subscribe(function (data) { return _this.updateCategoryDone(data); }, function (error) { return _this.errorMessage = error; });
        this.editCategory = new category_1.Category();
    };
    CategoriesComponent.prototype.showUpdateCategory = function (category) {
        this.editCategory = category;
        this.displayMode = 2;
    };
    CategoriesComponent.prototype.returnCategories = function () {
        this.displayMode = 0;
    };
    CategoriesComponent.prototype.deleteCategories = function () {
        var _this = this;
        var selectedRows = [];
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].Selected) {
                selectedRows.push(this.categories[i].Id);
            }
        }
        if (selectedRows.length > 0) {
            this.categoriesService.deleteCategories(selectedRows)
                .subscribe(function (data) { return _this.deleteCategoriesDone(data); }, function (error) { return _this.errorMessage = error; });
        }
        else {
        }
    };
    CategoriesComponent.prototype.addCategoryDone = function (data) {
        if (data == "OK") {
            this.getCategories();
            this.returnCategories();
        }
        else {
            this.errorAddMessage = "There is an error when add new category. Please check your data again.";
        }
    };
    CategoriesComponent.prototype.updateCategoryDone = function (data) {
        if (data == "OK") {
            this.getCategories();
            this.returnCategories();
        }
        else {
            this.errorAddMessage = "There is an error when update category. Please check your data again.";
        }
    };
    CategoriesComponent.prototype.deleteCategoriesDone = function (data) {
        if (data == "OK") {
            this.getCategories();
        }
        else {
            this.errorAddMessage = "There is an error when delete categories. Please check your data again.";
        }
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
