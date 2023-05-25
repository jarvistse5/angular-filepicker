import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '../services/translate/translate.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      MatButtonModule,
      TranslateModule,
      MatDialogModule,
      MatIconModule,
    ],
    exports: [
      CommonModule,
      MatButtonModule,
      TranslateModule,
      MatDialogModule,
      MatIconModule,
    ]
  })
  export class SharedModule { }
  