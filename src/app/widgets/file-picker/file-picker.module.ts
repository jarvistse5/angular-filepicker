import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePickerComponent } from './file-picker.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FilePickerComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    MatIconModule,
    ImageCropperModule,
    SharedModule,
  ]
})
export class FilePickerModule { }
