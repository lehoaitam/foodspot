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

    errorMessage: string;
    menuId: number;

    foods: Food[] = [];
    selectedFoodRowIndex: number = -1;

    menuDetails: MenuDetail[] = [];
    selectedMenuDetailIndex: number = -1;
    private dragX: number = 0;
    private dragY: number = 0;

    @ViewChild('menuBGContainer') menuBGContainer:ElementRef;
    @ViewChild('menuBG') menuBG:ElementRef;

    constructor(private route: ActivatedRoute, private menuDetailsService: MenuDetailsService, private foodsService: FoodService, private renderer:Renderer) {

    }

    ngOnInit() {
        this.menuId = +this.route.snapshot.params['id'];
        this.getMenuDetails(this.menuId);
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
        });
    }

    ngOnDestroy() {

    }

    getMenuDetails(id) {
        this.menuDetailsService.getMenuDetails(id)
            .subscribe(
                menuDetails => this.menuDetails = menuDetails,
                error =>  this.errorMessage = <any>error);
    }

    getFoods() {
        this.foodsService.getAllFoods()
            .subscribe(
                foods => this.foods = foods,
                error =>  this.errorMessage = <any>error);
    }

    updateMenuDetails() {

    }

    selectFoodRow(index) {
        if (this.selectedFoodRowIndex == index) {
            this.foods[this.selectedFoodRowIndex].Selected = false;
            this.selectedFoodRowIndex = -1;
        } else {
            this.selectedFoodRowIndex = index;
            this.foods[this.selectedFoodRowIndex].Selected = true;
        }
    }

    selectMenuDetail(index) {

    }

    selectMenuBG() {
        if (this.selectedMenuDetailIndex >= 0) {
            this.menuDetails[this.selectedMenuDetailIndex].Selected = false;
            this.selectedMenuDetailIndex = -1;
        }
    }

    mouseDownMenuDetail(index, event) {
        if (this.selectedMenuDetailIndex >= 0) {
            this.menuDetails[this.selectedMenuDetailIndex].Selected = false;
        }
        this.selectedMenuDetailIndex = index;
        this.menuDetails[this.selectedMenuDetailIndex].Selected = true;

        this.dragX = event.offsetX;
        this.dragY = event.offsetY;
        console.log(this.dragX + ',' + this.dragY);
    }

    mouseMoveMenuDetail(index, event) {
        if (this.selectedMenuDetailIndex == index) {
            let x = event.offsetX;
            let y = event.offsetY;

            this.menuDetails[index].Left += x - this.dragX;
            this.menuDetails[index].Top += y - this.dragY;
        }
    }

    mouseUpMenuDetail(index) {
        if (this.selectedMenuDetailIndex == index && this.selectedMenuDetailIndex >= 0) {
            this.menuDetails[this.selectedMenuDetailIndex].Selected = false;
            this.selectedMenuDetailIndex = -1;
        }
    }

    returnMenus() {
        window.location.href = <any>"/backoffice/menus";
    }
}