import { Component, Optional } from '@angular/core';
import { TranslateService } from 'src/app/services/translate/translate.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {

  constructor(
    @Optional() private translate: TranslateService,
  ) {}

  test() {
    alert('test');
  }
}
