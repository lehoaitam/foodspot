import {Component, enableProdMode, OnInit, Renderer} from '@angular/core';

import {Category} from '../categories/category';
import {Food} from './food';
import {CategoriesService} from '../categories/categories.service';
import {FoodService} from './food.service';

//enableProdMode();

import $ = require("jquery");

@Component({
	selector: 'food-app',
	templateUrl: '/static/templates/backend/food/list.html',
	providers: [ CategoriesService, FoodService, Renderer ]
})

export class FoodComponent implements OnInit {
	errorMessage: string;
    errorAddMessage: string = '';
    errorUpdateMessage: string = '';

	newFood: Food = new Food();
	editFood: Food = new Food();

	foods: Food[] = [];
	categories: Category[] = [];

	displayMode: number = 0;

	constructor(private categoriesService: CategoriesService,
			private foodService: FoodService,
			private renderer: Renderer) {

	}

	ngOnInit() {
		this.getCategories();
		this.getFoods();
	}

	getCategories() {
		this.categoriesService.getAllCategories()
			.subscribe(
				categories => this.categories = categories,
				error => this.errorMessage = <any>error
			)
	}

	getFoods() {
		this.foodService.getAllFoods()
			.subscribe(
				foods => this.foods = foods,
				error => this.errorMessage = <any>error
			)
	}

	showAddFood() {
		this.newFood = new Food();
		if (this.categories.length > 0) {
			this.newFood.CategoryId = this.categories[0].Id;
		}
		this.displayAddForm();
	}

	showUpdateFood(food) {
		this.editFood = food;
		this.displayUpdateForm();
	}

	displayListForm() {
		this.displayMode = 0;
	}

	displayAddForm() {
		this.displayMode = 1;
	}

	displayUpdateForm() {
		this.displayMode = 2;
	}
	

	addFood() {
		this.foodService.addFood(this.newFood)
			.subscribe(
				data => this.addFoodDone(data),
				error => this.errorMessage = <any>error
			)
	}

	updateFood() {
		this.foodService.updateFood(this.editFood)
			.subscribe(
				data => this.updateFoodDone(data),
				error => this.errorMessage = <any>error
			)
	}

	deleteFoods() {
		var selectedRows = [];
		for (var i = 0; i < this.foods.length; i++) {
			if (this.foods[i].Selected) {
				selectedRows.push(this.foods[i].Id);
			}
		}
		if (selectedRows.length > 0) {
			this.foodService.deleteFoods(selectedRows)
				.subscribe(
					data => this.deleteFoodDone(data),
					error => this.errorMessage = <any>error
				)
		}
	}

	private addFoodDone(data) {
		console.log(data);
		if (data == "OK") {
			this.getFoods();
			this.displayListForm();
		} else {
			this.errorAddMessage = "There is an error when add new food. Please check your data again.";
		}
	}

	private updateFoodDone(data) {
		if (data == "OK") {
			this.getFoods();
			this.displayListForm();
		} else {
			this.errorUpdateMessage = "There is an error when update food. Please check your data again.";
		}
	}

	private deleteFoodDone(data) {
		if (data == "OK") {
			this.getFoods();
		} else {
			this.errorMessage = "There is an error when delete foods. Please try again.";
		}
	}
}