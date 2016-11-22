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
    function MenuDetailsContentComponent(route, menuDetailsService, foodsService) {
        this.route = route;
        this.menuDetailsService = menuDetailsService;
        this.foodsService = foodsService;
        this.foods = [];
        this.menuDetails = [];
    }
    MenuDetailsContentComponent.prototype.ngOnInit = function () {
        this.menuId = +this.route.snapshot.params['id'];
        this.getMenuDetails(this.menuId);
        this.getFoods();
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
    MenuDetailsContentComponent = __decorate([
        core_1.Component({
            templateUrl: '/static/templates/backend/menu-details/index.html',
            providers: [menu_details_service_1.MenuDetailsService, food_service_1.FoodService],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, menu_details_service_1.MenuDetailsService, food_service_1.FoodService])
    ], MenuDetailsContentComponent);
    return MenuDetailsContentComponent;
}());
exports.MenuDetailsContentComponent = MenuDetailsContentComponent;
