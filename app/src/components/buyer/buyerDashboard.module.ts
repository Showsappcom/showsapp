/**
 * Angular Imports
 */
import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


/**
 * Material Imports
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
 * Custom Components
 */
import { BuyerDashboardComponent } from './buyerDashboard.component';
/**
 * Seller Service
 */
import { BuyerService } from '../../services/buyer.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [
        {
          path: '', component: BuyerDashboardComponent, pathMatch: 'full'
        }
      ])
  ],
  declarations: [ BuyerDashboardComponent ],
  exports: [ BuyerDashboardComponent ],
  providers: [ BuyerService ],
  schemas: []
})
export class BuyerDashboardModule {}
