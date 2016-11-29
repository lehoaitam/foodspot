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
var ShopsService = (function () {
    function ShopsService(http) {
        this.http = http;
        this.shopsUrl = '/backoffice/shops/data';
        this.shopsDeleteUrl = '/backoffice/shops/delete';
    }
    ShopsService.prototype.getAllShops = function () {
        return this.http.get(this.shopsUrl)
            .map(this.extractShopsData)
            .catch(this.handleError);
    };
    ShopsService.prototype.addShop = function (shop, imageInput) {
        var inputs = new FormData();
        inputs.append("Image", imageInput);
        inputs.append("Name", shop.Name);
        inputs.append("ActiveFlg", shop.ActiveFlg);
        inputs.append("Lat", shop.Lat);
        inputs.append("Long", shop.Long);
        return this.http.put(this.shopsUrl, inputs)
            .map(this.updateShopData)
            .catch(this.handleError);
    };
    ShopsService.prototype.updateShop = function (shop, imageInput) {
        var inputs = new FormData();
        inputs.append("Id", shop.Id);
        inputs.append("Image", imageInput);
        inputs.append("Name", shop.Name);
        inputs.append("ActiveFlg", shop.ActiveFlg);
        inputs.append("Lat", shop.Lat);
        inputs.append("Long", shop.Long);
        return this.http.post(this.shopsUrl, inputs)
            .map(this.updateShopData)
            .catch(this.handleError);
    };
    ShopsService.prototype.deleteShops = function (ids) {
        var header = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: header });
        var body = JSON.stringify(ids);
        return this.http.post(this.shopsDeleteUrl, body, options)
            .map(this.updateShopData)
            .catch(this.handleError);
    };
    ShopsService.prototype.extractShopsData = function (res) {
        var body = res.json();
        var result = body || {};
        return result;
    };
    ShopsService.prototype.updateShopData = function (res) {
        return res.json();
    };
    ShopsService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    ShopsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ShopsService);
    return ShopsService;
}());
exports.ShopsService = ShopsService;
