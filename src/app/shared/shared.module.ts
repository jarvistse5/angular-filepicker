import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '../services/translate/translate.module';

@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      MatButtonModule,
      TranslateModule,
    ],
    exports: [
      CommonModule,
      MatButtonModule,
      TranslateModule,
    ]
  })
  export class SharedModule { }
  