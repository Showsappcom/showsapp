/**
 * Required Angular Modules
 */
import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Required Angular Material Modules
 */
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from '@angular/material/toolbar';


/**
 * Custom Modules and Components
 */
import { ActivateComponent } from './activate.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forChild(
      [
        {
          path: '', component: ActivateComponent, pathMatch: 'full'
        }
      ]),
  ],
  declarations: [ ActivateComponent ],
  exports: [ ActivateComponent ],
  providers: [ ],
  schemas: []
})
/**
 * @module BaseModule - Base module, provides the base component after login
 */
export class ActivateModule {}
