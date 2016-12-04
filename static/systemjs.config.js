(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': '/static/node_modules/',
            'jquery': '/static/js/jquery'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'shops': '/static/js/shops',
            'categories': '/static/js/categories',
            'menus': '/static/js/menus',
            'menu-details': '/static/js/menu-details',
            'food': '/static/js/food',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
            'angular2-google-maps/core': 'npm:angular2-google-maps/core/core.umd.js',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            'jquery': {
                main: './jquery.min.js',
                defaultExtension: 'js'
            },
            'shops': {
                main: './main.js',
                defaultExtension: 'js'
            },
            'categories': {
                main: './categories.js',
                defaultExtension: 'js'
            },
            'menus': {
                main: './menus.js',
                defaultExtension: 'js'
            },
            'menu-details': {
                main: './menu-details.js',
                defaultExtension: 'js'
            },
            'food': {
                main: './main.js',
                defaultExtension: 'js'
            },
            'rxjs': {
                defaultExtension: 'js'
            },
            'angular-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);