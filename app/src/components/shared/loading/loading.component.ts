/**
 * Angular Imports
 */
import {
  Component,
  Input
} from '@angular/core';


@Component({

  templateUrl: './loading.component.html',
  styleUrls: [ './loading.component.scss' ],
  selector: 'lxi-loading'

})
/**
 * @class LoadingComponent
 * @property templateUrl - provides dom markup
 * @property styleUrls - provides override styles for the container
 * @property selector - provides the selector wrapper for the component
 */
export class LoadingComponent {

  /**
   * Input to the component that stores the display time
   * @type {string} message - provides the string to display in the message
   */
  @Input() message : string;

  /**
   * Input to the component that stores the display time
   * @type {string} progressBarType - provides the type  primary/warn/accent
   */
  @Input() progressBarColor : string = 'primary';
  /**
   * Input to the component that stores the display time
   * @type {string} progressBarType - provides the type  buffer/query
   */
  @Input() progressBarType : string = 'query';


}
