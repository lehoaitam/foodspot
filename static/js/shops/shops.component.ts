import {Component, enableProdMode, OnInit, Renderer, ViewChild} from '@angular/core';

import {Shop} from './shop';
import {ShopsService} from './shops.service';

//enableProdMode();

@Component({
    selector: 'shops-app',
    templateUrl: '/static/templates/backend/shops/list.html',
    providers: [ShopsService, Renderer]
})

export class ShopsComponent implements OnInit {
	errorMessage: string;
    errorAddMessage: string = '';
    errorUpdateMessage: string = '';

	newShop: Shop = new Shop();
	editShop: Shop = new Shop();

	shops: Shop[] = [];

	marker: marker;

	displayMode: number = 0;

	@ViewChild("imageAddInput") imageAddInput;
	@ViewChild("imageUpdateInput")  imageUpdateInput;

	constructor(private shopsService: ShopsService, private renderer: Renderer) {
		
	}

	ngOnInit() {
		this.getShops();		
	}

	getShops() {
		this.shopsService.getAllShops()
			.subscribe(
				shops => this.shops = shops,
				error => this.errorMessage = <any>error
			)
	}

	showAddShop() {
		this.newShop = new Shop();
		this.marker = {
			lat: this.newShop.Lat,
			lng: this.newShop.Long
		}
		this.displayAddForm();		
	}

	showUpdateShop(shop) {
		this.editShop = shop;
		this.marker = {
			lat: this.editShop.Lat,
			lng: this.editShop.Long
		}
		this.displayUpdateForm();
	}

	mapClicked($event: MouseEvent) {
		this.marker = {
			lat: $event.coords.lat,
			lng: $event.coords.lng
		}
	}

	addShop() {
		this.newShop.Lat = this.marker.lat;
		this.newShop.Long = this.marker.lng;
		let fileInput = this.imageAddInput.nativeElement;
		if (fileInput.files && fileInput.files[0]) {
			this.shopsService.addShop(this.newShop, fileInput.files[0])
				.subscribe(
					data => this.addShopDone(data),
					error => this.errorMessage = <any>error
				)
		} else {
			this.errorAddMessage = "Please upload an image";
		}
	}

	updateShop() {		
		this.editShop.Lat = this.marker.lat;
		this.editShop.Long = this.marker.lng;
		let fileInput = this.imageUpdateInput.nativeElement;
		this.shopsService.updateShop(this.editShop, fileInput.files[0])
			.subscribe(
				data => this.updateShopDone(data),
				error => this.errorMessage = <any>error
			)
	}

	deleteShops() {
		var selectedRows = [];
		var shops_length = this.shops.length;
		for (var i = 0; i < shops_length; i++) {
			if (this.shops[i].Selected) {
				selectedRows.push(this.shops[i].Id);
			}
		}
		if (selectedRows.length > 0) {
			this.shopsService.deleteShops(selectedRows)
				.subscribe(
					data => this.deleteShopDone(data),
					error => this.errorMessage = <any>error
				)
		}
	}

	cancel() {
		this.displayListForm();
	}

	private addShopDone(data) {
		if (data == "OK") {
			this.getShops();
			this.displayListForm();
		} else {
			this.errorAddMessage = "There is an error when add new shop. Please try again.";
		}
	}

	private updateShopDone(data) {
		if (data == "OK") {
			this.getShops();
			this.displayListForm();
		} else {
			this.errorUpdateMessage = "There is an error when update shop. Please try again.";
		}
	}

	private deleteShopDone(data) {
		if (data == "OK") {
			this.getShops();
		} else {
			this.errorMessage = "There is an error when delete shops. Please try again.";
		}
	}

	private displayListForm() {
		this.displayMode = 0;
	}

	private displayAddForm() {
		this.displayMode = 1;
	}

	private displayUpdateForm() {
		this.displayMode = 2;
	}
}