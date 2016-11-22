import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MenuDetailsModule } from './menu-details.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(MenuDetailsModule);

