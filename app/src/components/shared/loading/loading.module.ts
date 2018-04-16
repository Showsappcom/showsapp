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
import { MatProgressBarModule } from '@angular/material/progress-bar';


/**
 * Custom Component
 */
import { LoadingComponent } from './loading.component';


@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  declarations: [ LoadingComponent ],
  exports: [ LoadingComponent ],
  providers: []
})

/**
 * @module LoadingModule - Used to display loading animations
 */
export class LoadingModule {}
