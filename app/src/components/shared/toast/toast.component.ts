import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  Inject,
  Input,
  EventEmitter
} from '@angular/core';


// import { toastExpand } from '../../../animations/router.animations';

import { MAT_SNACK_BAR_DATA } from '@angular/material';


// import { Store } from '@ngrx/store';
// import * as fromRoot from '../../../reducers';
import { ToastEvent } from '../../../services/toastEvent.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/let';

// let animationTime = 250;

//TODO: update documentation here ...
@Component({

  templateUrl: './toast.component.html',
  styleUrls: [ './toast.component.scss' ],
  selector: 'toast-el'
  // animations: [ toastExpand() ]

})

export class ToastComponent {

  @Input() isHidden : boolean = false;
  @Output('toast-changed') toastChanged = new EventEmitter<Object>();


  /* public variables */
  public toastType : string = 'success';
  public toastState : string = 'out';
  public toastTypeIcon : string = 'elms-icons:success';
  public toastMessage : string = 'Your event was successful';
  public toastClose : string = 'close';
  public persistToast : boolean = true;
  public userLoggedIn : boolean = false;


  public errorCount : number = 1;

  /*This provides a hook to the login El*/
  @ViewChild('toast') toastEl : ElementRef;

  constructor( private toastEvent : ToastEvent, @Inject(MAT_SNACK_BAR_DATA) public data : any ) {


  }

  ngOnInit() : void {

    this._updateToastType();


  }

  /* Passing Subscription in the life cycle method */
  // ngAfterViewInit() {
  //
  //   // this.errorMessageSubscription = this.toastEvent.on().subscribe(event => {
  //   //
  //   //   this._showToasts(event);
  //   //
  //   // });
  // }

  private _updateToastType() : void {

    console.log('the toast  is simply', this.data);
    if (this.data && this.data.message) {
      this.toastMessage = this.data.message;
    }

  }


  ngOnDestroy() {
    // this.changeDetection.detach();
    // this.errorMessageSubscription.unsubscribe();
  }


  public closeToast() : void {
    this.toastEvent.fire({
      type: 'close',
      message: ''
    });
  }


}
