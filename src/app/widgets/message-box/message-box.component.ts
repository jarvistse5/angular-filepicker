import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icErrorOutline from '@iconify/icons-ic/twotone-error-outline';
import icHelpOutline from '@iconify/icons-ic/twotone-help-outline';
import icMailOutline from '@iconify/icons-ic/twotone-mail-outline';
import { TranslateService } from 'src/app/services/translate/translate.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  type: 'alert' | 'confirm' | 'message' = 'message';
  title: string = ''; // accept html
  description: string = ''; // accept html
  hasIcon: boolean = true;
  icon: any;
  iconColor: 'primary' | 'warn' | 'gray' = 'primary';
  confirmText: string = '';
  cancelText: string = '';

  constructor(
    private dialogRef: MatDialogRef<MessageBoxComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    if(this.data){
      // console.log(this.data);
      this.type = this.data.type || 'message';
      this.title = this.data.title || '';
      this.description = this.data.description || '';
      this.hasIcon = this.data.hasOwnProperty('hasIcon')? this.data.hasIcon: true;
      this.iconColor = this.data.iconColor;
      this.icon = this.data.icon || this.getIcon(this.type);
      this.confirmText = this.data.confirmText || (this.type == "alert"? this.translate.instant('ok'): this.translate.instant('confirm'));
      this.cancelText = this.data.cancelText || this.translate.instant('cancel');
    }
  }

  getIcon(type: string){
    switch(type){
      case 'alert': {
        if(!this.iconColor){
          this.iconColor = "warn";
        }
        return icErrorOutline;
      }
      case 'confirm': {
        if(!this.iconColor){
          this.iconColor = "primary";
        }
        return icHelpOutline;
      }
      default: {
        if(!this.iconColor){
          this.iconColor = "gray";
        }
        return icMailOutline;
      }
    }
  }

  cancel(){
    this.dialogRef.close(false);
  }

  confirm(){
    this.dialogRef.close(true);
  }

}