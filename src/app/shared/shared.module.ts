import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '../services/translate/translate.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BytePipe } from './pipes/byte.pipe';


@NgModule({
    declarations: [
        BytePipe
    ],
    imports: [
      CommonModule,
      MatButtonModule,
      TranslateModule,
      MatDialogModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTooltipModule,
      MatTableModule,
      FlexLayoutModule,
      FormsModule,
      MatToolbarModule,
      MatButtonToggleModule,
      MatSlideToggleModule,
      MatSelectModule,
      MatFormFieldModule,
    ],
    exports: [
      CommonModule,
      MatButtonModule,
      TranslateModule,
      MatDialogModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTooltipModule,
      MatTableModule,
      FlexLayoutModule,
      FormsModule,
      MatToolbarModule,
      MatButtonToggleModule,
      MatSlideToggleModule,
      MatSelectModule,
      MatFormFieldModule,
      BytePipe,
    ]
  })
  export class SharedModule { }
  