import { Injectable } from '@angular/core';
import { MessageBoxComponent } from './message-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export interface MessageBoxConfig {
  type?: 'alert' | 'confirm' | 'message';
  title: string; // accept html
  description?: string; // accept html
  hasIcon?: boolean;
  iconColor?: 'primary' | 'warn' | 'gray';
  icon?: any;
  confirmText?: string;
  cancelText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageBox {

  private isNeedLeaveConfirm: boolean = false;

  constructor(
    private dialog: MatDialog,
  ) { }

  open(config: MessageBoxConfig) {
    return new Observable(observer => {
      if(config.type){
        this.openDialog(config.type, config)
        .then(res => {
          if(config.type == 'confirm'){
            observer.next({isConfirm: res});
          }else{
            observer.next(true);
          }
          observer.complete();
        })
      }else{
        observer.next(null);
        observer.complete();
      }
    })
  }

  async alert(config: MessageBoxConfig) {
    if(config){
      return await this.openDialog('alert', config);
    }
  }

  async confirm(config: MessageBoxConfig) {
    if(config){
      return await this.openDialog('confirm', config);
    }
  }

  async message(config: MessageBoxConfig) {
    if(config){
      return await this.openDialog('message', config);
    }
  }

  private openDialog(type: 'alert' | 'confirm' | 'message', config: MessageBoxConfig){
    if(type !== "message"){
      this.isNeedLeaveConfirm = true;
    }

    config['type'] = type;
    const dialogRef = this.dialog.open(MessageBoxComponent, {
      data: config,
      minWidth: '40%',
      disableClose: type == 'message'? false: true,
      panelClass: ["dialog-responsive"],
    });

    return dialogRef.afterClosed()
     .toPromise()
     .then(result => {
        if(type !== "message"){
          this.isNeedLeaveConfirm = false;
        }
        return Promise.resolve(result); // will return a Promise here
     });
  }

  get isMessageBoxNeedLeaveConfirm(){
    return this.isNeedLeaveConfirm;
  }
}
