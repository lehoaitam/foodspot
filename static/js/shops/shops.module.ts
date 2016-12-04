import { NgModule }      	from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { FormsModule }   	from '@angular/forms';
import { HttpModule } 		from '@angular/http';
import { AgmCoreModule } 	from 'angular2-google-maps/core';
import { ShopsComponent } 	from './shops.component';

@NgModule({
	imports:		[ BrowserModule, FormsModule, HttpModule, AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAikVga80Tt2_4JH8wmyrrnCZkF0jUzzqc'
    }) ],
	declarations: 	[ ShopsComponent ],
	bootstrap:		[ ShopsComponent ]
})
export class ShopsModule { }