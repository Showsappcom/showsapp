import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { RetryEventModel } from '../../../models/retry/retry.model';


@Component({

  templateUrl: './retry.component.html',
  styleUrls: [ './retry.component.scss' ],
  selector: 'lxi-retry'

})
/**
 * @class RetryComponent
 * @property templateUrl - provides dom markup
 * @property styleUrls - provides override styles for the container
 * @property selector - provides the selector wrapper for the component
 */
export class RetryComponent {

  /**
   * Input to the component that stores the display time
   * @type {string} message - provides the string to display in the message
   */
  @Input() message : string;

  /**
   * Triggers a custom event when the retry button is clicked
   * @type {EventEmitter<RetryEventModel>} refreshEmitted - provides event fire
   */
  @Output('refresh') refreshEmitted : EventEmitter<RetryEventModel> = new EventEmitter();


  /**
   * Fires event when button clicked
   * @returns void
   */
  public retryClicked() : void {

    this.refreshEmitted.emit({
      action: 'refresh'
    });

  }
}
