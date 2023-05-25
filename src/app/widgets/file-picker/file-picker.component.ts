import { Component, OnInit, Inject, ViewChild, ElementRef, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDropzoneModule, NgxDropzoneComponent } from 'ngx-dropzone';
import { MatTableDataSource } from '@angular/material/table';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageBox } from '../message-box/message-box';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { FilePickerService } from './file-picker.service';

export enum UploadType {
  computer,
  link,
  google,
  cropper,
}

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss']
})

export class FilePickerComponent implements OnInit {

  // Options
  fileAccept: string = '*';
  multiple: boolean = false;
  previewImage: boolean = false;
  previewVideo: boolean = false;
  aspectRatio: number = 4/3;
  // File picker
  headerTitle: string;
  uploadEnum = UploadType;
  uploadType: any;
  files: File[] = [];
  loading: boolean = false;
  limits: any;
  specialLimit: string | null = null;
  // File table
  displayedColumns: string[] = ['position', 'name', 'type', 'size', 'action'];
  dataSource = new MatTableDataSource<File>([]);
  // Upload by Link
  link: string;
  // Google Drive
  public auth2: any;
  private clientId: string = '917062033489-f4vhgvcjldm3hck3iorvisdlen2v7qj7.apps.googleusercontent.com';
  scope = 'https://www.googleapis.com/auth/drive.readonly';
  googleToken: string;
  // Cropper
  lastUploadType : any;
  selectedImage: File | null;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  transform: ImageTransform = {};
  scale: number = 1;
  rotate: number = 0;
  containWithinAspectRatio: boolean = true;
  selectedImageType: string;
  selectedImageTypeShort: any;
  selectedImageName: string;

  @ViewChild('drop') drop: NgxDropzoneComponent;

  /**
   *  Link sample
   *  https://media.prod.mdn.mozit.cloud/attachments/2016/10/28/14295/a21a85eaccd405d608395b4ca8d82538/CORS_principle.png
   *  https://makeawebsitehub.com/wp-content/uploads/2017/07/best-free-image-hosting-sites.jpg
   *  https://images.unsplash.com/photo-1578496480157-697fc14d2e55?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
   *  https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
   *
   */

   /**
    * Google drive picker bug
    * 1. Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://docs.google.com') does not match the recipient window's origin ('http://localhost:4200').
    * 2. Invalid 'X-Frame-Options' header encountered when loading 'https://docs.google.com/picker?protocol=gadgets&origin=http%3A%2F%2Flocalhost%3A4200&multiselectEnabled=true&sdr=true&oauth_token=ya29.a0AfH6SMAefcd_cfx-pFDKr9i4Fj99Ib0KAwFeIi2rVm3yS27STlCxFnOKnFXVAx5QHY-_JxYMaldJ1JN4hWwazyhOqxhZZ79FIws3JGBB4diF6rTvmCYcWXDjUflsALEr__lcZIijUGZ5LssmLmuER-N643eGFaf2HGc7quL5Ccs5&hostId=localhost&parent=http%3A%2F%2Flocalhost%3A4200%2Ffavicon.ico&nav=((%22all%22%2Cnull%2C%7B%22dr%22%3Atrue%2C%22parent%22%3A%22root%22%2C%22includeFolders%22%3Atrue%7D)%2C(%22recently-picked%22))&rpcService=7ut6m7urnlm&rpctoken=cu13m4nuf8u4&thirdParty=true#rpctoken=cu13m4nuf8u4': 'ALLOW-FROM http://localhost:4200' is not a recognized directive. The header will be ignored.
    * 3. POST https://docs.google.com/picker/logImpressions 400
    *
    * Reason and solution:
    * X-Frame-Option error is known bug in Chrome.
    * Google Drive does not play nice with localhost.
    * If do with domain name, everyting will work as expected
    * Refenerce:
    * https://stackoverflow.com/questions/34516182/google-drive-picker-error
   **/

   /**
    * Image cropper bug:
    * The image size will become larger after cropped
    * Reason:
    * Common problem with HTML canvas
    * Solution:
    * Can use some libraries to compress the images if needed
    * Refenerce:
    * https://github.com/Mawi137/ngx-image-cropper/issues/376
   **/

  constructor(
    public dialogRef: MatDialogRef<FilePickerComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    @Optional() private translate: TranslateService,
    private sanitizer: DomSanitizer,
    private messageBox: MessageBox,
    private filePickerService: FilePickerService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.headerTitle = this.translate.instant('select_file');
    // Default first upload method
    this.uploadType = this.uploadEnum.computer;
    // Config file picker options
    this.fileAccept = this.dialogData.fileAccept ?? "*";
    this.multiple = this.dialogData.multiple ?? false;
    this.previewImage = this.dialogData.previewImage ?? false;
    this.previewVideo = this.dialogData.previewVideo ?? false;
    this.aspectRatio = this.dialogData.aspectRatio ?? 4/3;
    // File size limits config
    this.limits = {
      files: { name: '500MB', value: 524288000 },
      video: { name: '500MB', value: 524288000 },
      image: { name: '2MB', value: 2097152 },
    };
    this.specialLimit = this.dialogData.specialLimit ?? null;
  }

