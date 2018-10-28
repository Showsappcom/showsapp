// import 'core-js/es7/reflect';
import { platformBrowser } from '@angular/platform-browser';
/* Root module */
import { AppModuleNgFactory } from './components/app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';

// import {AppModuleNgFactory} from '../aot/src/components/desktop/app/app.module.ngfactory';

import './shared/styles/_styles.scss';

enableProdMode();


function isIOS() {

  let iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()) { return true; }
    }
  }

  return false;
}

function init() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sapppwa.js').then(registration => {
        platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
      }).catch(registrationError => {
        platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
      });
    });
  } else {

    platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

  }
}

if (process.env.NODE_ENV === 'aot_cordova') {
  document.addEventListener('deviceready', () => {
    platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

  }, false);
} else {
  init();

}
