import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ShopsModule } from './shops.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(ShopsModule);