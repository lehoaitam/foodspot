import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CategoriesModule } from './categories.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(CategoriesModule);