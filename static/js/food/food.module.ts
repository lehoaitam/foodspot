import { NgModule }      	from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { FormsModule }   	from '@angular/forms';
import { HttpModule } 		from '@angular/http';
import { FoodComponent } 	from './food.component';

@NgModule({
	imports:		[ BrowserModule, FormsModule, HttpModule ],
	declarations: 	[ FoodComponent ],
	bootstrap:		[ FoodComponent ]
})
export class FoodModule { }