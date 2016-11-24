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
    menuDetails: MenuDetail[] = [];

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

    returnMenus() {
        window.location.href = <any>"/backoffice/menus";
    }
}