  /** Swap upload method to upload by user computer **/
  computer_upload() {
    if (this.uploadType !== UploadType.computer && this.uploadType !== UploadType.cropper) {
      this.uploadType = UploadType.computer;
    }
  }

  /** Swap upload method to upload by link **/
  link_upload() {
    if (this.uploadType !== UploadType.link && this.uploadType !== UploadType.cropper) {
      this.uploadType = UploadType.link;
    }
  }

  /** Swap upload method to upload by Google Drive **/
  google_upload() {
    if (this.uploadType !== UploadType.google && this.uploadType !== UploadType.cropper) {
      this.uploadType = UploadType.google;
    }
  }

  /** Add file when drop/select files in ngx-dropzone **/
  onSelect(event: any) {
    // console.log("onSelect", event);
    if(event.rejectedFiles.length > 0){
      // handle no multiple files
      if(event.rejectedFiles.find((file: any) => file.reason == "no_multiple")){
        this.messageBox.alert({title: this.translate.instant('one_file_selected_only')});
      }
      // check file accept types
      if(event.rejectedFiles.find((file: any) => file.reason == "type")){
        this.messageBox.alert({title: this.translate.instant('only_accept_file_type'), description: this.fileAccept});
      }
      return;
    }
    event.addedFiles.forEach((file: any) => {
      this.pushFile(file);
    });
  }

