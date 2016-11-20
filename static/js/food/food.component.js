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
var food_1 = require('./food');
var categories_service_1 = require('../categories/categories.service');
var food_service_1 = require('./food.service');
var FoodComponent = (function () {
    function FoodComponent(categoriesService, foodService, renderer) {
        this.categoriesService = categoriesService;
        this.foodService = foodService;
        this.renderer = renderer;
        this.errorAddMessage = '';
        this.errorUpdateMessage = '';
        this.newFood = new food_1.Food();
        this.editFood = new food_1.Food();
        this.foods = [];
        this.categories = [];
        this.displayMode = 0;
    }
    FoodComponent.prototype.ngOnInit = function () {
        this.getCategories();
        this.getFoods();
    };
    FoodComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoriesService.getAllCategories()
            .subscribe(function (categories) { return _this.categories = categories; }, function (error) { return _this.errorMessage = error; });
    };
    FoodComponent.prototype.getFoods = function () {
        var _this = this;
        this.foodService.getAllFoods()
            .subscribe(function (foods) { return _this.foods = foods; }, function (error) { return _this.errorMessage = error; });
    };
    FoodComponent.prototype.showAddFood = function () {
        this.newFood = new food_1.Food();
        if (this.categories.length > 0) {
            this.newFood.CategoryId = this.categories[0].Id;
        }
        this.displayAddForm();
    };
    FoodComponent.prototype.showUpdateFood = function (food) {
        this.editFood = food;
        this.displayUpdateForm();
    };
    FoodComponent.prototype.displayListForm = function () {
        this.displayMode = 0;
    };
    FoodComponent.prototype.displayAddForm = function () {
        this.displayMode = 1;
    };
    FoodComponent.prototype.displayUpdateForm = function () {
        this.displayMode = 2;
    };
    FoodComponent.prototype.addFood = function () {
        var _this = this;
        var fileInput = this.imageAddInput.nativeElement;
        if (fileInput.files && fileInput.files[0]) {
            this.foodService.addFood(this.newFood, fileInput.files[0])
                .subscribe(function (data) { return _this.addFoodDone(data); }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.errorAddMessage = "Please upload an image";
        }
    };
    FoodComponent.prototype.updateFood = function () {
        var _this = this;
        var fileInput = this.imageUpdateInput.nativeElement;
        this.foodService.updateFood(this.editFood, fileInput.files[0])
            .subscribe(function (data) { return _this.updateFoodDone(data); }, function (error) { return _this.errorMessage = error; });
    };
    FoodComponent.prototype.deleteFoods = function () {
        var _this = this;
        var selectedRows = [];
        for (var i = 0; i < this.foods.length; i++) {
            if (this.foods[i].Selected) {
                selectedRows.push(this.foods[i].Id);
            }
        }
        if (selectedRows.length > 0) {
            this.foodService.deleteFoods(selectedRows)
                .subscribe(function (data) { return _this.deleteFoodDone(data); }, function (error) { return _this.errorMessage = error; });
        }
    };
    FoodComponent.prototype.addFoodDone = function (data) {
        console.log(data);
        if (data == "OK") {
            this.getFoods();
            this.displayListForm();
        }
        else {
            this.errorAddMessage = "There is an error when add new food. Please check your data again.";
        }
    };
    FoodComponent.prototype.updateFoodDone = function (data) {
        if (data == "OK") {
            this.getFoods();
            this.displayListForm();
        }
        else {
            this.errorUpdateMessage = "There is an error when update food. Please check your data again.";
        }
    };
    FoodComponent.prototype.deleteFoodDone = function (data) {
        if (data == "OK") {
            this.getFoods();
        }
        else {
            this.errorMessage = "There is an error when delete foods. Please try again.";
        }
    };
    __decorate([
        core_1.ViewChild("imageAddInput"), 
        __metadata('design:type', Object)
    ], FoodComponent.prototype, "imageAddInput", void 0);
    __decorate([
        core_1.ViewChild("imageUpdateInput"), 
        __metadata('design:type', Object)
    ], FoodComponent.prototype, "imageUpdateInput", void 0);
    FoodComponent = __decorate([
        core_1.Component({
            selector: 'food-app',
            templateUrl: '/static/templates/backend/food/list.html',
            providers: [categories_service_1.CategoriesService, food_service_1.FoodService, core_1.Renderer]
        }), 
        __metadata('design:paramtypes', [categories_service_1.CategoriesService, food_service_1.FoodService, core_1.Renderer])
    ], FoodComponent);
    return FoodComponent;
}());
exports.FoodComponent = FoodComponent;
