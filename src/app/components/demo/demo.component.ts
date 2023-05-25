import { Component, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { FilePickerComponent } from 'src/app/widgets/file-picker/file-picker.component';
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
    private dialog: MatDialog,
  ) {}

  test() {
    // alert('test');
    this.messageBox.alert({title: this.translate.instant('only_accept_file_type'), description: "sdjfkjsdhf"});
  }

  openFilePicker() {
    this.dialog.open(FilePickerComponent, {
      data: {
        fileAccept: "image/*, video/*",
        multiple: false,
        previewImage: true,
        previewVideo: true,
        aspectRatio: 4 / 3,
      },
      autoFocus: false,
      panelClass: 'file-picker',
      // disableClose: true,
    }).afterClosed().subscribe((result: any) => {
      if (result && result != "close" && result[0]) {
        var item = result[0];
        console.log(result);
      }
    });
  }
}
