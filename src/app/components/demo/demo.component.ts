import { Component, Optional } from '@angular/core';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { MessageBox } from 'src/app/widgets/message-box/message-box';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {

  constructor(
    @Optional() private translate: TranslateService,
    private messageBox: MessageBox,
  ) {}

  test() {
    // alert('test');
    this.messageBox.alert({title: this.translate.instant('only_accept_file_type'), description: "sdjfkjsdhf"});
  }
}
