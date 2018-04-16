/**
 * Angular Imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * Angular Material Imports
 */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/**
 * Custom Components/Modules
 */
import { LoginComponent } from './login.component';


/**
 * Services
 */
import { LoginService } from '../../../services/login.service';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [ LoginComponent ],
  exports: [ LoginComponent ],
  providers: [ LoginService ]
})
/**
 * @module LoginModule - Provides the login logic for the application
 */
export class LoginModule {}
