import { NgModule }      	from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { FormsModule }   	from '@angular/forms';
import { HttpModule } 		from '@angular/http';
import { ShopsComponent } 	from './shops.component';

@NgModule({
	imports:		[ BrowserModule, FormsModule, HttpModule ],
	declarations: 	[ ShopsComponent ],
	bootstrap:		[ ShopsComponent ]
})
export class ShopsModule { }