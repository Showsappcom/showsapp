import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUnreachable'
})
export class FilterUnreachable implements PipeTransform {

  transform( objects : any[] ) : any[] {
    if (objects) {
      console.log('inside pipe::::', objects);
      return objects.filter(object => {
        if (object.isReachable) {
          return object;
        }
      });
    }
  }
}  
