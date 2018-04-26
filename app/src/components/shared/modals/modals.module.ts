/**
 * Angular Imports
 */
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

/**
 * Material Imports
 */
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


/**
 * Popover wrapper
 */
import { PopoverComponent } from './popover/popover.component';
import { DeletePopoverComponent } from './popover/delete/deletePopover.component';


/**
 * Custom Modules
 */
import { RetryModule } from '../retry/retry.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    RetryModule
  ],
  schemas: [],
  declarations: [
    DeletePopoverComponent,
    PopoverComponent
  ],
  exports: [
    DeletePopoverComponent,
    PopoverComponent
  ],
  entryComponents: [
    DeletePopoverComponent,
    PopoverComponent

  ],
  providers: []
})

export class ModalsModule {}
