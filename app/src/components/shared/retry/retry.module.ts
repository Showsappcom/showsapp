/**
 * Angular Imports
 */
import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Angular Material Imports
 */
import { MatButtonModule } from '@angular/material/button';


/**
 * Custom Component
 */
import { RetryComponent } from './retry.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [ RetryComponent ],
  exports: [ RetryComponent ],
  providers: []
})

/**
 * @module RetryModule - Retry module, provides the module that stores the generic retry component
 */
export class RetryModule {}
