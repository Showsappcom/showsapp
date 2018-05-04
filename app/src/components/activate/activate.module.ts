/**
 * Required Angular Modules
 */
import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// import { RouterModule } from '@angular/router';

/**
 * Required Angular Material Modules
 */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
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
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule
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
