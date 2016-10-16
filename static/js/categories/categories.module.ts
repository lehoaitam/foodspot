import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CategoriesComponent }   from './categories.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule ],
    declarations: [ CategoriesComponent ],
    bootstrap:    [ CategoriesComponent ]
})
export class CategoriesModule { }