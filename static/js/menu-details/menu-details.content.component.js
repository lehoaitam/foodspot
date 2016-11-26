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
var menu_detail_1 = require("./menu-detail");
var menu_details_service_1 = require("./menu-details.service");
var food_service_1 = require("../food/food.service");
var MenuDetailsContentComponent = (function () {
    function MenuDetailsContentComponent(route, menuDetailsService, foodsService, renderer) {
        this.route = route;
        this.menuDetailsService = menuDetailsService;
        this.foodsService = foodsService;
        this.renderer = renderer;
        this.foods = [];
        this.selectedFoodRowIndex = -1;
        this.menuDetails = [];
        this.selectedMenuDetailIndex = -1;
        this.selectedMenuDetailResizeIndex = -1;
        this.dragX = 0;
        this.dragY = 0;
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
        var _this = this;
        this.menuDetailsService.updateMenuDetails(this.menuDetails, this.menuId)
            .subscribe(function (data) { return _this.updateMenuDetailsDone(data); }, function (error) { return _this.errorMessage = error; });
    };
    MenuDetailsContentComponent.prototype.updateMenuDetailsDone = function (data) {
        if (data == "OK") {
            this.successMessage = "Menu detail updated successful.";
        }
        else {
            this.errorMessage = "There is an error when update menu detail. Please check your data again.";
        }
    };
    MenuDetailsContentComponent.prototype.selectFoodRow = function (index) {
        if (this.selectedFoodRowIndex == index) {
            this.foods[this.selectedFoodRowIndex].Selected = false;
            this.selectedFoodRowIndex = -1;
            this.mouseUpMenuBG();
            this.removeMenuDetail(this.menuDetails.length - 1);
        }
        else {
            this.selectedFoodRowIndex = index;
            this.foods[this.selectedFoodRowIndex].Selected = true;
            var defaultSize = 80;
            var newItem = new menu_detail_1.MenuDetail();
            newItem.MenuId = this.menuId;
            newItem.FoodId = this.foods[this.selectedFoodRowIndex].Id;
            newItem.Name = this.foods[this.selectedFoodRowIndex].Name;
            newItem.Width = defaultSize;
            newItem.Height = defaultSize;
            newItem.Left = this.menuBGContainer.nativeElement.offsetWidth / 2 - defaultSize / 2;
            newItem.Top = this.menuBGContainer.nativeElement.offsetHeight / 2 - defaultSize / 2;
            this.menuDetails.push(newItem);
            this.selectedMenuDetailIndex = this.menuDetails.length - 1;
            this.menuDetails[this.selectedMenuDetailIndex].Selected = true;
            this.dragX = defaultSize / 2;
            this.dragY = defaultSize / 2;
            for (var i = 0; i < this.menuDetails.length - 1; i++) {
                this.menuDetails[i].Hidden = true;
            }
        }
    };
    MenuDetailsContentComponent.prototype.mouseMoveMenuBG = function (event) {
        if (this.selectedMenuDetailResizeIndex >= 0) {
            var x = event.offsetX;
            var y = event.offsetY;
            var minSize = 40;
            if (event.target.id == 'mover') {
                if (this.menuDetails[this.selectedMenuDetailResizeIndex].Width + x - this.dragX > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Width += x - this.dragX;
                }
                if (this.menuDetails[this.selectedMenuDetailResizeIndex].Height + y - this.dragY > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Height += y - this.dragY;
                }
            }
            else if (event.target.id == 'menuBG') {
                if (x - this.menuDetails[this.selectedMenuDetailResizeIndex].Left + this.dragX > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Width = x - this.menuDetails[this.selectedMenuDetailResizeIndex].Left - this.dragX + 5;
                }
                if (y - this.menuDetails[this.selectedMenuDetailResizeIndex].Top + this.dragY > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Height = y - this.menuDetails[this.selectedMenuDetailResizeIndex].Top - this.dragY + 5;
                }
            }
            else {
                if (x + this.dragX > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Width = x - this.dragX;
                }
                if (y + this.dragY > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Height = y - this.dragY;
                }
            }
        }
        if (this.selectedMenuDetailIndex >= 0) {
            var x = event.offsetX;
            var y = event.offsetY;
            if (event.target.id == 'menuBG') {
                this.menuDetails[this.selectedMenuDetailIndex].Left = x - this.dragX;
                this.menuDetails[this.selectedMenuDetailIndex].Top = y - this.dragY;
            }
            else {
                this.menuDetails[this.selectedMenuDetailIndex].Left += x - this.dragX;
                this.menuDetails[this.selectedMenuDetailIndex].Top += y - this.dragY;
            }
        }
    };
    MenuDetailsContentComponent.prototype.mouseUpMenuBG = function () {
        if (this.selectedMenuDetailIndex >= 0) {
            this.menuDetails[this.selectedMenuDetailIndex].Selected = false;
        }
        this.selectedMenuDetailResizeIndex = -1;
        this.selectedMenuDetailIndex = -1;
        for (var i = 0; i < this.menuDetails.length; i++) {
            this.menuDetails[i].Hidden = false;
        }
        if (this.selectedFoodRowIndex >= 0) {
            this.foods[this.selectedFoodRowIndex].Selected = false;
            this.selectedFoodRowIndex = -1;
        }
    };
    MenuDetailsContentComponent.prototype.mouseDownMenuDetail = function (index, event) {
        if (this.selectedMenuDetailIndex >= 0) {
            this.menuDetails[this.selectedMenuDetailIndex].Selected = false;
        }
        if (this.selectedMenuDetailIndex == index || this.selectedMenuDetailIndex < 0) {
            this.selectedMenuDetailIndex = index;
            this.menuDetails[this.selectedMenuDetailIndex].Selected = true;
            this.dragX = event.offsetX;
            this.dragY = event.offsetY;
        }
        for (var i = 0; i < this.menuDetails.length; i++) {
            if (i != index) {
                this.menuDetails[i].Hidden = true;
            }
        }
    };
    MenuDetailsContentComponent.prototype.mouseDownMenuDetailResize = function (index, event) {
        if (this.selectedMenuDetailResizeIndex < 0) {
            this.selectedMenuDetailResizeIndex = index;
            this.dragX = event.offsetX;
            this.dragY = event.offsetY;
        }
        for (var i = 0; i < this.menuDetails.length; i++) {
            if (i != index) {
                this.menuDetails[i].Hidden = true;
            }
        }
    };
    MenuDetailsContentComponent.prototype.removeMenuDetail = function (index) {
        this.menuDetails.splice(index, 1);
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
