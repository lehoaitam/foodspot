import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FoodModule } from './food.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(FoodModule);