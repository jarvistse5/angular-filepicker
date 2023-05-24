import { NgModule } from '@angular/core';
import { TRANSLATION_PROVIDERS } from './translation';
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';

@NgModule({
  declarations: [TranslatePipe],
  imports: [
  ],
  providers: [
    TRANSLATION_PROVIDERS,
    TranslateService
  ],
  exports: [
    TranslatePipe
  ]
})
export class TranslateModule { }
