// import { Directive, ElementRef, HostListener, Host, Input, Output, EventEmitter } from '@angular/core';
//
// @Directive({
//   selector: '[container-resize]'
// })
// export class ContainerResizeDirective {
//
//   constructor( private el : ElementRef ) {
//     setTimeout(() => {
//       this.updateHeight(window.innerWidth);
//     }, 50);
//   }
//
//   // @Input('elmsInputVal') inputVal : string;
//   // @Output() containerResize : EventEmitter<any> = new EventEmitter();
//
//
//   @HostListener('window:resize', [ '$event' ])
//   onResize( e : Event ) {
//
//     this.updateHeight(e.target['innerHeight']);
//   }
//
//   // @HostListener('on-change', ['$event']) onChangeEvent(e ) {
//   //
//   //   console.log('hello')
//   //   // this.updateData(e['detail']);
//   // }
//
//
//   private updateHeight( width : number ) {
//     console.log('the detail is', width);
//     try {
//       console.log('the detail is', document.getElementsByClassName('main-nav-list')[ 0 ][ 'offsetHeight' ]);
//       console.log('the detail is', document.getElementsByClassName('nav-container')[ 0 ][ 'offsetHeight' ]);
//     } catch (ed) {
//       console.warn('holla');
//     }
//
//
//     // this.elmsInputValChange.next(value);
//     // this.inputVal = value;
//   }
//
// }
