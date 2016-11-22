import {Component, enableProdMode} from '@angular/core';

//enableProdMode();

@Component({
    selector: 'menu-details-app',
    template: '<a style="display: none" routerLink="/backoffice/menu-details/:id" routerLinkActive="active"></a><router-outlet></router-outlet>',
    providers: [],
})

export class MenuDetailsComponent {

    constructor() {

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

}