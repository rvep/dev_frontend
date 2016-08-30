import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RvepModule } from './rvep/rvep.module';

export function main(initialHmrState?: any): Promise<any> {
  return platformBrowserDynamic().bootstrapModule(RvepModule)
    .catch(err => console.error(err));
}

/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ( ENV === 'development' && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  document.addEventListener('DOMContentLoaded', () => main());
}
