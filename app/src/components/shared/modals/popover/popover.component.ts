/**
 * Angular Imports
 */
import { Component, ChangeDetectorRef, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

/**
 * Material Imports
 */
import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material';

/**
 * Services
 */
import { ModalsEvent } from '../../../../services/modalsEvent.service';

/**
 * Custom Components
 */
import { DeletePopoverComponent } from './delete/deletePopover.component';

@Component({
  templateUrl: './popover.component.html',
  styleUrls: [ './popover.component.scss' ],
  selector: 'popover-wrapper'
})


export class PopoverComponent {


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
  ngOnInit() {

    this._subscribeModalEvents();

  }

  /**
   * Destroy - lifecycle method
   * @returns void
   */
  ngOnDestroy() {
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
    if (event[ 'type' ] === 'DeleteConfirmation') {
      this.dialogRef = this.dialog.open(DeletePopoverComponent);
    }
  }

  /**
   * subscription for modal component events.
   * @returns void
   */
  private _subscribeModalEvents() : void {

    this._modalsEventSubscription = this._modalsEvent.on().subscribe(( event ) => {
      // Open event
      if (event[ 'action' ] === 'open') {
        this._openModal(event);
      }
      // Close Event
      else if (event[ 'action' ] === 'close') {
        this._closeModal();
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


}
