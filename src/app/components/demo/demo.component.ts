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

  fileAccept: string = '*';
  multiple: boolean = true;
  previewImage: boolean = true;
  previewVideo: boolean = true;
  aspectRatio: number = 4/3;
  aspectRatioString: string = "4:3";

  constructor(
    @Optional() private translate: TranslateService,
    private messageBox: MessageBox,
    private dialog: MatDialog,
  ) {}

  openFilePicker() {
    this.dialog.open(FilePickerComponent, {
      data: {
        fileAccept: this.fileAccept,
        multiple: this.multiple,
        previewImage: this.previewImage,
        previewVideo: this.previewVideo,
        aspectRatio: this.aspectRatio,
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
