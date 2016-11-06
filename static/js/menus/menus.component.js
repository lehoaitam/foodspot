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
var menu_1 = require("./menu");
var menus_service_1 = require("./menus.service");
var MenusComponent = (function () {
    function MenusComponent(menusService) {
        this.menusService = menusService;
        this.errorAddMessage = "";
        this.errorUpdateMessage = "";
        this.newMenu = new menu_1.Menu();
        this.editMenu = new menu_1.Menu();
        this.displayMode = 0;
        this.menus = [];
    }
    MenusComponent.prototype.ngOnInit = function () {
        this.getMenus();
    };
    MenusComponent.prototype.addMenus = function () {
        var _this = this;
        var fi = this.imageAddInput.nativeElement;
        if (fi.files && fi.files[0]) {
            this.menusService.addMenus(this.newMenu, fi.files[0])
                .subscribe(function (data) { return _this.addMenusDone(data); }, function (error) { return _this.errorMessage = error; });
            this.newMenu = new menu_1.Menu();
        }
        else {
            this.errorAddMessage = "Please upload an image.";
        }
    };
    MenusComponent.prototype.showAddMenus = function () {
        this.newMenu = new menu_1.Menu();
        this.displayMode = 1;
    };
    MenusComponent.prototype.updateMenus = function () {
        var _this = this;
        var fi = this.imageUpdateInput.nativeElement;
        this.menusService.updateMenus(this.editMenu, fi.files[0])
            .subscribe(function (data) { return _this.updateMenusDone(data); }, function (error) { return _this.errorMessage = error; });
        this.editMenu = new menu_1.Menu();
    };
    MenusComponent.prototype.showUpdateMenus = function (menu) {
        this.editMenu = menu;
        this.displayMode = 2;
    };
    MenusComponent.prototype.returnMenus = function () {
        this.displayMode = 0;
    };
    MenusComponent.prototype.deleteMenus = function () {
        var _this = this;
        var selectedRows = [];
        for (var i = 0; i < this.menus.length; i++) {
            if (this.menus[i].Selected) {
                selectedRows.push(this.menus[i].Id);
            }
        }
        if (selectedRows.length > 0) {
            this.menusService.deleteMenus(selectedRows)
                .subscribe(function (data) { return _this.deleteMenusDone(data); }, function (error) { return _this.errorMessage = error; });
        }
        else {
        }
    };
    MenusComponent.prototype.addMenusDone = function (data) {
        if (data == "OK") {
            this.getMenus();
            this.returnMenus();
        }
        else {
            this.errorAddMessage = "There is an error when add new menu. Please check your data again.";
        }
    };
    MenusComponent.prototype.updateMenusDone = function (data) {
        if (data == "OK") {
            this.getMenus();
            this.returnMenus();
        }
        else {
            this.errorAddMessage = "There is an error when update menu. Please check your data again.";
        }
    };
    MenusComponent.prototype.deleteMenusDone = function (data) {
        if (data == "OK") {
            this.getMenus();
        }
        else {
            this.errorAddMessage = "There is an error when delete menus. Please check your data again.";
        }
    };
    MenusComponent.prototype.getMenus = function () {
        var _this = this;
        this.menusService.getAllMenus()
            .subscribe(function (menus) { return _this.menus = menus; }, function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        core_1.ViewChild("imageAddInput"), 
        __metadata('design:type', Object)
    ], MenusComponent.prototype, "imageAddInput", void 0);
    __decorate([
        core_1.ViewChild("imageUpdateInput"), 
        __metadata('design:type', Object)
    ], MenusComponent.prototype, "imageUpdateInput", void 0);
    MenusComponent = __decorate([
        core_1.Component({
            selector: 'menus-app',
            templateUrl: '/static/templates/backend/menus/list.html',
            providers: [menus_service_1.MenusService]
        }), 
        __metadata('design:paramtypes', [menus_service_1.MenusService])
    ], MenusComponent);
    return MenusComponent;
}());
exports.MenusComponent = MenusComponent;
