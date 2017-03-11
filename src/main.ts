import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
import { decorateModuleRef } from './rvep/environment';
import { RvepModule } from './rvep/rvep.module';

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(RvepModule)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}

bootloader(main);
