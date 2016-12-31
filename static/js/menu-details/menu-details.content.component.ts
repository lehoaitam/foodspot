/// <reference path="../jquery/jquery.d.ts" />

import {Component, enableProdMode, OnInit, ElementRef, OnDestroy, AfterViewInit, ViewChild, Renderer} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuDetail} from "./menu-detail";
import {MenuDetailsService} from "./menu-details.service";
import {FoodService} from "../food/food.service";

//enableProdMode();

import $ = require("jquery");
import {Food} from "../food/food";

@Component({
    templateUrl: '/static/templates/backend/menu-details/index.html',
    providers: [MenuDetailsService, FoodService, Renderer],
})

export class MenuDetailsContentComponent implements OnInit, OnDestroy, AfterViewInit {
    successMessage: string = "";
    errorMessage: string = "";
    menuId: number;

    foods: Food[] = [];
    selectedFoodRowIndex: number = -1;

    menuDetails: MenuDetail[] = [];
    selectedMenuDetailIndex: number = -1;
    selectedMenuDetailResizeIndex: number = -1;
    private dragX: number = 0;
    private dragY: number = 0;

    @ViewChild('menuBGContainer') menuBGContainer:ElementRef;
    @ViewChild('menuBG') menuBG:ElementRef;

    constructor(private route: ActivatedRoute, private menuDetailsService: MenuDetailsService, private foodsService: FoodService, private renderer:Renderer) {

    }

    ngOnInit() {
        this.menuId = +this.route.snapshot.params['id'];
        this.getFoods();
    }

    ngAfterViewInit() {
        this.renderer.listen(this.menuBG.nativeElement, 'load', (event) => {
            var width: number = event.target.width;
            var height: number = event.target.height;

            if (width > 768) {
                height = (height * 1.0 / width) * 768;
                width = 768;
            }
            this.renderer.setElementStyle(this.menuBGContainer.nativeElement, 'width', width + "px");
            this.renderer.setElementStyle(this.menuBGContainer.nativeElement, 'height', height + "px");
            this.renderer.setElementStyle(this.menuBGContainer.nativeElement, 'overflow', "hidden");

            this.getMenuDetails(this.menuId);
        });
    }

    ngOnDestroy() {

    }

    getMenuDetails(id) {
        this.menuDetailsService.getMenuDetails(id)
            .subscribe(
                menuDetails => this.convertMenuDetailsLocation(menuDetails),
                error =>  this.errorMessage = <any>error);
    }

    getFoods() {
        this.foodsService.getAllFoods()
            .subscribe(
                foods => this.foods = foods,
                error =>  this.errorMessage = <any>error);
    }

    updateMenuDetails() {
        this.menuDetailsService.updateMenuDetails(this.menuDetails, this.menuId,
            this.menuBGContainer.nativeElement.offsetWidth, this.menuBGContainer.nativeElement.offsetHeight)
            .subscribe(
                data => this.updateMenuDetailsDone(data),
                error =>  this.errorMessage = <any>error);
    }

    private updateMenuDetailsDone(data) {
        this.convertMenuDetailsLocation(this.menuDetails);

        if (data == "OK") {
            this.successMessage = "Menu detail updated successful.";
        } else {
            this.errorMessage = "There is an error when update menu detail. Please check your data again."
        }
    }

    private convertMenuDetailsLocation(data : MenuDetail[]) {
        console.log("convertMenuDetailsLocation: " + data.length);
        for (var i = 0; i < data.length; i++) {
            console.log("offsetWidth: " + this.menuBGContainer.nativeElement.offsetWidth);

            data[i].Left = (data[i].Left * this.menuBGContainer.nativeElement.offsetWidth) / 100.0;
            data[i].Top = (data[i].Top * this.menuBGContainer.nativeElement.offsetHeight) / 100.0;
            data[i].Width = (data[i].Width * this.menuBGContainer.nativeElement.offsetWidth) / 100.0;
            data[i].Height = (data[i].Height * this.menuBGContainer.nativeElement.offsetHeight) / 100.0;

        }
        this.menuDetails = data;
    }

    selectFoodRow(index) {
        if (this.selectedFoodRowIndex == index) {
            this.foods[this.selectedFoodRowIndex].Selected = false;
            this.selectedFoodRowIndex = -1;

            this.mouseUpMenuBG();
            this.removeMenuDetail(this.menuDetails.length - 1);
        } else {
            this.selectedFoodRowIndex = index;
            this.foods[this.selectedFoodRowIndex].Selected = true;

            let defaultSize = 80;
            let newItem = new MenuDetail();
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
    }

    mouseMoveMenuBG(event) {
        if (this.selectedMenuDetailResizeIndex >= 0) {
            let x = event.offsetX;
            let y = event.offsetY;

            let minSize = 40;

            if (event.target.id == 'mover') {
                if (this.menuDetails[this.selectedMenuDetailResizeIndex].Width + x - this.dragX > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Width += x - this.dragX;
                }
                if (this.menuDetails[this.selectedMenuDetailResizeIndex].Height + y - this.dragY > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Height += y - this.dragY;
                }
            } else if (event.target.id == 'menuBG') {
                if (x - this.menuDetails[this.selectedMenuDetailResizeIndex].Left + this.dragX > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Width = x - this.menuDetails[this.selectedMenuDetailResizeIndex].Left - this.dragX + 5;
                }
                if (y - this.menuDetails[this.selectedMenuDetailResizeIndex].Top + this.dragY > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Height = y - this.menuDetails[this.selectedMenuDetailResizeIndex].Top - this.dragY + 5;
                }
            } else {
                if (x + this.dragX > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Width = x - this.dragX;
                }
                if (y + this.dragY > minSize) {
                    this.menuDetails[this.selectedMenuDetailResizeIndex].Height = y - this.dragY;
                }
            }

        }
        if (this.selectedMenuDetailIndex >= 0) {
            let x = event.offsetX;
            let y = event.offsetY;
            if (event.target.id == 'menuBG') {
                this.menuDetails[this.selectedMenuDetailIndex].Left = x - this.dragX;
                this.menuDetails[this.selectedMenuDetailIndex].Top = y - this.dragY;
            } else {
                this.menuDetails[this.selectedMenuDetailIndex].Left += x - this.dragX;
                this.menuDetails[this.selectedMenuDetailIndex].Top += y - this.dragY;
            }
        }
    }

    mouseUpMenuBG() {
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
    }

    mouseDownMenuDetail(index, event) {
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
    }

    mouseDownMenuDetailResize(index, event) {
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
    }

    removeMenuDetail(index) {
        this.menuDetails.splice(index, 1);
    }

    returnMenus() {
        window.location.href = <any>"/backoffice/menus";
    }
}