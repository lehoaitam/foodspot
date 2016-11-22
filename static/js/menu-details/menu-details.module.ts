import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuDetailsRoutingModule } from './menu-details-routing.module';
import { MenuDetailsComponent }   from './menu-details.component';
import {MenuDetailsContentComponent} from "./menu-details.content.component";

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, MenuDetailsRoutingModule ],
    declarations: [ MenuDetailsComponent, MenuDetailsContentComponent ],
    bootstrap:    [ MenuDetailsComponent ]
})
export class MenuDetailsModule { }