  /** Remove file when press remove button in ngx-dropzone-preview **/
  onRemove(event: any) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    if (event === this.selectedImage) {
      this.selectedImage = null;
    }
  }

  /** Press "Upload" button, then close the file picker dialog and return files **/
  upload() {
    var files = this.files;
    var items: any[] = [];
    var invalid = false;
    files.forEach(file => {
      // ensure all files is not exceeds the size limit
      if (this.isExceedLimit(file)) {
        invalid = true;
        return;
      }
      // generate image preview url
      var fileType = file.type;
      var url = null;
      if (fileType.substr(0, fileType.indexOf('/')) === "image" || fileType.substr(0, fileType.indexOf('/')) === "video" ) {
        url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      }
      // combine file and url as a item
      var item = {
        file: file,
        url: url,
      };
      // push that item into an array
      items.push(item);
    });
    if (!invalid) {
      this.dialogRef.close(items);
    }
  }

  /** Check if the file exceeds the limit **/
  isExceedLimit(file: File): boolean {
    // console.log(file);
    var fileType = file.type;
    var fileCategory = fileType.substr(0, fileType.indexOf('/'));
    var limit;
    var hints = "";
    if (this.specialLimit && this.specialLimit != "") {
      limit = this.limits[this.specialLimit];
      if (limit) {
        hints = this.translate.instant("fileLimitHint", [limit.name]);
      } else {
        console.log("Unknown specialLimit");
        return false;
      }
    } else if (fileCategory === 'image') {
      limit = this.limits.image;
      hints = this.translate.instant("imageLimitHint", [limit.name]);
    } else if (fileCategory === 'video') {
      limit = this.limits.video;
      hints = this.translate.instant("videoLimitHint", [limit.name]);
    } else {
      limit = this.limits.files;
      hints = this.translate.instant("fileLimitHint", [limit.name]);
    }
    if (file.size > limit.value) {
      this.messageBox.alert({title: this.translate.instant("upload_failed") + " - " + file.name, description: hints})
      return true;
    } else {
      return false;
    }
  }

  /** Submit url and get the target file, then push the file to files array **/
  submitUrl(event: any) {
    var url = event.target.link.value;
    // Avoid incorrect url
    if (!url.startsWith("http")) {
      this.messageBox.alert({title: this.translate.instant('file_not_found')});
    } else {
      this.filePickerService.getFileFromUrl(url).subscribe(
        (res: any) => {
          this.pushFile(res);
          this.link = '';
        },
        (err: any) => {
          console.log(err);
          this.messageBox.alert({title: this.translate.instant('file_not_found')});
        }
      );
    }
  }

  /** Press "Clear" button, then clear all the file in files array **/
  clear_files() {
    this.files = [];
    this.dataSource.data = [];
    this.selectedImage = null;
  }

  /** Remove target file from files array when pressing delete button **/
  removeFile(i: number) {
    // console.log(i);
    this.files.splice(i, 1);
    this.dataSource.data = this.files;
  }

  /** Push file to files array **/
  pushFile(file: File) {
    if (this.validateFileInputType(file)) {
      if (this.files.length > 0 && !this.multiple) {
        this.removeFile(0);
      }
      this.files.push(file);
      this.dataSource.data = this.files;
      this.loading = false;
      if (this.previewImage && !this.multiple && file.type.indexOf('image') !== -1) {
        this.onSelectImage(file);
        this.cropImage();
      }
    } else {
      this.loading = false;
      this.messageBox.alert({title: this.translate.instant('only_accept_file_type'), description: this.fileAccept});
    }
  }

  get isAllImages(): boolean {
    return this.files.every(b => b.type.indexOf('image') !== -1);
  }

  get isAllVideos(): boolean {
    return this.files.every(b => b.type.indexOf('video') !== -1);
  }

  /** check the target file match the required file type **/
  validateFileInputType(file: File) : boolean {
    // Always return true when file accept all types
    if (this.fileAccept == '*') {
      return true;
    }
    // Split the fileAccept string into array
    var fileType = file.type;
    var acceptType = this.fileAccept.replace(" ", "").split(',');
    // Check each accepted file type match current file type
    var validType = false;
    acceptType.forEach(type => {
      var specificFileType = fileType.slice(fileType.lastIndexOf('/') + 1);
      var typeWithoutDot = type.replace("*", specificFileType).replace('.', '');
      if (fileType == typeWithoutDot || specificFileType == type || fileType == type) {
        validType = true;
        return;
      }
    });
    return validType;
  }

  /** Press preview image to select the image **/
  onSelectImage(file: File) {
    this.selectedImage = file;
    this.selectedImageType = this.selectedImage.type;
    this.selectedImageTypeShort = this.selectedImageType.replace('image/', '');
    this.selectedImageName = this.selectedImage.name;
  }

  /** Press crop button to enter image croppper page **/
  cropImage() {
    // console.log(this.selectedImage);
    this.loading = true;
    this.headerTitle = this.translate.instant('cropping_image');
    this.lastUploadType = this.uploadType;
    this.uploadType = UploadType.cropper;
    this.resetImage();
  }

  /** Press cancel button in image cropper to go back to the file picker **/
  cancelCrop() {
    this.headerTitle = this.translate.instant('select_file');
    this.uploadType =  this.lastUploadType;
    // this.selectedImage = null;
  }

  /** Apply the changes in image cropper **/
  applyCrop() {
    if (this.selectedImage) {
      var fileName = this.selectedImage.name.split('.').slice(0, -1).join('.');
      var blob = this.dataURItoBlob(this.croppedImage);
      var newImage = new File([blob], this.selectedImageName, {type: this.selectedImageType});
      var index = this.files.indexOf(this.selectedImage);
      this.files[index] = newImage;
      this.uploadType =  this.lastUploadType;
      this.selectedImage = newImage;
      this.headerTitle = this.translate.instant('select_file');
    }
  }

  /** ngx-image-cropper function: Emits an ImageCroppedEvent each time the image is cropped **/
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  /** ngx-image-cropper function: Emits the Image when it was loaded into the cropper **/
  imageLoaded() {
    this.loading = false;
  }

  /** ngx-image-cropper function:	Emits when a wrong file type was selected (only png, gif and jpg are allowed) **/
  async loadImageFailed() {
    this.loading = false;
    await this.messageBox.alert({title: this.translate.instant('load_image_failed')});
    this.cancelCrop();
  }

  /** Zoom in the image in image cropper **/
  zoomIn() {
    this.scale += 0.1;
    this.transform = {
        ...this.transform,
        scale: this.scale,
        rotate: this.rotate,
    };
  }

  /** Zoom out the image in image cropper **/
  zoomOut() {
    if (this.scale > 0.2) {
      this.scale -= 0.1;
      this.transform = {
          ...this.transform,
          scale: this.scale,
          rotate: this.rotate,
      };
    }
  }

  /** Rotate the image 90 degree to the left in image cropper **/
  rotateLeft() {
    this.rotate -= 90;
    if (this.rotate < 0) {
      this.rotate += 360;
    }
    this.transform = {
        ...this.transform,
        scale: this.scale,
        rotate: this.rotate,
    };
  }

  /** Reset the image in image cropper **/
  resetImage() {
    this.scale = 1;
    this.rotate = 0;
    this.transform = {};
    this.containWithinAspectRatio = true;
  }

  /** Switch the image padding mode in image cropper **/
  switchPaddingMode() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  /** Convert base64 image to blob file type **/
  dataURItoBlob(dataURI: any) {
    var byteString = atob(dataURI.toString().split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: this.selectedImageType}); //or mimeString if you want
    return blob;
  }

}
