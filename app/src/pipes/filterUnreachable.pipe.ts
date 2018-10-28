import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUnreachable'
})
export class FilterUnreachable implements PipeTransform {

  transform( objects : any[] ) : any[] {
    if (objects) {
      return objects.filter(object => {
        if (object.isReachable) {
          return object;
        }
      });
    }
  }
}  
