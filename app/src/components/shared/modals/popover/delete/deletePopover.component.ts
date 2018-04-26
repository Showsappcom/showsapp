/**
 * Angular Import
 */
import { Component, ChangeDetectorRef } from '@angular/core';

/**
 * Services
 */
import { ModalsEvent } from '../../../../../services/modalsEvent.service';

/**
 * Constants/Configuration
 */
import { COMMON_CONSTANTS as COMMON_CONST } from '../../../../../configurations/constants/common.constant';


@Component({ templateUrl: './deletePopover.component.html',
  styleUrls: ['../popover.theme.scss'],
  selector: 'delete-confirmation' })

export class DeletePopoverComponent {


  constructor( private _modalsEvent : ModalsEvent  ) { }


  /**
   * Task to be performed on initialization.
   */
  ngOnInit() {

  }

  /**
   * Task to be performed on destroy.
   */
  ngOnDestroy() {
    //this.changeDetection.detach();
  }




  public confirmDelete():void{

    this._modalsEvent.fire({ action: COMMON_CONST.POPOVER.DELETE, type: 'DeleteConfirmation'});

  }

  /**
   * On clicking 'Cancel' button the modal gets closed.
   */
  public closeModal() : void {

    this._modalsEvent.fire({ action: COMMON_CONST.POPOVER.CLOSE, type: 'DeleteConfirmation' });
  }




}
