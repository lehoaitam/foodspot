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
var MenusService = (function () {
    function MenusService(http) {
        this.http = http;
        this.lastId = 0;
        this.menus = [];
        this.menusUrl = '/backoffice/menus/data';
        this.menusDeleteUrl = '/backoffice/menus/delete';
    }
    MenusService.prototype.addMenus = function (menu, imageInput) {
        var inputs = new FormData();
        inputs.append("Image", imageInput);
        inputs.append("Name", menu.Name);
        return this.http.put(this.menusUrl, inputs)
            .map(this.updateMenusData)
            .catch(this.handleError);
    };
    MenusService.prototype.updateMenus = function (menu, imageInput) {
        var inputs = new FormData();
        inputs.append("Id", menu.Id);
        inputs.append("Image", imageInput);
        inputs.append("Name", menu.Name);
        return this.http.post(this.menusUrl, inputs)
            .map(this.updateMenusData)
            .catch(this.handleError);
    };
    MenusService.prototype.deleteMenus = function (ids) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(ids);
        return this.http.post(this.menusDeleteUrl, body, options)
            .map(this.updateMenusData)
            .catch(this.handleError);
    };
    MenusService.prototype.getAllMenus = function () {
        return this.http.get(this.menusUrl)
            .map(this.extractMenusData)
            .catch(this.handleError);
    };
    MenusService.prototype.updateMenusData = function (res) {
        var body = res.json();
        return body;
    };
    MenusService.prototype.extractMenusData = function (res) {
        var body = res.json();
        var result = body || {};
        return result;
    };
    MenusService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    MenusService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MenusService);
    return MenusService;
}());
exports.MenusService = MenusService;
