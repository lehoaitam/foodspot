import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MenusModule } from './menus.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(MenusModule);

