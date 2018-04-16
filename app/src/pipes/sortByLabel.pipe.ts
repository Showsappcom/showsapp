// import { Pipe, PipeTransform } from '@angular/core';
// /*
//  * Sort an object array by 'label' property
//  * Takes an array of objects with a property of 'label' to sort
//  * Usage:
//  *   emailObject[] | sortByLabel
//  * Example:
//  *   {{ o |  sortByLabel}}
//  *   formats to: 1024
//  */
// @Pipe({ name: 'sortByLabel' })
// export class SortByLabelPipe implements PipeTransform {
//   transform( objectArray : any ) {
//
//
//     // console.log('THE OBJECT ARRAY IS: ', objectArray);
//     return objectArray.sort(( a, b ) => {
//
//       if (a[ 'label' ] < b[ 'label' ]) {
//
//         return -1;
//
//       }
//
//       if (a[ 'label' ] > b[ 'label' ]) {
//
//         return 1;
//
//       }
//
//       return 0;
//
//     });
//   }
// }
