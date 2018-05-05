/**
 * Angular Imports
 */
import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


/**
 * Material Imports
 */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

/**
 * Custom Components
 */
import { ViewSellerItemComponent } from './viewSellerItem.component';
/**
 * Seller Service
 */
import { NegotiationService } from '../../services/negotiation.service';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [
        {
          path: '', component: ViewSellerItemComponent, pathMatch: 'full'
        }
      ])

  ],
  declarations: [ ViewSellerItemComponent ],
  exports: [ ViewSellerItemComponent ],
  providers: [ NegotiationService ],
  schemas: []
})
export class ViewSellerItemModule {}
