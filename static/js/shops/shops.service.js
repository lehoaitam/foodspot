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
        this.shopsUrl = '/backoffice/shops-data';
    }
    ShopsService.prototype.getAllShops = function () {
        return this.http.get(this.shopsUrl)
            .map(this.extractShopsData)
            .catch(this.handleError);
    };
    ShopsService.prototype.extractShopsData = function (res) {
        var body = res.json();
        var result = body || {};
        return result;
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
