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
require('../global/rxjs-operators.js');
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var Observable_1 = require('rxjs/Observable');
var CategoriesService = (function () {
    function CategoriesService(http) {
        this.http = http;
        this.lastId = 0;
        this.categories = [];
        this.url = '/backoffice/categories-data';
    }
    // Simulate POST /categories
    CategoriesService.prototype.addCategory = function (category) {
        if (!category.Id) {
            category.Id = ++this.lastId;
        }
        this.categories.push(category);
        return this;
    };
    // Simulate DELETE /categories/:id
    CategoriesService.prototype.deleteCategoryById = function (id) {
        this.categories = this.categories
            .filter(function (category) { return category.Id !== id; });
        return this;
    };
    // Simulate PUT /categories/:id
    CategoriesService.prototype.updateCategoryById = function (id, values) {
        if (values === void 0) { values = {}; }
        var category = this.getCategoryById(id);
        if (!category) {
            return null;
        }
        Object.assign(category, values);
        return category;
    };
    CategoriesService.prototype.getAllCategories = function () {
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // Simulate GET /categories/:id
    CategoriesService.prototype.getCategoryById = function (id) {
        return this.categories
            .filter(function (category) { return category.Id === id; })
            .pop();
    };
    CategoriesService.prototype.extractData = function (res) {
        var body = res.json();
        var result = body || {};
        return result;
    };
    CategoriesService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    CategoriesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CategoriesService);
    return CategoriesService;
}());
exports.CategoriesService = CategoriesService;
