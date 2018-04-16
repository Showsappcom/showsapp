/**
 * Angular Imports
 */
import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


/**
 * Material Imports
 */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
    RouterModule.forChild(
      [
        {
          path: '', component: BuyerDashboardComponent, pathMatch: 'full'
        }
      ]),
    MatButtonModule,
    MatCardModule
  ],
  declarations: [ BuyerDashboardComponent ],
  exports: [ BuyerDashboardComponent ],
  providers: [ BuyerService ],
  schemas: []
})
export class BuyerDashboardModule {}
