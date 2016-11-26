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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var FoodService = (function () {
    function FoodService(http) {
        this.http = http;
        this.lasId = 0;
        this.foods = [];
        this.foodUrl = '/backoffice/foods/data';
        this.foodDeleteUrl = '/backoffice/foods/delete';
    }
    FoodService.prototype.addFood = function (food, imageInput) {
        var inputs = new FormData();
        inputs.append("Image", imageInput);
        inputs.append("Name", food.Name);
        inputs.append("Description", food.Description);
        inputs.append("Price", food.Price);
        inputs.append("ActiveFlg", food.ActiveFlg);
        inputs.append("CategoryId", food.CategoryId);
        return this.http.put(this.foodUrl, inputs)
            .map(this.updateFoodData)
            .catch(this.handleError);
    };
    FoodService.prototype.updateFood = function (food, imageInput) {
        var inputs = new FormData();
        inputs.append("Id", food.Id);
        inputs.append("Image", imageInput);
        inputs.append("Name", food.Name);
        inputs.append("Description", food.Description);
        inputs.append("Price", food.Price);
        inputs.append("ActiveFlg", food.ActiveFlg);
        inputs.append("CategoryId", food.CategoryId);
        return this.http.post(this.foodUrl, inputs)
            .map(this.updateFoodData)
            .catch(this.handleError);
    };
    FoodService.prototype.deleteFoods = function (ids) {
        var header = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: header });
        var body = JSON.stringify(ids);
        return this.http.post(this.foodDeleteUrl, body, options)
            .map(this.updateFoodData)
            .catch(this.handleError);
    };
    FoodService.prototype.getAllFoods = function () {
        return this.http.get(this.foodUrl)
            .map(this.extractFoodData)
            .catch(this.handleError);
    };
    FoodService.prototype.updateFoodData = function (res) {
        return res.json();
    };
    FoodService.prototype.extractFoodData = function (res) {
        var body = res.json();
        var result = body || {};
        return result;
    };
    FoodService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    FoodService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FoodService);
    return FoodService;
}());
exports.FoodService = FoodService;
