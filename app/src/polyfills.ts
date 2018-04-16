/*Core-JS*/
// import 'core-js';


import 'core-js/es6/array';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/string';
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/weak-map';
import 'core-js/es7/reflect';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-set';
import 'core-js/es6/reflect';

import 'core-js/fn/array/includes';
import 'core-js/fn/object/assign';

// import 'es6-shim';

/*Zone*/
import 'zone.js/dist/zone';

/*Typescript helpers*/
import 'ts-helpers';

/* Animations */
import 'web-animations-js';

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'mobile_development') {

  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');

} else if (process.env.NODE_ENV === 'production') {

  // require('zone.js/dist');


}
