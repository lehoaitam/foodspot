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
var router_1 = require("@angular/router");
var menu_details_service_1 = require("./menu-details.service");
var food_service_1 = require("../food/food.service");
var MenuDetailsContentComponent = (function () {
    function MenuDetailsContentComponent(route, menuDetailsService, foodsService, renderer) {
        this.route = route;
        this.menuDetailsService = menuDetailsService;
        this.foodsService = foodsService;
        this.renderer = renderer;
        this.foods = [];
        this.menuDetails = [];
    }
    MenuDetailsContentComponent.prototype.ngOnInit = function () {
        this.menuId = +this.route.snapshot.params['id'];
        this.getMenuDetails(this.menuId);
        this.getFoods();
    };
    MenuDetailsContentComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.renderer.listen(this.menuBG.nativeElement, 'load', function (event) {
            var width = event.target.width;
            var height = event.target.height;
            if (width > 768) {
                height = (height * 1.0 / width) * 768;
                width = 768;
            }
            _this.renderer.setElementStyle(_this.menuBGContainer.nativeElement, 'width', width + "px");
            _this.renderer.setElementStyle(_this.menuBGContainer.nativeElement, 'height', height + "px");
            _this.renderer.setElementStyle(_this.menuBGContainer.nativeElement, 'overflow', "hidden");
        });
    };
    MenuDetailsContentComponent.prototype.ngOnDestroy = function () {
    };
    MenuDetailsContentComponent.prototype.getMenuDetails = function (id) {
        var _this = this;
        this.menuDetailsService.getMenuDetails(id)
            .subscribe(function (menuDetails) { return _this.menuDetails = menuDetails; }, function (error) { return _this.errorMessage = error; });
    };
    MenuDetailsContentComponent.prototype.getFoods = function () {
        var _this = this;
        this.foodsService.getAllFoods()
            .subscribe(function (foods) { return _this.foods = foods; }, function (error) { return _this.errorMessage = error; });
    };
    MenuDetailsContentComponent.prototype.updateMenuDetails = function () {
    };
    MenuDetailsContentComponent.prototype.returnMenus = function () {
        window.location.href = "/backoffice/menus";
    };
    __decorate([
        core_1.ViewChild('menuBGContainer'), 
        __metadata('design:type', core_1.ElementRef)
    ], MenuDetailsContentComponent.prototype, "menuBGContainer", void 0);
    __decorate([
        core_1.ViewChild('menuBG'), 
        __metadata('design:type', core_1.ElementRef)
    ], MenuDetailsContentComponent.prototype, "menuBG", void 0);
    MenuDetailsContentComponent = __decorate([
        core_1.Component({
            templateUrl: '/static/templates/backend/menu-details/index.html',
            providers: [menu_details_service_1.MenuDetailsService, food_service_1.FoodService, core_1.Renderer],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, menu_details_service_1.MenuDetailsService, food_service_1.FoodService, core_1.Renderer])
    ], MenuDetailsContentComponent);
    return MenuDetailsContentComponent;
}());
exports.MenuDetailsContentComponent = MenuDetailsContentComponent;
