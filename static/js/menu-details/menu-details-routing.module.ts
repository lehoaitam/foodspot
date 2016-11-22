import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MenuDetailsContentComponent} from "./menu-details.content.component";

const childRoutes: Routes = [
    { path: 'backoffice/menu-details/:id', component: MenuDetailsContentComponent, pathMatch: 'full' }
];


@NgModule({
    imports: [
        RouterModule.forRoot(childRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class MenuDetailsRoutingModule {}