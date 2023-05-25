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


@NgModule({
    declarations: [
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
    ]
  })
  export class SharedModule { }
  