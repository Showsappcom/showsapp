/**
 * Required Angular Modules
 */
import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

/**
 * Required Angular Material Modules
 */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from '@angular/material/toolbar';


/**
 * Custom Modules and Components
 */
import { ActivateComponent } from './activate.component';


/**
 * Services
 */
import { ActivateService } from '../../services/activate.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule//,
    // RouterModule.forChild(
    //   [
    //     {
    //       path: '', component: ActivateComponent, pathMatch: 'full'
    //     }
    //   ])
  ],
  declarations: [ ActivateComponent ],
  exports: [ ActivateComponent ],
  providers: [ ActivateService ],
  schemas: []
})
/**
 * @module BaseModule - Base module, provides the base component after login
 */
export class ActivateModule {}
