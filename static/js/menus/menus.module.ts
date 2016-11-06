import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenusComponent }   from './menus.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule ],
    declarations: [ MenusComponent ],
    bootstrap:    [ MenusComponent ]
})
export class MenusModule { }