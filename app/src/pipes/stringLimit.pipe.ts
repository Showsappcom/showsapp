import { Pipe } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})

//TODO: Need models for the inputs
export class StringLimitPipe {
  transform( val : any, args : any ) {
    if (val) {
      if (args === undefined) {
        return val;
      }

      if (val.length > args) {
        return val.substring(0, args) + '...';
      } else {
        return val;
      }
    }

  }
}
