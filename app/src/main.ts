declare let require : any;
declare let process : any;

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/* Root module */
import { AppModule } from './components/app/app.module';

/* shared styles */
import './shared/styles/_styles.scss';


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'aot_production') {
  enableProdMode();
}


function init() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log('!!!!!!!!!!i am here ....');
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
  // init();
});


