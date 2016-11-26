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
var MenuDetailsService = (function () {
    function MenuDetailsService(http) {
        this.http = http;
        this.menuDetailsUrl = '/backoffice/menu-details/data/';
        this.menuDetailsDeleteUrl = '/backoffice/menu-details/delete';
    }
    MenuDetailsService.prototype.updateMenuDetails = function (menus, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(menus);
        return this.http.post(this.menuDetailsUrl + id, body, options)
            .map(this.updateMenuDetailsData)
            .catch(this.handleError);
    };
    MenuDetailsService.prototype.getMenuDetails = function (id) {
        return this.http.get(this.menuDetailsUrl + id)
            .map(this.extractMenuDetailsData)
            .catch(this.handleError);
    };
    MenuDetailsService.prototype.deleteMenuDetails = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(id);
        return this.http.post(this.menuDetailsDeleteUrl, body, options)
            .map(this.updateMenuDetailsData)
            .catch(this.handleError);
    };
    MenuDetailsService.prototype.extractMenuDetailsData = function (res) {
        var body = res.json();
        var result = body || {};
        return result;
    };
    MenuDetailsService.prototype.updateMenuDetailsData = function (res) {
        var body = res.json();
        return body;
    };
    MenuDetailsService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    MenuDetailsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MenuDetailsService);
    return MenuDetailsService;
}());
exports.MenuDetailsService = MenuDetailsService;
