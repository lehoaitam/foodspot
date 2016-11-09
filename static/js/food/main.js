"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var food_module_1 = require('./food.module');
var platform = platform_browser_dynamic_1.platformBrowserDynamic();
platform.bootstrapModule(food_module_1.FoodModule);
