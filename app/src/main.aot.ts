// import 'core-js/es7/reflect';
import { platformBrowser } from '@angular/platform-browser';
/* Root module */
import { AppModuleNgFactory } from './components/app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';

// import {AppModuleNgFactory} from '../aot/src/components/desktop/app/app.module.ngfactory';

import './shared/styles/_styles.scss';

enableProdMode();


function init() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // console.log('!!!!!!!!!!i am here ....');
      // navigator.serviceWorker.register('/sw.js').then(registration => {
      //   console.log('SW registered: ', registration);
      //   platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
      //
      // }).catch(registrationError => {
      //   console.log('SW registration failed: ', registrationError);
      //   platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
      //
      // });
      platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

    });
  }
}

if (process.env.NODE_ENV === 'aot_cordova') {

  console.log('i am here ...');
  document.addEventListener('deviceready', () => {

    platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

  }, false);
} else {
  init();

}
// document.addEventListener('deviceready', () => {
//
//
// }, false);
