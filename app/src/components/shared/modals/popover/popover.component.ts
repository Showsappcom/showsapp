import { Component, ChangeDetectorRef, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material';

// Services
import { ModalsEvent } from '../../../../services/modalsEvent.service';





@Component({
  templateUrl: './popover.component.html',
  styleUrls: [ './popover.component.scss' ],
  selector: 'popover-wrapper'
})

export class PopoverComponent {


  @Output() notifyLogout : EventEmitter<any> = new EventEmitter();

  // Subscriptions
  private _modalsEventSubscription : any;
  private dialogRef : any;

  // markup and configuration
  private markupSet : object;

  /**
   * @param  {MatDialog} dialog - provides MatDialog functionality
   * @param  {ModalsEvent} _modalsEvent - provider for modals event
   */
  constructor( private dialog : MatDialog,
               private _modalsEvent : ModalsEvent ) {
  }

  /**
   * Initialization - lifecycle method
   * @returns void
   */
  private ngOnInit() : void {

    this._subscribeModalEvents();

  }

  /**
   * Destroy - lifecycle method
   * @returns void
   */
  private ngOnDestroy() : void {
    if (this._modalsEventSubscription) {
      this._modalsEventSubscription.unsubscribe();
    }
  }

  /**
   * Method for opening the appropriate modal
   * @param event - data provided from modal event subscription
   * @returns void
   */
  private _openModal( event : Event ) : void {

    if (event[ 'module' ] === 'show_modal') {

      // this.dialogRef = this.dialog.open(OverridePopOverComponent, {
      //   data: event,
      //   disableClose: true
      // });

    } else {
      console.log('modal doesn\'t exits');
      // this.dialogRef = this.dialog.open(SystemSettingsPopOverComponent, {
      //   data: event,
      //   disableClose: true
      // });
    }
  }

  /**
   * subscription for modal component events.
   * @returns void
   */
  private _subscribeModalEvents() : void {

    this._modalsEventSubscription = this._modalsEvent.on().subscribe(( event ) => {

      console.log('popover modal event : ', event);

      // Open event
      if (event[ 'action' ] === 'open') {

        this._openModal(event);
      }
      // Close Event
      else if (event[ 'action' ] === 'close') {

        this._closeModal();
      }

      if (event[ 'overrideLogout' ] === 'true') {
        this._logout();
      }
    });
  }

  /**
   * Private function to close the modal
   * @param result - data given out when a modal closes
   */
  private _closeModal( result? : Object ) {
    this.dialog.closeAll();
  }

  /**
   * @private
   * Used to display logout
   * @returns void
   */
  private _logout() : void {

    this.notifyLogout.emit({ override: true });

  }

  private _switchView( event : any ) : void {
    this._openModal(event);
  }



}
