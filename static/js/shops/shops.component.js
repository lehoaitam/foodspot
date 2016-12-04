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
var shop_1 = require('./shop');
var shops_service_1 = require('./shops.service');
//enableProdMode();
var ShopsComponent = (function () {
    function ShopsComponent(shopsService, renderer) {
        this.shopsService = shopsService;
        this.renderer = renderer;
        this.errorAddMessage = '';
        this.errorUpdateMessage = '';
        this.newShop = new shop_1.Shop();
        this.editShop = new shop_1.Shop();
        this.shops = [];
        this.displayMode = 0;
    }
    ShopsComponent.prototype.ngOnInit = function () {
        this.getShops();
    };
    ShopsComponent.prototype.getShops = function () {
        var _this = this;
        this.shopsService.getAllShops()
            .subscribe(function (shops) { return _this.shops = shops; }, function (error) { return _this.errorMessage = error; });
    };
    ShopsComponent.prototype.showAddShop = function () {
        this.newShop = new shop_1.Shop();
        this.marker = {
            lat: this.newShop.Lat,
            lng: this.newShop.Long
        };
        this.displayAddForm();
    };
    ShopsComponent.prototype.showUpdateShop = function (shop) {
        this.editShop = shop;
        this.marker = {
            lat: this.editShop.Lat,
            lng: this.editShop.Long
        };
        this.displayUpdateForm();
    };
    ShopsComponent.prototype.mapClicked = function ($event) {
        this.marker = {
            lat: $event.coords.lat,
            lng: $event.coords.lng
        };
    };
    ShopsComponent.prototype.addShop = function () {
        var _this = this;
        this.newShop.Lat = this.marker.lat;
        this.newShop.Long = this.marker.lng;
        var fileInput = this.imageAddInput.nativeElement;
        if (fileInput.files && fileInput.files[0]) {
            this.shopsService.addShop(this.newShop, fileInput.files[0])
                .subscribe(function (data) { return _this.addShopDone(data); }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.errorAddMessage = "Please upload an image";
        }
    };
    ShopsComponent.prototype.updateShop = function () {
        var _this = this;
        this.editShop.Lat = this.marker.lat;
        this.editShop.Long = this.marker.lng;
        var fileInput = this.imageUpdateInput.nativeElement;
        this.shopsService.updateShop(this.editShop, fileInput.files[0])
            .subscribe(function (data) { return _this.updateShopDone(data); }, function (error) { return _this.errorMessage = error; });
    };
    ShopsComponent.prototype.deleteShops = function () {
        var _this = this;
        var selectedRows = [];
        var shops_length = this.shops.length;
        for (var i = 0; i < shops_length; i++) {
            if (this.shops[i].Selected) {
                selectedRows.push(this.shops[i].Id);
            }
        }
        if (selectedRows.length > 0) {
            this.shopsService.deleteShops(selectedRows)
                .subscribe(function (data) { return _this.deleteShopDone(data); }, function (error) { return _this.errorMessage = error; });
        }
    };
    ShopsComponent.prototype.cancel = function () {
        this.displayListForm();
    };
    ShopsComponent.prototype.addShopDone = function (data) {
        if (data == "OK") {
            this.getShops();
            this.displayListForm();
        }
        else {
            this.errorAddMessage = "There is an error when add new shop. Please try again.";
        }
    };
    ShopsComponent.prototype.updateShopDone = function (data) {
        if (data == "OK") {
            this.getShops();
            this.displayListForm();
        }
        else {
            this.errorUpdateMessage = "There is an error when update shop. Please try again.";
        }
    };
    ShopsComponent.prototype.deleteShopDone = function (data) {
        if (data == "OK") {
            this.getShops();
        }
        else {
            this.errorMessage = "There is an error when delete shops. Please try again.";
        }
    };
    ShopsComponent.prototype.displayListForm = function () {
        this.displayMode = 0;
    };
    ShopsComponent.prototype.displayAddForm = function () {
        this.displayMode = 1;
    };
    ShopsComponent.prototype.displayUpdateForm = function () {
        this.displayMode = 2;
    };
    __decorate([
        core_1.ViewChild("imageAddInput"), 
        __metadata('design:type', Object)
    ], ShopsComponent.prototype, "imageAddInput", void 0);
    __decorate([
        core_1.ViewChild("imageUpdateInput"), 
        __metadata('design:type', Object)
    ], ShopsComponent.prototype, "imageUpdateInput", void 0);
    ShopsComponent = __decorate([
        core_1.Component({
            selector: 'shops-app',
            templateUrl: '/static/templates/backend/shops/list.html',
            providers: [shops_service_1.ShopsService, core_1.Renderer]
        }), 
        __metadata('design:paramtypes', [shops_service_1.ShopsService, core_1.Renderer])
    ], ShopsComponent);
    return ShopsComponent;
}());
exports.ShopsComponent = ShopsComponent;
