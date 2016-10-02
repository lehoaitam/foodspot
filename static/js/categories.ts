import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './categories.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);