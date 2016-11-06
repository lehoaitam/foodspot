/// <reference path="../jquery/jquery.d.ts" />

import {Component, enableProdMode, OnInit, ViewChild} from '@angular/core';
import {Menu} from "./menu";
import {MenusService} from "./menus.service";

//enableProdMode();

import $ = require("jquery");

@Component({
    selector: 'menus-app',
    templateUrl: '/static/templates/backend/menus/list.html',
    providers: [MenusService]
})

export class MenusComponent implements OnInit {
    errorMessage: string;
    errorAddMessage: string = "";
    errorUpdateMessage: string = "";

    newMenu: Menu = new Menu();
    editMenu: Menu = new Menu();

    displayMode: number = 0;

    menus: Menu[] = [];

    @ViewChild("imageAddInput") imageAddInput;
    @ViewChild("imageUpdateInput") imageUpdateInput;

    ngOnInit() {
        this.getMenus();
    }

    constructor(private menusService: MenusService) {

    }

    addMenus() {
        let fi = this.imageAddInput.nativeElement;
        if (fi.files && fi.files[0]) {
            this.menusService.addMenus(this.newMenu, fi.files[0])
                .subscribe(
                    data => this.addMenusDone(data),
                    error => this.errorMessage = <any>error);
            this.newMenu = new Menu();
        } else {
            this.errorAddMessage = "Please upload an image."
        }
    }

    showAddMenus() {
        this.newMenu = new Menu();
        this.displayMode = 1;
    }

    updateMenus() {
        let fi = this.imageUpdateInput.nativeElement;
        this.menusService.updateMenus(this.editMenu, fi.files[0])
            .subscribe(
                data => this.updateMenusDone(data),
                error =>  this.errorMessage = <any>error);
        this.editMenu = new Menu();
    }

    showUpdateMenus(menu) {
        this.editMenu = menu;
        this.displayMode = 2;
    }

    returnMenus() {
        this.displayMode = 0;
    }

    deleteMenus() {
        var selectedRows = [];
        for (var i = 0; i < this.menus.length; i++) {
            if (this.menus[i].Selected) {
                selectedRows.push(this.menus[i].Id);
            }
        }
        if (selectedRows.length > 0) {
            this.menusService.deleteMenus(selectedRows)
                .subscribe(
                    data => this.deleteMenusDone(data),
                    error =>  this.errorMessage = <any>error);
        } else {
            //nothing
        }
    }

    private addMenusDone(data) {
        if (data == "OK") {
            this.getMenus()

            this.returnMenus();
        } else {
            this.errorAddMessage = "There is an error when add new menu. Please check your data again."
        }
    }

    private updateMenusDone(data) {
        if (data == "OK") {
            this.getMenus()

            this.returnMenus();
        } else {
            this.errorAddMessage = "There is an error when update menu. Please check your data again."
        }
    }

    private deleteMenusDone(data) {
        if (data == "OK") {
            this.getMenus()
        } else {
            this.errorAddMessage = "There is an error when delete menus. Please check your data again."
        }
    }

    getMenus() {
        this.menusService.getAllMenus()
            .subscribe(
                menus => this.menus = menus,
                error =>  this.errorMessage = <any>error);
    }
}