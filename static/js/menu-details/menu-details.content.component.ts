/// <reference path="../jquery/jquery.d.ts" />

import {Component, enableProdMode, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuDetail} from "./menu-detail";
import {MenuDetailsService} from "./menu-details.service";
import {FoodService} from "../food/food.service";

//enableProdMode();

import $ = require("jquery");
import {Food} from "../food/food";

@Component({
    templateUrl: '/static/templates/backend/menu-details/index.html',
    providers: [MenuDetailsService, FoodService],
})

export class MenuDetailsContentComponent implements OnInit, OnDestroy {

    errorMessage: string;
    menuId: number;

    foods: Food[] = [];
    menuDetails: MenuDetail[] = [];

    constructor(private route: ActivatedRoute, private menuDetailsService: MenuDetailsService, private foodsService: FoodService) {

    }

    ngOnInit() {
        this.menuId = +this.route.snapshot.params['id'];
        this.getMenuDetails(this.menuId);
        this.getFoods();
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
}